<template>
  <v-card flat>
      <v-card-title>New Patients This Week</v-card-title>
      <v-card-text>
          <column-chart :data="newPatientStats"></column-chart>
      </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex"

export default {
    computed: {
        ...mapState(["newPatientStats"])
    }
}
</script>

<style>

</style>