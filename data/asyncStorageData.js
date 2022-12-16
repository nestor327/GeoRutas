import AsyncStorage from "@react-native-async-storage/async-storage";



export const setUsuario = async (usuarioState) => {
    try{
        await AsyncStorage.setItem('usuario',usuarioState);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}



export const getUsuario = async (setUsuarioState) => {
    
    try{
        const value=await AsyncStorage.getItem('usuario');

        setUsuarioState(value);      
          
    }catch (e){
        console.log("No se encontro el usuario");
        setUsuarioState("");      
    }
  return true;
}

export const setTipoDeUsuario= async (usuarioState) => {
    try{
        await AsyncStorage.setItem('tipoDeUsuario',usuarioState);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getTipoDeUsuario = async (setTipoDeUsuarioState) => {   
    try{
        const value=await AsyncStorage.getItem('tipoDeUsuario');

        setTipoDeUsuarioState(value);      
          
    }catch (e){
        console.log("No se encontro el usuario");
        setTipoDeUsuarioState("");      
    }
  return true;
}

export const setContraseña= async (contraseña) => {
    try{
        await AsyncStorage.setItem('contraseñausuario',contraseña);
    }catch (e){
        console.log("No se encontro el usuario");        
    }
  return true;
}

export const getContraseña = async (setContraseña) => {   
    try{
        const value=await AsyncStorage.getItem('contraseñausuario');

        setContraseña(value);      
          
    }catch (e){
        console.log("No se encontro el usuario");
        setContraseña("");
    }
  return true;
}

export const setNombre= async (contraseña) => {
    try{
        await AsyncStorage.setItem('nombreUsuario',contraseña);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getNombre = async (setNombre) => {   
    try{
        const value=await AsyncStorage.getItem('nombreUsuario');

        setNombre(value);      
          
    }catch (e){
        console.log("No se encontro el usuario");
        setNombre("");      
    }
  return true;
}

export const setCorreo= async (correo) => {
    try{
        await AsyncStorage.setItem('correo',correo);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getCorreo = async (setCorreo) => {   
    try{
        const value=await AsyncStorage.getItem('correo');

        setCorreo(value);      
          
    }catch (e){
        console.log("No se encontro el usuario");
        setCorreo("");      
    }
  return true;
}

export const setPermitirEnvio= async (correo) => {
    try{
        await AsyncStorage.setItem('permitirEnvio',correo);
    }catch (e){
        console.log("No se encontro el permitir envio");
    }
  return true;
}

export const getPermitirEnvio = async (setPermitirEnvio) => {   
    try{
        const value=await AsyncStorage.getItem('permitirEnvio');

        if(value!=null){
            setPermitirEnvio(value);
        }else if(value==="false"){
            setPermitirEnvio(false);
        }else if(value==="true"){
            setPermitirEnvio(true);
        }
    }catch (e){
        console.log("No se encontro el permitir envio");
        setPermitirEnvio(false);      
    }
  return true;
}

export const setRutasParadasValue= async (rutasParadas) => {
    try{
        await AsyncStorage.setItem('rutasParadas',rutasParadas);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getRutasParadasValue = async () => {   
    try{
        const value=await AsyncStorage.getItem('rutasParadas');
        
        return (JSON.parse(value));      
        
          
    }catch (e){
        console.log("No se encontraron las paradas");
        return "[]";
    }
  
}