<template>
    <v-layout align-center justify-center>
        <v-flex xs9> 
          
                <v-layout row no-gutters>
                    <v-flex md12 style="margin-bottom:50px;">
                      <v-textarea
                        class="ma-0 pa-0"
                        name="input-7-1"
                        v-model="publicacion_content"
                        filled
                        label="Publicacion"
                         :rules="['Required']" 
                        >
                      </v-textarea>
 
                       
                      <v-layout row no-gutters>
                    <v-flex md7>
                      <v-combobox multiple
                                v-model="Publicacion_Tags" 
                                label="Tags" 
                                append-icon
                                chips
                                deletable-chips
                                class="tag-input"
                                :rules="['Required']" 
                                :search-input.sync="search">
                      </v-combobox> 
                    </v-flex>
                     <v-flex md3>
                       <v-switch

                        v-model="isPublic"
                        :label="`Publico`"
                      ></v-switch>
                    </v-flex>
                    <v-flex md2>
                       <v-btn @click="agregar_publicacion()" small color="primary">
                            Agregar
                        </v-btn> 
                    </v-flex>
                      </v-layout>
                       
                       
                    </v-flex>
                    <v-flex md12>
                         
                    </v-flex>
                </v-layout>  
<v-card
      class="mx-auto"
      color="#fafafa"  
      style="margin-bottom:20px;"
      v-for="(post, index) in categorias" :key="index"
    > 
     <v-card-title>
       <span class="headline"> 
        {{post.postedByDetails.nombre}}
      </span> 
       <v-spacer></v-spacer> 
     <v-row
            align="center"
            justify="end"  
            v-if="post.postedBy == id_usuario"
          > 
                  <v-btn icon @click="eliminar_publicacion(post._id)"> 
                  <v-icon class="mr-1" >mdi-delete</v-icon>  
                </v-btn> 
     </v-row>
     </v-card-title>
        
      <v-card-subtitle>
      {{post.createdAt | moment }}
      </v-card-subtitle>
      <div style="margin:20px; font-weight:bold; font-size:30px;">
        {{post.content}}
      </div>
      <v-card-actions>
        <v-list-item class="grow"> 
  
          <v-list-item-content>
            <div id="chip-usage-example">

              <v-chip style="margin:3px;" v-for="(tag, index) in post.tags" :key="index" :to="{name: 'tag', params: { tag: tag }}">{{tag}}</v-chip>
            </div> 
          </v-list-item-content>
  
          <v-row
            align="center"
            justify="end"
          > 
          <v-btn :to="{name: 'publicacion', params: { id: post._id }}" text>
             <v-icon class="mr-1">mdi-comment</v-icon>
            <span class="subheading mr-2">{{post.comentarios.length}}</span> 
          </v-btn>
            
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card> 
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
import moment from 'moment' 
import {bus} from '../main' 
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
                adNombre:'',
                adId:'',
                show:false,
                publicacion_content:'',
                Publicacion_Tags: [],
                dialog: false,
                id_usuario: '',
                isPublic: true
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            },
            
        },
        watch: {
            dialog (val) {
            val || this.close()
            }
        },
        created () {
          this.id_usuario = this.$store.state.usuario._id.id
            this.listar()
        },
        methods: {
            listar(){
                let me=this; 
                axios.get('posts').then(function (response){ 
                    me.categorias=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            agregar_publicacion(){ 
              axios.post('post',{content: this.publicacion_content,public:this.isPublic, postedByDetails: {nombre: this.$store.state.usuario.nombre },postedBy: this.$store.state.usuario._id.id, tags: this.Publicacion_Tags})
              .then(respuesta =>{  
                this.$router.push({name: 'publicacion', params: { id: respuesta.data._id }}); 
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
                this.listar();
              }) 
              .catch(error =>{
                  console.log(error);  
                  
              }); 
            }
        },
        filters: {
          moment: function (date) {
            return moment(date).locale('es').format('D MMMM YYYY, h:mm a');
          }
        } 
    } 
</script>

<style>

</style>