import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/ products'
import products from "@/Models/products";

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      service: new service(),
      allProducts:[],
    },
    getters:{   

    },
    mutations:{
        setAllProducts(state, data){
            state.allProducts = data
        }

    },
    actions:{
        async getProducts(state) {
            return new Promise(async (resolve, reject) => {
              try {
                let item = await state.state.service.getAllProducts();
      
                state.commit("setAllProducts",  item );
                resolve(true);
              } catch (error) {
                reject(error);
              }
            });
          }

    }
})