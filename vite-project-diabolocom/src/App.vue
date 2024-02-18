<script setup lang="ts">
import Counter from './components/Counter.ce.vue';
import Metrics from './components/Metrics.ce.vue';
import Reset from './components/Reset.ce.vue';
import Locale from './components/Locale.ce.vue';
</script>

<template>
  <div>
    <div>
      <h1>Group 1</h1>
      <Counter group="1" />
      <Metrics group="1" />
      <Reset group="1" />
      <Locale group="1" />
    </div>
    <div>
      <h1>Group 2</h1>
      <Counter group="2" />
      <Metrics group="2" />
      <Reset group="2" />
      <Locale group="2" />
    </div>
  </div>
</template>
