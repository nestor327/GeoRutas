import * as react from 'react'
import { Keyboard,View,Text, TextInput,Image,StatusBar, TouchableOpacity,ActivityIndicator, Button, Linking} from 'react-native'
import imagen from '../assets/x_icon_imagen.png';
import {setUsuario,getUsuario,setContraseña,getContraseña, setTokenGeoRutasCode, setTipoDeMenbresiaCode, getTipoDeMenbresia, setCorreo, setTipoDeUsuarioCode, setIdUsuarioIniciadoCode, setNombre, setApellidos, setTelefono} from '../data/asyncStorageData.js'
import { useQuery } from 'react-query';
import { AccessToken, LoginButton } from 'react-native-fbsdk';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";

//keytool -exportcert -alias my-key-alias -keystore 
//"C:\Users\Nestor Gonzalez\Desktop\GeoRutas\android\app\my-upload-key.keystore" |
// "openssl" sha1 -binary | "C:\Users\Nestor Gonzalez\Downloads\bin\openssl" base64


const Login=({setLoguearse,setRegistrarse,setSecionIniciada,setLosguearTransportista
        ,setTipoDeUsuario,height,width,setIdUsuarioIniciado,setUsuarioLogueado,setTokenGeoRutas
        ,setConfirmarCodigo,setCambiarPassword,setEmailState, setTokenState,setTipoDeSubscripcion
        ,setMostrarAlerte,setMensajeAlerta,setComprarSuscripcionT,setDatosDelUsuarioSinSuscripcion
        ,setNombreAdmin
        })=>{
 
    const [usuarioState,setUsuarioState]=react.useState("");
    const [contrasenia, setContrasenia]=react.useState("");
    const [tipoDeUsuarioIngresando, setTipoDeUsuarioIngresando]=react.useState('Pasajero');
    const [estylosStates, setEstilosStare]=react.useState({height:(height>width)?height*0.6:height});
    const [recordarContrasenia,setRecordarContrasenia]=react.useState(false);
    react.useEffect(()=>{        
        getUsuario(setUsuarioState);        
        if(usuarioState.includes("@gmail.comfb")){
            setUsuarioState("");
        }
    },[])

    const obtenerContrasenia=async()=>{
        try{
            const value=await AsyncStorage.getItem('contraseñausuario');    

            if(value!=null && value.length>0){
                setRecordarContrasenia(true);
                setContrasenia(value);
            }else{
                setContrasenia("");
            }
              
        }catch (e){
            console.log("No se encontro el usuario");
            setContraseña("");
        }
    }

    react.useEffect(()=>{
        //getContraseña(setContrasenia);
        obtenerContrasenia();
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
            iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
            openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
            profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
          });
    },[])
    
    react.useEffect(()=>{
        if(height>width){
            setEstilosStare({height:height*0.6});
        }else{
            setEstilosStare({height:height});
        }
        
    },[height])

    const verificandoContrasenia=async (correoUsuario,password)=>{

        setUsuario(usuarioState.toString().toLowerCase());
        setCorreo(usuarioState);
        setEmailState(usuarioState.toString().toLowerCase());
        
        let objeto={
            email: correoUsuario.toString().toLowerCase(),
            password: password,
            rememberMe: true
          }

          const options= {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
            };

        let datos=null;
        
        try{            
            datos=await fetch('https://www.georutas.lat/api/Acceso',options);            
        }catch (e){
            datos=null;
        }



        if(datos!=null && datos.ok){
            console.log("Entras hasta aqui");
            console.log(datos);
            let json=null;
            try{
                json=await datos.json();            
            }catch{
                json=null;
            }            
            console.log(json);

            // let menbre=null;
            // try{
            //     menbre=await AsyncStorage.getItem('tipoDeMenbresia');
            // }catch{
            //     menbre="";
            // }
            // console.log(menbre);
            
            if(json==null){
                setMensajeAlerta("Revisa tu conexión a internet");
                setMostrarAlerte(true);
            }else if(json.token=="0"){
                setMensajeAlerta("Ocurrió un error, vuelve a intentarlo");
                setMostrarAlerte(true);
            }else if(json.token=="1"){
                setMensajeAlerta("Regístrese con su correo antes de intentar acceder");
                setMostrarAlerte(true);
            }else if(json.token=="2"){
                setMensajeAlerta("Su cuenta ha sido bloqueada, reintente más tarde");
                setMostrarAlerte(true);
            }else if(json.token=="3"){
                setMensajeAlerta("Use el código que se le envió a su correo para activar su cuenta");
                setMostrarAlerte(true);
                setConfirmarCodigo(true);
            }else if(json.token=="4"){
                setMensajeAlerta("Su contraseña es incorrecta");
                setMostrarAlerte(true);
            }else if(json.token.length>1){
                
                if(json.tipoSubscripcion=='B'  || json.tipoSubscripcion=='K'){
                    setTipoDeMenbresiaCode(json.tipoSubscripcion);
                    setMensajeAlerta("Renueve su subscripción para poder acceder");
                    setMostrarAlerte(true);
                    setComprarSuscripcionT(true);
                    setDatosDelUsuarioSinSuscripcion({apellidos: json.apellidos, idTablaForanea: json.idTablaForanea, 
                                                       nombres: json.nombres, tipoDeUsuario: json.tipoDeUsuario, 
                                                       tipoSubscripcion: json.tipoSubscripcion, token: json.token,email:correoUsuario.toString().toLowerCase()});
                    //return;
                }
                setNombre(json.nombres);
                setApellidos(json.apellidos);   
                setNombreAdmin(json.apellidos);     
                console.log("Se guardo el apellido"+json.apellidos);
                setTokenState(json.token);
                setTokenGeoRutasCode(json.token);
                setTokenGeoRutas(json.token);
                setTipoDeMenbresiaCode(json.tipoSubscripcion);
                setTipoDeSubscripcion(json.tipoSubscripcion);
                if(json.tipoSubscripcion!='B'){
                    setMensajeAlerta("Has iniciado sesión");
                    setMostrarAlerte(true);
                }
                
                //setMostrarAlerte(true);
                setLoguearse(false);
                setSecionIniciada(true);                
                if(json.tipoDeUsuario=='T'){
                    setTipoDeUsuario("Transportista");
                    setIdUsuarioIniciado(parseInt(json.idTablaForanea));  
                    setIdUsuarioIniciadoCode((json.idTablaForanea).toString());
                    setTipoDeUsuarioCode("Transportista");
                }else{
                    setTipoDeUsuario("Pasajero");
                    setTipoDeUsuarioCode("Pasajero");
                }
                if(recordarContrasenia){
                    setContraseña(contrasenia);
                }else{                    
                setContraseña("");
                }
                return;
            }

        }else{
            setMensajeAlerta("Revisa tu conexión a internet");
            setMostrarAlerte(true);            
        }        
    }

    const registrarseConGoogle=async(userIfno)=>{
        
        
        try {
            await GoogleSignin.signOut();
        } catch (error) {
          console.error(error);
        }

        let objeto={            
            idUser: userIfno.email,
            token: "s",
            tipoAutenticacion: "google",
            email: userIfno.email,
            tiempoToken: 24,
            nombres: userIfno.givenName,
            apellidos: userIfno.familyName
          }

          const options= {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
            };

        let datos=null;
        console.log("Llega hasta aqui y obtienes");
        try{
            console.log("asdasd");
            datos=await fetch('https://www.georutas.lat/api/RegistrosExternos',options);
            console.log("asdasd");
        }catch (er){
            datos=null;
            console.log("aqui esta el error");
        }
        console.log("Llega hasta aqui y obtienes");
        console.log(datos);


        if(datos!=null && datos.ok){
            //Recuerda que inmediatamente aqui refrescar el token
            
            let json=null;
            try{
                json=await datos.json();
            }catch{
                json=null;
            }
            
            console.log("El registro se logro exitosamente");
            console.log(json);

            let respuestaLeida=true;

            if(json==null || json.respuesta=="0"){
                setMensajeAlerta("Ocurrió un error, reintente ingresar");
                setMostrarAlerte(true);
                return;
            }

            if(json.respuesta!="1"){
                try{
                    datos=await fetch('https://www.georutas.lat/api/RegistrosExternos',options);
                    respuestaLeida=false;
                }catch (er){
                    datos=null;
                }
            }

            if(datos!=null && datos.ok && respuestaLeida==false){
                try{
                    json=await datos.json();   
                }catch{
                    json=null;
                }
                
                console.log("Los datos nuevos traidos desde el servidor son: ");
                console.log(json);
            }else if(respuestaLeida==false || !datos.ok){
                setMensajeAlerta("Reintenta ingresar");
                setMostrarAlerte(true);
                return;
            }

            if(json==null || json.respuesta=="0" || json.respuesta!="1"){
                setMensajeAlerta("Ocurrió un error, reintente ingresar");
                setMostrarAlerte(true);
                return;
            }
            
            if(json.tipoSubscripcion=='K' || json.tipoSubscripcion=='B'){
                setTipoDeMenbresiaCode(json.tipoSubscripcion);
                setMensajeAlerta("Renueve su subscripción para poder acceder");
                setMostrarAlerte(true);                
                setComprarSuscripcionT(true);
                setDatosDelUsuarioSinSuscripcion({apellidos: json.apellidos, idTablaForanea: json.idTablaForanea, 
                    nombres: json.nombres, tipoDeUsuario: json.tipoDeUsuario, 
                    tipoSubscripcion: json.tipoSubscripcion, token: json.token,email:userIfno.email.toString().toLowerCase()});
                //return;
            }
            setNombre(json.nombres)
            setApellidos(json.apellidos); 
            setNombreAdmin(json.apellidos);
            console.log("Se guardo el apellido"+json.apellidos);
            setUsuario(json.email);
            setCorreo(json.email);
            setEmailState(json.email);
            setTokenState(json.token);

            setTokenGeoRutasCode(json.token);
            setTokenGeoRutas(json.token);
            setTipoDeMenbresiaCode(json.tipoSubscripcion);      
            setTipoDeSubscripcion(json.tipoSubscripcion);
            if(json.tipoSubscripcion!='B'){
                setMensajeAlerta("Has iniciado sesión con Google");
                setMostrarAlerte(true);
            }
            
            //setMostrarAlerte(true);
            setLoguearse(false);
            setSecionIniciada(true);
            if(json.tipoDeUsuario=='T'){
                setTipoDeUsuario("Transportista");
                setIdUsuarioIniciado(parseInt(json.idTablaForanea));
                setIdUsuarioIniciadoCode((json.idTablaForanea).toString());
                setTipoDeUsuarioCode("Transportista");
            }else{
                setTipoDeUsuario("Pasajero");
                setTipoDeUsuarioCode("Pasajero");
            }
            setContraseña("");
            console.log("El token de iniciar sesion es: "+json.token);
            return;

        }else{
            setMensajeAlerta("Ocurrió un error, reintente ingresar");
            setMostrarAlerte(true);
        }

    }



    const registrarseConFacebook=async(userIfno)=>{
        //Aqui nos registramos con google, en dado caso de que ya estemos registrados, entonces ingresamos nada mas
        let objeto={            
            idUser: userIfno.userID,
            token: userIfno.accessToken,
            tipoAutenticacion: "facebook",
            email: userIfno.userID,
            tiempoToken: 24,
            nombres: "Desconocido",
            apellidos: "Desconocido"
          }

          const options= {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
            };

        let datos=null;
        try{
            datos=await fetch('https://www.georutas.lat/api/RegistrosExternos',options);
        }catch (er){
            datos=null;
        }

        if(datos!=null && datos.ok){
            //Recuerda que inmediatamente aqui refrescar el token
            
            let json=null;
            try{
                json=await datos.json();
            }catch{
                json=null;
                return;
            }
            
            console.log("El registro se logro exitosamente");
            console.log(json);

            let respuestaLeida=true;

            if(json==null || json.respuesta=="0"){
                setMensajeAlerta("Ocurrió un error, reintente ingresar");
                setMostrarAlerte(true);
                return;
            }

            if(json.respuesta!="1"){
                try{
                    datos=await fetch('https://www.georutas.lat/api/RegistrosExternos',options);
                    respuestaLeida=false;
                }catch (er){
                    datos=null;
                }
            }

            if(datos!=null && datos.ok && respuestaLeida==false){

                try{
                    json=await datos.json();
                }catch (er){
                    json=null;              
                }

                console.log("Los datos nuevos traidos desde el servidor son: ");
                console.log(json);
            }else if(respuestaLeida==false || !datos.ok){
                setMensajeAlerta("Reintenta ingresar");
                setMostrarAlerte(true);
                return;
            }

            if(json==null || json.respuesta=="0" || json.respuesta!="1"){
                setMensajeAlerta("Ocurrió un error, reintente ingresar");
                setMostrarAlerte(true);
                return;
            }
            
            if(json.tipoSubscripcion=='K' || json.tipoSubscripcion=='B'){
                setTipoDeMenbresiaCode(json.tipoSubscripcion);
                setMensajeAlerta("Renueve su subscripción para poder acceder");
                setMostrarAlerte(true);
                setComprarSuscripcionT(true);
                setDatosDelUsuarioSinSuscripcion({apellidos: json.apellidos, idTablaForanea: json.idTablaForanea, 
                    nombres: json.nombres, tipoDeUsuario: json.tipoDeUsuario, 
                    tipoSubscripcion: json.tipoSubscripcion, token: json.token,email:userIfno.userID});
                //return;
            }

            setNombre(json.nombres);
            setApellidos(json.apellidos);
            setNombreAdmin(json.apellidos);
            console.log("Se guardo el apellido"+json.apellidos);
            setUsuario(json.email);
            setCorreo(json.email);

            setEmailState(json.email.toString().toLowerCase());
            setTokenState(json.token);

            setTokenGeoRutasCode(json.token);
            setTokenGeoRutas(json.token);
            setTipoDeMenbresiaCode(json.tipoSubscripcion);   
            setTipoDeSubscripcion(json.tipoSubscripcion);
            if(json.tipoSubscripcion!='B'){
                setMensajeAlerta("Has iniciado sesión con Facebook");
                setMostrarAlerte(true);
            }            
            //setMostrarAlerte(true);
            setLoguearse(false);
            setSecionIniciada(true);
            if(json.tipoDeUsuario=='T'){
                setTipoDeUsuario("Transportista");
                setIdUsuarioIniciado(parseInt(json.idTablaForanea));
                setIdUsuarioIniciadoCode((json.idTablaForanea).toString());
                setTipoDeUsuarioCode("Transportista");
            }else{
                setTipoDeUsuario("Pasajero");
                setTipoDeUsuarioCode("Pasajero");
            }
            setContraseña("");
            console.log("El token de iniciar sesion es: "+json.token);
            return;
        }else{
            setMensajeAlerta("Ocurrió un error, reintente ingresar");
            setMostrarAlerte(true);
        }

    }


        react.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setEstilosStare({height:height});
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setEstilosStare({height:height*0.6});
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);

    const verPoliticasDePrivacidad=async()=>{
        await Linking.openURL('https://georutasn.blogspot.com/p/politicas-de-privacidad-de-la.html');
    }


    return(

        <View style={{backgroundColor:'#103070',position:'absolute',zIndex:220, height:height+StatusBar.currentHeight, width:width, paddingTop:(height>width)?height*0.2:StatusBar.currentHeight}}>
            <View style={[{backgroundColor:'#101038',width:(height>width)?width*0.8:height*0.8, paddingTop:(height>width)?height*0.07:StatusBar.currentHeight,marginLeft:'auto', marginRight:'auto'},estylosStates]}>
            {/* <View style={{width:'80%', height:40, marginLeft:'10%', marginRight:'10%', flexDirection:'row', alignItems:'center'}}>
            
            </View> */}

                <View style={{position:'absolute',top:7,left:'90%'}} onTouchEnd={()=>{
                    setLoguearse(false)                    
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>


                <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%'}}>Inicia Sesión</Text>
                <TextInput keyboardType='email-address' placeholder='Ingrese su Usuario' style={{paddingLeft:10, borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={(em)=>{
                    //setUsuario(em);
                    setUsuarioState(em);
                }}
                >{(!usuarioState.includes("@gmail.comFB"))?usuarioState:""}</TextInput>
                <TextInput secureTextEntry={true} placeholder='Ingrese su Contraseña' 
                style={{paddingLeft:10,marginTop:'7%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={(em)=>{
                    setContrasenia(em);
                }}                
                >{(!usuarioState.includes("@gmail.comFB"))?contrasenia:""}</TextInput>
                
                <TouchableOpacity style={{backgroundColor:'#2060A5', height:55,width:'60%',marginTop:30,marginLeft:'auto', marginRight:'auto',alignItems:'center', justifyContent:'center', borderRadius:10}}
                    onPressOut={()=>{
                        if(usuarioState.length==0 || !usuarioState.includes("@")){
                            setMensajeAlerta("El usuario no es válido");
                            setMostrarAlerte(true);
                            return;
                        }else if(contrasenia==null || contrasenia.length==0){
                            setMensajeAlerta("Ingrese una contraseña");
                            setMostrarAlerte(true);
                            return;
                        }

                        console.log(usuarioState);
                        console.log(contrasenia);

                        verificandoContrasenia(usuarioState,contrasenia);                        
                    }}
                >
                    <Text style={{ color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%',textAlign:'center',paddingTop:5}} 
                    >Ingresar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{flexDirection:'row',marginTop:5,marginLeft:'20%',width:'60%',alignItems:'center',alignContent:'center',justifyContent:'space-evenly'}}
                onPressOut={()=>{
                    setRecordarContrasenia(!recordarContrasenia);
                }}>
                    <TouchableOpacity style={{borderWidth:1.5,borderColor:'#f1f1f1',width:20,height:20,alignItems:'center',alignContent:'center',marginRight:5}}
                        onPressOut={()=>{
                            setRecordarContrasenia(!recordarContrasenia);
                        }}
                    >
                        <Text style={{textAlignVertical:'center',fontSize:12,color:'white'}}>{(recordarContrasenia)?"✓":""}</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',fontSize:13}}>Recordar contraseña</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPressOut={()=>{   
                    setCambiarPassword(true);
                }}
                >
                <Text style={{color:'white',textDecorationLine:'underline',marginLeft:'auto', marginRight:'auto',fontSize:13}} 
                >He olvidado mi contraseña</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPressOut={()=>{
                    setRegistrarse(true);
                    setLoguearse(false);
                }}
                style={{width:'46%',marginHorizontal:'27%'}}
                >
                <Text style={{color:'white',textDecorationLine:'underline',marginLeft:'auto', marginRight:'auto',fontSize:15}} 
                    >Registrarse</Text>
                </TouchableOpacity>


                <View style={{color:'white',marginLeft:'auto', marginRight:'auto',marginTop:10,width:'60%'}}>
                    <TouchableOpacity onPress={() =>  {
                        GoogleSignin.configure({
                            androidClientId: '782293643903-ibtlt9akvbpt8v3pbjeet0qt18aa0mmc.apps.googleusercontent.com',
                            //iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE'
                        });

                        GoogleSignin.hasPlayServices().then((hasPlayService) => {
                            if (hasPlayService) {
                                    GoogleSignin.signIn().then((userInfo) => {
                                    console.log(JSON.stringify(userInfo))
                                    registrarseConGoogle(userInfo.user);                                    

                                }).catch((e) => {
                                    console.log("ERROR IS: " + JSON.stringify(e));
                                    if(e.message=="NETWORK_ERROR"){
                                        setMensajeAlerta("Revise su conexión a internet");
                                        setMostrarAlerte(true);
                                    }
                                })
                            }
                        }).catch((e) => {
                            console.log("ERROR IS: " + JSON.stringify(e));
                        })
                    }} 
                    style={{backgroundColor:'#BD0101',flexDirection:'row',width:'100%',height:32,alignItems:'center',justifyContent:'center',borderRadius:4}}
                    >
                        <Image source={require('../assets/googleIcon.png')} style={{height:17,width:17,marginRight:7,borderRadius:15}}></Image>
                        <Text style={{color:'white',fontWeight:'600',fontSize:13,marginRight:18}}>Continuar con Google</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{width:'60%',marginLeft:'auto',marginRight:'auto',alignItems:'center',marginTop:10}}
                    onPressOut={()=>{
                        verPoliticasDePrivacidad();
                    }}
                    >
                    <Text style={{color:'white',fontSize:13.5,textDecorationLine:'underline'}}>Politicas de Privacidad</Text>
                </TouchableOpacity>
                {/* <View style={{color:'white',marginLeft:'auto', marginRight:'auto',marginTop:10,width:'100%',marginLeft:'20%'}}>
                    <LoginButton
                        style={{height:32,width:'60%',justifyContent:'center',paddingTop:10}}
                        onLoginFinished={
                            (error, result) => {                
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            console.log(data.accessToken.toString());
                                            console.log(data);

                                            registrarseConFacebook(data);

                                        }   
                                    )
                                }
                            }
                        }

                        onLogoutFinished={() => console.log("logout.")}/>
                </View> */}
            </View>
        </View>
    )
 }

 export default Login
