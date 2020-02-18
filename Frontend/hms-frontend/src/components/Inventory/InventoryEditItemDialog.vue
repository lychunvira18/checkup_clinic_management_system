<template>
  <span>
      <v-btn outlined small class="mr-2" @click="editProductDialog = true">
          <v-icon left>mdi-account-edit-outline</v-icon>
          Edit
      </v-btn>
      <v-dialog width="800px" v-model="editProductDialog">
          <v-card>
              <v-card-title>Edit an item</v-card-title>
              <v-card-text>
                  <v-text-field label="Product name" v-model="productName"></v-text-field>
                  <v-text-field label="Category" v-model="productCategory"></v-text-field>
                  <v-text-field label="Quantity" v-model="productStocks" type="number"></v-text-field>
                  <v-text-field label="Price" v-model="productPrice" type="number"></v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="editProductDialog = false">Cancel</v-btn>
                  <v-btn text class="font-weight-bold" @click="editProduct">Continue</v-btn>
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
        editProductDialog: false,
        productName: "",
        productCategory: "",
        productStocks: "",
        productPrice: ""
    }),
    props: {
        Product: Object
    },
    methods: {
        // Edit Product
        editProduct(){
            axios.patch(`http://localhost:5000/api/inventory/edit/${this.Product._id}`, {
                productName: this.productName,
                productCategory: this.productCategory,
                productStocks: parseInt(this.productStocks),
                productPrice: parseInt(this.productPrice)
            }).then(res => {
                console.log(res.data)
                this.getProduct()
            }).catch(err => console.log(err))
            this.editProductDialog = false
        },

        // Get products
        getProduct(){
            axios.get("http://localhost:5000/api/inventory").then(res => {
                this.$store.commit("getInventory", res.data)
            }).catch(err => console.log(err))
        }
    },
    computed: {
        ...mapState(['inventory'])
    },
    mounted() {
        this.productName = this.Product.productName
        this.productCategory = this.Product.productCategory
        this.productStocks = this.Product.productStocks
        this.productPrice = this.Product.productPrice
    }
}
</script>

<style>

</style>