<template>
    <v-container>
        <v-card outlined>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="headline">
                        Appointment
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ formatDate() }}
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn outlined @click="getPatients">Refresh Patients</v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-card-text>
                <v-autocomplete
                    v-model="visitPatientId"
                    :items="patients"
                    label="Patient"
                    item-text="patientName"
                    item-value="_id"
                    >
                    <template v-slot:item="props">
                        {{ props.item.patientName }}
                    </template>
                </v-autocomplete>
                <v-card flat>
                    <v-card-title class="body-1">
                        Symptoms
                        <v-spacer></v-spacer>
                        <v-text-field clearable label="Symptoms" v-model="visitPatientSymptom" @keyup.enter="visitPatientSymptoms.push(visitPatientSymptom); visitPatientSymptom = ''"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(symptom, i) in visitPatientSymptoms" :key="i">
                                <v-list-item-content>
                                    {{ symptom }}
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="visitPatientSymptoms = visitPatientSymptoms.filter(x => x !== symptom)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-text-field label="Patient Diagnosis" v-model="visitPatientDiagnosis"></v-text-field>
                <v-card flat>
                    <v-card-title class="body-1">
                        Medications
                        <v-spacer></v-spacer>
                        <v-text-field clearable label="Medications" v-model="visitPatientMedication" @keyup.enter="visitPatientMedications.push(visitPatientMedication); visitPatientMedication = ''"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(medication, i) in visitPatientMedications" :key="i">
                                <v-list-item-content>
                                    {{ medication }}
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="visitPatientMedications = visitPatientMedications.filter(x => x !== medication)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text large class="font-weight-bold" @click="addAppointment">Add Appointment</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import moment from "moment"
import { mapState } from "vuex"
import axios from "axios"

export default {
    data: () => ({
        visitPatientId: "",
        visitPatientSymptom: "",
        visitPatientSymptoms: [],
        visitPatientDiagnosis: "",
        visitPatientMedication: "",
        visitPatientMedications: [],

    }),
    methods: {
        // Formats Last Visit Date
        formatDate() {
            return moment().format("LLLL")
        },

        // Adds appointment
        addAppointment() {
                axios.post("http://localhost:5000/api/visits/", {
                patientId: this.visitPatientId,
                patientName: this.patients.find(x => x._id === this.visitPatientId).patientName,
                patientSymptoms: this.visitPatientSymptoms,
                patientDiagnosis: this.visitPatientDiagnosis,
                patientVisitDate: Date.now,
                patientMedications: this.visitPatientMedications
            }).then(res => this.visits.push(res.data)).catch(err => console.log(err))
            this.$router.push("/appointments")
        },

        // Get patients
        async getPatients() {
            axios.get("http://localhost:5000/api/patients/").then(res => this.$store.commit('getPatients', res.data)).catch(err => console.log(err))
        },
    },
    computed: {
        ...mapState(['patients', 'visits'])
    }
}
</script>

<style>

</style>