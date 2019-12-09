<template>
    <v-layout align-center justify-center>
        <v-flex xs12>
            <h3 color="primary" style="margin-bottom:10px;">Usuarios</h3>
            <v-card 
            color="#fafafa"  
            style="margin-bottom:10px;"
            v-for="(user, index) in usuarios.slice(0, 8)" :key="index" 
             
            > 
            <v-container>
                <v-layout row no-gutters>
                    <v-flex md7>
                    {{user.nombre}}
                    </v-flex>
                    <v-flex md5>
                        <v-btn small color="primary">
                            Agregar
                        </v-btn> 
                    </v-flex>
                </v-layout> 
            </v-container>
            
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
                show:false
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