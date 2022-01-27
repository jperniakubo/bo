<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row>
        <v-col class="py-0" cols="11">
          <v-row>
            <v-col class="py-0" cols="12" sm="12" md="12">
              <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="3" md="3">
          <v-text-field
            placeholder="Buscar Espacio"
            solo flat dense
            class="classicInput"
            append-icon="search"
            @keyup="setFilter()"
            v-model="officeName"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col style="max-width: fit-content !important;">
          <p class="mt-2 mb-0 sfProDisplaySemiBold">Seleccionar día:</p>
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            v-model="picker"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFilter"
                solo dense
                label="Seleccionar"
                readonly
                class="input-select"
                v-bind="attrs"
                v-on="on"
                hide-details>
                <template v-slot:prepend-inner>
                  <v-icon class="input-icon-arrow mt-n1" color="primary">mdi-chevron-down</v-icon>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              locale="es"
              no-title
              v-model="dateFilter"
              @input="picker = false"
              @change="setFilter">
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="1">
          <img v-show="showBtnClearFilters" class="imgAsBtnClearFilter" src="/ic_remove.svg" @click="clearFilters()"/>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="limit"
              class="dataTableStyle"
              hide-default-footer>
              <template v-slot:item.ver="{ item }">
                <a
                  @click="$router.push({path: '/cities/'+item.id})"
                  v-html="item.ver"
                  class="classicLinkInsideTable"
                ></a>
              </template>
              <template v-slot:item.date="{ item }">
                <div>
                  {{ item.date }}
                  <br />
                  <h5 class="red--text font-weight-regular text--darken-4">
                    {{ item.time }}
                  </h5>
                </div>
              </template>
            </v-data-table>
            <div class="text-center pt-2 classicPagination">
              <v-pagination
              v-model="page"
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
import moment from "moment";
export default {
  layout: 'logged',
  components: {},
  data() {
    return {
      itemBreadcrumbs: [
        {
          text: 'Espacios',
          disabled: false,
          href: '/cities',
        },
        {
          text: 'Reservas',
          disabled: true,
          href: '/cities/reservations',
        },
      ],
      picker: false,
      showBtnClearFilters: false,
      headers: [
        { text: "Usuario", sortable: false, value: "fullName" },
        { text: "Fecha y Hora", sortable: false, value: "date" },
        { text: "Ciudad", sortable: false, value: "city" },
        { text: "Edificio", sortable: false, value: "building" },
        { text: "Oficina", sortable: false, value: "officeName" },
        { text: "Tipo Oficina", sortable: false, value: "officeType" },
        { text: "Ver", sortable: false, value: "ver" },
      ],
      desserts: [],
      officeName: '',
      dateFilter:'',
      page: 1,
      paginationLength: 1,
      visible:12,
      limit: 30,
      totalRows:0,
      currentUrl:'',
    }
  },
  mounted() {
    moment.locale("es");
    var self = this
    self.currentUrl = window.location.href;
    if (self.currentUrl == localStorage.getItem("secondPageUrl")) {
      self.page = parseInt(localStorage.getItem("secondPageNumber"));
      self.officeName = localStorage.getItem("filterOfficeName");
      self.dateFilter = localStorage.getItem("filterDate");
    }else{
      localStorage.setItem("secondPageUrl", window.location.href);
      localStorage.setItem("secondPageNumber", self.page);
      localStorage.setItem("filterOfficeName", self.officeName);
      localStorage.setItem("filterDate", self.dateFilter);
    }

    self.getAllByDateAndOffice();
    self.verifyShowClearBtn();
  },
  methods: {
    verifyShowClearBtn(){
      if((this.officeName !== "" && this.officeName !== undefined) || (this.dateFilter !== "" && this.dateFilter !== undefined)){
        this.showBtnClearFilters = true;
      }else{
        this.showBtnClearFilters = false;
      }
    },
    clearFilters(){
      this.officeName = "";
      this.dateFilter = "";
      this.setFilter();
    },
    changePage(){
      this.getAllByDateAndOffice();
      localStorage.setItem("secondPageNumber", this.page);
      localStorage.setItem("secondPageUrl", window.location.href);
      this.toSection();
    },
    toSection(){
      var element = document.getElementById('topList');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    setFilter(){
      localStorage.setItem("filterOfficeName", this.officeName);
      localStorage.setItem("filterDate", this.dateFilter);
      this.page = 1;
      localStorage.setItem("secondPageNumber", this.page);
      this.getAllByDateAndOffice();
      this.verifyShowClearBtn();
    },
    async getAllByDateAndOffice(){

      let form = {
        acstkn: localStorage.getItem("acstkn"),
        limit: this.limit
      };
      form["offset"] = (this.page-1) * this.limit;
      form["officeName"] = this.officeName;
      form["date"] = this.dateFilter;

      await this.$store.dispatch('reservations/getAllByDateAndOffice', form)
      .then((response) => {
        if (response.success && response.code===100) {
          this.totalRows = response.body.totalRows;
          this.desserts = response.body.reservations;

          this.desserts.forEach((resp) => {
            resp.fullName = resp.users.fullName;
            let timeStart = resp.date + "T" + resp.startTime + ":00-05:00";
            let timeEnd = resp.date + "T" + resp.endTime + ":00-05:00";
            resp.date = moment(resp.date).format("MMMM D, YYYY").toUpperCase();
            resp.time = moment(timeStart).format("hh:mm a").toUpperCase() +
              " - " +
              moment(timeEnd).format("hh:mm a").toUpperCase();
            resp.city = resp.office.city.name;
            resp.building = resp.office.building.name;
            resp.officeName = resp.office.name;
            resp.officeType = resp.office.officeType.name;
            resp.ver = "ver";
        });

          if (this.limit > 0 && this.totalRows > 0) {
              this.paginationLength = Math.ceil(this.totalRows / this.limit);
          }else{
            this.paginationLength = 1;
          }
        }
      })
      .catch((error) => {
      });
    },

  },
}
</script>
