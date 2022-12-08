import React, { useEffect } from 'react'

import {QueryClient,QueryClientProvider} from 'react-query';
import Principal from './Principal';
import {enableLatestRenderer} from 'react-native-maps';


const queryClient= new QueryClient();




export default App=()=>{

  useEffect(()=>{
    enableLatestRenderer();
  },[])  

  return(
      <QueryClientProvider  client={queryClient}>
        <Principal></Principal>
      </QueryClientProvider>
  )
}

