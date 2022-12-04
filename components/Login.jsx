import * as react from 'react'
import { Keyboard,View,Text, TextInput,Image,StatusBar, TouchableOpacity} from 'react-native'
import imagen from '../assets/x_icon_imagen.png';
import {setUsuario,getUsuario,setContraseña,getContraseña} from '../data/asyncStorageData.js'
import MD5 from 'md5'
import { useQuery } from 'react-query';


const Login=({setLoguearse,setRegistrarse,setSecionIniciada,setLosguearTransportista,setTipoDeUsuario,height,width,setIdUsuarioIniciado,setUsuarioLogueado})=>{
 
    const [usuarioState,setUsuarioState]=react.useState([]);
    const [contrasenia, setContrasenia]=react.useState("");
    const [tipoDeUsuarioIngresando, setTipoDeUsuarioIngresando]=react.useState('Pasajero');
    const [estylosStates, setEstilosStare]=react.useState({height:(height>width)?height*0.6:height});
    react.useEffect(()=>{
        getUsuario(setUsuarioState);
    })
    
    // const {data,error,isLoading}=useQuery(['obtenerTodosLosUsuarioComunes'],async({queryKey})=>{
    //     return await fetch('https://georutas.somee.com/api/UsuariosComunes').then(res=>datos=res.json())
    // },{     
    //     refetchInterval:1000
    // })

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

    const verificandoContrasenia=async ()=>{

        let data=await fetch('https://georutas.somee.com/api/UsuariosComunes').then(res=>datos=res.json());
        
        let usuariosTransportistas=await fetch('https://georutas.somee.com/api/UsuariosTransporte').then(res=>datos=res.json());

        for(let k=0;k<data.length;k++){
            if(data[k].contrasenia==MD5(contrasenia) && data[k].usuario==usuarioState){                
                setUsuario(usuarioState);
                alert("Has iniciado sesión");
                setLoguearse(false);
                setSecionIniciada(true);
                setTipoDeUsuario("Pasajero");
                setContraseña(contrasenia);                
                return;
            }
        }    
        
        for(let k=0;k<usuariosTransportistas.length;k++){
            if(usuariosTransportistas[k].contrasenia==(contrasenia) && usuariosTransportistas[k].usuario==usuarioState){
                
                setIdUsuarioIniciado(usuariosTransportistas[k].id_UsuarioTransporte);
                setUsuarioLogueado(usuariosTransportistas[k]);

                setUsuario(usuarioState);
                alert("Has iniciado sesión");
                setLoguearse(false);
                setSecionIniciada(true);
                setTipoDeUsuario("Transportista");
                setContraseña(contrasenia);                
                return;
            }
        }

        if(data.length==0 || usuariosTransportistas.length==0 || data==undefined || usuariosTransportistas==undefined){            
            alert("Reintente ingresar"); 
            return;
        }       

        alert("Usuario o contrseña no validos");

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
            <View style={[{backgroundColor:'#101038',width:(height>width)?width*0.8:height*0.8, paddingTop:(height>width)?height*0.07:StatusBar.currentHeight,marginLeft:'auto', marginRight:'auto'},estylosStates]}>
                
            <View style={{width:'80%', height:40, marginLeft:'10%', marginRight:'10%', flexDirection:'row', alignItems:'center'}}>
                 {/* <TouchableOpacity style={{width:'50%',alignItems:'center',backgroundColor:'#2060A5', height:40, borderRadius:10, paddingTop:8}}>
                    <Text style={{color:'white'}}>Pasajero</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'50%',alignItems:'center',height:40, borderRadius:10, paddingTop:8}}
                onPress={()=>{
                    setLoguearse(false);
                    setLosguearTransportista(true);
                }}>
                    <Text style={{color:'white'}}>Transportista</Text>
                </TouchableOpacity> */}
                 
            </View>

                <View style={{position:'absolute',top:7,left:'90%'}} onTouchEnd={()=>{
                    setLoguearse(false)                    
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>


                <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%'}}>Inicia Sesión</Text>
                <TextInput placeholder='Ingrese su Usuario' style={{paddingLeft:10, borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={(em)=>{
                    setUsuario(em);
                }}
                >{usuarioState}</TextInput>
                <TextInput secureTextEntry={true} placeholder='Ingrese su Contraseña' style={{paddingLeft:10,marginTop:'7%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                onChangeText={(em)=>{
                    setContrasenia(em);
                    // console.log(contrasenia);                  
                    // console.log(MD5(contrasenia));
                }}                
                >{contrasenia}</TextInput>
                
                <TouchableOpacity style={{backgroundColor:'#2060A5', height:55,width:'60%',marginTop:30,marginLeft:'auto', marginRight:'auto',alignItems:'center', justifyContent:'center', borderRadius:10}}>
                    <Text style={{ color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%',textAlign:'center',paddingTop:5}} 
                    onTouchEnd={()=>{
                        
                        verificandoContrasenia();
                        
                    }}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={{color:'white',marginLeft:'auto', marginRight:'auto',marginTop:10}} onTouchEnd={()=>{
                    setRegistrarse(true);
                    setLoguearse(false);
                }}>Registrate</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
 }

 export default Login
