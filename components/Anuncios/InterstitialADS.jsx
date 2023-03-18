
import React, { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

//const adUnitId = 'ca-app-pub-1889500700036964/1659979689';
const adUnitId = TestIds.INTERSTITIAL;
                  
  const interstitial = InterstitialAd.createForAdRequest(adUnitId,{
    requestNonPersonalizedAdsOnly: true
  });

function InterstitialADS ({VERSIONDELAPLICACION,setMostrarAnuncioCompleto,enviarTiempoDesdeElUltimoAnuncio}) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("La mierda si esta cagando");
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      console.log("La mierda si entro aqui");
    });

    const salida=interstitial.addAdEventListener(AdEventType.CLOSED,()=>{
        setMostrarAnuncioCompleto(false);
        setLoaded(false);
        enviarTiempoDesdeElUltimoAnuncio();
    })

    // Start loading the interstitial straight away
    interstitial.load();
    
    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }else
  {
    interstitial.show();
}
}

export default InterstitialADS