(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{814:function(t,e,n){var content=n(815);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(16).default)("dc0628f2",content,!0,{sourceMap:!1})},815:function(t,e,n){(e=n(15)(!1)).push([t.i,".v-tooltip{display:none}.v-tooltip--attached{display:inline}.v-tooltip__content{background:rgba(97,97,97,.9);color:#fff;border-radius:4px;font-size:14px;line-height:22px;display:inline-block;padding:5px 16px;position:absolute;text-transform:none;width:auto;opacity:1;pointer-events:none}.v-tooltip__content--fixed{position:fixed}.v-tooltip__content[class*=-active]{transition-timing-function:cubic-bezier(0,0,.2,1)}.v-tooltip__content[class*=enter-active]{transition-duration:.15s}.v-tooltip__content[class*=leave-active]{transition-duration:75ms}",""]),t.exports=e},827:function(t,e,n){"use strict";var o=n(3),r=(n(21),n(814),n(84)),c=n(29),l=n(138),d=n(92),h=n(139),m=n(178),f=n(39),v=n(2),A=n(11),S=n(8);e.a=Object(S.a)(c.a,l.a,d.a,h.a,m.a,f.a).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!(this.bottom||this.left||this.top||this.right),o=!1!==this.attach?e.offsetLeft:e.left,r=0;return this.top||this.bottom||n?r=o+e.width/2-content.width/2:(this.left||this.right)&&(r=o+(this.right?e.width:-content.width)+(this.right?10:-10)),this.nudgeLeft&&(r-=parseInt(this.nudgeLeft)),this.nudgeRight&&(r+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(r,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,content=t.content,n=!1!==this.attach?e.offsetTop:e.top,o=0;return this.top||this.bottom?o=n+(this.bottom?e.height:-content.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=n+e.height/2-content.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(o+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(v.g)(this.maxWidth),minWidth:Object(v.g)(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(v.t)(this,"activator",!0)&&Object(A.b)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=r.a.options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===v.x.esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var content=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[content]):content},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(o.a)(t,this.contentClass,!0),Object(o.a)(t,"menuable__content__active",this.isActive),Object(o.a)(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},943:function(t,e,n){"use strict";n.r(e);n(72);var o=n(19),r={layout:"logged",components:{},data:function(){return{headers:[{text:"Nombre",sortable:!1,value:"fullName"},{text:"Cargo",sortable:!1,value:"position"},{text:"Correo electrónico",sortable:!1,value:"email"},{text:"Estado",sortable:!1,value:"status"},{text:"Editar",sortable:!1,value:"options"}],admins:[],visible:12,paginationLength:1,totalRows:0,formSearchAdmins:{acstkn:"",needle:"",limit:50,offset:0,page:1},currentUrl:""}},mounted:function(){this.listAndSearchAdmins(),1!==parseInt(localStorage.getItem("currentRole"))&&this.$router.push({path:"/dashboard",force:!0}),this.currentUrl=window.location.href,this.currentUrl==localStorage.getItem("firstPageUrl")?(this.formSearchAdmins.page=parseInt(localStorage.getItem("firstPageNumber")),this.formSearchAdmins.needle=localStorage.getItem("needle")):(localStorage.setItem("needle",this.formSearchAdmins.needle),localStorage.setItem("firstPageNumber",this.formSearchAdmins.page),localStorage.setItem("firstPageUrl",window.location.href)),localStorage.setItem("secondPageUrl","")},methods:{goToCreateAdmin:function(){localStorage.setItem("needle",""),localStorage.setItem("firstPageNumber",1),this.$router.push("/admin/createAdmin")},listAndSearchAdmins:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.formSearchAdmins.acstkn=localStorage.getItem("acstkn"),t.formSearchAdmins.offset=(t.formSearchAdmins.page-1)*t.formSearchAdmins.limit,e.next=4,t.$store.dispatch("boAdmin/listAndSearchAdmins",t.formSearchAdmins).then((function(e){e.success&&(t.totalRows=e.body.total,t.admins=e.body.admins,t.formSearchAdmins.limit>0&&t.totalRows>0?t.paginationLength=Math.ceil(t.totalRows/t.formSearchAdmins.limit):t.paginationLength=1)})).catch((function(e){t.$router.push({path:"/logout",force:!0})}));case 4:case"end":return e.stop()}}),e)})))()},clearFilters:function(){this.formSearchAdmins.needle="",this.formSearchAdmins.page=1,this.setFilter()},setFilter:function(){localStorage.setItem("needle",this.formSearchAdmins.needle),this.formSearchAdmins.page=1,localStorage.setItem("firstPageNumber",this.formSearchAdmins.page),this.listAndSearchAdmins()},changePage:function(){this.listAndSearchAdmins(),localStorage.setItem("firstPageNumber",this.formSearchAdmins.page),localStorage.setItem("firstPageUrl",window.location.href),this.toSection()},toSection:function(){document.getElementById("topList").scrollIntoView({behavior:"smooth"})},goToEditAdmin:function(t){localStorage.setItem("editAdminId",t),this.$router.push("/admin/viewAndUpdateAdmin")},changeAdminStatus:function(t,e){var n=this;return Object(o.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,n.$store.dispatch("boAdmin/changeAdminState",{id:t,active:"active"===e?0:1,acstkn:localStorage.getItem("acstkn"),logBoAdminId:localStorage.getItem("boAdminId")});case 2:n.listAndSearchAdmins();case 3:case"end":return o.stop()}}),o)})))()}}},c=n(30),l=n(90),d=n.n(l),h=n(791),m=n(806),f=n(941),v=n(842),A=n(903),S=n(939),x=n(809),_=n(817),w=n(827),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{column:""}},[n("v-flex",{attrs:{xs12:"",sm8:"",md6:""}},[n("v-row",{staticClass:"pl-4 pr-4"},[n("v-col",{attrs:{cols:"12",sm:"3",md:"3"}},[n("label",{attrs:{id:"topList"}},[t._v("Buscar:")]),t._v(" "),n("v-text-field",{staticClass:"classicInput",attrs:{placeholder:"Nombre o correo electrónico",solo:"",flat:"",dense:"","append-icon":"search","hide-details":""},on:{keyup:function(e){return t.setFilter()}},model:{value:t.formSearchAdmins.needle,callback:function(e){t.$set(t.formSearchAdmins,"needle",e)},expression:"formSearchAdmins.needle"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"6"}}),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"3",md:"3"}},[n("v-btn",{staticClass:"classicButton btnCreate",attrs:{dark:""},on:{click:t.goToCreateAdmin}},[n("img",{staticClass:"imageCreateAdmin",attrs:{src:"/iconAdd.svg"}}),t._v("\n          Crear admin\n        ")])],1)],1),t._v(" "),n("v-row",{staticClass:"pl-4 pr-4"},[n("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[n("div",[n("v-data-table",{staticClass:"dataTableStyle",attrs:{headers:t.headers,items:t.admins,"items-per-page":50,"hide-default-footer":""},scopedSlots:t._u([{key:"item.fullName",fn:function(e){var o=e.item;return[n("a",{staticClass:"classicLinkInsideTable",domProps:{innerHTML:t._s(o.fullName)},on:{click:function(e){return t.goToEditAdmin(o.id)}}})]}},{key:"item.status",fn:function(e){var o=e.item;return["active"!==o.status?n("img",{staticClass:"imgAsSwitchTable",attrs:{src:"/ic_status_red.svg"},on:{click:function(e){return t.changeAdminStatus(o.id,o.status)}}}):t._e(),t._v(" "),"active"===o.status?n("img",{staticClass:"imgAsSwitchTable",attrs:{src:"/ic_status_green.svg"},on:{click:function(e){return t.changeAdminStatus(o.id,o.status)}}}):t._e()]}},{key:"item.options",fn:function(e){var o=e.item;return[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){e.on,e.attrs;return[n("img",{staticClass:"imgAsBtnTableAction",attrs:{src:"/ic_edit.svg"},on:{click:function(e){return t.goToEditAdmin(o.id)}}})]}}],null,!0)},[t._v(" "),n("span",[t._v("Editar")])])]}}])}),t._v(" "),n("div",{staticClass:"text-center pt-2 classicPagination"},[n("v-pagination",{attrs:{length:t.paginationLength,"total-visible":t.visible},on:{input:function(e){return t.changePage()}},model:{value:t.formSearchAdmins.page,callback:function(e){t.$set(t.formSearchAdmins,"page",e)},expression:"formSearchAdmins.page"}})],1)],1)])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:h.a,VCol:m.a,VDataTable:f.a,VFlex:v.a,VLayout:A.a,VPagination:S.a,VRow:x.a,VTextField:_.a,VTooltip:w.a})}}]);