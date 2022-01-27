<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="11" md="11">
          <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col class="mx-auto" cols="12" sm="11" md="11">
          <v-card class="px-10 pt-8">
            <v-card-title>
              <v-row class="pl-4 pr-4">
                <!-- <v-col cols="12" sm="4" md="4"> -->
                <v-col cols="4">
                  <label for="" class="font-weight-regular">Nombre</label>
                  <v-text-field
                    solo
                    v-model="inputName"
                    :rules="[rules.required]"
                    label="Nombre"
                  ></v-text-field>
                  <label for="" class="font-weight-regular">Descripción</label>
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Breve descripción del lugar"
                    :rules="[rules.required]"
                    v-model="inputDescription"
                  ></v-textarea>
                </v-col>
                <!-- <v-col cols="12" class="ml-16" sm="4" md="4"> -->
                <v-col cols="4">
                  <label for="" class="font-weight-regular"
                    >Foto de la oficina</label
                  >
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    id="inputForUploadImage"
                    accept="image/jpg"
                    size="1"
                    multiple
                    @change="onFilePicked"
                  />
                  <v-card outlined v-if="images.length == 0">
                    <v-card-title class="d-flex justify-center">
                      <v-icon size="60" @click="openImage" color="primary"
                        >mdi-plus-circle</v-icon
                      >
                    </v-card-title>
                    <v-card-text class="px-16 text-center">
                      Recuerda subir imágenes JPG <br />
                      de máximo 1000 x 800 píxeles <br />
                      y que no superen un peso de 1MB.
                    </v-card-text>
                  </v-card>
                  <div v-for="(image, index) of images" :key="index" v-else>
                    <div
                      class="img-checks"
                      @click="openImage"
                      :style="'background-image:url(' + image + ')'"
                    ></div>
                  </div>
                </v-col>
                <!-- <v-col cols="12" sm="4" md="4"> -->
                <v-col cols="4">
                  <label for="" class="font-weight-regular">Cargo</label>
                  <v-select
                    class="classicInput"
                    v-model="positionsOfficeType"
                    :items="allPositions"
                    item-text="name"
                    item-value="id"
                    :menu-props="{ maxHeight: '400' }"
                    label="Seleccionar"
                    multiple persistent-hint solo
                    color="#005EB8"
                    item-color="#005EB8">
                    </v-select>
                    <!-- hint="Selecciona los cargos permitidos para este tipo de oficina." -->
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="pl-4 pr-4">
        <v-col class="mx-auto" cols="12" sm="11" md="11">
          <v-btn
            style="background-color: white !important; border-radius: 8px"
            class="text-capitalize px-10"
            elevation="3"
            outlined
            color="red"
            @click="$router.push('/cities')"
            >Cancelar</v-btn
          >
          <v-btn
            style="background-color: white !important; border-radius: 8px"
            class="text-capitalize px-14 ml-10"
            elevation="3"
            outlined
            @click="updateOfficeType"
            color="#0691DA"
            >Editar</v-btn
          >
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
          text: 'Tipos de oficina',
          disabled: false,
          href: '/cities',
        },
        {
          text: 'Editar Oficina',
          disabled: true,
          href: '/cities/update-office',
        },
      ],
      photosSelected: [],
      images: [],
      inputDescription: "",
      inputName: "",
      officeTypeId: "",
      positionsOfficeType: [],

      // snackbar: false,
      // snackbarMessage: "",

      rules: {
        required: (value) => !!value || "Campo requerido ",
        min: (v) =>
          v.length >= 8 || "El campo debe tener al menos 4 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || "Debe ingresar un correo válido",
      },
      allPositions:[],
    };
  },
  mounted() {
    this.getAllPositions();
    this.officeTypeId = this.$route.params.officeTypeId;

    this.getOfficeType();
  },
  methods: {
    async getAllPositions() {
      let formGetAllPositions = {
        acstkn: localStorage.getItem("acstkn"),
      };
      await this.$store.dispatch('position/getAllPositions', formGetAllPositions)
      .then((response) => {
        if (response.success && response.code === 100) {
          this.allPositions = response.body.allPositions;
        }
      })
      .catch((error) => {
      });
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
            if (height > 800 || width > 1000) {
              // alert('supera los 1000 x 800')
              self.watchError('La imagen supera las dimensiones (1000 x 800)')
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
                  console.log(self.inputProduct);
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
                      self.watchError("El tamaño de la imagen es mayor al permitido (1MB)");
                      console.log("Tamaño imagen sobrepasado", file.size / 1e6);
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

        console.log("pasé aquí");
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

    async getOfficeType() {
      const response = await this.$store.dispatch(
        "officeType/officeTypeOne",{
          acstkn: localStorage.getItem("acstkn"),
          officeTypeId: this.officeTypeId
        }
      );
      if (response.success) {
        this.inputName = response.body.name
        this.inputDescription = response.body.description
        this.images.push(response.body.image)
        this.positionsOfficeType = response.body.positions;
      }
    },
    async updateOfficeType() {
      if (this.inputDescription != "" && this.inputName != "" && this.positionsOfficeType.length > 0) {
        let formData = {};

        formData.name = this.inputName;
        formData.description = this.inputDescription;
        formData.main = this.photosSelected[0];
        formData.id = this.officeTypeId;
        formData.acstkn = localStorage.getItem("acstkn");
        formData.positions = this.positionsOfficeType;
        formData.logBoAdminId = localStorage.getItem("boAdminId");

        const response = await this.$store.dispatch(
          "officeType/updateOfficeType",
          formData
        );
        if (response.success) {
          this.$router.replace({
            path: "/cities",
          });
        }
      } else {
        // this.snackbar = true;
        // this.snackbarMessage = "Debes llenar todos los campos";
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
