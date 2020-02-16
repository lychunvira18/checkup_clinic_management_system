<template>
  <v-card flat>
      <v-card-title>Appointments per day</v-card-title>
      <v-card-text>
          <line-chart :data="appointments"></line-chart>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
    data: () => ({
        appointments: {
            '2020-02-01': 11, 
            '2020-02-02': 6, 
            '2020-02-03': 7, 
            '2020-02-04': 18, 
            '2020-02-05': 10, 
            '2020-02-06': 16, 
            '2020-02-07': 12, 
            '2020-02-08': 20
        }
    })
}
</script>

<style>

</style>