<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="nombre" autofocus color="accent" label="Nombre" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="correo"  :rules="emailRules" color="accent" label="Email" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="password" 
                                    label="Password"
                                    required
                                ></v-text-field>
                            </v-col>
                             <v-col
                            cols="12"
                            md="6"
                            >
                            <v-text-field
                                v-model="repeat_password" 
                                label="Repeat Password"
                                required
                            ></v-text-field>
                            </v-col> 
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select
                                v-model="genero" 
                                label="Genero"
                                :items="items" 
                                data-vv-name="select"
                                required
                                ></v-select>
                            </v-col> 
                            <v-col cols="12" md="4">
                                
                            </v-col>
                            <v-col cols="12" md="4">
                                
                            </v-col>
                        </v-row>
                    </v-container> 
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="registrar()" color="primary">Registrarse</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
export default {
    data (){
        return{
            nombre: '',
            correo:'',
            password:'',
            repeat_password: '',
            errorM:null,
            genero: '',
            items: [
                'Hombre',
                'Mujer'
            ],
            emailRules: [
                v => !!v || 'Ingresa un correo',
                v => /.+@.+\..+/.test(v) || 'Formato de correo incorrecto...',
            ],
        }
    }, 
    methods:{
        registrar(){
            console.log(this.genero);
            console.log(this.correo);
       
            axios.post('user',{nombre: this.nombre, correo: this.correo, password: this.password, genero: this.genero, rol: 'usuario'})
            .then(respuesta =>{ 
                return respuesta.data;
            })
            .then(data =>{ 
                this.ingresar(this.correo, this.password);
                this.$router.push({name: 'login'});
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
        onEnter: function() { 
            this.registrar();
        },
        ingresar(correo, password){ 
            axios.post('login',{correo, password})
            .then(respuesta =>{ 
                return respuesta.data;
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.data.token);
                this.$router.push({name: 'home'});
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
    }
}
</script>

<style>

</style>