<script setup>
import {computed, onMounted, ref} from 'vue'
import axios from 'axios'

const props = defineProps({
  cityName: String
})

const isOpen = ref(false)
const currentDate = computed(() => new Date().toLocaleString())
const weatherData = ref(null)
const loading = ref(false)
const error = ref(null)

const toggleWidget = () => {
  isOpen.value = !isOpen.value
}

const fetchWeatherData = async () => {
  if (!props.cityName) return

  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: props.cityName,
        appid: import.meta.env.VITE_OPENWEATHERMAP_API_KEY,
        units: 'metric'
      }
    })
    weatherData.value = response.data
  } catch (err) {
    console.error('Error fetching weather data:', err)
    error.value = 'Failed to fetch weather data. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchWeatherData)
</script>

<template>
  <div class="chat-widget">
    <button @click="toggleWidget" class="floating-button">Weather</button>
    <div v-if="isOpen" class="widget-window">
      <h2>Weather in {{ cityName }}</h2>
      <p>{{ currentDate }}</p>
      <div v-if="loading" class="loading">Loading weather data...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="weatherData" class="weather-data">
        <p>Temperature: {{ weatherData.main.temp }}°C</p>
        <p>Weather: {{ weatherData.weather[0].description }}</p>
        <p>Humidity: {{ weatherData.main.humidity }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain the same */
</style>

<style>
/* Base styles for the widget container */
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  z-index: 9999; /* Ensure the widget stays on top */
}

/* Styles for the floating button */
.chat-widget .floating-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  transition: background-color 0.3s ease;
}

.chat-widget .floating-button:hover {
  background-color: #0056b3;
}

/* Styles for the widget window */
.chat-widget .widget-window {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Typography within the widget */
.chat-widget h2 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.chat-widget p {
  margin: 10px 0;
  color: #666;
}

/* Styles for loading and error states */
.chat-widget .loading,
.chat-widget .error {
  color: #666;
  font-style: italic;
}

.chat-widget .error {
  color: #d9534f;
}

/* Weather data display */
.chat-widget .weather-data {
  margin-top: 15px;
}

.chat-widget .weather-data p {
  margin: 5px 0;
}
</style>