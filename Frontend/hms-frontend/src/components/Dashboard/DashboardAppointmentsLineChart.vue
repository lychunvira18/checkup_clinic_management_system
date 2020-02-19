<template>
  <v-card flat>
      <v-card-title>Appointments per day</v-card-title>
      <v-card-text>
          <line-chart :data="appointmentStats"></line-chart>
      </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex"

export default {
    computed: {
        ...mapState(['appointmentStats'])
    }
}
</script>

<style>

</style>