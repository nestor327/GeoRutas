import * as react from 'react';
import { View,Text, TextInput,Image, ScrollView,Keyboard,TouchableOpacity, Platform, AppState } from 'react-native';
import imagen from '../assets/x_icon_imagen.png';
//import * as Location from 'expo-location';
import MD5 from 'md5';
import registrarUsuarioComun from '../data/registrarUsuarioComun.js';
import { useQuery } from 'react-query';
import { setNombre,setCorreo } from '../data/asyncStorageData.js';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import { check,PERMISSIONS, request } from 'react-native-permissions';
import usePermissionsContext from '../src/hooks/usePermissionsContext.jsx';


 const Register=({setRegistrarse,setLoguearse,height, width})=>{

    const [nombre, setNombreU]=react.useState("");
    const [usuario, setUsuario]=react.useState("");
    const [validante, setValidante]=react.useState("");
    const [validarValidante, setValidarValidante]=react.useState("");
    const [telefono, setTelefono]=react.useState("");
    const [ubicacion,setUbicacion]=react.useState({latitude:12.135744,longitude:-86.261186});
    const [email, setEmail]=react.useState("");
    const [estylosStates, setEstilosStare]=react.useState({height:(height>width)?height*0.7:height*0.85});

    
    // react.useEffect(()=>{        

    //     //console.log(encriptarContraseña("rutasManagua"));    
    //     //console.log(encriptarContraseña("zorondgt27"));    
    // },[])
        

    const validarElementos=()=>{
        if(nombre.length==0){
            alert("Ingrese un nombre valido pequeño");
            return false;
        }else if(validante==!validarValidante){
            alert("Las contraseñas no coinciden, ingreselas correctamente");
            return false;
        }else if(validante.length<8){
            alert("Ingrese una mejor contraseña")
            return false;
        }else if(!email.includes("@")){
            alert("Ingrese un correo electronico valido");
            return false;
        }else if(telefono.includes(".")){
            alert("Ingrese un numero de telefono valido");
            return false;
        }
        return true;
    }

    const encriptarContraseña=(constrasenia)=>{

        var result=MD5(constrasenia)        
        return result;
    }


    
    const {data,error,isLoading}=useQuery(['obtenerTodosLosUsuarioComunes'],async({queryKey})=>{
        return await fetch('https://georutas.somee.com/api/UsuariosComunes').then(res=>datos=res.json())
    },{
        refetchInterval:1000
    })

    const verificandoExistencia=async()=>{
        if(isLoading){
            //console.log("Se estan buscando los usuarios");
        }
    
        if(isLoading==false){
    
            for(let k=0;k<data.length;k++){
                if(data[k].usuario==usuario){
                    return false;
                }
            }    

            let usuariosTransportistas=await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json());
            
            if(usuariosTransportistas.length>0){
                for(let i=0;i<usuariosTransportistas.length;i++){
                    if(usuariosTransportistas[i].usuario==usuario){
                        return false;
                    }
                }
            }
            
            return true;
        }

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
                <TextInput placeholder='Ingrese su Nombre' style={{paddingLeft:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setNombreU(em);
                    }
                }></TextInput>
                <TextInput placeholder='Ingrese nombre de usuario' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setUsuario(em);
                    }
                }></TextInput>
                <TextInput secureTextEntry={true} placeholder='Ingrese una contraseña' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setValidante(em);
                    }
                }></TextInput>
                <TextInput secureTextEntry={true} placeholder='Confirme su contraseña' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setValidarValidante(em);
                    }
                }></TextInput>
                <TextInput keyboardType='email-address' placeholder='Ingrese correo electronico' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={
                    (em)=>{
                        setEmail(em);
                    }
                }></TextInput>                
                                <TextInput keyboardType='number-pad' placeholder='Ingrese un numero de telefono' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
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
                            if(!isLoading){                                  
                                console.log(validante);                         
                                if(verificandoExistencia()==true){
                                    if(validarElementos()){
                                        registrarUsuarioComun({nombre: nombre,usuario: usuario,contrasenia: encriptarContraseña(validante),correo: email,
                                        telefono: telefono,longitude: ubicacion.longitude,latitude:ubicacion.latitude});
                                        alert("Registro exitoso");
                                        setRegistrarse(false);
                                        setLoguearse(true);
                                        setNombre(nombre);
                                        setCorreo(email);

                                    }
                                }else{
                                    alert("El nombre de usuario ya existe");
                                }                                
                            }else{
                                alert("Reintente registrarse");
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