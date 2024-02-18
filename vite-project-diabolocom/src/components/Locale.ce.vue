<script setup lang="ts">
import { ref, onMounted } from 'vue';

type language = 'en' | 'fr';
type eventType = {
  group: string,
  payload: string
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
    switch: 'Switch to french'
  },
  fr: {
    switch: `Passer à l'anglais`
  }
}

function useLanguage(lan: language){
  language.value = lan;
}

function switchLanguage() {
  language.value = language.value === 'en' ? 'fr' : 'en';
  dispatchEvent(new CustomEvent<eventType>('languageDiabolocom', {
    detail: {
      group: props.group,
      payload: language.value
    }
  }));
}

onMounted(() => {
  useLanguage('en');
});
</script>

<template>
  <div>
    <button @click="switchLanguage()">
      {{ locales[language].switch }}
    </button>
  </div>
</template>
