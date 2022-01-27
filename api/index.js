export default {
  // access token
  generateAcsTkn: 'kg/generate-access-token',
  // Auth
  loginAdmin: 'boAdmin/loginAdmin',

  //recoveryPassword
  recoveryPassword: 'onboarding/recovery-password',
  validCode: 'onboarding/check-code',
  changePassword: 'onboarding/change-password',
  // boAdmin
  searchAdmins: 'boAdmin/searchAdmins',
  createAdmin: 'boAdmin/createAdmin',
  getAllRolesAdmin: 'boAdmin/getAllRolesAdmin',

  // Cities
  listCities: 'city/listCities',
  setCityStatus: 'city/setCityStatus',
  createCity: 'city/createCity',
  updateCity: 'city/updateCity',
  cityById: 'city/cityById',

  // Building
  listBuildings: 'building/listBuildings',
  setBuildingStatus: 'building/setBuildingStatus',
  createBuilding: 'building/createBuilding',
  buildingById: 'building/buildingById',
  updateBuilding: 'building/updateBuilding',

  // Office Type
  officeTypeList: 'officeType/all/filter',
  officeTypeStatus: 'officeType/status/',

  // Offices
  officeList: 'office/all/filter',
  getListOffice: 'office/getListOffice',
  officeStatus: 'office/status/',
  verifyQrCode: 'office/verifyQrCode',

  // Users
  boListUsers: 'boAdmin/boListUsers',
  changeUserState: 'user/changeUserState',
  getUserInfoById: 'user/getUserInfoById',
  updateTypePostion: 'user/updateTypePostion',

  // Notifications
  listNotificationReservation: 'notificationReservation/listNotificationReservation',

  // System Office  Items
  getAllSystemOfficeItems: 'systemOfficeItems/getAllSystemOfficeItems',

  // Dashboard
  totalReservations: 'dashboard/totalReservations',
  reservationsByCity: 'dashboard/reservationsByCity',
  reservationsByOfficeType: 'dashboard/reservationsByOfficeType',
  getUsersCancelReservations: 'dashboard/getUsersCancelReservations',
  getTopOfficesMoreReserved: 'dashboard/getTopOfficesMoreReserved',
  getOfficesPercent: 'dashboard/getOfficesPercent',

  // Position
  getAllPositions: 'position/getAllPositions',
  getPositions: 'position/getPositions',
  createPosition: 'position/createPosition',
  updatePosition: 'position/updatePosition',
  getPositionById: 'position/getPositionById',

  // System Time Available
  getTimeById: 'systemTimeAvailable/getTimeById',
  updateTimeAvailable: 'systemTimeAvailable/updateTimeAvailable',

  // Reservations
  getAllByDateAndOffice: 'reservationOffice/getAllByDateAndOffice',

  // System Percentage
  getAllPercentages: 'systemPercentage/getAllPercentages',

  // system Item Icon
  getAllSystemIcons: 'systemItemIcon/getAllSystemIcons',
}
