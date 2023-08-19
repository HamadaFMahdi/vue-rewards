import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueRewards from './plugins/vue-rewards'


const app = createApp(App)

app.use(VueRewards)

app.mount('#app')