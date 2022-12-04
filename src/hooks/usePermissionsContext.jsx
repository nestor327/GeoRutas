

import { useState } from "react";
import { PermissionStatus,PERMISSIONS, request, check,openSettings } from "react-native-permissions";



//export const PermissionsContext= createContext({}); // que exporta


const usePermissionsContext=()=>{

    const [permisos,setPermisos]=useState('unavailable');
    
    const askLocationPermission=async()=>{
        if(Platform.OS === "ios"){

        }else if(Platform.OS === "android"){
            setPermisos(await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION));
            if(permisos=='blocked'){
                openSettings();
            }
        }
    }
    
    const checkLocationPermission=async()=>{
        let permi='V';
        if(Platform.OS === "ios"){

        }else if(Platform.OS === "android"){            
            
            permi=await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            setPermisos(permi);
            console.log("Mierda mierda mierda "+permisos);
            
        }

        return permi.toString();
    }
    

    return {
        permisos,
        askLocationPermission,
        checkLocationPermission
    };
}

export default usePermissionsContext;