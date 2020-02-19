<template>
  <v-container>
    <PatientDatatable />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from "axios"

import PatientDatatable from "../components/Patients/PatientDatatable"

export default {
  components: {
     PatientDatatable
  },
  data: () => ({
    
  }),
  methods: {
    // Get patients
    async getPatients() {
      axios.get("http://localhost:5000/api/patients/").then(res => this.$store.commit('getPatients', res.data)).catch(err => console.log(err))
    },
  },
  computed: {
    ...mapState([
      'patients', 'visits'
    ])
  },
  created() {
    this.getPatients()
  }
}
</script>

<style>

</style>