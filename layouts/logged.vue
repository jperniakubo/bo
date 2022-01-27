<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      permanent
      fixed
      app
      width="280"
      class="leftMenuPrincipal"
    >
      <div class="profilePictureUser text-center mt-4">
        <v-avatar class="avatarAdminImage" size="82">
          <v-img
            :src="
              imageAvatarAdmin != '' ? imageAvatarAdmin : '/defaultUser.png'
            "
            class="imgToProfile"
            @click="goToProfile()"
          ></v-img>
        </v-avatar>
        <p v-show="nameAdmin != ''" class="univers55Bold">
          Hola,
          <span class="txtNameToProfile" @click="goToProfile()">{{
            nameAdmin
          }}</span>
        </p>
      </div>
      <v-list>
        <v-list-item class="itemsMenu" to="/dashboard">
          <v-list-item-action>
            <v-img src="/ic_m_dashboard.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Dashboard</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="itemsMenu" to="/admin" v-if="currentRole === 1">
          <v-list-item-action>
            <v-img src="/ic_adminuserbo.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Admin OneKey</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="itemsMenu" to="/users" v-if="currentRole === 1">
          <v-list-item-action>
            <v-img src="/ic_userbo.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Usuarios KPMG</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="itemsMenu" to="/cities">
          <v-list-item-action>
            <v-img src="/ic_m_space.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Ciudades y espacios</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="itemsMenu" to="/reservations">
          <v-list-item-action>
            <v-img src="/ic_m_reservation.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Reservas</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="itemsMenu" to="/help">
          <v-list-item-action>
            <v-img src="/ic_m_helpcenter.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Centro de ayuda</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          class="itemsMenu itemLogout"
          v-on:click="dialogLogout = !dialogLogout"
        >
          <v-list-item-action>
            <v-img src="/ic_m_logout.svg"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="sfProDisplayRegular"
              >Cerrar sesión</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <div style="float:left !important;">
        <!-- <v-img src="/ic_logo.svg" contain class="imgLogoLayout"></v-img> -->
        <v-img src="/icLogoHeader.png" contain class="imgLogoLayout"></v-img>
      </div>
      <v-spacer />
      <v-spacer />
      <!-- <v-avatar size="60" class="avatarNotifications">
        <v-img src="/ic_notifications.svg" class="imgBtnNotifications"></v-img>
      </v-avatar> -->
      <v-menu
        v-model="menuNotification"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-avatar size="60" v-on="on" class="avatarNotifications">
            <v-img
              src="/ic_notifications.svg"
              class="imgBtnNotifications"
            ></v-img>
          </v-avatar>
        </template>
        <v-card min-width="300" max-width="320">
          <v-list>
            <v-list-item>
              <v-list-item-icon></v-list-item-icon>
              <v-list-item-content>
                <p class="txtTitleNotifications">Notificaciones</p>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-img
              src="/reservation/ic_dotted_line.svg"
              width="100%"
              class="my-5"
              alt=""
              style="margin-left: 30px !important;"
            ></v-img> -->
            <v-divider inset></v-divider>
            <div class="divNotificationsScrollable">
              <v-list-item
                v-on:click="menuNotification = false"
                v-for="itemNotification in itemsNotifications"
                :key="itemNotification.notifReservationId"
                :to="'/reservations/' + itemNotification.reservationId"
                link
                router
              >
                <v-list-item-icon>
                  <v-avatar
                    style="margin-left: 38% !important;"
                    :color="
                      itemNotification.type === 'cancel' ? '#26C6DB' : '#1F88E5'
                    "
                    size="15"
                  >
                    <span class="white--text headline"></span>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    itemNotification.message
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    itemNotification.reservation.dateReservation
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{
                      itemNotification.office.buildingName +
                        " - " +
                        itemNotification.office.floorName
                    }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{ itemNotification.office.officeName }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <client-only>
                <infinite-loading
                  spinner="spiral"
                  @infinite="infiniteScroll"
                  ref="infiniteLoading"
                ></infinite-loading>
              </client-only>
            </div>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main class="contentViewsLogged">
      <!-- <v-container> -->
      <nuxt />
      <!-- </v-container> -->
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- popup logout -->
    <v-dialog v-model="dialogLogout" content-class="dialogLogout" persistent>
      <v-card class="cardContentGeneralPopup">
        <v-row class="rowContentGeneralPopup">
          <v-col cols="12" class="colImgPopupLogout">
            <v-row class="rowImageTopPopup">
              <img class="imgPopupLogout" src="/ic_logout.svg" />
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-container class="contentGeneralPopup">
              <p class="textPopup txtOnlyLabelPopup">
                ¿Estás seguro de cerrar sesión?
              </p>
            </v-container>
            <v-row class="justify-center">
              <!-- cols="6" -->
              <v-col style="max-width: fit-content !important;">
                <v-btn
                  class="popupButtons btnCancel"
                  dark
                  @click="dialogLogout = !dialogLogout"
                >
                  Volver
                </v-btn>
              </v-col>
              <!-- cols="6" -->
              <v-col style="max-width: fit-content !important;">
                <v-btn class="popupButtons btnAccept" dark @click="toLogout()">
                  Cerrar
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- popup change password alert -->
    <v-dialog
      v-model="dialogChangePasswordAlert"
      content-class="dialogLogout"
      persistent
    >
      <v-card class="cardContentGeneralPopup">
        <v-row class="rowContentGeneralPopup">
          <v-col cols="12">
            <v-container class="contentGeneralPopup">
              <p class="textPopup title2Popup">AVISO</p>
              <p class="textPopup txtOnlyLabelPopup">
                {{ messageChangePasswordAlert }}
              </p>
            </v-container>
            <v-row style="justify-content: center !important;">
              <v-col style="max-width: fit-content !important;">
                <v-btn
                  class="popupButtons btnAccept"
                  dark
                  @click="goToProfile()"
                >
                  Actualizar
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      isEditing: false,
      messageChangePasswordAlert: "",
      menuNotification: false,
      dialogChangePasswordAlert: false,
      dialogLogout: false,
      currentRole: 0,
      imageAvatarAdmin: "",
      nameAdmin: "",
      clipped: true,
      drawer: true,
      right: true,
      rightDrawer: false,
      title: "OneKey",
      itemsNotifications: [],
      formListNotificationReservation: {
        acstkn: "",
        limit: 10,
        offset: 0,
        page: 1
      }
    };
  },

  created() {
    this.$store
      .dispatch("generateAcsTkn")
      .then(res => {
        localStorage.setItem("acstkn", res.body.accessToken);
        this.currentRole = parseInt(localStorage.getItem("currentRole"));
      })
      .catch(err => {});
  },

  mounted() {
    window.addEventListener("beforeunload", function(e) {
      e.preventDefault();
      e.returnValue = "";
      this.$router.push({ path: "/logout", force: true });
    });

    if (!localStorage.getItem("boAdminId")) {
      this.$router.push({ path: "/", force: true });
    }

    this.getAdminData();
    this.imageAvatarAdmin = localStorage.getItem("profileImage");
    this.nameAdmin = localStorage.getItem("fullName");
    if (localStorage.getItem("exchangeDate") === "true") {
      this.messageChangePasswordAlert =
        "Han pasado más de 60 días, actualiza tu contraseña.";
      this.dialogChangePasswordAlert = false;
    }
    if (localStorage.getItem("firstLogin") === "Y") {
      this.messageChangePasswordAlert =
        "Iniciaste sesión con una cuenta nueva, por favor cambia tu contraseña.";
      this.dialogChangePasswordAlert = true;
    }
    this.listNotificationReservation();
  },
  methods: {
    async listNotificationReservation() {
      this.formListNotificationReservation.acstkn = localStorage.getItem(
        "acstkn"
      );
      this.formListNotificationReservation.offset =
        (this.formListNotificationReservation.page - 1) *
        this.formListNotificationReservation.limit;
      await this.$store
        .dispatch(
          "notifications/listNotificationReservation",
          this.formListNotificationReservation
        )
        .then(response => {
          if (response.success && response.code === 100) {
            this.itemsNotifications = response.body;
          }
        })
        .catch(error => {});
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.formListNotificationReservation.page++;
        this.formListNotificationReservation.offset =
          (this.formListNotificationReservation.page - 1) *
          this.formListNotificationReservation.limit;
        this.$store
          .dispatch(
            "notifications/listNotificationReservation",
            this.formListNotificationReservation
          )
          .then(response => {
            if (response.success && response.code === 100) {
              if (response.body.length >= 1) {
                response.body.forEach(item =>
                  this.itemsNotifications.push(item)
                );
                $state.loaded();
              } else {
                $state.complete();
              }
            }
          })
          .catch(error => {});
      }, 500);
    },
    cancelUpdatePassword() {
      this.dialogChangePasswordAlert = false;
      localStorage.setItem("exchangeDate", this.dialogChangePasswordAlert);
      localStorage.setItem("firstLogin", "N");
    },
    toLogout() {
      this.dialogLogout = false;
      this.$router.push({ path: "/logout", force: true });
    },
    goToProfile() {
      this.dialogChangePasswordAlert = false;
      localStorage.setItem("firstLogin", "N");
      localStorage.setItem("exchangeDate", this.dialogChangePasswordAlert);
      this.$router.push({ path: "/profile", force: true });
    },
    async getAdminData() {
      await this.$store
        .dispatch("boAdmin/getAdminInfoById", {
          id: parseInt(localStorage.getItem("boAdminId")),
          acstkn: localStorage.getItem("acstkn")
        })
        .then(response => {
          if (response.success && response.code === 100) {
            if (response.body.profileImage) {
              localStorage.setItem("profileImage", response.body.profileImage);
            } else {
              localStorage.setItem("profileImage", "");
            }
            localStorage.setItem("fullName", response.body.fullName);
            localStorage.setItem("boAdminId", response.body.id);
            localStorage.setItem("currentRole", response.body.roleAdminId);
          }
        })
        .catch(error => {});
    }
  }
};
</script>
