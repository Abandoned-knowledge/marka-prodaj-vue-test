<script setup lang="ts">
import type { leadStorage } from "@/interfaces/interfaces";
import { computed, onMounted, ref } from "vue";
import PhoneIcon from "../Icons/PhoneIcon.vue";
import EmailIcon from "../Icons/EmailIcon.vue";

const isActive = ref<boolean>(false);
const props = defineProps<leadStorage>();
const isContacts = ref<boolean>(true);

const style = {
  backgroundColor: props.status?.color,
};

function convertTime(UNIX: number) {
  const newDate = new Date(UNIX * 1000);
  const year = newDate.getFullYear();
  let month = newDate.getMonth();
  let day = newDate.getDay();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const date = `${day}.${month}.${year}`;
  const time = `${hours}:${minutes}`;

  return `${date} ${time}`;
}

const phoneLink = computed(() => {
  return `tel:${props.contacts?.name}`;
});

const emailLink = computed(() => {
  return `mailto:${props.contacts?.email}`;
});

function checkContacts() {
  return JSON.stringify(props.contacts) !== "{}"
    ? (isContacts.value = true)
    : (isContacts.value = false);
}

onMounted(()=> {
  checkContacts();
})
</script>

<template>
  <tr @click="isActive = !isActive" id="up-tr" :class="{ active: isActive }">
    <td>
      <div class="icon"></div>
    </td>
    <td>{{ props.name }}</td>
    <td>{{ props.price }}</td>
    <td>
      <div class="px-3 py-1.5 rounded-md w-fit mx-auto" :style="style">
        {{ props.status?.name }}
      </div>
    </td>
    <td>{{ props.managerName }}</td>
    <td>{{ convertTime(1718311272) }}</td>
  </tr>

  <tr id="down-tr" :class="{ hidden: !isActive }" class="bg-gray-100">
    <td></td>
    <td v-if="isContacts">
      <div class="flex items-center gap-4 justify-center">
        {{ props.contacts?.name }}
        <div class="flex items-center gap-2">
          <a :href="phoneLink">
            <PhoneIcon class="w-4 h-4 text-blue-500 cursor-pointer" />
          </a>
          <a :href="emailLink">
            <EmailIcon class="w-4 h-4 text-blue-500 cursor-pointer" />
          </a>
        </div>
      </div>
    </td>
    <td v-else>Без контакта</td>
    <td colspan="4"></td>
  </tr>
</template>

<style lang="scss" scoped>
#up-tr {
  @apply transition duration-200;

  &:hover {
    @apply bg-gray-100;
  }
  &.active {
    .icon::before {
      height: 0;
    }
  }
  .icon {
    @apply flex relative items-center mx-auto justify-center h-5 w-5 rounded-md border border-gray-300 cursor-pointer transition-transform duration-200 ease-in-out;

    &:hover {
      @apply border-blue-300;

      &::after,
      &::before {
        @apply bg-blue-500;
      }
    }
    &::after,
    &::before {
      @apply absolute bg-black transition-all duration-300 ease-in-out;
      content: "";
    }

    &::after {
      @apply w-[50%] h-[1px];
    }
    &::before {
      @apply h-[50%] w-[1px];
    }
  }
}
</style>
