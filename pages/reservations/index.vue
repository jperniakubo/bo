<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <!-- <v-row class="pl-4 pr-4 d-flex justify-end"> -->
      <v-row class="pl-4 pr-4 d-flex justify-center">
        <v-col cols="12" sm="12" md="12" class="d-flex justify-center">
          <v-btn-toggle v-model="status" color="primary" @change="setFilter()">
            <v-btn
              class="px-12 btnTapsReservation"
              value="all"
              outlined
              color="primary"
            >
              Todas
            </v-btn>

            <v-btn
              class="px-12 btnTapsReservation"
              value="active"
              outlined
              color="primary"
            >
              Activas
            </v-btn>

            <v-btn
              class="px-12 btnTapsReservation"
              value="inactive"
              outlined
              color="primary"
            >
              Canceladas
            </v-btn>

            <v-btn
              class="px-12 btnTapsReservation"
              value="used"
              outlined
              color="primary"
            >
              Ejecutadas
            </v-btn>
            <v-btn
              class="px-12 btnTapsReservation"
              value="expired"
              outlined
              color="primary"
            >
              Expiradas
            </v-btn>
          </v-btn-toggle>
          <v-row align="center" justify="end">
            <v-btn-toggle color="primary">
              <download-csv
                class="px-12 btnTapsReservation v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--light v-size--default primary--text"
                :data="json_data"
                name="orders.csv"
              >
                <span class="v-btn__content">Exportar</span>
              </download-csv>
            </v-btn-toggle>
          </v-row>
        </v-col>
        <v-col cols="2" class="colsFilters">
          <label id="topList">Nombre</label>
          <v-text-field
            placeholder="Nombre cliente"
            solo
            dense
            style="border-radius: 10px !important"
            class="classicInput mx-auto"
            append-icon="search"
            v-model="fullName"
            @keyup="setFilter()"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="colsFilters">
          <label for="" class="font-weight-regular">Ciudad</label>
          <v-autocomplete
            @change="setFilter()"
            :items="selectCity"
            v-model="city"
            item-text="title"
            style="border-radius: 10px !important"
            class="classicInput"
            item-value="id"
            label="Ciudad"
            solo
            dense
            append-icon
          >
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary"
                >mdi-chevron-down</v-icon
              >
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="2" class="colsFilters">
          <label for="" class="font-weight-regular">Edificio</label>
          <v-autocomplete
            @change="setFilter()"
            :items="selectBuilding"
            v-model="building"
            item-text="title"
            class="classicInput"
            style="border-radius: 10px !important"
            item-value="id"
            label="Edificio"
            solo
            dense
            append-icon
          >
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary"
                >mdi-chevron-down</v-icon
              >
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="2" class="colsFilters">
          <label for="" class="font-weight-regular">Tipo Oficina</label>
          <v-autocomplete
            @change="setFilter()"
            :items="selectOfficeType"
            v-model="officeType"
            style="border-radius: 10px !important"
            item-text="title"
            class="classicInput"
            item-value="id"
            label="Tipo de oficina"
            solo
            dense
            append-icon
          >
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary"
                >mdi-chevron-down</v-icon
              >
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="1" class="colsFilters">
          <img
            v-show="showBtnClearFilters"
            class="inputWithoutLabel imgAsBtnClearFilter"
            src="/ic_remove.svg"
            @click="clearFilters()"
          />
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4 d-flex justify-center">
        <v-col cols="2" class="colsFilters">
          <label for="" class="font-weight-regular">Ordenar por</label>
          <v-autocomplete
            @change="setFilter()"
            :items="selectordersBy"
            v-model="orderBy"
            style="border-radius: 10px !important"
            item-text="text"
            class="classicInput"
            item-value="value"
            label="Ordenar por"
            solo
            dense
            hide-details
            append-icon
          >
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary"
                >mdi-chevron-down</v-icon
              >
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="2" class="colsFilters">
          <label for="" class="font-weight-regular">Orden</label>
          <v-autocomplete
            @change="setFilter()"
            :items="selectSorts"
            v-model="sort"
            style="border-radius: 10px !important"
            item-text="text"
            class="classicInput"
            item-value="value"
            label="orden"
            solo
            dense
            hide-details
            append-icon
          >
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary"
                >mdi-chevron-down</v-icon
              >
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="limit"
              class="dataTableStyle"
              hide-default-footer
            >
              <template v-slot:item.ver="{ item }">
                <a
                  @click="$router.push({ path: '/reservations/' + item.id })"
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
                @input="changePage()"
              ></v-pagination>
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
  layout: "logged",
  components: {},
  data() {
    return {
      json_data: [],
      showBtnClearFilters: false,
      headers: [
        { text: "Usuario", sortable: false, value: "fullName" },
        { text: "Fecha y Hora", sortable: false, value: "date" },
        { text: "Ciudad", sortable: false, value: "city" },
        { text: "Edificio", sortable: false, value: "building" },
        { text: "Oficina", sortable: false, value: "officeName" },
        { text: "Tipo Oficina", sortable: false, value: "officeType" },
        { text: "Ver", sortable: false, value: "ver" }
      ],
      desserts: [],
      selectCity: [],
      city: "",
      selectOfficeType: [],
      officeType: "",
      selectBuilding: [],
      building: "",
      fullName: "",
      page: 1,
      paginationLength: 1,
      visible: 12,
      limit: 30,
      needle: "",
      status: "all",
      totalRows: 0,
      cityIdFilter: 0,
      currentUrl: "",
      selectordersBy: [
        {
          text: "Fecha",
          value: "ReservationOffice.date"
        },
        {
          text: "Usuario",
          value: "users.fullName"
        },
        {
          text: "Ciudad",
          value: "office->city.name"
        },
        {
          text: "Edificio",
          value: "office->building.name"
        },
        {
          text: "Oficina",
          value: "office.name"
        },
        {
          text: "Tipo de oficina",
          value: "office->officeType.name"
        }
      ],
      selectSorts: [
        {
          text: "Descendente",
          value: "DESC"
        },
        {
          text: "Ascendente",
          value: "ASC"
        }
      ],
      orderBy: "ReservationOffice.date",
      sort: "DESC"
    };
  },
  mounted() {
    moment.locale("es");
    this.currentUrl = window.location.href;
    if (this.currentUrl == localStorage.getItem("firstPageUrl")) {
      this.page = parseInt(localStorage.getItem("firstPageNumber"));
      this.fullName = localStorage.getItem("filterName");
      localStorage.getItem("filterbuilding") !== ""
        ? (this.building = parseInt(localStorage.getItem("filterbuilding")))
        : (this.building = "");
      localStorage.getItem("filtercity") !== ""
        ? (this.city = parseInt(localStorage.getItem("filtercity")))
        : (this.city = "");
      localStorage.getItem("filterOfficeType") !== ""
        ? (this.officeType = parseInt(localStorage.getItem("filterOfficeType")))
        : (this.officeType = "");
      localStorage.getItem("filterStatus") !== ""
        ? (this.status = localStorage.getItem("filterStatus"))
        : (this.status = "all");
      localStorage.getItem("filterOrderBy") !== ""
        ? (this.orderBy = localStorage.getItem("filterOrderBy"))
        : (this.orderBy = "ReservationOffice.date");
      localStorage.getItem("filterSort") !== ""
        ? (this.sort = localStorage.getItem("filterSort"))
        : (this.sort = "DESC");
    } else {
      localStorage.setItem("filterName", this.fullName);
      localStorage.setItem("filterbuilding", this.building);
      localStorage.setItem("filtercity", this.city);
      localStorage.setItem("filterOfficeType", this.officeType);
      localStorage.setItem("filterStatus", this.status);
      localStorage.setItem("firstPageNumber", this.page);
      localStorage.setItem("firstPageUrl", window.location.href);
      localStorage.setItem("filterOrderBy", this.orderBy);
      localStorage.setItem("filterSort", this.sort);
    }
    localStorage.setItem("secondPageUrl", "");
    // this.listReservation();
    this.getReservations();
    this.getReservationsCVS();
    this.listCities();
    this.listBuildings();
    this.listOfficeType();
    this.verifyShowClearBtn();
  },
  methods: {
    verifyShowClearBtn() {
      if (
        (this.fullName !== "" && this.fullName !== undefined) ||
        (this.building !== "" && this.building !== undefined) ||
        (this.city !== "" && this.city !== undefined) ||
        (this.officeType !== "" && this.officeType !== undefined)
        // || (this.orderBy !== "ReservationOffice.date")
        // || (this.sort !== "DESC")
      ) {
        this.showBtnClearFilters = true;
      } else {
        this.showBtnClearFilters = false;
      }
    },
    clearFilters() {
      this.fullName = "";
      this.building = "";
      this.city = "";
      this.officeType = "";
      this.setFilter();
    },
    changePage() {
      this.getReservations();
      localStorage.setItem("firstPageNumber", this.page);
      localStorage.setItem("firstPageUrl", window.location.href);
      this.toSection();
    },
    toSection() {
      var element = document.getElementById("topList");
      element.scrollIntoView({ behavior: "smooth" });
    },
    setFilter() {
      if (this.city !== "" && this.city !== undefined) {
        this.cityIdFilter = this.city;
      } else {
        this.cityIdFilter = 0;
      }
      if (this.orderBy === "" || this.orderBy === undefined) {
        this.orderBy = "ReservationOffice.date";
      }
      if (this.sort === "" || this.sort === undefined) {
        this.sort = "DESC";
      }
      this.listBuildings();
      localStorage.setItem("filterName", this.fullName);
      localStorage.setItem("filterbuilding", this.building);
      localStorage.setItem("filtercity", this.city);
      localStorage.setItem("filterOfficeType", this.officeType);
      localStorage.setItem("filterStatus", this.status);
      localStorage.setItem("filterOrderBy", this.orderBy);
      localStorage.setItem("filterSort", this.sort);
      this.page = 1;
      localStorage.setItem("firstPageNumber", this.page);
      this.getReservations();
      this.verifyShowClearBtn();
    },
    async getReservationsCVS() {
      let form = {
        acstkn: localStorage.getItem("acstkn"),
        limit: 10000,
        columnOrder: this.orderBy,
        sortBy: this.sort
      };

      form["offset"] = (this.page - 1) * this.limit;
      if (this.fullName != "") {
        form["fullName"] = this.fullName;
      }
      if (this.building !== "" && this.building !== undefined) {
        form["buildingId"] = this.building;
      }
      if (this.city !== "" && this.city !== undefined) {
        form["cityId"] = this.city;
      }
      if (this.officeType !== "" && this.officeType !== undefined) {
        form["officeTypeId"] = this.officeType;
      }
      if (this.status != "") {
        if (this.status != "all") {
          form["status"] = this.status;
        }
      }

      await this.$store
        .dispatch("reservations/reservationOffice", form)
        .then(response => {
          if (response.success && response.code === 100) {
            this.temp = response.body.reservations;

            console.log("temp", this.temp);

            this.temp.forEach(resp => {
              resp.city = resp.office.city.name;
              resp.building = resp.office.building.name;
              resp.users = resp.users.fullName;
              resp.officeType = resp.office.officeType.name;
              resp.office = resp.office.name;
            });

            this.json_data = this.temp;
            console.log("data", this.json_data);
          }
        })
        .catch(error => {});
    },
    async getReservations() {
      let form = {
        acstkn: localStorage.getItem("acstkn"),
        limit: this.limit,
        columnOrder: this.orderBy,
        sortBy: this.sort
      };

      form["offset"] = (this.page - 1) * this.limit;
      if (this.fullName != "") {
        form["fullName"] = this.fullName;
      }
      if (this.building !== "" && this.building !== undefined) {
        form["buildingId"] = this.building;
      }
      if (this.city !== "" && this.city !== undefined) {
        form["cityId"] = this.city;
      }
      if (this.officeType !== "" && this.officeType !== undefined) {
        form["officeTypeId"] = this.officeType;
      }
      if (this.status != "") {
        if (this.status != "all") {
          form["status"] = this.status;
        }
      }

      await this.$store
        .dispatch("reservations/reservationOffice", form)
        .then(response => {
          if (response.success && response.code === 100) {
            this.totalRows = response.body.totalRows;
            this.desserts = response.body.reservations;

            this.desserts.forEach(resp => {
              resp.fullName = resp.users.fullName;
              let timeStart =
                resp.startTime[1] === ":"
                  ? resp.date + "T" + "0" + resp.startTime + ":00-05:00"
                  : resp.date + "T" + resp.startTime + ":00-05:00";
              let timeEnd = resp.date + "T" + resp.endTime + ":00-05:00";
              console.log("timeStart", timeStart, timeEnd);
              resp.date = moment(resp.date)
                .format("MMMM D, YYYY")
                .toUpperCase();
              resp.time =
                moment(timeStart)
                  .format("hh:mm a")
                  .toUpperCase() +
                " - " +
                moment(timeEnd)
                  .format("hh:mm a")
                  .toUpperCase();
              resp.city = resp.office.city.name;
              resp.building = resp.office.building.name;
              resp.officeName = resp.office.name;

              resp.officeType = resp.office.officeType.name;
              resp.ver = "ver";
            });

            if (this.limit > 0 && this.totalRows > 0) {
              this.paginationLength = Math.ceil(this.totalRows / this.limit);
            } else {
              this.paginationLength = 1;
            }
          }
        })
        .catch(error => {
          this.$router.push({ path: "/logout", force: true });
        });
    },
    async listCities() {
      let formTemp = {
        acstkn: localStorage.getItem("acstkn"),
        needle: ""
      };
      const response = await this.$store.dispatch(
        "cities/listCities",
        formTemp
      );
      this.selectCity = [];
      if (response.success) {
        response.body.cities.forEach(resp => {
          this.selectCity.push({
            id: resp.id,
            title: resp.name
          });
        });
      }
    },
    async listBuildings() {
      let formTemp = {
        acstkn: localStorage.getItem("acstkn"),
        cityId: this.cityIdFilter,
        needle: ""
      };
      const response = await this.$store.dispatch(
        "building/listBuildings",
        formTemp
      );
      this.selectBuilding = [];
      if (response.success) {
        response.body.buildings.forEach(resp => {
          this.selectBuilding.push({
            id: resp.id,
            title: resp.name
          });
        });
      }
    },
    async listOfficeType() {
      let formTemp = {
        acstkn: localStorage.getItem("acstkn"),
        name: ""
      };
      const response = await this.$store.dispatch(
        "officeType/officeTypeList",
        formTemp
      );
      this.selectOfficeType = [];
      if (response.success) {
        response.body.officeTypes.forEach(resp => {
          this.selectOfficeType.push({
            id: resp.id,
            title: resp.name
          });
        });
      }
    }
  }
};
</script>
