<script setup>
import { ref, computed, onMounted } from 'vue'
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
      <div v-if="loading">Loading weather data...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="weatherData">
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

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-family: Arial, sans-serif;
}

.floating-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.widget-window {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 300px;
  height: 200px;
  background-color: #607fb4;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>