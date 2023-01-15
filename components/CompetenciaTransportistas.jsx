import React, { useEffect } from "react";
import { useQuery,queryKey } from "react-query";
import { Marker, Polyline } from "react-native-maps";
import {View,Text, Image} from 'react-native'
import getAllRutas from '../data/rutasManagua.js'
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas.js";
import obtenerTodasLasParadas from "../data/obtenerTodasLasParadas.js";
import todasLasRutasParadas from "../data/todasLasRutasParadas.js";

    


    const CompetenciaTransportistas=({tipoDeUsuario,idUsuarioIniciado,setCargando,rutasSeleccionadasCompetencia})=>{

        

    const {data,error,isLoading,isSuccess}=useQuery(['obtenerUsuariosCompetencia'],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosTransporte').then(res=>datos=res.json())
    },{
        //staleTime:Infinity,
        refetchInterval:2000,
        cacheTime:1500
    })


    const urlDeLasImagenes=urlDeLasImagenesEstaticas();

    let obtenerCoordendasDeLasParadas=[];
    
    let todasLasParadas=obtenerTodasLasParadas()
    let todasLasRutasParada=todasLasRutasParadas();

    let rutasDeManagua=getAllRutas();
    
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


    if(rutasSeleccionadasCompetencia!=undefined && rutasSeleccionadasCompetencia!=null && rutasSeleccionadasCompetencia.length>0 && idUsuarioIniciado>0 && isSuccess==true && rutasDeManagua.length>0 && todasLasParadas.length>0 && todasLasRutasParada.length>0 && rutasDeManagua!=undefined){
        //setMostrarSniperCargando(true);       

        //console.log("El arreglo posee los siguientes elementos");
        //console.log(idRuta);
        //console.log("El arreglo posee los siguientes elementos");

        let usuarioPrincipal=data[idUsuarioIniciado-1];
        let arregloFinal=[];
        let nombresEnElArregloFinal=[];
        
        let posicionUsuario=0;
        let contador=0;


        for(let s=0;s<data.length;s++){
            let distanciaComp=Math.sqrt(Math.pow((usuarioPrincipal.latitude-data[s].latitude),2)+Math.pow((usuarioPrincipal.longitude-data[s].longitude),2))
            if(distanciaComp<=0.018){

                let verificandoCompetencia=false;
                let rutasParadasLogueado=todasLasRutasParada.filter(elemento=>elemento.id_Ruta==data[idUsuarioIniciado].id_Ruta);
                let rutasParadasCompetencia=todasLasRutasParada.filter(elemento=>elemento.id_Ruta==data[s].id_Ruta);

                let paradasLogueado=todasLasParadas.filter(elemento=>(elemento.id_Parada>=rutasParadasLogueado[0].id_Parada && elemento.id_Parada
                    <=rutasParadasLogueado[rutasParadasLogueado.length-1].id_Parada));

                let paradasCompetencia=todasLasParadas.filter(elemento=>(elemento.id_Parada>=rutasParadasCompetencia[0].id_Parada && elemento.id_Parada
                    <=rutasParadasCompetencia[rutasParadasCompetencia.length-1].id_Parada));

                for(let n=0;n<paradasLogueado.length;n++){
                    if(paradasCompetencia.filter(elemento => elemento.longitude==paradasLogueado[n].longitude && elemento.latitude==paradasLogueado[n].latitude).length>0){
                        verificandoCompetencia=true;
                        break;
                    }
                }

                if(verificandoCompetencia==true && (rutasSeleccionadasCompetencia[data[s].id_Ruta-1]=='✓' || data[s].id_Ruta==data[idUsuarioIniciado].id_Ruta)){
                    arregloFinal.push(data[s]);
                
                    if(data.id_UsuarioTransporte==idUsuarioIniciado){
                        posicionUsuario=contador;
                    }
                    contador++;
                }
            }
        }


        let menorDistancia=1000000;
        let direccionesPorUsuario=[];
        
        for(let y=0;y<arregloFinal.length;y++){
            
            if(arregloFinal[y].nombre==null){
                continue;
            }

            nombresEnElArregloFinal.push(rutasDeManagua.filter(elemento => elemento.id_Ruta==arregloFinal[y].id_Ruta)[0].nombre);

            let paradasDeUnaRuta=todasLasRutasParada.filter(elemento => elemento.id_Ruta==arregloFinal[y].id_Ruta);
            
            let primeraParada=paradasDeUnaRuta[0].id_Parada;
            let ultimaParada=paradasDeUnaRuta[paradasDeUnaRuta.length-1].id_Parada;

            obtenerCoordendasDeLasParadas=[];
            for(let r=primeraParada-1; r<ultimaParada;r++){
                obtenerCoordendasDeLasParadas.push(todasLasParadas[r]);
            }
            
            
            
            // if(arregloFinal[y].id_Ruta==1){
            //     obtenerCoordendasDeLasParadas=obtenerCoordendasDeLasParadasUno;
            // }else if(arregloFinal[y].id_Ruta==2){
            //     obtenerCoordendasDeLasParadas=obtenerCoordendasDeLasParadasDos;
            // }else if(arregloFinal[y].id_Ruta==3){
            //     obtenerCoordendasDeLasParadas=obtenerCoordendasDeLasParadasTres;
            // }
            

           
            
            
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
        }

        let direrecioinOriginal=direccionesPorUsuario[posicionUsuario];

        
        //setMostrarSniperCargando(false);


        

        return(
            <View>
                {
                    arregloFinal.map((item, i)=>{                       
                        // console.log("el valor 1 es: "+idUsuarioIniciado);
                        // console.log("el valor dos es: "+item.id_UsuarioTransporte);
                    return(
                    <View key={i}>
                        {((item.id_UsuarioTransporte)!=idUsuarioIniciado) && item.estado=='A' && direrecioinOriginal==direccionesPorUsuario[i] && <Marker coordinate={{latitude:item.longitude,
                            longitude:item.latitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}>
                                
                                {direccionesPorUsuario[i]=='D' && <Text style={{color:'black'}}>{"⇛"+nombresEnElArregloFinal[i]}</Text>}
                                {direccionesPorUsuario[i]=='I' && <Text style={{color:'black'}}>{"⇚"+nombresEnElArregloFinal[i]}</Text>}
                                
                                <Image source={urlDeLasImagenes[item.id_Ruta-1]} style={{width:25,height:25}}/>
            
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

    export default CompetenciaTransportistas