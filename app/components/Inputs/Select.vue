<template>
  <div>
    <v-menu :content-class="menuClass" :attach="!dontAttach">
      <template v-slot:activator="{ props, isActive }">
        <slot name="activator" v-bind="props">
          <div
            v-bind="props"
            class="bg-white py-2 px-3 border rounded-[14px] gap-2 items-center shadow flex relative dark:!bg-gray-700"
            :class="customClass"
          >
            <slot name="icon" />
            <v-icon :icon="icon" v-if="icon" />

            <span class="flex-1">
              <span
                v-if="selected"
                class="dark:!text-white text-black font-semibold"
              >
                {{ mappedList.find((i) => JSON.stringify(i.value) == JSON.stringify(selected))?.title }}
              </span>
              <span v-else class="text-gray-400">
                {{ placeholder || $t("select") }}
              </span>
            </span>

            <v-icon
              class="text-black dark:!text-white"
              icon="mdi-chevron-down"
              :class="{ '-scale-100': isActive }"
            />
          </div>
        </slot>
      </template>

      <ul
        v-if="list.length"
        class="bg-white p-1 rounded-sm shadow max-h-80 h-80vh overflow-hidden relative blockScrollX dark:!bg-gray-700"
        :class="menuClass"
        ref="container"
      >
        <li
          v-for="(i, n) in mappedList"
          :key="i.value"
          @click="
            selected = i.value;
            emit('update', list[n]);
          "
          class="cursor-pointer group pt-px"
        >
          <div
            class="group-hover:bg-violet-500/20 rounded-sm px-4 py-2 dark:!text-white text-black"
            :class="{
              [activeClass]: i.value == selected,
              [itemClass]: itemClass,
              'bg-violet-100 dark:bg-violet-400': i.value == selected,
            }"
          >
            {{ i.title }}
          </div>
        </li>

        <li v-if="page <= meta.lastPage" v-observe-visibility="handelScroll">
          <div class="loader" v-if="status == 'pending'" />
        </li>
      </ul>

      <button
        v-else-if="error"
        class="flex gap-2 items-center rounded-md bg-rose-50 hover:bg-rose-100 shadow px-4 py-2 mx-auto my-4 text-gray-500 text-sm"
        @click.prevent.stop="refresh"
      >
        <v-icon icon="mdi-reload" />
        <span>
          {{ $t("global.reload") }}
        </span>
      </button>

      <GlobalNoData :status="status" :data="mappedList" />
    </v-menu>

    <ErrorMessage :name="name" />
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, useField } from "vee-validate";

// props && emit
const emit = defineEmits(["update"]);
const props = defineProps({
  customClass: { type: String, default: "" },
  menuClass: { type: String, default: "" },
  itemClass: { type: String, default: "" },
  activeClass: { type: String, default: "" },
  items: { type: Array, default: [] },
  defaultValue: { type: null, default: undefined },
  name: { type: String, default: "" },
  rules: { type: String, default: "" },
  icon: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  dontAttach: { type: Boolean, default: false },
  fetch: {
    type: Function,
    required: false,
    default: () => {
      return {
        page: 1,
        ...useAsyncData("no-data", () => Promise.resolve([])),
      };
    },
  },
  map: {
    type: Function as PropType<
      (value: any, index: number, array: any[]) => any
    >,
    default: (i: any) => i,
  },
});

// init
const { $initPerfectScrollbar }: any = useNuxtApp();

const { data, status, refresh, error, page } = props.fetch();

const select = useField(props.name, props.rules);
const container = ref(null);

// data
const meta = ref({ lastPage: 2 });
const storedItems = ref<any[]>([]);
const list = computed(() => [...props.items, ...storedItems.value]);
const mappedList = computed(() => list.value.map(props.map));
const selected = defineModel();
if ("undefined" != typeof props.defaultValue)
  selected.value = props.defaultValue;

// methods
const handelScroll = (e: HTMLElement) => {
  if (!e) return;
  if (!page.value) return;
  if (page.value >= meta.value.lastPage) return;
  if (status.value == "pending") return;

  page.value += 1;
};

// watch
watch(
  data,
  (v) => {
    const hasMeta = Object(v).hasOwnProperty("meta");
    if (hasMeta) {
      meta.value == v.meta;

      if (Array.isArray(v.data))
        storedItems.value = [...storedItems.value, ...v.data];
    } else {
      meta.value.lastPage = 1;
      if (Array.isArray(v)) storedItems.value = [...storedItems.value, ...v];
    }
  },
  { immediate: true, deep: true }
);

watch(
  selected,
  (v, oldValue) => {
    if (oldValue != v)
      if (typeof oldValue == typeof v || v) select.setValue(v, true);
  },
  { immediate: true }
);

watch(
  container,
  (v) => {
    if (v) {
      $initPerfectScrollbar(v);
    }
  },
  { immediate: true }
);
</script>
