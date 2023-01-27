import * as react from 'react';
import { Polyline } from 'react-native-maps';


 const LineaDePrueba=({height})=>{
 
    let coordenadas=[ 
      {latitude:12.1464595,longitude:-86.2640538}
,{latitude:12.1454861,longitude:-86.2643285}
,{latitude:12.1446974,longitude:-86.2645516}
,{latitude:12.14408,longitude:-86.2647338}
,{latitude:12.1436251,longitude:-86.2648254}
,{latitude:12.1433016,longitude:-86.2648914}
,{latitude:12.1431005,longitude:-86.2649365}
,{latitude:12.1423342,longitude:-86.2651016}
,{latitude:12.1415817,longitude:-86.2652253}
,{latitude:12.1408465,longitude:-86.2653634}
,{latitude:12.1402127,longitude:-86.2654825}
,{latitude:12.1400762,longitude:-86.2655082}
,{latitude:12.1393404,longitude:-86.2656464}
,{latitude:12.1386019,longitude:-86.2657852}
,{latitude:12.1378431,longitude:-86.265924}
,{latitude:12.1376016,longitude:-86.2659856}
,{latitude:12.1374438,longitude:-86.2660028}
,{latitude:12.137317,longitude:-86.266001}
,{latitude:12.1372137,longitude:-86.2659624}
,{latitude:12.1371275,longitude:-86.2659303}
,{latitude:12.1370681,longitude:-86.2659077}
,{latitude:12.1370444,longitude:-86.2658984}
,{latitude:12.1368752,longitude:-86.2658323}
,{latitude:12.1368246,longitude:-86.2658082}
,{latitude:12.1366119,longitude:-86.2657321}
,{latitude:12.1363139,longitude:-86.2656389}
,{latitude:12.1355206,longitude:-86.2654277}
,{latitude:12.1349201,longitude:-86.2652602}
,{latitude:12.1346108,longitude:-86.2651992}
,{latitude:12.1339966,longitude:-86.2651602}
,{latitude:12.1338418,longitude:-86.265117}
,{latitude:12.1335449,longitude:-86.2650073}
,{latitude:12.1328143,longitude:-86.2647373}
,{latitude:12.1323503,longitude:-86.2645828}
,{latitude:12.1322976,longitude:-86.2645653}
,{latitude:12.1320246,longitude:-86.264466}
,{latitude:12.1318031,longitude:-86.2643982}
,{latitude:12.1315025,longitude:-86.2643309}
,{latitude:12.1306744,longitude:-86.2642095}
,{latitude:12.1303874,longitude:-86.264211}
,{latitude:12.1302621,longitude:-86.264208}
,{latitude:12.1301444,longitude:-86.2642477}
,{latitude:12.1300494,longitude:-86.2642998}
,{latitude:12.1299339,longitude:-86.2643803}
,{latitude:12.1298416,longitude:-86.2644658}
,{latitude:12.1298013,longitude:-86.2645048}
,{latitude:12.1297751,longitude:-86.2645394}
,{latitude:12.1297378,longitude:-86.2645869}
,{latitude:12.1296809,longitude:-86.2646854}
,{latitude:12.1295629,longitude:-86.2651071}
,{latitude:12.1294676,longitude:-86.265427}
,{latitude:12.1294,longitude:-86.2656505}
,{latitude:12.1293954,longitude:-86.2656684}
,{latitude:12.1293908,longitude:-86.2657246}
,{latitude:12.1293918,longitude:-86.2657691}
,{latitude:12.1293974,longitude:-86.2658136}
,{latitude:12.1294081,longitude:-86.2658664}
,{latitude:12.1294234,longitude:-86.2659193}
,{latitude:12.129442,longitude:-86.2659643}
,{latitude:12.1294493,longitude:-86.2659819}
,{latitude:12.1294943,longitude:-86.266106}
,{latitude:12.1295132,longitude:-86.2661403}
,{latitude:12.129529,longitude:-86.2661762}
,{latitude:12.1295415,longitude:-86.2662134}
,{latitude:12.1295509,longitude:-86.2662516}
,{latitude:12.1295576,longitude:-86.2662987}
,{latitude:12.1295593,longitude:-86.2663463}
,{latitude:12.1295559,longitude:-86.2663938}
,{latitude:12.1295476,longitude:-86.2664407}
,{latitude:12.1295343,longitude:-86.2664864}
,{latitude:12.1295163,longitude:-86.2665303}
,{latitude:12.1294937,longitude:-86.266572}
,{latitude:12.1294668,longitude:-86.2666109}
,{latitude:12.1294359,longitude:-86.2666466}
,{latitude:12.1294015,longitude:-86.2666787}
,{latitude:12.1293639,longitude:-86.2667068}
,{latitude:12.1293235,longitude:-86.2667305}
,{latitude:12.1292809,longitude:-86.2667498}
,{latitude:12.1292365,longitude:-86.266764}
,{latitude:12.1291755,longitude:-86.2667753}
,{latitude:12.1291134,longitude:-86.2667775}
,{latitude:12.1290518,longitude:-86.2667705}
,{latitude:12.1289918,longitude:-86.2667544}
,{latitude:12.1289346,longitude:-86.2667297}
,{latitude:12.1288815,longitude:-86.2666969}
,{latitude:12.1287818,longitude:-86.2665996}
,{latitude:12.1287749,longitude:-86.2665858}
,{latitude:12.1287513,longitude:-86.266546}
,{latitude:12.128732,longitude:-86.266504}
,{latitude:12.1287171,longitude:-86.26646}
,{latitude:12.1287069,longitude:-86.2664148}
,{latitude:12.1286234,longitude:-86.2663478}
,{latitude:12.1285745,longitude:-86.2662884}
,{latitude:12.1285205,longitude:-86.2662414}
,{latitude:12.1284709,longitude:-86.2662078}
,{latitude:12.1284267,longitude:-86.266181}
,{latitude:12.1283824,longitude:-86.2661586}
,{latitude:12.1279322,longitude:-86.265997}
,{latitude:12.1274256,longitude:-86.2658328}
,{latitude:12.1273709,longitude:-86.2658151}
,{latitude:12.1263647,longitude:-86.265489}
,{latitude:12.1263456,longitude:-86.2654828}
,{latitude:12.1261541,longitude:-86.2654208}
,{latitude:12.1260099,longitude:-86.265374}
,{latitude:12.1259135,longitude:-86.2653439}
,{latitude:12.1258779,longitude:-86.265331}
,{latitude:12.125798,longitude:-86.265305}
,{latitude:12.1254155,longitude:-86.265181}
,{latitude:12.1249219,longitude:-86.2650103}
,{latitude:12.124302,longitude:-86.2647716}
,{latitude:12.1235214,longitude:-86.2643708}
,{latitude:12.1234592,longitude:-86.2643313}
,{latitude:12.123374,longitude:-86.2642772}
,{latitude:12.1232505,longitude:-86.2641976}
,{latitude:12.1231126,longitude:-86.2641148}
,{latitude:12.1230027,longitude:-86.2640489}
,{latitude:12.122766,longitude:-86.2638767}
,{latitude:12.1227123,longitude:-86.2638463}
,{latitude:12.1222304,longitude:-86.2634432}
,{latitude:12.1217741,longitude:-86.2630504}
,{latitude:12.1210273,longitude:-86.2623696}
,{latitude:12.1207176,longitude:-86.2620849}
,{latitude:12.1204476,longitude:-86.2618379}
,{latitude:12.1201275,longitude:-86.2615451}
,{latitude:12.1194207,longitude:-86.2609009}
,{latitude:12.1191003,longitude:-86.260614}
,{latitude:12.1182557,longitude:-86.2598475}
,{latitude:12.1181227,longitude:-86.2597271}
,{latitude:12.1178743,longitude:-86.2595011}
,{latitude:12.1176808,longitude:-86.259325}
,{latitude:12.1169528,longitude:-86.2586676}
,{latitude:12.1169301,longitude:-86.2586992}
,{latitude:12.1168838,longitude:-86.2586996}
,{latitude:12.1168203,longitude:-86.258678}
,{latitude:12.1167496,longitude:-86.2586186}
,{latitude:12.1166786,longitude:-86.2585588}
,{latitude:12.1166455,longitude:-86.2584794}
,{latitude:12.116645,longitude:-86.2583855}
,{latitude:12.1163207,longitude:-86.2580879}
,{latitude:12.1160108,longitude:-86.2578126}
,{latitude:12.1156842,longitude:-86.2575101}
,{latitude:12.1155404,longitude:-86.2573769}
,{latitude:12.1153787,longitude:-86.2572332}
,{latitude:12.1151805,longitude:-86.257127}
,{latitude:12.1150629,longitude:-86.2570235}
,{latitude:12.1149089,longitude:-86.2568879}
,{latitude:12.113933,longitude:-86.2560272}
,{latitude:12.113542,longitude:-86.2557218}
,{latitude:12.113491,longitude:-86.2557328}
,{latitude:12.1133884,longitude:-86.2557197}
,{latitude:12.1132955,longitude:-86.2556734}
,{latitude:12.1132223,longitude:-86.2555988}
,{latitude:12.1131766,longitude:-86.2555039}
,{latitude:12.1131635,longitude:-86.255399}
,{latitude:12.1131616,longitude:-86.2553388}
,{latitude:12.1130178,longitude:-86.2551869}
,{latitude:12.112804,longitude:-86.2549883}
,{latitude:12.1120483,longitude:-86.2542864}
,{latitude:12.1119139,longitude:-86.2541644}
,{latitude:12.1116101,longitude:-86.2538968}
,{latitude:12.1113693,longitude:-86.2536744}
,{latitude:12.111132,longitude:-86.2534051}
,{latitude:12.1108084,longitude:-86.2531254}
,{latitude:12.1102283,longitude:-86.2526107}
,{latitude:12.1098613,longitude:-86.2523301}
,{latitude:12.1096224,longitude:-86.2520679}
,{latitude:12.1094486,longitude:-86.2519101}
,{latitude:12.1091194,longitude:-86.251611}
,{latitude:12.1086563,longitude:-86.2511786}
,{latitude:12.1086355,longitude:-86.2511592}
,{latitude:12.1084488,longitude:-86.2509849}
,{latitude:12.1080223,longitude:-86.2505889}
,{latitude:12.1078196,longitude:-86.2504083}
,{latitude:12.1074831,longitude:-86.2500955}
,{latitude:12.1073798,longitude:-86.2500038}
,{latitude:12.106872,longitude:-86.2495436}
,{latitude:12.1067944,longitude:-86.2494753}
,{latitude:12.1067143,longitude:-86.2494094}
,{latitude:12.106591,longitude:-86.2493263}
,{latitude:12.1064835,longitude:-86.249278}
,{latitude:12.1063711,longitude:-86.2492224}
,{latitude:12.1062728,longitude:-86.2492327}
,{latitude:12.1061664,longitude:-86.2492072}
,{latitude:12.1060749,longitude:-86.2491461}
,{latitude:12.1060093,longitude:-86.2490567}
,{latitude:12.1059776,longitude:-86.2489497}
,{latitude:12.1058885,longitude:-86.2487367}
,{latitude:12.1058402,longitude:-86.2486594}
,{latitude:12.1057167,longitude:-86.2485391}
,{latitude:12.1050756,longitude:-86.2479536}
,{latitude:12.1047695,longitude:-86.2476741}
,{latitude:12.1046553,longitude:-86.2475698}
,{latitude:12.1044691,longitude:-86.2473998}
,{latitude:12.1044238,longitude:-86.2473584}
,{latitude:12.1042054,longitude:-86.247159}
,{latitude:12.103626,longitude:-86.2466299}
,{latitude:12.1026891,longitude:-86.2457743}
,{latitude:12.1023839,longitude:-86.2454956}
,{latitude:12.1023287,longitude:-86.2454452}
,{latitude:12.1021945,longitude:-86.2453235}
,{latitude:12.1008648,longitude:-86.244117}
,{latitude:12.1002192,longitude:-86.2435313}
,{latitude:12.0999021,longitude:-86.243242}
,{latitude:12.0984235,longitude:-86.2418934}
,{latitude:12.098199,longitude:-86.2416887}
,{latitude:12.0976329,longitude:-86.2411723}
,{latitude:12.0973529,longitude:-86.2409169}
,{latitude:12.0971217,longitude:-86.2407016}
,{latitude:12.0967623,longitude:-86.2403744}
,{latitude:12.0956505,longitude:-86.2393602}
,{latitude:12.0953132,longitude:-86.2390451}
,{latitude:12.0941934,longitude:-86.2380291}
,{latitude:12.0941463,longitude:-86.2379864}
,{latitude:12.0940975,longitude:-86.2379421}
,{latitude:12.0929739,longitude:-86.2369227}
,{latitude:12.0926386,longitude:-86.2366179}
,{latitude:12.0912685,longitude:-86.2353709}
,{latitude:12.0911098,longitude:-86.2352291}
,{latitude:12.0910953,longitude:-86.235216}
,{latitude:12.0900064,longitude:-86.2342339}
,{latitude:12.0898256,longitude:-86.2340709}
,{latitude:12.0893678,longitude:-86.2336579}
,{latitude:12.0882519,longitude:-86.2326514}
,{latitude:12.0876015,longitude:-86.2320648}
,{latitude:12.0874225,longitude:-86.2318908}
,{latitude:12.0869154,longitude:-86.2314327}
,{latitude:12.0867726,longitude:-86.231299}
,{latitude:12.0866704,longitude:-86.2312014}
,{latitude:12.0865574,longitude:-86.2311419}
,{latitude:12.0864818,longitude:-86.2311329}
,{latitude:12.0863854,longitude:-86.2311421}
,{latitude:12.0862803,longitude:-86.2311769}
,{latitude:12.0862693,longitude:-86.2312094}
,{latitude:12.0862129,longitude:-86.2314227}
,{latitude:12.0861749,longitude:-86.2316412}
,{latitude:12.0861545,longitude:-86.2318495}
,{latitude:12.0861333,longitude:-86.2322934}
,{latitude:12.0861193,longitude:-86.2325927}
,{latitude:12.0859536,longitude:-86.2325981}
,{latitude:12.0855734,longitude:-86.2326021}
,{latitude:12.0852166,longitude:-86.2326058}
,{latitude:12.0849803,longitude:-86.23259}
,{latitude:12.0848063,longitude:-86.23254}
,{latitude:12.0846645,longitude:-86.2324993}
,{latitude:12.0842959,longitude:-86.2323292}
,{latitude:12.0841,longitude:-86.2322265}
,{latitude:12.0836793,longitude:-86.2320231}
,{latitude:12.0836197,longitude:-86.2319808}
,{latitude:12.083584,longitude:-86.2319554}
,{latitude:12.0835222,longitude:-86.2319014}
,{latitude:12.0832991,longitude:-86.2317015}
,{latitude:12.083181,longitude:-86.2316197}
,{latitude:12.0831004,longitude:-86.2315921}
,{latitude:12.0829603,longitude:-86.231541}
,{latitude:12.0827998,longitude:-86.2315031}
,{latitude:12.0827624,longitude:-86.2314992}
,{latitude:12.0823861,longitude:-86.2314227}
,{latitude:12.082327,longitude:-86.231417}
,{latitude:12.0824402,longitude:-86.2319461}
,{latitude:12.0825284,longitude:-86.2323099}
,{latitude:12.0825689,longitude:-86.2325447}
,{latitude:12.0823012,longitude:-86.2326404}
,{latitude:12.0821841,longitude:-86.2326744}
,{latitude:12.0819682,longitude:-86.2327244}
,{latitude:12.0817614,longitude:-86.232788}
,{latitude:12.0816598,longitude:-86.2328501}
,{latitude:12.0816643,longitude:-86.2326797}
,{latitude:12.0816549,longitude:-86.2323796}
,{latitude:12.0815723,longitude:-86.231738}
,{latitude:12.0815325,longitude:-86.2316034}
,{latitude:12.0813901,longitude:-86.2313413}
,{latitude:12.081321,longitude:-86.2312132}
,{latitude:12.0812359,longitude:-86.2310185}
,{latitude:12.0811643,longitude:-86.2308147}
,{latitude:12.081134,longitude:-86.2306629}
,{latitude:12.0811426,longitude:-86.2305739}
,{latitude:12.0811901,longitude:-86.2304892}
,{latitude:12.0812429,longitude:-86.2304499}
,{latitude:12.081319,longitude:-86.2304258}
,{latitude:12.0816427,longitude:-86.2303874}
,{latitude:12.0820219,longitude:-86.2303543}
,{latitude:12.0820858,longitude:-86.2303465}
,{latitude:12.0820707,longitude:-86.2302941}
,{latitude:12.0820561,longitude:-86.2302542}
,{latitude:12.0817921,longitude:-86.2295317}
,{latitude:12.0814512,longitude:-86.2278859}
,{latitude:12.0814415,longitude:-86.2278392}
,{latitude:12.0814245,longitude:-86.2277573}
,{latitude:12.0818959,longitude:-86.2275742}
,{latitude:12.082132,longitude:-86.2274823}
,{latitude:12.0822684,longitude:-86.227398}
,{latitude:12.0823428,longitude:-86.227329}
,{latitude:12.0822095,longitude:-86.2271564}
,{latitude:12.0820662,longitude:-86.2270198}
,{latitude:12.0819945,longitude:-86.226955}
,{latitude:12.0819069,longitude:-86.2268757}
,{latitude:12.0803526,longitude:-86.2254697}
,{latitude:12.079621,longitude:-86.2248319}
,{latitude:12.0783343,longitude:-86.2236269}
,{latitude:12.0780853,longitude:-86.2234082}
,{latitude:12.0780121,longitude:-86.2233378}
,{latitude:12.0775176,longitude:-86.2228624}
,{latitude:12.0772566,longitude:-86.2226295}
,{latitude:12.0766301,longitude:-86.2220704}
,{latitude:12.0761972,longitude:-86.2216841}
,{latitude:12.0758439,longitude:-86.2213688}
,{latitude:12.0753935,longitude:-86.2209668}
,{latitude:12.0753159,longitude:-86.2208966}
,{latitude:12.0745336,longitude:-86.2201895}
,{latitude:12.0744761,longitude:-86.2201357}
,{latitude:12.0742931,longitude:-86.2199711}
,{latitude:12.0740993,longitude:-86.2197968}
,{latitude:12.0738423,longitude:-86.2195646}
,{latitude:12.0736814,longitude:-86.2194192}
,{latitude:12.0736438,longitude:-86.2193855}
,{latitude:12.0735775,longitude:-86.2193252}
,{latitude:12.0729455,longitude:-86.218754}
,{latitude:12.0720203,longitude:-86.2179176}
,{latitude:12.0717529,longitude:-86.2176759}
,{latitude:12.0712634,longitude:-86.2172269}
,{latitude:12.0711299,longitude:-86.2170971}
,{latitude:12.0707031,longitude:-86.2167005}
,{latitude:12.0705166,longitude:-86.216533}
,{latitude:12.0696606,longitude:-86.2157523}
,{latitude:12.0694611,longitude:-86.2155763}
,{latitude:12.0695527,longitude:-86.2154444}
,{latitude:12.0696084,longitude:-86.2153594}
,{latitude:12.0696538,longitude:-86.215293}
,{latitude:12.0696809,longitude:-86.2152349}
,{latitude:12.0697055,longitude:-86.2151764}
,{latitude:12.0700357,longitude:-86.2139395}
,{latitude:12.070078,longitude:-86.2137283}
,{latitude:12.0701814,longitude:-86.212984}
,{latitude:12.0701308,longitude:-86.21253}
,{latitude:12.0700676,longitude:-86.2121803}
,{latitude:12.0700371,longitude:-86.2119619}
,{latitude:12.0699626,longitude:-86.211663}
,{latitude:12.0699284,longitude:-86.2115237}
,{latitude:12.0698299,longitude:-86.2110338}
,{latitude:12.0696436,longitude:-86.2101363}
,{latitude:12.0696155,longitude:-86.2099433}
,{latitude:12.0695981,longitude:-86.2098242}
,{latitude:12.0695954,longitude:-86.2097358}
,{latitude:12.0695915,longitude:-86.2093153}
,{latitude:12.0695981,longitude:-86.208565}
,{latitude:12.0695998,longitude:-86.2083528}
,{latitude:12.0696275,longitude:-86.2072245}
,{latitude:12.0696321,longitude:-86.2071582}
,{latitude:12.0696448,longitude:-86.2064251}
,{latitude:12.0696346,longitude:-86.2058475}
,{latitude:12.0696223,longitude:-86.205019}
,{latitude:12.0695934,longitude:-86.2049032}
,{latitude:12.0692055,longitude:-86.2036378}
,{latitude:12.0691384,longitude:-86.2034373}
,{latitude:12.0685344,longitude:-86.201414}
,{latitude:12.0683248,longitude:-86.2006399}
  ];
    
    return(
        <Polyline color={'purple'} strokeColor='purple' strokeWidth={2} coordinates={coordenadas}></Polyline>
    )
 }

 export default LineaDePrueba