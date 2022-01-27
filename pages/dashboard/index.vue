<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="mx-2">
        <v-col cols="12" md="12">
          <!-- Filtro de fechas -->
          <v-row class="selected">
            <v-col cols="12" md="3">
              <label for="" class="font-weight-medium"
                >Rango de Fecha inicio:</label
              >
              <v-menu
                v-model="picker"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="searchDateFrom"
                    solo
                    label="2020-12-01"
                    readonly
                    class="input-select"
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="input-icon-arrow mt-n1" color="primary"
                        >mdi-chevron-down</v-icon
                      >
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  locale="es"
                  no-title
                  :max="searchDateTo ? searchDateTo : ''"
                  v-model="searchDateFrom"
                  @input="picker = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3">
              <label for="" class="font-weight-medium"
                >Rango de Fecha fin:</label
              >

              <v-menu
                v-model="picker2"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="searchDateTo"
                    solo
                    label="2020-12-01"
                    readonly
                    class="input-select"
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="input-icon-arrow mt-n1" color="primary"
                        >mdi-chevron-down</v-icon
                      >
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  locale="es"
                  v-model="searchDateTo"
                  :min="searchDateFrom ? searchDateFrom : ''"
                  no-title
                  @input="picker2 = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                elevation="0"
                class="btnApplyFilter sfProDisplayMedium"
                dark
                @click="filterAll()"
              >
                Filtrar
              </v-btn>
            </v-col>
          </v-row>

          <!-- seccion usuarios KPMG -->

          <v-row>
            <v-col cols="12" md="8">
              <p class="sfProDisplayBold txtTitles1Dashboard">Usuarios KPMG</p>
            </v-col>
            <v-col cols="12" md="4">
              <p class="sfProDisplayBold txtTitles1Dashboard">Edificio</p>
            </v-col>
          </v-row>

          <!-- cards con listados - usuarios KPMG -->
          <v-row>
            <v-col cols="12" md="4">
              <v-card elevation="1" class="px-3" height="100%">
                <v-card-title primary-title class="pb-0 text-center">
                  <p
                    class="ma-0 text-h6 sfProDisplayRegular"
                    style="word-break: break-word !important"
                  >
                    Top 5 los que más reservan
                  </p>
                  <div
                    class="mx-auto mb-8"
                    style="border: 1px dashed #bbb; width: 90%"
                  ></div>
                </v-card-title>
                <v-card-text class="black--text selected">
                  <div
                    class="mb-7"
                    v-for="(items, index) of usersReservated"
                    :key="index"
                  >
                    <v-avatar size="35px" class="float-left mr-3 mt-n2">
                      <v-img :src="items.profileImg" alt="alt"></v-img>
                    </v-avatar>

                    <p class="float-left">{{ items.name.substring(0, 15) }}</p>
                    <p
                      class="text-right blue--text darken-4 font-weight-bold numbersStatistics"
                    >
                      {{ items.quantity }}
                    </p>
                  </div>
                  <p v-if="usersReservated.length == 0">No hay resultados</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="1" class="px-3" height="100%">
                <v-card-title primary-title class="pb-0 text-center">
                  <p
                    class="ma-0 text-h6 sfProDisplayRegular"
                    style="word-break: break-word"
                  >
                    Top 5 los que más cancelan
                  </p>
                  <div
                    class="mx-auto mb-8"
                    style="border: 1px dashed #bbb; width: 90%"
                  ></div>
                </v-card-title>
                <v-card-text class="black--text selected">
                  <div
                    class="mb-7"
                    v-for="(items, index) of usersCancelReservations"
                    :key="index"
                  >
                    <v-avatar size="35px" class="float-left mr-3 mt-n2">
                      <v-img :src="items.profileImg" alt="alt"></v-img>
                    </v-avatar>

                    <p class="float-left">{{ items.name.substring(0, 15) }}</p>
                    <p
                      class="text-right blue--text darken-4 font-weight-bold numbersStatistics"
                    >
                      {{ items.quantity }}
                    </p>
                  </div>
                  <p v-if="usersCancelReservations.length == 0">
                    No hay resultados
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card elevation="1" class="px-3" height="100%">
                <v-card-title primary-title class="pb-0 text-center">
                  <p
                    class="ma-0 text-h6 sfProDisplayRegular"
                    style="word-break: break-word !important"
                  >
                    Edificio
                  </p>
                  <div
                    class="mx-auto"
                    style="border: 1px dashed #bbb; width: 90%"
                  ></div>
                </v-card-title>
                <v-card-text class="black--text selected">
                  <v-select
                    @change="getOfficesPercent"
                    :items="selectCity"
                    v-model="cityId1"
                    item-text="name"
                    style="
                      border-radius: 10px !important;
                      width: 70% !important;
                    "
                    class="classicInput mx-auto mt-5"
                    item-value="id"
                    label="Seleccione una ciudad"
                    solo
                    append-icon
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="input-icon-arrow mt-n1" color="primary"
                        >mdi-chevron-down</v-icon
                      >
                    </template>
                  </v-select>

                  <div
                    class="mb-6"
                    v-for="(item, index) of percentageReservated"
                    :key="index"
                  >
                    <p class="float-left">{{ item.name }}</p>
                    <p
                      class="text-right blue--text darken-4 font-weight-bold numbersStatistics"
                    >
                      {{ item.percentage }}%
                    </p>
                  </div>

                  <p
                    v-if="
                      errorPercentages == true &&
                        percentageReservated.length == 0
                    "
                  >
                    {{ errorMessagePercentage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- seccion de top 3 de espacios -->
          <div v-if="officesReservated.length != 0">
            <v-row>
              <v-col cols="12" md="12">
                <p
                  class="sfProDisplayBold txtTitles1Dashboard"
                  style="word-break: break-word"
                >
                  Top 3 espacios más reservados
                </p>
              </v-col>
            </v-row>
            <!-- aca los cards con los 3 espacios más reservados -->
            <v-row>
              <v-col
                cols="4"
                v-for="(item, index) of officesReservated"
                :key="index"
              >
                <v-card outlined elevation="1" max-width="100%">
                  <v-img
                    class="white--text align-end"
                    style="border-radius: 5px"
                    height="90px"
                    width="100%"
                    :src="item.img ? item.img : '/reservation/img_banner.jpg'"
                  >
                    <!-- src="/reservation/img_banner.jpg" -->
                  </v-img>

                  <v-card-text class="text--primary py-0 px-4">
                    <v-row justify="space-between">
                      <v-col cols="12" sm="12" md="12" class="text-left">
                        <h2
                          class="sfProDisplaySemiBold primary--text pa-0 ma-0"
                          style="font-size: 16px !important"
                        >
                          {{ item.office.name }},
                          {{ item.office.floorBuilding.floor }}
                        </h2>
                        <p
                          class="sfProDisplayMedium my-0"
                          style="color: #3a4151 !important"
                        >
                          {{ item.office.building.name }} -
                          {{ item.office.city.name }}
                        </p>
                        <p
                          class="ma-0 sfProDisplaySemiBold"
                          style="color: #001d38 !important"
                        >
                          {{ item.quantity }} Reservas
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <!-- section top 5 spaces by city title -->
          <v-row>
            <v-col cols="12" md="12">
              <p class="sfProDisplayBold txtTitles1Dashboard">
                Top 5 de espacio por ciudad
              </p>
            </v-col>
          </v-row>
          <!-- section top 5 spaces by city data -->
          <v-row>
            <v-col cols="12" md="5">
              <v-card elevation="1" class="px-3" height="100%">
                <v-card-title primary-title class="pb-0 text-center">
                  <p class="ma-0 text-h6 sfProDisplayRegular">Más reservadas</p>
                  <div
                    class="mx-auto"
                    style="border: 1px dashed #bbb; width: 90%"
                  ></div>
                </v-card-title>
                <v-card-text class="black--text selected">
                  <v-select
                    @change="filterMoreCity"
                    :items="selectCity"
                    v-model="cityId"
                    item-text="name"
                    style="
                      border-radius: 10px !important;
                      width: 70% !important;
                    "
                    class="classicInput mx-auto mt-5"
                    item-value="id"
                    label="Seleccione una ciudad"
                    solo
                    append-icon
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="input-icon-arrow mt-n1" color="primary"
                        >mdi-chevron-down</v-icon
                      >
                    </template>
                  </v-select>

                  <div
                    class="mb-6"
                    v-for="(item, index) of cityMoreReservated"
                    :key="index"
                  >
                    <p class="float-left">{{ item.name }}</p>
                    <p
                      class="text-right blue--text darken-4 font-weight-bold numbersStatistics"
                    >
                      {{ item.quantity }}
                    </p>
                  </div>

                  <p v-if="error == true && cityMoreReservated.length == 0">
                    {{ errorMessage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="5">
              <v-card elevation="1" class="px-3" height="100%">
                <v-card-title primary-title class="pb-0 text-center">
                  <p class="ma-0 text-h6 sfProDisplayRegular">
                    Menos reservadas
                  </p>
                  <div
                    class="mx-auto"
                    style="border: 1px dashed #bbb; width: 90%"
                  ></div>
                </v-card-title>
                <v-card-text class="black--text selected">
                  <v-select
                    @change="filterLessCity"
                    :items="selectCity"
                    v-model="cityId2"
                    item-text="name"
                    style="
                      border-radius: 10px !important;
                      width: 70% !important;
                    "
                    class="classicInput mx-auto mt-5"
                    item-value="id"
                    label="Seleccione una ciudad"
                    solo
                    append-icon
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="input-icon-arrow mt-n1" color="primary"
                        >mdi-chevron-down</v-icon
                      >
                    </template>
                  </v-select>

                  <div
                    class="mb-6"
                    v-for="(item, index) of cityLessReservated"
                    :key="index"
                  >
                    <p class="float-left">{{ item.name }}</p>
                    <p
                      class="text-right blue--text darken-4 font-weight-bold numbersStatistics"
                    >
                      {{ item.quantity }}
                    </p>
                  </div>

                  <p v-if="error == true && cityLessReservated.length == 0">
                    {{ errorMessage }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- seccion de reservas totales -->
          <v-row>
            <v-col cols="12" md="12">
              <p class="sfProDisplayBold txtTitles1Dashboard">Reservas</p>
            </v-col>
          </v-row>

          <!-- Grafica de reservas totales -->
          <v-row>
            <v-col cols="12" md="12">
              <v-card elevation="1">
                <v-card-title primary-title class="pb-0">
                  <v-row>
                    <v-col>
                      <p class="ma-0">Reservas totales</p>
                    </v-col>
                    <v-col style="max-width: fit-content !important">
                      <v-btn-toggle
                        v-model="filterAllReservations"
                        color="primary"
                        @change="totalReservations()"
                      >
                        <v-btn
                          value="week"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Semana
                        </v-btn>

                        <v-btn
                          value="month"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Mes
                        </v-btn>

                        <v-btn
                          value="year"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Año
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-icon size="15px" color="#745AF3">mdi-circle</v-icon>
                  <label class="font-weight-medium" style="color: #745af3"
                    >Ejecutadas</label
                  >

                  <v-icon size="15px" class="ml-8" color="#26C6DB"
                    >mdi-circle</v-icon
                  >
                  <label class="font-weight-medium" style="color: #26c6db"
                    >Canceladas</label
                  >
                </v-card-text>
                <client-only>
                  <apexchart
                    type="bar"
                    height="300"
                    :options="charOptTotalReser"
                    :series="seriesTotalReservation"
                  ></apexchart>
                </client-only>
              </v-card>
            </v-col>
          </v-row>
          <!-- seccion de reservas por ciudades -->
          <v-row>
            <v-col cols="12" md="12">
              <p class="sfProDisplayBold txtTitles1Dashboard">Ciudades</p>
            </v-col>
          </v-row>
          <!-- grafica de reservas por ciudades -->
          <v-row>
            <v-col cols="12" md="12">
              <v-card elevation="1">
                <v-card-title primary-title class="pb-0">
                  <v-row>
                    <v-col>
                      <p class="ma-0">Reservas por ciudad</p>
                    </v-col>
                    <v-col style="max-width: fit-content !important">
                      <v-btn-toggle
                        v-model="filterCityReservations"
                        color="primary"
                        @change="reservationsByCity()"
                      >
                        <v-btn
                          value="week"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Semana
                        </v-btn>

                        <v-btn
                          value="month"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Mes
                        </v-btn>

                        <v-btn
                          value="year"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Año
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col
                      style="max-width: fit-content !important"
                      v-for="(item, index) of seriesRCity"
                      :key="index"
                    >
                      <v-icon
                        size="15px"
                        :color="
                          index === 0
                            ? '#1F88E5'
                            : index === 1
                            ? '#FFCE60'
                            : '#745af3'
                        "
                      >
                        mdi-circle
                      </v-icon>
                      <label
                        class="font-weight-medium"
                        :style="
                          index === 0
                            ? 'color: #1F88E5'
                            : index === 1
                            ? 'color: #FFCE60'
                            : 'color: #745af3'
                        "
                      >
                        {{ item.name }}
                      </label>
                    </v-col>
                  </v-row>
                  <client-only>
                    <apexchart
                      type="bar"
                      height="250"
                      :options="charOptCityReservation"
                      :series="seriesCityReservation"
                    >
                    </apexchart>
                  </client-only>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- seccion de reservas por tipo de oficina -->
          <v-row>
            <v-col cols="12" md="12">
              <p class="sfProDisplayBold txtTitles1Dashboard">Oficinas</p>
            </v-col>
          </v-row>
          <!-- grafica de reservas por tipo de oficina -->
          <v-row>
            <v-col cols="12" md="12">
              <v-card elevation="1">
                <v-card-title primary-title class="pb-0">
                  <v-row>
                    <v-col>
                      <p class="ma-0">Tipo de oficina</p>
                      <v-row>
                        <v-col
                          style="max-width: fit-content !important"
                          v-for="(item, index) of seriesROTypes"
                          :key="index"
                        >
                          <v-icon
                            size="15px"
                            :color="
                              index === 0
                                ? '#1F88E5'
                                : index === 1
                                ? '#00E396'
                                : index === 2
                                ? '#ffb01c'
                                : '#fe4560'
                            "
                          >
                            mdi-circle
                          </v-icon>
                          <label
                            class="font-weight-medium"
                            :style="
                              index === 0
                                ? 'color: #1F88E5'
                                : index === 1
                                ? 'color: #00E396'
                                : index === 2
                                ? 'color: #ffb01c'
                                : 'color: #fe4560'
                            "
                          >
                            {{ item.name }}
                          </label>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col style="max-width: fit-content !important">
                      <v-btn-toggle
                        v-model="filterOffTypeReservations"
                        color="primary"
                        @change="reservationsByOfficeType()"
                      >
                        <v-btn
                          value="week"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Semana
                        </v-btn>

                        <v-btn
                          value="month"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Mes
                        </v-btn>

                        <v-btn
                          value="year"
                          outlined
                          color="#02338D"
                          class="btnsTimeFrames"
                        >
                          Año
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <client-only>
                    <apexchart
                      type="line"
                      height="350"
                      ref="chart"
                      :options="charOptOTypesReservation"
                      :series="seriesOTypesReservation"
                    >
                    </apexchart>
                  </client-only>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
// import vueapexcharts from "vue-apexcharts";
import moment from "moment";
import loggedVue from "../../layouts/logged.vue";

export default {
  layout: "logged",
  components: {
    // vueapexcharts,
  },
  data() {
    return {
      minDate: "",
      maxDate: "",
      filterAllReservations: "week",
      filterCityReservations: "week",
      filterOffTypeReservations: "week",
      picker: false,
      searchDateFrom: "",
      picker2: false,
      searchDateTo: "",

      error: false,
      errorMessage: "",
      errorPercentages: false,
      errorMessagePercentage: "",

      percentageReservated: [],
      cityMoreReservated: [],
      cityLessReservated: [],
      officesReservated: [],
      usersReservated: [],
      usersCancelReservations: [],
      selectCity: [],

      cityId: 1,
      cityId1: 1,
      cityId2: 1,

      categoriesReservationAll: [],
      seriesRAllInactive: [],
      seriesRAllUsed: [],
      seriesTotalReservation: [],
      charOptTotalReser: {},

      categoriesReservationCity: [],
      seriesRCity: [],
      seriesCityReservation: [],
      charOptCityReservation: {},

      categoriesReservationOTypes: [],
      seriesROTypes: [],
      seriesOTypesReservation: [],
      charOptOTypesReservation: {}
    };
  },

  created() {
   // document.addEventListener("beforeunload", this.handler);
  },

  mounted() {
    //document.addEventListener('beforeunload', this.handler)
    this.listCity();
    let today = moment();
    this.searchDateTo = today.format("YYYY-MM-DD");
    this.searchDateFrom = today.subtract(1, "month").format("YYYY-MM-DD");

    localStorage.setItem("firstPageUrl", window.location.href);
    localStorage.setItem("secondPageUrl", "");

    this.filterMoreCity();
    this.filterLessCity();
    this.getOfficesPercent();
    this.filterUsers();
    this.getUsersCancelReservations();
    this.totalReservations();
    this.reservationsByCity();
    this.reservationsByOfficeType();
    this.getTopOfficesMoreReserved();
  },
  methods: {
    handler: function handler(event) {
      window.alert("prueba");
      alert(event);
    },
    async getTopOfficesMoreReserved() {
      var self = this;
      await this.$store
        .dispatch("dashboard/getTopOfficesMoreReserved", {
          acstkn: localStorage.getItem("acstkn"),
          dateInit: this.searchDateFrom + "T00:00:00-05:00",
          dateEnd: this.searchDateTo + "T00:00:00-05:00"
        })
        .then(response => {
          if (response.success && response.code === 100) {
            // console.log(response.body)
            this.officesReservated = response.body;
          } else {
            this.officesReservated = [];
          }
        })
        .catch(error => {
          this.officesReservated = [];
        });
    },
    async reservationsByOfficeType() {
      var self = this;
      await this.$store
        .dispatch("dashboard/reservationsByOfficeType", {
          acstkn: localStorage.getItem("acstkn"),
          timeFrame: this.filterOffTypeReservations
        })
        .then(response => {
          if (response.success && response.code === 100) {
            this.categoriesReservationOTypes = response.body.dates;
            this.seriesROTypes = response.body.officeTypes;
          } else {
            this.categoriesReservationOTypes = [];
            this.seriesROTypes = [];
          }
        })
        .catch(error => {
          this.categoriesReservationOTypes = [];
          this.seriesROTypes = [];
        });
      this.fillOTypeReservation();
    },
    fillOTypeReservation() {
      this.seriesOTypesReservation = this.seriesROTypes;
      this.charOptOTypesReservation = {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: this.categoriesReservationOTypes
        }
      };
    },
    async reservationsByCity() {
      var self = this;
      await this.$store
        .dispatch("dashboard/reservationsByCity", {
          acstkn: localStorage.getItem("acstkn"),
          timeFrame: this.filterCityReservations
        })
        .then(response => {
          if (response.success && response.code === 100) {
            this.categoriesReservationCity = response.body.dates;
            this.seriesRCity = response.body.cities;
          } else {
            this.categoriesReservationCity = [];
            this.seriesRCity = [];
          }
        })
        .catch(error => {
          this.categoriesReservationCity = [];
          this.seriesRCity = [];
        });
      this.fillCityReservation();
    },
    fillCityReservation() {
      this.seriesCityReservation = this.seriesRCity;
      this.charOptCityReservation = {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: this.categoriesReservationCity
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1,
          colors: ["#1F88E5", "#FFCE60", "#745AF3"]
        },
        tooltip: {
          show: false
        }
      };
    },
    async totalReservations() {
      await this.$store
        .dispatch("dashboard/totalReservations", {
          acstkn: localStorage.getItem("acstkn"),
          timeFrame: this.filterAllReservations
        })
        .then(response => {
          if (response.success && response.code === 100) {
            this.categoriesReservationAll = response.body.dates;
            this.seriesRAllInactive = response.body.inactive;
            this.seriesRAllUsed = response.body.used;
          } else {
            this.categoriesReservationAll = [];
            this.seriesRAllInactive = [];
            this.seriesRAllUsed = [];
          }
        })
        .catch(error => {
          this.categoriesReservationAll = [];
          this.seriesRAllInactive = [];
          this.seriesRAllUsed = [];
        });
      this.fillTotalReservation();
    },
    fillTotalReservation() {
      this.seriesTotalReservation = [
        {
          name: "Ejecutadas",
          data: this.seriesRAllUsed
        },
        {
          name: "Canceladas",
          data: this.seriesRAllInactive
        }
      ];
      this.charOptTotalReser = {
        chart: { type: "bar", height: 350 },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: this.categoriesReservationAll
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1,
          colors: ["#745AF3", "#26C6DB"]
        },
        tooltip: {
          show: false
        }
      };
    },
    filterAll() {
      // this.searchDateTo = moment(this.searchDateFrom).add(1, "month").format("YYYY-MM-DD");

      this.filterMoreCity();
      this.filterLessCity();
      this.getOfficesPercent();
      this.filterUsers();
      this.getUsersCancelReservations();
      this.getTopOfficesMoreReserved();
    },
    async filterMoreCity() {
      const response = await this.$store.dispatch(
        "dashboard/listCitiesMoreReserved",
        {
          acstkn: localStorage.getItem("acstkn"),
          dateInit: this.searchDateFrom + "T00:00:00-05:00",
          dateEnd: this.searchDateTo + "T00:00:00-05:00",
          cityId: this.cityId
        }
      );

      if (response.success) {
        this.cityMoreReservated = [];
        response.body.map(resp => {
          this.cityMoreReservated.push({
            name: resp.office.name,
            quantity: resp.quantity
          });
        });
      } else {
        this.cityMoreReservated = [];
        this.error = true;
        this.errorMessage = response.message;
      }
    },

    async getOfficesPercent() {
      const response = await this.$store.dispatch(
        "dashboard/getOfficesPercent",
        {
          acstkn: localStorage.getItem("acstkn"),
          dateInit: this.searchDateFrom + "T00:00:00-05:00",
          dateEnd: this.searchDateTo + "T00:00:00-05:00",
          cityId: this.cityId1
        }
      );
      if (response.success) {
        // console.log(response.body)
        this.percentageReservated = [];
        response.body.map(resp => {
          this.percentageReservated.push({
            name: resp.office.building.name,
            percentage: resp.percentage
          });
        });
      } else {
        this.percentageReservated = [];
        this.errorPercentages = true;
        this.errorMessagePercentage = response.message;
      }
    },

    async filterLessCity() {
      const response = await this.$store.dispatch(
        "dashboard/listCitiesLessReserved",
        {
          acstkn: localStorage.getItem("acstkn"),
          dateInit: this.searchDateFrom + "T00:00:00-05:00",
          dateEnd: this.searchDateTo + "T00:00:00-05:00",
          cityId: this.cityId2
        }
      );
      if (response.success) {
        this.cityLessReservated = [];
        response.body.map(resp => {
          this.cityLessReservated.push({
            name: resp.office.name,
            quantity: resp.quantity
          });
        });
      } else {
        this.cityLessReservated = [];
        this.error = true;
        this.errorMessage = response.message;
      }
    },

    async filterUsers() {
      const response = await this.$store.dispatch(
        "dashboard/listUsersReserved",
        {
          acstkn: localStorage.getItem("acstkn"),
          dateInit: this.searchDateFrom + "T00:00:00-05:00",
          dateEnd: this.searchDateTo + "T00:00:00-05:00"
        }
      );
      console.log("response", response, response.code == 102);
      if (response.code == 102) {
        this.$router.push({ path: "/logout", force: true });
      }
      if (response.success) {
        // console.log(response.body)
        this.usersReservated = [];
        // console.log(response.body)
        response.body.map(resp => {
          this.usersReservated.push({
            name: resp.fullName,
            quantity: resp.quantity,
            profileImg: resp.profileImage
          });
        });
      } else {
        this.usersReservated = [];
        this.error = true;
        this.errorMessage = response.message;
      }
    },

    async getUsersCancelReservations() {
      const response = await this.$store.dispatch(
        "dashboard/getUsersCancelReservations",
        {
          acstkn: localStorage.getItem("acstkn"),
          dateInit: this.searchDateFrom + "T00:00:00-05:00",
          dateEnd: this.searchDateTo + "T00:00:00-05:00"
        }
      );
      if (response.success) {
        // console.log(response.body)
        this.usersCancelReservations = [];
        // console.log(response.body)
        response.body.map(resp => {
          this.usersCancelReservations.push({
            name: resp.fullName,
            quantity: resp.quantity,
            profileImg: resp.profileImage
          });
        });
      } else {
        this.usersCancelReservations = [];
        this.error = true;
        this.errorMessage = response.message;
      }
    },

    async listCity() {
      const response = await this.$store.dispatch("cities/listCities", {
        acstkn: localStorage.getItem("acstkn"),
        needle: ""
      });
      if (response.success) {
        response.body.cities.map(resp => {
          this.selectCity.push({
            id: resp.id,
            name: resp.name
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
.border-radius {
  border-radius: 10px !important;
  height: 40px !important;
  width: 80px;
}
.selected {
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 10px !important;
  }
}
</style>
