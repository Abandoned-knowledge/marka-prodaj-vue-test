<script setup lang="ts">
import type { leadStorage } from "@/interfaces/interfaces";
import Row from "./FormTableRow.vue";
import allLeads from "@/services/getAllLeads";
// const lead: leadStorage = {
//   name: "Сделка #2110233",
//   price: 2000,
//   status: {
//     name: "Первичный контакт",
//     color: "rgb(153, 204, 255)",
//   },
//   managerName: "Gleb",
//   created_at: 12312312,
//   contacts: {
//     name: "Ибрагим",
//     phone: "89592343",
//     email: "gmail@gmail.ru",
//   },
// };
const leads = await allLeads;
</script>

<template>
  <div class="border-separate p-5 border-t-gray-300 border-t">
    <table class="w-full rounded-md overflow-hidden">
      <thead class="bg-blue-100">
        <tr>
          <th></th>
          <th>Название</th>
          <th>Бюджет</th>
          <th>Статус</th>
          <th>Ответственный</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <Row
          v-for="lead in leads"
          :name="lead.name"
          :price="lead.price"
          :created_at="lead.created_at"
          :manager-name="lead.managerName"
          :status="lead.status"
          :contacts="lead.contacts"
        />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
td,
th {
  @apply py-4 px-3 text-center text-[14px] ;
}

td{
  @apply border-t-gray-200 border-t;
}

th:not(:last-child) {
  @apply relative border-r-gray-300 border-r;
}
</style>
