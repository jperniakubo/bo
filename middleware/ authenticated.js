
  
    export default function () {
    //console.log('auth_token',!window.localStorage.getItem('token'));
    if (!window.localStorage.getItem('authToken')) {
      window.location = '/'
    }
  }
  
  /*   if (!window.localStorage.getItem('authToken')) {
      this.$router.push({ path: '/' })
    } */