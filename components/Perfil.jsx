
import { useEffect, useState } from 'react';
import { View,Text,Image, TouchableOpacity } from 'react-native'
import imagen from '../assets/x_icon_imagen.png';
import { getNombre,getCorreo } from '../data/asyncStorageData.js';
import { check, openSettings, PERMISSIONS, request } from 'react-native-permissions';

const Perfil=({permitirEnviarUbicacion,secionIniciada,actualizar,tipoDePerfil,setLoguearse,setRegistrarse,
    setSecionIniciada,setTipoDeUsuario,activarPrecision,setActivarPrecision,tipoDeUsuario})=>{


    const [nombre,setnombre]=useState();
    const [correo,setcorreo]=useState();
    const [permisosEnSegundoPlano,setPermisosEnSegundoPlano]=useState('unavailable');

    const obteniendoElPermiso=async()=>{
        setPermisosEnSegundoPlano(await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));
    }

    useEffect(()=>{
        getNombre(setnombre);
        getCorreo(setcorreo);
        obteniendoElPermiso();
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
                <Text style={{color:'white',marginTop:'10%',fontSize:25}}>Ajustes</Text>
                <View style={{flexDirection:'row',height:100,alignItems:'center'}}>
                    <Image source={require('../assets/Sukuna.jpg')} style={{width:76,height:76,borderRadius:38}}/>

                <View>
                    <Text style={{color:'white',marginTop:'10%',fontSize:20,marginTop:0}}>{nombre}</Text>
                    <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0}}>{correo}</Text>
                </View>

                </View>                
            </View>
            <View style={{alignItems:'center'}}>
            <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}}>______________________________________</Text>

            {tipoDeUsuario=='Transportista' && <TouchableOpacity style={{flexDirection:'row',borderWidth:1.5,borderColor:'#f1f1f1',width:'70%'
            ,height:40,paddingBottom:0,borderRadius:10,marginBottom:8}}
                onPress={()=>{setActivarPrecision(!activarPrecision)}}>
                <Image source={(activarPrecision==true)?require('../assets/precisionGPS.jpg'):require('../assets/precisionGPSDesactivada.jpg')} 
                style={{width:35,height:35,borderRadius:18,marginTop:0, marginRight:20,marginLeft:10}}></Image>
                <Text style={[{marginTop:7,color:'white',fontSize:15}]}>{(activarPrecision==false)?"Activar precisión":"Desactivar precisión"}</Text>
            </TouchableOpacity>}

            <TouchableOpacity style={{borderWidth:1.5,borderColor:'#f1f1f1',width:'70%'
            ,height:40,paddingTop:8,paddingBottom:0,borderRadius:10,marginBottom:8,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15,height:20}}>Ver Ubicacion</Text>
            </TouchableOpacity>

            {tipoDeUsuario=='Transportista' && <TouchableOpacity
                style={{alignContent:'center',flexDirection:'column',alignItems:'center',alignSelf:'center'
                ,borderWidth:2.2,borderColor:'green',width:'70%',borderRadius:10,marginBottom:8,alignItems:'center'}}
                onPress={
                    async()=>{
                        if(permisosEnSegundoPlano=='granted'){
                            openSettings();
                            return;
                        }
                        setPermisosEnSegundoPlano(await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));
                        
                        if(permisosEnSegundoPlano=='blocked' || permisosEnSegundoPlano=='denied'){
                            openSettings();
                        }
                    }
                }
                >
                <Text style={[{color:'white',marginTop:'10%',fontSize:15,marginTop:0,textAlign:'center'}]}>{"Permisos para enviar ubicacion siempre: "}</Text>
                
                <Text style={[{color:'green',fontSize:15,marginTop:1,marginBottom:8},permisosEnSegundoPlano!='granted' && {color:'red'}]}>{permisosEnSegundoPlano!='granted'?"Desativado":"Activado"}</Text>

            </TouchableOpacity>}

            <TouchableOpacity style={{borderWidth:2.2,width:'70%',borderRadius:10
                ,marginBottom:8,height:40,paddingTop:8,borderColor:'white',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15}}>Cambiar Contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,height:40,paddingTop:8,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15}}>Ajustes</Text>
            </TouchableOpacity>

            <Text style={{color:'white',fontSize:15,marginTop:0,marginBottom:8}}>______________________________________</Text>
            
            <TouchableOpacity style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,marginBottom:8,height:40,paddingTop:8,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15}}>Contactanos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,marginBottom:8,height:40,paddingTop:8,alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15}} onPress={()=>{
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

            {secionIniciada==false && <TouchableOpacity
                style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,marginBottom:8,height:40,paddingTop:8,alignItems:'center'}}
                >
                <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:10}} onPress={()=>{
                setRegistrarse(true);
                }}>Registrarse</Text>
            </TouchableOpacity>}

            <Text style={{color:'white',marginTop:'10%',fontSize:15,marginTop:0,marginBottom:20}}>______________________________________</Text>            

            </View>
            
        </View>
        </View>
    )
}


export default Perfil
