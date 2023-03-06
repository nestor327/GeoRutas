
import { useEffect, useState } from 'react';
import { View,Text,Image, TouchableOpacity, ScrollView, TextInputBase } from 'react-native'
import imagen from '../assets/x_icon_imagen.png';
import { getNombre,getCorreo, setTokenGeoRutasCode } from '../data/asyncStorageData.js';
import { check, openSettings, PERMISSIONS, request } from 'react-native-permissions';
import RutasBarItem from './RutasBarItem';
import ParadasFavoritas from './ParadasFavoritas';
import { getRutasFavoritas,setRutasFavoritas } from '../data/asyncStorageData.js';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Perfil=({permitirEnviarUbicacion,secionIniciada,actualizar,tipoDePerfil,setLoguearse,setRegistrarse,
    setSecionIniciada,setTipoDeUsuario,activarPrecision,
    setActivarPrecision,tipoDeUsuario,permisosEnSegundoPlano,setPermisosEnSegundoPlano,
    todasLasRutasCompetencia, rutasSeleccionadasCompetencia,setTodasLasRutasCompetencia, 
    setRutasSeleccionadasCompetencia, tipoDeSubscripcion,setVerAdministrarUsuarios,setCambiarPassword,
    setEditarPerfil,registrarse,setMostrarAlerte,setMensajeAlerta,setMostrarAnuncioCompleto,
    setMostrarAnuncioRewarded,width,setEliminarAnuncios,height,setMostrarComprasPasajeros,
    VERSIONDELAPLICACION})=>{


    const [nombre,setnombre]=useState();
    const [correo,setcorreo]=useState();
    const [mostrarMenu, setMostrarMenu]=useState(false);
    const [arregloDeValores, setArregloDeValores]=useState([]);
    const [arregloDeParadasFavoritasMomentaneo,setArregloDeParadasFavoritasMomentaneo]=useState([]);

    const obteniendoElPermiso=async()=>{
        setPermisosEnSegundoPlano(await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));
    }

    useEffect(()=>{
        getNombre(setnombre);
        getCorreo(setcorreo);
        obteniendoElPermiso();
        getRutasFavoritas(setArregloDeValores);
        getRutasFavoritas(setArregloDeParadasFavoritasMomentaneo);        
    },[registrarse])

    useEffect(()=>{
        if(arregloDeValores==undefined || arregloDeValores.length==0 || arregloDeValores==null){
            let arreglo=[];
            for(let i=0;i<45;i++){
                arreglo.push("✓");
            }
            setArregloDeValores(arreglo);
            setRutasSeleccionadasCompetencia(arreglo);
            setArregloDeParadasFavoritasMomentaneo(arreglo);
        }else{
            setRutasSeleccionadasCompetencia(arregloDeValores);            
        }
        
    },[arregloDeValores])

    return(
        <View style={[tipoDePerfil[0].principal]}>

        <View style={{backgroundColor:'#101038',height:'90%',width:'90%',position:'absolute',top:'5%',left:'5%',zIndex:190}}>
            <View style={{position:'absolute',zIndex:250,height:50,width:50,left:'85%',top:'3%'}} onTouchEnd={()=>{
                actualizar('none');
            }}>
             <Image source={imagen} style={{width:35,height:35, tintColor:'#f1f1f1'}}></Image>
            </View>            
            <View style={{alignItems:'center',height:(height>width)?'35%':width*0.35}}>
                <Text style={{color:'white',marginTop:(height>width)?'10%':'5%',fontSize:25}}>Ajustes</Text>
                <View style={{flexDirection:'column',height:100,alignItems:'center'}}>
                    {/* <Image source={require('../assets/Sukuna.jpg')} style={{width:76,height:76,borderRadius:38}}/> */}
                    <Image source={require('../assets/ajustes.png')} style={{width:(height>width)?width*0.2:height*0.2,
                        height:(height>width)?width*0.2:height*0.2,borderRadius:(height>width)?width*0.1:height*0.1}}/>
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:20,marginTop:0}}>{(nombre!='Desconocido')?nombre:"Nombre desconocido"}</Text>
                        {mostrarMenu==false && <Text style={{color:'white',fontSize:15,marginTop:0,marginBottom:10}}>{(correo!=undefined && !correo.toString().toLowerCase().includes("@gmail.comfb"))?correo:""}</Text>}
                        <Text style={{color:'white',marginTop:0,fontSize:15,marginBottom:10}}>______________________________________</Text>
                    </View>

                </View>
            </View>

            <View style={{flex:1}}>            
            <View style={{alignItems:'center'}}>
            

            {tipoDeUsuario=='Transportista' && <TouchableOpacity style={{flexDirection:'row',borderWidth:1.5,borderColor:'#f1f1f1',width:'70%'
            ,height:40,paddingBottom:0,borderRadius:10,marginBottom:8}}
                onPress={()=>{setActivarPrecision(!activarPrecision)}}>
                <Image source={(activarPrecision==true)?require('../assets/precisionGPS.jpg'):require('../assets/precisionGPSDesactivada.jpg')} 
                style={{width:35,height:35,borderRadius:18,marginTop:0, marginRight:20,marginLeft:10}}></Image>
                <Text style={[{marginTop:7,color:'white',fontSize:15}]}>{(activarPrecision==false)?"Activar precisión":"Desactivar precisión"}</Text>
            </TouchableOpacity>}

            {secionIniciada==true && tipoDeSubscripcion!="S" && tipoDeSubscripcion!='K' && <TouchableOpacity style={{borderWidth:1.5,borderColor:'#f1f1f1',width:'70%'
            ,height:40,paddingTop:8,paddingBottom:0,borderRadius:10,marginBottom:8,alignItems:'center'}}
            onPressOut={()=>{
                setRegistrarse(true);
                setEditarPerfil(true);
            }}
            >
                <Text style={{color:'white',fontSize:15,height:20}}>Editar Perfil</Text>
            </TouchableOpacity>}

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
                ,marginBottom:8,height:40,paddingTop:8,borderColor:'white',alignItems:'center'}}
                onPressOut={()=>{
                    setCambiarPassword(true);
                }}
                >
                <Text style={{color:'white',fontSize:15}}>Cambiar Contraseña</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,height:40,paddingTop:8,alignItems:'center'}}
                onPress={()=>{
                    setMostrarMenu(true);
                    getRutasFavoritas(setArregloDeValores);

                }}
                >
                <Text style={{color:'white',fontSize:15}}>{(tipoDeUsuario=='Transportista')?"Seleccionar Competencia":"Seleccionar Favoritas"}</Text>
                
            </TouchableOpacity>

            {mostrarMenu==true && 
            <View style={[{backgroundColor:'#103070',marginTop:'-80%',width:'79%',height:'60%',marginBottom:'40%'}
                ,tipoDeUsuario=='Pasajero' && {marginTop:'-45%'}]}>
                <View style={{alignItems:'center',flexDirection:'row'}}>
                    
                    <Text style={{color:'#f1f1f1',flex:1,textAlign:'center',fontSize:23,margin:'6%',marginLeft:'10%'}}>{(tipoDeUsuario=='Transportista')?"Competencia":"Favoritas"}</Text>
                    
                    <TouchableOpacity
                        onPress={()=>{
                            setMostrarMenu(false);
                        }}
                    >
                        <Image source={imagen} style={{width:32,height:32, tintColor:'#f1f1f1',margin:'2.5%',marginTop:0}}></Image>
                    </TouchableOpacity>

                </View>

                    <ParadasFavoritas setArregloDeValores={setArregloDeValores} 
                    todasLasRutasCompetencia={todasLasRutasCompetencia} 
                    arregloDeValores={arregloDeValores}></ParadasFavoritas>
                        
                        <View style={{flexDirection:'row',paddingTop:20,marginHorizontal:15}}>

                            <TouchableOpacity style={{marginHorizontal:15,height:40
                            ,borderColor:'#f1f1f1',borderWidth:2,alignItems:'center',marginBottom:10,paddingHorizontal:10,flex:1,
                            borderRadius:10}}
                                onPress={()=>{
                                    setRutasSeleccionadasCompetencia(arregloDeValores);
                                    setArregloDeParadasFavoritasMomentaneo(arregloDeValores);
                                    setRutasFavoritas(JSON.stringify(arregloDeValores));
                                    setMostrarMenu(false)
                                }}
                            >
                                <Text style={{color:'#f1f1f1',textAlignVertical:'center',height:'100%'}}>Aceptar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginHorizontal:15,height:40,flex:1,
                            borderColor:'#f1f1f1',borderWidth:2,alignItems:'center',marginBottom:10,paddingHorizontal:10,
                            borderRadius:10}}
                            onPress={()=>{
                                //setArregloDeValores(arregloDeParadasFavoritasMomentaneo);
                                getRutasFavoritas(setArregloDeValores);
                                setMostrarMenu(false)
                            }}>
                                <Text style={{color:'#f1f1f1',textAlignVertical:'center',height:'100%'}}>Cancelar</Text>
                            </TouchableOpacity>
                        
                        </View>


                </View>}

            <Text style={{color:'white',fontSize:15,marginTop:0,marginBottom:8}}>______________________________________</Text>
            
            {tipoDeSubscripcion=='S' && <TouchableOpacity style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,marginBottom:8,height:40,paddingTop:8,alignItems:'center'}}
                onPressOut={()=>{
                    setVerAdministrarUsuarios(true);
                }}
                >
                <Text style={{color:'white',fontSize:15}}>Administra tus Usuarios</Text>
            </TouchableOpacity>}

            <TouchableOpacity style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,marginBottom:8,height:40,paddingTop:8,alignItems:'center'}}
                onPress={()=>{
                    if(secionIniciada==true){
                        if(permitirEnviarUbicacion==true){
                            setMensajeAlerta("Antes debes dejar de compartir tu ubicación");
                            setMostrarAlerte(true);
                            return;
                        }
                        setSecionIniciada(false);
                        setTipoDeUsuario("Ninguno");
                        setTokenGeoRutasCode("");
                        setLoguearse(true);                        
                    }else{
                        setLoguearse(true);
                    }
                    }}>
                <Text style={{color:'white',fontSize:15}}>{(secionIniciada==true)?"Cerrar secion":"Iniciar secion"}</Text>
            </TouchableOpacity>

            {secionIniciada==false && <TouchableOpacity
                style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,marginBottom:8,height:40,alignItems:'center',justifyContent:'center'}}
                >
                <Text style={{color:'white',fontSize:15}} onPress={()=>{
                setRegistrarse(true);
                }}>Registrarse</Text>
            </TouchableOpacity>}
            {tipoDeSubscripcion=='C' && tipoDeUsuario=='Pasajero' && <TouchableOpacity
                style={{borderWidth:2.2,borderColor:'white',width:'70%',borderRadius:10
                ,height:40,alignItems:'center',justifyContent:'center'}}
                >
                <Text style={{color:'white',fontSize:15}} onPress={()=>{
                setMostrarComprasPasajeros(true);
                setEliminarAnuncios(true);
                }}>Eliminar Anuncios</Text>
            </TouchableOpacity>}
            <Text style={{color:'white',fontSize:15,marginTop:0,marginBottom:8}}>______________________________________</Text>
            {((tipoDeSubscripcion=='C' || tipoDeSubscripcion=='B') && tipoDeUsuario=='Pasajero') && <View style={{alignItems:'center',justifyContent:'center'}}>
                <BannerAd 
                size={BannerAdSize.BANNER} 
                unitId={'ca-app-pub-1889500700036964/3903849703'}
                //unitId={TestIds.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly:true
                }}
                />
            </View>}
            </View>
            </View>
            
        </View>
        </View>
    )
}


export default Perfil
