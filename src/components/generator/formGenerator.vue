<template>
	<div >
		<component v-if="fields" class="vue-form-generator" :is="tag">
			<template v-for="(field, index) in fields">
				<formGroup class="row"  v-if="fieldVisible(field)" :vfg="vfg" :values="values" :key="index"  :field="field" :errors="errors"  :options="options" />
			</template>
		</component>
	</div>
</template>	
<script setup>
import {  forEach, isFunction, isNil } from "lodash";
import { getCurrentInstance,  computed, toRefs } from "vue";
import formGroup from "./formGroup.vue";

	
const props = defineProps({
	schema: {type: Object,
	default: () =>{}},

		values: Object,
		// errors: Object,
		options: {
			type: Object,
			default: () => ({
					validateAfterLoad: false,
					validateAfterChanged: false,
					fieldIdPrefix: "",
					validateAsync: false,
					validationErrorClass: "error",
					validationSuccessClass: ""
			})
		},
		tag: {
			type: String,
			default: "fieldset",
			validator: function(value) {
				return value.length > 0;
			}
		}	
		})
		const { schema,  values, options } = toRefs(props);	
const vfg = getCurrentInstance()

const errors =  computed(()=>{
			let res = [];
			return res})		

const fields = computed(()=>{
			let res = [];
			if (schema?.value && schema?.value.fields) {
				forEach(schema.value.fields, field => {
					res.push(field);
				});
			}

			return res;
		})



	function fieldVisible(field) {
		// Get visible prop of field
		{
			if (isFunction(field.visible)) return field.visible.call(this, this.model, field, this);

			if (isNil(field.visible)) return true;

			return field.visible;
		}
	}	
</script>

<style lang="scss">
@import "@/assets/vfg.scss";
</style>