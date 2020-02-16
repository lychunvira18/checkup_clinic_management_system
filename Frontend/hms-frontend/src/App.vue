<template>
  <v-app>
    <NavigationBar />
    <NavigationDrawer />
    <v-content>
      <h1 class="display-1 mt-8 ml-5 mb-2">{{ $route.name }}</h1>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import NavigationBar from "./components/Navbar/NavigationBar"
import NavigationDrawer from "./components/Navbar/NavigationDrawer"
import Footer from "./components/Footer/Footer"

export default {
  name: 'App',

  components: {
    NavigationBar, NavigationDrawer, Footer
  },

  data: () => ({
    //
  }),
};
</script>
