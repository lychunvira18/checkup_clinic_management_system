<template>
  <v-container>
    <h1>Visits</h1>
    <v-container>
      <v-btn text @click="addVisitModal = true">Add Visit</v-btn>
    </v-container>
    <v-dialog scrollable v-model="addVisitModal" max-width="1000px">
      <v-card>
        <v-container>
          <v-card-title>Add visit</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="visitPatientId"
              :items="patients"
              label="Patient"
              item-text="patientName"
              item-value="_id"
              @keyup.enter="debug(visitPatientId)"
            >
              <template v-slot:item="props">
                {{ props.item.patientName }}
              </template>
            </v-autocomplete>
            <v-text-field
              v-model="visitPatientSymptom"
              label="Symptom"
              @keyup.enter="visitPatientSymptoms.push(visitPatientSymptom); visitPatientSymptom = ''"
            ></v-text-field>
            <v-sheet>
              <p class="caption">Symptoms: </p>
              <v-chip-group>
                <v-chip v-for="symptom in visitPatientSymptoms" :key="symptom" @click="visitPatientSymptoms = visitPatientSymptoms.filter(x => x !== symptom)">
                  {{ symptom }}
                </v-chip>
              </v-chip-group>
            </v-sheet>
            <v-text-field
              v-model="visitPatientDiagnosis"
              label="Diagnosis"
            ></v-text-field>
            <v-text-field
              v-model="visitPatientMedication"
              label="Medication"
              @keyup.enter="visitPatientMedications.push(visitPatientMedication); visitPatientMedication = ''"
            ></v-text-field>
            <p class="caption">Medications: </p>
            <v-list dense class="ma-0 pa-0">
              <v-list-item dense v-for="medication in visitPatientMedications" :key="medication">
                <v-list-item-content>{{ medication }}</v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="visitPatientMedications = visitPatientMedications.filter(x => x !== medication)">
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="addVisitModal = false">Cancel</v-btn>
            <v-btn text class="font-weight-bold" @click="addVisit()">Add Visit</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

export default {
  data: () => ({
    addVisitModal: false,
    visitPatientId: "",
    visitPatientSymptom: "",
    visitPatientSymptoms: [],
    visitPatientDiagnosis: "",
    visitPatientMedication: "",
    visitPatientMedications: [],
    medicationDose: "",
    medicationQuantity: "",
  }),
  methods: {
    addVisit() {
      axios.post("http://localhost:5000/api/visits/", {
        patientId: this.visitPatientId,
        patientName: this.patients.find(x => x._id === this.visitPatientId).patientName,
        patientSymptoms: this.visitPatientSymptoms,
        patientDiagnosis: this.visitPatientDiagnosis,
        patientVisitDate: Date.now,
        patientMedications: this.visitPatientMedications
      }).then(res => console.log(res.data)).catch(err => console.log(err))
      this.addVisitModal = false
    }
  },
  computed: {
    ...mapState([
      'patients', 'visits'
    ])
  }
}
</script>

<style>

</style>