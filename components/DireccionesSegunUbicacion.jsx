    
    
    import React, { useEffect } from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'
    import rutasParadasManagua from '../data/rutasParadasManagua.js';
    
    
    const UsuariosTransportistas=({idRuta})=>{

    const {data,error,isLoading}=useQuery(['obtenerParadasConDireccion',idRuta],async({queryKey})=>{
        return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:60000
    })

    

    if(isLoading){
        //console.log("Se estan cargando las paradas");     
        //setMostrarSniperCargando(true);
    }
    //console.log("Mierda");
    //const arregloParadasConTiempo=paradasTiempos(idRuta);
    // const rutasParadasManagua=async()=>{
    //     return(await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json()));
    // }
    let paradasEnComun=rutasParadasManagua(idRuta)._j;    
    let paradasNecesarias=[];
    
 

    if(isLoading==false && (paradasEnComun!=null && paradasEnComun.length>0)){    

        for(let r=0;r<paradasEnComun.length;r++){
            paradasNecesarias.push(data[paradasEnComun[r].id_Parada-1]);
        }
        //setMostrarSniperCargando(true);
      //  if(arregloParadasConTiempo.length>0){
        
        

        // if(idRuta==1){        
        //     for(let y=0;y<120;y++){
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==2){
        //     for(let y=120;y<212;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else{
        //     for(let y=212;y<309;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }        
        //setMostrarSniperCargando(false);
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
                                    {/* <Text>{item.id_Parada}</Text> */}
                            {/* {item.direccion=='D' && <Image style={{width:15,height:25}} source={require("../assets/parada-de-autobus.png")}></Image>}
                            {item.direccion=='I' && <Image style={{width:15,height:25}} source={require("../assets/parada-de-autobus.png")}></Image>} */}
                            
                    </Marker>}
                   {item.direccion=='I' && <Marker coordinate={{latitude:item.longitude,
                        longitude:item.latitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05}}
                        icon={require("../assets/parada-de-autobusIzquierda.png")}
                        style={{width:20,height:20}}>                            
                                    {/* <Text>{item.id_Parada}</Text> */}
                            {/* {item.direccion=='D' && <Image style={{width:15,height:25}} source={require("../assets/parada-de-autobus.png")}></Image>}
                            {item.direccion=='I' && <Image style={{width:15,height:25}} source={require("../assets/parada-de-autobus.png")}></Image>} */}
                            
                    </Marker>}
                    
                    </View>
                )
            })
        
        )
    //}
    }

    return(
        <View></View>
    )

    }

    export default UsuariosTransportistas