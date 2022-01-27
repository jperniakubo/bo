<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="11" md="11">
          <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-form ref="formBuildingCreate">
        <v-row class="pl-4 pr-4">
          <v-col class="mx-auto" cols="12" sm="11" md="11">
            <v-card class="px-10 pt-8">
              <v-card-title>
                <v-row class="pl-4 pr-4">
                  <v-col cols="3" sm="3" md="3">
                    <label for="" class="font-weight-regular txtLabelsForms">Ciudad</label>
                    <v-autocomplete
                      class="classicInput"
                      :items="citiesFilter"
                      item-text="name"
                      item-value="id"
                      :rules="cityRules"
                      v-model="formCreateBuilding.cityId"
                      label="Ciudad"
                      solo flat dense
                      append-icon="mdi-chevron-down"
                    ></v-autocomplete>

                    <label for="" class="font-weight-regular txtLabelsForms">Edificio</label>
                    <v-text-field
                    class="classicInput"
                    label="Nombre"
                    v-model="formCreateBuilding.name"
                    :rules="buildingNameRules"
                    dense solo></v-text-field>

                    <label for="" class="font-weight-regular txtLabelsForms">Dirección</label>
                    <v-text-field
                    class="classicInput"
                    label="Dirección"
                    v-model="formCreateBuilding.address"
                    :rules="addressRules"
                    solo dense
                    ></v-text-field>

                    <label for="" class="font-weight-regular txtLabelsForms">
                      Tiempo min. creación reserva
                    </label>
                    <v-text-field
                    class="classicInput"
                    label="Tiempo"
                    v-model="formCreateBuilding.minReservationCreationTime"
                    :rules="timeRules"
                    solo dense></v-text-field>

                    <label for="" class="font-weight-regular txtLabelsForms">
                      Tiempo min. cancelación reserva
                    </label>
                    <v-text-field
                    class="classicInput"
                    label="Tiempo"
                    v-model="formCreateBuilding.minReservationCancellationTime"
                    :rules="timeRules"
                    solo dense></v-text-field>

                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <label for="" class="font-weight-regular txtLabelsForms">Pisos</label>
                    <v-row>
                      <v-col cols="9" class="withoutPadding">
                        <v-text-field class="mx-auto classicInput" solo dense label="Agregar"
                          v-model="formCreateBuilding.newFloor" style="width: 85% !important"
                          @keyup.enter.native="createNewFloor()">
                        </v-text-field>
                      </v-col>
                      <v-col cols="3" class="withoutPadding">
                        <v-btn elevation="0" fab x-small dark color="primary">
                          <v-icon @click="createNewFloor()">mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <div v-for="(itemFloor, index) in formCreateBuilding.floors" :key="index" class="d-flex justify-center">
                      <v-card width="100%" outlined class="cardsFloors">
                        <v-card-title class="py-3 text-body-1">
                        {{ itemFloor }}
                        <v-icon class="btnFieldText" color="red" @click="delFloor(index)">mdi-close-circle</v-icon>
                        </v-card-title>
                      </v-card>
                    </div>

                    <label class="font-weight-regular txtLabelsForms">Capacidad permitida de reserva</label>
                    <v-autocomplete
                      class="classicInput"
                      :items="systemPercentageOptions"
                      item-text="percentText"
                      item-value="id"
                      :rules="capacityPercentRules"
                      v-model="formCreateBuilding.systemPercentageId"
                      label="Capacidad permitida de reserva"
                      solo flat dense
                      append-icon="mdi-chevron-down"
                    ></v-autocomplete>

                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <label for="" class="font-weight-regular txtLabelsForms">Ubicación</label>
                    <v-alert v-if="alertMap" dense text :type="alertMapType">{{
                      alertMapMessage
                    }}</v-alert>
                    <div>
                      <client-only>
                        <GmapAutocomplete
                          @place_changed="setPlace"
                          class="inputBuscador"
                          placeholder="Busca una dirección">
                        </GmapAutocomplete>
                        <GmapMap
                          :center="center"
                          :zoom="17"
                          :options="{
                            disableDefaultUi: true,
                            mapTypeControl: false,
                          }"
                          style="width: 100%; height: 300px">
                          <GmapMarker
                            :position="markers.position"
                            :draggable="true"
                            @dragend="newPosition"/>
                        </GmapMap>
                      </client-only>

                      <v-text-field
                      class="classicInput inputWithoutLabel"
                      label="Dirección"
                      readonly disabled
                      v-model="address"
                      solo dense></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <p class="txtErrorMessage" v-show="messageErrorBuilding">{{ messageErrorBuilding }}</p>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
      <v-row class="pl-4 pr-4">
        <v-col class="mx-auto" cols="12" sm="11" md="11">
          <v-btn style="background-color: white !important; border-radius: 8px" elevation="3"
          class="text-capitalize px-10" outlined color="red" v-on:click="goToBack()">
            Cancelar
          </v-btn>
          <v-btn style="background-color: white !important; border-radius: 8px" class="text-capitalize px-14 ml-10"
            elevation="3" outlined color="#0691DA" v-on:click="validateCreateBuilding()">
            Crear
          </v-btn>
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
          text: 'Edificios',
          disabled: false,
          href: '/cities',
        },
        {
          text: 'Crear Edificio',
          disabled: true,
          href: '/cities/create-building',
        },
      ],
      address:'',
      alertMap: false,
      alertMapType: "error",
      alertMapMessage: "",
      center: { lat: 4.60971, lng: -74.08175 },
      markers: {
        position: {
          lat: 4.60971,
          lng: -74.08175,
        },
      },
      position: {
        lat: 4.60971,
        lng: -74.08175,
      },

      citiesFilter:[],
      formCitiesFilter:{
        acstkn:'',
        needle: '',
      },
      formGetAllPercentages:{
        acstkn:'',
      },
      systemPercentageOptions:[],
      formCreateBuilding:{
        acstkn:'',
        name:'',
        cityId: 0,
        address:'',
        minReservationCreationTime: '0',
        minReservationCancellationTime: '0',
        latitude: 4.60971,
        longitude: -74.08175,
        systemPercentageId: "",
        floors: [],
        // floorsString:'',
        newFloor:'',
        logBoAdminId: 0,
      },
      cityRules:[
        v => !!v || 'Ciudad requerida.',
      ],
      capacityPercentRules:[
        v => !!v || 'Capacidad requerida.',
      ],
      buildingNameRules:[
        v => !!v || 'Nombre requerido.',
        v => v.length >= 4 || 'El nombre debe contener al menos 4 caracteres.',
        v => v.length < 61 || 'El nombre debe contener máximo 60 caracteres.',
      ],
      addressRules:[
        v => !!v || 'Dirección requerida.',
        v => v.length >= 6 || 'La dirección debe contener al menos 6 caracteres.',
        v => v.length < 81 || 'La dirección debe contener máximo 80 caracteres.',
      ],
      timeRules:[
        v => !!v || 'Este tiempo es requerido.',
        v => /^(?=.*\d)[\d ]+$/.test(v) || 'Ingrese un valor númerico.',
        v => v.length < 5 || 'Este tiempo debe contener máximo 4 dígitos.',
      ],
      messageErrorFloors:'',
      messageErrorBuilding:'',
    };
  },
  mounted() {
    var self = this
    self.formGetAllPercentages.acstkn = self.formCitiesFilter.acstkn = self.formCreateBuilding.acstkn = localStorage.getItem("acstkn");
    self.citiesToFilter();
    self.getAllPercentages();
    // self.geolocate(); // method to detect user location
    self.formCreateBuilding.logBoAdminId = localStorage.getItem("boAdminId")
  },
  methods: {
    validateCreateBuilding(){
      var self = this
      if (self.$refs.formBuildingCreate.validate()) {
        if(self.formCreateBuilding.floors.length>0){
          if(self.formCreateBuilding.latitude !== 4.60971 && self.formCreateBuilding.longitude !== -74.08175){
            self.messageErrorFloors = '';
            self.createBuilding();
          }else{
            self.messageErrorFloors = 'Por favor cambia el punto de ubicación en el mapa';
            self.watchError(this.messageErrorFloors);
          }
        }else{
          self.messageErrorFloors = 'Por favor ingresa por lo menos un piso';
          self.watchError(this.messageErrorFloors);
        }
      }
    },
    async createBuilding(){
      await this.$store.dispatch('building/createBuilding', this.formCreateBuilding)
      .then((response) => {
        if (response.success && response.message !== 'Operación exitosa'){
          this.messageErrorBuilding = response.message;
          this.watchError(this.messageErrorBuilding);
        } else if (response.success && response.code === 100) {
          this.messageErrorBuilding = '';
          this.$router.push('/cities');
          this.watchSuccess("Edificio creado");
        }else{
          this.messageErrorBuilding = 'Error, intentalo más tarde';
          this.watchError(this.messageErrorBuilding);
        }
      })
      .catch((error) => {
        this.messageErrorBuilding = 'Error, intentalo más tarde';
        this.watchError(this.messageErrorBuilding);
      });
    },
    createNewFloor(){
      // var emptyField = /[a-z]/i;
      var emptyField = /[0-9a-z]/i;
      if (this.formCreateBuilding.newFloor!='' && emptyField.test(this.formCreateBuilding.newFloor)) {
        this.formCreateBuilding.floors.push(
        this.formCreateBuilding.newFloor
        )
        this.formCreateBuilding.newFloor = '';
      }
    },
    delFloor(index){
      this.formCreateBuilding.floors.splice(index,1)
    },
    newPosition(_element) {
      this.savePositionOrigin(_element.latLng.lat(), _element.latLng.lng());
      this.position = {
        lat: _element.latLng.lat(),
        lng: _element.latLng.lng(),
      };
      this.formCreateBuilding.latitude = _element.latLng.lat();
      this.formCreateBuilding.longitude = _element.latLng.lng();
    },
    setPlace(place) {
      if (place.geometry) {
        this.alertMap = false;

        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

        this.center = {
          lat: latitude,
          lng: longitude,
        };

        this.markers = {
          position: {
            lat: latitude,
            lng: longitude,
          },
        };

        this.position = {
          lat: latitude,
          lng: longitude,
        };
        // console.log(this.center);
        this.savePositionOrigin(latitude, longitude);
      } else {
        this.alertMapMessage = "No encontramos la dirección";
        this.alertMapType = "error";
        this.alertMap = true;
      }
    },
    savePositionOrigin(_lat, _lng) {
      var self = this;
      var geocoder = new google.maps.Geocoder();
      var latlong = {
        lat: parseFloat(_lat),
        lng: parseFloat(_lng)
      };
      var addressSelected = "";
      geocoder.geocode(
        {
          location: latlong
        },
        async (results, status) => {
          // si la solicitud fue exitosa
          if (status === google.maps.GeocoderStatus.OK) {
            // si encontró algún resultado.
            if (results[1]) {
              self.address = results[1].formatted_address;
            }
          }
        }
      );
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markers = {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        };
      });
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
    async getAllPercentages(){
      await this.$store.dispatch('systemPercentage/getAllPercentages', this.formGetAllPercentages)
      .then((response) => {
        if (response.success) {
          this.systemPercentageOptions = response.body.allPercentages;
        }
      })
      .catch((error) => {});
    },
    goToBack(){
      this.$router.push('/cities');
    },
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
  },
  computed: {},
};
</script>

<style lang="scss">
.inputBuscador {
  box-shadow: 0 0 1px 0 rgba(#222, 0.5);
  max-width: 400px;
  border-radius: 5px;
  z-index: 1000;
  background: #fff;
  font-size: 16px;
  padding: 8px 10px;
  height: unset;
  line-height: unset;
  margin-bottom: 10px;
  width: 100% !important;
  min-width: 210px;
}
</style>
