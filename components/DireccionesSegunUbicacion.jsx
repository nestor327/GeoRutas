    
    
    import React, { useEffect } from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'
    import rutasParadasManagua from '../data/rutasParadasManagua.js';
    
    
    const UsuariosTransportistas=({idRuta})=>{

    const {data,error,isLoading}=useQuery(['obtenerParadasConDireccion',idRuta],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Paradas').then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:60000
    })

    

    if(isLoading){
        //console.log("Se estan cargando las paradas");     
        //setMostrarSniperCargando(true);
    }

    let paradasEnComun=rutasParadasManagua(idRuta)._j;    
    let paradasNecesarias=[];
 
 

    if(isLoading==false && (paradasEnComun!=null && paradasEnComun.length>0)){    

        for(let r=0;r<paradasEnComun.length;r++){
            paradasNecesarias.push(data[paradasEnComun[r].id_Parada-1]);
        }

        return(
            paradasNecesarias.map((item, i)=>{
                return(
                    <View key={i}>
                        {item.direccion=='D' && <Marker coordinate={{latitude:item.longitude,
                        longitude:item.latitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05}}
                        icon={require("../assets/parada-de-autobusDerecha.png")}
                        style={{width:20,height:20}}>            
                            
                    </Marker>}
                   {item.direccion=='I' && <Marker coordinate={{latitude:item.longitude,
                        longitude:item.latitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05}}
                        icon={require("../assets/parada-de-autobusIzquierda.png")}
                        style={{width:20,height:20}}>                            
                            
                    </Marker>}
                    
                    </View>
                )
            })
        
        )
    
    }

    return(
        <View></View>
    )

    }

    export default UsuariosTransportistas