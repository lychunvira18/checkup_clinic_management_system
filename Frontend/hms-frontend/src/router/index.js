import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home"
import Patients from '../views/Patients'
import Appointments from "../views/Appointments"
import Appointment from "../views/Appointment"
import AddAppointment from "../views/AddAppointment"
import Visits from "../views/Visits"
import Inventory from "../views/Inventory"
import Billing from "../views/Billing"
import AddBilling from "../views/AddBilling"

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
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing
  },
  {
    path: "/billing/add",
    name: "New Billing",
    component: AddBilling
  }
]

const router = new VueRouter({
  routes
})

export default router
