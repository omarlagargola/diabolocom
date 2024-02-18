<script setup lang="ts">
import { ref, onMounted } from 'vue';

type language = 'en' | 'fr';
type props = {
  group?: string
};
const props = withDefaults(defineProps<props>(), {
  group: 'default'
});
const language = ref<language>('en');
const counter = ref<number>(0);
const locales = {
  en: {
    counter: 'Counter'
  },
  fr: {
    counter: 'Comptoir'
  }
}

function useLanguage(lan: language){
  language.value = lan;
}

addEventListener('counterDiabolocom', (event: CustomEventInit) => {
  if (event.detail.group === props.group) {
    counter.value = event.detail.payload;
  }
});

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
    {{ locales[language].counter }}
    {{ counter }}
  </div>
</template>
