<script setup lang="ts">
import { ref, onMounted } from 'vue';

type language = 'en' | 'fr';
type eventType = {
  group: string
}
type props = {
  group?: string
};
const props = withDefaults(defineProps<props>(), {
  group: 'default'
});
const language = ref<language>('en');
const locales = {
  en: {
    reset: 'Reset counter'
  },
  fr: {
    reset: 'Réinitialiser le compteur'
  }
}

function useLanguage(lan: language){
  language.value = lan;
}

function resetCounter() {
  dispatchEvent(new CustomEvent<eventType>('resetDiabolocom', {
    detail: {
      group: props.group
    }
  }));
}

addEventListener('languageDiabolocom', (event: CustomEventInit) => {
  if (event.detail.group === props.group) {
    useLanguage(event.detail.payload);
  }
});

onMounted(() => {
  useLanguage('en');
});
</script>

<template>
  <div>
    <button @click="resetCounter()">
      {{ locales[language].reset }}
    </button>
  </div>
</template>
