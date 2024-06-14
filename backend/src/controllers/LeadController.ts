import { Request, Response } from "express";
import { client } from "../amocrm/client";
import { statusStorage, managerStorage, leadStorage, contactStorage } from "../interfaces/interfaces";
import { ILead } from "amocrm-js/dist/api/activeRecords/Lead";

async function getManagarName(id?: number): Promise<string> {
  const response = await client.request.get<managerStorage>(
    `/api/v4/users/${id}`
  );
  const name = response.data.name;
  return name;
}

async function getStatus(pipelineId?:number, statusId?:number) {
  const status = await client.request.get<statusStorage>(`/api/v4/leads/pipelines/${pipelineId}/statuses/${statusId}`);
  return {
    name: status.data.name,
    color: status.data.color,
  };
}

async function getContacts(lead: ILead): Promise<object | undefined> {
  if (lead.embeddedContacts.length > 0) {
    const id = lead.embeddedContacts.get()[0].id;
    if (id) {
      let contact = await client.contacts.getById(id);
      return <contactStorage>{
        name: contact?.name,
        phone: Object.values((contact?.custom_fields_values?.[0].values as string[])[0])[0],
        email: Object.values((contact?.custom_fields_values?.[1].values as string[])[0])[0],
      };
    }
  } else {
    return {};
  }
}

export default {
  getAllLeads: async (req: Request, res: Response) => {
    const leads = await client.leads.get({
      with: ["contacts"],
      // limit: 1
    });

    const filteredLeads = await Promise.all(
      leads.getData().map(async (lead) => {
        const leadFitlered: leadStorage = {
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

    res.json(filteredLeads);
  },
};
