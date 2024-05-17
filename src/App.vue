<script setup lang="ts">
import { ref } from "vue";
import loader from "@/components/loader.vue";
import api from "@/assets/api.ts";

const messages = ref<string[]>([]);
const currentMessage = ref<string>("");
const isTyping = ref<boolean>(false);
const isSending = ref<boolean>(false);
const isReady = ref<boolean>(false);
const connection = ref<{ [key: string]: string }>({});

api.on("init", () => {
  messages.value.push("Connecting...");
});

api.on("connected", (connectedConnection: { [key: string]: string }) => {
  isReady.value = true;
  connection.value = connectedConnection;
  messages.value.push(`Connected to ${connection.value.name}`);
});

api.on("startSend", () => {
  isSending.value = true;
});

api.on("stopSend", ({ message }: { message: string }) => {
  isSending.value = false;
  currentMessage.value = "";
  messages.value.push(message);
});

api.on("receive", ({ message }: { message: string }) => {
  messages.value.push(message);
});

api.on("startTyping", () => {
  isTyping.value = true;
});

api.on("stopTyping", () => {
  isTyping.value = false;
});
</script>

<template>
  <article class="flex h-screen flex-col bg-slate-950 text-white">
    <header class="bg-slate-900 p-8">
      <h1>Chat with {{ connection.name }}</h1>
    </header>

    <section class="flex-1 overflow-auto p-8">
      <ul>
        <li v-for="message in messages" :key="message">{{ message }}</li>
        <li>
          <loader
            class="transition-opacity"
            :class="{ 'opacity-1': isTyping, 'opacity-0': !isTyping }"
          ></loader>
        </li>
      </ul>
    </section>

    <footer class="bg-slate-900 p-8" v-if="isReady">
      <div
        class="flex h-12 w-full items-center overflow-hidden rounded-full bg-white text-black ring-white/30 focus-within:ring-4"
      >
        <input
          class="[readonly]:cursor-not-allowed h-full flex-1 px-5 focus:outline-none"
          v-model="currentMessage"
          :class="{ 'text-slate-400': isSending }"
          :readonly="isSending"
          type="text"
          placeholder="Type a message..."
          @keydown.enter="api.send(currentMessage)"
        />
        <button
          class="relative m-2 grid size-8 place-items-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300"
          @click="api.send(currentMessage)"
        >
          <svg
            class="absolute h-4 w-4 transition-opacity"
            :class="`opacity-${isSending ? 0 : 1}`"
            stroke-width="2"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>

          <loader
            class="absolute transition-opacity"
            :class="`opacity-${isSending ? 1 : 0}`"
          ></loader>
        </button>
      </div>
    </footer>
  </article>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
