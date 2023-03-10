<template>
  <div class=".card__container">
    <h2 class="mt-3 text-center" v-if="selectedCategory==null">Todos nuestros Productos</h2>
     <h2 class="mt-3 text-center" v-else>{{selectedCategory}}</h2>
    <v-select v-model="selectedCategory" :items="categories" label="Categorias"></v-select>
      <v-data-table :headers="headers" :items="filteredProducts" style="font-family:Helvetica;"
        height="400" class="overflow-y"
       :loading="loadTable"
       loading-text="Loading... Please wait">
         <template v-slot:item.title="{ item }">
          <b>{{item.title}}</b>
        </template>
       <template v-slot:item.descripcion="{ item }">
           <div class="overflow mt-2 mb-2" style="overflow-y: auto; max-height: 120px;">{{item.descripcion}}</div>
      </template>
         <template v-slot:item.imagen="{ item }">
          <v-img contain :src="item.imagen" max-width="100" height="120"></v-img>
        </template>

        
        <template v-slot:item.actions="{ item }">
          <v-btn icon color="pink" @click="addToFavorites(item)">
              <v-icon class="mdi-heart" >mdi-heart</v-icon>
            </v-btn>

            <v-tooltip :bottom="isEnabled(item)" :disabled="isEnabled(item)">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="orange" :disabled="!isEnabled(item)"  @click="addToCart(item)">
                + <v-icon class="mdi-cart"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-cart</v-icon>
                </v-btn>
          </template>
      <span >Tooltip</span>
    </v-tooltip>
           
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
        { text: this.$tc('products.nameProduct'), value: 'title',width:150  },
        {text:this.$tc('products.image'), value:'imagen',width:20 }, 
        { text:this.$tc('products.description'), value: 'descripcion',width:500 },
        { text:this.$tc('products.price'), value: 'precio',width:10 },
        { text:this.$tc('products.category'), value: 'categoria',width:50  },
        { text:this.$tc('products.stock'), value: 'stock', sortable:false,width:10  },
        { text: this.$tc('products.actions'), value: 'actions',sortable:false,width:10  },
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
  if (products.state.favorites.some(p => p.id === product.id)) {
    this.showSnackbarMessage(`This product is already in favorites`, "violet");
    return;
  }
  // Agregar el producto a la lista de favoritos
  products.commit('setAddFavorites', product);
  this.showSnackbarMessage(`Product added to favorites: ${product.title} `, "red");
}
,

addToCart(product) {
  // Buscamos si el producto ya está en el carrito
  const existingProduct = products.state.cart.find(p => p.id === product.id);
  // Buscamos la cantidad de stock disponible para el producto
  const stock = this.allStock.find(p => p.id === product.id)?.stock;

  // Verificamos si hay suficiente stock disponible para agregar el producto al carrito
  // y si el usuario ya ha agregado una cantidad suficiente del producto al carrito
  // o si el usuario intenta agregar una cantidad mayor al stock disponible.
  if (!stock || (existingProduct && existingProduct.quantity >= stock) || (!existingProduct && product.quantity > stock)) {
    // Si no hay suficiente stock disponible, mostramos una notificación de error y salimos de la función.
    this.showSnackbarMessage(`${product.title} cannot be added to cart due to insufficient stock`, "red");
    return;
  }

  // Si el producto ya está en el carrito, incrementamos su cantidad en 1.
  if (existingProduct) {
    existingProduct.quantity++;
  // De lo contrario, creamos un nuevo objeto de producto con cantidad 1 y lo agregamos al carrito.
  } else {
    product.quantity = 1;
    products.commit('setAddCart', [product]);
  }

  // Mostramos una notificación de éxito indicando que el producto se ha agregado al carrito.
  this.showSnackbarMessage(`${product.title} added to cart`, "green");
   products.state.cartLength++
},

showSnackbarMessage(text, color) {
  this.showSnackbar = true;
  this.snackbarText = text;
  this.snackbarColor = color;
  setTimeout(()=>{this.showSnackbar=false},"1500")
},


    isEnabled(item) {
      const stock = this.allStock.find(stock => stock.id === item.id);
      return stock.enabled && stock.stock >=1 ;
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
