import React from "react";
import getAllRutas from "../../data/rutasManagua";
import { useQuery,queryKey } from "react-query";

const useTrayectoria=(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
    setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,key,emailState,tokenState)=>{


    try{
            //Ojo si quieres respuestas diferentes, envia parametros diferentes OJOOOO

    let url='https://www.georutas.lat/api/CalculoDeMenorRuta/'+coordenadasOrigen.longitude+','+coordenadasOrigen.latitude+','+coordenadasDestino.longitude+','+coordenadasDestino.latitude+'?Email='+emailState+'&Token='+tokenState;

    // console.log("mierda la url es: ");              
    //             console.log(url);
    let {data, error, isLoading,isError, isSuccess,status}=useQuery(["gets",coordenadasOrigen,coordenadasDestino,emailState,tokenState],async({queryKey})=>{
        return await fetch('https://www.georutas.lat/api/CalculoDeMenorRuta/'+queryKey[1].longitude+','+queryKey[1].latitude+','+queryKey[2].longitude+','+queryKey[2].latitude+'?Email='+queryKey[3]+'&Token='+queryKey[4]).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://www.georutas.lat/api/CalculoDeMenorRuta/'+queryKey[1].latitude
                //return await fetch('https://www.georutas.lat/api/CalculoDeMenorRuta/-86.300482,12.124742,-86.274902,12.125082').then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://www.georutas.lat/api/Rutas/'+Math.abs(Math.floor((queryKey[1].latitude)*10)-1200)%45).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://www.georutas.lat/api/Rutas/'+Math.floor(Math.random()*45)).then(res=>datos=res.json()).catch(error => data=[]);
    },{
        refetchInterval:Infinity,
        cacheTime:20000
    });
    //let data=
    //let isLoading=false;

    const todasLasRutas=getAllRutas();
    
    if(!isLoading){
        // console.log(coordenadasOrigen);
        // console.log(coordenadasDestino);
        // console.log(data);
        // console.log((Math.floor((coordenadasOrigen.latitude)*10)-1200)%45);        
        // console.log("Mierda");        
        // //data=[];        
        // console.log("El valor de la data es: ");
        // console.log(data);
    }

    const obtenerRutas=(keyy)=>{

        try{
            if(isLoading || data==undefined || data[0].id_Idetificador<=0){
                console.log(data[0]);
                
                return;
            }
    
            // console.log(data[0]);
            // console.log("Justo aqui "+isLoading);
            const resultados=[];
            const tiempos=[];
            const transportes=[];
            const idUsuarios=[];
                
        
            //console.log(data);
            for(let k=0;k<data.length;k++){
                //let tiempoAcumulado=0;
                if(data[k].id_Idetificador==(keyy)){
                    resultados.push(data[k]);
                    tiempos.push(Math.abs(data[k].tiempoDeLlegada));
                    //tiempoAcumulado=tiempoAcumulado+Math.abs(data[k].tiempoDeLlegada);
                    
                    transportes.push({color:data[k].color, direccionParadaInicial:data[k].direccionParadaInicial, 
                                     id_Ruta:data[k].id_Ruta, nombre:todasLasRutas.filter(elemento => elemento.id_Ruta==data[k].id_Ruta)[0].nombre, 
                                     latitudParadaUsuarioComun:data[k].latitudParadaUsuarioComun,longitudParadaUsuarioComun:data[k].longitudParadaUsuarioComun,
                                     id_ParadaUsuarioComun:data[k].id_ParadaUsuarioComun,id_ParadaFinal:data[k].id_ParadaFinal,id_Usuario:data[k].id_Usuario,
                                     latitudParadaFinal:data[k].latitudParadaFinal,longitudParadaFinal:data[k].longitudParadaFinal,
                                     longitudUsuarioComun:data[k].longitudUsuarioComun,latitudUsuarioComun:data[k].latitudUsuarioComun});
                    
                    idUsuarios.push({id_Usuario:data[k].id_Usuario,id_Ruta:data[k].id_Ruta});
                }
            }
        
            setRutasTrayectoria(resultados);
            setVisualizarRutas(keyy);        
            verRutasTrayecto.current=!verRutasTrayecto.current;
        
            setTiemposRutasTrayectorias(tiempos);        
        
            setIconosTransportes(transportes);
            setIdUsuariosDeTrayectoria(idUsuarios);
    
    
            //console.log(keyy);
        }catch{
            console.log("Ahora si, ocurrio un error");
        }
    }

        return{
            data,
            obtenerRutas
        }   
    }catch{
        let data=[];
        const obtenerRutas=()=>{
            console.log("Ocurrio un error, al obtener los datos");
        }
        return{
            data,
            obtenerRutas
        }   
    }
}

export default useTrayectoria