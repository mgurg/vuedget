import { createApp } from 'vue'
import ChatWidget from './ChatWidget.vue'

function getScriptParam(paramName) {
    const scripts = document.getElementsByTagName('script');
    const lastScript = scripts[scripts.length - 1];
    const scriptSrc = lastScript.src;
    const urlParams = new URLSearchParams(scriptSrc.split('?')[1]);
    return urlParams.get(paramName);
}

function createWidget() {
    const widgetContainer = document.createElement('div')
    widgetContainer.id = 'chat-widget'
    document.body.appendChild(widgetContainer)

    const app = createApp(ChatWidget, {
        cityName: getScriptParam('city')
    })
    app.mount(widgetContainer)
}

// Create and mount the widget when the script loads
createWidget()