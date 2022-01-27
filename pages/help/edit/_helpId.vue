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
          <v-card class="px-10 pt-8 pb-16">
            <v-card-title>
              <v-row class="pl-4 pr-4">
                <v-col cols="12" sm="6" md="6">
                  <label for="" class="font-weight-regular">Título</label>
                  <v-text-field dense solo v-model="inputName" class="classicInput"
                  :rules="[rules.required, rules.min, rules.maxQuestion]"
                  label="Nombre pregunta"></v-text-field>
                  <label for="" class="font-weight-regular">Respuesta</label>
                  <v-textarea
                    class="classicInput"
                    solo
                    name="input-7-4"
                    rows="10"
                    label="Respuesta"
                    :rules="[rules.required, rules.min, rules.maxAnswer]"
                    v-model="inputDescription"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="4" md="4"> </v-col>
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
            @click="backToHelp()"
            >Cancelar</v-btn
          >
          <v-btn
            style="background-color: white !important; border-radius: 8px"
            class="text-capitalize px-14 ml-10"
            elevation="3"
            outlined
            @click="updateHelpCenter"
            color="#0691DA"
            >Editar</v-btn
          >
        </v-col>
      </v-row>

      <v-snackbar
      color="red"
      v-model="snackbar"
    >
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

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
          text: 'Centro de ayuda',
          disabled: false,
          href: '/help',
        },
        {
          text: 'Editar pregunta',
          disabled: true,
          href: '/help/edit',
        },
      ],
      helpCenterId: '',

      inputDescription: 'Esta es la descripción',
      inputName: 'esta si es la pregunta',

      snackbar: false,
      snackbarMessage : "",

      rules: {
        required: value => !!value || 'Campo requerido ',
        min: v => v.length >= 6 || 'El campo debe tener al menos 6 caracteres',
        maxQuestion: v => v.length <= 80 || 'El campo debe tener máximo 80 caracteres',
        maxAnswer: v => v.length <= 250 || 'El campo debe tener máximo 250 caracteres',
        email: v => /.+@.+\..+/.test(v) || 'Debe ingresar un correo válido'
      },
    };
  },
  mounted() {
    this.helpCenterId = this.$route.params.helpId
    this.getHelpCenter()
  },
  methods: {
    backToHelp(){
      this.$router.push('/help');
    },
    async updateHelpCenter() {

      if(this.inputDescription != '' && this.inputName != ''){

      const response = await this.$store.dispatch(
        "helpCenter/updateHelpCenter",{
          question: this.inputName,
          answer: this.inputDescription,
          id: this.helpCenterId,
          acstkn: localStorage.getItem("acstkn")
        }
      );
      if (response.success) {
        this.$router.replace({
          path: "/help"
        });
      }
      }else{
        this.snackbar = true
        this.snackbarMessage = "Debes llenar todos los campos"
      }
    },
    async getHelpCenter() {

      if(this.inputDescription != '' && this.inputName != ''){

      const response = await this.$store.dispatch(
        "helpCenter/helpCenterOne",{
          helpCenterId: this.helpCenterId,
          acstkn: localStorage.getItem("acstkn")
        }
      );
      if (response.success) {
        this.inputName = response.body.question
        this.inputDescription = response.body.answer
      }
      }else{
        this.snackbar = true
        this.snackbarMessage = "Debes llenar todos los campos"
      }
    },

  },
  computed: {},
};
</script>
