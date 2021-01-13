<template>
  <v-app>
    <router-view />
    <loading :loading="$store.state.loading" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loading from '@/components/loading/Loading.vue';

@Component({
  components: {
    Loading,
  },
})
export default class App extends Vue {
}
</script>
