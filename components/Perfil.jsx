
import { useEffect, useState } from 'react';
import { View,Text,Image, TouchableOpacity } from 'react-native'
import imagen from '../assets/x_icon_imagen.png';
import { getNombre,getCorreo } from '../data/asyncStorageData.js';

const Perfil=({permitirEnviarUbicacion,secionIniciada,actualizar,tipoDePerfil,setLoguearse,setRegistrarse,setSecionIniciada,setTipoDeUsuario})=>{


    const [nombre,setnombre]=useState();
    const [correo,setcorreo]=useState();

    useEffect(()=>{
        getNombre(setnombre);
        getCorreo(setcorreo);
    },[])
    return(
        <View style={[tipoDePerfil[0].principal]}>

        <View style={{backgroundColor:'#101038',height:'87%',width:'90%',position:'absolute',top:'5%',left:'5%',zIndex:190}}>
            <View style={{position:'absolute',zIndex:250,height:50,width:50,left:'85%',top:'3%'}} onTouchEnd={()=>{
                actualizar('none');                         
                
            }}>
             <Image source={imagen} style={{width:35,height:35, tintColor:'#f1f1f1'}}></Image>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={{color:'white',marginTop:'10%',fontSize:25}}>GeoRutas</Text>
                <View style={{flexDirection:'row',height:100,alignItems:'center'}}>
                    <Image source={require('../assets/Sukuna.jpg')} style={{width:76,height:76,borderRadius:38, marginRight:20}}/>

                <View>
                    <Text style={{color:'white',marginTop:'10%',fontSize:20,marginTop:0}}>{nombre}</Text>
                    <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0}}>{correo}</Text>
                </View>

                </View>                
            </View>
            <View style={{alignItems:'center'}}>
            <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}}>______________________________________</Text>
            
            <TouchableOpacity>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}}>Ver Ubicacion</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0, marginBottom:10}}>Cambiar Contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}}>Ajustes</Text>
            </TouchableOpacity>

            <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:20}}>______________________________________</Text>
            
            <TouchableOpacity>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}}>Contactanos</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}} onPress={()=>{
                if(secionIniciada==true){
                    if(permitirEnviarUbicacion==true){
                        alert("Antes debes dejar de compartir tu ubicacion")
                        return;
                    }
                    setSecionIniciada(false);
                    setTipoDeUsuario("Ninguno");
                    setLoguearse(true);
                }else{
                    setLoguearse(true);
                }
                }}>{(secionIniciada==true)?"Cerrar secion":"Iniciar secion"}</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}} onPress={()=>{
                setRegistrarse(true);
                }}>Registrarse</Text>
            </TouchableOpacity>

            <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:20}}>______________________________________</Text>
            
            <View style={{alignItems:'center'}}>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0}}>CEO: Nestor Gonzalez</Text>
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0}}>Contacto: nestorgt37@gmail.com</Text>
            </View>

            </View>
            
        </View>
        </View>
    )
}


export default Perfil
