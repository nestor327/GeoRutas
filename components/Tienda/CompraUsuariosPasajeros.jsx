
import {View,Text,Image} from 'react-native'
import { TouchableOpacity } from 'react-native';
import * as IAP from 'react-native-iap'
import { Platform,Alert } from 'react-native';
import { useEffect, useState } from 'react';
import imagen from '../../assets/x_icon_imagen.png';
import { setTipoDeMenbresiaCode } from '../../data/asyncStorageData';

let purchaseUpdateSuscription=null;
let purchaseErrorSuscription=null;

const ComprasUsuariosPasajeros=({datosDelUsuarioSinSuscripcion,setMostrarComprasPasajeros,setMostrarAlerte, setMensajeAlerta, width, height
                ,setTipoDeSubscripcion,setLoguearse,setSecionIniciada,setTipoDeUsuario,setMostrarAnuncioRewarded,setmenDos,setMostrarItemMenuUno
                ,setIdRutaAMostrar,setOcultarTrayecto,setVerRutasCercanas,eliminarAnuncios,setEliminarAnuncios,purchase,setPurchase,comprarProducto
                ,idFacturaOApellidos,tiempoDesdeLaUltimaSuscripcion,modoOscuro,iniciarRecorridoDeLaTrayectoria,setIniciarRecorridoDeLaTrayectoria
                ,emailState,setMostrarRutaASeleccionar})=>{

    const actualizarUsuarioBD=async(emails,emailStateDos,tokenState,tiempo,apellidos)=>{
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


            let datos=await fetch('https://georutas.somee.com/api/ActualizarMenbresia?Email='+emailStateDos+'&Token='+tokenState+'&tiempo='+tiempo+'&apellidos='+apellidos,options);
        
                if(datos.ok){
                    console.log(datos);
                    console.log("Se lograron actualizar todos los usuarios");
                    let json=await datos.json();
                    console.log("El json es: "+json);
                    if(json==4){
                        setMensajeAlerta("La compra se realizó correctamente");
                        setMostrarAlerte(true);
                        setTipoDeMenbresiaCode('A');   
                        setTipoDeSubscripcion('A');
                        setMostrarComprasPasajeros(false);
                    }else if(json==2){
                        setMensajeAlerta("Su token caduco, reintente ingresar");
                        setMostrarAlerte(true);
                        setSecionIniciada(false);
                        setTipoDeUsuario("Ninguno");
                        setLoguearse(true);
                        setMostrarComprasPasajeros(false);
                    }else if(json==0){
                        setMensajeAlerta("Ocurrió un error, revise su conexión");
                        setMostrarAlerte(true);
                        setMostrarComprasPasajeros(false);
                    }

                }else{
                    console.log(datos);
                }
                

        }catch{
            console.log("Ocurrio un error, no se logro realizar la actualizacion");
        }
    }

    useEffect(()=>{
        console.log("Desde el componente CompraUsuarioPasajeros intentas acceder a la actualizacion y los datos que obtienes al intentar hacerlo es: ");
        console.log(purchase);
        console.log(tiempoDesdeLaUltimaSuscripcion);
        if(purchase==true && tiempoDesdeLaUltimaSuscripcion!='0'){
            console.log("LA INFORMACION DEL USUARIO ES: ");
            // console.log(datosDelUsuarioSinSuscripcion);
            actualizarUsuarioBD([datosDelUsuarioSinSuscripcion.email],datosDelUsuarioSinSuscripcion.email,datosDelUsuarioSinSuscripcion.token,tiempoDesdeLaUltimaSuscripcion,idFacturaOApellidos);            
            setPurchase(false);
        }
    },[purchase,datosDelUsuarioSinSuscripcion,idFacturaOApellidos,tiempoDesdeLaUltimaSuscripcion])

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:230,backgroundColor:'#00000065'}}>
                    <View style={{backgroundColor:'#101038',height:(height>width)?'80%':'100%',
                            width:(height>width)?'90%':'50%',position:'absolute',top:(height>width)?height*0.1-width*0.1:'0%',
                            left:(height>width)?'5%':'25%',zIndex:190}}>
                    
                <TouchableOpacity style={{position:'absolute',top:14,left:'88%'}} onPressOut={()=>{
                    let colorRes='#102769';
                    if(modoOscuro){
                        colorRes='#151553';
                    }

                    setmenDos([{display:'none',color:colorRes}]);
                    setMostrarItemMenuUno(false);    
                    setIdRutaAMostrar(-1);           
                    setOcultarTrayecto(false);
                    setVerRutasCercanas(false);
                    setMostrarComprasPasajeros(false);
                    setEliminarAnuncios(false);
                    if(iniciarRecorridoDeLaTrayectoria==true){
                        setIniciarRecorridoDeLaTrayectoria(false);
                    }
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </TouchableOpacity>
                        <View style={{marginLeft:'auto',marginRight:'auto',marginTop:'15%'}}>
                            <Text style={{fontSize:33,fontWeight:'bold', color:'#f1f1f1',textAlign:'center',marginHorizontal:20}}>{(eliminarAnuncios==false)?"Acceso Denegado":"Eliminar los anuncios"}</Text>
                            <Text style={{fontSize:14, color:'#f1f1f199',marginHorizontal:20,marginTop:10,textAlign:'center'}}>{(eliminarAnuncios==false)?"Si quieres acceder, mira un anuncio, comparte tu ubicación o compra una suscripción":
                                            "Compra una suscripción para eliminar los anuncios y tener acceso a todas las funciones de la aplicación"}</Text>
                        </View>

                    <View style={{marginHorizontal:'auto',alignItems:'center',marginTop:'5%'}}>
                        <Image source={require('../../assets/suscripcion.jpg')} style={{height:(height>width)?width*0.5:height*0.5,width:(height>width)?width*0.5:height*0.5,borderRadius:width*0.25}}>

                        </Image>
                    </View>

                    {eliminarAnuncios==false && <TouchableOpacity style={{marginTop:'5%', marginLeft:'auto',marginRight:'auto'
                                                ,backgroundColor:(eliminarAnuncios)?'green':'#2956b2',height:40,alignItems:'center'
                                                ,justifyContent:'center',borderRadius:10,padding:10,width:'auto'}}
                            onPressOut={()=>{
                                
                                console.log("Compartiendo Ubicacion");
                                setMostrarRutaASeleccionar(true);
                            }}                                                
                                >
                        <Text style={{fontSize:18, color:'#f1f1f1',height:30}}>{"Compartir Ubicación"}</Text>
                    </TouchableOpacity>}

                    <TouchableOpacity style={{marginTop:'2.5%', marginLeft:'auto',marginRight:'auto',backgroundColor:(eliminarAnuncios)?'green':'#2956b2',
                                                height:50,alignItems:'center',justifyContent:'center',padding:10,borderRadius:10,width:(eliminarAnuncios)?'auto':'45%'}}
                            onPressOut={()=>{
                                if(eliminarAnuncios){
                                    //Con anterioridad estaba aqui//comprarProducto("suscripcionpasajero");
                                    if(emailState=='nestordgt27@gmail.com' || emailState=='perlavanessa2008@gmail.com'){
                                        comprarProducto("productodeprueba");
                                    }else{
                                        comprarProducto("productosuscripcionpasajero");
                                    }
                                }else{
                                    setMostrarAnuncioRewarded(true);
                                    console.log("Estas pidiendo el anuncio");
                                }
                                //actualizarUsuarioBD([datosDelUsuarioSinSuscripcion.email],datosDelUsuarioSinSuscripcion.email,datosDelUsuarioSinSuscripcion.token);
                                //setPurchase(false);
                            }}                                                
                                >
                        <Text style={{fontSize:19, color:'#f1f1f1',alignItems:'center'}}>{(eliminarAnuncios==true)?"Presiona para comprar":"Ver anuncio"}</Text>
                    </TouchableOpacity>

                    {purchase==false && <View style={{marginTop:10,marginLeft:'auto',marginRight:'auto',
                                                alignItems:'center',justifyContent:'center',padding:10,borderRadius:10, 
                                                alignContent:'center',paddingHorizontal:'10%'}}>
                        {<Text style={{textAlign:'center',color:'#f1f1f199'}}>Accede a todas las funciones de la aplicación y elimina los anuncios al comprar una suscripción</Text>}
                    </View>}

                    <View style={{flexDirection:'row', justifyContent:'space-around',marginHorizontal:30}}> 
                        {eliminarAnuncios==false && <TouchableOpacity style={{marginTop:(eliminarAnuncios==false)?'7%':'3%',backgroundColor:'green'
                                                    ,width:'40%',height:37,borderRadius:10}}
                                onPressOut={()=>{
                                    //comprarProducto("suscripcionpasajero");      
                                    if(emailState=='nestordgt27@gmail.com' || emailState=='perlavanessa2008@gmail.com'){
                                        comprarProducto("productodeprueba");
                                    }else{
                                        comprarProducto("productosuscripcionpasajero");
                                    }
                                    
                                }}                        
                            >
                            <Text style={{fontSize:17,textAlign:'center',alignContent:'center',height:37,textAlignVertical:'center', color:'#f1f1f1'}}>
                            Comprar
                            </Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={{marginTop:(eliminarAnuncios==false)?'7%':'3%',backgroundColor:'#2956b2'
                                                    ,width:'40%',height:37,borderRadius:10}}
                                onPressOut={()=>{
                                    let colorRes='#102769';
                                    if(modoOscuro){
                                        colorRes='#151553';
                                    }

                                    setmenDos([{display:'none',color:colorRes}]);
                                    setMostrarItemMenuUno(false);    
                                    setIdRutaAMostrar(-1);           
                                    setOcultarTrayecto(false);
                                    setVerRutasCercanas(false);
                                    setMostrarComprasPasajeros(false);
                                    setEliminarAnuncios(false);
                                    if(iniciarRecorridoDeLaTrayectoria==true){
                                        setIniciarRecorridoDeLaTrayectoria(false);
                                    }
                                }}                        
                            >
                            <Text style={{fontSize:17,textAlign:'center',alignContent:'center',height:37,textAlignVertical:'center', color:'#f1f1f1'}}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
        </View>
    )
}


export default ComprasUsuariosPasajeros
