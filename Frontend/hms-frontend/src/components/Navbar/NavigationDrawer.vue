<template>
  <v-navigation-drawer app clipped>
      <v-list-item two-line class="my-2">
        <v-list-item-avatar color="pink">
          <span class="white--text">PR</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            Prak Rathdavy
          </v-list-item-title>
          <v-list-item-subtitle class="caption text-uppercase">
            Doctor
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
          <v-subheader class="text-uppercase">Modules</v-subheader>
          <v-list-item-group color="primary">
              <v-list-item v-for="(route, i) in routes" :key="i" router :to="route.route">
                  <v-list-item-icon>
                      <v-icon>{{ route.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                      <v-list-item-title>{{ route.name }}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'NavigationDrawer',
    data: () => ({
        routes: [
            {
                name: "Dashboard",
                route: "/",
                icon: "mdi-speedometer"
            },
            {
                name: "Patients",
                route: "/patients",
                icon: "mdi-account-group"
            },
            {
                name: "Appointments",
                route: "/appointments",
                icon: "mdi-clipboard-text-outline"
            },
            {
                name: "Billing",
                route: "/billing",
                icon: "mdi-file-document"
            },
            {
                name: "Inventory",
                route: "/inventory",
                icon: "mdi-magnify"
            }
        ]
    })
}
</script>

<style>

</style>