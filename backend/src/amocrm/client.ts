import { Client } from "amocrm-js";
import { ILead } from "amocrm-js/dist/api/activeRecords/Lead";

export const client = new Client({
  domain: "gleb05",
  auth: {
    client_id: "386cd9e1-29f7-41c1-8b62-1c1377fa1aad",
    client_secret:
      "Ouzgjpnyx3aQYU26C7LOo8NzdYNy5CE4gsTfavAqpxTnxVxGJcEneF249i79ZwRD",
    redirect_uri: "https://localhost:3005",
    bearer:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdlOTJiODUxMWU1NDZhYmY4YzI5NzhiMzY3NWYwYzVmOTEwNzgzM2UzMjZlMDEyZWUwNTgwZjVmY2QxZmE2MWYwMjQzYWE1OWM2YjZiM2JiIn0.eyJhdWQiOiIzODZjZDllMS0yOWY3LTQxYzEtOGI2Mi0xYzEzNzdmYTFhYWQiLCJqdGkiOiI3ZTkyYjg1MTFlNTQ2YWJmOGMyOTc4YjM2NzVmMGM1ZjkxMDc4MzNlMzI2ZTAxMmVlMDU4MGY1ZmNkMWZhNjFmMDI0M2FhNTljNmI2YjNiYiIsImlhdCI6MTcxODMxMjAzMSwibmJmIjoxNzE4MzEyMDMxLCJleHAiOjE3MTg0MDk2MDAsInN1YiI6IjExMTU3MDU4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNzk5NTUwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMWUxOWNlODgtZTMwMC00MjlmLWI4NDktMzA3M2FmM2RhYjBiIn0.C0tQsh7lEtM23YnEswOqSbMYdL6Alsf6v923MTLjt7hhMRwqq-38P0Oqn2iHLg4Tk6R_kOWQONsCaBMOjY1eavI8uvDVCxiDHDDojG_AnJE88XUSdkrUKdGe9ROVEP2olO2Mq4u25AbhBLZVBY8nH2WVCUmLRRXvZEXS927tGjUaaxaZNuNAajH5s2uYsswU1oPgg8FJ-EqjY_Uq9cCkXllNe9OsgA_yND4CwquXz4dEqtw3E3_7-qF_GPLPkTN1ldUiu_4Yphj24tbkzvXEAB4UXwFkOIVP3C-jB6feR80Jt5Pzv7YBaE9mLt2bMk8-OhP6CU1haC4tDsCLR_4c5Q",
  },
});

async function getManagarName(id?: number): Promise<string> {
  const response = await client.request.get<{ name: string }>(
    `/api/v4/users/${id}`
  );
  const name = response.data.name;
  return name;
}

async function getContacts(lead: ILead): Promise<object | undefined> {
  if (lead.embeddedContacts.length > 0) {
    const id = lead.embeddedContacts.get()[0].id;
    if (id) {
      let contact = await client.contacts.getById(id);
      return {
        name: contact?.name,
        phone: Object.values((contact?.custom_fields_values?.[0].values as string[])[0])[0],
        email: Object.values((contact?.custom_fields_values?.[1].values as string[])[0])[0],
      };
    }
  } else {
    return {};
  }
}

async function getStatus(pipelineId?:number, statusId?:number) {
  const status = await client.request.get<{name: string, color: string}>(`/api/v4/leads/pipelines/${pipelineId}/statuses/${statusId}`);
  return {
    name: status.data.name,
    color: status.data.color,
  };
}

async function run() {
  const leads = await client.leads.get({
    with: ["contacts"],
    // limit: 1
  });

  const filteredLeads = await Promise.all(
    leads.getData().map(async (lead) => {
      const leadFitlered = {
        name: lead.name,
        price: lead.price,
        created_at: lead.created_at,
        pipeline_id: lead.pipeline_id,
        status: await getStatus(lead.pipeline_id, lead.status_id),
        managerName: await getManagarName(lead.responsible_user_id),
        contacts: await getContacts(lead),
      };

      return leadFitlered;
    })
  );
}