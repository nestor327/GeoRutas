import { Image, View,Text } from "react-native"
import { Marker,Polyline } from "react-native-maps"
import { useQuery } from "react-query"
import urlDeLasImagenesEstaticas from "../../data/urlDeLasImagenesDeLasRutas"
import getAllRutas from "../../data/rutasManagua"
import { useEffect } from "react"



const RutaSeleccionadaUsuarioPasajero=({idDeLaRutaALaQueComparteElPasajero,emailState,tokenState,userLocation,modoOscuro,mostrarLaLineaDeLaRutaQueComparte
                                        ,enviarUbicacionComoUnPasajero,id_usuarioTransportistaQueComparte,idRutaAMostrar})=>{

    // try{
        const {data,error,isLoading}=useQuery(['obtenerIndividualDos',idDeLaRutaALaQueComparteElPasajero,emailState,tokenState],async({queryKey})=>{        
            return await fetch('https://georutas.somee.com/api/Coordenadas/'+queryKey[1]+'?email='+queryKey[2]+'&token='+queryKey[3]).then(res=>datos=res.json())
        },{
            staleTime:Infinity,
            cacheTime:3600000        
        })

        if(isLoading==false && !error){

            //console.log("La data es: ");
            //console.log(data);        
            console.log("Linea de la ruta que comparte");
            //console.log(data);
            let coordenadas=[]
            let todasLasUrls=urlDeLasImagenesEstaticas();
            let todasLasRutas=getAllRutas();
            

            if(data!=null && data.length!=0 && data!=undefined && data[0].id_Coordenada==-2){
                return(
                    <View></View>
                )
            }
            console.log(data.length==0 || data==undefined || data[0].id_Coordenada<=0);
            if(data.length==0 || data==undefined || data[0].id_Coordenada<=0){
                return(
                    <View></View>
                )
            }
            //console.log(data);
            for(let y=0;y<data.length;y++){
                coordenadas.push({latitude: data[y].longitude, longitude: data[y].latitude})
            }
            
            console.log("Esto implica que la linea de la ruta que comparte deberia de estar disponible");

            return(
                mostrarLaLineaDeLaRutaQueComparte==true && idRutaAMostrar!=idDeLaRutaALaQueComparteElPasajero && <Polyline lineDashPattern={[10,2]} strokeColor={todasLasRutas.filter(elem => elem.id_Ruta==idDeLaRutaALaQueComparteElPasajero)[0].color} strokeWidth={2.5} coordinates={coordenadas}></Polyline>
            )
        }
    // }catch{
    //     return(
    //         <View></View>
    //     )
    // }


}

export default RutaSeleccionadaUsuarioPasajero;
