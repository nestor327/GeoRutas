import React from "react";
import getAllRutas from "../../data/rutasManagua";
import { useQuery,queryKey } from "react-query";

const useTrayectoria=(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
    setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,key)=>{

    // let {data, error, isLoading,isError, isSuccess,status}=useQuery(["gets",coordenadasOrigen,coordenadasDestino],async({queryKey})=>{
    //     return await fetch('https://georutas.somee.com/api/SP_PCalcularMenorRutaEnFuncionDelTiempoModificado/'+queryKey[1].latitude
    //     +','+queryKey[1].longitude+','+queryKey[2].latitude+','+queryKey[2].longitude).then(res=>datos=res.json()).catch(error => data=[]);
    // },{
    //     refetchInterval:2500,
    //     cacheTime:2000
    // });
    let data=[];
    let isLoading=true;

    const todasLasRutas=getAllRutas();

    if(isLoading){
        //data=[];
    }

    const obtenerRutas=(keyy)=>{
        
        if(isLoading){
            return;
        }

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