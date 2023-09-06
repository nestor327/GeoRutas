    
    
    import React, { useEffect } from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'
    import RutasBarItem from '../components/RutasBarItem.jsx';

    const ParadasCercaDelOrigen=({todasLasRutasData,lalitude,longitude,setVerParadasCercanas,emailState, tokenState,setFechaDeClicCambio
        ,setMostrarCompañerosCercanos,refMapView,setVerRutasCercanas,setVerCompetencia,tipoDeSubscripcion,tipoDeUsuario})=>{
        try{
            const {data,error,isLoading}=useQuery(['obtenerParadasEnElOrigen',lalitude,longitude],async({queryKey})=>{                
                return await fetch('https://georutas.somee.com/api/SP_PCalcularRutasQuePasanCercaDeUnPunto/'+queryKey[1]+','+queryKey[2]+'?Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());
            },{
                staleTime:Infinity,
                refetchOnMount:false,
                refetchIntervalInBackground:false,
                refetchOnWindowFocus:false
            })
        
        
            let todasLasRutas=todasLasRutasData;
        
            if(isLoading==false){ 

                let nombresEnElArregloFinal=[];
                let coloresRuta=[];
                
        
                for(let s=0;s<data.length;s++){
                    nombresEnElArregloFinal.push((todasLasRutas.length>0)?todasLasRutas.filter(elemento => elemento.id_Ruta==data[s].id_Ruta)[0].nombre:"---");
                    coloresRuta.push((todasLasRutas.length>0)?todasLasRutas.filter(elemento => elemento.id_Ruta==data[s].id_Ruta)[0].color:"#102769");
                }
                return(
                    data.map((item, i)=>{
                        return(
                            <View key={i} onTouchEnd={()=>{
                                setVerParadasCercanas([{observar:true,latitude:item.longitude,longitude:item.latitude,direccion:item.direccion,id_Ruta:item.id_Ruta,id_Parada:item.id_Parada}]);
                                let fecha= new Date();
                                setFechaDeClicCambio(fecha.getTime());
                                setMostrarCompañerosCercanos(false);
                                refMapView.current?.animateCamera({
                                    center:{latitude:item.longitude,longitude:item.latitude}
                                })

                                if(tipoDeSubscripcion!='C' && tipoDeUsuario=='Pasajero'){
                                    setVerRutasCercanas(false);
                                }else if(tipoDeUsuario=='Transportista'){
                                    setVerCompetencia(false);
                                }
                            }}>
                                <RutasBarItem color={coloresRuta[i]} numeroDeRuta={nombresEnElArregloFinal[i]}
                                tiempoDeLlegada={item.tiempoDeLlegada} mostrarTiempo={true}>
                                </RutasBarItem>
                            </View>
                        )
                    })
                
                )
            
            }
        }catch{
            return(
                <Polyline coordinates={[{latitude:12.155924,longitude:-86.302363},{latitude:12.156,longitude:-86.301}]}></Polyline>
            )
        }
    

    }

    export default ParadasCercaDelOrigen