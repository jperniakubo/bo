<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row>
        <v-col cols="12" sm="2" md="2"></v-col>
        <v-col cols="12" sm="8" md="8">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-breadcrumbs
                class="float-right"
                large
                :items="itemBreadcrumbs"
              ></v-breadcrumbs>
            </v-col>
          </v-row>
          <v-card class="cardAddAdmin">
            <v-form ref="updateAdmin">
              <v-row>
                <v-col class="colImageProfile">
                  <div class="divImageEditProfile">
                    <v-avatar size="120">
                      <v-img
                        :src="imageUrl ? imageUrl : defaultImageAdmin"
                        alt="Usuario"
                      ></v-img>
                    </v-avatar>
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <v-avatar
                          v-on="on"
                          size="34"
                          style="left: -40px; bottom: -44px;"
                        >
                          <v-img
                            src="/ic_edit.svg"
                            alt="edit"
                            @click="pickImgPFile()"
                          ></v-img>
                        </v-avatar>
                      </template>
                      <span class="sourceSansProregular txtTooltip"
                        >Cargar foto</span
                      >
                    </v-tooltip>
                    <input
                      type="file"
                      style="display: none"
                      id="imageProfileUser"
                      ref="imgProfile"
                      accept="image/jpg,image/jpeg,image/png"
                      @change="onImgPFilePicked"
                    />
                  </div>
                </v-col>
                <v-col class="colLabelImageProfile">
                  <p class="txtLabelImageProfile">
                    PNG o JPG de proporción cuadrada 500 x 500 píxeles Max 1MB.
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Nombre completo </label>
                    <v-text-field
                      placeholder="Nombres"
                      solo
                      flat
                      dense
                      class="classicInput"
                      v-model="fullName"
                      :rules="nameRules"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Correo electrónico </label>
                    <v-text-field
                      placeholder="Correo electrónico"
                      solo
                      flat
                      dense
                      class="classicInput"
                      v-model="email"
                      :rules="emailRules"
                    ></v-text-field>
                  </div>
                </v-col>
                <!-- <v-col cols="6" class="colsFields">
                  <div>
                    <label>Número de teléfono</label>
                    <v-text-field
                      placeholder="Número de teléfono"
                      solo flat dense
                      class="classicInput"
                      v-model="phoneNumber"
                      :rules="phoneNumber ? phoneRules : withoutRules"
                      v-on:keyup="correctNumber()"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Rol </label>
                    <v-autocomplete
                      class="classicInput"
                      :items="roles"
                      item-text="name"
                      item-value="id"
                      :rules="roleRules"
                      v-model="roleAdminId"
                      @input="setNewPosition()"
                      label="Rol"
                      solo flat dense
                      append-icon="mdi-chevron-down"
                    ></v-autocomplete>
                  </div>
                </v-col> -->
                <v-col cols="12" class="colsFields">
                  <span
                    style="color:grey; font-size: 0.75em;margin-right: 20px !important;"
                    >Si no desea actualizar la contraseña deje en blanco los
                    siguientes campos</span
                  >
                </v-col>
                <!-- <v-col cols="6" class="colsFields">
                  <div>
                    <label>
                      Contraseña anterior
                    </label>

                    <v-text-field
                      placeholder="Mínimo 6 digitos"
                      solo
                      flat
                      dense
                      class="classicInput"
                      v-model="password"
                      :rules="
                        password || newPassword || confirmPassword
                          ? passwordRules
                          : withoutRules
                      "
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" class="colsFields"></v-col> -->
                <v-col cols="6" class="colsFields">
                  <div>
                    <label>
                      Nueva contraseña
                    </label>
                    <v-text-field
                      placeholder="Mínimo 6 digitos"
                      solo
                      flat
                      dense
                      class="classicInput"
                      v-model="newPassword"
                      :rules="
                        password || newPassword || confirmPassword
                          ? passwordRules
                          : withoutRules
                      "
                      :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showNewPassword ? 'text' : 'password'"
                      @click:append="showNewPassword = !showNewPassword"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Confirmar contraseña </label>
                    <v-text-field
                      placeholder="Confirmar contraseña"
                      solo
                      flat
                      dense
                      class="classicInput"
                      v-model="confirmPassword"
                      :rules="
                        password || newPassword || confirmPassword
                          ? [
                              rules.required,
                              rules.min,
                              passwordConfirmationRule
                            ]
                          : withoutRules
                      "
                      :append-icon="
                        showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showConfirmPassword ? 'text' : 'password'"
                      @click:append="showConfirmPassword = !showConfirmPassword"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <!-- <v-alert type="success" v-if="successUpdateAdmin">
                    <span v-html="messageResponse"></span>
                  </v-alert> -->
                  <!-- <v-alert type="error" v-if="errorUpdateAdmin">
                    <span v-html="messageResponse"></span>
                  </v-alert> -->
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-btn
                class="ma-2 classicButtonCancel"
                outlined
                @click="backToDashboard"
                >Volver</v-btn
              >
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-btn
                class="ma-2 classicButtonCreate"
                outlined
                @click="updateAdmin"
                >Actualizar perfil</v-btn
              >
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-progress-circular
                indeterminate
                color="primary"
                class="mt-2"
                v-if="showProgressCallApi"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="2" md="2"></v-col>
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
          text: "Dashboard",
          disabled: false,
          href: "/dashboard"
        },
        {
          text: "Perfil",
          disabled: true,
          href: "/profile"
        }
      ],
      roleAdminId: 0,
      boAdminId: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      position: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      rules: {
        required: value => !!value || "Contraseña requerida",
        min: v =>
          v.length >= 6 || "La contraseña debe tener al menos 6 caracteres"
      },
      nameRules: [
        v => !!v || "Nombre y apellido requerido.",
        v => v.length >= 8 || "El nombre debe contener al menos 8 caracteres.",
        v => v.length < 40 || "El nombre debe contener máximo 40 caracteres."
      ],
      emailRules: [
        v => !!v || "Correo electrónico requerido.",
        v => /.+@.+\..+/.test(v) || "Ingrese un correo valido.",
        v => v.length >= 8 || "El correo debe contener al menos 8 caracteres.",
        v => v.length < 40 || "El correo debe contener máximo 40 caracteres."
      ],
      phoneRules: [
        v => /^(?=.*\d)[\d ]+$/.test(v) || "Ingrese un valor númerico.",
        v => v.length >= 10 || "El teléfono debe tener mínimo 10 dígitos.",
        v => v.length < 16 || "El teléfono debe tener máximo 15 dígitos."
      ],
      roleRules: [v => !!v || "Rol requerido."],
      withoutRules: [],
      passwordRules: [
        v => !!v || "Contraseña requerida.",
        v =>
          /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{6,}$/.test(
            v
          ) ||
          "Mínimo seis caracteres, al menos una letra mayúscula, una letra minúscula y un número."
      ],
      showPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      defaultImageAdmin: "/ic_profile.png",
      temporaryImageName: "",
      imageFile: "",
      imageName: "",
      imageUrl: "",
      // successUpdateAdmin: false,
      // errorUpdateAdmin: false,
      // messageResponse: '',
      showProgressCallApi: false,
      roles: []
    };
  },
  mounted() {
    // if(parseInt(localStorage.getItem("currentRole")) !== 1){
    //   this.$router.push({ path: "/dashboard", force: true })
    // }
    this.boAdminId = localStorage.getItem("boAdminId");
    localStorage.setItem("firstPageUrl", window.location.href);
    localStorage.setItem("secondPageUrl", "");
    this.getAdminData();
    this.getAllRolesAdmin();
  },
  methods: {
    correctNumber() {
      this.phoneNumber = this.phoneNumber.split(" ").join("");
    },
    setNewPosition() {
      this.roles.forEach(element => {
        this.roleAdminId === element.id ? (this.position = element.name) : "";
      });
    },
    async getAllRolesAdmin() {
      await this.$store
        .dispatch("boAdmin/getAllRolesAdmin", localStorage.getItem("acstkn"))
        .then(response => {
          if (response.success && response.code === 100) {
            this.roles = response.body;
          }
        })
        .catch(error => {});
    },
    pickImgPFile: function() {
      this.imageFile = "";
      this.imageName = "";
      this.imageUrl = "";
      document.getElementById("imageProfileUser").value = "";
      this.$refs.imgProfile.click();
    },
    onImgPFilePicked: function(e) {
      var self = this;
      var eFiles = e.target;
      var fileInput = document.getElementById("imageProfileUser");
      var filelength = fileInput.files.length;

      if (fileInput.files[0] !== undefined) {
        this.imageName = fileInput.files[0].name;

        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function(e) {
          var image = new Image();
          image.src = e.target.result;

          image.onload = function() {
            var height = this.height;
            var width = this.width;

            if (height > 500 || width > 500) {
              self.watchError(
                "La imagen supera las dimensiones (500 x 500), por favor carga otra."
              );
              self.imageName = "";
              self.imageFile = "";
              self.imageUrl = "";
            } else {
              self.imageUrl = reader.result;
              self.imageFile = fileInput.files[0]; // this is an image file that can be sent to server...
              if (self.imageFile.size > 1000000) {
                self.watchError("La imagen supera el tamaño (1Mb).");
                self.imageName = "";
                self.imageFile = "";
                self.imageUrl = "";
              }
            }
          };
        };
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    async getAdminData() {
      const data = await this.$store.dispatch("boAdmin/getAdminInfoById", {
        id: parseInt(this.boAdminId),
        acstkn: localStorage.getItem("acstkn")
      });
      // set data to model
      let infoAdmin = data.body;
      this.fullName = infoAdmin.fullName;
      this.email = infoAdmin.email;
      this.phoneNumber = infoAdmin.phoneNumber;
      this.position = infoAdmin.position;
      this.roleAdminId = infoAdmin.roleAdminId;
      if (infoAdmin.profileImage !== "")
        this.defaultImageAdmin = infoAdmin.profileImage;
    },
    async updateAdmin() {
      this.showProgressCallApi = true;
      // this.errorUpdateAdmin = false;
      // this.successUpdateAdmin = false;
      if (!this.$refs.updateAdmin.validate()) {
        this.showProgressCallApi = false;
        return;
      }
      let sha1 = require("sha1");
      await this.$store
        .dispatch("boAdmin/updateAdmin", {
          acstkn: localStorage.getItem("acstkn"),
          id: this.boAdminId,
          fullName: this.fullName,
          oldPassword:
            this.password.length === 0 ? "1234" : sha1(this.password),
          newPassword:
            this.newPassword.length === 0 ? "" : sha1(this.newPassword),
          email: this.email,
          position: this.position,
          phoneNumber: this.phoneNumber,
          avatar: this.imageFile,
          roleAdminId: this.roleAdminId
        })
        .then(response => {
          this.showProgressCallApi = false;
          if (response.code === 100 && response.success == true) {
            this.watchSuccess(response.body.message);
            if (response.body.adminData.profileImage !== "") {
              this.defaultImageAdmin = response.body.adminData.profileImage;
              localStorage.setItem(
                "profileImage",
                response.body.adminData.profileImage
              );
            }
            localStorage.setItem("fullName", this.fullName);
            setTimeout(function() {
              var URLactual = window.location.origin;
              window.location = URLactual + "/dashboard";
            }, 1000);
          } else {
            this.watchError(response.body.message);
          }
        })
        .catch(error => {
          this.$router.push({ path: "/logout", force: true });
          this.showProgressCallApi = false;
          if (error.response.status === 400) {
            this.watchError(error.response.data.message);
          } else {
            this.watchError("Ha ocurrido un error");
          }
        });
    },
    backToDashboard() {
      this.$router.push("/dashboard");
    },
    watchError(messageError) {
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
    watchSuccess(messageSuccess) {
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
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.newPassword === this.confirmPassword || "Contraseñas no coinciden";
    }
  }
};
</script>
