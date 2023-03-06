
//NUEVA ACTUALIZACION 18-1-23 El endpoint devuelve solo lo necesario del usuario transporte
//debes actualizar el state de usuariotransporte a los datos necesarios de NUsuarioTransporte

import { useState,useEffect } from "react";
import { View } from "react-native"
import { getPermitirEnvio, setPermitirEnvio } from "../data/asyncStorageData.js";
import Fab from "./Fab.jsx";


const IconosDeNavegacion=({setPermitirEnviarUbicacion,idUsuarioIniciado,setMostrarUsuarios,setVerTransportistasPorLaDerecha,
    setVerTransportistasPorLaIzquierda,serMostrarParadas,obtenerRutas,   
    identificadorKey,setVerCompetencia,setOcultarTrayecto,setVerRutasCercanas,
    verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda,idRutaAMostrar,mostrarUsuarios,permitirEnviarUbicacion,
    tipoDeUsuario,mostrarParadas,mostrarItemMenuUno,verTrayectoria,verCompetencia,verRutasCercanas,centrePosition,siguiendoAlUsuario,
    askLocationPermission,followUseLocation, stopFollowUserLocation,permitirSeguirPasajero, setPermitirSeguirPasajero,setVerTrayectoria,
    ocultarTrayecto,permisos,askLocationPermissionSetting, setUsuarioTransportista,setCargando,emailState, tokenState,setMostrarAlerte, 
    setMensajeAlerta,setMostrarComprasPasajeros,tipoDeSubscripcion
    })=>{

        // useEffect(()=>{
        //     if(tipoDeUsuario=='Transportista'){
        //         getPermitirEnvio(setPermitirEnviarUbicacion);
        //     }
        // },[tipoDeUsuario])

    
    return(    
        <View style={{position:'absolute',zIndex:200,bottom:0,right:10}}>
        <View style={{position:'absolute',zIndex:200,bottom:18,right:10,
            alignItems:'flex-end',flexDirection:'column-reverse'}}>

            {permitirEnviarUbicacion==false && tipoDeUsuario=="Transportista" && <Fab 
                onPres={async()=>{
                    setCargando(true);
                    if(permisos!='granted'){
                        setCargando(false);
                        askLocationPermission();
                        askLocationPermissionSetting();
                        return;
                    }
                    
                    if(idUsuarioIniciado<0){
                        setMensajeAlerta("Vuelve a iniciar sesión");
                        setMostrarAlerte(true);
                        setCargando(false);
                        return;
                    }
                    //let usuarioTransportista= await fetch('https://georutas.somee.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>dat=res.json());
                    let usuarioTransportista={};
                    try{
                        usuarioTransportista= await fetch('https://www.georutas.lat/api/NUsuariosTransporte/'+idUsuarioIniciado.toString()+'?Email='+emailState+'&Token='+tokenState).then(res=>dat=res.json());
                    }catch{
                        usuarioTransportista={};
                    }
                    
                    if(usuarioTransportista=={} || usuarioTransportista.id_Ruta==null){    
                        setMensajeAlerta("Has perdido tu usuario, vuelve a iniciar sesión");
                        setMostrarAlerte(true);                    
                        setCargando(false);
                        return;
                    }
                    followUseLocation(25);
                


                //let datos=await fetch('https://georutas.somee.com/api/UsuariosTransporte',{
                    try{
                        let datos=await fetch('https://www.georutas.lat/api/NUsuariosTransporte?Email='+emailState+'&Token='+tokenState,
                        {
                            method:"PUT",
                            headers:{
                                "Content-Type":"application/json",
                                },
                                body:JSON.stringify(
                                    {
                                        id_UsuarioTransporte: idUsuarioIniciado,
                                        id_Tipo_Transporte: 1,
                                        id_Ruta: usuarioTransportista.id_Ruta,
                                        longitude: usuarioTransportista.longitude,
                                        latitude: usuarioTransportista.latitude,
                                        longitudeAnterior: usuarioTransportista.longitudeAnterior,
                                        latitudeAnterior: usuarioTransportista.latitudeAnterior,
                                        estado: 'A',
                                        direccion: 'I'
                                    })
                            });
        
                            let json=null;
        
                            if(datos.ok){
                                try{
                                    json=await datos.json();
                                }catch{
                                    json=null;
                                }
        
                                if(json==null){
                                    setMensajeAlerta("Tu conexión a internet es inestable");
                                    setMostrarAlerte(true);
                                    setCargando(false);
                                }else if(json.id_UsuarioTransporte==0){
                                    setMensajeAlerta("Tu conexión a internet es inestable");
                                    setMostrarAlerte(true);
                                    setCargando(false);
                                }
                                
                            }else{
                                setMensajeAlerta("Tu conexión a internet es inestable");
                                setMostrarAlerte(true);
                                setCargando(false);
                            }
        
        
                    }catch{
                        setMensajeAlerta("Tu conexión a internet es inestable");
                        setMostrarAlerte(true);  
                        setCargando(false);                     
                    }

                    setUsuarioTransportista({
                        id_UsuarioTransporte:idUsuarioIniciado,
                        id_Tipo_Transporte:1,
                        id_Ruta:usuarioTransportista.id_Ruta,
                        longitude:usuarioTransportista.longitude,
                        latitude:usuarioTransportista.latitude,
                        longitudeAnterior:usuarioTransportista.longitudeAnterior,
                        latitudeAnterior:usuarioTransportista.latitudeAnterior,
                        estado:"A",
                        direccion:usuarioTransportista.direccion
                    });

                    setPermitirEnvio("true");
                    setPermitirEnviarUbicacion(true);
                    setCargando(false);
                }
            }
                imagen={require('../assets/ocultarUbicacionTransportista.png')}
            />}


            
            {permitirEnviarUbicacion==true && tipoDeUsuario=="Transportista" && <Fab 
                onPres={async()=>{
                    setCargando(true);
                    setPermitirEnviarUbicacion(false);
                    setPermitirEnvio("false");
                    if(idUsuarioIniciado<0){
                        setMensajeAlerta("Vuelve a iniciar sesión");
                        setMostrarAlerte(true);
                        setCargando(false);
                        return;
                    }
                    //let usuarioTransportista= await fetch('https://georutas.somee.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>dat=res.json())
                    let usuarioTransportista={};
                    try{
                        usuarioTransportista= await fetch('https://www.georutas.lat/api/NUsuariosTransporte/'+idUsuarioIniciado.toString()+'?Email='+emailState+'&Token='+tokenState).then(res=>dat=res.json());
                    }catch{
                        usuarioTransportista={};
                    }

                    if(usuarioTransportista=={} || usuarioTransportista.id_Ruta==null){
                        setCargando(false);
                        return;
                    }
                    stopFollowUserLocation();

                    //let datos=await fetch('https://georutas.somee.com/api/UsuariosTransporte',{

                    try{
                        let datos=await fetch('https://www.georutas.lat/api/NUsuariosTransporte?Email='+emailState+'&Token='+tokenState,
                        {
                            method:"PUT",
                            headers:{
                                "Content-Type":"application/json",
                                },
                                body:JSON.stringify(
                                    {
                                        id_UsuarioTransporte: idUsuarioIniciado,
                                        id_Tipo_Transporte: 1,
                                        id_Ruta: usuarioTransportista.id_Ruta,
                                        longitude: usuarioTransportista.longitude,
                                        latitude: usuarioTransportista.latitude,
                                        longitudeAnterior: usuarioTransportista.longitudeAnterior,
                                        latitudeAnterior: usuarioTransportista.latitudeAnterior,
                                        estado: 'I',
                                        direccion: 'I'
                                    })
                            });
        
                            let json=null;
        
                            if(datos.ok){
                                try{
                                    json=await datos.json();
                                }catch{
                                    json=null;
                                }
        
                                if(json==null){
                                    setMensajeAlerta("Tu conexión a internet es inestable");
                                    setMostrarAlerte(true);
                                }else if(json.id_UsuarioTransporte==0){
                                    setMensajeAlerta("Tu conexión a internet es inestable");
                                    setMostrarAlerte(true);
                                }
                                
                            }else{
                                setMensajeAlerta("Tu conexión a internet es inestable");
                                setMostrarAlerte(true);
                            }
        
        
                    }catch{
                        setMensajeAlerta("Tu conexión a internet es inestable");
                        setMostrarAlerte(true);
                    }

                        
                        setUsuarioTransportista({
                            id_UsuarioTransporte:idUsuarioIniciado,
                            id_Tipo_Transporte:1,
                            id_Ruta:usuarioTransportista.id_Ruta,
                            longitude:usuarioTransportista.longitude,
                            latitude:usuarioTransportista.latitude,
                            longitudeAnterior:usuarioTransportista.longitudeAnterior,
                            latitudeAnterior:usuarioTransportista.latitudeAnterior,
                            estado:"I",
                            direccion:usuarioTransportista.direccion
                        });
                        setCargando(false);
                }}
                imagen={require('../assets/ubicacionTransportista.png')}
            />}


            
             {permitirSeguirPasajero==false && tipoDeUsuario=="Pasajero" && <Fab 
                onPres={async()=>{
                    setCargando(true);
                    if(permisos!='granted'){
                        setCargando(false);
                        askLocationPermission();
                        askLocationPermissionSetting();
                        return;
                    }
                    followUseLocation(25);
                    setPermitirSeguirPasajero(true);
                    setCargando(false);
                }}
                imagen={require('../assets/ocultarUbicacionTransportista.png')}
            />} 


            
            {permitirSeguirPasajero==true && tipoDeUsuario=="Pasajero" && <Fab 
                onPres={async()=>{
                    setCargando(true);
                    stopFollowUserLocation();
                    setPermitirSeguirPasajero(false);
                    setCargando(false);
                }}
                imagen={require('../assets/ubicacionTransportista.png')}
            />} 


            
            {idRutaAMostrar>0 && mostrarUsuarios==false && <Fab 
                onPres={()=>{
                    setCargando(true);
                    setMostrarUsuarios(true);
                    setVerTransportistasPorLaDerecha(true);
                    setVerTransportistasPorLaIzquierda(true);
                    setCargando(false);
                }}
                imagen={require('../assets/noVerUsuarios.png')}                
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && <Fab 
                onPres={()=>{
                    setCargando(true);
                    setMostrarUsuarios(false);
                    setCargando(false);
                }}
                imagen={require('../assets/verUsuarios.png')}                
            />}


            
            {idRutaAMostrar>0 && mostrarParadas==false && <Fab 
                onPres={()=>{
                    setCargando(true);
                    serMostrarParadas(true);
                    setCargando(false);
                }}
                imagen={require('../assets/noVerParadas.jpg')}
            />}


            
            {idRutaAMostrar>0 && mostrarParadas==true && <Fab 
                onPres={()=>{
                    setCargando(true);
                    serMostrarParadas(false);
                    setCargando(false);
                }}
                imagen={require('../assets/verParadas.jpg')}
            />}

                {tipoDeUsuario=='Transportista' && mostrarItemMenuUno==true && verCompetencia==false && <Fab
                    onPres={()=>{   
                        setCargando(true);             
                        setVerCompetencia(true);
                        setOcultarTrayecto(false);
                        setCargando(false);
                        setMensajeAlerta("Para mayor comodidad elija a su competencia");
                        setMostrarAlerte(true);
                    }}
                    imagen={require('../assets/noVerUsuariosblue.png')}
                />}

                
                {tipoDeUsuario=='Transportista' && mostrarItemMenuUno==true && verCompetencia==true && <Fab
                    onPres={()=>{
                        setCargando(true);
                        setVerCompetencia(false);
                        setCargando(false);
                    }}
                    imagen={require('../assets/verUsuariosblue.png')}
                />}
                
                {tipoDeUsuario=='Pasajero' && mostrarItemMenuUno==true && verRutasCercanas==false && <Fab 
                    onPres={()=>{
                        setCargando(true);
                        setVerRutasCercanas(true); 
                        setOcultarTrayecto(false);
                        setCargando(false);
                        setMensajeAlerta("Para mejor comodidad, elija sus rutas favoritas en ajustes y muestre su ubicación");
                        setMostrarAlerte(true); 
                        if(tipoDeSubscripcion=='C'){
                            setMostrarComprasPasajeros(true);
                        }
                    }}
                        imagen={require('../assets/noVerUsuariosblue.png')}
                />}

                
                {tipoDeUsuario=='Pasajero' && mostrarItemMenuUno==true && verRutasCercanas==true && <Fab
                    onPres={()=>{
                        setCargando(true);
                        setVerRutasCercanas(false);
                        setCargando(false);
                    }}                
                    imagen={require('../assets/verUsuarios.png')}
                />}

                {ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && tipoDeUsuario=="Transportista" && <Fab
                    onPres={()=>{                
                        setCargando(true);
                        obtenerRutas(identificadorKey.current);   

                        setVerTrayectoria(true);
                        setVerRutasCercanas(false);  
                        setVerCompetencia(false);    
                        setOcultarTrayecto(true);   
                        setCargando(false);
                    }}
                        imagen={require('../assets/cambioDetrayectoriaCero.jpg')}
                />}

                {ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && tipoDeUsuario=="Pasajero" && <Fab
                    onPres={()=>{                
                        setCargando(true);
                        obtenerRutas(identificadorKey.current);   
                        
                        setVerTrayectoria(true);                           
                        setVerRutasCercanas(false);  
                        setVerCompetencia(false);    
                        setOcultarTrayecto(true);  
                        setCargando(false);
                    }}

                        imagen={require('../assets/cambioDetrayectoriaCero.jpg')}
                />}

                
                { (tipoDeUsuario=="Pasajero" || tipoDeUsuario=="Transportista") && (permitirSeguirPasajero==true || permitirEnviarUbicacion==true) &&
                    <Fab
                    onPres={()=>{
                        setCargando(true);
                        centrePosition();
                        setCargando(false);
                    }}
                    imagen={require('../assets/tuUbicacioncopia.png')}
                >
                </Fab>}

        </View>

        <View style={{position:'absolute',zIndex:200,bottom:18,right:51,
        alignItems:'flex-end',flexDirection:'column-reverse'}}>

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaIzquierda==false && <Fab 
                onPres={()=>{
                    setCargando(true);
                    setVerTransportistasPorLaIzquierda(true);
                    setCargando(false);
                }}
                imagen={require('../assets/DireccionDeTransportistasIzquierdaNegada.png')}
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaIzquierda==true && <Fab 
                onPres={()=>{
                    setCargando(true);
                    setVerTransportistasPorLaIzquierda(false);
                    if(verTransportistasPorLaDerecha==false){
                        setMostrarUsuarios(false);
                    }
                    setCargando(false);
                }}
                imagen={require('../assets/DireccionDeTransportistasIzquierda.png')}
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaDerecha==false && <Fab 
                onPres={()=>{
                    setCargando(true);
                    setVerTransportistasPorLaDerecha(true);
                    setCargando(false);
                }}
                imagen={require('../assets/DireccionDeTransportistasDerechaNegada.png')}
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaDerecha==true && <Fab 
                onPres={()=>{
                    setCargando(true);
                    setVerTransportistasPorLaDerecha(false);
                    if(verTransportistasPorLaIzquierda==false){
                        setMostrarUsuarios(false);
                    }
                    setCargando(false);
                }}
                imagen={require('../assets/DireccionDeTransportistasDerecha.png')}
            />}
        </View>
    </View>
    )
}

export default IconosDeNavegacion