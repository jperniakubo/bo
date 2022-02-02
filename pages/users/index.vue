<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4 prueba-deploy">
        <v-col cols="12" sm="3" md="3">
          <label id="topList">Buscar:</label>
          <v-text-field
            placeholder="Nombre, correo ó cargo"
            solo flat dense
            class="classicInput"
            append-icon="search"
            v-model="formListUser.needle"
            @keyup="setFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6"></v-col>
        <v-col cols="12" sm="3" md="3">
          <v-btn class="classicButton btnCreate" dark @click="goToPositions()">
            Ver cargos
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="allUsers"
              :items-per-page="50"
              class="dataTableStyle"
              hide-default-footer>
              <template v-slot:item.fullName="{ item }">
                <a @click="goToUserDeatils(item.uid)" v-html="item.fullName" class="classicLinkInsideTable"></a>
              </template>
              <template v-slot:item.state="{ item }">
                <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="changeUserState(item.uid, item.status)">
                <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="/ic_status_green.svg" @click="changeUserState(item.uid, item.status)">
              </template>
            </v-data-table>
            <div class="text-center pt-2 classicPagination">
              <v-pagination
              v-model="formListUser.page"
              :length="paginationLength"
              :total-visible="visible"
              @input="changePage()"></v-pagination>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'logged',
  components: {},
  data() {
    return {
      headers: [
        {text: 'Usuario', sortable: false, value:'fullName'},
        {text: 'Cargo', sortable: false, value: 'position'},
        {text: 'Correo electrónico', sortable: false, value: 'email'},
        {text: 'Cant. reservas', sortable: false, value: 'amountOfReservations'},
        {text: 'Estado', sortable: false, value: 'state'}
      ],
      allUsers: [],
      visible:12,
      paginationLength: 1,
      totalRows:0,
      formListUser:{
        acstkn:'',
        needle:'',
        limit:40,
        offset:0,
        page:1,
      },
      currentUrl:'',
    }
  },
  mounted() {
        this.listAndSearchUsers();

    if(parseInt(localStorage.getItem("currentRole")) !== 1){
      this.$router.push({ path: "/dashboard", force: true })
    }
    var self = this
    this.currentUrl = window.location.href;
    if (self.currentUrl==localStorage.getItem("firstPageUrl")) {
      self.formListUser.page = parseInt(localStorage.getItem("firstPageNumber"));
      self.formListUser.needle = localStorage.getItem("needle");
    }else{
      localStorage.setItem("needle", self.formListUser.needle);
      localStorage.setItem("firstPageNumber", self.formListUser.page);
      localStorage.setItem("firstPageUrl", window.location.href);
    }
    localStorage.setItem("secondPageUrl", "");
  },
  methods: {
    goToPositions(){
      localStorage.setItem("needle", this.formListUser.needle);
      localStorage.setItem("firstPageNumber", this.formListUser.page);
      this.$router.push('/users/positions')
    },
    async listAndSearchUsers(){
      this.formListUser.acstkn = localStorage.getItem("acstkn");
      this.formListUser.offset = (this.formListUser.page-1) * this.formListUser.limit;
      await this.$store.dispatch('user/listUsers', this.formListUser)
      .then((response) => {
        
        if (response.success && response.code === 100) {
          this.totalRows = response.body.total;
          this.allUsers = response.body.users;
          if (this.formListUser.limit > 0 && this.totalRows > 0) {
              this.paginationLength = Math.ceil(this.totalRows / this.formListUser.limit);
          }else{
            this.paginationLength = 1;
          }
        } else {
          this.$router.push({ path: "/logout", force: true })
        }
      })
      .catch((error) => {
        this.$router.push({ path: "/logout", force: true })
      });
    },
    clearFilters(){
      this.formListUser.needle = '';
      this.formListUser.page = 1;
      this.setFilter();
    },
    setFilter(){
      this.formListUser.page = 1;
      localStorage.setItem("needle", this.formListUser.needle);
      localStorage.setItem("firstPageNumber", this.formListUser.page);
      this.listAndSearchUsers();
    },
    changePage(){
      this.listAndSearchUsers();
      localStorage.setItem("firstPageNumber", this.formListUser.page);
      localStorage.setItem("firstPageUrl", window.location.href);
      this.toSection();
    },
    toSection(){
      var element = document.getElementById('topList');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    async changeUserState(userId, status){
      await this.$store.dispatch('user/changeUserState', {
        uid: userId,
        active: (status === 'active') ? 0 : 1,
        acstkn: localStorage.getItem("acstkn"),
        logBoAdminId: localStorage.getItem("boAdminId")
      })
      this.listAndSearchUsers();
    },
    goToUserDeatils(uid){
      localStorage.setItem('uid', uid);
      this.$router.push('/users/userInfo');
    }

  },
}
</script>
<style scoped>
  .prueba-deploy{
    background-color: #000;
  }
</style>
