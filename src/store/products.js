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
    },
    mutations:{
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
        deleteProduct(state, id) {
          state.cart = state.cart.filter(product => product.id !== id);
        },
        deleteAll(state) {
          state.cart = [];
        }

    },
    getters:{
      cartTotal(state){
        let total = 0;
        state.cart.forEach(item => {
            total += item.precio;
        });
        return Number(total.toFixed(2));
    },
    cartLength(state){
      return state.cart.length
    },
    favoritesLength(state){
      return state.favorites.length
    }
    },
    actions:{
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