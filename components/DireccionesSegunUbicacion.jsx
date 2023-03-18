    //NUEVA ACTUALIZACION 18-1-23 El endpoint devuelve directamente las paradas para una ruta en especifico
    
    import React, { useEffect } from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'
    
    
const DireccionesSegunUbicacion=({idRuta,emailState, tokenState})=>{

try{
    const {data,error,isLoading}=useQuery(['obtenerParadasConDireccion',idRuta,emailState, tokenState],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
        return await fetch('https://www.georutas.lat/api/Paradas?IdRuta='+queryKey[1]+'&Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:60000
    })

    

    if(!isLoading){
        //console.log("Se estan cargando las paradas");     
        //setMostrarSniperCargando(true);
        //console.log(data);
    }

    //let paradasEnComun=rutasParadasManagua(idRuta)._j;    
    
 
 

    if(isLoading==false){

        return(
            data.map((item, i)=>{
                return(
                    <View key={i} style={{width:15,height:15}}>
                        <Marker coordinate={{latitude:item.longitude,
                            longitude:item.latitude,
                            latitudeDelta:0.02,
                            longitudeDelta:0.05}}
                            icon={(item.direccion=='I')?require("../assets/parada-de-autobusIzquierda.png"):require("../assets/parada-de-autobusDerecha.png")}
                            style={{width:10,height:10}}>            
                        </Marker>
                    </View>
                //     <View key={i}>
                //     {item.direccion=='D' && <Marker coordinate={{latitude:item.longitude,
                //         longitude:item.latitude,
                //         latitudeDelta:0.02,
                //         longitudeDelta:0.05}}                   
                //         style={{width:30,height:19}}     
                //         >   
                //         <Image source={require("../assets/parada-de-autobusDerecha.png")}></Image>         
                            
                //     </Marker>}
                //     {item.direccion=='I' && <Marker key={i} coordinate={{latitude:item.longitude,
                //         longitude:item.latitude,
                //         latitudeDelta:0.02,
                //         longitudeDelta:0.05}}
                //         icon={require("../assets/parada-de-autobusIzquierda.png")}
                //         style={{width:10,height:10}}>            
                            
                //     </Marker>}
                // </View>
                )
            })
        
        )}
        
        return(
            <View>
                    <Marker coordinate={{latitude:0,
                        longitude:0,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05}}
                        icon={require("../assets/parada-de-autobusDerecha.png")}
                        style={{width:20,height:20}}>            
                            
                    </Marker>
            </View>
        )
}catch{
    return(
        <View>
                <Marker coordinate={{latitude:0,
                    longitude:0,
                    latitudeDelta:0.02,
                    longitudeDelta:0.05}}
                    icon={require("../assets/parada-de-autobusDerecha.png")}
                    style={{width:20,height:20}}>            
                        
                </Marker>
        </View>
    )
}
    
}

export default DireccionesSegunUbicacion