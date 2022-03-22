<template>
  <div>
    <div class="header clearfix">Zadzwonimy do Ciebie w ciągu 26 sekund.</div>
    <label class="form-label clearfix" for="form-number">
      Wprowadź numer
    </label>
    <input v-model="number" class="form-number clearfix" id="form-number" />
    <div class="call-button" @click="call()">Zadzwoń teraz</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'startView',
  data: () => ({
    number: '',
  }),
  methods: {
    async call() {
      const responseStream = await fetch('https://3000-lwolodkiewicz-webapp-ydprzg2jibd.ws-eu34.gitpod.io/call', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ number: this.number }),
      })
      const response = await responseStream.json()
      this.$router.push({ name: 'ringing', params: { callsId: response.id } })
    },
  },
})
</script>