
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { View } from 'react-native/Libraries/Components/View/View';

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function InterstitialADS ({setMostrarAnuncioCompleto,enviarTiempoDesdeElUltimoAnuncio}) {
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
  
//   return (
//     <View style={{width:100,height:100,backgroundColor:'red',position:'absolute',zIndex:260}}>
//         <Button
//         title="Show Interstitial"
//         onPress={() => {
//             interstitial.show();
//         }}
//         />
//     </View>
//   );
}
}

export default InterstitialADS