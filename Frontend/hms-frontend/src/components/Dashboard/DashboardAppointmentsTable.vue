<template>
    <v-card flat>
        <v-card-title>
            Appointments
        </v-card-title>
        <v-data-table
            :headers="visitHeaders"
            :items="visits"
            >
            <template v-slot:item="props">
                <tr>
                    <td>{{ props.item.patientName }}</td>
                    <td>{{ props.item.patientDiagnosis }}</td>
                    <td>{{ formatLastVisit(props.item.patientVisitDate) }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { mapState } from "vuex"
import moment from "moment"

export default {
    data: () => ({
        visitHeaders: [
            {text: "Patient Name", value: "patientName"},
            {text: "Patient Diagnosis", value: "patientDiagnosis"},
            {text: "Patient Visit Date", value: "patientVisitDate"}
        ]
    }),
    methods: {
        formatLastVisit(date) {
            return moment(date).format("LLLL")
        },
    },
    computed: {
        ...mapState(["visits"])
    }
}
</script>

<style>

</style>