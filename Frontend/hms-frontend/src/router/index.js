import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home"
import Patients from '../views/Patients'
import Appointments from "../views/Appointments"
import Appointment from "../views/Appointment"
import AddAppointment from "../views/AddAppointment"
import Visits from "../views/Visits"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Home
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: "/appointments/edit/:id",
    name: 'Edit Appointments',
    component: Appointment
  },
  {
    path: "/appointments/new",
    name: "New Appointment",
    component: AddAppointment
  },
  {
    path: "/visits",
    name: "Visits",
    component: Visits
  }
]

const router = new VueRouter({
  routes
})

export default router
