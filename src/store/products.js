import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/ products'
import {db, auth} from '@/firebase'
import router from '@/router'
import products from "@/Models/products";


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      service: new service(),
      allProducts:[],
      allCategories:[],
      favorites:[],
      cart:[],
      allStock: [],
      formValid:false,
      cartLength:0,
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
        setAllStock(state, data) {
          state.allStock = data;
        },
        //add product to list favs
        setAddFavorites(state,payload){
          state.favorites= payload
        },
        setAddCart(state,payload){
          state.cart= payload
          state.cartLength++
        },
        deleteProduct(state, { index, cantidad }) {
          state.cart.splice(index, 1);
          state.cartLength -= cantidad;
        },
        deleteAll(state) {
          state.cart = [];
          state.cartLength=0
        },
        sumProductCart(state){
          state.cartLength+=1
        },
        setUsuario(state, payload){
          state.usuario=payload
        },
        setError(state, payload){
          state.error=payload
        },
        updateStockQuantity(state, payload) {
          payload.forEach(item => {
            const product = state.allStock.find(p => p.id === item.id);
            if (product) {
              product.stock -= item.quantity;
              console.log("hola desde mutacion", state.allStock)
            }
          });
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

          async getStock(state) {
            return new Promise(async (resolve, reject) => {
              try {
                let item = await state.state.service.getAllStock();
                console.log("store stock:", item);
                state.commit("setAllStock", item);
                resolve(true);
              } catch (error) {
                reject(error);
              }
            });
          },


        deleteProduct({ commit }, id) {
            commit('deleteProduct', id);
        },
        

        

      }
  
})