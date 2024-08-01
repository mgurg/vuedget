import { createApp } from 'vue'
import ChatWidget from './ChatWidget.vue'

const app = createApp(ChatWidget, {
    cityName: 'London',
    buttonColor: '#007bff',
    buttonPosition: 'right'
})

app.mount('#app')