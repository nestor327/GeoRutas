import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {Image,View,Text} from 'react-native'
import obtenerParadasPorParadas from "../data/obtencionDeLasParadasPorRuta.js";
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
    


    const UsuariosTransportistas=({tipoDeUsuario,idRuta,idUsuarioIniciado,verTransportistasPorLaDerecha,verTransportistasPorLaIzquierda})=>{

        

    const {data,error,isLoading}=useQuery(['obtenerUsuariosTransportistas',idRuta],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosTransporte').then(res=>datos=res.json())
    },{
        //staleTime:Infinity,
        refetchInterval:2000,
        cacheTime:1500
    })

    let obtenerCoordendasDeLasParadas=obtenerParadasPorParadas(idRuta);
    if(isLoading){
        //console.log("Se estan cargando los usuarios");
        //setMostrarSniperCargando(true);

    }
/*
{
  "id_UsuarioTransporte": 0,
  "id_Tipo_Transporte": 0,
  "id_Ruta": 0,
  "nombre": "string",
  "usuario": "string",
  "contrasenia": "string",
  "correo": "string",
  "telefono": "string",
  "longitude": 0,
  "latitude": 0,
  "longitudeAnterior": 0,
  "latitudeAnterior": 0,
  "estado": "string"
}*/
    let rutasDeManagua=getAllRutas();
    const urlDeLasImagenes=urlDeLasImagenesEstaticas();

    if(isLoading==false && obtenerCoordendasDeLasParadas.length>0 && rutasDeManagua.length>0 && urlDeLasImagenes.length>0){
        //setMostrarSniperCargando(true);       

        //console.log("El arreglo posee los siguientes elementos");
        //console.log(idRuta);
        //console.log("El arreglo posee los siguientes elementos");

        let nombresEnElArregloFinal=[];
        let arregloFinal=[];
        for(let s=0;s<data.length;s++){
            if(data[s].id_Ruta==idRuta){
                arregloFinal.push(data[s]);
            }
        }
        //console.log(arregloFinal);
        //const mayorParada=obtenerCoordendasDeLasParadas[obtenerCoordendasDeLasParadas.length-1].id_Parada;


        let menorDistancia=1000000;
        let direccionesPorUsuario=[];
        
        for(let y=0;y<arregloFinal.length;y++){



            nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==arregloFinal[y].id_Ruta)[0].nombre);
            let paradaCercanaAlPuntoPasado=-1;

            let distanciaAlaUltimaParadaCercanaAlPasado=10000;

            for(let k=0;k<obtenerCoordendasDeLasParadas.length;k++){
                let distanciaReal=Math.sqrt(Math.pow((arregloFinal[y].longitudeAnterior-obtenerCoordendasDeLasParadas[k].longitude),2)
                +Math.pow((arregloFinal[y].latitudeAnterior-obtenerCoordendasDeLasParadas[k].latitude),2));

                if(distanciaReal<distanciaAlaUltimaParadaCercanaAlPasado){
                    distanciaAlaUltimaParadaCercanaAlPasado=distanciaReal;
                    paradaCercanaAlPuntoPasado=k;                    
                }
            }

            let idParada=0;

            let ultimaParadaPorLaIzquierda=-1;
            let ultimaParadaPorLaDerecha=-1;


            for(let k=0;k<obtenerCoordendasDeLasParadas.length;k++){

                let distanciaReal=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[k].longitude),2)
                +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[k].latitude),2));

                if(distanciaReal<menorDistancia 
                    && obtenerCoordendasDeLasParadas[k].direccion==obtenerCoordendasDeLasParadas[paradaCercanaAlPuntoPasado].direccion){
                    menorDistancia=distanciaReal;
                    idParada=k;                    
                }
                if(k<obtenerCoordendasDeLasParadas.length-1){
                    if(obtenerCoordendasDeLasParadas[k].direccion!=obtenerCoordendasDeLasParadas[k+1].direccion){
                        ultimaParadaPorLaIzquierda=k;
                        ultimaParadaPorLaDerecha=k+1;
                    }
                }

            }
            
            menorDistancia=1000000;
            distanciaAlaUltimaParadaCercanaAlPasado=10000;
            
            if(paradaCercanaAlPuntoPasado<idParada){
                direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[idParada].direccion);
            }else if(paradaCercanaAlPuntoPasado>idParada){
                if((obtenerCoordendasDeLasParadas[idParada].direccion)=='D'){
                    direccionesPorUsuario.push('I');
                }else{
                    direccionesPorUsuario.push('D');
                }
            }else{
                if(idParada==0 || idParada==obtenerCoordendasDeLasParadas.length-1){
                    direccionesPorUsuario.push('I');
                }else if(idParada==ultimaParadaPorLaDerecha || idParada==ultimaParadaPorLaIzquierda){
                    direccionesPorUsuario.push('D');
                }else {
                    direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[idParada].direccion);
                }
            }


            // if(obtenerCoordendasDeLasParadas[idParada].id_Parada<mayorParada){
            //     let distanciaEntreActualYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[idParada+1].longitude),2)
            //     +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[idParada+1].latitude),2));

            //     let distanciaEntreAnteriorYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitudeAnterior-obtenerCoordendasDeLasParadas[idParada+1].longitude),2)
            //     +Math.pow((arregloFinal[y].latitudeAnterior-obtenerCoordendasDeLasParadas[idParada+1].latitude),2));

            //     if(distanciaEntreActualYparadaSiguiente<=distanciaEntreAnteriorYparadaSiguiente){
            //         direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[idParada+1].direccion);
                    
            //     }else{
            //         if(obtenerCoordendasDeLasParadas[idParada].direccion=='D'){
            //             direccionesPorUsuario.push('I');
            //         }else{
            //             direccionesPorUsuario.push('D');
            //         }
            //     }


            // }else if(obtenerCoordendasDeLasParadas[idParada].id_Parada==mayorParada){
            //     let distanciaEntreActualYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitude-obtenerCoordendasDeLasParadas[0].longitude),2)
            //     +Math.pow((arregloFinal[y].latitude-obtenerCoordendasDeLasParadas[0].latitude),2));

            //     let distanciaEntreAnteriorYparadaSiguiente=Math.sqrt(Math.pow((arregloFinal[y].longitudeAnterior-obtenerCoordendasDeLasParadas[0].longitude),2)
            //     +Math.pow((arregloFinal[y].latitudeAnterior-obtenerCoordendasDeLasParadas[0].latitude),2));


            //     if(distanciaEntreActualYparadaSiguiente<=distanciaEntreAnteriorYparadaSiguiente){
            //         direccionesPorUsuario.push(obtenerCoordendasDeLasParadas[0].direccion);
            //     }else{
            //         if(obtenerCoordendasDeLasParadas[idParada].direccion=='D'){
            //             direccionesPorUsuario.push('I');
            //         }else{
            //             direccionesPorUsuario.push('D');
            //         }
            //     }
            // }                   
        }


        //setMostrarSniperCargando(false);


        

        return(
            <View>
                {
                    arregloFinal.map((item, i)=>{                       
                        // console.log("el valor 1 es: "+idUsuarioIniciado);
                        // console.log("el valor dos es: "+item.id_UsuarioTransporte);
                    return(
                    <View key={i}>
                        {((tipoDeUsuario=='Transportista' && item.id_UsuarioTransporte!=idUsuarioIniciado) || tipoDeUsuario!='Transportista') && item.estado=='A' && ((verTransportistasPorLaIzquierda==true && direccionesPorUsuario[i]=='I')
                         || (verTransportistasPorLaDerecha==true && direccionesPorUsuario[i]=='D')) &&<Marker coordinate={{latitude:item.longitude,
                            longitude:item.latitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}>
                                
                                {direccionesPorUsuario[i]=='D' && <Text style={{color:'black'}}>{"⇛"+nombresEnElArregloFinal[i]}</Text>}
                                {direccionesPorUsuario[i]=='I' && <Text style={{color:'black'}}>{"⇚"+nombresEnElArregloFinal[i]}</Text>}

                                {<Image style={{width:25,height:25}} source={urlDeLasImagenes[idRuta-1]} ></Image>}
            
                        </Marker>}
                    </View>
                    )
                    })}

            </View>         
        )

    }
    
    return(
        
     <View></View>
        
    )

    }

    export default UsuariosTransportistas