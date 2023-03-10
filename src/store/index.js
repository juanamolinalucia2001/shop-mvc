import Vue from "vue";
import Vuex from "vuex";
import {
  db,
  auth,
  user,
} from "@/firebase" ;
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loader: false,
    searchText: "",
    success: null,
  },
  getters: {},
  mutations: {
    setCompra(state, payload) {
      state.compra = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    
    async updateStock({commit},productsList) {
      console.log(productsList)
      const stocks = db.collection("stock");
    
      for (const item of productsList) {
        const querySnapshot = await stocks.where("id", "==", item.id).get();
    
        querySnapshot.forEach(async (doc) => {
          if (doc.exists) {
            const docRef = stocks.doc(doc.id);
            const newQuantity = doc.data().stock - item.quantity;
    
            await docRef.update({ stock: newQuantity });
            console.log(`Stock de ${item.id} actualizado exitosamente.`);
          } else {
            console.log(`No se encontró un producto con la id: ${item.id}`);
          }
        });
      }
    }
    ,
    
    
    
  
    //agregar compra a firebase
    agregarProducto({ commit, state }, { compra, uid, photourl, displayName, email, provider }) {
      const userRef = db.collection("users").doc(state.user.email);
      const comprasRef = userRef.collection("compras");
      const fecha = new Date(); // Obtiene la fecha actual

      compra.forEach((item) => {
        const itemJSON = JSON.parse(JSON.stringify(item));
        const itemObject = { ...itemJSON };

        comprasRef
          .add({
            fecha: fecha,
            uid: uid,
            photourl: photourl,
            displayName: displayName,
            email: email,
            provider:provider,
            productos: itemObject,
          })
          .then((docRef) => {
            console.log("El producto se agregó con éxito:", docRef.id);
          })
          .catch((error) => {
            console.error("Error al agregar el producto al carrito:", error);
          });
      });
    },
    


    //register user
    createUser({ commit }, credentials) {
      auth
        .createUserWithEmailAndPassword(credentials.email, credentials.passwd)
        .then((res) => {
          console.log(res);
          auth.currentUser.updateProfile({
            displayName: credentials.name,
            photoURL: 'https://raw.githubusercontent.com/vonKaster/CRUDFirebase/204e35cdc01abf6dd34869facb8badcde772b7a7/src/assets/user.jpg'
          })
          const createdUser = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid,
            photosrc: res.photoURL
          };
            
              commit("setUser", createdUser);
              location.reload();
              router.push("/");
              
          
        })
        .catch((err) => {
          console.log(err);
          commit("setError", err.code);
        });
    },
    //login
    signIn({ commit }, { provider, credentials }) {
      let authPromise = null;
      if (provider === "email") {
        authPromise = auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.passwd
        );
      } else if (provider === "google") {
        const provider = new GoogleAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === "facebook") {
        const provider = new FacebookAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === "github") {
        const provider = new GithubAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else {
        console.error("Invalid provider");
        return;
      }

      authPromise
        .then((res) => {
          console.log(res);
          const userLoggedIn = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid,
          };
          commit("setUser", userLoggedIn);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          commit("setError", err.code);
        });
    },

    signOut({ commit }) {
      auth.signOut().then(() => {
        location.reload();
        router.push("/acceso");
      });
    },

    detectUser({ commit }, user) {
      commit("setUser", user);
    },

    changeUserName({ commit }, name){
      if (name.length >= 3 && name.length < 24) {
        auth.currentUser.updateProfile({
          displayName: name
        }).then(() => {
          commit("setSuccess", "nameSuccess");
          commit("setError", null);
        }).catch((error) => {
          console.log(error)
        });
      } else {
        commit("setError", "nameErr");
        console.log("hola")
        commit("setSuccess", null);
      }
    },
    
    changePassword ({ commit }, newPassword) {
      auth.currentUser.updatePassword(newPassword).then(function() {
        commit("setError", null);
        commit("setSuccess", "passwdSuccess");
      }).catch(function(error) {
        console.log(error);
        commit("setError", error.code);
      });
    }

  },

  getters: {
    userExists(state) {
      if (state.user === null) {
        return false;
      } else {
        return true;
      }
    }, 
  },
  modules: {},
});