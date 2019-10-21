
import axios from 'axios';
export default{
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    retrieveToken(context, credentials){
      const headers = {
        "Authorization" : "Basic d2ViOnBhc3N3b3Jk"
      };
      axios
        .post("api/oauth/token",null, {params: {
            grant_type: "password",
            username: credentials.username,
            password: credentials.password
          }}, {headers: headers})
        .then(response => console.log(response))
        .catch(console.error);
      console.log(credentials.username)
    },
  }
};
