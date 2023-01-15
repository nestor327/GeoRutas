import React from "react";
import getAllRutas from "../../data/rutasManagua";
import { useQuery,queryKey } from "react-query";

const useTrayectoria=(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
    setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,key)=>{


        //Ojo si quieres respuestas diferentes, envia parametros diferentes OJOOOO

    let {data, error, isLoading,isError, isSuccess,status}=useQuery(["gets",coordenadasOrigen,coordenadasDestino],async({queryKey})=>{
        return await fetch('https://georutas.somee.com/api/SP_PCalcularMenorRutaEnFuncionDelTiempoModificado/'+queryKey[1].latitude
        +','+queryKey[1].longitude+','+queryKey[2].latitude+','+queryKey[2].longitude).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/CalculoDeMenorRuta/'+queryKey[1].latitude
                //return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/CalculoDeMenorRuta/-86.300482,12.124742,-86.274902,12.125082').then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Rutas/'+Math.abs(Math.floor((queryKey[1].latitude)*10)-1200)%45).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Rutas/'+Math.floor(Math.random()*45)).then(res=>datos=res.json()).catch(error => data=[]);
    },{
        refetchInterval:Infinity,
        cacheTime:2000
    });
    // let data=[];
    // let isLoading=true;

    const todasLasRutas=getAllRutas();
    
    if(!isLoading){
        // console.log(coordenadasOrigen);
        // console.log(coordenadasDestino);
        // console.log(data);
        // console.log((Math.floor((coordenadasOrigen.latitude)*10)-1200)%45);        
        // console.log("Mierda");
        //data=[];        
    }

    const obtenerRutas=(keyy)=>{

        if(isLoading){
            //console.log("mierda");            
            return;
        }

        //console.log(data);
        const resultados=[];
        const tiempos=[];
        const transportes=[];
        const idUsuarios=[];
            
    
        //console.log(data);
        for(let k=0;k<data.length;k++){
            if(data[k].id_Idetificador==(keyy)){
                resultados.push(data[k]);
                tiempos.push(data[k].tiempoDeLlegada);
                
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
    }

        return{
            data,
            obtenerRutas
        }

}

export default useTrayectoria