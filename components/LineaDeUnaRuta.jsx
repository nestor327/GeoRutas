    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Polyline } from "react-native-maps";
    import getAllRutas from '../data/rutasManagua.js';
    import { View } from "react-native";

    const LineaDeUnaRuta=({idRuta,setMostrarSniperCargando,setCargando,emailState, tokenState})=>{

         let color="red";
        // if(idRuta==1)
        // {
        //     color="green";
        // }else if(idRuta==2){
        //     color="red";
        // }else{
        //     color="black";
        // }

        let todasLasRutas=getAllRutas();
        if(todasLasRutas.filter(elemento => elemento.id_Ruta==idRuta).length>0){
            color=todasLasRutas.filter(elemento => elemento.id_Ruta==idRuta)[0].color;
        }else{
            color='red';
        }


        
        //console.log(getAllRutas().filter(elemento => elemento.id_Ruta=idRuta)[0]);

    const {data,error,isLoading}=useQuery(['obtenerIndividual',idRuta,emailState,tokenState],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Coordenadas/'+queryKey[1]).then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Coordenadas/'+queryKey[1]+'?email='+queryKey[2]+'&token='+queryKey[3]).then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:20000,
        onSuccess:()=>{
            setMostrarSniperCargando(true);            
            setCargando(false);
        }
        
    })

    if(error){
        setCargando(false);
        console.log("Esta ocurriendo un error");
    }

    if(isLoading){
        //console.log("Se esta cargando la linea de la ruta");            
    }

    if(isLoading==false){

        
        let coordenadas=[]

        if(data!=null && data.length!=0 && data!=undefined && data[0].id_Coordenada==-2){
            return(
                <View></View>
            )
        }

        if(data.length==0 || data==undefined || data[0].id_Coordenada<=0){
            return(
                <View></View>
            )
        }
        
        for(let y=0;y<data.length;y++){
            
                coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})                        
                
        }
        
        
        return(
            <Polyline strokeColor={color} strokeWidth={2} coordinates={coordenadas}></Polyline>
        )
    }

    return(
        <View></View>
    )

    }

    export default LineaDeUnaRuta