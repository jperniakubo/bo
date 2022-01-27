<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="11" md="11">
          <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-form ref="formSpaceCreate">
        <v-row class="pl-4 pr-4">
          <v-col class="mx-auto" cols="12" sm="11" md="11">
            <v-card class="px-10 pt-8">
              <v-card-title>
                <v-row class="pl-4 pr-4">
                  <v-col cols="12" sm="4" md="4">
                    <label for="" class="font-weight-regular txtLabelsForms">Nombre</label>
                    <v-text-field
                      solo dense
                      v-model="name"
                      :rules="nameRules"
                      label="Nombre"
                      class="classicInput"
                    ></v-text-field>

                    <label for="" class="font-weight-regular txtLabelsForms">Ciudad</label>
                    <v-autocomplete
                      class="classicInput"
                      :rules="cityRules"
                      :items="selectCity"
                      v-model="city"
                      item-text="title"
                      item-value="id"
                      label="Selecciona una ciudad"
                      solo append-icon dense
                      @input="verifySelectors()">
                      <template v-slot:prepend-inner>
                        <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
                      </template>
                    </v-autocomplete>

                    <label for="" class="font-weight-regular txtLabelsForms">Edificio</label>
                    <v-autocomplete
                      class="classicInput"
                      :items="selectBuilding"
                      :rules="buildingRules"
                      v-model="building"
                      item-text="name"
                      item-value="id"
                      :disabled="disabledBuilding"
                      @change="listFloorBuilding"
                      @input="verifySelectors()"
                      label="Selecciona un edificio"
                      solo append-icon dense>
                      <template v-slot:prepend-inner>
                        <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
                      </template>
                    </v-autocomplete>

                    <label for="" class="font-weight-regular txtLabelsForms">Piso</label>
                    <v-autocomplete
                      class="classicInput"
                      :items="selectFloorBuilding"
                      v-model="floorBuilding"
                      :rules="floorRules"
                      item-text="title"
                      item-value="id"
                      :disabled="disabledFloor"
                      label="Selecciona un piso"
                      solo append-icon dense>
                      <template v-slot:prepend-inner>
                        <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
                      </template>
                    </v-autocomplete>

                    <label for="" class="font-weight-regular txtLabelsForms">Tipo de oficina</label>
                    <v-autocomplete
                      class="classicInput"
                      :items="selectOfficeType"
                      :rules="officeTypeRules"
                      v-model="officeType"
                      item-text="title"
                      item-value="id"
                      label="Selecciona un Tipo de oficina"
                      solo append-icon dense>
                      <template v-slot:prepend-inner>
                        <v-icon class="input-icon-arrow" color="primary">mdi-chevron-down</v-icon>
                      </template>
                    </v-autocomplete>

                    <label for="" class="font-weight-regular txtLabelsForms">Instrucciones para llegar</label>

                    <v-text-field
                      class="classicInput"
                      solo dense
                      v-model="instructionsText"
                      @keyup.enter="addInatructionsToArray"
                      label="Paso a paso">
                      <template v-slot:append-outer>
                        <v-fade-transition leave-absolute>
                          <v-icon color="primary" size="32"
                            @click="addInatructionsToArray" class="mt-n2">
                            mdi-plus-circle
                          </v-icon>
                        </v-fade-transition>
                      </template>
                    </v-text-field>

                    <div v-if="instructions.length > 0">
                      <v-card outlined class="my-3"
                        v-for="(items4, index4) of instructions" :key="'G' + index4">
                        <v-card-title class="py-3 text-body-1">
                          {{ items4 }}

                          <v-icon class="btnFieldText" color="red"
                            @click="removeInstructionsOfArray(index4)">
                            mdi-close-circle
                          </v-icon>
                        </v-card-title>
                      </v-card>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <label for="" class="font-weight-regular txtLabelsForms">Descripción</label>
                    <v-textarea
                      class="classicInput"
                      solo
                      name="input-7-4"
                      v-model="description"
                      :rules="descriptionRules"
                      label="Breve descripción del lugar"
                    ></v-textarea>

                    <label for="" class="font-weight-regular txtLabelsForms">Lista items de verificación</label>
                    <v-row>
                      <v-col cols="9" class="">
                        <v-autocomplete
                          class="classicInput"
                          :items="systemOfficeItems"
                          v-model="itemsText"
                          item-text="name"
                          item-value="name"
                          label="Agrega Items de la sala"
                          solo append-icon dense>
                        </v-autocomplete>
                      </v-col>
                      <v-col cols="3" class="">
                        <v-btn elevation="0" fab x-small dark color="primary">
                          <v-icon @click="addItemsToArray()">mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <div v-if="officeItems.length > 0">
                      <v-dialog
                        v-model="dialog" scrollable :overlay="false"
                        max-width="600px" transition="dialog-transition">
                        <v-card max-width="90%" class="mx-auto mt-10">
                          <v-btn small fab color="red"
                            style="position: absolute; right: -10px; top: -10px"
                            @click="dialog = false">
                            <v-icon color="white">mdi-close</v-icon>
                          </v-btn>
                          <v-card-text class="pt-6">
                            <label for="">Seleccionar Icono</label>
                            <div v-if="iconsTemp.length == 0">
                              <v-card
                                class="elevation-1 ma-2 d-flex justify-center align-center float-left"
                                style="cursor: pointer"
                                v-for="(icon, index) of itemsIcons"
                                :key="index"
                                width="50px"
                                height="50px"
                                @click="selectIcon(icon, indexIcons)">
                                <img :src="icon.svg" class="imgIconOfficeItem"></img>
                              </v-card>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <v-card outlined class="my-3"
                        v-for="(items3, index3) of officeItems" :key="index3">
                        <v-row>
                          <v-col class="colImgOfficeItems">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <img @click="openDialog(index3)" v-on="on"
                                class="imgIconOfficeItem iconOnCard"
                                :src="items3.image.svg">
                                </img>
                              </template>
                              <span>Seleccionar icono</span>
                            </v-tooltip>
                          </v-col>
                          <v-col class="colTextOfficeItems">
                            <v-card-title class="py-3 text-body-1" style="word-break: break-word !important;">
                            {{ items3.name }}
                            <v-icon class="btnFieldText" color="red" @click="removeItemsOfArray(index3)">
                              mdi-close-circle
                            </v-icon>
                          </v-card-title>
                          </v-col>
                        </v-row>
                      </v-card>
                    </div>

                    <label for="" class="font-weight-regular txtLabelsForms">Check in/out</label>

                    <v-row class="mb-0 pb-0">
                      <v-col cols="12" sm="6" md="6" class="mb-0 pb-0">
                        <v-autocomplete
                          class="classicInput"
                          :items="selectTime"
                          v-model="checkIn"
                          :rules="[rules.required]"
                          label="Tiempo Check in"
                          solo append-icon dense>
                          <template v-slot:prepend-inner>
                            <v-icon class="input-icon-arrow" color="primary">
                              mdi-chevron-down
                            </v-icon>
                          </template>
                        </v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="mb-0 pb-0">
                        <v-autocomplete
                          class="classicInput"
                          :items="selectTime"
                          v-model="checkOut"
                          :rules="[rules.required]"
                          label="Tiempo Check out"
                          solo append-icon dense>
                          <template v-slot:prepend-inner>
                            <v-icon class="input-icon-arrow" color="primary">
                              mdi-chevron-down
                            </v-icon>
                          </template>
                        </v-autocomplete>
                      </v-col>
                    </v-row>

                    <label for="" class="font-weight-regular txtLabelsForms">Capacidad</label>
                    <v-text-field
                      class="classicInput"
                      solo dense
                      v-model="capacity"
                      min="0"
                      type="number"
                      :rules="[rules.required]"
                      label="Capacidad">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <label for="" class="font-weight-regular txtLabelsForms">Plano del lugar</label>

                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      id="inputForUploadImage"
                      accept="image/jpg"
                      size="1" multiple
                      @change="onFilePicked"/>

                    <v-card outlined class="pb-5" v-if="images.length == 0">
                      <v-card-title class="d-flex justify-center">
                        <v-icon size="60" @click="openImage" color="primary">
                          mdi-plus-circle
                        </v-icon>
                      </v-card-title>
                      <v-card-text class="px-16 text-center">
                        <h2 style="color: #c7c7c7 !important;">Agregar Fotos</h2>
                      </v-card-text>
                    </v-card>

                    <v-card elevation="0" v-for="(image4, inx) of images" :key="'A' + inx" v-else>
                      <div
                        class="img-checks"
                        @click="openImage"
                        :style="'background-image:url(' + image4 + ')'">
                      </div>
                      <v-icon class="btnClearImage" color="red" @click="clearImagePlain()">
                        mdi-close-circle
                      </v-icon>
                    </v-card>
                    <p class="mb-7 txtCaptionImages">Imagen en formato JPG, de 1000 x 1000 pixeles (Max 1MB).</p>

                    <label for="" class="font-weight-regular txtLabelsForms">Foto del espacio</label>

                    <input
                      type="file"
                      style="display: none"
                      ref="image2"
                      id="inputForUploadImage2"
                      accept="image/jpg"
                      size="1" multiple
                      @change="onFilePicked2"/>

                    <v-card outlined class="pb-5" v-if="images2.length == 0">
                      <v-card-title class="d-flex justify-center">
                        <v-icon size="60" @click="openImage2" color="primary">
                          mdi-plus-circle
                        </v-icon>
                      </v-card-title>
                      <v-card-text class="px-16 text-center">
                        <h2 style="color: #c7c7c7 !important;">Agregar Fotos</h2>
                      </v-card-text>
                    </v-card>

                    <v-card elevation="0" v-for="(image2, index2) of images2" :key="index2" v-else>
                      <div
                        class="img-checks"
                        @click="openImage2"
                        :style="'background-image:url(' + image2 + ')'">
                      </div>
                      <v-icon class="btnClearImage" color="red" @click="clearImageOffice()">
                        mdi-close-circle
                      </v-icon>
                    </v-card>
                    <p class="mb-7 txtCaptionImages">Imagen en formato JPG, de 1000 x 1000 pixeles (Max 1MB).</p>

                    <v-card class="elevation-1 mt-5">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" class="pa-0">
                            <qrcode
                              :value="qrCode" tag="img"
                              id="imageCanvas"
                              :options="{ width: 180 }">
                            </qrcode>
                          </v-col>
                          <!-- <v-col cols="12" lg="7" md="12" class="black--text">
                            <p class="ma-0">Piso 10</p>
                            <p class="ma-0">Sala 300</p>
                            <p class="ma-0">Meeting Room</p>

                            <p class="mt-auto">Generar code</p>
                          </v-col> -->
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <!-- <span
                      class="float-left primary--text"
                      style="cursor: pointer !important"
                      @click="generateQrCode"
                      >
                      Generar código qr
                    </span>
                    <div
                      class="d-flex justify-end primary--text"
                      @click="downloadQrCode">
                      <span style="cursor: pointer !important">Descargar</span>
                      <v-icon color="primary" style="cursor: pointer !important">mdi-download</v-icon>
                    </div> -->
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-form>

      <v-row class="pl-4 pr-4">
        <v-col class="mx-auto" cols="12" sm="11" md="11">
          <v-btn
            style="background-color: white !important; border-radius: 8px"
            class="text-capitalize px-10"
            elevation="3"
            outlined
            color="red" v-on:click="goToBack()"
            >Cancelar</v-btn
          >
          <v-btn
            style="background-color: white !important; border-radius: 8px"
            class="text-capitalize px-14 ml-10"
            @click="createOfficeType"
            elevation="3"
            outlined
            color="#0691DA"
            >Crear</v-btn
          >
        </v-col>
      </v-row>

    </v-flex>
  </v-layout>
</template>
<script>
// import * as VueGoogleMaps from "vue2-google-maps";

export default {
  layout: "logged",
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
          text: 'Crear Espacio',
          disabled: true,
          href: '/cities/create-space',
        },
      ],
      disabledBuilding: true,
      disabledFloor: true,
      cityToGetBuildings:0,
      dialog: false,
      // icons: ["circle", "arrow-left", "wifi"],
      itemsIcons: [],
      iconsTemp: [],
      searchIcon: "",

      itemsText: "",
      name: "",
      description: "",
      selectBuilding: [],
      building: "",
      selectCity: [],
      city: "",
      selectOfficeType: [],
      officeType: "",
      selectFloorBuilding: [],
      floorBuilding: "",
      capacity: 1,
      checkIn: "",
      checkOut: "",
      qrCode: "1",
      officeItems: [],
      indexIcons: "",
      instructions: [],
      instructionsText: "",

      selectTime: [],

      photosSelected: [],
      images: [],
      photosSelected2: [],
      images2: [],

      rules: {
        required: (value) => !!value || "Campo requerido ",
        min: (v) =>
          v.length >= 8 || "El campo debe tener al menos 4 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || "Debe ingresar un correo válido",
        number: (v) =>
          typeof v != "number" || "El campo debe contener solo numeros",
      },
      nameRules:[
        v => !!v || 'Nombre requerido.',
        v => v.length >= 4 || 'El nombre debe contener al menos 4 caracteres.',
        v => v.length < 61 || 'El nombre debe contener máximo 60 caracteres.',
      ],
      descriptionRules:[
        v => !!v || 'Descripción requerida.',
        v => v.length >= 6 || 'La descripción debe contener al menos 6 caracteres.',
        v => v.length < 251 || 'La descripción debe contener máximo 250 caracteres.',
      ],
      cityRules:[
        v => !!v || 'Ciudad requerida.',
      ],
      buildingRules:[
        v => !!v || 'Edificio requerido.',
      ],
      floorRules:[
        v => !!v || 'Piso requerido.',
      ],
      officeTypeRules:[
        v => !!v || 'Tipo de oficina requerido.',
      ],
      systemOfficeItems: [],
    };
  },
  mounted() {
    this.listCities();
    this.listBuildings();
    this.listOfficeType();
    this.getAllSystemOfficeItems();
    this.getAllSystemIcons();
    this.generateQrCode();

    for (let i = 10; i <= 60; i += 5) {
      this.selectTime.push(i + " minutos");
    }
  },
  methods: {
    async getAllSystemIcons(){
      await this.$store.dispatch('systemItemIcons/getAllSystemIcons', {
        acstkn: localStorage.getItem("acstkn")
      })
      .then((response) => {
        if (response.success && response.code===100) {
          // console.log(response)
          this.itemsIcons = response.body.allIcons
        }
      })
      .catch((error) => {});
    },
    clearImagePlain(){
      var self = this
      document.getElementById("inputForUploadImage").value = "";
      self.images = [];
      self.photosSelected = [];
    },
    clearImageOffice(){
      var self = this
      document.getElementById("inputForUploadImage2").value = "";
      self.images2 = [];
      self.photosSelected2 = [];
    },
    verifySelectors(){
      if(this.city === undefined || this.city === 0){
        this.cityToGetBuildings = 0;
        this.disabledBuilding = this.disabledFloor = true;
        this.building = this.floorBuilding = "";
      }else{
        if(this.building === undefined || this.building === ""){
          this.disabledFloor = true
          this.floorBuilding = "";
        }else{
          this.disabledFloor = false;
        }
        this.disabledBuilding = false;
        this.cityToGetBuildings = this.city;
      }
      this.listBuildings();
    },
    goToBack(){
      this.$router.push('/cities');
    },
    openImage() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      var fileInput = document.getElementById("inputForUploadImage");
      var filelength = fileInput.files.length;
      var allowedExtensions = /(jpg)$/i; // ? Extensiones permitidas
      var error = "";
      var self = this;
      var eFiles = e.target;

      var reader = new FileReader();
      //Read the contents of Image File.

      if (fileInput.files.length != 0) {
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function (e) {
          var image = new Image();

          image.src = e.target.result;

          image.onload = function () {
            var height = this.height;
            var width = this.width;
            if (height > 1000 || width > 1000) {
              // alert("supera los 1000 x 1000");
              self.watchError("Esta imagen supera las dimensiones (1000x1000)");
              return false;
            } else {
              for (var i = 0; i < fileInput.files.length; i++) {
                // ? Recorre las imágenes cargadas
                var file = fileInput.files[i]; // ? Obtiene el archivo que está siendo recorrido
                var FileName = file.name;
                var FileExt = FileName.substr(FileName.lastIndexOf(".") + 1); // ? Obtiene la extensión del archivo
                if (self.photosSelected.length + 1 > 20) {
                  // ? Si la cantidad de fotos cargadas superan los 20
                  self.watchError("Si subes demasiadas fotos se podrá generarse un error al cargar las fotos");
                  error +=
                    "\n* Si subes demasiadas fotos se podrá generarse un error al cargar las fotos.";
                  error +=
                    "\n  Has cargado " + this.photosSelected.length + " fotos";
                  this.showError = true;
                } else {
                  if (!allowedExtensions.exec(FileExt)) {
                    // ? Si la extensión no finaliza en las extensiones permitidas
                    self.watchError("La única extensión permitida para subir la imagen es .jpg");
                    error +=
                      "\n* Subiste una imágen con extensión: ." + FileExt;
                    error +=
                      ".\n  La única extensión permitida para subir la imagen es .jpg";
                    self.showError = true;
                    console.error("error", error);
                  } else {
                    if (file.size > 1e6 * 1) {
                      // ? Si el tamaño de la imagen supera los 3MB
                      // console.log("Tamaño imagen sobrepasado", file.size / 1e6);
                      self.watchError("El tamaño de la imagen es mayor al permitido (1MB)");
                      error +=
                        "\n* El tamaño de la imagen es mayor al permitido (1MB).\n  Tamaño actual = " +
                        file.size / 1e6 +
                        "MB";
                      self.showError = true;
                    } else {
                      // ! Comentado porque quieren que desde web se puedan subir más imágenes que solo X cantidad inferior a 8MB.
                      // if (((self.filesTotalSize + file.size) / 1e+6) >= 8) { // ? Si el tamaño de la imagen junto con las imagenes cargadas supera los 8 MB
                      //   console.log('Tamaño general sobre pasado.', 'Tamaño del archivo' + (file.size / 1e+6), 'Tamaño general' + (self.filesTotalSize / 1e+6));
                      //   error += "\n* No puedes subir más de 8 MB por carga. Tamaño general actual = " + (self.filesTotalSize / 1e+6) + "MB";
                      //   error += ".\n  El tamaño de la imagen que tratas de subir es de " + (file.size / 1e+6) + "MB";
                      //   self.showError = true;
                      // } else {
                      self.filesTotalSize = self.filesTotalSize + file.size; // ? Agrega el tamaño de todas las fotos cargadas
                      var file = eFiles.files[i],
                        imageType = /image.*/;
                      if (!file.type.match(imageType)) return;
                      var reader = new FileReader();
                      reader.onload = self.fileOnload;
                      reader.readAsDataURL(file);
                      self.deleteImageButton = true;
                      var photoData = {
                        id: i,
                        file: self.$refs.image.files[i],
                        fileToShow: file,
                      };
                      self.photosSelected = [];
                      self.photosSelected.push(self.$refs.image.files[i]); // ? Carga la imagen recorrida y validada al array de imagenes por sesión
                      // }
                    }
                  }
                }
              }

              if (self.showError) {
                self.images = [" " + self.product.productImage[0].image];
              } else {
                self.images = [];
              }
              self.photosSelected.forEach((photo) => {
                // ? Permite que las imagenes sean visibles
                var reader = new FileReader();
                self.mostrarClase = true;
                self.images = [];
                reader.onload = (e) => self.images.push(e.target.result);
                reader.readAsDataURL(photo);
              });
            }
            // alert("Uploaded image has valid Height and Width.");
            // return true;
          };
        };
      }

      //
    },
    fileOnload(e) {
      var result = e.target.result;
    },
    deleteAllImages() {
      this.mostrarClase = false;
      this.images = [" " + this.product.productImage[0].image];
      this.deleteImageButton = false;
      this.photosSelected = [];
      this.filesTotalSize = 0;
    },
    deleteImage(_index) {
      // console.log('Imagen a eliminar: ', this.photosSelected[_index].size);
      this.filesTotalSize =
        this.filesTotalSize - this.photosSelected[_index].size;
      this.photosSelected.splice(_index, 1);
      this.images.splice(_index, 1);
    },

    openImage2() {
      this.$refs.image2.click();
    },
    onFilePicked2(e) {
      var fileInput = document.getElementById("inputForUploadImage2");
      var filelength = fileInput.files.length;
      var allowedExtensions = /(jpg)$/i; // ? Extensiones permitidas
      var error = "";
      var self = this;
      var eFiles = e.target;

      var reader = new FileReader();
      //Read the contents of Image File.

      if (fileInput.files.length != 0) {
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function (e) {
          var image = new Image();

          image.src = e.target.result;

          image.onload = function () {
            var height = this.height;
            var width = this.width;
            if (height > 1000 || width > 1000) {
              // alert("supera los 1000 x 1000");
              self.watchError("Esta imagen supera las dimensiones (1000x1000)");
              return false;
            } else {
              for (var i = 0; i < fileInput.files.length; i++) {
                // ? Recorre las imágenes cargadas
                var file = fileInput.files[i]; // ? Obtiene el archivo que está siendo recorrido
                var FileName = file.name;
                var FileExt = FileName.substr(FileName.lastIndexOf(".") + 1); // ? Obtiene la extensión del archivo
                if (self.photosSelected2.length + 1 > 20) {
                  // ? Si la cantidad de fotos cargadas superan los 20
                  self.watchError("Si subes demasiadas fotos se podrá generarse un error al cargar las fotos");
                  error +=
                    "\n* Si subes demasiadas fotos se podrá generarse un error al cargar las fotos.";
                  error +=
                    "\n  Has cargado " + this.photosSelected2.length + " fotos";
                  this.showError = true;
                } else {
                  if (!allowedExtensions.exec(FileExt)) {
                    // ? Si la extensión no finaliza en las extensiones permitidas
                    self.watchError("La única extensión permitida para subir la imagen es .jpg");
                    error +=
                      "\n* Subiste una imágen con extensión: ." + FileExt;
                    error +=
                      ".\n  La única extensión permitida para subir la imagen es .jpg";
                    self.showError = true;
                    console.error("error", error);
                  } else {
                    if (file.size > 1e6 * 1) {
                      // ? Si el tamaño de la imagen supera los 3MB
                      // console.log("Tamaño imagen sobrepasado", file.size / 1e6);
                      self.watchError("El tamaño de la imagen es mayor al permitido (1MB)");
                      error +=
                        "\n* El tamaño de la imagen es mayor al permitido (1MB).\n  Tamaño actual = " +
                        file.size / 1e6 +
                        "MB";
                      self.showError = true;
                    } else {
                      // ! Comentado porque quieren que desde web se puedan subir más imágenes que solo X cantidad inferior a 8MB.
                      // if (((self.filesTotalSize + file.size) / 1e+6) >= 8) { // ? Si el tamaño de la imagen junto con las imagenes cargadas supera los 8 MB
                      //   console.log('Tamaño general sobre pasado.', 'Tamaño del archivo' + (file.size / 1e+6), 'Tamaño general' + (self.filesTotalSize / 1e+6));
                      //   error += "\n* No puedes subir más de 8 MB por carga. Tamaño general actual = " + (self.filesTotalSize / 1e+6) + "MB";
                      //   error += ".\n  El tamaño de la imagen que tratas de subir es de " + (file.size / 1e+6) + "MB";
                      //   self.showError = true;
                      // } else {
                      self.filesTotalSize = self.filesTotalSize + file.size; // ? Agrega el tamaño de todas las fotos cargadas
                      var file = eFiles.files[i],
                        imageType = /image.*/;
                      if (!file.type.match(imageType)) return;
                      var reader = new FileReader();
                      reader.onload = self.fileOnload2;
                      reader.readAsDataURL(file);
                      self.deleteImageButton = true;
                      var photoData = {
                        id: i,
                        file: self.$refs.image2.files[i],
                        fileToShow: file,
                      };
                      self.photosSelected2 = [];
                      self.photosSelected2.push(self.$refs.image2.files[i]); // ? Carga la imagen recorrida y validada al array de imagenes por sesión
                      // }
                    }
                  }
                }
              }

              if (self.showError) {
                self.images2 = [" " + self.product.productImage[0].image];
              } else {
                self.images2 = [];
              }
              self.photosSelected2.forEach((photo) => {
                // ? Permite que las imagenes sean visibles
                var reader = new FileReader();
                self.mostrarClase = true;
                self.images2 = [];
                reader.onload = (e) => self.images2.push(e.target.result);
                reader.readAsDataURL(photo);
              });
            }
            // alert("Uploaded image has valid Height and Width.");
            // return true;
          };
        };
      }

      //
    },
    fileOnload2(e) {
      var result = e.target.result;
    },
    deleteAllImages2() {
      this.mostrarClase = false;
      this.images2 = [" " + this.product.productImage[0].image];
      this.deleteImageButton = false;
      this.photosSelected2 = [];
      this.filesTotalSize = 0;
    },
    deleteImage2(_index) {
      // console.log('Imagen a eliminar: ', this.photosSelected[_index].size);
      this.filesTotalSize =
        this.filesTotalSize - this.photosSelected2[_index].size;
      this.photosSelected2.splice(_index, 1);
      this.images2.splice(_index, 1);
    },

    generateQrCode() {
      let number = Math.floor(Math.random() * 100000) + 9999;
      // console.log(number);
      this.qrCode = number;
      this.verifyQrCode();
    },
    async verifyQrCode(){
      await this.$store.dispatch('office/verifyQrCode', {
        qrCode: this.qrCode,
        acstkn: localStorage.getItem("acstkn")
      })
      .then((response) => {
        if (response.success && response.code===100) {
          if(response.body.existQrCode){
            this.generateQrCode();
          }
        }
      })
      .catch((error) => {});
    },
    downloadQrCode() {
      let pepe = document.getElementById("imageCanvas");
      var a = document.createElement("a");
      a.href = pepe.src;
      a.download = "Image.png";
      a.click();
    },

    openDialog(index) {
      this.dialog = true;
      this.indexIcons = index;
    },

    addInatructionsToArray() {
      var emptyField = /[0-9a-z]/i;
      if (this.instructionsText != "" && emptyField.test(this.instructionsText)) {
        this.instructionsText.trim();
        this.instructions.push(this.instructionsText);
        this.instructionsText = "";
      }
    },
    removeInstructionsOfArray(index) {
      this.instructions.splice(index, 1);
    },

    addItemsToArray() {
      var emptyField = /[0-9a-z]/i;
      if (this.itemsText != "" && emptyField.test(this.itemsText)) {
        this.itemsText.trim();
        this.officeItems.push({ name: this.itemsText, image: this.itemsIcons[0] });
        this.itemsText = "";
      }
    },
    buscarIcon() {
      let pepe = this.icons.filter((a) => a.includes(this.searchIcon));

      this.iconsTemp = pepe;
    },
    removeItemsOfArray(index) {
      this.officeItems.splice(index, 1);

      // console.log(this.officeItems);
    },
    selectIcon(icon, index) {
      this.officeItems[index].image = icon;
      this.dialog = false;
    },

    async listCities() {
      let formTemp = {
        acstkn: localStorage.getItem("acstkn"),
        needle: "",
      };
      const response = await this.$store.dispatch(
        "cities/listCities",
        formTemp
      );
      this.selectCity = [];
      if (response.success) {
        response.body.cities.forEach((resp) => {
          this.selectCity.push({
            id: resp.id,
            title: resp.name,
          });
        });
      }
    },

    async getAllSystemOfficeItems() {
      let formSystemOfficeItems = {
        acstkn: localStorage.getItem("acstkn"),
      };
      await this.$store.dispatch('systemOfficeItems/getAllSystemOfficeItems', formSystemOfficeItems)
      .then((response) => {
        if (response.success && response.code === 100) {
          this.systemOfficeItems = response.body;
          // console.log(this.systemOfficeItems)
        }
      })
      .catch((error) => {
      });
    },
    async listFloorBuilding() {
      let id = this.building;
      const response = await this.$store.dispatch(
        "floorBuilding/listFloorBuilding",
        {
          id: id,
          acstkn: localStorage.getItem("acstkn"),
        }
      );
      this.selectFloorBuilding = [];
      if (response.success) {
        response.body.forEach((resp) => {
          this.selectFloorBuilding.push({
            id: resp.id,
            title: resp.floor,
          });
        });
      }
    },
    async listBuildings() {
      let formTemp = {
        acstkn: localStorage.getItem("acstkn"),
        cityId: this.cityToGetBuildings,
        needle: "",
      };
      const response = await this.$store.dispatch(
        "building/listBuildings",
        formTemp
      );
      this.selectBuilding = [];
      if (response.success) {
        this.selectBuilding = response.body.buildings;
      }
    },
    async listOfficeType() {
      let formTemp = {
        acstkn: localStorage.getItem("acstkn"),
        name: "",
      };
      const response = await this.$store.dispatch(
        "officeType/officeTypeList",
        formTemp
      );
      this.selectOfficeType = [];
      if (response.success) {
        response.body.officeTypes.forEach((resp) => {
          this.selectOfficeType.push({
            id: resp.id,
            title: resp.name,
          });
        });
      }
    },

    async createOfficeType() {
      if (this.$refs.formSpaceCreate.validate()) {
        if (
          this.description !== "" &&
          this.name !== "" &&
          this.building !== "" &&
          this.officeType !== "" &&
          this.floorBuilding !== "" &&
          this.capacity > 0 &&
          this.capacity !== "" &&
          this.checkIn !== "" &&
          this.checkOut !== "" &&
          this.qrCode !== "1" &&
          this.officeItems.length !== 0 &&
          this.instructions.length !== 0 &&
          this.city !== "" &&
          this.photosSelected.length !== 0 &&
          this.photosSelected2.length !==0
        ) {
          let formData = {
            name: this.name,
            description: this.description,
            city: this.city,
            building: this.building,
            officeType: this.officeType,
            floorBuilding: this.floorBuilding,
            checkIn: this.checkIn,
            checkOut: this.checkOut,
            capacity: this.capacity,
            qrCode: this.qrCode,
            // qrCode: "",
            officeItems: this.officeItems,
            instructions: this.instructions,
            // main: this.photosSelected[0],
            main: this.photosSelected2[0],
            image: this.photosSelected[0],
            // image: this.photosSelected2[0],
            acstkn: localStorage.getItem("acstkn"),
            logBoAdminId: localStorage.getItem("boAdminId")
          };
          const response = await this.$store.dispatch(
            "office/createOffice",
            formData
          );
          if (response.success) {
            this.$router.replace({
              path: "/cities",
            });
          }
        } else {
          this.watchError("Debes llenar todos los campos");
        }
      }else{
        this.watchError("Debes llenar todos los campos");
      }
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
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.v-dialog {
  box-shadow: none !important;
}
</style>
