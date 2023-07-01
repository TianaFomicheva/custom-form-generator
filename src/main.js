import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import VueFormGenerator from './components/generator'
import ElementPlus from 'element-plus'
import fieldComponents from "./components/generator/utils/fieldsLoader.js";
const pinia = createPinia()

const app = createApp(App)
for (const componentName in fieldComponents) {
    app.component(componentName, fieldComponents[componentName]);
  }
app.use(VueFormGenerator).use(pinia).use(ElementPlus).mount('#app')
