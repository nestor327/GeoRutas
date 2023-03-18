import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import imagen from '../../assets/x_icon_imagen.png';

const EditarUsuario=({height,width,setEditarInfoDelChofer,emailDelChoferEditar,choferAEditar,emailState, tokenState,
    refrescar,setRefrescar,setMostrarAlerte,setMensajeAlerta})=>{

    const [nombres,setNombres]=useState("");
    const [apellidos, setApellidos]=useState("");
    const [correo, setCorreo]=useState("");
    const [telefono, setTelefono]=useState("");

    useEffect(()=>{
        setCorreo(emailDelChoferEditar);
        setNombres(choferAEditar.nombres);
        setApellidos("");
        setTelefono(choferAEditar.telefono);
    },[])

    const [editarPassword, setEditarPassword]=useState(false);
    const [password, setPassword]=useState("");
    const [confirmarPassword, setConfirmarPassword]=useState("");

    const envarCambios=async(contrasenia,newContrasenia,emailDelChoferEditar)=>{
        let objeto={            
            email: emailDelChoferEditar,
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

        if(datos==null || datos.token=="0"){
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);            
        }else if(datos.token=="1"){
            setMensajeAlerta("Ocurrió un error, vuelva a intentarlo");
            setMostrarAlerte(true);
        }else if(datos.token.length>2){
            console.log("La contraseña se guardó correctamente");
            setMensajeAlerta("La actualización se realizó con éxito");
            setMostrarAlerte(true);
            setRefrescar(!refrescar);
            setEditarInfoDelChofer(false);   
            setRefrescar(!refrescar);
            setEditarInfoDelChofer(false);                 
        }
    }

    const actualizarDatos=async()=>{
        if(!correo.includes("@") || correo.length==0){
            setMensajeAlerta("Ingrese un correo válido");
            setMostrarAlerte(true);
            return;
        }else if(nombres==null || nombres.length==0){            
            setMensajeAlerta("Ingrese los nombres");
            setMostrarAlerte(true);
            return;
        }

        if(editarPassword)
        {
            if(password!=confirmarPassword){
                setMensajeAlerta("Las contraseñas no coinciden");
                setMostrarAlerte(true);
                return;
            }else if(password==confirmarPassword && password.length>=8){
                envarCambios(password,confirmarPassword,emailDelChoferEditar);
            }else if(password.length<8){
                setMensajeAlerta("La contraseña debe de tener por lo menos 8 caracteres");
                setMostrarAlerte(true);
                return;
            }
        }else{        

            try{
                let objeto={
                    nombres: nombres,
                    apellidos: apellidos,
                    telefono: telefono,
                    emailActual: emailDelChoferEditar,
                    emailNuevo: correo
                }
        
                const options= {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objeto)
                    };

                let datos=await fetch('https://www.georutas.lat/api/UsuariosCoperativas?Email='+emailState+'&Token='+tokenState,options);

                if(datos.ok){
                    let json=await datos.json();
                    console.log(json);
                    if(json=='4'){
                        setMensajeAlerta("La actualización se realizó con éxito");
                        setMostrarAlerte(true);
                        setRefrescar(!refrescar);
                        setEditarInfoDelChofer(false);                    
                    }
                    if(json=='5'){
                        setMensajeAlerta("El correo ya tiene dueño, no se logró actualizar");

                        setMostrarAlerte(true);                    
                    }else if(json=='0'){
                        setMensajeAlerta("No se logró actualizar al usuario");
                        setMostrarAlerte(true);
                    }
                    setRefrescar(!refrescar);
                    setEditarInfoDelChofer(false);
                }

            }catch{
                setMensajeAlerta("No se logró actualizar al usuario");

                setMostrarAlerte(true);
            }
        }
    }

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:230,backgroundColor:'#00000045'}}>

            <View style={{backgroundColor:'#101038',height:'90%',width:'90%',position:'absolute',top:'5%',left:'5%',zIndex:190}}>
                <View style={{position:'absolute',zIndex:250,height:50,width:50,left:'85%',top:'3%'}} onTouchEnd={()=>{
                    setEditarInfoDelChofer(false);
                }}>
                    <Image source={imagen} style={{width:35,height:35, tintColor:'#f1f1f1'}}></Image>
                </View>
                <View style={{marginTop:'30%',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:25}}>{(!editarPassword)?("Editar Información"):"Editar la contraseña"}</Text>
                </View>
                <View style={{ height:(height>width)?height*0.4:height*0.3,paddingTop:30}}>
                    {/* <ScrollView> */}
                        <TextInput editable={!editarPassword} placeholder='Ingresa los nombres' style={{paddingLeft:10,marginBottom:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setNombres(em);
                                }
                        }>{nombres}</TextInput>
                        <TextInput editable={!editarPassword} placeholder='Ingresa los apellidos' style={{paddingLeft:10,marginBottom:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setApellidos(em);
                                }
                        }>{apellidos}</TextInput>
                        <TextInput editable={!editarPassword} placeholder='Ingresa el correo' style={{paddingLeft:10,borderRadius:20,marginBottom:10, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setCorreo(em);
                                }
                        }>{(!editarPassword)?correo:emailDelChoferEditar}</TextInput>
                        <TextInput editable={!editarPassword} placeholder='Ingresa el número de teléfono' style={{paddingLeft:10,borderRadius:20,marginBottom:10, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setTelefono(em);
                                }
                        }>{telefono}</TextInput>
                        {editarPassword && <TextInput secureTextEntry={true}  placeholder='Ingresa la nueva contraseña' style={{paddingLeft:10,borderRadius:20,marginBottom:10, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40,borderColor:'#f1f1f1',borderWidth:2}}
                            onChangeText={
                                (em)=>{
                                    setPassword(em);
                                }
                        }>{password}</TextInput>}
                        {editarPassword && <TextInput secureTextEntry={true} placeholder='Vuelve a ingresar la contraseña' style={{paddingLeft:10,borderRadius:20,marginBottom:10, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40,borderColor:'#f1f1f1',borderWidth:2}}
                            onChangeText={
                                (em)=>{
                                    setConfirmarPassword(em);
                                }
                        }>{confirmarPassword}</TextInput>}

                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center', height:40}}
                            onPress={()=>{
                                setEditarPassword(!editarPassword);
                            }}
                        >
                            {/* <Text>Opcional </Text> */}
                            <Text style={{fontSize:16,textDecorationLine:'underline'}}>{(!editarPassword)?"Editar solo la contraseña":"No editar la contraseña"}</Text>
                        </TouchableOpacity>

                    {/* </ScrollView> */}
                    

                    <TouchableOpacity style={{borderRadius:20,marginHorizontal:'20%',alignItems:'center',height:45,backgroundColor:'#2060A5',width:'60%',justifyContent:'center'}}
                        onPressOut={()=>{
                            actualizarDatos();
                        }}
                    >
                        <Text style={{color:'#f1f1f1',fontSize:20}}>Guardar cambios</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default EditarUsuario