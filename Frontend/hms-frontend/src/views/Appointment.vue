<template>
    <v-container>
        <v-card flat outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline">
                        Appointment
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        ID: {{ appointment._id }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        {{ formatLastVisit(appointment.patientVisitDate) }}
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <p class="subtitle-2 text-uppercase">Edit appointment</p>
                    <v-switch v-model="enableEdit" inset></v-switch>
                </v-list-item-action>
            </v-list-item>
            <v-card-text>
                <v-text-field label="Patient Name" v-model="appointment.patientName" :disabled="!enableEdit"></v-text-field>
                <v-card flat>
                    <v-card-title class="body-1">
                        Symptoms
                        <v-spacer></v-spacer>
                        <v-text-field clearable label="Symptoms" v-model="patientSymptom" @keyup.enter="appointment.patientSymptoms.push(patientSymptom); patientSymptom = ''" :disabled="!enableEdit"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(symptom, i) in appointment.patientSymptoms" :key="i">
                                <v-list-item-content>
                                    {{ symptom }}
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="appointment.patientSymptoms = appointment.patientSymptoms.filter(x => x !== symptom)" :disabled="!enableEdit">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-text-field label="Patient Diagnosis" v-model="appointment.patientDiagnosis" :disabled="!enableEdit"></v-text-field>
                <v-card flat>
                    <v-card-title class="body-1">
                        Medications
                        <v-spacer></v-spacer>
                        <v-text-field clearable label="Medication" v-model="patientMedication" @keyup.enter="appointment.patientMedications.push(patientMedication); patientMedication = ''" :disabled="!enableEdit"></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(medication, i) in appointment.patientMedications" :key="i">
                                <v-list-item-content>
                                    {{ medication }}
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="appointment.patientMedications = appointment.patientMedications.filter(x => x !== medication)" :disabled="!enableEdit">
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
                <v-btn text large :disabled="!enableEdit" @click="updateAppointment">Save</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex"
import moment from "moment"
import axios from "axios"

export default {
    data: () => ({
        patientSymptom: "",
        patientMedication: "",
        enableEdit: false
    }),
    methods: {
        // Formats Last Visit Date
        formatLastVisit(date) {
            return moment(date).format("LLLL")
        },

        // Update appointment
        async updateAppointment() {
            axios.patch(`http://localhost:5000/api/visits/${this.appointment._id}`, {
                patientSymptoms: this.appointment.patientSymptoms,
                patientDiagnosis: this.appointment.patientDiagnosis,
                patientMedications: this.appointment.patientMedications
            }).then(res => {
                this.$store.commit("editAppointment", this.appointment._id)
                console.log(res.data)
            })
            .catch(err => console.log(err))
            this.$router.push("/appointments")
        }
    },
    computed: {
        ...mapState(['appointment', 'visits'])
    }
}
</script>

<style>

</style>