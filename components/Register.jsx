import * as react from 'react';
import { View,Text, TextInput,Image, ScrollView,Keyboard,TouchableOpacity, Platform, AppState } from 'react-native';
import imagen from '../assets/x_icon_imagen.png';
//import * as Location from 'expo-location';
import MD5 from 'md5';
import { useQuery } from 'react-query';
import { setNombre,setCorreo } from '../data/asyncStorageData.js';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import { check,PERMISSIONS, request } from 'react-native-permissions';
import usePermissionsContext from '../src/hooks/usePermissionsContext.jsx';


 const Register=({setRegistrarse,setLoguearse,height, width})=>{

    const [nombre, setNombreU]=react.useState("");
    const [apellidos, setApellidos]=react.useState("");
    const [usuario, setUsuario]=react.useState("");
    const [validante, setValidante]=react.useState("");
    const [validarValidante, setValidarValidante]=react.useState("");
    const [telefono, setTelefono]=react.useState("");
    const [ubicacion,setUbicacion]=react.useState({latitude:12.135744,longitude:-86.261186});
    const [email, setEmail]=react.useState("");
    const [estylosStates, setEstilosStare]=react.useState({height:(height>width)?height*0.7:height*0.85});

    const validarElementos=()=>{
        if(nombre.length==0){
            alert("Ingrese sus nombres");
            return false;
        }else if(validante==!validarValidante){
            alert("Las contraseñas no coinciden, ingreselas correctamente");
            return false;
        }else if(validante.length<8){
            alert("Ingrese una mejor contraseña")
            return false;
        }else if(!email.includes("@") || email.length>256){
            alert("Ingrese un correo electronico valido");
            return false;
        }else if(telefono.includes(".") || telefono.length>100){
            alert("Ingrese un numero de telefono valido");
            return false;
        }else if(apellidos.length>200){
            alert("El apellido exede el limite de longitud");
            return false;
        }else if(nombre.length>200){
            alert("El nombre exede el limite de longitud");
            return false;
        }else if(validante.length>50){
            alert("La contraseña exede el limite de longitud");
            return false;
        }
        return true;
    }
    
    react.useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setEstilosStare({height:(height>width)?height*0.7:height*0.85});
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setEstilosStare({height:(height>width)?height*0.7:height*0.85});
        });

        return () => {
          showSubscription.remove();
          hideSubscription.remove();          
        };
    }, []);

    useEffect(()=>{
        setEstilosStare({height:(height>width)?height*0.7:height*0.85});
    },[height])

      const registrarUsuario=async()=>{
        let objeto={
                email: email.toLowerCase(),
                password: validante,
                confirmPassword: validarValidante,
                nombres: nombre,
                apellidos: apellidos,
                telefono: telefono
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
            let res=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Registro',options);
            if(res.ok){                
                datos=await res.json();                
            }else{
                alert("Ocurrió un error, vuelva a intentarlo");
                return;
            }
        }catch{
            alert("Ocurrió un error, vuelva a intentarlo");
            return;
        }

        console.log("Los datos obtenidos despues del registro fueron: ");
        console.log(datos);
        console.log(typeof(datos));

        if(datos=="0" || datos==null || datos==undefined){
            alert("Ocurrió un error, vuelva a intentarlo");
            return;
        }else if(datos=="1"){
            alert("Usted ya esta registrado, inicie sesion");
            setRegistrarse(false);
            setLoguearse(true);
        }else if(datos>10){
            alert("Registro exitoso");
            console.log("El registro fue exitoso");
            setRegistrarse(false);
            setLoguearse(true);
            setNombre(nombre);
            setCorreo(email.toLowerCase());
            setUsuario(email.toLowerCase());
        }



      }

    return(
        <View style={{backgroundColor:'#103070',position:'absolute',zIndex:221, height:height+StatusBar.currentHeight, width:width, paddingTop:(height>width)?height*0.15:StatusBar.currentHeight}}>          
            <View style={[{backgroundColor:'#101038',width:(height>width)?width*0.8:height*0.8,marginLeft:'auto', marginRight:'auto'
            ,marginBottom:'auto',paddingTop:(height>width)?height*0.06:2*StatusBar.currentHeight},estylosStates]}>
                
                <View style={{position:'absolute',top:7,left:'90%'}} onTouchEnd={()=>{setRegistrarse(false)}}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>

                <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%'}}>
                    Registrate
                </Text>
            
                <ScrollView style={{ height:(height>width)?height*0.55:height*0.3}}>
                <TextInput placeholder='Ingresa tus nombres' style={{paddingLeft:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setNombreU(em);
                    }
                }></TextInput>
                <TextInput placeholder='Ingresa tus apellidos' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setApellidos(em);
                    }
                }></TextInput>
                <TextInput keyboardType='email-address' placeholder='Ingresa tu correo' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setEmail(em);
                    }
                }></TextInput>                
                <TextInput secureTextEntry={true} placeholder='Ingrese su contraseña' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setValidante(em);
                    }
                }></TextInput>
                <TextInput secureTextEntry={true} placeholder='Vuelva a ingresar su contraseña' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setValidarValidante(em);
                    }
                }></TextInput>
                <TextInput keyboardType='number-pad' placeholder='Ingrese su numero de telefono' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setTelefono(em);
                    }
                }></TextInput>                                               

                </ScrollView>
                <TouchableOpacity style={{backgroundColor:'#2060A5', height:55,width:'60%',marginLeft:'auto', marginRight:'auto',alignItems:'center', justifyContent:'center', borderRadius:20}}>
                    <Text style={{ color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%',textAlign:'center',marginTop:5}} 
                    onTouchEnd={
                        ()=>{
                            if(validarElementos()){
                                
                                registrarUsuario();                               
                            }                            
                        }
                    }>
                        Registrarse
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'white',marginLeft:'auto', marginRight:'auto',marginTop:10, marginBottom:15}} 
                    onTouchEnd={()=>{
                        setLoguearse(true);
                        setRegistrarse(false);
                    }                    
                    }>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
 }

 export default Register