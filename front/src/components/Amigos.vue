<template>
    <v-layout align-center justify-center>
        <v-flex xs12>
            <h3 color="primary" style="margin-bottom:10px;">Usuarios</h3>
              
            
            <v-card 
            color="#fafafa"  
            style="margin-bottom:10px;"
            v-for="(user, index) in usuarios.slice(0, 8)" :key="index"
            > 
     {{index}}
            <div>
                {{user._id}}
            </div>
             <div>
                {{dato_usuario.conocidos}}
            </div>
       
         
                <div v-for="(user2, index2) in dato_usuario.conocidos" :key="index2">

                    <div v-if="user._id != dato_usuario.conocidos[index2] && user._id != id_usuario">
                         
                        <v-container>
                            <v-layout row no-gutters>
                                <v-flex md7>
                                {{user.nombre}}
                                </v-flex>
                                <v-flex md5>
                                    <v-btn small color="primary" @click="agregar_conocido(user._id)">
                                        Agregar
                                    </v-btn> 
                                </v-flex>
                            </v-layout> 
                        </v-container> 
                    </div>
                </div> 
                   <div v-if="!dato_usuario.conocidos.length">
                       <v-container>
                            <v-layout row no-gutters>
                                <v-flex md7>
                                {{user.nombre}}
                                </v-flex>
                                <v-flex md5>
                                    <v-btn small color="primary" @click="agregar_conocido(user._id)">
                                        Agregar
                                    </v-btn> 
                                </v-flex>
                            </v-layout> 
                        </v-container> 
                   </div>
    
            </v-card> 
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
                usuarios:[],
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
                dato_usuario: [],
                usuarios_disponibles:[],
                id_usuario: ''
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            }
        },
        watch: {
            dialog (val) {
            val || this.close()
            }
        },
        created () {
            this.id_usuario = this.$store.state.usuario._id.id;
            this.datos_usuario()
            this.listar() 
        },
        methods: {
            listar(){
                let me=this; 
                axios.get('users').then(function (response){ 
                    me.usuarios=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            datos_usuario(){
                let me=this; 
                axios.get('user/'+this.$store.state.usuario._id.id).then(function (response){ 
                    me.dato_usuario=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            agregar_conocido(idconocido){
                axios.post('conocido/'+this.id_usuario,{conocido: idconocido})
                .then(respuesta =>{ 
                    this.datos_usuario();   
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