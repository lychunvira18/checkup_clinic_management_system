<template>
  <v-container>
      <v-card flat>
          <v-card-title>Billing List
              <v-spacer></v-spacer>
              <v-text-field label="Search" append-icon="mdi-magnify" v-model="billingSearch"></v-text-field>
              <v-btn text router to="/billing/add">Add billing</v-btn>
              <v-btn outlined>
                  <v-icon left @click="getBillings">mdi-refresh</v-icon>
                  Refresh
              </v-btn>
          </v-card-title>
          <v-card-text>
              <v-data-table
                :items="billings"
                :headers="billingHeader"
                :search="billingSearch"
              >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.billingPatientName }}</td>
                        <td>{{ props.item.billingGrandTotal }}</td>
                        <td>{{ props.item.billingDate }}</td>
                        <td>
                            <v-btn outlined small @click="deleteBilling(props.item._id)">
                                <v-icon left>mdi-close</v-icon>
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </template>  
            </v-data-table>
                
          </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

export default {
    data: () => ({
        billingSearch: "",
        billingHeader: [
            {text: "Patient", value: "billingPatientName"},
            {text: "Grand Total (KHR)", value: "billingGrandTotal"},
            {text: "Billing Date", value: "billingDate"},
            {text: "Settings"}
        ]
    }),
    methods: {
        // Get all billings
        async getBillings() {
            axios.get("http://localhost:5000/api/billing/").then(res => this.$store.commit("getBillings", res.data))
            .catch(err => console.log(err))
        },

        async deleteBilling(id) {
            axios.delete(`http://localhost:5000/api/billing/${id}`).then(res => {
                console.log(res)
                this.$store.commit("deleteBilling", id)
            }).catch(err => console.log(err))
        }
    },
    computed: {
        ...mapState(["billings"])
    },
    created() {
        this.getBillings()
    }
}
</script>

<style>

</style>