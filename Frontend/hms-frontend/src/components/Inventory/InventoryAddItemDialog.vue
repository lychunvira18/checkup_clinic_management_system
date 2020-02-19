<template>
  <span>
      <v-btn text @click="addProductDialog = true">Add a product</v-btn>
      <v-dialog
        v-model="addProductDialog"
        width="800px"
        >
          <v-card>
              <v-card-title>Add a product</v-card-title>
              <v-card-text>
                  <v-text-field label="Product name" v-model="productName"></v-text-field>
                  <v-text-field label="Category" v-model="productCategory"></v-text-field>
                  <v-text-field label="Quantity" v-model="productStocks" type="number"></v-text-field>
                  <v-text-field label="Price" v-model="productPrice" type="number"></v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="addProductDialog = false">Cancel</v-btn>
                  <v-btn text class="font-weight-bold" @click="addItem">Add product</v-btn>
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
        addProductDialog: false,
        productName: "",
        productCategory: "",
        productStocks: "",
        productPrice: ""
    }),
    methods: {
        addItem(){
            axios.post("http://localhost:5000/api/inventory/", {
                productName: this.productName,
                productCategory: this.productCategory,
                productStocks: parseInt(this.productStocks),
                productPrice: parseInt(this.productPrice)
            }).then(res => {
                const Product = res.data
                console.log(res.data)
                this.$store.commit("addItemInventory", Product)
            }).catch(err => console.log(err))
            this.productName = this.productCategory = ""
            this.addProductDialog = false
        }
    },
    computed: {
        ...mapState(["invetory"])
    }
}
</script>

<style>

</style>