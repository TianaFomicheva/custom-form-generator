<template>
	<div class="form-group" :class="getFieldRowClasses()">
		<label v-if="fieldTypeHasLabel(field)" :for="getFieldID(field)" :class="field.labelClasses">
			<span v-html="field.label"></span>
		</label>
		<div class="field-wrap modal-slot__box">
			<component ref="child" :is="getFieldType(field)"    :values="values" :vfg="{vfg}" :disabled="fieldDisabled(field)" :model="model" :schema="field"  :formOptions="options"></component>
			<div v-if="buttonVisibility(field)" class="buttons">
				<button v-for="(btn, index) in field.buttons"  :key="index" v-text="btn.label" :type="getButtonType(btn)"></button>
			</div>
		</div>

		<div v-if="field.hint" class="hint" v-html="fieldHint(field)"></div>

		<div v-if="fieldErrors(field).length > 0" class="errors help-block">
			<span v-for="(error, index) in fieldErrors(field)" :key="index" v-html="error"></span>
		</div>
	</div>
</template>
<script setup>
import { get as objGet, isNil, isFunction } from "lodash";
import { toRefs } from "vue";
import { slugifyFormID } from "./utils/schema";
import useFormMixin from "../../composables/useMixin";
const formMixin = useFormMixin()

const props = defineProps({

		values: Object,
		vfg: {
			type: Object,
			required: true,
		},
		model: Object,
		options: {
			type: Object
		},
		field: {
			type: Object,
			required: true
		},
		errors: {
			type: Array,
			default() {
				return [];
			}
		
	}
})
const { values, model, vfg, options, field, errors } = toRefs(props);

const getFieldRowClasses = () => formMixin.getFieldRowClasses(field.value, errors.value, options.value, model.value)
const fieldDisabled = (field) => formMixin.fieldDisabled(field, errors)

	const fieldTypeHasLabel = (field) => {
			if (isNil(field.label)) return false;

			let relevantType = "";
			if (field.type === "input") {
				relevantType = field.inputType;
			} else {
				relevantType = field.type;
			}

			switch (relevantType) {
				case "button":
				case "submit":
				case "reset":
					return false;
				default:
					return true;
			}
		}
	const getFieldID = (schema) => {
			const idPrefix = objGet(options, "fieldIdPrefix", "");
			return slugifyFormID(schema, idPrefix);
		}
		// Get type of field 'field-xxx'. It'll be the name of HTML element
	const getFieldType = (fieldSchema) => {

			return "field-" + fieldSchema.type;
		}
		// Get type of button, default to 'button'
	const getButtonType = (btn) => {
			return objGet(btn, "type", "button");
		}

	const buttonVisibility = (field) => {
			return field.buttons && field.buttons.length > 0;
		}

	const  fieldHint = (field) => {

			if (isFunction(field.hint)) return field.hint.call(this, model, field, this);

			return field.hint;
		}
	const fieldErrors = () =>{
			return errors.value.filter((e) => e.field === field).map((item) => item.error);
		}


	

</script>
