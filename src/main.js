import { createApp } from 'vue'
import ChatWidget from './ChatWidget.vue'

const DEFAULT_CONFIG = {
    buttonColor: '#7b00ff',
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

function loadStyles(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
}

function getScriptParam(paramName) {
    const scripts = document.getElementsByTagName('script')
    const lastScript = scripts[scripts.length - 1]
    const scriptSrc = lastScript.src
    const urlParams = new URLSearchParams(scriptSrc.split('?')[1])
    return urlParams.get(paramName)
}

function isDomainAllowed(allowedDomains) {
    const currentDomain = window.location.hostname
    return allowedDomains.includes('*') || allowedDomains.includes(currentDomain)
}

async function createWidget() {
    const config = await loadConfig()

    if (!isDomainAllowed(config.allowedDomains)) {
        console.warn('Widget is not allowed on this domain')
        return
    }

    const widgetContainer = document.createElement('div')
    widgetContainer.id = 'chat-widget'
    document.body.appendChild(widgetContainer)

    loadStyles('https://vuedget.onrender.com/style.css')

    const app = createApp(ChatWidget, {
        cityName: getScriptParam('city'),
        buttonColor: config.buttonColor,
        buttonPosition: config.buttonPosition,
    })
    app.mount(widgetContainer)
}

createWidget()