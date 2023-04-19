    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Polyline } from "react-native-maps";
    import getAllRutas from '../data/rutasManagua.js';
    import { View } from "react-native";

    const LineaDeUnaRuta=({idRuta,setMostrarSniperCargando,setCargando,emailState, tokenState})=>{

        try{
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
        return await fetch('https://www.georutas.lat/api/Coordenadas/'+queryKey[1]+'?email='+queryKey[2]+'&token='+queryKey[3]).then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:3600000,
        onSuccess:()=>{
            setMostrarSniperCargando(true);            
            setCargando(false);
            console.log("La mierda si se ejecuto y el primer dato de la linea es_ ");
            if(data!=undefined && data.length>0){
                console.log(data[0]);
            }else{
                console.log("Aun no hay ni mierda");
            }
        }
        
    })

    if(error){
        setCargando(false);
        console.log("Esta ocurriendo un error");
    }

    if(isLoading){
        //console.log("Se esta cargando la linea de la ruta");            
    }

    if(isLoading==false && !error){

        //console.log("La data es: ");
        //console.log(data);        
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
        //console.log(data);
        for(let y=0;y<data.length;y++){
            coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})
        }
        
        console.log(coordenadas[0]);
        return(
            <Polyline strokeColor={color} strokeWidth={2} coordinates={coordenadas}></Polyline>
        )
    }

    return(
        <Polyline strokeColor={'black'} strokeWidth={2} coordinates={[{latitude:12.1212,longitude:-86.34534},{latitude:12.12123,longitude:-86.345343}]}></Polyline>
    )
    
    }catch{
        return(
            <Polyline strokeColor={'black'} strokeWidth={2} coordinates={[{latitude:12.1212,longitude:-86.34534},{latitude:12.12123,longitude:-86.345343}]}></Polyline>
        )
    }
}

    export default LineaDeUnaRuta