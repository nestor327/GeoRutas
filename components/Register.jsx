import * as react from 'react';
import { View,Text, TextInput,Image, ScrollView,Keyboard,TouchableOpacity, Platform, AppState } from 'react-native';
import imagen from '../assets/x_icon_imagen.png';
//import * as Location from 'expo-location';
import { useQuery } from 'react-query';
import { setNombre,setCorreo, getApellidos, getTelefono, setTelefonoAsync } from '../data/asyncStorageData.js';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import { check,PERMISSIONS, request } from 'react-native-permissions';
import usePermissionsContext from '../src/hooks/usePermissionsContext.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';


 const Register=({setRegistrarse,setLoguearse,height, width,editarPerfil,setEditarPerfil,tokenState,emailState,
        setMostrarAlerte, setMensajeAlerta,setConfirmarCodigo})=>{

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
            setMensajeAlerta("Ingrese sus nombres");
            setMostrarAlerte(true);
            return false;
        }else if(validante==!validarValidante && editarPerfil==false){
            setMensajeAlerta("Las contraseñas no coinciden, ingreselas correctamente");
            setMostrarAlerte(true);
            return false;
        }else if(validante.length<8  && editarPerfil==false){
            setMensajeAlerta("Ingrese una mejor contraseña");
            setMostrarAlerte(true);
            
            return false;
        }else if(!email.includes("@") || email.length>256){
            setMensajeAlerta("Ingrese un correo electrónico válido");
            setMostrarAlerte(true);
            return false;
        }else if(telefono.includes(".") || telefono.length>100){
            setMensajeAlerta("Ingrese un número de teléfono válido");
            setMostrarAlerte(true);
            return false;
        }else if(apellidos.length>200){
            setMensajeAlerta("El apellido excede el límite de longitud");
            setMostrarAlerte(true);
            return false;
        }else if(nombre.length>200){
            setMensajeAlerta("El nombre excede el límite de longitud");
            setMostrarAlerte(true);
            return false;
        }else if(validante.length>50  && editarPerfil==false){
            setMensajeAlerta("La contraseña excede el límite de longitud");
            setMostrarAlerte(true);
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

    const obtenerDatosGuardados=async()=>{
        const valueNombre=await AsyncStorage.getItem('nombreUsuario');
        const correo=await AsyncStorage.getItem('correo');
        getApellidos(setApellidos);
        getTelefono(setTelefono);

        if(valueNombre==null){
            setNombreU("");
        }else{
            setNombreU(valueNombre);
        }

        if(correo==null){
            setCorreo("");
            setRegistrarse(false);
            setEditarPerfil(false);
            setLoguearse(true);
            setMensajeAlerta("Inicie sesión");
            setMostrarAlerte(true);
        }else{
            setEmail(correo);
        }

    }

    useEffect(()=>{
        if(editarPerfil==true){
            obtenerDatosGuardados();
            console.log("Estas aqui");
        }
    },[])


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
            let res=await fetch('https://www.georutas.lat/api/Registro',options);
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

        console.log("Los datos obtenidos despues del registro fueron: ");
        console.log(datos);
        console.log(typeof(datos));

        if(datos=="0" || datos==null || datos==undefined){
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
            return;
        }else if(datos=="1"){
            setMensajeAlerta("Usted ya está registrado, inicie sesión");
            setMostrarAlerte(true);
            setRegistrarse(false);
            setLoguearse(true);
        }else if(datos>10){
            setMensajeAlerta("El registro fue exitoso. Active su cuenta");            
            setMostrarAlerte(true);
            setRegistrarse(false);            
            setLoguearse(true);
            setConfirmarCodigo(true);
            setNombre(nombre);
            setCorreo(email.toLowerCase());
            setUsuario(email.toLowerCase());
        }
      }

      const editarPerfilAsync=async()=>{
        try{
            const objeto={
                "email": emailState,
                "nombres": nombre,
                "apellidos": apellidos,
                "telefono": telefono
            }
            const options= {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(objeto)
            };

            let datos=await fetch('https://www.georutas.lat/api/EditarPerfil?Token='+tokenState,options);

            if(datos.ok){
                let json=await datos.json();
                if(json==3){
                    setNombre(nombre);
                    setApellidos(apellidos);   
                    setTelefonoAsync(telefono);
                }
                console.log(json);
            }
        }catch{
            console.log("No se logro actualizar");
        }
      }

    return(
        <View style={{backgroundColor:'#103070',position:'absolute',zIndex:221, height:height+StatusBar.currentHeight, width:width, paddingTop:(height>width)?height*0.15:StatusBar.currentHeight}}>          
            <View style={[{backgroundColor:'#101038',width:(height>width)?width*0.8:height*0.8,marginLeft:'auto', marginRight:'auto'
            ,marginBottom:'auto',paddingTop:(height>width)?height*0.06:2*StatusBar.currentHeight},estylosStates]}>
                
                <View style={{position:'absolute',top:7,left:'90%'}} onTouchEnd={()=>{
                        setRegistrarse(false);
                        setEditarPerfil(false);
                    }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>

                <Text style={{color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%'}}>
                    {(editarPerfil==false)?"Registrate":"Editar Perfil"}
                </Text>
                <View style={{ height:(height>width)?(editarPerfil==false)?height*0.4:height*0.3:height*0.3}}>
                    <ScrollView>
                    <TextInput placeholder='Ingresa tus nombres' style={{paddingLeft:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                    onChangeText={
                        (em)=>{
                            setNombreU(em);
                        }
                    }>{nombre}</TextInput>
                    <TextInput placeholder='Ingresa tus apellidos' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                    onChangeText={
                        (em)=>{
                            setApellidos(em);
                        }
                    }>{apellidos}</TextInput>
                    <TextInput editable={!editarPerfil} keyboardType='email-address' placeholder='Ingresa tu correo' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40,color:'black'}}
                    onChangeText={
                        (em)=>{
                            setEmail(em);
                        }
                    }>{email}</TextInput>                
                    {editarPerfil==false && <TextInput secureTextEntry={true} placeholder='Ingrese su contraseña' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                    onChangeText={
                        (em)=>{
                            setValidante(em);
                        }
                    }></TextInput>}
                    {editarPerfil==false && <TextInput secureTextEntry={true} placeholder='Vuelva a ingresar su contraseña' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                    onChangeText={
                        (em)=>{
                            setValidarValidante(em);
                        }
                    }></TextInput>}
                    <TextInput keyboardType='number-pad' placeholder='Ingrese su numero de telefono' style={{paddingLeft:10,marginTop:'6%',borderRadius:20,backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                    onChangeText={
                        (em)=>{
                            setTelefono(em);
                        }
                    }>{telefono}</TextInput>                                               

                    </ScrollView>
                </View>

                <TouchableOpacity style={{backgroundColor:'#2060A5', height:55,width:'60%',marginLeft:'auto', marginRight:'auto',alignItems:'center', 
                    justifyContent:'center', borderRadius:20,marginTop:20}}>
                    <Text style={{ color:'white',fontSize:27,marginLeft:'auto', marginRight:'auto',marginBottom:'5%',textAlign:'center',marginTop:5}} 
                    onTouchEnd={
                        ()=>{
                            if(validarElementos()){         
                                if(editarPerfil==false){
                                    registrarUsuario();                               
                                }else{
                                    editarPerfilAsync();
                                    setEditarPerfil(false);
                                    setRegistrarse(false);
                                }
                            }                            
                        }
                    }>
                        {(editarPerfil==false)?"Registrarse":"Guardar"}
                    </Text>
                </TouchableOpacity>
                {editarPerfil==false && <TouchableOpacity>
                    <Text style={{color:'white',marginLeft:'auto', marginRight:'auto',marginTop:10, marginBottom:15}} 
                    onTouchEnd={()=>{
                        setLoguearse(true);
                        setRegistrarse(false);
                    }                    
                    }>Iniciar Sesion</Text>
                </TouchableOpacity>}
            </View>

        </View>
    )
 }

 export default Register