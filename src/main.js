import { createApp } from 'vue'
import ChatWidget from './ChatWidget.vue'

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

export async function createWidget(options = {}) {
    const config = await loadConfig()

    if (!isDomainAllowed(config.allowedDomains)) {
        console.warn('Widget is not allowed on this domain')
        return
    }

    const widgetContainer = document.createElement('div')
    widgetContainer.id = 'chat-widget'
    document.body.appendChild(widgetContainer)

    const app = createApp(ChatWidget, {
        cityName: options.cityName || 'London',
        buttonColor: options.buttonColor || config.buttonColor,
        buttonPosition: options.buttonPosition || config.buttonPosition,
    })
    app.mount(widgetContainer)
}

// For automatic initialization when the script is loaded
if (typeof window !== 'undefined') {
    createWidget({
        cityName: new URL(document.currentScript.src).searchParams.get('city')
    })
}