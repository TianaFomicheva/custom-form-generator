<template >
  <div class="wrapper" v-attributes="'wrapper'">
    <label
      
      :for="schema.model"
    >
      <input
        type="checkbox"
        :value="value"
        :id="schema.model"
        @change="schema.onChange || null"
        :autocomplete="schema.autocomplete"
        :name="schema.inputName"
        :readonly="schema.readonly"
      />
      <span class="label" :data-on="schema.textOn ? schema.textOn : 'On'"
      :data-off="schema.textOff ? schema.textOff : 'Off'" :for="schema.model"></span>
      <span class="handle"></span>
    </label>
  </div>
</template>

<script setup>
import {toRefs } from 'vue'
import {   get as objGet, isString, forEach} from "lodash";
import useAbstractField from "@/composables/useAbstractField.js"
const vAttributes = {
  mounted: (el, binding, vnode) => attributesDirective(el, binding, vnode)
  
}
function attributesDirective(el, binding, vnode) {
	let attrs = objGet(vnode.context, "schema.attributes", {});
	let container = binding.value || "input";
	if (isString(container)) {
		attrs = objGet(attrs, container) || attrs;
	}
	forEach(attrs, (val, key) => {
		el.setAttribute(key, val);
	});
}
const props = defineProps({schema: Object, disabled: Boolean})
const { schema  } = toRefs(props);	
const abstractField = useAbstractField(schema.value)
const value = abstractField.value

</script>

