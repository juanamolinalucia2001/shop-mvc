import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/ products'
import products from "@/Models/products";

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      service: new service(),
      allProducts:[],
      favorites:[],
      cart:[],
    },
    mutations:{
        setAllProducts(state, data){
            state.allProducts = data
        },
        //add product to list favs
        setAddFavorites(state,payload){
          state.favorites= payload
        },
        setAddCart(state,payload){
          state.cart= payload
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
        xremoveFromFavorites({ commit, state }, productId) {
            const favorites = state.favorites.filter((product) => product.id !== productId)
            commit('setFavorites', favorites)
          }

    }
  
})