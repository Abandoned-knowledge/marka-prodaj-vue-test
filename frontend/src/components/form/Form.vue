<script setup lang="ts">
import FormTable from "./FormTable.vue";
</script>

<template>
  <section class="w-[80%] mx-auto mt-10 flex flex-col gap-5 border rounded-md py-5">
    <h1 class="text-xl px-5">Тестовое задание</h1>
    <Suspense>
      <FormTable />
    </Suspense>
  </section>
</template>

<style lang="scss" scoped></style>
