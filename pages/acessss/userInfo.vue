<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="4" md="4"></v-col>
        <v-col id="topList" cols="12" sm="8" md="8">
          <v-breadcrumbs
            class="float-right"
            large
            :items="itemBreadcrumbs"
          ></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="3" md="3" class="colsUserDetail">
          <v-card>
            <div class="profilePictureUser text-center">
              <v-avatar class="avatarUserImage" size="82">
                <!-- <v-img :src=" imageAvatarAdmin != '' ? imageAvatarAdmin : '/defaultUser.png'"></v-img> -->
                <v-img
                  :src="
                    userData.profileImage
                      ? userData.profileImage
                      : '/defaultUser.png'
                  "
                ></v-img>
              </v-avatar>
              <p class="txtFullNameUser">
                {{ userData.fullName }}
              </p>
            </div>
            <v-row>
              <v-col cols="12">
                <p class="txtTitleInformationUser">ID Colaborador</p>
                <p class="txtInfoUser">{{ userData.uid }}</p>
              </v-col>
              <v-col cols="12">
                <p class="txtTitleInformationUser">Cargo</p>
                <p class="txtInfoUser">{{ userData.position }}</p>
              </v-col>
              <v-col cols="12">
                <p class="txtTitleInformationUser">Cédula</p>
                <p class="txtInfoUser">{{ userData.document }}</p>
              </v-col>
              <v-col cols="12">
                <p class="txtTitleInformationUser">Correo</p>
                <p class="txtInfoUser">{{ userData.email }}</p>
              </v-col>
              <v-col cols="12">
                <p class="txtTitleInformationUser">Teléfono</p>
                <p class="txtInfoUser">{{ userData.phone }}</p>
              </v-col>
              <v-col cols="12">
                <p class="txtTitleInformationUser">Perfil Linkedin</p>
                <p class="txtInfoUser">{{ userData.linkedinProfile }}</p>
              </v-col>
              <!-- <v-col cols="12">
                <p class="txtTitleInformationUser">Código QR</p>
                <p class="txtInfoUser">{{ userData.qrCode }}</p>
                <img src="/qrCodeImg.png" alt="qr" class="mx-auto imgQrUser" />
              </v-col> -->
              <v-col cols="12">
                <p class="txtTitleInformationUser">
                  Editar Gestión del Usuario
                </p>
                <div class="overflow-y-auto px-7" style="height: 18em">
                  <v-autocomplete
                    @change="updateTypePosition()"
                    :items="typePositionArray"
                    v-model="typePosition"
                    style="border-radius: 10px !important"
                    item-text="name"
                    item-value="id"
                    class="classicInput"
                    label=""
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
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="9" md="9" class="colsUserDetail">
          <v-row>
            <v-col cols="12" sm="4" md="4" class="colsUserDetail">
              <v-card class="userInfoCards blueBorder">
                <v-row class="rowNumbersReservations">
                  <v-col cols="12" class="colTitleNumberReservations">
                    <p
                      class="txtTitleNumberReservation txtBlue txtWithoutMargin"
                    >
                      Número de reservas
                    </p>
                  </v-col>
                  <v-col class="colTxtNumbersReservations">
                    <p class="txtNumberReservation txtWithoutMargin">
                      {{ countInactive + countActive + countUsed }}
                    </p>
                  </v-col>
                  <v-col
                    class="colImgIcNumReservation colTxtNumbersReservations"
                  >
                    <img
                      src="/ic_number_reservations@2x.png"
                      class="imgsNumberReservation"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4" class="colsUserDetail">
              <v-card class="userInfoCards greenBorder">
                <v-row class="rowNumbersReservations">
                  <v-col cols="12" class="colTitleNumberReservations">
                    <p
                      class="txtTitleNumberReservation txtGreen txtWithoutMargin"
                    >
                      Reservas activas
                    </p>
                  </v-col>
                  <v-col class="colTxtNumbersReservations">
                    <p class="txtNumberReservation txtWithoutMargin">
                      {{ countActive }}
                    </p>
                  </v-col>
                  <v-col
                    class="colImgIcNumReservation colTxtNumbersReservations"
                  >
                    <img
                      src="/ic_active_reservations@2x.png"
                      class="imgsNumberReservation"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4" class="colsUserDetail">
              <v-card class="userInfoCards redBorder">
                <v-row class="rowNumbersReservations">
                  <v-col cols="12" class="colTitleNumberReservations">
                    <p
                      class="txtTitleNumberReservation txtRed txtWithoutMargin"
                    >
                      Reservas canceladas
                    </p>
                  </v-col>
                  <v-col class="colTxtNumbersReservations">
                    <p class="txtNumberReservation txtWithoutMargin">
                      {{ countInactive }}
                    </p>
                  </v-col>
                  <v-col
                    class="colImgIcNumReservation colTxtNumbersReservations"
                  >
                    <img
                      src="/ic_cancel_reservations@2x.png"
                      class="imgsNumberReservation"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="pl-4 pr-4 d-flex justify-center">
            <!-- <v-row> -->
            <v-col cols="3">
              <v-autocomplete
                style="border-radius: 10px !important"
                class="classicInput inputWithoutLabel"
                :items="citiesFilter"
                item-text="name"
                item-value="id"
                v-model="formGetProfileAndReservations.cityId"
                label="Ciudad"
                solo
                dense
                hide-details
                append-icon
                @input="setFilter()"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="input-icon-arrow" color="primary"
                    >mdi-chevron-down</v-icon
                  >
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                style="border-radius: 10px !important"
                class="classicInput inputWithoutLabel"
                :items="buildingsFilter"
                item-text="name"
                item-value="id"
                v-model="formGetProfileAndReservations.buildingId"
                label="Edificio"
                solo
                dense
                hide-details
                append-icon
                @input="setFilter()"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="input-icon-arrow" color="primary"
                    >mdi-chevron-down</v-icon
                  >
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="3">
              <v-autocomplete
                style="border-radius: 10px !important"
                class="classicInput inputWithoutLabel"
                :items="officeTypeFilter"
                item-text="name"
                item-value="id"
                v-model="formGetProfileAndReservations.officeTypeId"
                label="Tipo oficina"
                solo
                dense
                hide-details
                append-icon
                @input="setFilter()"
              >
                <template v-slot:prepend-inner>
                  <v-icon class="input-icon-arrow" color="primary"
                    >mdi-chevron-down</v-icon
                  >
                </template>
              </v-autocomplete>
            </v-col>
            <v-col style="max-width: fit-content !important;">
              <!-- <v-btn v-show="showBtnClearFilters" class="inputWithoutLabel btnRemoveFilters"
              elevation="0" dark color="#F56363" @click="clearFilters()">
                <v-icon dark>
                  mdi-close
                </v-icon>
              </v-btn> -->
              <img
                v-show="showBtnClearFilters"
                class="inputWithoutLabel imgAsBtnClearFilter"
                src="/ic_remove.svg"
                @click="clearFilters()"
              />
            </v-col>
          </v-row>
          <v-row class="pl-4 pr-4 d-flex justify-center">
            <v-col cols="3" class="colsFilters">
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
            <v-col cols="3" class="colsFilters">
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
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <div>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="50"
                  class="dataTableStyle"
                  hide-default-footer
                >
                  <template v-slot:item.id="{ item }">
                    <a
                      @click="goToReservationDeatil(item.id)"
                      v-html="item.id"
                      class="classicLinkInsideTable"
                    ></a>
                  </template>
                  <template v-slot:item.city="{ item }">
                    <span v-html="item.office.city.name"></span>
                  </template>
                  <template v-slot:item.building="{ item }">
                    <span v-html="item.office.building.name"></span>
                  </template>
                  <template v-slot:item.office="{ item }">
                    <span v-html="item.office.name"></span>
                  </template>
                  <template v-slot:item.officeType="{ item }">
                    <span v-html="item.office.officeType.name"></span>
                  </template>
                  <template v-slot:item.startTime="{ item }">
                    <span v-html="item.startTime + ' / ' + item.endTime"></span>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <span v-if="item.status === 'active'" style="color: #009A44"
                      >Activa</span
                    >
                    <span
                      v-if="item.status === 'inactive'"
                      style="color: #F83869"
                      >Cancelada</span
                    >
                    <span v-if="item.status === 'used'" style="color: #0691DA">
                      Completada</span
                    >
                    <span
                      v-if="item.status === 'expired'"
                      style="color: #0691DA"
                    >
                      Expirada</span
                    >
                  </template>
                </v-data-table>
                <div class="text-center pt-2 classicPagination">
                  <v-pagination
                    v-model="formGetProfileAndReservations.page"
                    :length="paginationLength"
                    :total-visible="visible"
                    @input="changePage()"
                  ></v-pagination>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "logged",
  components: {},
  data() {
    return {
      itemBreadcrumbs: [
        {
          text: "Usuarios KPMG",
          disabled: false,
          href: "/users"
        },
        {
          text: "Usuario",
          disabled: true,
          href: "/users/userInfo"
        }
      ],
      showBtnClearFilters: false,
      citiesFilter: [],
      formCitiesFilter: {
        acstkn: "",
        needle: ""
      },
      buildingsFilter: [],
      formBuildingsFilter: {
        acstkn: "",
        needle: "",
        cityId: 0
      },
      officeTypeFilter: [],
      formOfficeTypeFilter: {
        acstkn: "",
        name: ""
      },
      typePositionArray: [
        { name: "", id: 4 },
        { name: "Gestión de Horario", id: 1 },
        { name: "Extender Reservas", id: 2 },
        { name: "Gestión Horario y Reservas", id: 3 }
      ],
      typePosition: 4,
      headers: [
        { text: "ID reserva", sortable: false, value: "id" },
        { text: "Ciudad", sortable: false, value: "city" },
        { text: "Edificio", sortable: false, value: "building" },
        { text: "Oficina", sortable: false, value: "office" },
        { text: "Tipo oficina", sortable: false, value: "officeType" },
        { text: "Fecha", sortable: false, value: "date" },
        { text: "Hora", sortable: false, value: "startTime" },
        { text: "Reservas", sortable: false, value: "status" }
      ],
      desserts: [],
      visible: 12,
      paginationLength: 1,
      totalRows: 0,
      formGetProfileAndReservations: {
        acstkn: "",
        uid: "",
        cityId: 0,
        buildingId: 0,
        officeTypeId: 0,
        status: "",
        limit: 40,
        offset: 0,
        page: 1,
        columnOrder: "",
        sortBy: ""
      },
      formGetUserInfoById: {
        acstkn: "",
        uid: ""
      },
      userData: {
        document: "",
        email: "",
        fullName: "",
        linkedinProfile: "",
        phone: "",
        position: "",
        qrCode: "",
        uid: "",
        profileImage: ""
      },
      countActive: 0,
      countInactive: 0,
      countUsed: 0,
      currentUrl: "",
      selectordersBy: [
        {
          text: "Fecha",
          value: "ReservationOffice.date"
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
    if (parseInt(localStorage.getItem("currentRole")) !== 1) {
      this.$router.push({ path: "/dashboard", force: true });
    }
    this.currentUrl = window.location.href;
    if (this.currentUrl == localStorage.getItem("secondPageUrl")) {
      this.formGetProfileAndReservations.page = parseInt(
        localStorage.getItem("secondPageNumber")
      );
      localStorage.getItem("filtercity") !== ""
        ? (this.formGetProfileAndReservations.cityId = parseInt(
            localStorage.getItem("filtercity")
          ))
        : (this.formGetProfileAndReservations.cityId = 0);
      localStorage.getItem("filterbuilding") !== ""
        ? (this.formGetProfileAndReservations.buildingId = parseInt(
            localStorage.getItem("filterbuilding")
          ))
        : (this.formGetProfileAndReservations.buildingId = 0);
      localStorage.getItem("filterOfficeType") !== ""
        ? (this.formGetProfileAndReservations.officeTypeId = parseInt(
            localStorage.getItem("filterOfficeType")
          ))
        : (this.formGetProfileAndReservations.officeTypeId = 0);
      localStorage.getItem("filterOrderBy") !== ""
        ? (this.orderBy = localStorage.getItem("filterOrderBy"))
        : (this.orderBy = "ReservationOffice.date");
      localStorage.getItem("filterSort") !== ""
        ? (this.sort = localStorage.getItem("filterSort"))
        : (this.sort = "DESC");
    } else {
      localStorage.setItem(
        "filtercity",
        this.formGetProfileAndReservations.cityId
      );
      localStorage.setItem(
        "filterbuilding",
        this.formGetProfileAndReservations.buildingId
      );
      localStorage.setItem(
        "filterOfficeType",
        this.formGetProfileAndReservations.officeTypeId
      );
      localStorage.setItem("filterOrderBy", this.orderBy);
      localStorage.setItem("filterSort", this.sort);
      localStorage.setItem(
        "secondPageNumber",
        this.formGetProfileAndReservations.page
      );
      localStorage.setItem("secondPageUrl", window.location.href);
    }

    this.formGetProfileAndReservations.uid = this.formGetUserInfoById.uid = localStorage.getItem(
      "uid"
    );
    this.formCitiesFilter.acstkn = this.formBuildingsFilter.acstkn = this.formOfficeTypeFilter.acstkn = this.formGetUserInfoById.acstkn = localStorage.getItem(
      "acstkn"
    );

    this.getUserInfoById();
    this.citiesToFilter();
    this.buildingsToFilter();
    this.officeTypesToFilter();
    this.getProfileAndReservations();
    this.verifyShowClearBtn();
  },
  methods: {
    async updateTypePosition() {
      console.log("eeeeee", this.typePosition);
      let data = {
        typePositionsId: this.typePosition,
        uid: this.userData.uid,
        acstkn: localStorage.getItem("acstkn")
      };
      await this.$store
        .dispatch("user/updateTypePostion", data)
        .then(response => {
          console.log("ress", response);
          if (response.success) {
          }
        });
    },
    async getUserInfoById() {
      await this.$store
        .dispatch("user/getUserInfoById", this.formGetUserInfoById)
        .then(response => {
          if (response.success && response.code === 100) {
            console.log(response.body);
            this.userData.document = response.body.user.document;
            this.userData.email = response.body.user.email;
            this.userData.fullName = response.body.user.fullName;
            this.userData.linkedinProfile = response.body.user.linkedinProfile;
            this.userData.phone = response.body.user.phone;
            this.userData.position = response.body.user.position;
            this.userData.qrCode = response.body.user.qrCode;
            this.userData.uid = response.body.user.uid;
            this.userData.profileImage = response.body.user.profileImage;
            this.countActive = response.body.countActive;
            this.countInactive = response.body.countInactive;
            this.countUsed = response.body.countUsed;
            this.typePosition = response.body.user.typePositionsId;
          }
        })
        .catch(error => {});
    },
    async citiesToFilter() {
      await this.$store
        .dispatch("cities/listCities", this.formCitiesFilter)
        .then(response => {
          if (response.success) {
            this.citiesFilter = response.body.cities;
          }
        })
        .catch(error => {});
    },
    async buildingsToFilter() {
      await this.$store
        .dispatch("building/listBuildings", this.formBuildingsFilter)
        .then(response => {
          if (response.success) {
            this.buildingsFilter = response.body.buildings;
          }
        })
        .catch(error => {});
    },
    async officeTypesToFilter() {
      await this.$store
        .dispatch("officeType/officeTypeList", this.formOfficeTypeFilter)
        .then(response => {
          if (response.success) {
            this.officeTypeFilter = response.body.officeTypes;
          }
        })
        .catch(error => {});
    },
    async getProfileAndReservations() {
      this.formGetProfileAndReservations.acstkn = localStorage.getItem(
        "acstkn"
      );
      this.formGetProfileAndReservations.offset =
        (this.formGetProfileAndReservations.page - 1) *
        this.formGetProfileAndReservations.limit;
      this.formGetProfileAndReservations.columnOrder = this.orderBy;
      this.formGetProfileAndReservations.sortBy = this.sort;
      await this.$store
        .dispatch(
          "user/listUserReservations",
          this.formGetProfileAndReservations
        )
        .then(response => {
          if (response.success && response.code === 100) {
            this.totalRows = response.body.totalRows;
            console.log(response.body.reservations);
            this.desserts = response.body.reservations;
            if (
              this.formGetProfileAndReservations.limit > 0 &&
              this.totalRows > 0
            ) {
              this.paginationLength = Math.ceil(
                this.totalRows / this.formGetProfileAndReservations.limit
              );
            } else {
              this.paginationLength = 1;
            }
          }
        })
        .catch(error => {});
    },
    verifyShowClearBtn() {
      if (
        (this.formGetProfileAndReservations.cityId !== undefined &&
          this.formGetProfileAndReservations.cityId !== 0) ||
        (this.formGetProfileAndReservations.buildingId !== undefined &&
          this.formGetProfileAndReservations.buildingId !== 0) ||
        (this.formGetProfileAndReservations.officeTypeId !== undefined &&
          this.formGetProfileAndReservations.officeTypeId !== 0)
      ) {
        this.showBtnClearFilters = true;
      } else {
        this.showBtnClearFilters = false;
      }
    },
    clearFilters() {
      this.formGetProfileAndReservations.cityId = 0;
      this.formGetProfileAndReservations.buildingId = 0;
      this.formGetProfileAndReservations.officeTypeId = 0;
      this.setFilter();
    },
    setFilter() {
      if (this.formGetProfileAndReservations.cityId === undefined) {
        this.formGetProfileAndReservations.cityId = 0;
        this.formBuildingsFilter.cityId = 0;
      } else {
        this.formBuildingsFilter.cityId = this.formGetProfileAndReservations.cityId;
      }
      this.buildingsToFilter();
      if (this.formGetProfileAndReservations.buildingId === undefined) {
        this.formGetProfileAndReservations.buildingId = 0;
      }
      if (this.formGetProfileAndReservations.officeTypeId === undefined) {
        this.formGetProfileAndReservations.officeTypeId = 0;
      }
      this.formGetProfileAndReservations.page = 1;
      localStorage.setItem(
        "filtercity",
        this.formGetProfileAndReservations.cityId
      );
      localStorage.setItem(
        "filterbuilding",
        this.formGetProfileAndReservations.buildingId
      );
      localStorage.setItem(
        "filterOfficeType",
        this.formGetProfileAndReservations.officeTypeId
      );
      localStorage.setItem("filterOrderBy", this.orderBy);
      localStorage.setItem("filterSort", this.sort);
      localStorage.setItem(
        "secondPageNumber",
        this.formGetProfileAndReservations.page
      );
      this.getProfileAndReservations();
      this.verifyShowClearBtn();
    },
    changePage() {
      this.getProfileAndReservations();
      localStorage.setItem(
        "secondPageNumber",
        this.formGetProfileAndReservations.page
      );
      localStorage.setItem("secondPageUrl", window.location.href);
      this.toSection();
    },
    toSection() {
      var element = document.getElementById("topList");
      element.scrollIntoView({ behavior: "smooth" });
    },
    goToReservationDeatil(reservationId) {
      this.$router.push("/users/" + reservationId);
    }
  }
};
</script>
