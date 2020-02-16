<template>
    <v-row>
        <v-col cols="3" v-for="(stat, i) in dashboardStatus" :key="i">
            <v-card>
                <v-img
                    :style="`background-color: ${stat.color}`"
                    class="white--text align-end"
                    gradient="to right, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="150px"
                    >
                    <v-card-title v-text="stat.name" class="subtitle-1"></v-card-title>
                    <v-card-subtitle class="white--text display-2">{{ stat.name === 'Earnings' ? '$' : '' }} {{stat.number}}</v-card-subtitle>
                </v-img>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "DashboardStats",
    data: () => ({
        dashboardStatus: [
            {
                name: "New Patients",
                number: 12,
                color: "#336e7b"
            },
            {
                name: "Visits Today",
                number: 4,
                color: "#2574a9"
            },
            {
                name: "Visits This Week",
                number: 32,
                color: "#446cb3"
            },
            {
                name: "Earnings",
                number: 3482,
                color: "#52b3d9"
            }
        ]
    })
}
</script>

<style>

</style>