<template>
    <v-app-bar dark app flat clipped-left class="px-3" color="primary">
        <v-toolbar-title class="headline">
            <span class="font-weight-bold">Check</span>
            <span class="font-weight-light">up</span>    
            <span class="font-weight-black red--text">+</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field flat
            light
            solo
            class="mx-3"
            color="#000"
            background-color="#fff"
            dense
            label="Search"
            hide-details
            single-line
            append-icon="mdi-magnify"
            style="border-radius: 20px"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-text</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar> 
</template>

<script>
export default {
    name: 'NavigationBar'
}
</script>

<style>

</style>