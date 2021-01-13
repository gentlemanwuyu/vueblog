<template>
  <ul>
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class FrontHeaderNav extends Vue {
}
</script>

<style lang="scss" scoped>
 ul {
   list-style: none;
   padding: 0;
 }
</style>
