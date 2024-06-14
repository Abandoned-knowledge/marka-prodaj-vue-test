import type { leadStorage } from "@/interfaces/interfaces";

async function getAllLeads(): Promise<leadStorage[]> {
  const response = await fetch("http://localhost:3001/api/leads");
  const data = await response.json();
  return data;
}

const leads = getAllLeads();
export default leads;
