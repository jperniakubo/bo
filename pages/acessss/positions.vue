<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <v-row>
        <v-col class="py-0" cols="11">
          <v-row>
            <v-col class="py-0" cols="12" sm="12" md="12">
              <v-breadcrumbs class="float-right" large :items="itemBreadcrumbs"></v-breadcrumbs>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="3" md="3">
          <label id="topList">Buscar:</label>
          <v-text-field
            placeholder="Cargo"
            solo flat dense
            class="classicInput"
            append-icon="search"
            v-model="formListPositions.needle"
            @keyup="setFilter()"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6"></v-col>
        <v-col cols="12" sm="3" md="3">
          <v-btn class="classicButton btnCreate" dark @click="activePopup(0, 0)">
            <img src="/iconAdd.svg" class="imageCreateAdmin"/>
            Crear cargo
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="pl-4 pr-4">
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-data-table
              :headers="headers"
              :items="allPositions"
              :items-per-page="formListPositions.limit"
              class="dataTableStyle"
              hide-default-footer>
              <template v-slot:item.id="{ item }">
                <a v-html="item.id" class="txtGeneralSlotTable"></a>
              </template>
              <template v-slot:item.name="{ item }">
                <a v-html="item.name" class="txtGeneralSlotTable"></a>
              </template>
              <template v-slot:item.options="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <img class="imgAsBtnTableAction" src="/ic_edit.svg" @click="activePopup(1, item.id)">
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <div class="text-center pt-2 classicPagination">
              <v-pagination
              v-model="formListPositions.page"
              :length="paginationLength"
              :total-visible="visible"
              @input="changePage()"></v-pagination>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- popup create or edit city -->
      <v-dialog v-model="dialogCreatePosition" content-class="dialogCity" persistent>
        <v-card class="cardTransparentToButtons" :elevation="0">
          <v-row>
            <v-col cols="12"></v-col>
          </v-row>
        </v-card>
        <v-card class="cardContentCity">
          <v-row class="rowContentCreateEditCity">
            <v-col cols="6" class="colImgCreateEditCity">
              <v-row class="rowImageCreateEditCity">
                <img class="imgPopupCreateEditPosition" src="/ic_admin.svg">
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-spacer />
                <img class="imgClosePopupCreateEditCity" src="/ic_close.svg" @click="closePositionDialog()">
              </v-row>
              <v-container class="contentFormCreateEditCity">
                  <p v-show="createOrEdit===0" class="textPopup titlePopup">Crear Cargo</p>
                  <p v-show="createOrEdit===1" class="textPopup titlePopup">Actualizar Cargo</p>
                  <p class="textPopup txtLabelPopup">Nombre</p>
              </v-container>
              <v-row>
                <v-col cols="12" class="colInputCity">
                  <v-form ref="createPositionForm">
                    <v-text-field
                      v-show="createOrEdit===0"
                      placeholder="Nombre"
                      solo flat dense
                      class="classicInput"
                      :rules="nameRules"
                      v-model="formCreatePosition.name"
                    ></v-text-field>
                  </v-form>
                  <v-form ref="updatePositionForm">
                    <v-text-field
                      v-show="createOrEdit===1"
                      placeholder="Nombre"
                      solo flat dense
                      class="classicInput"
                      :rules="nameRules"
                      v-model="formUpdatePosition.name"
                    ></v-text-field>
                  </v-form>
                  <div style="text-align:center;">
                    <div class="customErrorMessage" v-if="createOrEditMessage" v-html="createOrEditMessage"></div>
                  </div>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <!-- <v-col cols="4"></v-col> -->
                <v-col cols="6" class="justify-center">
                  <v-btn v-show="createOrEdit===0" class="classicButton btnCreate2Popup" dark @click="toCreatePosition()">
                    Agregar
                  </v-btn>
                  <v-btn v-show="createOrEdit===1" class="classicButton btnCreate2Popup" dark @click="toUpdatePosition()">
                    Editar
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
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
          text: 'Usuarios KPMG',
          disabled: false,
          href: '/users',
        },
        {
          text: 'Cargos',
          disabled: true,
          href: '/users/positions',
        },
      ],
      headers: [
        {text: '#', sortable: false, value:'id'},
        {text: 'Cargo', sortable: false, value: 'name'},
        {text: 'Editar', sortable: false, value: 'options'}
      ],
      allPositions: [],
      visible:12,
      paginationLength: 1,
      totalRows:0,
      formListPositions:{
        acstkn:'',
        needle:'',
        limit:40,
        offset:0,
        page:1,
      },
      formCreatePosition:{
        acstkn:'',
        name:'',
        logBoAdminId: 0,
      },
      formUpdatePosition:{
        acstkn:'',
        positionId: 0,
        name:'',
        logBoAdminId: 0,
      },
      nameRules: [
        v => !!v || 'Nombre requerido.',
        v => /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(v) || 'Este campo solo acepta letras.',
        v => v.length >= 3 || 'El nombre debe contener al menos 3 caracteres.',
        v => v.length < 31 || 'El nombre debe contener máximo 30 caracteres.',
      ],
      dialogCreatePosition: false,
      createOrEditMessage:'',
      createOrEdit: 0, // 0 to create and 1 to edit
    }
  },
  mounted() {
    if(parseInt(localStorage.getItem("currentRole")) !== 1){
      this.$router.push({ path: "/dashboard", force: true })
    }
    var self = this
    self.formListPositions.acstkn = self.formCreatePosition.acstkn = self.formUpdatePosition.acstkn = localStorage.getItem("acstkn");
    self.formCreatePosition.logBoAdminId = self.formUpdatePosition.logBoAdminId = localStorage.getItem("boAdminId");

    this.getPositions();
  },
  methods: {
    activePopup(from, positionId){
      this.createOrEdit = from; // 0 to create and 1 to edit
      switch (from){
        case 0:
          this.dialogCreatePosition = true;
          break;
        case 1:
          this.formUpdatePosition.positionId = positionId;
          this.getPositionById();
          break;
      }
    },
    async getPositionById(){
      await this.$store.dispatch('position/getPositionById', this.formUpdatePosition)
        .then((response) => {
          console.log(response)
          if (response.success) {
            this.formUpdatePosition.name = response.body.name;
            this.dialogCreatePosition = true;
          }
        })
        .catch((error) => {});
    },
    async toCreatePosition(){
      if (this.$refs.createPositionForm.validate()) {
        await this.$store.dispatch('position/createPosition', this.formCreatePosition)
        .then((response) => {
          if (response.success && response.message !== 'Operación exitosa'){
            this.createOrEditMessage = response.message;
          } else if (response.success) {
            this.getPositions();
            this.dialogCreatePosition = false;
          }else{
            this.createOrEditMessage = 'Error, intentalo más tarde';
          }
        })
        .catch((error) => {
          this.createOrEditMessage = 'Error, intentalo más tarde';
        });
      }
    },
    async toUpdatePosition(){
      if (this.$refs.updatePositionForm.validate()) {
        await this.$store.dispatch('position/updatePosition', this.formUpdatePosition)
        .then((response) => {
          if (response.success) {
            this.getPositions();
            this.dialogCreatePosition = false;
          } else{
            this.createOrEditMessage = 'Error, intentalo más tarde';
          }
        })
        .catch((error) => {
          if(error.response.data.code===400){
            this.createOrEditMessage = error.response.data.message;
          }else{
            this.createOrEditMessage = 'Error, intentalo más tarde';
          }
        });
      }
    },
    closePositionDialog(){
      this.dialogCreatePosition = !this.dialogCreatePosition;
      this.createOrEditMessage = '';
    },
    async getPositions(){
      this.formListPositions.offset = (this.formListPositions.page-1) * this.formListPositions.limit;
      await this.$store.dispatch('position/getPositions', this.formListPositions)
      .then((response) => {
        if (response.success && response.code === 100) {
          this.totalRows = response.body.total;
          this.allPositions = response.body.positions;
          if (this.formListPositions.limit > 0 && this.totalRows > 0) {
              this.paginationLength = Math.ceil(this.totalRows / this.formListPositions.limit);
          }else{
            this.paginationLength = 1;
          }
        }
      })
      .catch((error) => {
      });
    },
    clearFilters(){
      this.formListPositions.needle = '';
      this.formListPositions.page = 1;
      this.setFilter();
    },
    setFilter(){
      this.formListPositions.page = 1;
      this.getPositions();
    },
    changePage(){
      this.getPositions();
      this.toSection();
    },
    toSection(){
      var element = document.getElementById('topList');
      element.scrollIntoView({ behavior: 'smooth' });
    },
  },
}
</script>
