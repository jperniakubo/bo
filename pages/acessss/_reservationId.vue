<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="11" md="11">
          <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
        </v-col>
        <v-col cols="12" sm="11" md="11" class="mx-auto">
          <v-row class="text-center">
            <v-col cols="" sm="4" md="4">
              <v-card height="100%">
                <v-card-text class="black--text">
                  <v-avatar
                    width="100px"
                    height="100px"
                    class="mb-4"
                    style="
                      box-shadow: 2px 2px 8px 0.1px gray;
                      border: 2px solid white;
                    "
                  >
                    <img :src="reservation.users.profileImage" />
                  </v-avatar>
                  <h2>{{ reservation.users.fullName }}</h2>
                  <h2 class="text-body-1 primary--text">{{ reservation.users.position }}</h2>
                  <p class="text-body-1">{{ reservation.users.email }}</p>

                  <v-img
                    src="/reservation/ic_dotted_line.svg"
                    width="90%"
                    class="mx-auto my-5"
                    alt=""
                  ></v-img>

                  <v-card
                    outlined
                    elevation="1"
                    class="mx-auto"
                    max-width="400"
                  >
                    <v-img
                      class="white--text align-end"
                      style="border-radius: 5px"
                      height="90px"
                      width="100%"
                      :src="reservation.office.officeImages[0].image ? reservation.office.officeImages[0].image : '/reservation/img_banner.jpg'"
                    >
                    <!-- src="/reservation/img_banner.jpg" -->
                    </v-img>

                    <v-card-text class="text--primary py-0 px-2">
                      <v-row justify="space-between">
                        <v-col
                          cols="12"
                          sm="2"
                          md="2"
                          class="pr-0 d-flex align-center"
                        >
                          <v-img
                            class="white--text"
                            width="100%"
                            src="/reservation/ic_calendar.png"
                          >
                            ¡
                          </v-img>
                        </v-col>
                        <v-col cols="12" sm="10" md="10" class="text-left">
                          <h2
                            class="text-body-1 primary--text ma-0 font-weight-medium"
                          >
                            {{ reservation.office.name }}
                          </h2>
                          <p class="ma-0 text-body-1 font-weight-medium">
                            {{reservation.office.floorBuilding.floor}}
                          </p>
                          <p class="text-body-2 ma-0">{{reservation.office.building.name}}</p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-card
                    outlined
                    elevation="1"
                    class="mt-8 mx-auto"
                    max-width="400"
                  >
                    <v-card-title class="pb-0">
                      <h4 class="primary--text font-weight-regular">
                        {{ reservation.date }}
                      </h4>

                      <h4 class="ml-auto primary--text font-weight-regular">
                        {{reservation.office.city.name}}
                      </h4>
                    </v-card-title>
                    <v-card-text class="text-left black--text pt-0">
                      <p class="text-body-1 ma-0">{{reservation.office.name}}</p>
                      <p class="text-body-1 ma-0">Reservado por: {{reservation.users.fullName}} </p>
                      <p class="text-body-1 ma-0">
                        Número Personas en sala: {{reservation.office.maxCapacity}}
                      </p>

                      <v-img
                        src="/reservation/ic_dotted_line2.svg"
                        width="90%"
                        class="mx-auto mt-5"
                        alt=""
                      ></v-img>
                      <p
                        class="float-left text-h6 ma-0 grey--text font-weight-regular"
                      >
                        {{reservation.startTime.substr(0,5)}}
                      </p>
                      <p
                        class="text-right text-h6 ma-0 grey--text font-weight-regular"
                      >
                        {{reservation.endTime.substr(0,5)}}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-col>
            <checkin :options="reservation"></checkin>
            <checkout :options="reservation"></checkout>
          </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
// import * as VueGoogleMaps from "vue2-google-maps";

import checkout from "../../components/reservation/checkout"
import checkin from "../../components/reservation/checkin"
import moment from 'moment';

export default {
  layout: "logged",
  components: {
    checkout,
    checkin
  },
  data() {
    return {
      itemBreadcrumbs: [
        {
          text: 'Usuarios KPMG',
          disabled: false,
          href: '/users',
        },
        {
          text: 'Usuario',
          disabled: false,
          href: '/users/userInfo',
        },
        {
          text: 'Reserva',
          disabled: true,
          href: '/users/userInfo',
        },
      ],
    };
  },

  async asyncData({ store, params }) {
    var accessTkn = '';
    await store.dispatch("generateAcsTkn")
    .then(res => {
      accessTkn = res.body.accessToken
    })
    .catch(err => {
    });

    moment.locale('es')
    const response = await store.dispatch(
      "reservations/getOneReservationOffice",{
        acstkn: accessTkn,
        reservationId: params.reservationId
      }
    );
    if (response.success) {

          let timeStart = response.body.date+ 'T' +response.body.startTime+':00-05:00'
          let timeEnd = response.body.date+ 'T' +response.body.endTime+':00-05:00'

          response.body.date = moment(response.body.date).format('MMMM D, YYYY').toUpperCase()
          response.body.startTime = moment(timeStart).format('hh:mm a')
          response.body.endTime = moment(timeEnd).format('hh:mm a')
          console.log(response.body)
      return {
        reservation: response.body,
        reservationId: params.reservationId
      };
    }
  },
  mounted() {
    if(parseInt(localStorage.getItem("currentRole")) !== 1){
      this.$router.push({ path: "/dashboard", force: true })
    }
  },
  methods: {},
  computed: {},
};
</script>
