(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{811:function(e,t,r){var content=r(812);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(16).default)("b1bed018",content,!0,{sourceMap:!1})},812:function(e,t,r){(t=r(15)(!1)).push([e.i,".theme--light.v-breadcrumbs .v-breadcrumbs__divider,.theme--light.v-breadcrumbs .v-breadcrumbs__item--disabled{color:rgba(0,0,0,.38)}.theme--dark.v-breadcrumbs .v-breadcrumbs__divider,.theme--dark.v-breadcrumbs .v-breadcrumbs__item--disabled{color:hsla(0,0%,100%,.5)}.v-breadcrumbs{align-items:center;display:flex;flex-wrap:wrap;flex:0 1 auto;list-style-type:none;margin:0;padding:18px 12px}.v-breadcrumbs li{align-items:center;display:inline-flex;font-size:14px}.v-breadcrumbs li .v-icon{font-size:16px}.v-breadcrumbs li:nth-child(2n){padding:0 12px}.v-breadcrumbs__item{align-items:center;display:inline-flex;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-breadcrumbs__item--disabled{pointer-events:none}.v-breadcrumbs--large li,.v-breadcrumbs--large li .v-icon{font-size:16px}",""]),e.exports=t},818:function(e,t,r){"use strict";r(17),r(12),r(9),r(6),r(14);var n=r(3),o=(r(811),r(61)),l=r(8);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=Object(l.a)(o.a).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(n.a)({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(e){var t=this.generateRouteLink(),r=t.tag,data=t.data;return e("li",[e(r,d(d({},data),{},{attrs:d(d({},data.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),m=r(2),v=Object(m.i)("v-breadcrumbs__divider","li"),h=r(23);function y(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}t.a=Object(l.a)(h.a).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(v,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var e=[],t=!!this.$scopedSlots.item,r=[],i=0;i<this.items.length;i++){var n=this.items[i];r.push(n.text),t?e.push(this.$scopedSlots.item({item:n})):e.push(this.$createElement(f,{key:r.join("."),props:n},[n.text])),i<this.items.length-1&&e.push(this.genDivider())}return e}},render:function(e){var t=this.$slots.default||this.genItems();return e("ul",{staticClass:"v-breadcrumbs",class:this.classes},t)}})},822:function(e,t,r){var content=r(823);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(16).default)("50788f08",content,!0,{sourceMap:!1})},823:function(e,t,r){(t=r(15)(!1)).push([e.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:inherit}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),e.exports=t},837:function(e,t,r){"use strict";r(17),r(12),r(9),r(6),r(14),r(83);var n=r(3),o=(r(822),r(829)),l=r(817),c=r(55),d=r(2);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=m(m({},o.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1});t.a=o.a.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(e,t,r){return r.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:o.a.options.props.menuProps.type,default:function(){return v}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return m(m({},o.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var e=this;return this.selectedItems.map((function(t){return e.getValue(t)}))},hasDisplayedItems:function(){var e=this;return this.hideSelected?this.filteredItems.some((function(t){return!e.hasItem(t)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var e=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(t){var r=Object(d.r)(t,e.itemText),text=null!=r?String(r):"";return e.filter(t,String(e.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(e){this.lazySearch=e,this.$emit("update:search-input",e)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var e=o.a.options.computed.$_menuProps.call(this);return e.contentClass="v-autocomplete__content ".concat(e.contentClass||"").trim(),m(m({},v),e)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var e=this;return this.multiple?null:this.selectedItems.find((function(i){return e.valueComparator(e.getValue(i),e.getValue(e.internalValue))}))},listData:function(){var data=o.a.options.computed.listData.call(this);return data.props=m(m({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(e){!e&&this.hasSlot&&(this.lazySearch=void 0)},items:function(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput:function(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(e,t){var r=this;e!==t&&(this.setMenuIndex(-1),this.$nextTick((function(){r.internalSearch&&(1===e.length||r.autoSelectFirst)&&(r.$refs.menu.getTiles(),r.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(e){this.searchIsDirty||(this.multiple&&e===d.x.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===d.x.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==d.x.backspace&&e!==d.x.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var e=this.selectedIndex,t=this.selectedItems[e];if(this.isInteractive&&!this.getDisabled(t)){var r=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===r){var n=e!==this.selectedItems.length-1?e:e-1;this.selectedItems[n]?this.selectItem(t):this.setValue(this.multiple?[]:void 0),this.selectedIndex=n}else this.selectedIndex=r}},clearableCallback:function(){this.internalSearch=void 0,o.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=l.a.options.methods.genInput.call(this);return input.data=Object(c.a)(input.data,{attrs:{"aria-activedescendant":Object(d.p)(this.$refs.menu,"activeTile.id"),autocomplete:Object(d.p)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=o.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?o.a.options.methods.genSelections.call(this):[]},onClick:function(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput:function(e){if(!(this.selectedIndex>-1)&&e.target){var t=e.target,r=t.value;t.value&&this.activateMenu(),this.internalSearch=r,this.badInput=t.validity&&t.validity.badInput}},onKeyDown:function(e){var t=e.keyCode;o.a.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown:function(e){},onTabDown:function(e){o.a.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown:function(e){e.preventDefault(),this.activateMenu()},selectItem:function(e){o.a.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems:function(){o.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var e=this;this.$nextTick((function(){e.multiple&&e.internalSearch&&e.isMenuActive||(e.internalSearch=!e.selectedItems.length||e.multiple||e.hasSlot?null:e.getText(e.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy:function(e){if(-1!==this.selectedIndex){var t=this.selectedItems[this.selectedIndex],r=this.getText(t);e.clipboardData.setData("text/plain",r),e.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",r),e.preventDefault()}}}})},961:function(e,t,r){"use strict";r.r(t);r(72);var n=r(19),o={layout:"logged",components:{},data:function(){return{itemBreadcrumbs:[{text:"Usuarios KPMG",disabled:!1,href:"/users"},{text:"Usuario",disabled:!0,href:"/users/userInfo"}],showBtnClearFilters:!1,citiesFilter:[],formCitiesFilter:{acstkn:"",needle:""},buildingsFilter:[],formBuildingsFilter:{acstkn:"",needle:"",cityId:0},officeTypeFilter:[],formOfficeTypeFilter:{acstkn:"",name:""},typePositionArray:[{name:"",id:4},{name:"Gestión de Horario",id:1},{name:"Extender Reservas",id:2},{name:"Gestión Horario y Reservas",id:3}],typePosition:4,headers:[{text:"ID reserva",sortable:!1,value:"id"},{text:"Ciudad",sortable:!1,value:"city"},{text:"Edificio",sortable:!1,value:"building"},{text:"Oficina",sortable:!1,value:"office"},{text:"Tipo oficina",sortable:!1,value:"officeType"},{text:"Fecha",sortable:!1,value:"date"},{text:"Hora",sortable:!1,value:"startTime"},{text:"Reservas",sortable:!1,value:"status"}],desserts:[],visible:12,paginationLength:1,totalRows:0,formGetProfileAndReservations:{acstkn:"",uid:"",cityId:0,buildingId:0,officeTypeId:0,status:"",limit:40,offset:0,page:1,columnOrder:"",sortBy:""},formGetUserInfoById:{acstkn:"",uid:""},userData:{document:"",email:"",fullName:"",linkedinProfile:"",phone:"",position:"",qrCode:"",uid:"",profileImage:""},countActive:0,countInactive:0,countUsed:0,currentUrl:"",selectordersBy:[{text:"Fecha",value:"ReservationOffice.date"},{text:"Ciudad",value:"office->city.name"},{text:"Edificio",value:"office->building.name"},{text:"Oficina",value:"office.name"},{text:"Tipo de oficina",value:"office->officeType.name"}],selectSorts:[{text:"Descendente",value:"DESC"},{text:"Ascendente",value:"ASC"}],orderBy:"ReservationOffice.date",sort:"DESC"}},mounted:function(){1!==parseInt(localStorage.getItem("currentRole"))&&this.$router.push({path:"/dashboard",force:!0}),this.currentUrl=window.location.href,this.currentUrl==localStorage.getItem("secondPageUrl")?(this.formGetProfileAndReservations.page=parseInt(localStorage.getItem("secondPageNumber")),""!==localStorage.getItem("filtercity")?this.formGetProfileAndReservations.cityId=parseInt(localStorage.getItem("filtercity")):this.formGetProfileAndReservations.cityId=0,""!==localStorage.getItem("filterbuilding")?this.formGetProfileAndReservations.buildingId=parseInt(localStorage.getItem("filterbuilding")):this.formGetProfileAndReservations.buildingId=0,""!==localStorage.getItem("filterOfficeType")?this.formGetProfileAndReservations.officeTypeId=parseInt(localStorage.getItem("filterOfficeType")):this.formGetProfileAndReservations.officeTypeId=0,""!==localStorage.getItem("filterOrderBy")?this.orderBy=localStorage.getItem("filterOrderBy"):this.orderBy="ReservationOffice.date",""!==localStorage.getItem("filterSort")?this.sort=localStorage.getItem("filterSort"):this.sort="DESC"):(localStorage.setItem("filtercity",this.formGetProfileAndReservations.cityId),localStorage.setItem("filterbuilding",this.formGetProfileAndReservations.buildingId),localStorage.setItem("filterOfficeType",this.formGetProfileAndReservations.officeTypeId),localStorage.setItem("filterOrderBy",this.orderBy),localStorage.setItem("filterSort",this.sort),localStorage.setItem("secondPageNumber",this.formGetProfileAndReservations.page),localStorage.setItem("secondPageUrl",window.location.href)),this.formGetProfileAndReservations.uid=this.formGetUserInfoById.uid=localStorage.getItem("uid"),this.formCitiesFilter.acstkn=this.formBuildingsFilter.acstkn=this.formOfficeTypeFilter.acstkn=this.formGetUserInfoById.acstkn=localStorage.getItem("acstkn"),this.getUserInfoById(),this.citiesToFilter(),this.buildingsToFilter(),this.officeTypesToFilter(),this.getProfileAndReservations(),this.verifyShowClearBtn()},methods:{updateTypePosition:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("eeeeee",e.typePosition),data={typePositionsId:e.typePosition,uid:e.userData.uid,acstkn:localStorage.getItem("acstkn")},t.next=4,e.$store.dispatch("user/updateTypePostion",data).then((function(e){console.log("ress",e),e.success}));case 4:case"end":return t.stop()}}),t)})))()},getUserInfoById:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("user/getUserInfoById",e.formGetUserInfoById).then((function(t){t.success&&100===t.code&&(console.log(t.body),e.userData.document=t.body.user.document,e.userData.email=t.body.user.email,e.userData.fullName=t.body.user.fullName,e.userData.linkedinProfile=t.body.user.linkedinProfile,e.userData.phone=t.body.user.phone,e.userData.position=t.body.user.position,e.userData.qrCode=t.body.user.qrCode,e.userData.uid=t.body.user.uid,e.userData.profileImage=t.body.user.profileImage,e.countActive=t.body.countActive,e.countInactive=t.body.countInactive,e.countUsed=t.body.countUsed,e.typePosition=t.body.user.typePositionsId)})).catch((function(e){}));case 2:case"end":return t.stop()}}),t)})))()},citiesToFilter:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("cities/listCities",e.formCitiesFilter).then((function(t){t.success&&(e.citiesFilter=t.body.cities)})).catch((function(e){}));case 2:case"end":return t.stop()}}),t)})))()},buildingsToFilter:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("building/listBuildings",e.formBuildingsFilter).then((function(t){t.success&&(e.buildingsFilter=t.body.buildings)})).catch((function(e){}));case 2:case"end":return t.stop()}}),t)})))()},officeTypesToFilter:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("officeType/officeTypeList",e.formOfficeTypeFilter).then((function(t){t.success&&(e.officeTypeFilter=t.body.officeTypes)})).catch((function(e){}));case 2:case"end":return t.stop()}}),t)})))()},getProfileAndReservations:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.formGetProfileAndReservations.acstkn=localStorage.getItem("acstkn"),e.formGetProfileAndReservations.offset=(e.formGetProfileAndReservations.page-1)*e.formGetProfileAndReservations.limit,e.formGetProfileAndReservations.columnOrder=e.orderBy,e.formGetProfileAndReservations.sortBy=e.sort,t.next=6,e.$store.dispatch("user/listUserReservations",e.formGetProfileAndReservations).then((function(t){t.success&&100===t.code&&(e.totalRows=t.body.totalRows,console.log(t.body.reservations),e.desserts=t.body.reservations,e.formGetProfileAndReservations.limit>0&&e.totalRows>0?e.paginationLength=Math.ceil(e.totalRows/e.formGetProfileAndReservations.limit):e.paginationLength=1)})).catch((function(e){}));case 6:case"end":return t.stop()}}),t)})))()},verifyShowClearBtn:function(){void 0!==this.formGetProfileAndReservations.cityId&&0!==this.formGetProfileAndReservations.cityId||void 0!==this.formGetProfileAndReservations.buildingId&&0!==this.formGetProfileAndReservations.buildingId||void 0!==this.formGetProfileAndReservations.officeTypeId&&0!==this.formGetProfileAndReservations.officeTypeId?this.showBtnClearFilters=!0:this.showBtnClearFilters=!1},clearFilters:function(){this.formGetProfileAndReservations.cityId=0,this.formGetProfileAndReservations.buildingId=0,this.formGetProfileAndReservations.officeTypeId=0,this.setFilter()},setFilter:function(){void 0===this.formGetProfileAndReservations.cityId?(this.formGetProfileAndReservations.cityId=0,this.formBuildingsFilter.cityId=0):this.formBuildingsFilter.cityId=this.formGetProfileAndReservations.cityId,this.buildingsToFilter(),void 0===this.formGetProfileAndReservations.buildingId&&(this.formGetProfileAndReservations.buildingId=0),void 0===this.formGetProfileAndReservations.officeTypeId&&(this.formGetProfileAndReservations.officeTypeId=0),this.formGetProfileAndReservations.page=1,localStorage.setItem("filtercity",this.formGetProfileAndReservations.cityId),localStorage.setItem("filterbuilding",this.formGetProfileAndReservations.buildingId),localStorage.setItem("filterOfficeType",this.formGetProfileAndReservations.officeTypeId),localStorage.setItem("filterOrderBy",this.orderBy),localStorage.setItem("filterSort",this.sort),localStorage.setItem("secondPageNumber",this.formGetProfileAndReservations.page),this.getProfileAndReservations(),this.verifyShowClearBtn()},changePage:function(){this.getProfileAndReservations(),localStorage.setItem("secondPageNumber",this.formGetProfileAndReservations.page),localStorage.setItem("secondPageUrl",window.location.href),this.toSection()},toSection:function(){document.getElementById("topList").scrollIntoView({behavior:"smooth"})},goToReservationDeatil:function(e){this.$router.push("/users/"+e)}}},l=r(30),c=r(90),d=r.n(c),f=r(837),m=r(225),v=r(818),h=r(788),y=r(806),I=r(941),x=r(842),_=r(227),S=r(174),C=r(903),P=r(939),R=r(809),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-layout",{attrs:{column:""}},[r("v-flex",{attrs:{xs12:"",sm8:"",md6:""}},[r("v-row",{staticClass:"pl-4 pr-4"},[r("v-col",{attrs:{cols:"12",sm:"4",md:"4"}}),e._v(" "),r("v-col",{attrs:{id:"topList",cols:"12",sm:"8",md:"8"}},[r("v-breadcrumbs",{staticClass:"float-right",attrs:{large:"",items:e.itemBreadcrumbs}})],1)],1),e._v(" "),r("v-row",{staticClass:"pl-4 pr-4"},[r("v-col",{staticClass:"colsUserDetail",attrs:{cols:"12",sm:"3",md:"3"}},[r("v-card",[r("div",{staticClass:"profilePictureUser text-center"},[r("v-avatar",{staticClass:"avatarUserImage",attrs:{size:"82"}},[r("v-img",{attrs:{src:e.userData.profileImage?e.userData.profileImage:"/defaultUser.png"}})],1),e._v(" "),r("p",{staticClass:"txtFullNameUser"},[e._v("\n              "+e._s(e.userData.fullName)+"\n            ")])],1),e._v(" "),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("ID Colaborador")]),e._v(" "),r("p",{staticClass:"txtInfoUser"},[e._v(e._s(e.userData.uid))])]),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("Cargo")]),e._v(" "),r("p",{staticClass:"txtInfoUser"},[e._v(e._s(e.userData.position))])]),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("Cédula")]),e._v(" "),r("p",{staticClass:"txtInfoUser"},[e._v(e._s(e.userData.document))])]),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("Correo")]),e._v(" "),r("p",{staticClass:"txtInfoUser"},[e._v(e._s(e.userData.email))])]),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("Teléfono")]),e._v(" "),r("p",{staticClass:"txtInfoUser"},[e._v(e._s(e.userData.phone))])]),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("Perfil Linkedin")]),e._v(" "),r("p",{staticClass:"txtInfoUser"},[e._v(e._s(e.userData.linkedinProfile))])]),e._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleInformationUser"},[e._v("\n                Editar Genstion del Usuario\n              ")]),e._v(" "),r("div",{staticClass:"overflow-y-auto px-7",staticStyle:{height:"18em"}},[r("v-autocomplete",{staticClass:"classicInput",staticStyle:{"border-radius":"10px !important"},attrs:{items:e.typePositionArray,"item-text":"name","item-value":"id",label:"",solo:"",dense:"","append-icon":""},on:{change:function(t){return e.updateTypePosition()}},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[r("v-icon",{staticClass:"input-icon-arrow",attrs:{color:"primary"}},[e._v("mdi-chevron-down")])]},proxy:!0}]),model:{value:e.typePosition,callback:function(t){e.typePosition=t},expression:"typePosition"}})],1)])],1)],1)],1),e._v(" "),r("v-col",{staticClass:"colsUserDetail",attrs:{cols:"12",sm:"9",md:"9"}},[r("v-row",[r("v-col",{staticClass:"colsUserDetail",attrs:{cols:"12",sm:"4",md:"4"}},[r("v-card",{staticClass:"userInfoCards blueBorder"},[r("v-row",{staticClass:"rowNumbersReservations"},[r("v-col",{staticClass:"colTitleNumberReservations",attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleNumberReservation txtBlue txtWithoutMargin"},[e._v("\n                    Número de reservas\n                  ")])]),e._v(" "),r("v-col",{staticClass:"colTxtNumbersReservations"},[r("p",{staticClass:"txtNumberReservation txtWithoutMargin"},[e._v("\n                    "+e._s(e.countInactive+e.countActive+e.countUsed)+"\n                  ")])]),e._v(" "),r("v-col",{staticClass:"colImgIcNumReservation colTxtNumbersReservations"},[r("img",{staticClass:"imgsNumberReservation",attrs:{src:"/ic_number_reservations@2x.png"}})])],1)],1)],1),e._v(" "),r("v-col",{staticClass:"colsUserDetail",attrs:{cols:"12",sm:"4",md:"4"}},[r("v-card",{staticClass:"userInfoCards greenBorder"},[r("v-row",{staticClass:"rowNumbersReservations"},[r("v-col",{staticClass:"colTitleNumberReservations",attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleNumberReservation txtGreen txtWithoutMargin"},[e._v("\n                    Reservas activas\n                  ")])]),e._v(" "),r("v-col",{staticClass:"colTxtNumbersReservations"},[r("p",{staticClass:"txtNumberReservation txtWithoutMargin"},[e._v("\n                    "+e._s(e.countActive)+"\n                  ")])]),e._v(" "),r("v-col",{staticClass:"colImgIcNumReservation colTxtNumbersReservations"},[r("img",{staticClass:"imgsNumberReservation",attrs:{src:"/ic_active_reservations@2x.png"}})])],1)],1)],1),e._v(" "),r("v-col",{staticClass:"colsUserDetail",attrs:{cols:"12",sm:"4",md:"4"}},[r("v-card",{staticClass:"userInfoCards redBorder"},[r("v-row",{staticClass:"rowNumbersReservations"},[r("v-col",{staticClass:"colTitleNumberReservations",attrs:{cols:"12"}},[r("p",{staticClass:"txtTitleNumberReservation txtRed txtWithoutMargin"},[e._v("\n                    Reservas canceladas\n                  ")])]),e._v(" "),r("v-col",{staticClass:"colTxtNumbersReservations"},[r("p",{staticClass:"txtNumberReservation txtWithoutMargin"},[e._v("\n                    "+e._s(e.countInactive)+"\n                  ")])]),e._v(" "),r("v-col",{staticClass:"colImgIcNumReservation colTxtNumbersReservations"},[r("img",{staticClass:"imgsNumberReservation",attrs:{src:"/ic_cancel_reservations@2x.png"}})])],1)],1)],1)],1),e._v(" "),r("v-row",{staticClass:"pl-4 pr-4 d-flex justify-center"},[r("v-col",{attrs:{cols:"3"}},[r("v-autocomplete",{staticClass:"classicInput inputWithoutLabel",staticStyle:{"border-radius":"10px !important"},attrs:{items:e.citiesFilter,"item-text":"name","item-value":"id",label:"Ciudad",solo:"",dense:"","hide-details":"","append-icon":""},on:{input:function(t){return e.setFilter()}},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[r("v-icon",{staticClass:"input-icon-arrow",attrs:{color:"primary"}},[e._v("mdi-chevron-down")])]},proxy:!0}]),model:{value:e.formGetProfileAndReservations.cityId,callback:function(t){e.$set(e.formGetProfileAndReservations,"cityId",t)},expression:"formGetProfileAndReservations.cityId"}})],1),e._v(" "),r("v-col",{attrs:{cols:"3"}},[r("v-autocomplete",{staticClass:"classicInput inputWithoutLabel",staticStyle:{"border-radius":"10px !important"},attrs:{items:e.buildingsFilter,"item-text":"name","item-value":"id",label:"Edificio",solo:"",dense:"","hide-details":"","append-icon":""},on:{input:function(t){return e.setFilter()}},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[r("v-icon",{staticClass:"input-icon-arrow",attrs:{color:"primary"}},[e._v("mdi-chevron-down")])]},proxy:!0}]),model:{value:e.formGetProfileAndReservations.buildingId,callback:function(t){e.$set(e.formGetProfileAndReservations,"buildingId",t)},expression:"formGetProfileAndReservations.buildingId"}})],1),e._v(" "),r("v-col",{attrs:{cols:"3"}},[r("v-autocomplete",{staticClass:"classicInput inputWithoutLabel",staticStyle:{"border-radius":"10px !important"},attrs:{items:e.officeTypeFilter,"item-text":"name","item-value":"id",label:"Tipo oficina",solo:"",dense:"","hide-details":"","append-icon":""},on:{input:function(t){return e.setFilter()}},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[r("v-icon",{staticClass:"input-icon-arrow",attrs:{color:"primary"}},[e._v("mdi-chevron-down")])]},proxy:!0}]),model:{value:e.formGetProfileAndReservations.officeTypeId,callback:function(t){e.$set(e.formGetProfileAndReservations,"officeTypeId",t)},expression:"formGetProfileAndReservations.officeTypeId"}})],1),e._v(" "),r("v-col",{staticStyle:{"max-width":"fit-content !important"}},[r("img",{directives:[{name:"show",rawName:"v-show",value:e.showBtnClearFilters,expression:"showBtnClearFilters"}],staticClass:"inputWithoutLabel imgAsBtnClearFilter",attrs:{src:"/ic_remove.svg"},on:{click:function(t){return e.clearFilters()}}})])],1),e._v(" "),r("v-row",{staticClass:"pl-4 pr-4 d-flex justify-center"},[r("v-col",{staticClass:"colsFilters",attrs:{cols:"3"}},[r("label",{staticClass:"font-weight-regular",attrs:{for:""}},[e._v("Ordenar por")]),e._v(" "),r("v-autocomplete",{staticClass:"classicInput",staticStyle:{"border-radius":"10px !important"},attrs:{items:e.selectordersBy,"item-text":"text","item-value":"value",label:"Ordenar por",solo:"",dense:"","hide-details":"","append-icon":""},on:{change:function(t){return e.setFilter()}},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[r("v-icon",{staticClass:"input-icon-arrow",attrs:{color:"primary"}},[e._v("mdi-chevron-down")])]},proxy:!0}]),model:{value:e.orderBy,callback:function(t){e.orderBy=t},expression:"orderBy"}})],1),e._v(" "),r("v-col",{staticClass:"colsFilters",attrs:{cols:"3"}},[r("label",{staticClass:"font-weight-regular",attrs:{for:""}},[e._v("Orden")]),e._v(" "),r("v-autocomplete",{staticClass:"classicInput",staticStyle:{"border-radius":"10px !important"},attrs:{items:e.selectSorts,"item-text":"text","item-value":"value",label:"orden",solo:"",dense:"","hide-details":"","append-icon":""},on:{change:function(t){return e.setFilter()}},scopedSlots:e._u([{key:"prepend-inner",fn:function(){return[r("v-icon",{staticClass:"input-icon-arrow",attrs:{color:"primary"}},[e._v("mdi-chevron-down")])]},proxy:!0}]),model:{value:e.sort,callback:function(t){e.sort=t},expression:"sort"}})],1)],1),e._v(" "),r("v-row",[r("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[r("div",[r("v-data-table",{staticClass:"dataTableStyle",attrs:{headers:e.headers,items:e.desserts,"items-per-page":50,"hide-default-footer":""},scopedSlots:e._u([{key:"item.id",fn:function(t){var n=t.item;return[r("a",{staticClass:"classicLinkInsideTable",domProps:{innerHTML:e._s(n.id)},on:{click:function(t){return e.goToReservationDeatil(n.id)}}})]}},{key:"item.city",fn:function(t){var n=t.item;return[r("span",{domProps:{innerHTML:e._s(n.office.city.name)}})]}},{key:"item.building",fn:function(t){var n=t.item;return[r("span",{domProps:{innerHTML:e._s(n.office.building.name)}})]}},{key:"item.office",fn:function(t){var n=t.item;return[r("span",{domProps:{innerHTML:e._s(n.office.name)}})]}},{key:"item.officeType",fn:function(t){var n=t.item;return[r("span",{domProps:{innerHTML:e._s(n.office.officeType.name)}})]}},{key:"item.startTime",fn:function(t){var n=t.item;return[r("span",{domProps:{innerHTML:e._s(n.startTime+" / "+n.endTime)}})]}},{key:"item.status",fn:function(t){var n=t.item;return["active"===n.status?r("span",{staticStyle:{color:"#009A44"}},[e._v("Activa")]):e._e(),e._v(" "),"inactive"===n.status?r("span",{staticStyle:{color:"#F83869"}},[e._v("Cancelada")]):e._e(),e._v(" "),"used"===n.status?r("span",{staticStyle:{color:"#0691DA"}},[e._v("\n                    Completada")]):e._e(),e._v(" "),"expired"===n.status?r("span",{staticStyle:{color:"#0691DA"}},[e._v("\n                    Expirada")]):e._e()]}}])}),e._v(" "),r("div",{staticClass:"text-center pt-2 classicPagination"},[r("v-pagination",{attrs:{length:e.paginationLength,"total-visible":e.visible},on:{input:function(t){return e.changePage()}},model:{value:e.formGetProfileAndReservations.page,callback:function(t){e.$set(e.formGetProfileAndReservations,"page",t)},expression:"formGetProfileAndReservations.page"}})],1)],1)])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;d()(component,{VAutocomplete:f.a,VAvatar:m.a,VBreadcrumbs:v.a,VCard:h.a,VCol:y.a,VDataTable:I.a,VFlex:x.a,VIcon:_.a,VImg:S.a,VLayout:C.a,VPagination:P.a,VRow:R.a})}}]);