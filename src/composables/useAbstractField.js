import {ref, computed} from 'vue'


function abstractField(schema){

const _value = ref(schema.value ? schema.value : schema.values ? schema.values[0] : schema.value)
const value = computed({
	get() {return _value.value},
		set(newValue)  {

			_value.value = newValue
	}
})
		
return {value}
}
export default abstractField