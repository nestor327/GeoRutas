import * as react from 'react'
import { Keyboard,View,Text, TextInput,Image,StatusBar, TouchableOpacity } from 'react-native'
import imagen from '../assets/x_icon_imagen.png';
import {setUsuario,getUsuario,getTipoDeUsuario,setContraseña,getContraseña} from '../data/asyncStorageData.js'
import { useQuery } from 'react-query';

const LoginTransportistas=({setLosguearTransportista,setRegistrarse,setSecionIniciada,setLoguearse,setTipoDeUsuario,setIdUsuarioIniciado,setUsuarioLogueado,height,width})=>{
 
    const [usuarioState,setUsuarioState]=react.useState([]);
    const [contrasenia, setContrasenia]=react.useState("");
    const [estylosStates, setEstilosStare]=react.useState({height:(height>width)?height*0.6:height});
    react.useEffect(()=>{
        getUsuario(setUsuarioState);
    })
    
    const {data,error,isLoading}=useQuery(['obtenerTodosLosUsuarioNoComunes'],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosTransporte').then(res=>datos=res.json())
    },{     
        staleTime:Infinity
    })
    react.useEffect(()=>{
        getContraseña(setContrasenia);
        
    },[])

    react.useEffect(()=>{
        if(height>width){
            setEstilosStare({height:height*0.6});
        }else{
            setEstilosStare({height:height});
        }
        
    },[height])

    const verificandoContrasenia=()=>{
        if(isLoading){
            //console.log("Se estan buscando los usuarios");
        }
    
        if(isLoading==false){            
            for(let k=0;k<data.length;k++){
                if(data[k].contrasenia==(contrasenia) && data[k].usuario==usuarioState){
                    setIdUsuarioIniciado(data[k].id_UsuarioTransporte);
                    setUsuarioLogueado(data[k]);
                    return true;
                }
            }    
            
            return false;
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

    return(
        <View style={{backgroundColor:'#103070',position:'absolute',zIndex:220, height:height+StatusBar.currentHeight, width:width, paddingTop:(height>width)?height*0.2:StatusBar.currentHeight}}>
            <View style={[{backgroundColor:'#101038',height:'80%',width:(height>width)?width*0.8:height*0.8, paddingTop:(height>width)?height*0.07:StatusBar.currentHeight,marginLeft:'auto', marginRight:'auto'},estylosStates]}>
                
                <View style={{width:'80%', height:40, marginLeft:'10%', marginRight:'10%', flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={{width:'50%',alignItems:'center', height:40, borderRadius:10, paddingTop:8}}
                    onPress={()=>{
                        setLoguearse(true);
                        setLosguearTransportista(false);
                    }}>
                        <Text style={{color:'white'}}>Pasajero</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'50%',alignItems:'center',height:40, borderRadius:10, paddingTop:8,backgroundColor:'#2060A5'}}>
                        <Text style={{color:'white'}}>Transportista</Text>
                    </TouchableOpacity>
                 
                </View>

                <View style={{position:'absolute',top:7,left:'90%'}} onTouchEnd={()=>{
                    setLosguearTransportista(false);      
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>

                <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%'}}>Inicia Sesión</Text>
                <TextInput placeholder='Ingrese su Usuario' style={{paddingLeft:10, borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={(em)=>{
                    setUsuario(em);
                }}>{usuarioState}</TextInput>
                <TextInput secureTextEntry={true} placeholder='Ingrese su Contraseña' style={{paddingLeft:10,marginTop:'7%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={(em)=>{
                    setContrasenia(em);                    
                }}>{contrasenia}</TextInput>
                
                <TouchableOpacity style={{backgroundColor:'#2060A5', height:55,width:'60%',marginTop:30,marginLeft:'auto', marginRight:'auto',alignItems:'center', justifyContent:'center', borderRadius:10}}>
                    <Text style={{ color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%',textAlign:'center',paddingTop:5}} 
                    onTouchEnd={()=>{
                        
                        if(!isLoading){                                
                            if(verificandoContrasenia()==true){
                                setUsuario(usuarioState);  
                                alert("Has iniciado sesión");
                                setLosguearTransportista(false);
                                setSecionIniciada(true);
                                setTipoDeUsuario("Transportista");
                                setContraseña(contrasenia);
                            }else{
                                    alert("Usuario no encontrado");
                            }
                        }else{
                            alert("Reintente ingresar");
                        }                        
                    }}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'white',marginLeft:'auto', marginRight:'auto',marginTop:10}} onTouchEnd={()=>{
                        setRegistrarse(true);
                        setLosguearTransportista(false);                        
                    }}>Regístrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
 }

 export default LoginTransportistas