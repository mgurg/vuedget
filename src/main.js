import {createApp} from 'vue'
import ChatWidget from './ChatWidget.vue'

function loadStyles(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
}

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

    // Load styles
    loadStyles('https://vuedget.onrender.com/style.css') // Adjust this URL to where your CSS is hosted


    const app = createApp(ChatWidget, {
        cityName: getScriptParam('city')
    })
    app.mount(widgetContainer)
}

// Create and mount the widget when the script loads
createWidget()