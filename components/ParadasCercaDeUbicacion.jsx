    
    
    import React, { useEffect } from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'
    import RutasBarItem from '../components/RutasBarItem.jsx';
    import getAllRutas from "../data/rutasManagua.js";

    const ParadasCercaDelOrigen=({lalitude,longitude,setVerParadasCercanas,emailState, tokenState})=>{

    const {data,error,isLoading}=useQuery(['obtenerParadasEnElOrigen',lalitude,longitude],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/SP_PCalcularRutasQuePasanCercaDeUnPunto/'+queryKey[1]+','+queryKey[2]).then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/SP_PCalcularRutasQuePasanCercaDeUnPunto/'+queryKey[1]+','+queryKey[2]+'?Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());
    },{
        staleTime:Infinity,
        refetchOnMount:false,
        refetchIntervalInBackground:false,
        refetchOnWindowFocus:false
    })

    

    if(isLoading){
        //console.log("Se estan cargando las paradas del origen");  
    }

    let todasLasRutas=getAllRutas();

    if(isLoading==false){    
        let nombresEnElArregloFinal=[];
        let coloresRuta=[];
        

        for(let s=0;s<data.length;s++){
            nombresEnElArregloFinal.push(todasLasRutas.filter(elemento => elemento.id_Ruta==data[s].id_Ruta)[0].nombre);
            coloresRuta.push(todasLasRutas.filter(elemento => elemento.id_Ruta==data[s].id_Ruta)[0].color);
        }

        return(
            data.map((item, i)=>{
                return(
                    <View key={i} onTouchEnd={()=>{
                        setVerParadasCercanas([{observar:true,latitude:item.longitude,longitude:item.latitude,direccion:item.direccion,id_Ruta:item.id_Ruta}]);
                    }}>
                        <RutasBarItem color={coloresRuta[i]} numeroDeRuta={nombresEnElArregloFinal[i]}
                        tiempoDeLlegada={item.tiempoDeLlegada} mostrarTiempo={true}>
                        </RutasBarItem>
                        {/* {item.id_Ruta==2 && <RutasBarItem color={coloresRuta[i]} numeroDeRuta={nombresEnElArregloFinal[i]}
                        tiempoDeLlegada={item.tiempoDeLlegada} mostrarTiempo={true}>
                        </RutasBarItem> }
                        {item.id_Ruta==3 && <RutasBarItem color={coloresRuta[i]} numeroDeRuta={nombresEnElArregloFinal[i]}
                        tiempoDeLlegada={item.tiempoDeLlegada} mostrarTiempo={true}>
                        </RutasBarItem> } */}
                    </View>
                )
            })
        
        )
    
    }

    return(
        <Polyline coordinates={[{latitude:12.155924,longitude:-86.302363},{latitude:12.156,longitude:-86.301}]}></Polyline>
    )

    }

    export default ParadasCercaDelOrigen