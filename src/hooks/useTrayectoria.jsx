import React from "react";
import getAllRutas from "../../data/rutasManagua";
import { useQuery,queryKey } from "react-query";

const useTrayectoria=(coordenadasOrigen,coordenadasDestino,setRutasTrayectoria,setVisualizarRutas,
    setTiemposRutasTrayectorias,setIconosTransportes,setIdUsuariosDeTrayectoria,verRutasTrayecto,key,emailState,tokenState)=>{


    try{
            //Ojo si quieres respuestas diferentes, envia parametros diferentes OJOOOO

    let url='https://www.georutas.lat/api/CalculoDeMenorRuta/'+coordenadasOrigen.latitude+','+coordenadasOrigen.longitude+','+coordenadasDestino.latitude+','+coordenadasDestino.longitude+'?Email='+emailState+'&Token='+tokenState;

    let {data, error, isLoading,isError, isSuccess,status}=useQuery(["gets",coordenadasOrigen,coordenadasDestino,emailState,tokenState],async({queryKey})=>{
        return await fetch('https://www.georutas.lat/api/CalculoDeMenorRuta/'+queryKey[1].longitude+','+queryKey[1].latitude+','+queryKey[2].longitude+','+queryKey[2].latitude+'?Email='+queryKey[3]+'&Token='+queryKey[4]).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://www.georutas.lat/api/CalculoDeMenorRuta/'+queryKey[1].latitude
                //return await fetch('https://www.georutas.lat/api/CalculoDeMenorRuta/-86.300482,12.124742,-86.274902,12.125082').then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://www.georutas.lat/api/Rutas/'+Math.abs(Math.floor((queryKey[1].latitude)*10)-1200)%45).then(res=>datos=res.json()).catch(error => data=[]);
                //return await fetch('https://www.georutas.lat/api/Rutas/'+Math.floor(Math.random()*45)).then(res=>datos=res.json()).catch(error => data=[]);
    },{
        refetchInterval:Infinity,
        cacheTime:2000
    });
    // let data=[{"llavePrimaria":1,"id_Idetificador":1,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":652,"direccionParadaFinal":"D","tiempoDeLlegada":2994,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"D"},
    // {"llavePrimaria":2,"id_Idetificador":2,"id_Contador":1,"id_Usuario":477,"id_Ruta":15,"nombreRuta":"114","color":"#F53325","direccion":"D","id_ParadaInicial":1564,"direccionParadaInicial":"D","id_ParadaUsuarioComun":1570,"direccionParadaUsuarioComun":"D","id_ParadaFinal":1593,"direccionParadaFinal":"D","tiempoDeLlegada":3138,"latitudUsuarioComun":-86.3101534,"longitudUsuarioComun":12.1321234,"latitudParadaInicial":-86.3101534,"longitudParadaInicial":12.1321234,"latitudParadaUsuarioComun":-86.2966774,"longitudParadaUsuarioComun":12.1254915,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"D"},
    // {"llavePrimaria":3,"id_Idetificador":3,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":4,"id_Idetificador":3,"id_Contador":2,"id_Usuario":1129,"id_Ruta":35,"nombreRuta":"170","color":"#18899D","direccion":"I","id_ParadaInicial":3440,"direccionParadaInicial":"I","id_ParadaUsuarioComun":3470,"direccionParadaUsuarioComun":"D","id_ParadaFinal":3476,"direccionParadaFinal":"D","tiempoDeLlegada":3402,"latitudUsuarioComun":-86.2362831,"longitudUsuarioComun":12.1518427,"latitudParadaInicial":-86.2362831,"longitudParadaInicial":12.1518427,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"I"},
    // {"llavePrimaria":5,"id_Idetificador":4,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":6,"id_Idetificador":4,"id_Contador":2,"id_Usuario":1129,"id_Ruta":35,"nombreRuta":"170","color":"#18899D","direccion":"I","id_ParadaInicial":3440,"direccionParadaInicial":"I","id_ParadaUsuarioComun":3470,"direccionParadaUsuarioComun":"D","id_ParadaFinal":3476,"direccionParadaFinal":"D","tiempoDeLlegada":3402,"latitudUsuarioComun":-86.2362831,"longitudUsuarioComun":12.1518427,"latitudParadaInicial":-86.2362831,"longitudParadaInicial":12.1518427,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"I"},
    // {"llavePrimaria":7,"id_Idetificador":5,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":8,"id_Idetificador":5,"id_Contador":2,"id_Usuario":1129,"id_Ruta":35,"nombreRuta":"170","color":"#18899D","direccion":"I","id_ParadaInicial":3440,"direccionParadaInicial":"I","id_ParadaUsuarioComun":3470,"direccionParadaUsuarioComun":"D","id_ParadaFinal":3476,"direccionParadaFinal":"D","tiempoDeLlegada":3402,"latitudUsuarioComun":-86.2362831,"longitudUsuarioComun":12.1518427,"latitudParadaInicial":-86.2362831,"longitudParadaInicial":12.1518427,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"I"},
    // {"llavePrimaria":9,"id_Idetificador":6,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":10,"id_Idetificador":6,"id_Contador":2,"id_Usuario":477,"id_Ruta":15,"nombreRuta":"114","color":"#F53325","direccion":"D","id_ParadaInicial":1564,"direccionParadaInicial":"D","id_ParadaUsuarioComun":1587,"direccionParadaUsuarioComun":"D","id_ParadaFinal":1593,"direccionParadaFinal":"D","tiempoDeLlegada":3417,"latitudUsuarioComun":-86.3101534,"longitudUsuarioComun":12.1321234,"latitudParadaInicial":-86.3101534,"longitudParadaInicial":12.1321234,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"D"},
    // {"llavePrimaria":11,"id_Idetificador":7,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":12,"id_Idetificador":7,"id_Contador":2,"id_Usuario":477,"id_Ruta":15,"nombreRuta":"114","color":"#F53325","direccion":"D","id_ParadaInicial":1564,"direccionParadaInicial":"D","id_ParadaUsuarioComun":1587,"direccionParadaUsuarioComun":"D","id_ParadaFinal":1593,"direccionParadaFinal":"D","tiempoDeLlegada":3417,"latitudUsuarioComun":-86.3101534,"longitudUsuarioComun":12.1321234,"latitudParadaInicial":-86.3101534,"longitudParadaInicial":12.1321234,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"D"},
    // {"llavePrimaria":13,"id_Idetificador":8,"id_Contador":1,"id_Usuario":345,"id_Ruta":11,"nombreRuta":"110","color":"#42DA00","direccion":"D","id_ParadaInicial":1136,"direccionParadaInicial":"D","id_ParadaUsuarioComun":1142,"direccionParadaUsuarioComun":"D","id_ParadaFinal":1148,"direccionParadaFinal":"D","tiempoDeLlegada":1376,"latitudUsuarioComun":-86.3101534,"longitudUsuarioComun":12.1321234,"latitudParadaInicial":-86.3101534,"longitudParadaInicial":12.1321234,"latitudParadaUsuarioComun":-86.2966774,"longitudParadaUsuarioComun":12.1254915,"latitudParadaFinal":-86.2614086,"longitudParadaFinal":12.1308274,"direccionDelUsuario":"D"},
    // {"llavePrimaria":14,"id_Idetificador":8,"id_Contador":2,"id_Usuario":477,"id_Ruta":15,"nombreRuta":"114","color":"#F53325","direccion":"D","id_ParadaInicial":1564,"direccionParadaInicial":"D","id_ParadaUsuarioComun":1576,"direccionParadaUsuarioComun":"D","id_ParadaFinal":1593,"direccionParadaFinal":"D","tiempoDeLlegada":3417,"latitudUsuarioComun":-86.3101534,"longitudUsuarioComun":12.1321234,"latitudParadaInicial":-86.3101534,"longitudParadaInicial":12.1321234,"latitudParadaUsuarioComun":-86.2614086,"longitudParadaUsuarioComun":12.1308274,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"D"},
    // {"llavePrimaria":15,"id_Idetificador":9,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":16,"id_Idetificador":9,"id_Contador":2,"id_Usuario":477,"id_Ruta":15,"nombreRuta":"114","color":"#F53325","direccion":"D","id_ParadaInicial":1564,"direccionParadaInicial":"D","id_ParadaUsuarioComun":1587,"direccionParadaUsuarioComun":"D","id_ParadaFinal":1593,"direccionParadaFinal":"D","tiempoDeLlegada":3417,"latitudUsuarioComun":-86.3101534,"longitudUsuarioComun":12.1321234,"latitudParadaInicial":-86.3101534,"longitudParadaInicial":12.1321234,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"D"},
    // {"llavePrimaria":17,"id_Idetificador":10,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":18,"id_Idetificador":10,"id_Contador":2,"id_Usuario":1326,"id_Ruta":41,"nombreRuta":"266","color":"#0E9FBC","direccion":"I","id_ParadaInicial":4014,"direccionParadaInicial":"I","id_ParadaUsuarioComun":4045,"direccionParadaUsuarioComun":"D","id_ParadaFinal":4051,"direccionParadaFinal":"D","tiempoDeLlegada":3459,"latitudUsuarioComun":-86.1999905,"longitudUsuarioComun":12.1485487,"latitudParadaInicial":-86.1999905,"longitudParadaInicial":12.1485487,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"I"},
    // {"llavePrimaria":19,"id_Idetificador":11,"id_Contador":1,"id_Usuario":181,"id_Ruta":6,"nombreRuta":"105","color":"#183EAD","direccion":"D","id_ParadaInicial":622,"direccionParadaInicial":"D","id_ParadaUsuarioComun":626,"direccionParadaUsuarioComun":"D","id_ParadaFinal":646,"direccionParadaFinal":"D","tiempoDeLlegada":2388,"latitudUsuarioComun":-86.2969105,"longitudUsuarioComun":12.1129505,"latitudParadaInicial":-86.2969105,"longitudParadaInicial":12.1129505,"latitudParadaUsuarioComun":-86.2955552,"longitudParadaUsuarioComun":12.1253297,"latitudParadaFinal":-86.2233845,"longitudParadaFinal":12.1503353,"direccionDelUsuario":"D"},
    // {"llavePrimaria":20,"id_Idetificador":11,"id_Contador":2,"id_Usuario":1326,"id_Ruta":41,"nombreRuta":"266","color":"#0E9FBC","direccion":"I","id_ParadaInicial":4014,"direccionParadaInicial":"I","id_ParadaUsuarioComun":4045,"direccionParadaUsuarioComun":"D","id_ParadaFinal":4051,"direccionParadaFinal":"D","tiempoDeLlegada":3459,"latitudUsuarioComun":-86.1999905,"longitudUsuarioComun":12.1485487,"latitudParadaInicial":-86.1999905,"longitudParadaInicial":12.1485487,"latitudParadaUsuarioComun":-86.2233845,"longitudParadaUsuarioComun":12.1503353,"latitudParadaFinal":-86.1987761,"longitudParadaFinal":12.1481264,"direccionDelUsuario":"I"}];
    // let isLoading=false;

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

        try{
            if(isLoading || data==undefined || data[0].id_Idetificador<=0){
                console.log(data[0]);
                console.log("mierda la url es: ");              
                console.log(url);
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
                if(data[k].id_Idetificador==(keyy)){
                    resultados.push(data[k]);
                    tiempos.push(Math.abs(data[k].tiempoDeLlegada));
                    
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