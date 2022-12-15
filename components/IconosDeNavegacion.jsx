import { useState,useEffect } from "react";
import { Alert, View } from "react-native"
import { getPermitirEnvio, setPermitirEnvio } from "../data/asyncStorageData.js";
import Fab from "./Fab.jsx";


const IconosDeNavegacion=({setPermitirEnviarUbicacion,idUsuarioIniciado,setMostrarUsuarios,setVerTransportistasPorLaDerecha,
    setVerTransportistasPorLaIzquierda,serMostrarParadas,obtenerRutas,   
    identificadorKey,setVerCompetencia,setOcultarTrayecto,setVerRutasCercanas,
    verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda,idRutaAMostrar,mostrarUsuarios,permitirEnviarUbicacion,
    tipoDeUsuario,mostrarParadas,mostrarItemMenuUno,verTrayectoria,verCompetencia,verRutasCercanas,centrePosition,siguiendoAlUsuario,
    askLocationPermission,followUseLocation, stopFollowUserLocation,permitirSeguirPasajero, setPermitirSeguirPasajero,setVerTrayectoria,
    ocultarTrayecto,permisos,askLocationPermissionSetting, setUsuarioTransportista
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

                    if(permisos!='granted'){
                        askLocationPermission();
                        askLocationPermissionSetting();
                        return;
                    }
                    
                    if(idUsuarioIniciado<0){
                        alert("Vualva a iniciar secion");
                        return;
                    }
                    let usuarioTransportista= await fetch('https://georutas.somee.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>dat=res.json());
                    
                    if(usuarioTransportista=={} || usuarioTransportista.nombre==null){                        
                        alert("Has perdido tu usuario, vuelve a iniciar secion");
                        return;
                    }
                    followUseLocation(50);
                


                let datos=await fetch('https://georutas.somee.com/api/UsuariosTransporte',{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        },
                        body:JSON.stringify(
                            {
                                    id_UsuarioTransporte: idUsuarioIniciado,
                                    id_Tipo_Transporte: 1,
                                    id_Ruta: usuarioTransportista.id_Ruta,
                                    nombre: usuarioTransportista.nombre,
                                    usuario: usuarioTransportista.usuario,
                                    contrasenia: usuarioTransportista.contrasenia,
                                    correo: usuarioTransportista.correo,
                                    telefono: usuarioTransportista.telefono,
                                    longitude: usuarioTransportista.longitude,
                                    latitude: usuarioTransportista.latitude,
                                    longitudeAnterior: usuarioTransportista.longitudeAnterior,
                                    latitudeAnterior: usuarioTransportista.latitudeAnterior,
                                    estado: 'A'
                            })
                    })    
                        
                    setPermitirEnviarUbicacion(true);
                    setUsuarioTransportista({
                        id_UsuarioTransporte: idUsuarioIniciado,
                        id_Tipo_Transporte: 1,
                        id_Ruta: usuarioTransportista.id_Ruta,
                        nombre: usuarioTransportista.nombre,
                        usuario: usuarioTransportista.usuario,
                        contrasenia: usuarioTransportista.contrasenia,
                        correo: usuarioTransportista.correo,
                        telefono: usuarioTransportista.telefono,
                        longitude: usuarioTransportista.longitude,
                        latitude: usuarioTransportista.latitude,
                        longitudeAnterior: usuarioTransportista.longitudeAnterior,
                        latitudeAnterior: usuarioTransportista.latitudeAnterior,
                        estado: 'A'
                    });
                    setPermitirEnvio("true");
                }
            }
                imagen={require('../assets/ocultarUbicacionTransportista.png')}
            />}


            
            {permitirEnviarUbicacion==true && tipoDeUsuario=="Transportista" && <Fab 
                onPres={async()=>{
                    if(idUsuarioIniciado<0){
                        alert("Vualva a iniciar secion");
                        return;
                    }
                    let usuarioTransportista= await fetch('https://georutas.somee.com/api/UsuariosTransporte/'+idUsuarioIniciado).then(res=>dat=res.json())
                    
                    if(usuarioTransportista=={} || usuarioTransportista.nombre==null){
                        return;
                    }
                    stopFollowUserLocation();

                    let datos=await fetch('https://georutas.somee.com/api/UsuariosTransporte',{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json",
                            },
                            body:JSON.stringify(
                                {
                                        id_UsuarioTransporte: idUsuarioIniciado,
                                        id_Tipo_Transporte: 1,
                                        id_Ruta: usuarioTransportista.id_Ruta,
                                        nombre: usuarioTransportista.nombre,
                                        usuario: usuarioTransportista.usuario,
                                        contrasenia: usuarioTransportista.contrasenia,
                                        correo: usuarioTransportista.correo,
                                        telefono: usuarioTransportista.telefono,
                                        longitude: usuarioTransportista.longitude,
                                        latitude: usuarioTransportista.latitude,
                                        longitudeAnterior: usuarioTransportista.longitudeAnterior,
                                        latitudeAnterior: usuarioTransportista.latitudeAnterior,
                                        estado: 'I'
                                })
                        })

                        setPermitirEnviarUbicacion(false);
                        setUsuarioTransportista({
                            id_UsuarioTransporte: idUsuarioIniciado,
                            id_Tipo_Transporte: 1,
                            id_Ruta: usuarioTransportista.id_Ruta,
                            nombre: usuarioTransportista.nombre,
                            usuario: usuarioTransportista.usuario,
                            contrasenia: usuarioTransportista.contrasenia,
                            correo: usuarioTransportista.correo,
                            telefono: usuarioTransportista.telefono,
                            longitude: usuarioTransportista.longitude,
                            latitude: usuarioTransportista.latitude,
                            longitudeAnterior: usuarioTransportista.longitudeAnterior,
                            latitudeAnterior: usuarioTransportista.latitudeAnterior,
                            estado: 'I'
                        });
                        setPermitirEnvio("false");
                }}
                imagen={require('../assets/ubicacionTransportista.png')}
            />}


            
             {permitirSeguirPasajero==false && tipoDeUsuario=="Pasajero" && <Fab 
                onPres={async()=>{
                    if(permisos!='granted'){
                        askLocationPermission();
                        askLocationPermissionSetting();
                        return;
                    }
                    followUseLocation(25);
                    setPermitirSeguirPasajero(true);
        
                }}
                imagen={require('../assets/ocultarUbicacionTransportista.png')}
            />} 


            
            {permitirSeguirPasajero==true && tipoDeUsuario=="Pasajero" && <Fab 
                onPres={async()=>{

                    stopFollowUserLocation();
                    setPermitirSeguirPasajero(false);

                }}
                imagen={require('../assets/ubicacionTransportista.png')}
            />} 


            
            {idRutaAMostrar>0 && mostrarUsuarios==false && <Fab 
                onPres={()=>{
                    setMostrarUsuarios(true);
                    setVerTransportistasPorLaDerecha(true);
                    setVerTransportistasPorLaIzquierda(true);
                }}
                imagen={require('../assets/noVerUsuarios.png')}                
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && <Fab 
                onPres={()=>{
                    setMostrarUsuarios(false);
                }}
                imagen={require('../assets/verUsuarios.png')}                
            />}


            
            {idRutaAMostrar>0 && mostrarParadas==false && <Fab 
                onPres={()=>{
                    serMostrarParadas(true);
                }}
                imagen={require('../assets/noVerParadas.jpg')}
            />}


            
            {idRutaAMostrar>0 && mostrarParadas==true && <Fab 
                onPres={()=>{
                    serMostrarParadas(false);
                }}
                imagen={require('../assets/verParadas.jpg')}
            />}

                {tipoDeUsuario=='Transportista' && mostrarItemMenuUno==true && verCompetencia==false && <Fab
                    onPres={()=>{                
                        setVerCompetencia(true);
                        setOcultarTrayecto(false);
                    }}
                    imagen={require('../assets/noVerUsuarios.png')}
                />}

                
                {tipoDeUsuario=='Transportista' && mostrarItemMenuUno==true && verCompetencia==true && <Fab
                    onPres={()=>{setVerCompetencia(false)}}
                    imagen={require('../assets/verUsuarios.png')}
                />}
                
                {tipoDeUsuario=='Pasajero' && mostrarItemMenuUno==true && verRutasCercanas==false && <Fab 
                    onPres={()=>{
                        setVerRutasCercanas(true); 
                        setOcultarTrayecto(false);}}
                        imagen={require('../assets/noVerUsuarios.png')}
                />}

                
                {tipoDeUsuario=='Pasajero' && mostrarItemMenuUno==true && verRutasCercanas==true && <Fab
                    onPres={()=>{setVerRutasCercanas(false)}}                
                    imagen={require('../assets/verUsuarios.png')}
                />}

                {ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && tipoDeUsuario=="Transportista" && <Fab
                    onPres={()=>{                
          
                        obtenerRutas(identificadorKey.current);   

                        setVerTrayectoria(true);
                        setVerRutasCercanas(false);  
                        setVerCompetencia(false);    
                        setOcultarTrayecto(true);   

                    }}
                        imagen={require('../assets/cambioDetrayectoriaCero.jpg')}
                />}

                {ocultarTrayecto==true && mostrarItemMenuUno==true && verTrayectoria==true && tipoDeUsuario=="Pasajero" && <Fab
                    onPres={()=>{                

                        obtenerRutas(identificadorKey.current);   
                        
                        setVerTrayectoria(true);                           
                        setVerRutasCercanas(false);  
                        setVerCompetencia(false);    
                        setOcultarTrayecto(true);  
                    }}

                        imagen={require('../assets/cambioDetrayectoriaCero.jpg')}
                />}

                
                { (tipoDeUsuario=="Pasajero" || tipoDeUsuario=="Transportista") && (permitirSeguirPasajero==true || permitirEnviarUbicacion==true) &&
                    <Fab
                    onPres={centrePosition}
                    imagen={require('../assets/tuUbicacioncopia.png')}
                >
                </Fab>}

        </View>

        <View style={{position:'absolute',zIndex:200,bottom:18,right:51,
        alignItems:'flex-end',flexDirection:'column-reverse'}}>

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaIzquierda==false && <Fab 
                onPres={()=>{
                    setVerTransportistasPorLaIzquierda(true);
                }}
                imagen={require('../assets/DireccionDeTransportistasIzquierdaNegada.png')}
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaIzquierda==true && <Fab 
                onPres={()=>{
                    setVerTransportistasPorLaIzquierda(false);
                    if(verTransportistasPorLaDerecha==false){
                        setMostrarUsuarios(false);
                    }
                }}
                imagen={require('../assets/DireccionDeTransportistasIzquierda.png')}
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaDerecha==false && <Fab 
                onPres={()=>{
                    setVerTransportistasPorLaDerecha(true);
                }}
                imagen={require('../assets/DireccionDeTransportistasDerechaNegada.png')}
            />}

            
            {idRutaAMostrar>0 && mostrarUsuarios==true && verTransportistasPorLaDerecha==true && <Fab 
                onPres={()=>{
                    setVerTransportistasPorLaDerecha(false);
                    if(verTransportistasPorLaIzquierda==false){
                        setMostrarUsuarios(false);
                    }
                }}
                imagen={require('../assets/DireccionDeTransportistasDerecha.png')}
            />}
        </View>
    </View>
    )
}

export default IconosDeNavegacion