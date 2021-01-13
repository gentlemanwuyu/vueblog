<template>
  <li :class="{active: active}">
    <slot />
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FrontHeaderNavItem extends Vue {
  @Prop({type: Boolean, default: false})
  protected active!: boolean;
}
</script>

<style lang="scss" scoped>
  li {
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    padding-left: 12px;
    padding-right: 12px;
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      right: 50%;
      height: 3px;
      background: $primary;
      transition: all .5s ease 0s;
    }
    &:hover {
      & a {
        color: $primary;
      }
      &::after {
        left: 0;
        right: 0;
        height: 3px;
      }
    }
  }
  .active {
    & {
      color: $primary!important;
    }
    &::after {
      left: 0;
      right: 0;
    }
  }
</style>
