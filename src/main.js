import {createApp} from 'vue'
import ChatWidget from './ChatWidget.vue'

function createWidget() {
    const widgetContainer = document.createElement('div')
    widgetContainer.id = 'chat-widget'
    document.body.appendChild(widgetContainer)

    const app = createApp(ChatWidget)
    app.mount(widgetContainer)
}

// Create and mount the widget when the script loads
createWidget()