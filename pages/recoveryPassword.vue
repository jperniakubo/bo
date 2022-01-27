<template>
  <v-layout column justify-center align-center>
    <v-card class="loginCard" width="900">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <!-- <v-img src="/ic_login.svg" contain></v-img><v-img src="/ic_bg_logo.png" contain></v-img> -->
            <v-img src="/ic_bg_logo.png" class="imgLogoLogin"></v-img>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <div class="containerStartSession">
              <h1 class="txtTitleLogin">Recuperar contraseña</h1>
              <p class="messageEnterData pa-6 text-center">
                Por favor escriba su correo electrónico, le enviaremos un código
                de verificación.
              </p>
              <v-form ref="formLogin " class="mt-6">
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
                        @click="login"
                      >
                        Enviar Código
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="1" md="1"></v-col>
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
        required: (value) => !!value || "Campo requerido ",
        min: (v) =>
          v.length >= 6 || "La clave debe tener al menos 6 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || "Debe ingresar un correo válido",
      },
      showCircularProgress: false,
      // errorLogin: false,
      descriptionLoginError: "",
      loginForm: {
        acstkn: "",
        email: "",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      this.loginForm.acstkn = localStorage.getItem("acstkn");
      this.showCircularProgress = true;
      this.$store
        .dispatch("recoveryPassword", this.loginForm)
        .then((response) => {
          if (response.data.code == 100) {
            console.log("ingreso", response.data);
            this.showCircularProgress = false;
            this.watchSuccess(response.data.message);
            this.$router.push("/codeVerification");
          } else {
            this.showCircularProgress = false;
            // this.errorLogin = true;
            this.descriptionLoginError = response.data.message;
            this.watchError();
          }
        })
        .catch((error) => {
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
        rtl: false,
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
        rtl: false,
      });
    },
  },
};
</script>
