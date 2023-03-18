import { Marker } from "react-native-maps";
import {Image,Text} from 'react-native';
import urlDeLasImagenesEstaticas from "../data/urlDeLasImagenesDeLasRutas";
import getAllRutas from "../data/rutasManagua";
import { useQuery } from "react-query";


const SeguimientoAlTrayecto=({datosDeLosUsuarios,modoOscuro,emailState,tokenState})=>{
    
    const {data,error,isLoading}=useQuery(['obtenerTiemposDeUnTrayecto',emailState,tokenState],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Coordenadas/'+queryKey[1]).then(res=>datos=res.json())
        
        const objeto=datosDeLosUsuarios;

        const options={
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
        }
        return await fetch('https://www.georutas.lat/api/NUsuarioTransporteSeguimientoDeLaTrayectoria?Email='+queryKey[1]+'&Token='+queryKey[2],options).then(res=>datos=res.json())
    },{
        refetchInterval:4000,
        cacheTime:6000
    })

    let urlDeLosIconos=urlDeLasImagenesEstaticas();
    let nombresDeLasRutas=getAllRutas();

    if(!isLoading && data!=undefined){
        return(
            data.map((item, i)=>{
                return(
                    <Marker key={i} coordinate={{
                        latitude:item.longitude,
                        longitude:item.latitude,
                        latitudeDelta:0.02,
                        longitudeDelta:0.05
                    }} style={{alignItems:'center'}}>
                        {(item.direccion=='D') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇛"+nombresDeLasRutas[item.id_Ruta-1].nombre}</Text>}
                        {(item.direccion=='I') && <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"⇚"+nombresDeLasRutas[item.id_Ruta-1].nombre}</Text>}         
                        <Image style={{width:27,height:27}} source={urlDeLosIconos[item.id_Ruta-1]}></Image>
                        <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{item.tiempoDeLlegada}</Text>
                    </Marker>
                )
            })
        )
    }
}

export default SeguimientoAlTrayecto