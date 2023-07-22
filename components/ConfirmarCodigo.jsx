import AsyncStorage from '@react-native-async-storage/async-storage';
import react, { useEffect, useState } from 'react'
import { StatusBar, Text, TextInput, View, TouchableOpacity, Image} from 'react-native'
import imagen from '../assets/x_icon_imagen.png';


const ConfirmarCodigo=({height,width,setConfirmarCodigo,setMostrarAlerte, setMensajeAlerta})=>{
    
    const [codigoEnvio, setCodigoEnvio]=useState("");
    const [tiempoDeEspera,setTiempoDeEspera]=useState(0);
    const [detenerInterval,setDetenerInterval]=useState(true);
    const [cantidadDeIntentos,setCantidadDeIntentos]=useState(0);    


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


    const confirmacionDeCodigo=async(codigoEnvio)=>{

        let email=null;
        try{
            email=await AsyncStorage.getItem('correo');
        }catch{
            email="";
        }

        if(email==null || email==""){
            setMensajeAlerta("Reintente ingresar");
            setMostrarAlerte(true);
            setConfirmarCodigo(false);
            return;
        }

        const options= {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            }
            }


        let datos=null;
        try{
            let res=await fetch('https://georutas.somee.com/api/ConfirmarCorreo/'+codigoEnvio+','+email,options);
            if(res.ok){
                datos=await res.json();
            }else{
                datos="";
            }
        }catch{
            datos="";
        }

        if(datos==1){
            setMensajeAlerta("Reintente iniciar sesión");
            setMostrarAlerte(true);
            setConfirmarCodigo(false);
        }else if(datos==2){
            setMensajeAlerta("El código no es válido");
            setMostrarAlerte(true);
            
        }else if(datos==3){
            setMensajeAlerta("Su código ya caduco, solicítelo nuevamente");
            setMostrarAlerte(true);
        }else if(datos==4){
            setMensajeAlerta("Su cuenta se activó correctamente. Inicie sesión");
            setMostrarAlerte(true);
            setConfirmarCodigo(false);
        }else if(datos==5){
            setMensajeAlerta("Su cuenta ya está confirmada");
            setMostrarAlerte(true);
            setConfirmarCodigo(false);
        }else{
            setMensajeAlerta("Reintente enviar el código");
            setMostrarAlerte(true);
        }
    }



    const solicitarCodigo=async()=>{
        let email=null;
        try{
            email=await AsyncStorage.getItem('correo');
        }catch{
            email="";
        }

        if(email==null || email==""){
            setMensajeAlerta("Reintente ingresar");
            setMostrarAlerte(true);
            setConfirmarCodigo(false);
            return;
        }

        const options= {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
            }

        let datos=null;
        try{
            let res=await fetch('https://georutas.somee.com/api/ConfirmarCorreo/'+email,options);
            if(res.ok){
                datos=await res.json();
            }else{
                datos="";
            }
        }catch{
            datos="";
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
                    setConfirmarCodigo(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>

                    <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%'}}>
                        Activa tu cuenta
                    </Text>
                    <TextInput keyboardType='number-pad' placeholder='Ingresa tu codigo' style={{paddingLeft:10,marginTop:'7%',
                    borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                        onChangeText={(em)=>{
                            setCodigoEnvio(em);
                        }}                
                ></TextInput>

                <TouchableOpacity style={{backgroundColor:'#2060A5', height:50,width:'60%',marginTop:30,marginLeft:'auto', 
                marginRight:'auto',alignItems:'center', justifyContent:'center', borderRadius:10,alignContent:'center'}}>
                    <Text style={{ color:'white',fontSize:25,
                        textAlign:'center',textAlignVertical:'center',alignItems:'center'}} 
                    onTouchEnd={()=>{
                        if(codigoEnvio.length<=3){
                            setMensajeAlerta("Su código no es válido");
                            setMostrarAlerte(true);
                        }else{
                            confirmacionDeCodigo(codigoEnvio);
                            console.log(codigoEnvio); 
                        }
                    }}>Enviar codigo</Text>
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
                

                    <View style={{flexDirection:'row',marginHorizontal:'10%',alignSelf:'center'}}
                        onTouchEnd={()=>{
                            if(tiempoDeEspera==0){
                                solicitarCodigo();
                            }
                        }}
                    >
                    <Text style={[{color:'white',marginTop:10,
                        textAlign:'center',fontSize:17},(tiempoDeEspera>0)?{opacity:0.3,marginRight:10}:{marginRight:0}]}>{(tiempoDeEspera>=60)?((Math.floor(tiempoDeEspera/60)+":"+((tiempoDeEspera%60>9)?tiempoDeEspera%60:'0'+tiempoDeEspera%60))):(tiempoDeEspera>0)?(((tiempoDeEspera%60>9)?tiempoDeEspera%60:'0'+tiempoDeEspera%60)):""}</Text>
                        <Text style={[{textDecorationLine:'underline',color:'white',marginTop:10,
                        textAlign:'center',fontSize:17},(tiempoDeEspera>0)?{opacity:0.3}:{opacity:1}]}>{"Reenviar el codigo"}</Text>
                    </View>

                </TouchableOpacity>

                <Text style={{color:'white',marginHorizontal:'10%',marginTop:20,textAlign:'center',fontSize:16}}>Usa el codigo que se envio a tu correo para activar tu cuenta</Text>

                </View>
        </View>
    )
}


export default ConfirmarCodigo