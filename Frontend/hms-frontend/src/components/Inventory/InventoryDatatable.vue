<template>
  <v-container>
      <v-card flat>
          <v-card-title>Inventory
              <v-spacer></v-spacer>
              <v-text-field
                v-model="productSearch"
                label="Search for a product"
                append-icon="mdi-magnify"
                single-line
              ></v-text-field>
              <InventoryAddItemDialog />
              <v-btn outlined @click="getProduct">
                  <v-icon left>mdi-refresh</v-icon>
                  Refresh
                </v-btn>
          </v-card-title>
          <v-card-text>
              <v-data-table 
                :headers="inventoryHeaders" 
                :items="inventory"
                :search="productSearch"
                >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.productName }}</td>
                        <td>{{ props.item.productCategory }}</td>
                        <td>{{ props.item.productStocks }}</td>
                        <td>{{ props.item.productPrice }}</td>
                        <td>
                            <InventoryAddBatchDialog :ProductId="props.item._id" />
                            <InventoryEditItemDialog :Product="props.item"/>
                            <v-btn outlined small @click="deleteItem(props.item._id)">
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

import InventoryAddItemDialog from "./InventoryAddItemDialog"
import InventoryAddBatchDialog from "./InventoryAddBatchDialog"
import InventoryEditItemDialog from "./InventoryEditItemDialog"

export default {
    components: {
        InventoryAddItemDialog, InventoryAddBatchDialog, InventoryEditItemDialog
    },
    data: () => ({
        productSearch: "",
        inventoryHeaders: [
            {text: "Product name", value: "productName"},
            {text: "Category", value: "productCategory"},
            {text: "Stocks", value: "productStocks"},
            {text: "Price (KHR)", value: "productPrice"},
            {text: "Settings"}
        ]
    }),
    methods: {
        async deleteItem(id) {
            axios.delete(`http://localhost:5000/api/inventory/${id}`).then(res => {
                console.log(res)
                this.$store.commit('deleteInventoryItem', id)
            }).catch(err => console.log(err))
        },

        // Get products
        getProduct(){
            axios.get("http://localhost:5000/api/inventory").then(res => {
                this.$store.commit("getInventory", res.data)
            }).catch(err => console.log(err))
        }
    },
    computed: {
        ...mapState(["inventory"])
    }
}
</script>

<style>

</style>