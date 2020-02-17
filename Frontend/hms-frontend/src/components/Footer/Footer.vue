<template>
    <v-footer color="primary">
            <v-col
                class="primary py-4 text-center white--text"
                cols="12"
                >
                <v-btn
                    v-for="(link, i) in links"
                    :key="i"
                    color="white"
                    icon
                    rounded
                    class="mx-4"
                    >
                    <v-icon>
                        {{ link.icon }}
                    </v-icon>
                </v-btn>
            </v-col>
    </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { icon: 'fab fa-github', link: "" },
        { icon: 'fab fa-linkedin', link: "" },
      ],
    }),
  }
</script>

<style>

</style>