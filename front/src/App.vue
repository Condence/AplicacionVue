<template>
  <v-app id="app">
 
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
    
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      > 
        <span class="hidden-sm-and-down">Faceboot</span>
      </v-toolbar-title>
 
      <v-spacer></v-spacer>
      <v-btn :to="{path: '/'}" text v-if="logueado">
      Inicio
      </v-btn> 
      <v-btn @click="()=>profile(this.$store.state.usuario._id.id)" text v-if="logueado">
      Perfil
      </v-btn>  
      <v-btn text @click="salir()" v-if="logueado">
        <v-icon>logout</v-icon> Salir
      </v-btn>
    
      <v-btn to="/login" text v-if="['register'].includes($route.name)">
      Login
      </v-btn> 
      
      <v-btn to="/register" text v-if="['login'].includes($route.name)">
      Registro
      </v-btn> 
      
 
    </v-app-bar>
    
    <v-content>
   
      <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center justify-center> 
   <!--
      <v-flex xs3 class="sidebar" v-if="logueado">   
    
          
 <Amigos></Amigos>  
        
       <ul v-if="esAdministrador">
         <span>Empleados</span>
         <li> 
           <v-btn to="/empleados/buscar" text>
              Buscar empleados
            </v-btn> 
         </li>
         <li> 
           <v-btn to="/empleados/vacaciones" text>
              Vacaciones
            </v-btn> 
         </li>
         <li> 
           <v-btn to="/empleados/agregar" text>
              Agregar empleado
            </v-btn> 
         </li>
       </ul>
      </v-flex>
         -->
      <v-flex xs8 class="main" v-if="logueado"> 
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-flex>
      
      <v-flex xs12 class="main" v-else> 
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-flex>
      
    </v-layout>
  </v-container>
    </v-content>
  </v-app>
</template>
 <style>
 span { 
   font-weight: bold;
 }
 ul{  
   list-style: none; 
   padding: 0;
   margin-bottom: 40px;
   box-sizing: border-box;
 }
 ul li {
   padding: 5px 0px;
   border-bottom:1px solid #ccc; 
 }
 ul li a {
   display: inline-block;
    width: 100%; 
   text-decoration: none; 
 }
 </style>
<script>
import HelloWorld from './components/HelloWorld';
import Amigos from './components/Amigos';
export default {
  
  name: 'App',
  components: {
    HelloWorld,
    Amigos
  },
  data () {
    return {
      drawer: true, 
      links: [
        { icon: 'home', text: 'Home', route: '/'},
        { icon: 'contacts', text: 'About', route: '/about'},
      ],
      
    
    }
    
  },
  computed:{
    logueado(){   
      return this.$store.state.usuario;
    },
    esUsuario(){
      return this.$store.state.usuario && this.$store.state.usuario.rol.id == 'usuario';
    },
    esAdministrador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol.id == 'administrador';
    }
  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    },
    profile(iduser){
      this.$router.replace ({ name: 'profile', params: { id: iduser } })
    }
  }
}
</script>
