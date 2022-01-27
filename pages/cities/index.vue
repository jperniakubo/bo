<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <label id="topList"></label>
      <!-- filters -->
      <!-- tab 1 filters -->
      <v-row class="pl-4 pr-4" v-show="tabCitiesSection===0">
        <v-col cols="3">
          <label>Buscar:</label>
          <v-text-field
            placeholder="Nombre ciudad"
            solo flat dense
            class="classicInput"
            append-icon="search"
            v-model="formListCities.needle"
            @keyup="setCityFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <img v-show="showClearFilterCities" class="inputWithoutLabel imgAsBtnClearFilter" src="/ic_remove.svg" @click="clearFilterCities()"/>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="3"></v-col>
        <v-col cols="2">
          <v-btn class="classicButton btnCreate" dark @click="activePopup(0, 0)">
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear ciudad
          </v-btn>
        </v-col>
      </v-row>
      <!-- tab 2 filters -->
      <v-row class="pl-4 pr-4" v-show="tabCitiesSection===1">
        <v-col cols="3">
          <label>Buscar:</label>
          <v-text-field
            placeholder="Edificio"
            solo flat dense
            class="classicInput"
            append-icon="search"
            v-model="formListBuildings.needle"
            @keyup="setBuildingFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-autocomplete
            class="classicInput inputWithoutLabel"
            :items="citiesFilter"
            item-text="name"
            item-value="id"
            v-model="formListBuildings.cityId"
            label="Seleccionar ciudad"
            solo flat dense
            @input="setBuildingFilter()"
            hide-details append-icon>
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="1">
          <img v-show="showClearFilterBuildings" class="inputWithoutLabel imgAsBtnClearFilter" src="/ic_remove.svg" @click="clearFilterBuilding()"/>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="2">
          <v-btn class="classicButton btnCreate" dark @click="goToCreateBuilding()">
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear edificio
          </v-btn>
        </v-col>
      </v-row>
      <!-- tab 3 filters -->
      <v-row class="pl-4 pr-4" v-show="tabCitiesSection===2">
        <v-col cols="3">
          <label>Buscar:</label>
          <v-text-field
            placeholder="Tipo oficina"
            solo flat dense
            class="classicInput"
            append-icon="search"
            v-model="formOfficeTypeList.name"
            @keyup="setOfficeTypeFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <img v-show="showClearFilterTypes" class="inputWithoutLabel imgAsBtnClearFilter" src="/ic_remove.svg" @click="clearFilterTypes()"/>
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="3"></v-col>
        <v-col cols="2">
          <v-btn class="classicButton btnCreate" dark @click="goToCreateOfficeType()">
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear oficina
          </v-btn>
        </v-col>
      </v-row>
      <!-- tab 4 filters -->
      <v-row class="pl-4 pr-4" v-show="tabCitiesSection===3">
        <v-col cols="3">
          <label>Tiempo disponible:</label>
          <v-select
            class="classicInput"
            :items="sysTimeOptions"
            item-text="timeText"
            item-value="valueTime"
            v-model="formSysTimeAvailable.time"
            label="Selecciona rango"
            @input="updateTimeAvailable()"
            solo flat dense
            hide-details append-icon>
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
            </template>
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
            placeholder="Buscar Espacio"
            solo flat dense
            class="classicInput inputWithoutLabel"
            append-icon="search"
            v-model="formOfficesList.name"
            @keyup="setOfficesFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="3">
        </v-col>
        <v-col cols="3">
          <v-btn class="btnGreen marginTop" dark @click="goToListReservationsPerDate()">
            Espacios
          </v-btn>
        </v-col>

      </v-row>
      <v-row class="pl-4 pr-4" v-show="tabCitiesSection===3">
        <v-col cols="2">
          <v-autocomplete
            class="classicInput"
            :items="citiesFilter"
            item-text="name"
            item-value="id"
            v-model="formOfficesList.cityId"
            label="Ciudad"
            solo flat dense
            @input="setOfficesFilter()"
            hide-details append-icon>
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            class="classicInput"
            :items="buildingsFilter"
            item-text="name"
            item-value="id"
            v-model="formOfficesList.buildingId"
            label="Edificio"
            solo flat dense
            @input="setOfficesFilter()"
            hide-details append-icon>
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            class="classicInput"
            :items="officeTypeFilter"
            item-text="name"
            item-value="id"
            v-model="formOfficesList.officeTypeId"
            label="Tipo oficina"
            solo flat dense
            @input="setOfficesFilter()"
            hide-details append-icon>
            <template v-slot:prepend-inner>
              <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="1">
          <img v-show="showClearFilterOffices" class="imgAsBtnClearFilter" src="/ic_remove.svg" @click="clearFilterOffices()"/>
        </v-col>
        <v-col></v-col>
        <v-col cols="3">
          <v-btn class="classicButton btnCreate2" dark @click="goToCreateOffice()">
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear Espacio
          </v-btn>
        </v-col>
      </v-row>
      <!-- tabs and tables -->
      <v-row class="pl-4 pr-4">
        <v-col cols="12">
          <v-card>
            <v-tabs v-model="tabCitiesSection" background-color="#FFFFFF">
              <v-tabs-slider color="#FFFFFF" class="tabActive"></v-tabs-slider>
              <v-tab key="0" @click="setTabActive(0)">Ciudades</v-tab>
              <v-tab key="1" @click="setTabActive(1)">Edificios</v-tab>
              <v-tab key="2" @click="setTabActive(2)">Tipos de oficina</v-tab>
              <v-tab key="3" @click="setTabActive(3)">Espacios</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tabCitiesSection">
              <!-- cities -->
              <v-tab-item>
                <v-card flat>
                  <div>
                    <v-data-table
                      :headers="headersCities"
                      :items="cities"
                      :items-per-page="50"
                      hide-default-footer
                      class="dataTableStyle tableOnTab">
                      <template v-slot:item.name="{ item }">
                        <a v-html="item.name" class="txtGeneralSlotTable"></a>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="setCityStatus(item.id, item.status)">
                        <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="/ic_status_green.svg" @click="setCityStatus(item.id, item.status)">
                      </template>
                      <template v-slot:item.options="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="activePopup(1, item.id)">
                          </template>
                          <span>Editar</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </div>
                </v-card>
              </v-tab-item>
              <!-- buildings -->
              <v-tab-item>
                <v-card flat>
                  <div>
                    <v-data-table
                      :headers="headersBuilding"
                      :items="buildings"
                      :items-per-page="50"
                      hide-default-footer
                      class="dataTableStyle tableOnTab">
                      <template v-slot:item.name="{ item }">
                        <a v-html="item.name" class="txtGeneralSlotTable"></a>
                      </template>
                      <template v-slot:item.city="{ item }">
                        <span v-html="item.city.name"></span>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="setBuildingStatus(item.id, item.status)">
                        <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="/ic_status_green.svg" @click="setBuildingStatus(item.id, item.status)">
                      </template>
                      <template v-slot:item.options="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="goToEditAdmin('building',item.id)">
                          </template>
                          <span>Editar</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </div>
                </v-card>
              </v-tab-item>
              <!-- office type -->
              <v-tab-item>
                <v-card flat>
                  <div>
                    <v-data-table
                      :headers="headersOfficeTypes"
                      :items="officeTypes"
                      :items-per-page="50"
                      hide-default-footer
                      class="dataTableStyle tableOnTab">
                      <template v-slot:item.name="{ item }">
                        <a v-html="item.name" class="txtGeneralSlotTable"></a>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="setOfficeTypeStatus(item.id)">
                        <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="/ic_status_green.svg" @click="setOfficeTypeStatus(item.id)">
                      </template>
                      <template v-slot:item.options="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="goToEditAdmin('office', item.id)">
                          </template>
                          <span>Editar</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </div>
                </v-card>
              </v-tab-item>
              <!-- offices -->
              <v-tab-item>
                <v-card flat>
                  <div>
                    <v-data-table
                      :headers="headersOffices"
                      :items="offices"
                      :items-per-page="50"
                      hide-default-footer
                      class="dataTableStyle tableOnTab">
                      <template v-slot:item.name="{ item }">
                        <a v-html="item.name" class="txtGeneralSlotTable"></a>
                      </template>
                      <template v-slot:item.officeType="{ item }">
                        <span v-html="item.officeType.name"></span>
                      </template>
                      <template v-slot:item.floorBuilding="{ item }">
                        <span v-html="item.floorBuilding.floor"></span>
                      </template>
                      <template v-slot:item.building="{ item }">
                        <span v-html="item.building.name"></span>
                      </template>
                      <template v-slot:item.city="{ item }">
                        <span v-html="item.city.name"></span>
                      </template>
                      <template v-slot:item.status="{ item }">
                        <img class="imgAsSwitchTable" v-if="item.status !== 'active'" src="/ic_status_red.svg" @click="setOfficesStatus(item.id)">
                        <img class="imgAsSwitchTable" v-if="item.status === 'active'" src="/ic_status_green.svg" @click="setOfficesStatus(item.id)">
                      </template>
                      <template v-slot:item.options="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="goToEditAdmin('space',item.id)">
                          </template>
                          <span>Editar</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          <!-- paginators -->
          <div class="text-center pt-2 classicPagination" v-show="tabCitiesSection===0">
            <v-pagination
            v-model="formListCities.page"
            :length="pagCitiesLength"
            :total-visible="visible"
            color="#005EB8"
            @input="changeCityPage()"></v-pagination>
          </div>
          <div class="text-center pt-2 classicPagination" v-show="tabCitiesSection===1">
            <v-pagination
            v-model="formListBuildings.page"
            :length="pagBuildingLength"
            :total-visible="visible"
            color="#005EB8"
            @input="changeBuildingPage()"></v-pagination>
          </div>
          <div class="text-center pt-2 classicPagination" v-show="tabCitiesSection===2">
            <v-pagination
            v-model="formOfficeTypeList.page"
            :length="pagOfficeTypeLength"
            :total-visible="visible"
            color="#005EB8"
            @input="changeOfficeTypePage()"></v-pagination>
          </div>
          <div class="text-center pt-2 classicPagination" v-show="tabCitiesSection===3">
            <v-pagination
            v-model="formOfficesList.page"
            :length="pagOfficesLength"
            :total-visible="visible"
            color="#005EB8"
            @input="changeOfficesPage()"></v-pagination>
          </div>
        </v-col>
      </v-row>
      <!-- popup create or edit city -->
      <v-dialog v-model="dialogCreateCity" content-class="dialogCity" persistent>
        <v-card class="cardTransparentToButtons" :elevation="0">
          <v-row>
            <v-col cols="12"></v-col>
          </v-row>
        </v-card>
        <v-card class="cardContentCity">
          <v-row class="rowContentCreateEditCity">
            <v-col cols="6" class="colImgCreateEditCity">
              <v-row class="rowImageCreateEditCity">
                <img class="imgPopupCreateEditCity" src="/ic_create_city.svg">
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-spacer />
                <img class="imgClosePopupCreateEditCity" src="/ic_close.svg" @click="closeCityDialog()">
              </v-row>
              <v-container class="contentFormCreateEditCity">
                  <p v-show="createOrEdit===0" class="textPopup titlePopup">Crear Ciudad</p>
                  <p v-show="createOrEdit===1" class="textPopup titlePopup">Actualizar Ciudad</p>
                  <p class="textPopup txtLabelPopup">Nombre</p>
              </v-container>
              <v-row>
                <v-col cols="12" class="colInputCity">
                  <v-form ref="createCityForm">
                    <v-text-field
                      v-show="createOrEdit===0"
                      placeholder="Nombre"
                      solo flat dense
                      class="classicInput"
                      :rules="nameRules"
                      v-model="formCreateCity.name"
                    ></v-text-field>
                  </v-form>
                  <v-form ref="updateCityForm">
                    <v-text-field
                      v-show="createOrEdit===1"
                      placeholder="Nombre"
                      solo flat dense
                      class="classicInput"
                      :rules="nameRules"
                      v-model="formUpdateCity.name"
                    ></v-text-field>
                  </v-form>
                  <div style="text-align:center;">
                    <div class="customErrorMessage" v-if="createOrEditMessage" v-html="createOrEditMessage"></div>
                  </div>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <!-- <v-col cols="4"></v-col> -->
                <v-col cols="6" class="justify-center">
                  <v-btn v-show="createOrEdit===0" class="classicButton btnCreate2Popup" dark @click="toCreateCity()">
                    Agregar
                  </v-btn>
                  <v-btn v-show="createOrEdit===1" class="classicButton btnCreate2Popup" dark @click="toUpdateCity()">
                    Editar
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'logged',
  components: {},
  data() {
    return {
      showClearFilterCities: false,
      showClearFilterBuildings: false,
      showClearFilterTypes: false,
      showClearFilterOffices: false,
      citiesFilter:[],
      formCitiesFilter:{
        acstkn:'',
        needle: '',
      },
      buildingsFilter:[],
      formBuildingsFilter:{
        acstkn:'',
        needle: '',
        cityId:0,
      },
      officeTypeFilter:[],
      formOfficeTypeFilter:{
        acstkn:'',
        name: '',
      },
      formCreateCity:{
        acstkn:'',
        name:'',
        logBoAdminId: 0,
      },
      formUpdateCity:{
        acstkn:'',
        cityId: 0,
        name:'',
        logBoAdminId: 0,
      },
      dialogCreateCity: false,
      createOrEdit: 0, // 0 to create and 1 to edit
      createOrEditMessage:'',
      currentUrl:'',
      visible:12,
      tabCitiesSection: 0,
      nameRules: [
        v => !!v || 'Nombre requerido.',
        v => /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v) || 'Este campo solo acepta letras.',
        v => v.length >= 3 || 'El nombre debe contener al menos 3 caracteres.',
        v => v.length < 40 || 'El nombre debe contener máximo 40 caracteres.',
      ],
      formListCities:{
        acstkn:'',
        needle: '',
        limit: 40,
        offset: 0,
        page:1,
      },
      totalCities:0,
      pagCitiesLength: 1,
      cities:[],
      headersCities: [
        {text: 'Ciudad', sortable: false, value:'name'},
        {text: 'Estado', sortable: false, value: 'status'},
        {text: 'Editar', sortable: false, value: 'options'}
      ],
      formListBuildings:{
        acstkn:'',
        cityId: 0,
        needle: '',
        limit: 40,
        offset: 0,
        page:1,
      },
      totalBuilding:0,
      pagBuildingLength: 1,
      buildings:[],
      headersBuilding: [
        {text: 'Edificio', sortable: false, value:'name'},
        {text: 'Dirección', sortable: false, value:'address'},
        {text: 'Pisos', sortable: false, value:'numberOfFloors'},
        {text: 'Ciudad', sortable: false, value:'city'},
        {text: 'Estado', sortable: false, value: 'status'},
        {text: 'Editar', sortable: false, value: 'options'}
      ],
      formOfficeTypeList:{
        acstkn:'',
        name: '',
        limit: 40,
        offset: 0,
        page:1,
      },
      totalOfficeType:0,
      pagOfficeTypeLength: 1,
      officeTypes:[],
      headersOfficeTypes: [
        {text: 'Tipo de oficina', sortable: false, value:'name'},
        {text: 'Estado', sortable: false, value: 'status'},
        {text: 'Editar', sortable: false, value: 'options'}
      ],
      formOfficesList:{
        acstkn:'',
        name: '',
        officeTypeId: 0,
        buildingId: 0,
        cityId: 0,
        limit: 40,
        offset: 0,
        page:1,
      },
      totalOffices:0,
      pagOfficesLength: 1,
      offices:[],
      headersOffices: [
        {text: 'Espacio', sortable: false, value:'name'},
        {text: 'Tipo oficina', sortable: false, value:'officeType'},
        {text: 'Piso', sortable: false, value:'floorBuilding'},
        {text: 'Edificio', sortable: false, value:'building'},
        {text: 'Ciudad', sortable: false, value:'city'},
        {text: 'Estado', sortable: false, value: 'status'},
        {text: 'Editar', sortable: false, value: 'options'}
      ],
      formSysTimeAvailable:{
        acstkn:'',
        id: 1,
        time: '',
        logBoAdminId:0,
      },
      sysTimeOptions:[
        {timeText:'5 Minutos' ,valueTime: "5"},
        {timeText:'10 Minutos' ,valueTime: "10"},
        {timeText:'15 Minutos' ,valueTime: "15"},
        {timeText:'20 Minutos' ,valueTime: "20"},
        {timeText:'30 Minutos' ,valueTime: "30"},
      ],
    }
  },
  mounted() {
    var self = this
    self.currentUrl = window.location.href;
    if (self.currentUrl==localStorage.getItem("firstPageUrl")) {
      self.tabCitiesSection = parseInt(localStorage.getItem("tabCitiesSection"));
      self.verifyPageActive();
    }else{
      localStorage.setItem("needleOrName", self.formListCities.needle);
      localStorage.setItem("cityIdFilter", self.formListBuildings.cityId);
      localStorage.setItem("buildingIdFilter", self.formOfficesList.buildingId);
      localStorage.setItem("typeOfficeFilter", self.formOfficesList.officeTypeId);
      localStorage.setItem("filterOrigin", self.tabCitiesSection);
      localStorage.setItem("firstPageNumber", self.formListCities.page);
      localStorage.setItem("firstPageUrl", window.location.href);
      localStorage.setItem("tabCitiesSection", self.tabCitiesSection);
    }
    localStorage.setItem("secondPageUrl", "");
    self.formSysTimeAvailable.acstkn = self.formCitiesFilter.acstkn = self.formBuildingsFilter.acstkn = self.formOfficeTypeFilter.acstkn = self.formCreateCity.acstkn = self.formUpdateCity.acstkn = self.formListCities.acstkn = self.formListBuildings.acstkn = self.formOfficeTypeList.acstkn = self.formOfficesList.acstkn = localStorage.getItem("acstkn");
    self.getTimeById();
    self.citiesToFilter();
    self.buildingsToFilter();
    self.officeTypesToFilter();
    self.listCities();
    self.listBuildings();
    self.officeTypeList();
    self.getListOffice();
    self.formSysTimeAvailable.logBoAdminId = self.formCreateCity.logBoAdminId = self.formUpdateCity.logBoAdminId = localStorage.getItem("boAdminId");
  },
  methods: {
    watchError(messageError){
      this.$toast.error(messageError, {
        position: "bottom-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    },
    watchSuccess(messageSuccess){
      this.$toast.success(messageSuccess, {
        position: "bottom-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });
    },
    async getTimeById(){
      var self = this
      await this.$store.dispatch('systemTimeAvailable/getTimeById', this.formSysTimeAvailable)
      .then((response) => {
        if (response.success) {
          self.formSysTimeAvailable.time = response.body.time;
        }
      })
      .catch((error) => {});
    },
    async updateTimeAvailable(){
      var self = this
      await this.$store.dispatch('systemTimeAvailable/updateTimeAvailable', this.formSysTimeAvailable)
      .then((response) => {
        console.log(response)
        if (response.success) {
          self.watchSuccess("se ha cambiado el tiempo disponible de reserva exitosamente");
        }else{
          self.watchError("ha ocurrido un error, por favor inténtalo más tarde");
        }
      })
      .catch((error) => {
        self.watchError("ha ocurrido un error, por favor inténtalo más tarde");
      });
    },
    setTabActive(key){
      var self = this
      localStorage.setItem("tabCitiesSection", key);
      switch (key) {
        case 0:
          localStorage.setItem("firstPageNumber", self.formListCities.page);
          break;
        case 1:
          localStorage.setItem("firstPageNumber", self.formListBuildings.page);
          break;
        case 2:
          localStorage.setItem("firstPageNumber", self.formOfficeTypeList.page);
          break;
        case 3:
          localStorage.setItem("firstPageNumber", self.formOfficesList.page);
          break;
      }
    },
    verifyPageActive(){
      var self = this
      var filterOrigin = parseInt(localStorage.getItem("filterOrigin"));
      switch (this.tabCitiesSection) {
        case 0:
          self.formListCities.page = parseInt(localStorage.getItem("firstPageNumber"));
          if(filterOrigin === self.tabCitiesSection){
            self.formListCities.needle = localStorage.getItem("needleOrName");
          }else{
            self.cleanFiltersLocal();
          }
          break;
        case 1:
          self.formListBuildings.page = parseInt(localStorage.getItem("firstPageNumber"));
          if(filterOrigin === self.tabCitiesSection){
            self.formListBuildings.needle = localStorage.getItem("needleOrName");
            self.formListBuildings.cityId = parseInt(localStorage.getItem("cityIdFilter"));
          }else{
            self.cleanFiltersLocal();
          }
          break;
        case 2:
          self.formOfficeTypeList.page = parseInt(localStorage.getItem("firstPageNumber"));
          if(filterOrigin === self.tabCitiesSection){
            self.formOfficeTypeList.name = localStorage.getItem("needleOrName");
          }else{
            self.cleanFiltersLocal();
          }
          break;
        case 3:
          self.formOfficesList.page = parseInt(localStorage.getItem("firstPageNumber"));
          if(filterOrigin === self.tabCitiesSection){
            self.formOfficesList.name = localStorage.getItem("needleOrName");
            self.formOfficesList.cityId = parseInt(localStorage.getItem("cityIdFilter"));
            self.formOfficesList.buildingId = parseInt(localStorage.getItem("buildingIdFilter"));
            self.formOfficesList.officeTypeId = parseInt(localStorage.getItem("typeOfficeFilter"));
          }else{
            self.cleanFiltersLocal();
          }
          break;
      }
    },
    cleanFiltersLocal(){
      localStorage.setItem("needleOrName","");
      localStorage.setItem("cityIdFilter","");
      localStorage.setItem("buildingIdFilter","");
      localStorage.setItem("typeOfficeFilter","");
    },
    async citiesToFilter(){
      await this.$store.dispatch('cities/listCities', this.formCitiesFilter)
      .then((response) => {
        if (response.success) {
          this.citiesFilter = response.body.cities;
        }
      })
      .catch((error) => {});
    },
    async buildingsToFilter(){
      await this.$store.dispatch('building/listBuildings', this.formBuildingsFilter)
      .then((response) => {
        if (response.success) {
          this.buildingsFilter = response.body.buildings;
        }
      })
      .catch((error) => {
      });
    },
    async officeTypesToFilter(){
      await this.$store.dispatch('officeType/officeTypeList', this.formOfficeTypeFilter)
      .then((response) => {
        if (response.success) {
          this.officeTypeFilter = response.body.officeTypes;
        }
      })
      .catch((error) => {
      });
    },
    toSection(){
      var element = document.getElementById('topList');
      element.scrollIntoView({ behavior: 'smooth' });
    },
    async listCities(){
      this.formListCities.offset = (this.formListCities.page-1) * this.formListCities.limit;
      await this.$store.dispatch('cities/listCities', this.formListCities)
      .then((response) => {
        if (response.success) {
          this.totalCities = response.body.total;
          this.cities = response.body.cities;
          if (this.formListCities.limit > 0 && this.totalCities > 0) {
              this.pagCitiesLength = Math.ceil(this.totalCities / this.formListCities.limit);
          }else{
            this.pagCitiesLength = 1;
          }
        }
      })
      .catch((error) => {
        this.$router.push({ path: "/logout", force: true })
      });
    },
    changeCityPage(){
      localStorage.setItem("firstPageNumber", this.formListCities.page);
      this.listCities();
      this.toSection();
    },
    verifyClearCitiesFilter(){
      if(this.formListCities.needle !== ''){
        this.showClearFilterCities = true;
      }else{
        this.showClearFilterCities = false;
      }
    },
    clearFilterCities(){
      this.formListCities.needle = '';
      this.setCityFilter();
    },
    setCityFilter(){
      localStorage.setItem("filterOrigin", this.tabCitiesSection);
      localStorage.setItem("needleOrName", this.formListCities.needle);
      this.formListCities.page = 1;
      localStorage.setItem("firstPageNumber", this.formListCities.page);
      this.listCities();
      this.verifyClearCitiesFilter();
    },
    async setCityStatus(cityId, state){
      await this.$store.dispatch('cities/setCityStatus', {
        id: cityId,
        active: (state === 'active') ? 0 : 1,
        acstkn: localStorage.getItem("acstkn"),
        logBoAdminId: localStorage.getItem("boAdminId")
      })
      this.listCities();
    },
    async listBuildings(){
      this.formListBuildings.offset = (this.formListBuildings.page-1) * this.formListBuildings.limit;
      await this.$store.dispatch('building/listBuildings', this.formListBuildings)
      .then((response) => {
        if (response.success) {
          this.totalBuilding = response.body.total;
          this.buildings = response.body.buildings;
          if (this.formListBuildings.limit > 0 && this.totalBuilding > 0) {
              this.pagBuildingLength = Math.ceil(this.totalBuilding / this.formListBuildings.limit);
          }else{
            this.pagBuildingLength = 1;
          }
        }
      })
      .catch((error) => {
      });
    },
    changeBuildingPage(){
      localStorage.setItem("firstPageNumber", this.formListBuildings.page);
      this.listBuildings();
      this.toSection();
    },
    verifyShowClearBtn(){
      if((this.formListBuildings.cityId !== undefined && this.formListBuildings.cityId !== 0)
      || this.formListBuildings.needle !== ''){
        this.showClearFilterBuildings = true;
      }else{
        this.showClearFilterBuildings = false;
      }
    },
    clearFilterBuilding(){
      this.formListBuildings.cityId = 0;
      this.formListBuildings.needle = '';
      this.setBuildingFilter();
    },
    setBuildingFilter(){
      if(this.formListBuildings.cityId === undefined){
        this.formListBuildings.cityId = 0;
      }
      localStorage.setItem("filterOrigin", this.tabCitiesSection);
      localStorage.setItem("needleOrName", this.formListBuildings.needle);
      localStorage.setItem("cityIdFilter", this.formListBuildings.cityId);
      this.formListBuildings.page = 1;
      localStorage.setItem("firstPageNumber", this.formListBuildings.page);
      this.listBuildings();
      this.verifyShowClearBtn();
    },
    async setBuildingStatus(buildingId, state){
      await this.$store.dispatch('building/setBuildingStatus', {
        id: buildingId,
        active: (state === 'active') ? 0 : 1,
        acstkn: localStorage.getItem("acstkn"),
        logBoAdminId: localStorage.getItem("boAdminId")
      })
      this.listBuildings();
    },
    async officeTypeList(){
      this.formOfficeTypeList.offset = (this.formOfficeTypeList.page-1) * this.formOfficeTypeList.limit;
      await this.$store.dispatch('officeType/officeTypeList', this.formOfficeTypeList)
      .then((response) => {
        if (response.success) {
          this.totalOfficeType = response.body.totalrows;
          this.officeTypes = response.body.officeTypes;
          if (this.formOfficeTypeList.limit > 0 && this.totalOfficeType > 0) {
              this.pagOfficeTypeLength = Math.ceil(this.totalOfficeType / this.formOfficeTypeList.limit);
          }else{
            this.pagOfficeTypeLength = 1;
          }
        }
      })
      .catch((error) => {
      });
    },
    changeOfficeTypePage(){
      localStorage.setItem("firstPageNumber", this.formOfficeTypeList.page);
      this.officeTypeList();
      this.toSection();
    },
    verifyClearTypes(){
      if(this.formOfficeTypeList.name !== ''){
        this.showClearFilterTypes = true;
      }else{
        this.showClearFilterTypes = false;
      }
    },
    clearFilterTypes(){
      this.formOfficeTypeList.name = '';
      this.setOfficeTypeFilter();
    },
    setOfficeTypeFilter(){
      localStorage.setItem("filterOrigin", this.tabCitiesSection);
      localStorage.setItem("needleOrName", this.formOfficeTypeList.name);
      this.formOfficeTypeList.page = 1;
      localStorage.setItem("firstPageNumber", this.formOfficeTypeList.page);
      this.officeTypeList();
      this.verifyClearTypes();
    },
    async setOfficeTypeStatus(officetypeId){
      await this.$store.dispatch('officeType/officeTypeStatus', {
        id: officetypeId,
        acstkn: localStorage.getItem("acstkn"),
        logBoAdminId: localStorage.getItem("boAdminId")
      })
      this.officeTypeList();
    },
    async getListOffice(){
      this.formOfficesList.offset = (this.formOfficesList.page-1) * this.formOfficesList.limit;
      await this.$store.dispatch('office/getListOffice', this.formOfficesList)
      .then((response) => {
        if (response.success) {
          this.totalOffices = response.body.totalRows;
          this.offices = response.body.office;
          if (this.formOfficesList.limit > 0 && this.totalOffices > 0) {
              this.pagOfficesLength = Math.ceil(this.totalOffices / this.formOfficesList.limit);
          }else{
            this.pagOfficesLength = 1;
          }
        }
      })
      .catch((error) => {
      });
    },
    changeOfficesPage(){
      localStorage.setItem("firstPageNumber", this.formOfficesList.page);
      this.getListOffice();
      this.toSection();
    },
    verifyClearOffices(){
      if((this.formOfficesList.cityId !== undefined && this.formOfficesList.cityId !== 0)
      || (this.formOfficesList.buildingId !== undefined && this.formOfficesList.buildingId !== 0)
      || (this.formOfficesList.officeTypeId !== undefined && this.formOfficesList.officeTypeId !== 0)
      || this.formOfficesList.name !== ''){
        this.showClearFilterOffices = true;
      }else{
        this.showClearFilterOffices = false;
      }
    },
    clearFilterOffices(){
      this.formOfficesList.name = '';
      this.formOfficesList.cityId = 0;
      this.formOfficesList.buildingId = 0;
      this.formOfficesList.officeTypeId = 0;
      this.setOfficesFilter();
    },
    setOfficesFilter(){
      if(this.formOfficesList.cityId === undefined){
        this.formOfficesList.cityId = 0;
        this.formBuildingsFilter.cityId = 0;
      }else{
        this.formBuildingsFilter.cityId = this.formOfficesList.cityId;
      }
      this.buildingsToFilter();
      if(this.formOfficesList.buildingId === undefined){
        this.formOfficesList.buildingId = 0;
      }
      if(this.formOfficesList.officeTypeId === undefined){
        this.formOfficesList.officeTypeId = 0;
      }
      localStorage.setItem("filterOrigin", this.tabCitiesSection);
      localStorage.setItem("needleOrName", this.formOfficesList.name);
      localStorage.setItem("cityIdFilter", this.formOfficesList.cityId);
      localStorage.setItem("buildingIdFilter", this.formOfficesList.buildingId);
      localStorage.setItem("typeOfficeFilter", this.formOfficesList.officeTypeId);
      this.formOfficesList.page = 1;
      localStorage.setItem("firstPageNumber", this.formOfficesList.page);
      this.getListOffice();
      this.verifyClearOffices();
    },
    async setOfficesStatus(officeId){
      await this.$store.dispatch('office/officeStatus', {
        id: officeId,
        acstkn: localStorage.getItem("acstkn"),
        logBoAdminId: localStorage.getItem("boAdminId")
      })
      this.getListOffice();
    },
    activePopup(from, cityId){
      this.createOrEdit = from; // 0 to create and 1 to edit
      switch (from){
        case 0:
          this.dialogCreateCity = true;
          break;
        case 1:
          this.formUpdateCity.cityId = cityId;
          this.cityById();
          break;
      }
    },
    async cityById(){
      await this.$store.dispatch('cities/cityById', this.formUpdateCity)
        .then((response) => {
          if (response.success) {
            this.formUpdateCity.name = response.body.name;
            this.dialogCreateCity = true;
          }
        })
        .catch((error) => {});
    },
    async toCreateCity(){
      if (this.$refs.createCityForm.validate()) {
        await this.$store.dispatch('cities/createCity', this.formCreateCity)
        .then((response) => {
          if (response.success && response.message !== 'Operación exitosa'){
            this.createOrEditMessage = response.message;
          } else if (response.success) {
            this.listCities();
            this.dialogCreateCity = false;
          }else{
            this.createOrEditMessage = 'Error, intentalo más tarde';
          }
        })
        .catch((error) => {
          this.createOrEditMessage = 'Error, intentalo más tarde';
        });
      }
    },
    async toUpdateCity(){
      if (this.$refs.updateCityForm.validate()) {
        await this.$store.dispatch('cities/updateCity', this.formUpdateCity)
        .then((response) => {
          console.log(response)
          if (response.success) {
            this.listCities();
            this.dialogCreateCity = false;
          } else{
            this.createOrEditMessage = 'Error, intentalo más tarde';
          }
        })
        .catch((error) => {
          if(error.response.data.code===400){
            this.createOrEditMessage = error.response.data.message;
          }else{
            this.createOrEditMessage = 'Error, intentalo más tarde';
          }
        });
      }
    },
    closeCityDialog(){
      this.dialogCreateCity = !this.dialogCreateCity;
      this.createOrEditMessage = '';
    },
    goToCreateBuilding(){
      this.$router.push('/cities/create-building');
    },
    goToCreateOfficeType(){
      this.$router.push('/cities/create-office');
    },
    goToCreateOffice(){
      this.$router.push('/cities/create-space');
    },
    goToListReservationsPerDate(){
      this.$router.push('/cities/reservations');
    },
    goToEditAdmin(to, id){
      // localStorage.setItem("boAdminId", boAdminId);
      this.$router.push(`/cities/update-${to}/${id}`);
    },
  },
  computed: {},
}
</script>
