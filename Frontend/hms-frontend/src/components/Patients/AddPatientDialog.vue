<template>
    <span>
        <v-dialog
            v-model="addPatientDialog"
            width= "800px"
            >
            <v-card>
                <v-card-title>
                Add patient
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Enter the patient's name" v-model="patientName"></v-text-field>
                    <v-text-field label="Enter the patient's weight" v-model="patientWeight" type="number"></v-text-field>
                    <v-text-field label="Enter the patient's height" v-model="patientHeight" type="number" @keyup.enter="addPatient"></v-text-field>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="addPatientDialog = false">Cancel</v-btn>
                <v-btn text class="font-weight-bold" @click="addPatient">Add Patient</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn @click="addPatientDialog = true" text>Add Patient</v-btn> 
    </span>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

export default {
    data: () => ({
        addPatientDialog: false,
        patientName: "",
        patientWeight: "",
        patientHeight: "",
    }),
    methods: {
        // Add a patient
        async addPatient() {
        axios.post("http://localhost:5000/api/patients/", {
            patientName: this.patientName,
            patientWeight: parseInt(this.patientWeight),
            patientHeight: parseInt(this.patientHeight)
        }).then(res => {
            const Patient = res.data
            this.$store.commit('addPatient', Patient)
        }).catch(err => console.log(err))
        this.patientName = this.patientHeight = this.patientWeight = ""
        this.addPatientDialog = false
        },
    },
    computed: {
        ...mapState(['patients'])
    }
}
</script>

<style>

</style>