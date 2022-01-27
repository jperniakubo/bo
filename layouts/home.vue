<template>
  <v-app class="loginBackStyle">
      <div>
        <v-main>
          <nuxt />
        </v-main>
      </div>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
    }),
    created(){
      this.$store.dispatch("generateAcsTkn")
      .then(res => {
        localStorage.setItem("acstkn", res.body.accessToken)
      })
      .catch(err => {
      });
    },
    mounted() {},
  }
</script>
