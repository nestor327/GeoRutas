import { useEffect } from "react";
import { Marker } from "react-native-maps"
import getAllRutas from "../../data/rutasManagua";
import { Image, Text } from "react-native";
import urlDeLasImagenesEstaticas from "../../data/urlDeLasImagenesDeLasRutas";


const RutaDelUsuarioQueComparte=({emailState, tokenState,idDeLaRutaALaQueComparteElPasajero,id_usuarioTransportistaQueComparte,enviarUbicacionComoUnPasajero
                                ,userLocation,modoOscuro,compartiendoUbicacionComoPasajero})=>{


    let todasLasRutas=getAllRutas();
    let todasLasUrls=urlDeLasImagenesEstaticas();

    //Este useefect esta malo aqui, hay que sacarlo para que todo pueda funcionar correctamente.
    useEffect(()=>{
                
        //Recuerda verificar que el usuario al cual compartes sea de la misma coperativa.

        let k=null;
        if(compartiendoUbicacionComoPasajero==true){
            k=setInterval(() => {
                let fecha= new Date();
                console.log("yes yes, estas dentro del ciclo"+fecha.getSeconds());
                if(emailState.length>=8 && idDeLaRutaALaQueComparteElPasajero>=1 && id_usuarioTransportistaQueComparte!=-2){
                    enviarUbicacionComoUnPasajero(emailState, tokenState,idDeLaRutaALaQueComparteElPasajero,id_usuarioTransportistaQueComparte);
                    console.log("La mierda esta entrando aqui tambien al backend");                    
                    console.log(userLocation);
                }

            }, 4000);
        }
            
        

        return(
            ()=>{
                clearInterval(k);
            }
        )
    },[emailState, tokenState,idDeLaRutaALaQueComparteElPasajero,id_usuarioTransportistaQueComparte,compartiendoUbicacionComoPasajero]);

    return(
        <Marker coordinate={{
            latitude:userLocation.latitude,
            longitude:userLocation.longitude
            }}
            style={{alignItems:'center'}}
            line
            >
                <Text style={{color:(!modoOscuro)?'black':'#c3c3c3'}}>{"Tú "+todasLasRutas.filter(elem => elem.id_Ruta==idDeLaRutaALaQueComparteElPasajero)[0].nombre}</Text>
                <Image 
                    style={{height:35,width:35}}
                    source={todasLasUrls[idDeLaRutaALaQueComparteElPasajero-1]}
                ></Image>
            </Marker>
    )
}

export default RutaDelUsuarioQueComparte