<template>
    <v-card flat>
        <v-card-title>Patients</v-card-title>
        <v-data-table
            :headers="patientHeaders"
            :items="patients"
            >
            <template v-slot:item="props">
            <tr>
                <td>{{ props.item.patientName }}</td>
                <td>{{ props.item.patientWeight }}</td>
                <td>{{ props.item.patientHeight }}</td>
                <td>{{ formatLastVisit(props.item.patientLastVisit) }}</td>
            </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import moment from "moment"
import { mapState } from "vuex"

export default {
    name: "DashboardPatientTable",
    data: () => ({
        patientHeaders: [
            {text: "Patient Name", value: "patientName"},
            {text: "Patient Weight", value: "patientWeight"},
            {text: "Patient Height", value: "patientHeight"},
            {text: "Patient Last Visit", value: "patientLastVisit"}
        ]
    }),
    methods: {
        formatLastVisit(date) {
            return moment(date).format("LLLL")
        },
    },
    computed: {
        ...mapState([
            'patients'
        ])
    }
}
</script>

<style>

</style>