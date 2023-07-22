import {View,ScrollView, StatusBar, Text, TouchableOpacity, Image,FlatList } from 'react-native'
import RutasBarItem from '../RutasBarItem';
import getAllRutas from '../../data/rutasManagua';
import imagen from '../../assets/x_icon_imagen.png';
import {useEffect,useState} from 'react';
import { PERMISSIONS, check, openSettings, request } from 'react-native-permissions';
import obtenerTodasLasCoordenadas from '../../data/obtenerTodasLasCoordenadas.js';
import { getIdUsuarioTransportistaQueComparten, setCompartiendoUbicacionParaElTransportista, setIdRutaDelUsuarioQueComparten } from '../../data/asyncStorageData';


const SeleccionarRuta=({height,width,setMostrarRutaASeleccionar,setCompartiendoUbicacionComoPasajero,setMostrarComprasPasajeros,setIdDeLaRutaALaQueComparteElPasajero
        ,setMostrarLaLineaDeLaRutaQueComparte,bacgroundPermisos, askLocationBacgroundPermission,mostrarAlerta,setMostrarAlerte,setMensajeAlerta,setBacgroundPermisos
        ,userLocation,setId_usuarioTransportistaQueComparte})=>{

    const rutas=getAllRutas();

    const rutasFiltradas=[];
    const idRutas=[];
    const obtenerCoordenadasCercanas=obtenerTodasLasCoordenadas(userLocation.latitude + 150*0.00000929,userLocation.latitude - 150*0.00000929,
        userLocation.longitude + 150*0.00000929,userLocation.longitude - 150*0.00000929);

    for(let k=0;k<obtenerCoordenadasCercanas.length;k++){
        if(idRutas.indexOf(obtenerCoordenadasCercanas[k].id_Ruta)<0){
            let elemento=rutas.filter(elem => elem.id_Ruta==obtenerCoordenadasCercanas[k].id_Ruta)[0];
            if(elemento!=undefined){
                rutasFiltradas.push(elemento);
                idRutas.push(obtenerCoordenadasCercanas[k].id_Ruta);
            }
        }
    }   
    
    console.log("La mierda es: ");
    console.log(rutasFiltradas);
        // console.log("La mierda de los datos son: ");
        // console.log(obtenerCoordenadasCercanas);

    const [solicitarbacGraundPermisos, setSolicitarbacGraundPermisos]=useState(false);

    const solicitarUbicacionEnSegundoPlano=async()=>{
        
        if(bacgroundPermisos=='blocked' || bacgroundPermisos=='denied'){
            console.log("Intentaste abrir los pinches ajustes...");
            setBacgroundPermisos(await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));
            openSettings();
        }else{
            setBacgroundPermisos(await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION));
        }
    }

    useEffect(()=>{
        if(bacgroundPermisos!='granted' && mostrarAlerta==false && solicitarbacGraundPermisos==true){
            solicitarUbicacionEnSegundoPlano();
            console.log("Entro aqui la mierda a pedir el permiso");
        }

        getIdUsuarioTransportistaQueComparten(setId_usuarioTransportistaQueComparte);
        console.log("Intentaste encontrar la mierda del id")

    },[mostrarAlerta,solicitarbacGraundPermisos,bacgroundPermisos])

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:235,backgroundColor:'#00000065'}}>
            <View style={{backgroundColor:'#101038',height:'80%',width:'90%',position:'absolute',top:height*0.1-width*0.1,
                left:'5%',zIndex:190,alignItems:'center'}}>
                
                <TouchableOpacity style={{position:'absolute',top:14,left:'88%'}} onPressOut={()=>{
                    setMostrarRutaASeleccionar(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </TouchableOpacity>

                <Text style={{marginTop:'15%',fontWeight:'bold',fontSize:33,color:'#f1f1f1'}}>Selecciona una Ruta</Text>

                <Image source={require('../../assets/seleccionarRuta.jpeg')}
                    style={{height:width*0.5,width:width*0.5,borderRadius:width*0.25,marginTop:'5%'}}
                ></Image>

                <View style={{marginTop:10}}>
                    <Text style={{color:'#f1f1f199',fontSize:15.5,marginHorizontal:'10%',textAlign:'center'}}>Selecciona la ruta en la que vas ahora, si resulta ser errónea, tu cuenta podría ser bloqueada por un día o más.</Text>
                </View>

                <View style={{borderWidth:1,borderColor:'#f1f1f1', height:'21%',width:'80%',marginTop:'5%',borderRadius:10,
                        alignSelf:'center',justifyContent:'center'}}>
                    {rutasFiltradas.length==0 &&
                    <Text style={{textAlign:'center',color:'#f1f1f1'}}>No hay rutas que pasen cerca de tu ubicación.</Text>}
                    {rutasFiltradas.length>0 && <FlatList 
                      data={rutasFiltradas.filter(elem => elem.id_Ruta!=25)}
                      renderItem={({ item }) => 
                                                <TouchableOpacity style={{width:'35%',borderRadius:6,
                                                        justifyContent:'center',alignItems:'center',flexDirection:'column'}}
                                                        onPress={()=>{
                                                            if(bacgroundPermisos!='granted'){
                                                                setMensajeAlerta("Permita que la aplicación tenga acceso a su ubicación en segundo plano.");
                                                                setMostrarAlerte(true);
                                                                setSolicitarbacGraundPermisos(true);
                                                                console.log("Los permisos estan en: ");
                                                                console.log(bacgroundPermisos);
                                                            }else{
                                                                setCompartiendoUbicacionComoPasajero(true);
                                                                setCompartiendoUbicacionParaElTransportista("1");
                                                                setMostrarComprasPasajeros(false);
                                                                console.log("El puto idruta es: "+item.id_Ruta);
                                                                setIdDeLaRutaALaQueComparteElPasajero(item.id_Ruta);
                                                                setIdRutaDelUsuarioQueComparten(item.id_Ruta.toString());
                                                                setMostrarLaLineaDeLaRutaQueComparte(true);                                                                
                                                            }
                                                        }}
                                                        >

                                                     <RutasBarItem color={item.color} numeroDeRuta={item.nombre} ></RutasBarItem>
                                                </TouchableOpacity>
                                                
                                                }
                        keyExtractor={item => item.nombre}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-around',
                        marginBottom: 8}}
                        contentContainerStyle={{paddingHorizontal: 8,
                            paddingVertical: 8,}}
                    />}

                </View>

                <TouchableOpacity
                    onPress={()=>{
                        setMostrarRutaASeleccionar(false);
                    }}
                    style={{marginTop:'10%',backgroundColor:'#2956b2',width:'40%',height:37,borderRadius:10}}
                >
                    <Text style={{fontSize:17,textAlign:'center',alignContent:'center',height:37,textAlignVertical:'center', color:'#f1f1f1'}}>Cancelar</Text>
                </TouchableOpacity> 

                
            </View>
        </View>
    )
}

export default SeleccionarRuta