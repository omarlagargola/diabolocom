import { defineCustomElement } from 'vue';
import Counter from './components/Counter.ce.vue';
import Metrics from './components/Metrics.ce.vue';
import Reset from './components/Reset.ce.vue';
import Locale from './components/Locale.ce.vue';

const myCounter = defineCustomElement(Counter);
const myMetrics = defineCustomElement(Metrics);
const myReset = defineCustomElement(Reset);
const myLocale = defineCustomElement(Locale);

export { myCounter, myMetrics, myReset, myLocale };

export function register() {
  customElements.define('my-counter', myCounter);
  customElements.define('my-metrics', myMetrics);
  customElements.define('my-reset', myReset);
  customElements.define('my-locale', myLocale);
}
