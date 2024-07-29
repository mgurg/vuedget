<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  customParam: String
})

const isOpen = ref(false)
const currentDate = computed(() => new Date().toLocaleString())

const toggleWidget = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="chat-widget">
    <button @click="toggleWidget" class="floating-button">Chat</button>
    <div v-if="isOpen" class="widget-window">
      <h2>Current Date:</h2>
      <p>{{ currentDate }}</p>
      <p>Custom Parameter: {{ customParam }}</p>
    </div>
  </div>
</template>

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
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>