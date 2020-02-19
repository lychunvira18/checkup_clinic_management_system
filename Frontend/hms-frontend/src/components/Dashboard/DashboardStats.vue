<template>
    <v-row>
        <v-col cols="3">
            <DashboardStatThumbnail Title="New Patients This Week" :Stats="newPatientStats.map(x => x[1]).reduce((x, y) => x + y)" Color="blue lighten-3" />
        </v-col>
        <v-col cols="3">
            <DashboardStatThumbnail Title="Total Patients" :Stats="patients.length" Color="blue lighten-2" />
        </v-col>
        <v-col cols="3">
            <DashboardStatThumbnail Title="Total Appointments" :Stats="visits.length" Color="blue lighten-1" />
        </v-col>
        <v-col cols="3">
            <DashboardStatThumbnail Title="Earnings" :Stats="billings.map(x => x.billingGrandTotal ).reduce((x, y) => x + y)" Color="blue" />
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex"

import DashboardStatThumbnail from "./DashboardStatThumbnail"

export default {
    name: "DashboardStats",
    components: {
        DashboardStatThumbnail
    },
    data: () => ({
        
    }),
    computed: {
        ...mapState(["billings", "newPatientStats", "appointmentStats", "patients", "visits"])
    }
}
</script>

<style>

</style>