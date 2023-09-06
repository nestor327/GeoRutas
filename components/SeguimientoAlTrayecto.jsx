import { Marker } from "react-native-maps";
import {Image,Text} from 'react-native';
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas";
import { useQuery } from "react-query";


const SeguimientoAlTrayecto=({todasLasRutasData,datosDeLosUsuarios,modoOscuro,emailState,tokenState,refMapView,permitirSeguirPasajero,permitirEnviarUbicacion})=>{
    
    console.log("Los DATOS DEL USUARIO SON");
    console.log(datosDeLosUsuarios);
    const {data,error,isLoading}=useQuery(['obtenerTiemposDeUnTrayecto',emailState,tokenState,datosDeLosUsuarios],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Coordenadas/'+queryKey[1]).then(res=>datos=res.json())
        
        const objeto=[];

        for(let y=0;y<datosDeLosUsuarios.length;y++){
            objeto.push(
                {   posicionTrayecto: datosDeLosUsuarios[y].posicionTrayecto,
                    id_UsuarioTransporte: datosDeLosUsuarios[y].id_UsuarioTransporte,
                    idParadaInicial: datosDeLosUsuarios[y].idParadaInicial,
                    idParadaFinal: datosDeLosUsuarios[y].idParadaFinal,
                    idRuta: datosDeLosUsuarios[y].idRuta,
                }
            )
            console.log("Es el ciclo for");
            console.log(datosDeLosUsuarios);
            ((data!=undefined)?console.log(data[y].tiempoDeLlegada):console.log("tes"))
            console.log("22");
        }
        const options={
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
        }
        return await fetch('https://georutas.somee.com/api/NUsuarioTransporteSeguimientoDeLaTrayectoria?Email='+queryKey[1]+'&Token='+queryKey[2],options).then(res=>datos=res.json())
    },{
        refetchInterval:4000,
        cacheTime:6000,onSuccess:()=>{
            console.log("Es el on susces");
            console.log(data);
            if(data!=undefined && data.length==1 && permitirSeguirPasajero==false && permitirEnviarUbicacion==false){
                refMapView.current?.animateCamera({
                    center:{latitude:data[0].longitude,
                        longitude:data[0].latitude}
                })
            }else if(data!=undefined && data.length==2 && datosDeLosUsuarios.length==2 && permitirSeguirPasajero==false && permitirEnviarUbicacion==false){
                if((datosDeLosUsuarios[0].tiempo*2)>Math.abs(data[0].tiempoDeLlegada)){
                    refMapView.current?.animateCamera({
                        center:{latitude:data[0].longitude,
                            longitude:data[0].latitude}
                    })  
                }else if((datosDeLosUsuarios[1].tiempo*2)>Math.abs(data[1].tiempoDeLlegada)){
                    refMapView.current?.animateCamera({
                        center:{latitude:data[0].longitude,
                            longitude:data[0].latitude}
                    })
                }
            }
        },onError:()=>{
            console.log("Mierda ocurrio un error");
            console.log(data);
        }
    })

    let urlDeLosIconos=urlDeLasImagenesEstaticas();
    let nombresDeLasRutas=todasLasRutasData;


    let datosFiltrados=[];

    if(isLoading){
        console.log("La mierda esta cargandi");
    }

    if(!isLoading && data!=undefined && datosDeLosUsuarios!=undefined){
        console.log("Es la data final");
        //console.log(data);
        return(
            data.map((item, i)=>{                
                return(
                    (datosDeLosUsuarios[i].tiempo*2)>Math.abs(item.tiempoDeLlegada)
                    && 
                    <Marker key={i} coordinate={{
                        latitude:item.longitude,
                        longitude:item.latitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05
                    }} style={{alignItems:'center'}}>
                        {(item.direccion=='D') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇛"+(nombresDeLasRutas.length>0)?nombresDeLasRutas[item.id_Ruta-1].nombre:"---"}</Text>}
                        {(item.direccion=='I') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇚"+(nombresDeLasRutas.length>0)?nombresDeLasRutas[item.id_Ruta-1].nombre:"---"}</Text>}
                        <Image style={{width:27,height:27}} source={urlDeLosIconos[item.id_Ruta-1]}></Image>
                        <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>
                            {(i==0)?Math.floor((Math.abs(item.tiempoDeLlegada))/3600)
                                    +":"+((Math.floor((((Math.abs(item.tiempoDeLlegada))-3600*(Math.floor((Math.abs(item.tiempoDeLlegada))/3600)))/60))>9)?Math.floor((((Math.abs(item.tiempoDeLlegada))-3600*(Math.floor((Math.abs(item.tiempoDeLlegada))/3600)))/60)):"0"+Math.floor((((Math.abs(item.tiempoDeLlegada))-3600*(Math.floor((Math.abs(item.tiempoDeLlegada))/3600)))/60)))
                                    +":"+(((Math.abs(item.tiempoDeLlegada))%60>9)?(Math.abs(item.tiempoDeLlegada))%60:"0"+(Math.abs(item.tiempoDeLlegada))%60)
                                    :
                                    Math.floor((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)/3600)
                                    +":"+((Math.floor((((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)-3600*(Math.floor((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)/3600)))/60))>9)?Math.floor((((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)-3600*(Math.floor((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)/3600)))/60)):"0"+Math.floor((((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)-3600*(Math.floor((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)/3600)))/60)))
                                    +":"+(((Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)%60>9)?(Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)%60:"0"+(Math.abs(item.tiempoDeLlegada)-data[i-1].tiempoDeLlegada)%60)}

                            </Text>
                    </Marker>
                )
            })
        )
    }
}

export default SeguimientoAlTrayecto