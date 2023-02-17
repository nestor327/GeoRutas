import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useEffect, useState } from 'react'
import { StatusBar,Image, Text, TextInput, View, TouchableOpacity} from 'react-native'
import { setCorreo } from '../data/asyncStorageData';
import imagen from '../assets/x_icon_imagen.png';



const CambiarPassword=({height,width,setCambiarPassword,setMostrarAlerte, setMensajeAlerta})=>{
    
    const [codigoEnvio, setCodigoEnvio]=useState("");
    const [tiempoDeEspera,setTiempoDeEspera]=useState(0);
    const [detenerInterval,setDetenerInterval]=useState(true);
    const [cantidadDeIntentos,setCantidadDeIntentos]=useState(0);  
    const [pidiendoCodigo, setPidiendoCodigo]=useState(true);
    const [cambiandoPassword,setCambiandoPassword]=useState(false);
    const [emailLocal,setEmailLocal]=useState("");
    const [newPassword,setNewPassword]=useState("");

    const obtenerCorreo=async()=>{
        let value=await AsyncStorage.getItem('correo');
        setCodigoEnvio(value);
        setEmailLocal(value);
    }

    useEffect(()=>{
        obtenerCorreo();
    },[])

    

    useEffect(()=>{

        let k=null;
        if(detenerInterval==false){
            k=setInterval(() => {
                if(tiempoDeEspera==0){
                    setDetenerInterval(true);
                }else{
                    setTiempoDeEspera(tiempoDeEspera-1);
                    console.log(tiempoDeEspera);
                }

            }, 1000);
        }

        return(
            ()=>{
                clearInterval(k);
            }
        )

    },[detenerInterval,tiempoDeEspera]);


    const confirmacionDeCodigo=async(codigoEnvio,email)=>{

        console.log("Los datos que envias son :"+codigoEnvio,email);
        const options= {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
            }


        let datos=null;
        try{
            let res=await fetch('https://www.georutas.lat/api/CambiarPassword/'+codigoEnvio+','+email.toLowerCase(),options);
            if(res.ok){
                datos=await res.json();
            }else{
                datos="";
                setMensajeAlerta("Reintente enviar el código");
                setMostrarAlerte(true);
                return;
            }
        }catch{
            datos="";
            setMensajeAlerta("Reintente enviar el código");
            setMostrarAlerte(true);
            return;
        }


        console.log("Los datos de la confirmacion del codigo son: ");
        console.log(datos);

        if(datos==1){
            setCambiarPassword(false);
            setMensajeAlerta("Reintente iniciar sesión o registrarse");
            setMostrarAlerte(true);
            
        }else if(datos==2){
            setMensajeAlerta("Este código no es válido, revise su correo");
            setMostrarAlerte(true);            
        }else if(datos==3){
            setMensajeAlerta("Su código ya caduco, solicítelo nuevamente");
            setMostrarAlerte(true);
        }else if(datos==4){
            setMensajeAlerta("Su código es correcto, ingrese su nueva contraseña");
            setMostrarAlerte(true);            
            setCambiandoPassword(true);
        }else{
            setMensajeAlerta("Reintente enviar el código");
            setMostrarAlerte(true);
        }

    }

    const enviardoCodigoAlCorreo=async(email)=>{                
        const options= {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
            }

        let datos=null;
        try{
            let res=await fetch('https://www.georutas.lat/api/CambiarPassword/'+email.toLowerCase(),options);
            if(res.ok){
                datos=await res.json();
            }else{
                datos="";
                setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
                setMostrarAlerte(true);
                return;
            }
        }catch{
            datos="";
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
            return;
        }

        console.log("Los datos son: ");
        console.log(datos);

        if(datos=="0"){
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
            return;
        }else if(datos=="1"){
            setMensajeAlerta("Ingrese un correo electrónico válido o regístrese");
            setMostrarAlerte(true);
            setCambiarPassword(false);
        }else if(datos=="3"){
            setMensajeAlerta("Actualmente, su cuenta está bloqueada, inténtelo más tarde");
            setMostrarAlerte(true);
        }else{
            setMensajeAlerta("Busque su código en su correo");
            setMostrarAlerte(true);
            setPidiendoCodigo(false);
            setCambiandoPassword(false);
        }

    }

    const envarCambios=async(contrasenia,newContrasenia)=>{
        let objeto={            
            email: emailLocal.toLowerCase(),
            password: contrasenia,
            confirmPassword: newContrasenia
          }

          const options= {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(objeto)
            };

        let datos="";

        try{
            let res=await fetch('https://www.georutas.lat/api/CambiarPassword',options);
            if(res.ok){                
                datos=await res.json();                
            }else{
                setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
                setMostrarAlerte(true);
                return;
            }
        }catch{
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
            return;
        }

        console.log("Los datos son al momento de cambiar la contraseña son: ");
        console.log(datos.token);
        console.log(typeof(datos.token));

        if(datos==null || datos.token=="0"){
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
        }else if(datos.token=="1"){
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
            setCambiarPassword(false);
        }else if(datos.token.length>2){
            setMensajeAlerta("La contraseña se guardó correctamente");
            setMostrarAlerte(true);
            setCambiarPassword(false);
        }

    }


    return(
        <View style={{backgroundColor:'#103070',position:'absolute',zIndex:230, 
            height:height+StatusBar.currentHeight, width:width, 
            paddingTop:(height>width)?height*0.2:StatusBar.currentHeight}}>
                <View style={[{backgroundColor:'#101038',width:(height>width)?width*0.8:height*0.8, 
                paddingTop:(height>width)?height*0.07:StatusBar.currentHeight,
                marginLeft:'auto', marginRight:'auto',height:height*0.6}]}>
                
                <View style={{position:'absolute',top:7,left:'90%'}} onTouchEnd={()=>{
                    setCambiarPassword(false);
                    console.log("Mierda");
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>

                    <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%',textAlign:'center'}}>
                        {(pidiendoCodigo==false && cambiandoPassword==false)?"Confirma que eres tú":(pidiendoCodigo==true)?"Cambiar contraseña":"Ingresa tu nueva contraseña"}
                    </Text>
                {cambiandoPassword==false && <TextInput secureTextEntry={(cambiandoPassword)?true:false} 
                keyboardType={(pidiendoCodigo==false && cambiandoPassword==false)?'number-pad':(cambiandoPassword)?'default':'email-address'} 
                placeholder={(pidiendoCodigo==true)?'Ingresa tu correo':(cambiandoPassword==false)?'Ingresa tu código':"Ingresa tu nueva contraseña"} 
                style={{paddingLeft:10,marginTop:'7%',
                    borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                        onChangeText={(em)=>{
                            setCodigoEnvio(em);
                        }}                
                >{(pidiendoCodigo)?codigoEnvio:""}</TextInput>}

                {cambiandoPassword==true && <TextInput secureTextEntry={true}                
                placeholder={(pidiendoCodigo==true)?'Ingresa tu correo':(cambiandoPassword==false)?'Ingresa tu código':"Ingresa tu nueva contraseña"} 
                style={{paddingLeft:10,marginTop:'7%',
                    borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                        onChangeText={(em)=>{
                            setCodigoEnvio(em);
                        }}                
                >{(pidiendoCodigo)?codigoEnvio:""}</TextInput>}

                {cambiandoPassword==true && <TextInput secureTextEntry={true} placeholder={(pidiendoCodigo==true)?'Ingresa tu correo':(cambiandoPassword==false)?'Ingresa tu código':"Ingresa nuevamente tu contraseña"} style={{paddingLeft:10,marginTop:'7%',
                        borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                        onChangeText={(em)=>{
                            setNewPassword(em);
                        }}                
                ></TextInput>}

                <TouchableOpacity style={{backgroundColor:'#2060A5', height:50,width:'60%',marginTop:30,marginLeft:'auto', 
                marginRight:'auto',alignItems:'center', justifyContent:'center', borderRadius:10,alignContent:'center'}}>
                    <Text style={{ color:'white',fontSize:25,
                        textAlign:'center',textAlignVertical:'center',alignItems:'center'}} 
                    onTouchEnd={()=>{
                        if(pidiendoCodigo==true && !codigoEnvio.includes("@")){
                            setMensajeAlerta("Ingresa un correo válido");
                            setMostrarAlerte(true);
                        }else if(pidiendoCodigo==true){     
                            setCorreo(codigoEnvio.toLowerCase());
                            setEmailLocal(codigoEnvio.toLowerCase());
                            enviardoCodigoAlCorreo(codigoEnvio.toLowerCase());
                            //setPidiendoCodigo(false);                            
                        }

                        if(pidiendoCodigo==false && codigoEnvio.length<=3 && cambiandoPassword==false){
                            setMensajeAlerta("Su código no es válido");
                            setMostrarAlerte(true);
                        }else if(pidiendoCodigo==false && cambiandoPassword==false){
                            confirmacionDeCodigo(codigoEnvio,emailLocal);                            
                            //setCambiandoPassword(true);
                            console.log(codigoEnvio); 
                        }

                        if(cambiandoPassword==true && newPassword==codigoEnvio && codigoEnvio.length>=8){
                            envarCambios(newPassword,codigoEnvio);
                        }else if(cambiandoPassword==true && newPassword!=codigoEnvio && codigoEnvio.length>=8){
                            setMensajeAlerta("Las contraseñas no coinciden");
                            setMostrarAlerte(true);
                        }else if(cambiandoPassword==true && codigoEnvio.length<8){
                            setMensajeAlerta("La contraseña debe de tener más de 8 caracteres");
                            setMostrarAlerte(true);
                        }

                    }}>{(pidiendoCodigo)?"Enviar correo":(cambiandoPassword==false)?"Enviar código":"Confirmar"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPressOut={()=>{
                    console.log(tiempoDeEspera);
                    if(tiempoDeEspera==0){
                        setTiempoDeEspera(60*(Math.floor((1/Math.sqrt(5))*(Math.pow(((1+Math.sqrt(5))/(2)),(3+cantidadDeIntentos))
                            -Math.pow(((1-Math.sqrt(5))/(2)),(3+cantidadDeIntentos))))));                        

                        setCantidadDeIntentos(cantidadDeIntentos+1);
                        setDetenerInterval(false);
                        console.log("Mierda");
                    }
                }}
                >
                

                    {pidiendoCodigo==false && cambiandoPassword==false && <View style={{flexDirection:'row',marginHorizontal:'10%',alignSelf:'center'}}
                        onTouchEnd={()=>{
                            if(tiempoDeEspera==0){
                                enviardoCodigoAlCorreo(emailLocal);
                            }
                        }}
                    >
                    <Text style={[{color:'white',marginTop:10,
                        textAlign:'center',fontSize:17},(tiempoDeEspera>0)?{opacity:0.3,marginRight:10}:{marginRight:0}]}>{(tiempoDeEspera>=60)?((Math.floor(tiempoDeEspera/60)+":"+((tiempoDeEspera%60>9)?tiempoDeEspera%60:'0'+tiempoDeEspera%60))):(tiempoDeEspera>0)?(((tiempoDeEspera%60>9)?tiempoDeEspera%60:'0'+tiempoDeEspera%60)):""}</Text>
                        <Text style={[{textDecorationLine:'underline',color:'white',marginTop:10,
                        textAlign:'center',fontSize:17},(tiempoDeEspera>0)?{opacity:0.3}:{opacity:1}]}>{"Reenviar el codigo"}</Text>
                    </View>}

                </TouchableOpacity>

                <Text style={{color:'white',marginHorizontal:'10%',marginTop:20,textAlign:'center',fontSize:16}}>
                    {(pidiendoCodigo)?"Ingresa tu correo para enviarte el código de recuperación":"Ingresa el código que se te envió a tu correo, para poder cambiar tu contraseña"}
                    </Text>

                </View>
        </View>
    )
}


export default CambiarPassword