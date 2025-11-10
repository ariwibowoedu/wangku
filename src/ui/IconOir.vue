<script setup>
import * as Iconoir from '@iconoir/vue'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 20,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  classes: {
    type: String,
    default: '',
  },
})

const iconComponent = computed(() => {
  const componentName = Object.keys(Iconoir).find(
    (key) => key.toLowerCase() === props.name.toLowerCase()
  )
  return Iconoir[componentName] || null
})
</script>

<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :width="size"
    :height="size"
    :color="color"
    :class="classes"
  />
  <span v-else class="text-red-500">?</span>
</template>
