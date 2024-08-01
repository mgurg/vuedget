import {createApp} from 'vue'
import ChatWidget from './ChatWidget.vue'

function loadStyles(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
}

const DEFAULT_CONFIG = {
    buttonColor: '#007bff',
    buttonPosition: 'right',
    allowedDomains: ['*'],
}

async function loadConfig() {
    try {
        const response = await fetch('https://example.com/widget-config.json')
        if (!response.ok) throw new Error('Failed to fetch config')
        return await response.json()
    } catch (error) {
        console.warn('Failed to load config, using defaults:', error)
        return DEFAULT_CONFIG
    }
}

function isDomainAllowed(allowedDomains) {
    const currentDomain = window.location.hostname
    return allowedDomains.includes('*') || allowedDomains.includes(currentDomain)
}

async function createWidget(options = {}) {
    const config = await loadConfig()

    if (!isDomainAllowed(config.allowedDomains)) {
        console.warn('Widget is not allowed on this domain')
        return
    }

    const widgetContainer = document.createElement('div')
    widgetContainer.id = 'chat-widget'
    document.body.appendChild(widgetContainer)

    loadStyles('https://vuedget.onrender.com/style.css') // Adjust this URL to where your CSS is hosted

    const app = createApp(ChatWidget, {
        cityName: options.cityName || 'London',
        buttonColor: options.buttonColor || config.buttonColor,
        buttonPosition: options.buttonPosition || config.buttonPosition,
    })
    app.mount(widgetContainer)
}

// Immediately invoke the createWidget function
(async () => {
    const script = document.currentScript;
    const urlParams = new URLSearchParams(script.src.split('?')[1]);
    await createWidget({
        cityName: urlParams.get('city')
    });
})();