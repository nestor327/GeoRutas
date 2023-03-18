

import {View,Image,Text} from 'react-native';
import { Marker } from 'react-native-maps';
import { useQuery } from 'react-query';
import getAllRutas from '../data/rutasManagua';
import urlDeLasImagenesEstaticas from '../data/urlDeLasImagenesDeLasRutas';

const UsuarioCercanoAUnaParada=({idRuta,emailState,tokenState,idParada,tipoDeUsuario,idUsuarioIniciado,modoOscuro})=>{
    //try{
        const {data,error,isLoading}=useQuery(['obtenerUsuarioCercanoAUnaParada',idRuta,emailState,tokenState,idParada],async({queryKey})=>{
            return await fetch('https://www.georutas.lat/api/NUsuarioTransporteCercaDeUnaParada?Id_Ruta='+queryKey[1]+'&Id_Parada='+queryKey[4]+'&Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
        },{
            //staleTime:Infinity,
            refetchInterval:4000,
            cacheTime:4000
        })

        let rutasDeManagua=getAllRutas();
        const urlDeLasImagenes=urlDeLasImagenesEstaticas();

        if(isLoading==false){
            console.log(data);
        }

        if(isLoading==false && data!=undefined && rutasDeManagua.length>0 && urlDeLasImagenes.length>0 && data!=null && data!=undefined && data.id_UsuarioTransporte>0){
            return(
                <Marker coordinate={{latitude:data.longitude,
                longitude:data.latitude,
                latitudeDelta:0.02,
                longitudeDelta:0.05}}
                style={{alignItems:'center'}}
                >
                    {((tipoDeUsuario=='Transportista' && data.id_UsuarioTransporte!=idUsuarioIniciado) || tipoDeUsuario=='Pasajero') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{(data.direccion=='I')?"⇚"+rutasDeManagua[idRuta-1].nombre:"⇛"+rutasDeManagua[idRuta-1].nombre}</Text>}
                    {(tipoDeUsuario=='Transportista' && data.id_UsuarioTransporte==idUsuarioIniciado) && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{(data.direccion=='I')?"Tú ⇚"+rutasDeManagua[idRuta-1].nombre:"Tú ⇛"+rutasDeManagua[idRuta-1].nombre}</Text>}
                    <Image style={{width:25,height:25}} source={urlDeLasImagenes[idRuta-1]} ></Image>
                    <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{Math.floor(data.tiempoDeLlegada/3600)
                                                +":"+((Math.floor(((data.tiempoDeLlegada-3600*(Math.floor(data.tiempoDeLlegada/3600)))/60))>9)?Math.floor(((data.tiempoDeLlegada-3600*(Math.floor(data.tiempoDeLlegada/3600)))/60)):"0"+Math.floor(((data.tiempoDeLlegada-3600*(Math.floor(data.tiempoDeLlegada/3600)))/60)))+":"
                                                +((data.tiempoDeLlegada%60>9)?data.tiempoDeLlegada%60:"0"+data.tiempoDeLlegada%60)}</Text>
                </Marker>                   
            )
        }else{

            return(        
            
                <Marker coordinate={{latitude:0,
                        longitude:0,
                        latitudeDelta:0.2,
                        longitudeDelta:0.05}}
                        icon={require("../assets/parada-de-autobusDerecha.png")}
                        style={{width:20,height:20}}>            
                            
                </Marker>        
            )
        }
    // }catch{
    //     console.log("Esta ocurriendo un error");
    //     return(        
            
    //         <Marker coordinate={{latitude:0,
    //                 longitude:0,
    //                 latitudeDelta:0.2,
    //                 longitudeDelta:0.05}}
    //                 icon={require("../assets/parada-de-autobusDerecha.png")}
    //                 style={{width:20,height:20}}>            
                        
    //         </Marker>        
    //     )
    // }
}

export default UsuarioCercanoAUnaParada;
