import { get as objGet, forEach, isNil, isArray, isString, isFunction } from "lodash";

function formMixin() {

		// Get style classes of field
	function getFieldRowClasses(field, errors, options, model) {
			const hasErrors = this.fieldErrors(field, errors).length > 0;
			let baseClasses = {
				[objGet(options, "validationErrorClass", "error")]: hasErrors,
				[objGet(options, "validationSuccessClass", "valid")]: !hasErrors,
				disabled: fieldDisabled(field, model),
				readonly: fieldReadonly(field, model),
				featured: fieldFeatured(field, model),
				required: fieldRequired(field, model)
			};

			if (isArray(field.styleClasses)) {
				forEach(field.styleClasses, c => (baseClasses[c] = true));
			} else if (isString(field.styleClasses)) {
				baseClasses[field.styleClasses] = true;
			}

			if (!isNil(field.type)) {
				baseClasses["field-" + field.type] = true;
			}

			return baseClasses;
		}
	function fieldErrors(field, errors) {
			let res = errors.filter(e => e.field === field);
			return res.map(item => item.error);
		}
		// Get disabled attr of field
	function fieldDisabled(field, model) {
		
			if (isFunction(field.disabled)) return field.disabled.call(this, model, field, this);

			if (isNil(field.disabled)) return false;
			return field.disabled;
		}
		// Get readonly prop of field
	function	fieldReadonly(field) {
			if (isFunction(field.readonly)) return field.readonly.call(this, this.model, field, this);

			if (isNil(field.readonly)) return false;

			return field.readonly;
		}
		// Get featured prop of field
	function fieldFeatured(field) {
			if (isFunction(field.featured)) return field.featured.call(this, this.model, field, this);

			if (isNil(field.featured)) return false;

			return field.featured;
		}
		// Get required prop of field
	function fieldRequired(field) {
			if (isFunction(field.required)) return field.required.call(this, this.model, field, this);

			if (isNil(field.required)) return false;

			return field.required;
		}
		return {getFieldRowClasses, fieldErrors, fieldDisabled, fieldReadonly, fieldFeatured, fieldRequired}
	}


	export default formMixin

