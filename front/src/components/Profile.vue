<template> 
    <v-layout align-center justify-center> 
        <v-flex xs9>
            <h2 style="margin-bottom:10px;">Profile de: {{profile.nombre}}</h2> 
            <div v-if="categorias.length > 0">
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
            </div>
            <div v-else>
                <h3>No hay posts</h3>
            </div>
        </v-flex>
    </v-layout>
</template>
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
                adNombre:'',
                adId:'',
                show:false,
                profile: [],
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
            this.listar();
            this.getProfile();
        },
        methods: {
            listar(){
                let me=this; 
                axios.get('posts/'+this.$route.params.id).then(function (response){
                    me.categorias=response.data;
                }).catch(function(error){
                    console.log(error);
                }); 
            },
            getProfile(){
                let me=this; 
                axios.get('user/'+this.$route.params.id).then(function (response){
                    me.profile=response.data;
                }).catch(function(error){
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