<template>
    <v-card outlined class="ma-4">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline">
                    Billing
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ formatDate() }}
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn outlined @click="getPatients(); getInventory()">Refresh</v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-card-text>
            <v-autocomplete
                v-model="billingPatientName"
                :items="patients"
                label="Patient"
                item-text="patientName"
                item-value="patientName"
                >
                <template v-slot:item="props">
                    {{ props.item.patientName }}
                </template>
            </v-autocomplete>
            <v-container>
                <v-row>
                <v-col cols="10">
                    <v-autocomplete
                        v-model="productId"
                        :items="inventory"
                        label="Product"
                        item-text="productName"
                        item-value="_id"
                        >
                        <template v-slot:item="props">
                            {{ props.item.productName }}
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-col cols="1">
                    <v-text-field
                        v-model="productQuantity"
                        label="Quantity"
                        @keyup.enter="addProductToCart"
                        type="number"
                        >
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn outlined large @click="addProductToCart">Add Item</v-btn>
                </v-col>
            </v-row>
            </v-container>
            <v-card flat>
                <v-data-table :headers="cartHeaders" :items="cartItems">
                    <template v-slot:item="props">
                        <tr>
                            <td>{{ props.item.productName }}</td>
                            <td>{{ props.item.productQuantity }}</td>
                            <td>{{ props.item.productPrice }}</td>
                            <td>{{ props.item.productTotalPrice }}</td>
                            <td>
                                <v-btn outlined small @click="cartItems = cartItems.filter(x => x.productName !== props.item.productName)">
                                    <v-icon left>mdi-close</v-icon>
                                    Delete
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
            <v-row>
                <v-col cols="3">
                    <v-card outlined>
                        <v-card-text>
                            <v-row>
                                <v-col cols="7">
                                    <p>
                                        <b>Subtotal: </b> 
                                    </p>
                                    <p>
                                        <b>Discount: </b>
                                    </p>
                                    <p>
                                        <b>Discount Value: </b>
                                    </p>
                                    <p>
                                        <b>Grand Total: </b>
                                    </p>
                                </v-col>
                                <v-col cols="5">
                                    <p>
                                        KHR {{ cartItems.map(a => a.productTotalPrice).length !== 0 ? cartItems.map(a => a.productTotalPrice).reduce((a, b) => a + b) : 0 }}
                                    </p>
                                    <p>
                                        {{ discountPercent }} %
                                    </p>
                                    <p>
                                        KHR {{ (cartItems.map(a => a.productTotalPrice).length !== 0 ? cartItems.map(a => a.productTotalPrice).reduce((a, b) => a + b) : 0) * (discountPercent / 100) }}
                                    </p>
                                    <p>
                                        KHR {{ (cartItems.map(a => a.productTotalPrice).length !== 0 ? cartItems.map(a => a.productTotalPrice).reduce((a, b) => a + b) : 0) - (cartItems.map(a => a.productTotalPrice).length !== 0 ? cartItems.map(a => a.productTotalPrice).reduce((a, b) => a + b) : 0) * (parseInt(discountPercent) / 100) }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined @click="discountDialog = true">Discount</v-btn>
            <v-btn outlined @click="addBilling">Check out</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
        <v-dialog v-model="discountDialog" width="300px">
            <v-card>
                <v-card-title>Discount amount</v-card-title>
                <v-card-text>
                    <v-text-field v-model="discountPercent" type="number" label="Discount percent"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="discountDialog = false" text>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import moment from "moment"
import axios from "axios"
import { mapState } from "vuex"

export default {
    data: () => ({
        billingPatientName: "",
        productId: "",
        productQuantity: 1,
        cartItems: [],
        cartHeaders: [
            {text: "Product Name", value: "productName"},
            {text: "Quantity", value: "productQuantity"},
            {text: "Price", value: "productPrice"},
            {text: "Total Price", value: "productTotalPrice"},
            {text: "Delete Listing", sortable: false}
        ],
        discountDialog: false,
        discountPercent: 0,

    }),
    methods: {
        formatDate() {
            return moment().format("LLLL")
        },

        async getPatients() {
            axios.get("http://localhost:5000/api/patients/").then(res => this.$store.commit('getPatients', res.data)).catch(err => console.log(err))
        },
        
        async getInventory(){
            axios.get("http://localhost:5000/api/inventory/").then(res => {
                this.$store.commit("getInventory", res.data)
            }).catch(err => console.log(err))
        },

        addProductToCart() {
            const selectedProduct = this.inventory.find((x => x._id === this.productId))
            if (this.cartItems.find((x => x.productName === selectedProduct.productName)) === undefined) {
                const item = {
                    productId: selectedProduct._id,
                    productName: selectedProduct.productName,
                    productQuantity: parseInt(this.productQuantity),
                    productPrice: selectedProduct.productPrice,
                    productTotalPrice: selectedProduct.productPrice * parseInt(this.productQuantity)
                }
                this.cartItems.push(item)
            } else {
                this.cartItems.forEach(x => {
                    if (x.productName === selectedProduct.productName) {
                        x.productQuantity += parseInt(this.productQuantity)
                        x.productTotalPrice = x.productQuantity * x.productPrice
                    }
                })
            }
            this.productId = ""
            this.productQuantity = 1
        },

        async addBilling() {
            axios.post("http://localhost:5000/api/billing", {
                billingPatientName: this.billingPatientName,
                billingCartItems: this.cartItems,
                billingDiscountRate: parseInt(this.discountPercent),
                billingGrandTotal:  parseInt((this.cartItems.map(a => a.productTotalPrice).length !== 0 ? this.cartItems.map(a => a.productTotalPrice).reduce((a, b) => a + b) : 0) - (this.cartItems.map(a => a.productTotalPrice).length !== 0 ? this.cartItems.map(a => a.productTotalPrice).reduce((a, b) => a + b) : 0) * (parseInt(this.discountPercent) / 100) ),
                billingDate: moment().format("LLLL")
            }).then(res => this.billings.push(res.data))
            .catch(err => console.log(err))
            this.$router.push("/billing")
        }
    },
    computed: {
        ...mapState(["patients", "inventory", "billings"])
    }
}
</script>

<style>

</style>