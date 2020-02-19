<template>
    <v-container>
        <v-card flat>
            <v-card-title>Appointments List
                <v-spacer></v-spacer>
                    <v-text-field
                        v-model="patientSearch"
                        append-icon="mdi-magnify"
                        label="Search for a patient"
                        single-line
                        >
                    </v-text-field>
                    <v-btn text router to="/appointments/new">Add Appointment</v-btn>
                    <v-btn @click="getVisits" outlined>
                        <v-icon left>mdi-refresh</v-icon>
                        Refresh
                    </v-btn>
            </v-card-title>
            <v-data-table
                :headers="appointmentHeaders"
                :items="visits"
                :search="patientSearch"
                >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.patientName }}</td>
                        <td>{{ props.item.patientDiagnosis }}</td>
                        <td>{{ formatLastVisit(props.item.patientVisitDate) }}</td>
                        <td>
                            <v-btn outlined small class="mr-2" @click="getAppointment(props.item)">
                                <v-icon left>mdi-account-edit-outline</v-icon>
                                Edit
                            </v-btn>
                            <v-btn outlined small @click="deleteVisit(props.item._id)">
                                <v-icon left>mdi-close</v-icon>
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex"
import moment from "moment"
import axios from "axios"

export default {
    name: "AppointmentsDatatable",
    data: () => ({
        patientSearch: "",
        appointmentHeaders: [
            {text: "Patient Name", value: "patientName"},
            {text: "Diagnosis", value: "patientDiagnosis"},
            {text: "Patient Visit Date", value: "patientVisitDate"},
            {text: "Settings"}
        ]
    }),
    methods: {
        // Formats Last Visit Date
        formatLastVisit(date) {
            return moment(date).format("LLLL")
        },

        // Get all visits
        async getVisits(){
            axios.get("http://localhost:5000/api/visits/").then(res => this.$store.commit('getVisits', res.data)).catch(err => console.log(err))
        },

        // Delete a patient
        async deleteVisit(id) {
            axios.delete(`http://localhost:5000/api/visits/${id}`).then(res => {
                console.log(res)
                this.$store.commit('deleteVisit', id)
            }).catch(err => console.log(err))
        },

        // Get an appointment
        getAppointment(appointment){
            this.$store.commit('getAppointment', appointment)
            this.$router.push(`/appointments/edit/${appointment._id}`)
        }
    },
    computed: {
        ...mapState(["visits"])
    },
    created() {
        this.getVisits()
    }
}
</script>

<style>

</style>