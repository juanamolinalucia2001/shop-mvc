<template>
  <div class=".card__container">
    <v-select v-model="selectedCategory" :items="categories" label="Category"></v-select>
      <v-data-table :headers="headers" :items="filteredProducts" hide-default-footer style="font-family:Helvetica;"
       :loading="loadTable"
       loading-text="Loading... Please wait">
         <template v-slot:item.title="{ item }">
          <b>{{item.title}}</b>
        </template>
         <template v-slot:item.imagen="{ item }">
          <v-img :src="item.imagen" max-width="100"></v-img>
        </template>
         <template v-slot:item.precio="{ item }">
          <p>${{item.precio}}</p>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon color="pink" @click="addToFavorites(item)">
              <v-icon class="mdi-heart" >mdi-heart</v-icon>
            </v-btn>
            <v-btn icon color="orange"  @click="addToCart(item)">
             + <v-icon class="mdi-cart" >mdi-cart</v-icon>
            </v-btn>
        </template>
      </v-data-table>
        

  
      <Snackbar
      :show="showSnackbar"
      :text="snackbarText"
      :color="snackbarColor"
    />
         </div>

</template>
<script>
import products from '../store/products';
import Snackbar from '../components/commons/Alert.vue'

export default {
    data(){
      return{
        favs :[],
        cart:[],
        selectedCategory: null,
        snackbarText: "",
        snackbarColor: "",
        showSnackbar:false,
        headers: [
        { text: 'Product', value: 'title' },
        {text:'Imagen', value:'imagen'}, 
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Price', value: 'precio' },
        { text: 'Category', value: 'categoria' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      loadTable:true
      
      }
    },
     components: {
    Snackbar,
    },
     mounted() {
      //hace un pedido de los productos
      products.dispatch('getProducts').then(() => {
       
        console.log('productos cargados')
         this.loadTable=false;
       
      })

       products.dispatch('getCategories').then(() => {
        console.log('categorias')
      })

     


      
      },
      
      computed: {
            allProducts(){
                  return products.state.allProducts
            },
            categories(){
                return products.state.allCategories
            },
            
            allFavs(){
              console.log(products.state.favorites)
              return products.state.favorites
            },

            allCart(){
              return products.state.cart
            },

           filteredProducts() {
            if (this.selectedCategory) {
              return this.allProducts.filter(p => p.categoria === this.selectedCategory);
            }
            return this.allProducts;
    },


      },
      methods:{
       addToFavorites(product) {
          this.showSnackbar = null;
          this.favs.push(product)
          products.commit('setAddFavorites', this.favs)

          this.showSnackbar = true;
          this.snackbarText = "Product add to favorites"+product.title;
          this.snackbarColor = "red";
          
      },
      addToCart(product){
        this.showSnackbar = null;
        this.cart.push(product)
        products.commit('setAddCart', this.cart)

        this.showSnackbar = true;
        this.snackbarText = "Product add to cart"+product.title;
        this.snackbarColor = "green";
      
      }
      }
      
    
}
</script>
<style>
.card__container{
  display:flex;
  justify-content: center;
    align-items: center;
}
</style>
