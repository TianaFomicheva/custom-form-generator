<template >
  <div  class="wrapper" v-attributes="'wrapper'">
    <input
      class="el-input__inner"
      :type="inputType"
      :value="value"
      @input="onInput"
      @blur="onBlur"
      :class="schema.fieldClasses"
      @change="schema.onChange || null"
      :disabled="disabled"
      :accept="schema.accept"
      :alt="schema.alt"
      :autocomplete="schema.autocomplete"
      :checked="schema.checked"
      :dirname="schema.dirname"
      :formaction="schema.formaction"
      :formenctype="schema.formenctype"
      :formmethod="schema.formmethod"
      :formnovalidate="schema.formnovalidate"
      :formtarget="schema.formtarget"
      :height="schema.height"
      :list="schema.list"
      :max="schema.max"
      :maxlength="schema.maxlength"
      :min="schema.min"
      :minlength="schema.minlength"
      :multiple="schema.multiple"
      :name="schema.inputName"
      :pattern="schema.pattern"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :required="schema.required"
      :src="schema.src"
      :step="schema.step"
      :width="schema.width"
      :files="schema.files"
      v-attributes="'input'"
    />
  </div>
 </template>

<script setup>
import {toRefs, computed } from 'vue'
import {  isNumber, get as objGet, isString, forEach} from "lodash";
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
const { schema, disabled  } = toRefs(props);	
const abstractField = useAbstractField(schema.value)
const value = abstractField.value


	const inputType =  computed(() => {
			if(schema.value && schema.value.inputType === "datetime") {
				// convert "datetime" to "datetime-local" (datetime deprecated in favor of "datetime-local")
				// ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime
				return "datetime-local";
			}
			return schema.value.inputType;
		})
	

	function	onInput($event) {
			let _value = $event.target.value;
			switch (schema.value.inputType.toLowerCase()) {
				case "number":
				case "range":
					if (isNumber(parseFloat($event.target.value))) {
						_value = parseFloat($event.target.value);
					}
					break;
			}
			value.value = _value;
		}

</script>

