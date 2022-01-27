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
              <h1 class="txtTitleLogin">Verificar código</h1>
              <p class="messageEnterData pa-6 text-center">
                Hemos enviado un código de verificación a su correo, por favor
                escribe acontinuación.
              </p>
              <v-form ref="formLogin " class="">
                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field
                      v-model="loginForm.c1"
                      height="80"
                      type="number"
                      style="font-size: 2.5rem"
                      solo
                      flat
                      :maxlength="1"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      dense
                      background-color="#F8F8F8"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field
                      v-model="loginForm.c2"
                      height="80"
                      type="number"
                      style="font-size: 2.5rem"
                      solo
                      flat
                      dense
                      :maxlength="1"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      background-color="#F8F8F8"
                      :rules="[rules.required, rules.min_value]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field
                      v-model="loginForm.c3"
                      height="80"
                      type="number"
                      style="font-size: 2.5rem"
                      solo
                      flat
                      dense
                      :maxlength="1"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      background-color="#F8F8F8"
                      :rules="[rules.required, rules.min_value]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field
                      v-model="loginForm.c4"
                      height="80"
                      type="number"
                      style="font-size: 2.5rem"
                      solo
                      flat
                      dense
                      :maxlength="1"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      background-color="#F8F8F8"
                      :rules="[rules.required, rules.min_value]"
                    ></v-text-field>
                  </v-col>
                  <div class="divBtnsLogin">
                    <v-progress-circular
                      indeterminate
                      color="#005EB8"
                      v-if="showCircularProgress"
                    ></v-progress-circular>
                  </div>
                  <div style="margin: auto" class="d-flex justify-space-around">
                    <v-btn
                      v-if="!showCircularProgress"
                      x-large
                      style="min-width: 300px"
                      class="buttonStartSession"
                      color="#005EB8"
                      dark
                      @click="login"
                    >
                      Verificar
                    </v-btn>
                  </div>
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
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        code: "",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      this.loginForm.acstkn = localStorage.getItem("acstkn");

      const validate = [];

      validate.push(
        this.loginForm.c1,
        this.loginForm.c2,
        this.loginForm.c3,
        this.loginForm.c4
      );

      this.loginForm.code = validate.join("");
      localStorage.setItem("code", this.loginForm.code);
      this.showCircularProgress = true;
      this.$store
        .dispatch("checkCode", this.loginForm)
        .then((response) => {
          if (response.data.code == 100) {
            console.log("ingreso", response.data);
            this.showCircularProgress = false;
            this.watchSuccess(response.data.message);
            this.$router.push("/changePassword");
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
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input {
  text-align: center;
}
</style>