<template>
  <v-col cols="12" sm="4" md="4">
    <v-card class="px-3 pt-0" height="100%" v-if="options.checkIn.length != 0">
      <v-card-text class="text-left">
        <h2 class="black--text text-h4 font-weight-medium">Check in</h2>
        <h2 class="black--text text-h6 font-weight-medium">Hora de inicio</h2>

        <p class="text-body-1 ma-0">{{ options.startTime.toUpperCase() }}</p>

        <v-img
          src="/reservation/ic_dotted_line.svg"
          width="100%"
          class="my-5"
          alt=""
        ></v-img>
        <h2 class="black--text text-h6 mb-5 font-weight-medium">
          Verificación
        </h2>

        <div>
          <v-row v-for="(items, index) of options.checkIn[0].OfficeItems" :key="index">
            <v-col cols="12" sm="2" md="2" class="pa-0">
              <img :src="items.systemItemIcons.svg" class="imgIconOfficeItem2 iconOnCard"></img>
            </v-col>
            <v-col cols="12" sm="8" md="8" class="py-0 my-0">
              <p style="margin-bottom: 0px !important;margin-top: 10px !important;">{{items.name}}</p>
            </v-col>
            <v-col cols="12" sm="2" md="2" class="pa-0">
              <v-icon class="pa-0 ma-0" color="#005EB8" v-if="items.ItemsCheckIn.checked == 1"
              style="margin-top: 10px !important;">
                mdi-square-rounded
              </v-icon>
              <v-icon class="pa-0 ma-0" color="#005EB8" v-else
              style="margin-top: 10px !important;">
                mdi-square-rounded-outline
              </v-icon>
            </v-col>
          </v-row>
        </div>

        <v-img
          src="/reservation/ic_dotted_line.svg"
          width="100%"
          class="my-3"
          alt=""
        ></v-img>

        <h2 class="black--text text-h6 font-weight-medium">Comentarios</h2>
        <p class="text-body-1 ma-0">
          {{ options.checkIn[0].comment }}
        </p>

        <h2 class="black--text text-h6 mt-5 font-weight-medium">
          Galeria de imágenes
        </h2>

        <v-row style="height:250px !important; overflow: auto;">

          <v-col cols="12" sm="6" md="6"   v-for="(image, index) of options.checkIn[0].imagesCheckIn" :key="index">
            <div
              class="img-checks-reservation"
              @click="openModal(image.image.replace('https://www.kpmgexternalservices.com.co:5001','https://boapionekey.co.kworld.kpmg.com:5001'))"
              :style="
                'background-image:url(' +
                image.image.replace('https://www.kpmgexternalservices.com.co:5001','https://boapionekey.co.kworld.kpmg.com:5001') +
                ')'
              "
            ></div>
          </v-col>

        </v-row>

        <v-dialog v-model="dialog" max-width="500px">
        <br><br>
        <v-card height="90%" width="90%" class="py-5 mx-auto">
            <v-btn class="btn-abs" @click="dialog = false" fab dark small color="red">
              <v-icon dark> mdi-close </v-icon>
            </v-btn>
          <v-card-text>
            <v-img width="100%" class="mx-auto" :src="dialogImage"></v-img>
          </v-card-text>
        </v-card>
      </v-dialog>
      </v-card-text>
    </v-card>

    <v-card class="px-3 pt-0 d-flex align-center" height="100%" v-else>
      <v-card-text>
        <v-img
          width="50%"
          class="mx-auto my-5"
          src="/reservation/ic_clock2x.png"
        ></v-img>
        <h2 class="grey--text text-h5 sfProDisplaySemiBold">Esto está vacío</h2>
        <p class="grey--text sfProDisplayRegular txtEmptyCheckInCheckOut">
          En este momento no sea realizado check in.
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      dialogImage: "",
    };
  },
  mounted() {
    // console.log(this.options.id);
  },
  methods: {
    openModal(image){
      this.dialogImage = image
      this.dialog = true

    }
  },
};
</script>

<style lang="scss">
  .v-dialog{
  box-shadow: none !important;
}
</style>
