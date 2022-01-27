<template>
  <v-layout>
    <v-flex>
      <v-row class="px-5">
         <v-col cols="12" sm="3" md="3">
          <label>Buscar</label>
          <v-text-field
            placeholder="Buscar"
            solo dense
            style="border-radius: 10px !important;"
            class="classicInput mx-auto"
            append-icon="search"
            v-model="question"
            @keyup="helpCenterList"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6" class="d-flex justify-end"></v-col>
        <v-col cols="12" sm="3" md="3" class="d-flex justify-end">
          <v-btn class="classicButton btnCreate" dark @click="$router.replace({path:'/help/create'})">
            <!-- <v-img src="/iconAdd.svg" class="mr-2 imageCreateAdmin"></v-img> -->
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear pregunta
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="px-5">
        <v-col cols="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              class="dataTableStyle"
              @page-count="pageCount = $event">
              <!-- <template v-slot:item.fullName="{ item }">
                <a @click="goToEditAdmin(item.id)" v-html="item.fullName" class="classicLinkInsideTable"></a>
              </template> -->
              <template v-slot:item.status="{ item }">
                <!-- <v-switch
                  :input-value="item.status === 'active'"
                  @change="changeAdminStatus(item.id, item.status)"
                  color="#03499F"
                ></v-switch> -->
                <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="changeHelpCenterStatus(item.id)">
                <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="ic_status_green.svg" @click="changeHelpCenterStatus(item.id)">
              </template>
              <template v-slot:item.options="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="$router.replace({path:'/help/edit/'+item.id})">
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <div class="text-center pt-2 classicPagination">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
  components: {
  },
  data() {
    return {
      headers: [
        {text: 'Ayuda', sortable: false, value:'help'},
        {text: 'Respuesta', sortable: false, value: 'answer'},
        {text: 'Estado', sortable: false, value: 'status'},
        {text: 'Editar', sortable: false, value: 'options'},
      ],
      desserts: [],
      page: 1,
      itemsPerPage: 50,
      pageCount: 0,
      question: '',
    }
  },
  mounted() {
    localStorage.setItem("firstPageUrl", window.location.href);
    localStorage.setItem("secondPageUrl", "");
    this.helpCenterList()
  },
  methods: {

    async helpCenterList(){
      const response = await this.$store.dispatch('helpCenter/helpCenterList', {
        acstkn: localStorage.getItem("acstkn"),
        limit: 150,
        offset: 0,
        question: this.question
      });
      if (response.success) {
        this.desserts = [];
        response.body.helpCenters.forEach(userRecord => {
          this.desserts.push({
            id: userRecord.id,
            help: userRecord.question,
            answer: userRecord.answer,
            status: userRecord.status
          })
        });
      } else {
         this.$router.push({ path: "/logout", force: true })
      }
    },
    async changeHelpCenterStatus(id){
      const response = await this.$store.dispatch('helpCenter/helpCenterStatus', {
        acstkn: localStorage.getItem("acstkn"),
        id: id
      });
      this.helpCenterList()
    },
  },
  computed: {
  }
}
</script>
