
//Aqui hay que actualizar algo igual
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Marker } from "react-native-maps";
import obtenerParadasPorParadas from '../data/obtencionDeLasParadasPorRuta.js';
import { View,Text,Image } from "react-native";
import getAllRutas from '../data/rutasManagua.js'


//Este componente posee errores, revisalo luego

    const UsuarioTransportistaLogueado=({emailState,tokenState,usuario,direccionesPorUsuario,setDireccionPorUsuario,idUsuarioIniciado,userLocation,activarPrecision,modoOscuro,tiempoParaUsaurioTransportistaLogueado
        ,mostrarCompañerosCercanos,idRutaAMostrar, tiempoPromedio})=>{
        try{
            let direccionesPorUsuarioDos='K';

        const {data,error,isLoading}=useQuery(['obtenerTodosLosUsuarioComunes',idUsuarioIniciado,emailState,tokenState],async({queryKey})=>{
            //return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
            return await fetch('https://www.georutas.lat/api/NUsuariosTransporte/'+queryKey[1]+'?Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
            
        },{
            refetchInterval:4000,
            onSuccess:()=>{                
                setDireccionPorUsuario(direccionesPorUsuarioDos);
            }   
        }
        
        )

    if(!isLoading){
        //console.log("Se esta cargando la linea de la ruta");            
        //console.log(tiempoPromedio);
    }
    //let paradas=obtenerParadasPorParadas(UsuarioEncontrado.id_Ruta);
    //console.log("El id que pasas es: "+UsuarioEncontrado.id_Ruta);
    let rutasDeManagua=getAllRutas();
    let UsuarioEncontrado={};
    //console.log("No Entro");
    //console.log("La cantidad de paradas es: "+paradas.length);
    if(isLoading==false &&  rutasDeManagua.length>0){


        UsuarioEncontrado=data;
        let nombresEnElArregloFinal=[];        
        UsuarioEncontrado=data;                
        // console.log("El usaurio encontrado es: ");
        // console.log(UsuarioEncontrado);
        nombresEnElArregloFinal.push(rutasDeManagua[data.id_Ruta-1].nombre);

            // let paradaAnteriorAdondeEstuvo=-1;
            // let paradaEnDondeEstaEnLaMismaDireccionPasada=-1;

            // let distanciaPasadaALaRuta=10000;
            // let distanciaActualALaParada=10000;
            // let ultimaParadaPorLaIzquierda=-1;
            // let ultimaParadaPorLaDerecha=-1;

            if( UsuarioEncontrado.estado=='A'){

                direccionesPorUsuarioDos=UsuarioEncontrado.direccion;
            
            if(data!=undefined){             
                return(          
                              
                        <Marker coordinate={{latitude:(activarPrecision==true)?data.longitude:userLocation.latitude, longitude:(activarPrecision==true)?data.latitude:userLocation.longitude}}
                            style={{alignItems:'center'}}
                        >
                            <Text style={{color:(!modoOscuro)?'black':'#c3c3c3', fontWeight:'500'}}>{(direccionesPorUsuarioDos=='D')?"⇛ Tú "+nombresEnElArregloFinal[0]:"⇚ Tú "+nombresEnElArregloFinal[0]}</Text>
                            <Image style={{width:30,height:30}} source={require("../assets/transportistaAzulv2.png")}></Image>
                            {/* {(mostrarCompañerosCercanos || (Math.ceil(idUsuarioIniciado/33.0)==idRutaAMostrar)) && <Text 
                                    style={{color:((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))>300)?"#f41c1c"
                                                    :((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))<-300)?"#ff7f27"
                                                    :(!modoOscuro)?'black':'#c3c3c3', fontWeight:'700'}}>
                                                        {((((tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))>0)?"+":"-")+
                                                        ((Math.floor((((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado)))/60))>9)?Math.floor((((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado)))/60)):"0"
                                                        +Math.floor((((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))-3600*(Math.floor((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))/3600)))/60)))
                                                        +":"+(((Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))%60>9)?(Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))%60:"0"+(Math.abs(tiempoPromedio-tiempoParaUsaurioTransportistaLogueado))%60)
                                                        }
                                                </Text>} */}
                        </Marker>
                    
                )    
            }
        
        }
     }

    return(
        <Marker coordinate={{latitude:0, longitude:0}}>
        </Marker>
    )
    }catch{
        return(
            <Marker coordinate={{latitude:0, longitude:0}}>
            </Marker>
        )
    }
        
    }

    export default UsuarioTransportistaLogueado