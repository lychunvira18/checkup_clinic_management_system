<template>
  <span>
      <v-btn outlined small class="mr-2" @click="addBatchDialog = true">
          <v-icon left>mdi-plus</v-icon>
          Add
      </v-btn>
      <v-dialog width="800px" v-model="addBatchDialog">
          <v-card>
              <v-card-title>Add amount</v-card-title>
              <v-card-text>
                  <v-text-field label="Amount" type="number" v-model="productAmount"></v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="addBatchDialog = false">Cancel</v-btn>
                  <v-btn text class="font-weight-bold" @click="addItems(ProductId)">Continue</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </span>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

export default {
    data: () => ({
        addBatchDialog: false,
        productAmount: ""
    }),
    methods: {
        addItems(id) {
            axios.patch(`http://localhost:5000/api/inventory/add/${id}`, {
                productStocks: parseInt(this.productAmount)
            }).then(res => {
                this.inventory.forEach(x => {
                    if (x._id === this.ProductId) {
                        x.productStocks = res.data.productStocks
                    }
                })
            }).catch(err => console.log(err))
            this.addBatchDialog = false
        }
    },
    computed: {
        ...mapState(["inventory"])
    },
    props: {
        ProductId: String
    }
}
</script>

<style>

</style>