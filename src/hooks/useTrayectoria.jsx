import React from "react";
import {useState} from 'react';
import getAllRutas from "../../data/rutasManagua";
import { useQuery,queryKey } from "react-query";

const useTrayectoria=(todasLasRutasData,coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
    setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,key,emailState,tokenState,setNoseEncontraronTrayectorias,
    refMapView,verRutasTiempoReal)=>{


    // try{
            //Ojo si quieres respuestas diferentes, envia parametros diferentes OJOOOO

    let url='https://georutas.somee.com/api/CalculoDosMenorRuta/'+coordenadasOrigen.longitude+','+coordenadasOrigen.latitude+','+coordenadasDestino.longitude+','+coordenadasDestino.latitude+'?Email='+emailState+'&Token='+tokenState;

    // console.log("mierda la url es: ");
    //             console.log(url);
    let {data, error, isLoading,isError, isSuccess,status}=useQuery(["gets",coordenadasOrigen,coordenadasDestino,emailState,tokenState],async({queryKey})=>{
        return await fetch(((verRutasTiempoReal)?'https://georutas.somee.com/api/CalculoDosMenorRuta/':'https://georutas.somee.com/api/CalculoTresMenorRuta/')+queryKey[1].longitude+','+queryKey[1].latitude+','+queryKey[2].longitude+','+queryKey[2].latitude+'?Email='+queryKey[3]+'&Token='+queryKey[4]).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://georutas.somee.com/api/CalculoDeMenorRuta/'+queryKey[1].latitude
                //return await fetch('https://georutas.somee.com/api/CalculoDeMenorRuta/-86.300482,12.124742,-86.274902,12.125082').then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://georutas.somee.com/api/Rutas/'+Math.abs(Math.floor((queryKey[1].latitude)*10)-1200)%45).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://georutas.somee.com/api/Rutas/'+Math.floor(Math.random()*45)).then(res=>datos=res.json()).catch(error => data=[]);
    },{
        refetchInterval:Infinity,
        cacheTime:20000,
        onError:(res)=>{
            console.log("Ocurrio un error y este es: ");
            console.log(res);
        }
        // onSuccess:()=>{
        //     if(data!=null && data!=undefined && data[0].id_Idetificador==-7){                
        //         setNoseEncontraronTrayectorias(true);
        //     }
        // }
    });

    const [datosDeLosUsuarios,setDatosDeLosUsuarios]=useState([]);
    //let data=
    //let isLoading=false;

    const todasLasRutas=todasLasRutasData;
    
    if(!isLoading){
        // console.log("Ya cargo la mierda");
        // console.log(data);
        // console.log("Y la data fue la anterior");
//         console.log(coordenadasOrigen);
//         console.log(coordenadasDestino);
//         {"latitude": 12.13461313426314, "longitude": -86.243103928864}
//  LOG  {"latitude": 12.07068808917854, "longitude": -86.14017382264137}
        // console.log(data);
        // console.log((Math.floor((coordenadasOrigen.latitude)*10)-1200)%45);        
        // console.log("Mierda");        
        // //data=[];        
        // console.log("El valor de la data es: ");
        // console.log(data);
        // console.log(url);
    }

    const obtenerRutas=(keyy)=>{

        try{
            if(isLoading || data==undefined || data[0].id_Idetificador<=0){
                console.log(data[0]);
                
                return;
            }
    
            // console.log(data[0]);
            // console.log("Justo aqui "+isLoading);
            console.log("Si entraste e hiciste la solicitud");
            const resultados=[];
            const tiempos=[];
            const transportes=[];
            const idUsuarios=[];
            const arregloDatosDeLosUsuarios=[];
        
            //console.log(data);
            let posicionesDeLosArreglos=1;
            let posicionUltimoRegistro=0;
            for(let k=0;k<data.length;k++){
                //let tiempoAcumulado=0;
                if(data[k].id_Idetificador==(keyy)){
                    resultados.push(data[k]);
                    tiempos.push(Math.abs(data[k].tiempoDeLlegada));
                    console.log("Los tiempos son: ");
                    console.log(tiempos);
                    //tiempoAcumulado=tiempoAcumulado+Math.abs(data[k].tiempoDeLlegada);
                    
                    transportes.push({color:data[k].color, direccionParadaInicial:data[k].direccionParadaInicial, 
                                     id_Ruta:data[k].id_Ruta, nombre:(todasLasRutas.length>0)?(todasLasRutas.filter(elemento => elemento.id_Ruta==data[k].id_Ruta)[0].nombre):"---", 
                                     latitudParadaUsuarioComun:data[k].latitudParadaUsuarioComun,longitudParadaUsuarioComun:data[k].longitudParadaUsuarioComun,
                                     id_ParadaUsuarioComun:data[k].id_ParadaUsuarioComun,id_ParadaFinal:data[k].id_ParadaFinal,id_Usuario:data[k].id_Usuario,
                                     latitudParadaFinal:data[k].latitudParadaFinal,longitudParadaFinal:data[k].longitudParadaFinal,
                                     longitudUsuarioComun:data[k].longitudUsuarioComun,latitudUsuarioComun:data[k].latitudUsuarioComun,
                                     latitudParadaInicial:data[k].latitudParadaInicial,longitudParadaInicial:data[k].longitudParadaInicial});
                    
                    idUsuarios.push({id_Usuario:data[k].id_Usuario,id_Ruta:data[k].id_Ruta});
                    arregloDatosDeLosUsuarios.push({
                        posicionTrayecto: posicionesDeLosArreglos,
                        id_UsuarioTransporte: data[k].id_Usuario,
                        idParadaInicial: data[k].id_ParadaUsuarioComun,
                        idParadaFinal: data[k].id_ParadaFinal,
                        idRuta: data[k].id_Ruta,
                        tiempo: Math.abs(data[k].tiempoDeLlegada)
                        //tiempo: Math.abs((k>0)?(data[k].tiempoDeLlegada-data[k-1].tiempoDeLlegada):data[k].tiempoDeLlegada)
                        //tiempo: Math.abs((k>0)?(data[k].tiempoDeLlegada-data[k-1].tiempoDeLlegada):data[k].tiempoDeLlegada)
                      })
                    //   if(k>0){
                    //     console.log("k>0");                
                    //     console.log(k);
                    // }else{
                    //     console.log("k<0");
                    //     console.log(k);
                    // }
                      posicionesDeLosArreglos++;
                      posicionUltimoRegistro=k;
                }
            }
            console.log("Llegaste hasta aqui");

            if(transportes.length>=1 && verRutasTiempoReal==true){
                console.log("Entraste aqui");
                refMapView.current?.animateCamera({
                    center:{latitude:transportes[0].longitudUsuarioComun,longitude:transportes[0].latitudUsuarioComun},
                    zoom: 15
                })
            }else if(transportes.length>=1 && verRutasTiempoReal==false){                
                console.log("POR UN CARAJO DE MIERDA, PORQUE NO ENTRA "+transportes[0].longitudParadaInicial+ " "+transportes[0].latitudParadaInicial);
                console.log("POR UN CARAJO DE MIERDA, PORQUE NO ENTRA "+transportes[0].longitudParadaUsuarioComun+ " "+transportes[0].latitudParadaUsuarioComun);
                refMapView.current?.animateCamera({
                    center:{
                        latitude:transportes[0].longitudParadaUsuarioComun,
                        longitude:transportes[0].latitudParadaUsuarioComun
                    },
                    zoom: 15
                });
                //transportes=[];
            }

            console.log(arregloDatosDeLosUsuarios);
            arregloDatosDeLosUsuarios[arregloDatosDeLosUsuarios.length-1].tiempo=Math.abs(arregloDatosDeLosUsuarios[arregloDatosDeLosUsuarios.length-1].tiempo-
               ((Math.ceil((Math.sqrt(Math.pow((data[posicionUltimoRegistro].longitudParadaFinal-coordenadasDestino.latitude),2)+Math.pow((data[posicionUltimoRegistro].latitudParadaFinal-coordenadasDestino.longitude),2))/0.000009)/1.1))));

            setDatosDeLosUsuarios(arregloDatosDeLosUsuarios);
            setRutasTrayectoria(resultados);
            setVisualizarRutas(keyy);        
            //verRutasTrayecto.current=!verRutasTrayecto.current;
        
            setTiemposRutasTrayectorias(tiempos);        
        
            setIconosTransportes(transportes);
            setIdUsuariosDeTrayectoria(idUsuarios);
    
    
            //console.log(keyy);
        }catch(e) {
            console.log("Ahora si, ocurrio un error");
            console.log(e.message);
        }
    }

    const verificarSiHayDatos=()=>{
        // console.log("La data de los trayectos son:");
        // console.log(data);
        if(!isLoading && data!=null && data!=undefined && ((data[0]!=undefined && data[0].id_Idetificador!=undefined && data[0].id_Idetificador==-7) || (data.length!=undefined && data.length==0))){
            setNoseEncontraronTrayectorias(true);
        }
    }

        return{
            data,
            obtenerRutas,
            datosDeLosUsuarios,
            verificarSiHayDatos
        }   
    // }catch{
    //     let data=[];
    //     const obtenerRutas=()=>{
    //         console.log("Ocurrio un error, al obtener los datos");
    //     }
    //     let datosDeLosUsuarios=[];
    //     return{
    //         data,
    //         obtenerRutas,
    //         datosDeLosUsuarios
    //     }   
    // }
}

export default useTrayectoria