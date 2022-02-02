<template>
  <v-layout column justify-center align-center>
    <v-card class="loginCard">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <!-- <v-img src="/ic_login.svg" contain></v-img><v-img src="/ic_bg_logo.png" contain></v-img> -->
            <v-img src="/ic_bg_logo.png" class="imgLogoLogin"></v-img>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <div class="containerStartSession">
              <h1 class="txtTitleLogin">¡Bienvenido!</h1>
              <p class="messageEnterData">Ingresa tus datos para continuar</p>
              <v-form ref="formLogin" class="mt-6">
                <v-row>
                  <v-col cols="12" sm="1" md="1"></v-col>
                  <v-col cols="12" sm="10" md="10">
                    <span class="labelForm">Correo electrónico</span>
                    <v-text-field
                      label="Solo"
                      placeholder="Correo electrónico"
                      v-model="loginForm.email"
                      solo
                      flat
                      dense
                      background-color="#F8F8F8"
                      prepend-inner-icon="email"
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>
                    <span class="labelForm">Contraseña</span>
                    <v-text-field
                      label="Solo"
                      placeholder="Contraseña"
                      v-model="loginForm.password"
                      solo
                      flat
                      dense
                      background-color="#F8F8F8"
                      prepend-inner-icon="lock"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      :rules="[rules.required, rules.min]"
                      v-on:keyup.enter="validateLogin()"
                    ></v-text-field>
                    <div style="text-align: center">
                      <v-checkbox
                        v-model="saveData"
                        label="Recordar usuario"
                        color="#045EB8"
                        hide-details
                        style="margin-bottom: 50px !important"
                      ></v-checkbox>
                    </div>

                    <div class="divBtnsLogin">
                      <v-progress-circular
                        indeterminate
                        color="#005EB8"
                        v-if="showCircularProgress"
                      ></v-progress-circular>
                      <v-btn
                        v-if="!showCircularProgress"
                        x-large
                        class="buttonStartSession"
                        color="#005EB8"
                        dark
                        @click="validateLogin"
                      >
                        Ingresar
                      </v-btn>
                      <div
                        style="margin: auto"
                        class="d-flex justify-space-around pt-6"
                      >
                        <a href="recoveryPassword">Recuperar contraseña</a>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" sm="1" md="1"> </v-col>
                </v-row>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  layout: "home",
  components: {
    // ..
  },
  data() {
    return {
      saveData: true,
      show1: false,
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Campo requerido ",
        min: v => v.length >= 6 || "La clave debe tener al menos 6 caracteres",
        email: v => /.+@.+\..+/.test(v) || "Debe ingresar un correo válido"
      },
      showCircularProgress: false,
      // errorLogin: false,
      descriptionLoginError: "",
      loginForm: {
        acstkn: "",
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    if (localStorage.getItem("boAdminId")) {
      this.$router.push({ path: "/dashboard", force: true });
    }
    if (localStorage.getItem("userSaved") && localStorage.getItem("pwdSaved")) {
      this.loginForm.email = localStorage.getItem("userSaved");
      this.loginForm.password = localStorage.getItem("pwdSaved");
    }
  },
  methods: {
    validateLogin() {
      if (this.$refs.formLogin.validate()) {
        this.login();
      }
    },
    login() {
      this.loginForm.acstkn = localStorage.getItem("acstkn");
      this.showCircularProgress = true;
      this.$store
        .dispatch("loginAdmin", this.loginForm)
        .then(response => {
          if (response.data.body.code == 200) {
            console.log("resposne ddddd", response.data.body);
            if (this.saveData) {
              localStorage.setItem("userSaved", this.loginForm.email);
              localStorage.setItem("pwdSaved", this.loginForm.password);
            } else {
              localStorage.setItem("userSaved", "");
              localStorage.setItem("pwdSaved", "");
            }
            // this.errorLogin = false;
            this.showCircularProgress = false;
            localStorage.setItem("boAdminId", response.data.body.id);
            localStorage.setItem("email", response.data.body.email);
            localStorage.setItem("fullName", response.data.body.fullName);
            localStorage.setItem("position", response.data.body.position);
            localStorage.setItem("phoneNumber", response.data.body.phoneNumber);
            localStorage.setItem(
              "profileImage",
              response.data.body.profileImage
            );
            localStorage.setItem("currentRole", response.data.body.roleAdminId);
            localStorage.setItem(
              "exchangeDate",
              response.data.body.exchangeDate
            );
            localStorage.setItem("firstLogin", response.data.body.firstLogin);
            this.$router.push("/dashboard");
          } else {
            this.showCircularProgress = false;
            // this.errorLogin = true;
            this.descriptionLoginError = response.data.message;
            this.watchError();
          }
        })
        .catch(error => {
          this.showCircularProgress = false;
          // this.errorLogin = true;
          this.descriptionLoginError =
            "Ha ocurrido un error, por favor inténtalo más tarde";
          this.watchError();
        });
    },
    watchError() {
      this.$toast.error(this.descriptionLoginError, {
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
  }
};
</script>

