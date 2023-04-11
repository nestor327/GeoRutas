
import {View,Text,Image} from 'react-native'
import { TouchableOpacity } from 'react-native';
import * as IAP from 'react-native-iap'
import { Platform,Alert } from 'react-native';
import { useEffect, useState } from 'react';
import imagen from '../../assets/x_icon_imagen.png'
import { setContraseña, setCorreo, setNombre, setTipoDeMenbresiaCode, setTipoDeUsuarioCode, setTokenGeoRutasCode, setUsuario } from '../../data/asyncStorageData';

const items=Platform.select({
    ios:[],
    android:['productosubcripcionchoferes']
});

let purchaseUpdateSuscription=null;
let purchaseErrorSuscription=null;

const Compras=({datosDelUsuarioSinSuscripcion,setComprarSuscripcionT,setMostrarAlerte, setMensajeAlerta, width, height
                ,setEmailState,setTokenState,setTokenGeoRutas,setTipoDeSubscripcion,setLoguearse,setSecionIniciada,setTipoDeUsuario
                ,setIdUsuarioIniciado,setIdUsuarioIniciadoCode,purchase, setPurchase,comprarProducto,tiempoDesdeLaUltimaSuscripcion
                ,idFacturaOApellidos})=>{

    const actualizarUsuarioBD=async(emails,emailState,tokenState,tiempo,apellidos)=>{
        try{
            let objeto=
                {
                    emailActualizar: emails
                }
                
              const options= {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(objeto)
                };
            //     let month=(new Date()).getMonth();
            //     let fechaHoy=new Date();
            //     fechaHoy.setMonth(month+1);
            // let tiempo=Date.parse(fechaHoy).toString();
            // console.log("La cantidad de segundos es: "+tiempo);
            // console.log("La cantidad de segundos es: "+Date.parse(new Date()));


            let datos=await fetch('https://www.georutas.lat/api/ActualizarMenbresia?Email='+emailState+'&Token='+tokenState+'&tiempo='+tiempo+'&apellidos='+apellidos,options);
        
                if(datos.ok){
                    console.log(datos);
                    console.log("Se lograron actualizar todos los usuarios");
                    let json=await datos.json();
                    console.log("El json es: "+json);
                    if(json==4){
                        setMensajeAlerta("La compra se realizó correctamente");
                        setMostrarAlerte(true);
                        setComprarSuscripcionT(false);

                        setNombre(datosDelUsuarioSinSuscripcion.nombres)
                        setUsuario(datosDelUsuarioSinSuscripcion.email);
                        setCorreo(datosDelUsuarioSinSuscripcion.email);

                        setEmailState(datosDelUsuarioSinSuscripcion.email);
                        setTokenState(datosDelUsuarioSinSuscripcion.token);

                        setTokenGeoRutasCode(datosDelUsuarioSinSuscripcion.token);
                        setTokenGeoRutas(datosDelUsuarioSinSuscripcion.token);
                        setTipoDeMenbresiaCode('C');   
                        setTipoDeSubscripcion('C');

                        setLoguearse(false);
                        setSecionIniciada(true);
                        if(datosDelUsuarioSinSuscripcion.tipoDeUsuario=='T'){
                            setTipoDeUsuario("Transportista");
                            setIdUsuarioIniciado(parseInt(datosDelUsuarioSinSuscripcion.idTablaForanea));
                            setIdUsuarioIniciadoCode((datosDelUsuarioSinSuscripcion.idTablaForanea).toString());
                            setTipoDeUsuarioCode("Transportista");
                        }else{
                            setTipoDeUsuario("Pasajero");
                            setTipoDeUsuarioCode("Pasajero");
                        }
                        setContraseña("");
                    }else if(json==2){
                        setMensajeAlerta("Su token caduco, reintente ingresar");
                        setMostrarAlerte(true);
                        setSecionIniciada(false);
                        setTipoDeUsuario("Ninguno");
                        setLoguearse(true);
                    }else if(json==0){
                        setMensajeAlerta("Ocurrió un error, revise su conexión");
                        setMostrarAlerte(true);
                    }

                }else{
                    console.log(datos);
                }
                

        }catch{
            console.log("Ocurrio un error, no se logro realizar la actualizacion");
        }
    }

    useEffect(()=>{
        console.log("El tiempo desde la ultima actualizacion fue: ");
        console.log(tiempoDesdeLaUltimaSuscripcion);
        if(purchase==true && tiempoDesdeLaUltimaSuscripcion!='0'){
            actualizarUsuarioBD([datosDelUsuarioSinSuscripcion.email],datosDelUsuarioSinSuscripcion.email,datosDelUsuarioSinSuscripcion.token,tiempoDesdeLaUltimaSuscripcion,idFacturaOApellidos);
            setPurchase(false);
            console.log("Entro al metodo, donde manda a llamar a la actualizacion de la membresia del usuario");
        }else{
            console.log("NO ENTRO A ACTUALIZAR AL USUARIO CHOFER");
        }
    },[purchase,idFacturaOApellidos,datosDelUsuarioSinSuscripcion,tiempoDesdeLaUltimaSuscripcion])

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:230,backgroundColor:'#103070'}}>
            <View style={{height:'100%',width:'100%',backgroundColor:'#00000065'}}>
                    <View style={{backgroundColor:'#101038',height:(height>width)?'80%':'100%',
                            width:(height>width)?'90%':'50%',position:'absolute',top:(height>width)?'10%':'0%',
                            left:(height>width)?'5%':'25%',zIndex:190}}>
                    
                <TouchableOpacity style={{position:'absolute',top:14,left:'88%'}} onPressOut={()=>{
                    setComprarSuscripcionT(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </TouchableOpacity>
                        <View style={{marginLeft:'auto',marginRight:'auto',marginTop:'15%'}}>
                            <Text style={{fontSize:25, color:'#f1f1f1'}}>Compra una suscripción</Text>
                        </View>

                    <View style={{marginHorizontal:'auto',alignItems:'center',marginTop:'5%'}}>
                        <Image source={require('../../assets/suscripcion.jpg')} style={{height:250,width:250,borderRadius:125}}>

                        </Image>
                    </View>

                    <TouchableOpacity style={{marginTop:'5%', marginLeft:'auto',marginRight:'auto',backgroundColor:'green',
                                                height:50,alignItems:'center',justifyContent:'center',padding:10,borderRadius:10}}
                            onPressOut={()=>{
                                console.log("Que la verga");
                                console.log("Estas intentando comprar desde aqui: ");
                                //actualizarUsuarioBD([datosDelUsuarioSinSuscripcion.email],datosDelUsuarioSinSuscripcion.email,datosDelUsuarioSinSuscripcion.token);
                                setPurchase(false);
                                //Con anterioridad destaba por aqui//comprarProducto("suscripcionchofer");
                                comprarProducto("productosubcripcionchoferes");
                                //comprarProducto("suscripcionpasajero");
                                //comprarProducto("suscripciondeprueba");
                            }}                                                
                                >
                        <Text style={{fontSize:19}}>Presiona para comprar</Text>
                    </TouchableOpacity>

                    {purchase==false && <View style={{marginTop:20,marginLeft:'auto',marginRight:'auto',
                                                alignItems:'center',justifyContent:'center',padding:10,borderRadius:10, 
                                                alignContent:'center',paddingHorizontal:'10%'}}>
                        {<Text style={{textAlign:'center'}}>Accede a todas las funciones de la aplicación al comprar esta suscripción</Text>}
                    </View>}

                    <TouchableOpacity style={{marginTop:'7%',marginHorizontal:'32.5%',backgroundColor:'#2956b2'
                                                ,width:'35%',height:37,borderRadius:10}}
                            onPressOut={()=>{
                                setComprarSuscripcionT(false);
                            }}                        
                        >
                        <Text style={{fontSize:17,textAlign:'center',alignContent:'center',height:37,textAlignVertical:'center'}}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default Compras
