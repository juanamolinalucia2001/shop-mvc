import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/ products'
import products from "@/Models/products";

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      service: new service(),
      allProducts:[],
      allCategories:[],
      favorites:[],
      cart:[],
      formValid:false,
      valueFields: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      } 
    },
    mutations:{
      
      setUpdateForm(state, estado){
        state.formValid=estado;
      },
       setUpdateCard(state, datos) {
        state.valueFields = datos;
      },
        setAllProducts(state, data){
            state.allProducts = data
        },
        setAllCategories(state,data){
          state.allCategories = data
        },
        //add product to list favs
        setAddFavorites(state,payload){
          state.favorites= payload
        },
        setAddCart(state,payload){
          state.cart= payload
        },
        deleteProduct(state, index) {
          state.cart.splice(index, 1);
        },
        deleteAll(state) {
          state.cart = [];
        }

    },
    getters:{
      cartTotal(state){
        let total = 0;
        state.cart.forEach(item => {
            total += item.precio*item.quantity;
        });
        return Number(total.toFixed(2));
    },
    cartLength(state){
      return state.cart.length
     /*  let sum = 0
      state.cart.forEach(item => {
          sum+= item.quantity
      });
      return sum */
    },
    favoritesLength(state){
      return state.favorites.length
    }
    },
    actions:{
      submitForm({ state }) {
        // logic to submit form data
        console.log(state.formData);
      },
        async getProducts(state) {
            return new Promise(async (resolve, reject) => {
              try {
                let item = await state.state.service.getAllProducts();
                console.log(item)
      
                state.commit("setAllProducts",  item );
                resolve(true);
              } catch (error) {
                reject(error);
              }
            });
          },
      async getCategories(state) {
        return new Promise(async (resolve, reject) => {
          try{
            let item = await state.state.service.getAllCategories();
            console.log(item)
      
            state.commit("setAllCategories",  item );
            resolve(true);
          }
          catch (error) {
                reject(error);
              }
            });
          },
        deleteProduct({ commit }, id) {
            commit('deleteProduct', id);
        }
    }
  
})