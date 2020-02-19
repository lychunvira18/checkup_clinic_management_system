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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"
import moment from "moment"

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
            axios.get("http://localhost:5000/api/patients/").then(res => {
                this.$store.commit('getPatients', res.data)
                this.getPatientsStat()
            }).catch(err => console.log(err))
        },

        // Get all visits
        async getVisits(){
            axios.get("http://localhost:5000/api/visits/").then(res => {
                this.$store.commit('getVisits', res.data)
                this.getDates()
            }).catch(err => console.log(err))
        },

        // Get all items in inventory
        async getInventory(){
            axios.get("http://localhost:5000/api/inventory/").then(res => {
                this.$store.commit("getInventory", res.data)
            }).catch(err => console.log(err))
        },

        // Get dates for appointments per day
        getDates() {
            const dates = new Object()
            this.visits.forEach(x => {
                if (moment(x.patientVisitDate).format("YYYY-MM-DD") in dates) {
                    dates[`${moment(x.patientVisitDate).format("YYYY-MM-DD")}`] += 1
                } else {
                    dates[`${moment(x.patientVisitDate).format("YYYY-MM-DD")}`] = 1
                }
            })
            this.$store.commit('getAppointmentStats', dates)
        },

        // Get new patients in the past week
        getPatientsStat() {
            const week = new Object()
            for (let i = 0; i < 7; i++) {
                week[`${moment().subtract(i, "days").format("ddd")}`] = 0
                this.patients.forEach(x => {
                    if (moment(x.patientLastVisit).format("YYYY-MM-DD") === moment().subtract(i, "days").format("YYYY-MM-DD")) {
                        week[`${moment().subtract(i, "days").format("ddd")}`] += 1
                    }
                })
            }
            const arrayWeek = Object.entries(week).map(([k, v]) => ([k, v]))
            arrayWeek.reverse()
            this.$store.commit("getNewPatients", arrayWeek)
        },

        // Get all billings
        async getBillings() {
            axios.get("http://localhost:5000/api/billing/").then(res => this.$store.commit("getBillings", res.data))
            .catch(err => console.log(err))
        }
    },
    computed: {
        ...mapState(["appointmentStats", "visits", "patients", "newPatientStats", "inventory", "billings"])
    },
    created() {
        this.getPatients()
        this.getVisits()
        this.getInventory()
        this.getBillings()
    }
}
</script>

<style>

</style>