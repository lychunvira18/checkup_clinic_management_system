<template>
  <v-card flat>
      <v-card-title>New Patients This Week</v-card-title>
      <v-card-text>
          <column-chart :data="newPatientsThisWeek" :colors="primary"></column-chart>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
    data: () => ({
        newPatientsThisWeek: [
            ['Sun', 32], 
            ['Mon', 46], 
            ['Tue', 28],
            ['Wed', 28],
            ['Thu', 28],
            ['Fri', 28],
            ['Sat', 28]
        ]
    })

}
</script>

<style>

</style>