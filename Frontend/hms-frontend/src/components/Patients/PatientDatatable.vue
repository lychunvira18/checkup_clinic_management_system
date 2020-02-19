<template>
    <v-container>
        <v-card flat>
            <v-card-title>
                    Patients list
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="patientSearch"
                        append-icon="mdi-magnify"
                        label="Search for a patient"
                        single-line
                        >
                    </v-text-field>
                    <AddPatientDialog />
                    <v-btn @click="getPatients" outlined>
                        <v-icon left>mdi-refresh</v-icon>
                        Refresh
                    </v-btn>
                </v-card-title>
            <v-data-table
                :headers="patientHeaders"
                :items="patients"
                :search="patientSearch"
            >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.patientName }}</td>
                        <td>{{ props.item.patientWeight }}</td>
                        <td>{{ props.item.patientHeight }}</td>
                        <td>{{ formatLastVisit(props.item.patientLastVisit) }}</td>
                        <td>
                            <v-btn outlined small @click="onPatientClick(props.item)" class="mr-2">
                                <v-icon left>mdi-account-edit-outline</v-icon>
                                Edit
                            </v-btn>
                            <v-btn outlined small @click="deletePatient(props.item._id)">
                                <v-icon left>mdi-close</v-icon>
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>

        <!-- Edit Dialog -->
        <v-dialog width="800px" v-model="editPatientDialog">
            <v-card>
                <v-card-title>Edit a patient</v-card-title>
                <v-card-text>
                    <v-text-field label="Patient Name" v-model="patientName"></v-text-field>
                    <v-text-field label="Patient Weight" v-model="patientWeight"></v-text-field>
                    <v-text-field label="Patient Height" v-model="patientHeight"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="editPatientDialog = false">Cancel</v-btn>
                    <v-btn text class="font-weight-black" @click="editPatient()">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import moment from "moment"
import axios from "axios"

import AddPatientDialog from "./AddPatientDialog"

export default {
    components: {
        AddPatientDialog
    },
    data: () => ({
        patientSearch: "",
        patientHeaders: [
            {text: "Patient Name", value: "patientName"},
            {text: "Patient Weight", value: "patientWeight"},
            {text: "Patient Height", value: "patientHeight"},
            {text: "Patient Last Visit", value: "patientLastVisit"},
            {text: "Settings"}
        ],
        editPatientDialog: false,
        patientId: "",
        patientName: "",
        patientHeight: "",
        patientWeight: ""
    }),
    methods: {
        // Edit a patient
        onPatientClick(patient){
            this.editPatientDialog = true
            this.patientId = patient._id
            this.patientName = patient.patientName
            this.patientHeight = patient.patientHeight
            this.patientWeight = patient.patientWeight
        },

        async editPatient() {
            axios.patch(`http://localhost:5000/api/patients/${this.patientId}`, {
                patientName: this.patientName,
                patientWeight: parseInt(this.patientWeight),
                patientHeight: parseInt(this.patientHeight)
            }).then(res => {
                console.log(res.data)
                this.getPatients()
            }).catch(err => {
                console.log(err)
            })
            this.editPatientDialog = false
        },

        // Formatting Last Visit Date
        formatLastVisit(date) {
            return moment(date).format("LLLL")
        },

        // Delete a patient
        async deletePatient(id) {
            axios.delete(`http://localhost:5000/api/patients/${id}`).then(res => {
                console.log(res)
                this.$store.commit('deletePatient', id)
            }).catch(err => console.log(err))
        },

        // Get patients
        async getPatients() {
            axios.get("http://localhost:5000/api/patients/").then(res => this.$store.commit('getPatients', res.data)).catch(err => console.log(err))
        },
    },
    computed: {
        ...mapState(['patients'])
    },
}
</script>

<style>

</style>