<template class="row">	
		<el-select v-model="value"  :name="schema.inputName"  :class="schema.fieldClasses" v-attributes="'input'">			
				<el-option v-for="(item, index) in items" :key="index" :value="getItemValue(item)"> 
				{{ getItemName(item) }} 
			</el-option>
		</el-select>
</template>

<script setup>
import {toRefs, computed } from 'vue'
import { isObject,get as objGet, isString, forEach,  find } from "lodash";
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

const props = defineProps({schema: Object, values: Array})
const { schema  } = toRefs(props);	

const abstractField = useAbstractField(schema.value)
const value = abstractField.value

	const items = computed(() =>{
			let values = schema.value.values;
			return groupValues(values);
		})

	function		groupValues(values = []) {
			let array = [];
			let arrayElement = {};

			values.forEach(item => {
				arrayElement = null;

				if (item.group && isObject(item)) {
					// There is in a group.

					// Find element with this group.
					arrayElement = find(array, i => i.group === item.group);

					if (arrayElement) {
						// There is such a group.

						arrayElement.ops.push({
							// id: item.id,
							name: item.name
						});
					} else {
						// There is not such a group.

						// Initialising.
						arrayElement = {
							group: "",
							ops: []
						};

						// Set group.
						arrayElement.group = item.group;

						// Set Group element.
						arrayElement.ops.push({
							// id: item.id,
							name: item.name
						});

						// Add array.
						array.push(arrayElement);
					}
				} else {
					// There is not in a group.
					array.push(item);
				}
			});

			// With Groups.
			return array;
		}


	function		getItemValue(item) {
			if (isObject(item)) {
				if (typeof schema.value["selectOptions"] !== "undefined" && typeof schema.value["selectOptions"]["value"] !== "undefined") {
					return item[schema.value.selectOptions.value];
				} else {
					// Use 'id' instead of 'value' cause of backward compatibility
					if (typeof item["id"] !== "undefined") {
						return item.id;
					} else {
						const key = Object.keys(item)[0]
						return item[key]
						// return item.name
						// throw "`id` is not defined. If you want to use another key name, add a `value` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
					}
				}
			} else {
				return item;
			}
		}

	function		getItemName(item) {
			if (isObject(item)) {
				if (typeof schema.value["selectOptions"] !== "undefined" && typeof schema.value["selectOptions"]["name"] !== "undefined") {
					return item[schema.value.selectOptions.name];
				} else {
					if (typeof item["name"] !== "undefined") {
						return item.name;
					} else {
						throw "`name` is not defined. If you want to use another key name, add a `name` property under `selectOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/select.html#select-field-with-object-items";
					}
				}
			} else {
				return item;
			}
		}
	

</script>



