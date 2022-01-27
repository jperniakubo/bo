<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row>
        <v-col cols="12" sm="2" md="2"></v-col>
        <v-col cols="12" sm="8" md="8">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
            </v-col>
          </v-row>
          <v-card class="cardAddAdmin">
            <v-form ref="addNewAdmin">
              <v-row>
                <v-col class="colImageProfile">
                  <div class="divImageEditProfile">
                    <v-avatar size="120">
                      <v-img :src="imageUrl ? imageUrl : defaultImageAdmin" alt="Usuario"></v-img>
                    </v-avatar>
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <v-avatar v-on="on" size="34" style="left: -40px; bottom: -44px;">
                          <v-img src="/ic_edit.svg" alt="edit" @click="pickImgPFile()"></v-img>
                        </v-avatar>
                      </template>
                      <span class="sourceSansProregular txtTooltip">Cargar foto</span>
                    </v-tooltip>
                    <input type="file" style="display: none" id="imageProfileUser" ref="imgProfile" accept="image/jpg,image/jpeg,image/png" @change="onImgPFilePicked">
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
                      solo flat dense
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
                      solo flat dense
                      class="classicInput"
                      v-model="email"
                      :rules="emailRules"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Rol </label>
                    <v-select
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
                    ></v-select>
                  </div>
                </v-col>
                <v-col cols="6" class="colsFields">
                  <!-- <div>
                    <label>Número de teléfono</label>
                    <v-text-field
                      placeholder="Número de teléfono"
                      solo flat dense
                      class="classicInput"
                      v-model="phoneNumber"
                      :rules="phoneNumber ? phoneRules : withoutRules"
                      v-on:keyup="correctNumber()"
                    ></v-text-field>
                  </div> -->
                </v-col>
                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Contraseña </label>
                    <v-text-field
                      placeholder="Contraseña"
                      solo flat dense
                      class="classicInput"
                      v-model="password"
                      :rules="passwordRules"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" class="colsFields">
                  <div>
                    <label> Confirmar contraseña </label>
                    <v-text-field
                      placeholder="Confirmar contraseña"
                      solo flat dense
                      class="classicInput"
                      v-model="confirmPassword"
                      :rules="[rules.required, rules.min, passwordConfirmationRule]"
                      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      @click:append="showConfirmPassword = !showConfirmPassword"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <!-- <v-alert type="success" v-if="successAddAdmin">
                    <span v-html="messageResponse"></span>
                  </v-alert>
                  <v-alert type="error" v-if="errorAddAdmin">
                    <span v-html="messageResponse"></span>
                  </v-alert> -->
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-btn class="ma-2 classicButtonCancel" outlined @click="backToAdmin">Cancelar</v-btn>
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <v-btn class="ma-2 classicButtonCreate" outlined @click="addNewAdmin">Crear</v-btn>
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-progress-circular indeterminate
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
  layout: 'logged',
  components: {},
  data() {
    return {
      itemBreadcrumbs: [
        {
          text: 'Administradores',
          disabled: false,
          href: '/admin',
        },
        {
          text: 'Nuevo',
          disabled: true,
          href: '/admin/createAdmin',
        },
      ],
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      password: '',
      roleAdminId: 0,
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Contraseña requerida',
        min: v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
      },
      nameRules:[
        v => !!v || 'Nombre y apellido requerido.',
        v => v.length >= 8 || 'El nombre debe contener al menos 8 caracteres.',
        v => v.length < 40 || 'El nombre debe contener máximo 40 caracteres.',
      ],
      emailRules:[
        v => !!v || 'Correo electrónico requerido.',
        v => /.+@.+\..+/.test(v) || 'Ingrese un correo valido.',
        v => v.length >= 8 || 'El correo debe contener al menos 8 caracteres.',
        v => v.length < 40 || 'El correo debe contener máximo 40 caracteres.',
      ],
      phoneRules: [
        v => /^(?=.*\d)[\d ]+$/.test(v) || 'Ingrese un valor númerico.',
        v => v.length >= 10 || 'El teléfono debe tener mínimo 10 dígitos.',
        v => v.length < 16 || 'El teléfono debe tener máximo 15 dígitos.',
      ],
      roleRules:[
        v => !!v || 'Rol requerido.',
      ],
      withoutRules:[],
      passwordRules: [
        v => !!v || 'Contraseña requerida.',
        v => (/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{6,}$/).test(v) || 'Mínimo seis caracteres, al menos una letra mayúscula, una letra minúscula y un número.'
      ],
      showPassword: false,
      showConfirmPassword: false,
      defaultImageAdmin: '/ic_profile.png',
      temporaryImageName: '',
      // successAddAdmin: false,
      // errorAddAdmin: false,
      // messageResponse: '',
      showProgressCallApi: false,
      imageName:'',
      imageUrl:'',
      imageFile: '',
      roles: [],
    }
  },
  mounted() {
    if(parseInt(localStorage.getItem("currentRole")) !== 1){
      this.$router.push({ path: "/dashboard", force: true })
    }
    this.getAllRolesAdmin();
  },
  methods: {
    correctNumber(){
      this.phoneNumber = this.phoneNumber.split(" ").join("");
    },
    setNewPosition(){
      this.roles.forEach(element => {
        this.roleAdminId === element.id ? this.position = element.name : '';
      });
    },
    async getAllRolesAdmin(){
      await this.$store.dispatch('boAdmin/getAllRolesAdmin', localStorage.getItem("acstkn"))
      .then((response) => {
        if (response.success && response.code === 100) {
          this.roles = response.body;
        }
      })
      .catch((error) => {});
    },
    async addNewAdmin(){
      this.showProgressCallApi = true;
      // this.errorAddAdmin = false;
      // this.successAddAdmin = false;
      if (!this.$refs.addNewAdmin.validate()){
        this.showProgressCallApi = false;
        return;
      }
      // if (this.imageFile.length === 0) {
      //   this.messageResponse = 'Debe adjuntar una imagen de perfil';
      //   this.errorAddAdmin = true;
      //   this.showProgressCallApi = false;
      //   return;
      // }
      // this.position =
      let sha1 = require('sha1');
      await this.$store.dispatch('boAdmin/createAdmin',{
        acstkn: localStorage.getItem("acstkn"),
        fullName: this.fullName,
        password: sha1(this.password),
        email: this.email,
        position: this.position,
        avatar: this.imageFile,
        phoneNumber: this.phoneNumber,
        roleAdminId: this.roleAdminId,
        logBoAdminId: localStorage.getItem("boAdminId")
      }).then((response) => {
        this.showProgressCallApi = false;
        if (response.body.code === 100) {
          this.defaultImageAdmin = response.body.profileImage;
          // this.messageResponse = "Administrador creado correctamente.";
          this.watchSuccess("Administrador creado correctamente.");
          // this.successAddAdmin = true;
          // setTimeout(() => {
              this.$router.push('/admin');
          // }, 1500);
        }
        else {
          // this.messageResponse = response.message;
          this.watchError(response.message);
          // this.errorAddAdmin = true;
        }
      })
      .catch((error) => {
        this.showProgressCallApi = false;
        if(error.response.status===400){
          // this.messageResponse = error.response.data.message;
          this.watchError(error.response.data.message);
        }else{
          // this.messageResponse = 'Ha ocurrido un error';
          this.watchError('Ha ocurrido un error');
        }
        // this.errorAddAdmin = true;
      });
    },
    pickImgPFile: function() {
      this.imageFile = '';
      this.imageName = '';
      this.imageUrl = '';
      // this.messageImageError ='';
      document.getElementById("imageProfileUser").value = "";
      this.$refs.imgProfile.click()
    },
    onImgPFilePicked: function(e) {
      var self = this;
      var eFiles = e.target;
      var fileInput = document.getElementById("imageProfileUser");
      var filelength = fileInput.files.length;

      if (fileInput.files[0] !== undefined) {
        this.imageName = fileInput.files[0].name

        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;

          image.onload = function () {
            var height = this.height;
            var width = this.width;

            if (height > 500 || width > 500) {
              self.watchError("La imagen supera las dimensiones (500 x 500), por favor carga otra.");
              self.imageName = '';
              self.imageFile = '';
              self.imageUrl = '';
            }else{
              self.imageUrl = reader.result
              self.imageFile = fileInput.files[0] // this is an image file that can be sent to server...
              if (self.imageFile.size > 1000000) {
                self.watchError("La imagen supera el tamaño (1Mb).");
                self.imageName = '';
                self.imageFile = '';
                self.imageUrl = '';
              }
            }
          }
        }
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    backToAdmin(){
      this.$router.push('/admin');
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
  computed: {
    passwordConfirmationRule(){
      return () => ( this.password === this.confirmPassword ) || 'Las contraseñas no coinciden.'
    },
  }
}
</script>
