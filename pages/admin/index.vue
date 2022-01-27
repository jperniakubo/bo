<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="3" md="3">
          <label id="topList">Buscar:</label>
          <v-text-field
            placeholder="Nombre o correo electrónico"
            solo flat dense
            class="classicInput"
            append-icon="search"
            v-model="formSearchAdmins.needle"
            @keyup="setFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6"></v-col>
        <v-col cols="12" sm="3" md="3">
          <v-btn class="classicButton btnCreate" dark @click="goToCreateAdmin">
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear admin
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="admins"
              :items-per-page="50"
              class="dataTableStyle"
              hide-default-footer>
              <template v-slot:item.fullName="{ item }">
                <a @click="goToEditAdmin(item.id)" v-html="item.fullName" class="classicLinkInsideTable"></a>
              </template>
              <template v-slot:item.status="{ item }">
                <!-- <v-switch
                  :input-value="item.status === 'active'"
                  @change="changeAdminStatus(item.id, item.status)"
                  color="#03499F"
                ></v-switch> -->
                <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="changeAdminStatus(item.id, item.status)">
                <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="/ic_status_green.svg" @click="changeAdminStatus(item.id, item.status)">
              </template>
              <template v-slot:item.options="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="goToEditAdmin(item.id)">
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <div class="text-center pt-2 classicPagination">
              <v-pagination
              v-model="formSearchAdmins.page"
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
        {text: 'Nombre', sortable: false, value:'fullName'},
        {text: 'Cargo', sortable: false, value: 'position'},
        {text: 'Correo electrónico', sortable: false, value: 'email'},
        {text: 'Estado', sortable: false, value: 'status'},
        {text: 'Editar', sortable: false, value: 'options'}
      ],
      admins: [],
      visible:12,
      paginationLength: 1,
      totalRows:0,
      formSearchAdmins:{
        acstkn:'',
        needle:'',
        limit:50,
        offset:0,
        page:1,
      },
      currentUrl:'',
    }
  },
  mounted() {
        this.listAndSearchAdmins();
    if(parseInt(localStorage.getItem("currentRole")) !== 1){
      this.$router.push({ path: "/dashboard", force: true })
    }
    this.currentUrl = window.location.href;
    if (this.currentUrl==localStorage.getItem("firstPageUrl")) {
      this.formSearchAdmins.page = parseInt(localStorage.getItem("firstPageNumber"));
      this.formSearchAdmins.needle = localStorage.getItem("needle");
    }else{
      localStorage.setItem("needle", this.formSearchAdmins.needle);
      localStorage.setItem("firstPageNumber", this.formSearchAdmins.page);
      localStorage.setItem("firstPageUrl", window.location.href);
    }
    localStorage.setItem("secondPageUrl", "");
  },
  methods: {
    goToCreateAdmin(){
      localStorage.setItem("needle", '');
      localStorage.setItem("firstPageNumber", 1);
      this.$router.push('/admin/createAdmin')
    },
    async listAndSearchAdmins(){
      this.formSearchAdmins.acstkn = localStorage.getItem("acstkn");
      this.formSearchAdmins.offset = (this.formSearchAdmins.page-1) * this.formSearchAdmins.limit;
      await this.$store.dispatch('boAdmin/listAndSearchAdmins', this.formSearchAdmins)
      .then((response) => {
        if (response.success) {
          this.totalRows = response.body.total;
          this.admins = response.body.admins;
          if (this.formSearchAdmins.limit > 0 && this.totalRows > 0) {
              this.paginationLength = Math.ceil(this.totalRows / this.formSearchAdmins.limit);
          }else{
            this.paginationLength = 1;
          }
        }
      })
      .catch((error) => {
        this.$router.push({ path: "/logout", force: true })
      });
    },
    clearFilters(){
      this.formSearchAdmins.needle = '';
      this.formSearchAdmins.page = 1;
      this.setFilter();
    },
    setFilter(){
      localStorage.setItem("needle", this.formSearchAdmins.needle);
      this.formSearchAdmins.page = 1;
      localStorage.setItem("firstPageNumber", this.formSearchAdmins.page);
      this.listAndSearchAdmins();
    },
    changePage(){
      this.listAndSearchAdmins();
      localStorage.setItem("firstPageNumber", this.formSearchAdmins.page);
      localStorage.setItem("firstPageUrl", window.location.href);
      this.toSection();
    },
    toSection(){
      var element = document.getElementById('topList');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    goToEditAdmin(boAdminId){
      localStorage.setItem("editAdminId", boAdminId);
      this.$router.push('/admin/viewAndUpdateAdmin');
    },
    async changeAdminStatus(boAdminId, state){
      await this.$store.dispatch('boAdmin/changeAdminState', {
        id: boAdminId,
        active: (state === 'active') ? 0 : 1,
        acstkn: localStorage.getItem("acstkn"),
        logBoAdminId: localStorage.getItem("boAdminId")
      })
      this.listAndSearchAdmins();
    },
  },
}
</script>
