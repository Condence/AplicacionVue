<template>
<v-layout align-center justify-center>
        <v-flex xs9>
     <v-card
      class="mx-auto"
    >  
    
    <v-card-title>
       <span class="headline"> 
        {{this.respuesta.postedByDetails.nombre}}
      </span> 
       <v-spacer></v-spacer> 
     <v-row
            align="center"
            justify="end"  
            v-if="this.respuesta.postedBy == id_usuario"
          > 
                  <v-btn icon @click="eliminar_publicacion(respuesta._id)"> 
                  <v-icon class="mr-1" >mdi-delete</v-icon>  
                </v-btn> 
     </v-row>
     </v-card-title>

      <v-card-subtitle>
         {{this.respuesta.createdAt | moment }}
      </v-card-subtitle>
  <div style="margin:20px; font-weight:bold; font-size:30px;">
        {{this.respuesta.content}}

      </div>
      <v-card-actions> 
        <v-list-item class="grow"> 
            <v-list-item-content>
            <div id="chip-usage-example">

              <v-chip style="margin:3px;" v-for="(tag, index) in respuesta.tags" :key="index" :to="{name: 'tag', params: { tag: tag }}">{{tag}}</v-chip>
            </div> 
          </v-list-item-content>
         </v-list-item>
      </v-card-actions>
  
      <v-expand-transition>
        <div>
          <v-divider></v-divider> 
       
           
    
          <div class="comentarios" style="margin:10px;">
            <div class="publicar" style="margin:20px 0px;">
              <v-textarea
              name="input-7-1"
              filled
              v-model="comentario_content"
              label="Comentario"
              auto-grow 
              ></v-textarea> 
              <v-btn @click="agregar_comentario()"  text>
                Enviar
              </v-btn>
            </div>
            <h2>Comentarios</h2>
            <div class="comentario" v-for="(comment, index) in this.respuesta.comentarios" :key="index" style="margin-bottom:5px; padding-bottom:5px; border-bottom:1px solid #ccc;">
 
              <router-link :to="{name: 'profile', params: { id: comment.postedBy }}">{{ comment.postedByName }} </router-link >
              
              <p>{{comment.content}} </p>
            </div> 
          </div>
            
        
        
        </div>
      </v-expand-transition>
    </v-card>
        </v-flex>
    </v-layout>
</template>

<style>
 
</style>
<script>
import axios from 'axios'
import moment from 'moment' 
export default { 
  data(){ 
      return{
          dialog: false,
          search:'',
          categorias:[],
          headers: [
              { text: 'Contenido', value: 'content', sortable: false },
              { text: 'Posteado por', value: 'postedBy', sortable: false },
              { text: 'Creado el ', value: 'createdAt', sortable: true }
          ],
          editedIndex: -1,
          _id:'',
          nombre:'',
          descripcion:'',
          valida:0, 
          validaMensaje:[],
          adModal:0,
          adAccion:0,
          get_username: '',
          respuesta: [], 
          postBy: '',
          adNombre:'',
          adId:'',
          comentario_content: '',
          id_usuario: ''
      }
  },
  computed: {
      formTitle () {
      return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
      }
  },
  watch: {
      '$route.params': {
          handler(newValue) {
              const { userName } = newValue

              this.listar()
          }
      }
  },
  created () {
    this.id_usuario = this.$store.state.usuario._id.id;
      this.listar()
  },
  methods: {
      listar(){ 
        axios.get('post/'+this.$route.params.id)
        .then(response =>{   
            this.respuesta= response.data;
        }) 
        .catch(error =>{
            console.log(error);  
            
        });  
      },
      agregar_comentario(){
        axios.post('comment/'+this.$route.params.id,{comentario: this.comentario_content,postedByName:  this.$store.state.usuario.nombre ,postedBy: this.$store.state.usuario._id.id})
        .then(respuesta =>{   
          this.comentario_content = '';
          this.listar(); 
        }) 
        .catch(error =>{
            console.log(error);  
            this.errorM=null;
            if (error.response.status==404){
                this.errorM='No existe el usuario o las credenciales son incorrectas.';
            } else{
                this.errorM='Ocurrió un error con el servidor.';
            }  
        }); 
      },
      eliminar_publicacion(id_publicacion){
        axios.delete('post/'+id_publicacion)
        .then(respuesta =>{  
          this.$router.push({name: 'home'}); 
        }) 
        .catch(error =>{
            console.log(error);  
            
        }); 
      }
  },
  filters: {
    moment: function (date) {
      return moment(date).locale('es').format('D MMMM YYYY, h:mm:ss a');
    }
  } 
} 
</script>
