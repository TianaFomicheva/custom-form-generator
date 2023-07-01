<template>
  <div>
    <vue-form-generator
      :schema="schema"
      :options="formOptions"
    ></vue-form-generator>
  </div>
</template>

<script setup >
import WorkSchema from "../schema/work";
import Work from "../model/work.json";
import Areas from "../model/areas-list.json";
import { computed, ref } from "vue";

const formOptions = ref({
  validateAfterLoad: true,
  validateAfterChanged: true,
  validateBeforeSave: true,
});

const schema = computed(() => {
  return initDefault() || {};
});

const getAreaNames = () => {
  const areas = [];
  Areas.forEach((item) => areas.push(item.area_name));
  return areas;
};

const initDefault = () => {
  WorkSchema.fields.forEach((item) => {
    item.value = Work[0][item["model"]];
  });

  WorkSchema.fields.map((item) => {
    if (item.model == "area_name") item.values = getAreaNames();
  });
  return WorkSchema;
};
</script>
