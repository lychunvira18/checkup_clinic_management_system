<template>
    <v-container class="mx-2">
        <DashboardStats />
        <v-row>
            <v-col cols="8">
                <DashboardAppointmentsLineChart />
                <DashboardPatientTable />
                <DashboardAppointmentsTable />
            </v-col>
            <v-col cols="4">
                <DashboardNewPatientsColumnChart />
                <DashboardNewPatientsColumnChart />
                <DashboardNewPatientsColumnChart />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

import DashboardStats from "../components/Dashboard/DashboardStats"
import DashboardAppointmentsLineChart from "../components/Dashboard/DashboardAppointmentsLineChart"
import DashboardPatientTable from "../components/Dashboard/DashboardPatientTable"
import DashboardAppointmentsTable from "../components/Dashboard/DashboardAppointmentsTable"
import DashboardNewPatientsColumnChart from "../components/Dashboard/DashboardNewPatientsColumnChart"

export default {
    name: 'Home',
    components: {
       DashboardStats, DashboardPatientTable, DashboardAppointmentsTable, DashboardAppointmentsLineChart, DashboardNewPatientsColumnChart
    },
    methods: {
        // Get all patients
        async getPatients() {
            axios.get("http://localhost:5000/api/patients/").then(res => this.$store.commit('getPatients', res.data)).catch(err => console.log(err))
        },

        // Get all visits
        async getVisits(){
            axios.get("http://localhost:5000/api/visits/").then(res => this.$store.commit('getVisits', res.data)).catch(err => console.log(err))
        }
    },
    computed: {
        ...mapState(["visits"])
    },
    created() {
        this.getPatients()
        this.getVisits()
    }
}
</script>

<style>

</style>