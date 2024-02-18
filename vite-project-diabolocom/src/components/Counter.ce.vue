<script setup lang="ts">
import { ref, onMounted } from 'vue';

type language = 'en' | 'fr';
type eventType = {
  group: string,
  payload: number
}
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
    plus: 'Plus',
    minus: 'Minus'
  },
  fr: {
    plus: 'Plus',
    minus: 'Moins'
  }
}

function useLanguage(lan: language){
  language.value = lan;
}

function triggerCounterEvent(){
  dispatchEvent(new CustomEvent<eventType>('counterDiabolocom', {
    detail: {
      group: props.group,
      payload: counter.value
    }
  }));
}

function modifyCounter(inc: number){
  counter.value += inc;
  triggerCounterEvent()
}

addEventListener('resetDiabolocom', (event: CustomEventInit) => {
  if (event.detail.group === props.group) {
    counter.value = 0;
    triggerCounterEvent()
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
    <button @click="modifyCounter(1)">
      {{ locales[language].plus }}
    </button>
    <button @click="modifyCounter(-1)">
      {{ locales[language].minus }}
    </button>
  </div>
</template>
