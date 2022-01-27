<template>
  <v-container>
  </v-container>
</template>

<script>

export default {
  layout: 'logged',
  directives: {},
  data () {
    return {
    }
  },
  components: {},
  mounted(){
    localStorage.removeItem("boAdminId");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    localStorage.removeItem("position");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("currentRole");
    localStorage.removeItem("uid");
    localStorage.removeItem("needle");
    localStorage.removeItem("firstPageNumber");
    localStorage.removeItem("filterOrigin");
    localStorage.removeItem("editAdminId");
    localStorage.removeItem("exchangeDate");
    localStorage.removeItem("firstLogin");
    // localStorage.removeItem("acstkn");
    // localStorage.removeItem("typeOfficeFilter");
    // localStorage.removeItem("cityIdFilter");
    // localStorage.removeItem("needleOrName");
    var self=this
    self.$store.commit("userTransactions/setOrigin",'/')
    window.location = "/";
  },
  created(){
  },
  methods:{
  },
}
</script>
<style>
</style>
