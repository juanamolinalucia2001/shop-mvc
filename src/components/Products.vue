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
        <template v-slot:item.actions="{ item }">
          <v-btn icon color="pink" @click="addToFavorites(item)">
              <v-icon class="mdi-heart" >mdi-heart</v-icon>
            </v-btn>
            <v-btn icon color="orange"  @click="addToCart(item)">
             + <v-icon class="mdi-cart" >mdi-cart</v-icon>
            </v-btn>
        </template>
         <template v-slot:item.stock="{item}" >

           <div v-for="stock in allStock" :key="stock.id">
            <p class="ms-4" v-if="stock.id === item.id">
             {{ stock.stock }}
            </p>
          </div>
        </template>
      </v-data-table>
        

  
      <Snackbar
      :alert="showSnackbar"
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
        { text: this.$tc('products.nameProduct'), value: 'title' },
        {text:this.$tc('products.image'), value:'imagen'}, 
        { text:this.$tc('products.description'), value: 'descripcion' },
        { text:this.$tc('products.price'), value: 'precio' },
        { text:this.$tc('products.category'), value: 'categoria' },
        { text:this.$tc('products.stock'), value: 'stock' },
        { text: this.$tc('products.actions'), value: 'actions', sortable: false },
      ],
      loadTable:true
      
      }
    },
     components: {
    Snackbar,
    },
     mounted() {

    //realiza una solicitud para obtener una lista de productos.
      products.dispatch('getProducts').then(() => {
        console.log('productos cargados')
         this.loadTable=false;
      });

    //realiza una solicitud para obtener una lista de categorías de productos.
       products.dispatch('getCategories').then(() => {
        console.log('categorias')
      });

    //realiza una solicitud para obtener una lista de el stock de productos.
      products.dispatch("getStock").then(() => {
        console.log("cargo stock")
      });

      
      },
      
      computed: {
            allProducts(){
                  return products.state.allProducts
            },
            categories(){
                return products.state.allCategories
            },
            allStock(){
                return products.state.allStock
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
           // Verificar si el producto ya está en la lista de favoritos
          if (this.favs.some(p => p.id === product.id)) {
            this.showSnackbar = true;
            this.snackbarText = "This product is already in favorites";
            this.snackbarColor = "violet";
            setTimeout(()=>this.showSnackbar=false,1000)
          return
          }

          // Agregar el producto a la lista de favoritos
          this.favs.push(product);
          products.commit('setAddFavorites', this.favs);

          this.showSnackbar = true;
          this.snackbarText = "Product added to favorites: " + product.title;
          this.snackbarColor = "red";
          setTimeout(()=>this.showSnackbar=false,1000)
          
      },
      addToCart(product) {

      const existingProduct = this.cart.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        product.quantity = 1;
        this.cart.push(product);
      }
      products.commit('setAddCart', this.cart);
      
      this.showSnackbar = true;
      this.snackbarText = `${product.title} added to cart (${product.quantity} ${product.quantity > 1 ? 'items' : 'item'})`;
      this.snackbarColor = "green";
      setTimeout(()=>{this.showSnackbar=false},"1500")
    },

   
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
