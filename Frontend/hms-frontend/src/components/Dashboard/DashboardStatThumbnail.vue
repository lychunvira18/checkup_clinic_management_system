<template>
    <v-card>
        <v-img
            :class="`${Color} white--text align-end`"
            gradient="to right, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="150px"
            >
            <v-card-title class="subtitle-1">{{ Title }}</v-card-title>
            <v-card-subtitle class="white--text display-2">{{ Title === 'Earnings' ? 'KHR' : '' }} {{ Stats }}</v-card-subtitle>
        </v-img>
    </v-card>
</template>

<script>
export default {
    props: {
        Title: String,
        Stats: Number,
        Color: String
    }
}
</script>

<style>

</style>