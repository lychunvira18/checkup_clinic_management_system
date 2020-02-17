import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    patients: [],
    visits: [],
    inventory: [],
    appointment: {},
    appointmentStats: {},
    newPatientStats: {}
  },
  mutations: {
    // Gets all patients
    getPatients(state, patients) {
      state.patients = patients
    },

    // Add a patient
    addPatient(state, patient) {
      state.patients.push(patient)
    },

    // Delete a patient
    deletePatient(state, id) {
      state.patients = state.patients.filter(x => {
        return x._id != id
      })
    },

    // Edit patient
    editPatients(state, id, name, weight, height){
      state.patients = state.patients.forEach(x => {
        if (x._id === id) {
          x.patientName = name
          x.patientWeight = weight
          x.patientHeight = height
        }
      })
    },

    // Gets all visits
    getVisits(state, visits) {
      state.visits = visits
    },

    // Delete a visit
    deleteVisit(state, id) {
      state.visits = state.visits.filter(x => {
        return x._id != id
      })
    },

    // Get an appointment
    getAppointment(state, appointment) {
      state.appointment = appointment
    },

    // Edit an appointment
    editAppointment(state, id) {
      const index = state.visits.findIndex((x => x._id === id))
      state.visits = [...state.visits.slice(0, index), state.appointment, ...state.visits.slice(index + 1)]
    },

    // Get appointment stats
    getAppointmentStats(state, stats) {
      state.appointmentStats = stats
    },

    // Get patient stats per week
    getNewPatients(state, stats) {
      state.newPatientStats = stats
    }
  },
  actions: {
  },
  modules: {
  }
})
