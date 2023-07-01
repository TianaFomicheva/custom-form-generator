const forEach = require("lodash").forEach;

const fieldComponents = {};

let coreFields = require.context("../fields/core", false, /^\.\/field([\w-_]+)\.vue$/);

forEach(coreFields.keys(), (key) => {
	let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
	fieldComponents[compName] = coreFields(key).default;
});




	let optionalFields = require.context("../fields/optional", false, /^\.\/field([\w-_]+)\.vue$/);

	forEach(optionalFields.keys(), (key) => {
		let compName = key.replace(/^\.\//, "").replace(/\.vue/, "");
		fieldComponents[compName] = optionalFields(key).default;
	});
console.log(fieldComponents)
module.exports = fieldComponents;
