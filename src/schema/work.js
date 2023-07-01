import { validators } from "../components/generator";

export default {
	fields: [
		/** *********/
		/*  INPUT   */
		/** *********/
{
			type: "input",
			inputType: "text",
			label: "№ проекта",
			model: "reg_number",
			inputName: "reg_number",
			disabled: true
		},
		{
			type: "select",
			label: "Город",
			model: "area_name",
			featured: true,
			required: true,
			styleClasses: "",
			value: '',
			values:[
			],
			validator: validators.string,
			onChanged(model, newVal, oldVal) {
				console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
			},
			onValidated(model, errors) {
				if (errors.length > 0) console.warn("Validation error in Name field! Errors:", errors);
			}
		},{
			type: "input",
			inputType: "text",
			label: "Район",
			model: "district_name",
			featured: true,
			required: true,
			placeholder: "User's first name",
			styleClasses: "col-xs-12 col-sm-6",
			validator: validators.string,
			onChanged(model, newVal, oldVal) {
				console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
			},
			onValidated(model, errors) {
				if (errors.length > 0) console.warn("Validation error in Name field! Errors:", errors);
			}
		},{
			type: "input",
			inputType: "text",
			label: "Адрес",
			model: "head_address",
			featured: true,
			required: true,
			placeholder: "User's first name",
			styleClasses: "col-xs-12 col-sm-6",
			validator: validators.string,
			onChanged(model, newVal, oldVal) {
				console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
			},
			onValidated(model, errors) {
				if (errors.length > 0) console.warn("Validation error in Name field! Errors:", errors);
			}
		},
		{
			type: "input",
			inputType: "text",
			label: "Категория",
			model: "category_slug",
			featured: true,
			required: true,
			placeholder: "User's last name",
			styleClasses: "col-xs-12 col-sm-6",
			validator: validators.string
		},
		{
			type: "input",
			inputType: "date",
			label: "Плановая дата начала",
			model: "plan_start_date",
			styleClasses: ""
			// format: "YYYY.MM.DD HH:mm:ss"
		},
		{
			type: "input",
			inputType: "date",
			label: "Плановая дата окончания",
			model: "plan_end_date",
			styleClasses: "row"
			// format: "YYYY.MM.DD HH:mm:ss"
		},
		{
			type: "input",
			inputType: "datetime",
			label: "Создан",
			model: "creation_date",
			styleClasses: ""
		},
		{
			type: "input",
			inputType: "checkbox",
			label: "Есть конфликт",
			model: "has_conflict",
			styleClasses: ""
			// validator: validators.number
		},

		{
			type: "switch",
			label: "Статус (switch field)",
			model: "status",
			multi: true,
			default: true,
			textOn: "Active",
			textOff: "Inactive",
			styleClasses: ""
		},
		{
			type: "switch",
			label: "Sex (switch field)",
			model: "sex",
			multi: true,
			default: "male",
			textOn: "Female",
			textOff: "Male",
			valueOn: "female",
			valueOff: "male",
			styleClasses: ""
		}
		
	]
};
