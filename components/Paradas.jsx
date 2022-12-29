import react from "react";
import { Image, Text, View } from "react-native";
import { Marker } from "react-native-maps";

const Paradas=()=>{

//     const arreglo=[
// {id:1,latitude:12.1506227,longitude:-86.2839456,descripcion:"Cuerpo de Bomberos"}
// ,{id:2,latitude:12.1525420667,longitude:-86.2461224,descripcion:"Súper de los Militares"}
// ,{id:3,latitude:12.1455021,longitude:-86.2534489667,descripcion:"Semáforos de Ciudad Jardín"}
// ,{id:4,latitude:12.118321,longitude:-86.29376595,descripcion:"Super Boutique"}
// ,{id:5,latitude:12.13108195,longitude:-86.23314105,descripcion:"Sucursal Rubenia - DISSUR"}
// ,{id:6,latitude:12.1509840002,longitude:-86.2235601997,descripcion:"Sucursal Norte - DISSUR"}
// ,{id:7,latitude:12.1481172,longitude:-86.2937739,descripcion:"Ederli"}
// ,{id:8,latitude:12.1618616,longitude:-86.2936746,descripcion:"El Consultorio"}
// ,{id:9,latitude:12.1521317,longitude:-86.297303,descripcion:"Monseñor Lezcano"}
// ,{id:10,latitude:12.167578,longitude:-86.3587026,descripcion:"Vuelta de la Uno"}
// ,{id:11,latitude:12.1627215,longitude:-86.2935968,descripcion:"Acahualinca"}
// ,{id:12.latitude:12.1462149,longitude:-86.277966,descripcion:"Cabrera"}
// ,{id:13,latitude:12.1390167,longitude:-86.3000836,descripcion:"INVUR"}
// ,{id:14,latitude:12.1663542,longitude:-86.3546967,descripcion:"Iglesia San Francisco"}
// ,{id:15,latitude:12.1460009,longitude:-86.2894121,descripcion:"Las Palmas"}
// ,{id:16,latitude:12.0954191,longitude:-86.247942,descripcion:"Las Terrazas"}
// ,{id:17,latitude:12.0904083,longitude:-86.24512,descripcion:"Las Calderas"}
// ,{id:18,latitude:12.0843697,longitude:-86.2394618,descripcion:"La Estancia"}
// ,{id:19,latitude:12.1507816501,longitude:-86.2722385499,descripcion:"Parque Luis Alfonso Velásquez"}
// ,{id:20,latitude:12.0741904,longitude:-86.1985247,descripcion:"Vistas de Esquipulas"}
// ,{id:21,latitude:12.0972767,longitude:-86.2482483,descripcion:"Viejo Santo Domingo"}
// ,{id:22,latitude:12.0820229,longitude:-86.2302648,descripcion:"UNICA Sur"}
// ,{id:23,latitude:12.0940225,longitude:-86.246473,descripcion:"Notre Dame"}
// ,{id:24,latitude:12.1231619,longitude:-86.2969503,descripcion:"Parque Independencia"}
// ,{id:25,latitude:12.1115330502,longitude:-86.2293425001,descripcion:"Parque Germán Pomares Ordóñez"}
// ,{id:26,latitude:12.1343354,longitude:-86.2994715,descripcion:"Parque Héroes y Mártires"}
// ,{id:27,latitude:12.1517848,longitude:-86.300006,descripcion:"Parque José de San Martín"}
// ,{id:28,latitude:12.1296253,longitude:-86.2530366,descripcion:"Colonia Máximo Jerez"}
// ,{id:29,latitude:12.06964875,longitude:-86.20583455,descripcion:"El Chato"}
// ,{id:30,latitude:12.0691544,longitude:-86.2034296,descripcion:"Los Rocha"}
// ,{id:31,latitude:12.132378,longitude:-86.24464505,descripcion:"Parque 10 de Junio"}
// ,{id:32,latitude:12.14852605,longitude:-86.27601655,descripcion:"INSS"}
// ,{id:33,latitude:12.1600641,longitude:-86.29382745,descripcion:"Parque Acahualinca"}
// ,{id:34,latitude:12.14546305,longitude:-86.23197485,descripcion:"Parque Amistad"}
// ,{id:35,latitude:12.1568746,longitude:-86.19886905,descripcion:"Terminal Barrio Camilo Chamorro"}
// ,{id:36,latitude:12.1525234,longitude:-86.2428547,descripcion:"SINSA Carretera Norte"}
// ,{id:37,latitude:12.1506531,longitude:-86.27024,descripcion:"Entrada Olof Palme"}
// ,{id:38,latitude:12.1289233668,longitude:-86.2199419665,descripcion:"Barrio Américas 1"}
// ,{id:39,latitude:12.1333928,longitude:-86.253992,descripcion:"Barrio El Riguero Sur"}
// ,{id:40,latitude:12.1091169,longitude:-86.2166071,descripcion:"Barber Shop"}
// ,{id:41,latitude:12.10934445,longitude:-86.2249434,descripcion:"Colegio Salomón Ibarra"}
// ,{id:42,latitude:12.1514985,longitude:-86.238773,descripcion:"La Vuelta"}
// ,{id:43,latitude:12.1066673003,longitude:-86.2971808502,descripcion:"Colegio Rodolfo Rodríguez Alvarado"}
// ,{id:44,latitude:12.1143114,longitude:-86.2936012,descripcion:"Colegio Roberto Vargas Bretes"}
// ,{id:45,latitude:12.1081289,longitude:-86.264878,descripcion:"Colegio La Anunciación"}
// ,{id:46,latitude:12.1124555,longitude:-86.2647511,descripcion:"Claro Villa Fontana"}
// ,{id:47,latitude:12.1255305,longitude:-86.20366525,descripcion:"Colegio San Ignacio de Loyola"}
// ,{id:48,latitude:12.0747262,longitude:-86.2200199,descripcion:"Entrada a Esquipulas"}
// ,{id:49,latitude:12.1424631,longitude:-86.2421147,descripcion:"Colegio Reverendo Boanerges Aragón"}
// ,{id:50,latitude:12.1578077,longitude:-86.3137174,descripcion:"San Miguel Arcángel"}
// ,{id:51,latitude:12.119937,longitude:-86.2319062,descripcion:"Tanque"}
// ,{id:52,latitude:12.1524421,longitude:-86.2460419,descripcion:"Súper de los Militares"}
// ,{id:53,latitude:12.1554934,longitude:-86.3147253,descripcion:"Rótulo Joyería Garzón"}
// ,{id:54,latitude:12.1521471,longitude:-86.2427114,descripcion:"Calbri Internacional"}
// ,{id:55,latitude:12.157764,longitude:-86.2956546,descripcion:"Cuadro Gadala María"}
// ,{id:56,latitude:12.1514066,longitude:-86.2369377,descripcion:"Distribuidora La Universal"}
// ,{id:57,latitude:12.1482085,longitude:-86.2372477,descripcion:"Colonial Norte"}
// ,{id:58,latitude:12.1578692,longitude:-86.2948197,descripcion:"Cuadro Gadala María"}
// ,{id:59,latitude:12.14903215,longitude:-86.28157895,descripcion:"El Boer"}
// ,{id:60,latitude:12.0815444506,longitude:-86.2366203498,descripcion:"El Poste Blanco"}
// ,{id:61,latitude:12.0819193516,longitude:-86.2336307014,descripcion:"El Parque"}
// ,{id:62,latitude:12.14551855,longitude:-86.2633575,descripcion:"El Panal"}
// ,{id:63,latitude:12.1349697,longitude:-86.19452835,descripcion:"Mercado Mayoreo"}
// ,{id:64,latitude:12.15561625,longitude:-86.2879715,descripcion:"El Molito"}
// ,{id:65,latitude:12.1092121,longitude:-86.2237215,descripcion:"Tanque Rojo"}
// ,{id:66,latitude:12.1340124,longitude:-86.2383082,descripcion:"Hospital Japonés"}
// ,{id:67,latitude:12.1024961,longitude:-86.2187256,descripcion:"Parque Los Chilamates"}
// ,{id:68,latitude:12.0891666,longitude:-86.1954995,descripcion:"Iglesia Católica"}
// ,{id:69,latitude:12.0933277,longitude:-86.2024674,descripcion:"Residencial Bruselas"}
// ,{id:70,latitude:12.1393804,longitude:-86.210793,descripcion:"Puente San Jacinto"}
// ,{id:71,latitude:12.1419983,longitude:-86.2945947,descripcion:"PUMA - El Guanacaste"}
// ,{id:72,latitude:12.1178448,longitude:-86.2382227,descripcion:"Palí La Fuente"}
// ,{id:73,latitude:12.1310027,longitude:-86.3102866,descripcion:"Asososca"}
// ,{id:74,latitude:12.1258307,longitude:-86.2964158,descripcion:"El Zumen Norte"}
// ,{id:75,latitude:12.1254915,longitude:-86.2966774,descripcion:"El Zumen Norte"}
// ,{id:76,latitude:12.1445027,longitude:-86.3041184,descripcion:"El Seminario"}
// ,{id:77,latitude:12.1315196,longitude:-86.2171498,descripcion:"El Contil"}
// ,{id:78,latitude:12.1243832,longitude:-86.2768171,descripcion:"ENEL Central"}
// ,{id:79,latitude:12.11424995,longitude:-86.2170571,descripcion:"Milagro de Dios"}
// ,{id:80,latitude:12.1436857,longitude:-86.2648812,descripcion:"Ministerio de Defensa"}
// ,{id:81,latitude:12.1258691,longitude:-86.289637,descripcion:"Excel Automotriz"}
// ,{id:82,latitude:12.1284792,longitude:-86.2223622,descripcion:"Entrada Primero de Mayo"}
// ,{id:83,latitude:12.1423587,longitude:-86.2959168,descripcion:"Autolavado Ticuer"}
// ,{id:84,latitude:12.097006,longitude:-86.2481526,descripcion:"Viejo Santo Domingo"}
// ,{id:85,latitude:12.1129267,longitude:-86.1911756,descripcion:"Barrio Israel Gaelano"}
// ,{id:86,latitude:12.1396747,longitude:-86.2379861,descripcion:"Cementerio Oriental"}
// ,{id:87,latitude:12.1408843,longitude:-86.2394954,descripcion:"La American University"}
// ,{id:88,latitude:12.07631,longitude:-86.2132525,descripcion:"La Ermita de Esquipulas"}
// ,{id:89,latitude:12.1530489001,longitude:-86.2517247498,descripcion:"Antigua Aduana"}
// ,{id:90,latitude:12.1506467,longitude:-86.1867614,descripcion:"Farmacia Erika"}
// ,{id:91,latitude:12.1486448,longitude:-86.3105607,descripcion:"Hospital Lenín Fonseca"}
// ,{id:92,latitude:12.1655033,longitude:-86.3643831,descripcion:"Casa del Zinc"}
// ,{id:93,latitude:12.1661942,longitude:-86.3617151,descripcion:"Iglesia San José"}
// ,{id:94,latitude:12.1235846,longitude:-86.2936798,descripcion:"Barrio el Pilar"}
// ,{id:95,latitude:12.1241589,longitude:-86.2768494,descripcion:"ENEL Central"}
// ,{id:96,latitude:12.1452707501,longitude:-86.3003649999,descripcion:"Reparto Miraflores"}
// ,{id:97,latitude:12.1230486501,longitude:-86.1912655,descripcion:"Bayer"}
// ,{id:98,latitude:12.1379186,longitude:-86.2911109,descripcion:"La Racachaca"}
// ,{id:99,latitude:12.13067925,longitude:-86.2904479999,descripcion:"Colegio Benjamín Zeledón"}
// ,{id:100,latitude:12.1124485,longitude:-86.28278235,descripcion:"Benito Juárez"}
// ,{id:101,latitude:12.1150773,longitude:-86.2537564,descripcion:"El Quetzal"}
// ,{id:102,latitude:12.115654,longitude:-86.2392015,descripcion:"Parque Adolfo Reyes"}
// ,{id:103,latitude:12.0696117,longitude:-86.2158242,descripcion:"KM 12 Carretera Masaya / La Base"}
// ,{id:104,latitude:12.1657783,longitude:-86.3556567,descripcion:"Palí Ciudad Sandino"}
// ,{id:105,latitude:12.1575929,longitude:-86.3603565,descripcion:"Santa Eduviges"}
// ,{id:106,latitude:12.15013185,longitude:-86.31979435,descripcion:"Unimar"}
// ,{id:107,latitude:12.1576741,longitude:-86.3603392,descripcion:"Santa Eduviges"}
// ,{id:108,latitude:12.15005825,longitude:-86.31955665,descripcion:"Terminal de la Ruta 114"}
// ,{id:109,latitude:12.1133024,longitude:-86.3156148,descripcion:"Entrada a San Patricio"}
// ,{id:110,latitude:12.1131921,longitude:-86.3156189,descripcion:"Entrada a San Patricio"}
// ,{id:111,latitude:12.1229287,longitude:-86.1948878,descripcion:"Manuel Fernández"}
// ,{id:112,latitude:12.1061562,longitude:-86.3095939,descripcion:"Campo de Béisbol"}
// ,{id:113,latitude:12.1060498,longitude:-86.3094365,descripcion:"Campo de Béisbol"}
// ,{id:114,latitude:12.1130302,longitude:-86.3115679,descripcion:"Centro Kairos"}
// ,{id:115,latitude:12.1125363,longitude:-86.3112545,descripcion:"Centro Kairos"}
// ,{id:116,latitude:12.1295496,longitude:-86.2976377,descripcion:"Colegio Madre del Divino Pastor"}
// ,{id:117,latitude:12.1435307,longitude:-86.2509417,descripcion:"Cerrajería Tenderí"}
// ,{id:118,latitude:12.1409392,longitude:-86.2914192,descripcion:"Escuela Normal María Mazzarello"}
// ,{id:119,latitude:12.1296873,longitude:-86.297125,descripcion:"Colegio Madre del Divino Pastor"}
// ,{id:120,latitude:12.1371643,longitude:-86.2350764,descripcion:"La Basílica"}
// ,{id:121,latitude:12.108226,longitude:-86.3110582,descripcion:"Barrio Germán Pomares"}
// ,{id:122,latitude:12.1441998,longitude:-86.2141199,descripcion:"Zona Franca Dasol"}
// ,{id:123,latitude:12.1828064,longitude:-86.359001,descripcion:"Salida Valle Sandino"}
// ,{id:124,latitude:12.1356184,longitude:-86.2090342,descripcion:"9 de Junio"}
// ,{id:125,latitude:12.1799302,longitude:-86.3550819,descripcion:"La Zona"}
// ,{id:126,latitude:12.1809411,longitude:-86.3563438,descripcion:"Zaratoga"}
// ,{id:127,latitude:12.145137,longitude:-86.2515321,descripcion:"Profamilia"}
// ,{id:128,latitude:12.1052598,longitude:-86.2233822,descripcion:"Salomón Moreno"}
// ,{id:129,latitude:12.1330932,longitude:-86.2810839,descripcion:"Banco LAFISE Bancentro Plaza España"}
// ,{id:130,latitude:12.1269069,longitude:-86.2036062,descripcion:"Maxi Palí"}
// ,{id:131,latitude:12.0899103,longitude:-86.309568,descripcion:"Camilo Ortega 1"}
// ,{id:132,latitude:12.1345222,longitude:-86.2918804,descripcion:"Puente"}
// ,{id:133,latitude:12.1484328,longitude:-86.2962683,descripcion:"Parque Mennen"}
// ,{id:134,latitude:12.0899683,longitude:-86.3094766,descripcion:"Camilo Ortega 1"}
// ,{id:135,latitude:12.1541202,longitude:-86.2984103,descripcion:"Semáforos La Ceibita"}
// ,{id:136,latitude:12.1422333,longitude:-86.24199,descripcion:"INDENICSA"}
// ,{id:137,latitude:12.1541678,longitude:-86.2640651,descripcion:"Rubén Darío"}
// ,{id:138,latitude:12.155966,longitude:-86.238429,descripcion:"Colegio José de la Cruz Mena"}
// ,{id:139,latitude:12.1506843,longitude:-86.3009579,descripcion:"Cine León"}
// ,{id:140,latitude:12.1498155,longitude:-86.2923632,descripcion:"Las Vegas"}
// ,{id:141,latitude:12.1534804,longitude:-86.2544573,descripcion:"Quinta Nina"}
// ,{id:142,latitude:12.1542333,longitude:-86.2656516,descripcion:"Instituto Loyola"}
// ,{id:143,latitude:12.139216,longitude:-86.2378737,descripcion:"Cementerio Oriental"}
// ,{id:144,latitude:12.123277,longitude:-86.2937124,descripcion:"Barrio el Pilar"}
// ,{id:145,latitude:12.1143052,longitude:-86.2936313,descripcion:"Escuela Melania Morales"}
// ,{id:146,latitude:12.1162713,longitude:-86.2940421,descripcion:"Entrada Barrio El Pilar"}
// ,{id:147,latitude:12.1455772,longitude:-86.2622499,descripcion:"Policía Distrito I Norte"}
// ,{id:148,latitude:12.1173348,longitude:-86.1656836,descripcion:"Antigua Estación"}
// ,{id:149,latitude:12.1091169,longitude:-86.291053,descripcion:"Pozo Enacal"}
// ,{id:150,latitude:12.108915,longitude:-86.287216,descripcion:"Sombrero de Sandino"}
// ,{id:151,latitude:12.1183219,longitude:-86.2938145,descripcion:"Super Boutique"}
// ,{id:152,latitude:12.1206296,longitude:-86.2944631,descripcion:"Pulpería Wendy"}
// ,{id:153,latitude:12.0888395,longitude:-86.3094151,descripcion:"Terminal Camilo Ortega"}
// ,{id:154,latitude:12.1007976,longitude:-86.298539,descripcion:"Sorbetería Haydee"}
// ,{id:155,latitude:12.1479557,longitude:-86.2883207,descripcion:"Salud Integral"}
// ,{id:156,latitude:12.1482279,longitude:-86.2864599,descripcion:"Ruta Maya"}
// ,{id:157,latitude:12.1319793,longitude:-86.293043,descripcion:"Gasolinera Altagracia"}
// ,{id:158,latitude:12.1521896,longitude:-86.2738517,descripcion:"Asamblea"}
// ,{id:159,latitude:12.0993451,longitude:-86.2605761,descripcion:"Club Terraza Sur"}
// ,{id:160,latitude:12.1053079,longitude:-86.2501565,descripcion:"Galerías Santo Domingo Norte"}
// ,{id:161,latitude:12.1023543,longitude:-86.2609414,descripcion:"Entrada a San Isidro"}
// ,{id:162,latitude:12.1026926,longitude:-86.2587098,descripcion:"Entrada a Residencial Mirasol"}
// ,{id:163,latitude:12.1055814,longitude:-86.2503118,descripcion:"Galerías Santo Domingo Norte"}
// ,{id:164,latitude:12.08797,longitude:-86.2619113,descripcion:"Pallavicini"}
// ,{id:165,latitude:12.1028578,longitude:-86.2573039,descripcion:"ASSA"}
// ,{id:166,latitude:12.0879614,longitude:-86.2620183,descripcion:"Pallavicini"}
// ,{id:167,latitude:12.13234565,longitude:-86.31383905,descripcion:"Las Piedrecitas"}
// ,{id:168,latitude:12.0903752,longitude:-86.2450633,descripcion:"Las Calderas"}
// ,{id:169,latitude:12.14595185,longitude:-86.2893788,descripcion:"Las Palmas"}
// ,{id:170,latitude:12.1421435,longitude:-86.2941771,descripcion:"Autostar"}
// ,{id:171,latitude:12.149557,longitude:-86.2176573,descripcion:"SenCom"}
// ,{id:172,latitude:12.1501034,longitude:-86.2174245,descripcion:"Ladrillería Americana"}
// ,{id:173,latitude:12.1523704,longitude:-86.246069,descripcion:"Madinisa"}
// ,{id:174,latitude:12.1527279,longitude:-86.250078,descripcion:"Agronisa"}
// ,{id:175,latitude:12.1534252,longitude:-86.2581586,descripcion:"Planta Eléctrica"}
// ,{id:176,latitude:12.136131,longitude:-86.2895137,descripcion:"Templo Mormón Altagracia"}
// ,{id:177,latitude:12.1244635502,longitude:-86.2182169001,descripcion:"Iglesia Mormona"}
// ,{id:178,latitude:12.1509291,longitude:-86.2304952,descripcion:"Iglesia Adventista Carretera Norte"}
// ,{id:179,latitude:12.1515113,longitude:-86.1892305,descripcion:"Palí Las Mercedes"}
// ,{id:180,latitude:12.1406302,longitude:-86.2511772,descripcion:"Iglesia Morava Managua"}
// ,{id:181,latitude:12.17575975,longitude:-86.358651,descripcion:"Iglesia Morava Ciudad Sandino"}
// ,{id:182,latitude:12.151937,longitude:-86.2605036,descripcion:"Terminal 170"}
// ,{id:183,latitude:12.1207459251,longitude:-86.2215764,descripcion:"Iglesia Madre del Divino Amor"}
// ,{id:184,latitude:12.1142428,longitude:-86.2968209,descripcion:"Iglesia Bautista Nazareth"}
// ,{id:185,latitude:12.1283201,longitude:-86.2914479,descripcion:"Farmacia El Recreo"}
// ,{id:186,latitude:12.1019287,longitude:-86.294205,descripcion:"Grúas Hocri"}
// ,{id:187,latitude:12.145323,longitude:-86.2277932,descripcion:"Ferretería Shalom"}
// ,{id:188,latitude:12.1492612,longitude:-86.2971919,descripcion:"Estatua Monseñor Lezcano"}
// ,{id:189,latitude:12.1385024,longitude:-86.2219929,descripcion:"Terraqueos Bar"}
// ,{id:190,latitude:12.145751,longitude:-86.2535505,descripcion:"Semáforos de Ciudad Jardín"}
// ,{id:191,latitude:12.1539652,longitude:-86.22683315,descripcion:"Barrio Selim Shible"}
// ,{id:192,latitude:12.13148775,longitude:-86.29166545,descripcion:"Pulpería Gema"}
// ,{id:193,latitude:12.1402107,longitude:-86.2569083,descripcion:"Politécnico de Comercio"}
// ,{id:194,latitude:12.14175655,longitude:-86.24567375,descripcion:"Bar Neptuno"}
// ,{id:195,latitude:12.1422147,longitude:-86.250941,descripcion:"Clínica Santamaría"}
// ,{id:196,latitude:12.1164844,longitude:-86.2378357,descripcion:"Duya Mágica"}
// ,{id:197,latitude:12.1599889,longitude:-86.195424,descripcion:"Terminal Berta Díaz"}
// ,{id:198,latitude:12.1599865,longitude:-86.1954445,descripcion:"Terminal Berta Díaz"}
// ,{id:199,latitude:12.147631,longitude:-86.1901873,descripcion:"Entrada a Las Mercedes / Subasta"}
// ,{id:200,latitude:12.1234184,longitude:-86.2189518,descripcion:"Villa Flor Norte"}
// ,{id:201,latitude:12.1234158,longitude:-86.2188559,descripcion:"Villa Flor Norte"}
// ,{id:202,latitude:12.1472544,longitude:-86.2836966,descripcion:"Estadio Cranshaw"}
// ,{id:203,latitude:12.1385766,longitude:-86.30189035,descripcion:"Sitel"}
// ,{id:204,latitude:12.1670009,longitude:-86.3533633,descripcion:"Farmacia Nefi"}
// ,{id:205,latitude:12.10884225,longitude:-86.2871981,descripcion:"Sombrero de Sandino"}
// ,{id:206,latitude:12.1008,longitude:-86.29855965,descripcion:"Sorbetería Haydee"}
// ,{id:207,latitude:12.118353,longitude:-86.23932555,descripcion:"Sport Gym La Fuente"}
// ,{id:208,latitude:12.1677296,longitude:-86.3518785,descripcion:"El Gallo Más Gallo"}
// ,{id:209,latitude:12.1389148,longitude:-86.2324411,descripcion:"Bello Horizonte Sur"}
// ,{id:210,latitude:12.1384584,longitude:-86.2292108,descripcion:"Multicentro Sur"}
// ,{id:211,latitude:12.1395615,longitude:-86.3320464,descripcion:"KM 9"}
// ,{id:212,latitude:12.1402993,longitude:-86.2332238,descripcion:"Boulevard Bello Horizonte"}
// ,{id:213,latitude:12.09786,longitude:-86.2486051,descripcion:"Cruz Verde"}
// ,{id:214,latitude:12.101875,longitude:-86.2500139,descripcion:"Taller El Chele"}
// ,{id:215,latitude:12.0880889,longitude:-86.2425319,descripcion:"Ecami"}
// ,{id:216,latitude:12.1048456,longitude:-86.2509152,descripcion:"El Establo"}
// ,{id:217,latitude:12.0815286,longitude:-86.234575,descripcion:"El Parque"}
// ,{id:218,latitude:12.0816211,longitude:-86.2371994,descripcion:"Tercera Etapa Las Sierritas"}
// ,{id:219,latitude:12.0739873,longitude:-86.196868,descripcion:"Colegio Pablo Antonio Cuadra"}
// ,{id:220,latitude:12.0750346,longitude:-86.2096788,descripcion:"FUTEC"}
// ,{id:221,latitude:12.1262982002,longitude:-86.2414834999,descripcion:"Parque Don Bosco (Mercado Huembes)"}
// ,{id:222,latitude:12.0851629,longitude:-86.2403662,descripcion:"Las Sierritas"}
// ,{id:223,latitude:12.13145585,longitude:-86.2435104,descripcion:"Parque Colombia"}
// ,{id:224,latitude:12.1404869,longitude:-86.2567845,descripcion:"Iglesia Bautista Eben Ezer"}
// ,{id:225,latitude:12.1526062,longitude:-86.2640091,descripcion:"Vuelta Casa de las Mangueras"}
// ,{id:226,latitude:12.1457074,longitude:-86.1726379,descripcion:"Hotel Las Mercedes"}
// ,{id:227,latitude:12.1124528,longitude:-86.2827376,descripcion:"Benito Juárez"}
// ,{id:228,latitude:12.12156915,longitude:-86.2159664,descripcion:"Panadería San José"}
// ,{id:229,latitude:12.0695982,longitude:-86.2048903,descripcion:"Cenicera"}
// ,{id:230,latitude:12.16760595,longitude:-86.3519877001,descripcion:"El Gallo Más Gallo"}
// ,{id:231,latitude:12.06964165,longitude:-86.2071425,descripcion:"Alborada"}
// ,{id:232,latitude:12.06997305,longitude:-86.21166945,descripcion:"El Avispero"}
// ,{id:233,latitude:12.10488425,longitude:-86.250829,descripcion:"El Establo"}
// ,{id:234,latitude:12.1289656501,longitude:-86.34573895,descripcion:"El Cuadro"}
// ,{id:235,latitude:12.13624605,longitude:-86.25071995,descripcion:"Semáforo El Dorado"}
// ,{id:236,latitude:12.1359544,longitude:-86.24992795,descripcion:"El Dorado"}
// ,{id:237,latitude:12.151902,longitude:-86.3487088,descripcion:"La primera casa"}
// ,{id:238,latitude:12.1375172,longitude:-86.2378776,descripcion:"TAMENICSA"}
// ,{id:239,latitude:12.1485874,longitude:-86.2035718,descripcion:"Entrada Barrio Hugo Chávez"}
// ,{id:240,latitude:12.1168541,longitude:-86.2732265,descripcion:"Radio Universidad"}
// ,{id:241,latitude:12.1571572,longitude:-86.1882654,descripcion:"El Molino"}
// ,{id:242,latitude:12.1080845,longitude:-86.2649674,descripcion:"Colegio La Anunciación"}
// ,{id:243,latitude:12.1286856,longitude:-86.2184971,descripcion:"Almacenes Tropigás"}
// ,{id:244,latitude:12.1175431,longitude:-86.2517319,descripcion:"Hospital Central"}
// ,{id:245,latitude:12.1175126,longitude:-86.2519282,descripcion:"Hospital Central"}
// ,{id:246,latitude:12.1341841501,longitude:-86.3456101,descripcion:"Colegio Cuachillo"}
// ,{id:247,latitude:12.17331395,longitude:-86.36664295,descripcion:"Colegio Cristiano el Edén"}
// ,{id:248,latitude:12.1453496,longitude:-86.3005823,descripcion:"Reparto Miraflores"}
// ,{id:249,latitude:12.1352938,longitude:-86.1996061,descripcion:"Semáforos Mayoreo"}
// ,{id:250,latitude:12.1559646,longitude:-86.2382874,descripcion:"Colegio José de la Cruz Mena"}
// ,{id:251,latitude:12.1387751,longitude:-86.3000385,descripcion:"INVUR"}
// ,{id:252,latitude:12.1314764,longitude:-86.2572331,descripcion:"Rotonda Santo Domingo"}
// ,{id:253,latitude:12.1402583,longitude:-86.2405541,descripcion:"Taller Mejía"}
// ,{id:254,latitude:12.1372469,longitude:-86.2390325,descripcion:"Barrio Ducualí"}
// ,{id:255,latitude:12.1490233,longitude:-86.2548191,descripcion:"Importaciones Raesva"}
// ,{id:256,latitude:12.1360063,longitude:-86.2498942,descripcion:"El Dorado"}
// ,{id:257,latitude:12.157522,longitude:-86.3043751,descripcion:"Colonia Linda Vista"}
// ,{id:258,latitude:12.1368155,longitude:-86.2535973,descripcion:"Ferretería Universal"}
// ,{id:259,latitude:12.1362433,longitude:-86.2506083,descripcion:"Semáforo El Dorado"}
// ,{id:260,latitude:12.1118122,longitude:-86.2086026,descripcion:"Terminal 195"}
// ,{id:261,latitude:12.1077853,longitude:-86.2235523,descripcion:"Farmacia Balgar"}
// ,{id:262,latitude:12.0768707,longitude:-86.1942542,descripcion:"Rótulo Clínica Nuevos Horizontes"}
// ,{id:263,latitude:12.1481062,longitude:-86.2743883,descripcion:"Arboretum"}
// ,{id:264,latitude:12.1455331,longitude:-86.2737374,descripcion:"Plaza Inter"}
// ,{id:265,latitude:12.13478855,longitude:-86.21190105,descripcion:"El Puente 9 de Junio"}
// ,{id:266,latitude:12.1548356,longitude:-86.352547,descripcion:"Villa Nueva"}
// ,{id:267,latitude:12.1417088,longitude:-86.2457121,descripcion:"Bar Neptuno"}
// ,{id:268,latitude:12.1425241,longitude:-86.296261,descripcion:"Iglesia Cristiana del Verbo"}
// ,{id:269,latitude:12.155038,longitude:-86.3524536,descripcion:"Villa Nueva"}
// ,{id:270,latitude:12.1281763,longitude:-86.2342302,descripcion:"La Vuelta"}
// ,{id:271,latitude:12.1215718,longitude:-86.2434657,descripcion:"Tecnológico Central"}
// ,{id:272,latitude:12.1474785,longitude:-86.2821575,descripcion:"Semáforo CST"}
// ,{id:273,latitude:12.1262321,longitude:-86.2389738,descripcion:"Ferretería Jenny"}
// ,{id:274,latitude:12.1297527,longitude:-86.2288875,descripcion:"Pista La Sabana"}
// ,{id:275,latitude:12.1316522,longitude:-86.2174057,descripcion:"El Contil"}
// ,{id:276,latitude:12.1349617,longitude:-86.1996434,descripcion:"Semáforos Mayoreo"}
// ,{id:277,latitude:12.1437674,longitude:-86.3048745,descripcion:"El Seminario"}
// ,{id:278,latitude:12.1438295,longitude:-86.3050195,descripcion:"El Seminario"}
// ,{id:279,latitude:12.1089782,longitude:-86.209416,descripcion:"Entrada Villa Milagro"}
// ,{id:280,latitude:12.1286691,longitude:-86.2196044,descripcion:"Barrio Américas 1"}
// ,{id:281,latitude:12.1585356,longitude:-86.2931079,descripcion:"Pulpería La Providencia"}
// ,{id:282,latitude:12.0972527,longitude:-86.2972737,descripcion:"Villa Roma"}
// ,{id:283,latitude:12.1487209,longitude:-86.2258016,descripcion:"Barrio Santa Rosa"}
// ,{id:284,latitude:12.138345,longitude:-86.2493999,descripcion:"Colegio Ignacio Loyola"}
// ,{id:285,latitude:12.1476085,longitude:-86.1877452,descripcion:"Entrada Unidad de Proposito"}
// ,{id:286,latitude:12.1554014,longitude:-86.2198485,descripcion:"Super Express"}
// ,{id:287,latitude:12.1533332,longitude:-86.1854209,descripcion:"Modesto Armijo"}
// ,{id:288,latitude:12.1493611,longitude:-86.2239105,descripcion:"Paso a Desnivel Portezuelo"}
// ,{id:289,latitude:12.1552632,longitude:-86.1841815,descripcion:"Terminal 105"}
// ,{id:290,latitude:12.1395009,longitude:-86.2995133,descripcion:"El Bodegón"}
// ,{id:291,latitude:12.1500395,longitude:-86.2206043,descripcion:"ENACAL"}
// ,{id:292,latitude:12.1422472,longitude:-86.2378,descripcion:"Iglesia Carmen de Santidad"}
// ,{id:293,latitude:12.1468089,longitude:-86.1621201,descripcion:"UNA / Agraria"}
// ,{id:294,latitude:12.1395362,longitude:-86.2455709,descripcion:"Iglesia de Dios"}
// ,{id:295,latitude:12.1114835,longitude:-86.2296874,descripcion:"Parque Germán Pomares Ordóñez"}
// ,{id:296,latitude:12.1142469,longitude:-86.2170119,descripcion:"Milagro de Dios"}
// ,{id:297,latitude:12.113204,longitude:-86.2203143,descripcion:"Pulpería Mejía"}
// ,{id:298,latitude:12.1056684,longitude:-86.2306925,descripcion:"Terminal 169"}
// ,{id:299,latitude:12.1485953,longitude:-86.2005339,descripcion:"La Rocargo"}
// ,{id:300,latitude:12.1206564,longitude:-86.2621387,descripcion:"Ultranic"}
// ,{id:301,latitude:12.1263891,longitude:-86.2391134,descripcion:"Ferretería Jenny"}
// ,{id:302,latitude:12.0747126,longitude:-86.2177889,descripcion:"Palí"}
// ,{id:303,latitude:12.1170921,longitude:-86.2840636,descripcion:"Hospedaje San Francisco"}
// ,{id:304,latitude:12.1233079,longitude:-86.3079483,descripcion:"Contraloría General de la República"}
// ,{id:305,latitude:12.1252992,longitude:-86.2971674,descripcion:"El Zumen Oeste"}
// ,{id:306,latitude:12.1231279,longitude:-86.296961,descripcion:"Parque Independencia"}
// ,{id:307,latitude:12.1192639,longitude:-86.2834535,descripcion:"Farmacia El Valle"}
// ,{id:308,latitude:12.1478204,longitude:-86.2892938,descripcion:"Salud Integral"}
// ,{id:309,latitude:12.1306125,longitude:-86.2750825,descripcion:"Vivero"}
// ,{id:310,latitude:12.1270764,longitude:-86.3014034,descripcion:"Mercado Israel Lewites Oeste"}
// ,{id:311,latitude:12.1279692,longitude:-86.3013498,descripcion:"Mercado Israel Lewites Oeste"}
// ,{id:312,latitude:12.0997653,longitude:-86.3078412,descripcion:"La Cooperativa"}
// ,{id:313,latitude:12.1330928,longitude:-86.2929351,descripcion:"Libro Café Rosita"}
// ,{id:314,latitude:12.1414943,longitude:-86.2519422,descripcion:"Gimnasio Nicarao"}
// ,{id:315,latitude:12.0997346,longitude:-86.3077361,descripcion:"La Cooperativa"}
// ,{id:316,latitude:12.1316825,longitude:-86.2949278,descripcion:"Farmacia Asunción"}
// ,{id:317,latitude:12.1352933,longitude:-86.292961,descripcion:"Ferretería Avilés"}
// ,{id:318,latitude:12.1569464,longitude:-86.2821942,descripcion:"Santa Ana"}
// ,{id:319,latitude:12.1350502,longitude:-86.2441751,descripcion:"Video Club"}
// ,{id:320,latitude:12.1231988,longitude:-86.2092621,descripcion:"Madre de Dios Este"}
// ,{id:321,latitude:12.1574344,longitude:-86.2969299,descripcion:"Pulpería Doña Tere"}
// ,{id:322,latitude:12.1453369,longitude:-86.2738749,descripcion:"Plaza Inter"}
// ,{id:323,latitude:12.1569561,longitude:-86.2776975,descripcion:"Parque San Sebastián"}
// ,{id:324,latitude:12.1378977,longitude:-86.2925272,descripcion:"Panadería Levi"}
// ,{id:325,latitude:12.0988613,longitude:-86.2133405,descripcion:"Cementerio Las Jagüitas"}
// ,{id:326,latitude:12.1278491,longitude:-86.2953277,descripcion:"Alcaldía de Managua"}
// ,{id:327,latitude:12.1358921,longitude:-86.2173262,descripcion:"Arvizú Norte"}
// ,{id:328,latitude:12.1367672,longitude:-86.2916601,descripcion:"Galilea"}
// ,{id:329,latitude:12.1480426,longitude:-86.2920616,descripcion:"Farmacia Dayser"}
// ,{id:330,latitude:12.0929265,longitude:-86.3097094,descripcion:"Colegio Cristiano Restauración"}
// ,{id:331,latitude:12.1569099,longitude:-86.2323275,descripcion:"Barbería Charlie's"}
// ,{id:332,latitude:12.1276504,longitude:-86.2119791,descripcion:"Farmacia Sophya"}
// ,{id:333,latitude:12.1297164,longitude:-86.2017682,descripcion:"Entrada Norte a Laureles Norte"}
// ,{id:334,latitude:12.1242793,longitude:-86.2342146,descripcion:"Donde fue SERFOSA"}
// ,{id:335,latitude:12.09928925,longitude:-86.26072725,descripcion:"Club Terraza Sur"}
// ,{id:336,latitude:12.1261232,longitude:-86.2048215,descripcion:"Palí - Las Américas"}
// ,{id:337,latitude:12.1518852,longitude:-86.2589101,descripcion:"El Ceibón"}
// ,{id:338,latitude:12.0822094,longitude:-86.2604358,descripcion:"Cementerio San Isidro"}
// ,{id:339,latitude:12.1575167,longitude:-86.2867816,descripcion:"Palí Santa Ana"}
// ,{id:340,latitude:12.0879657,longitude:-86.2619648,descripcion:"Pallavicini"}
// ,{id:341,latitude:12.1023438,longitude:-86.26103795,descripcion:"Entrada a San Isidro"}
// ,{id:342,latitude:12.10544465,longitude:-86.25023415,descripcion:"Galerías Santo Domingo Norte"}
// ,{id:343,latitude:12.1421658,longitude:-86.2187158,descripcion:"Auto Lavado La Máquina"}
// ,{id:344,latitude:12.1421634,longitude:-86.2188018,descripcion:"Auto Lavado La Máquina"}
// ,{id:345,latitude:12.1472624,longitude:-86.2092876,descripcion:"Barrio Waspán"}
// ,{id:346,latitude:12.0992334,longitude:-86.2608784,descripcion:"Club Terraza Sur"}
// ,{id:347,latitude:12.1519138,longitude:-86.3486278,descripcion:"La primera casa"}
// ,{id:348,latitude:12.1488439,longitude:-86.2257852,descripcion:"Barrio Santa Rosa"}
// ,{id:349,latitude:12.0973701,longitude:-86.2973192,descripcion:"Villa Roma"}
// ,{id:350,latitude:12.1350357,longitude:-86.2393629,descripcion:"Pulpería Machado"}
// ,{id:351,latitude:12.11915245,longitude:-86.2057822,descripcion:"La Sabana"}
// ,{id:352,latitude:12.1483756514,longitude:-86.1996466493,descripcion:"La Rocargo"}
// ,{id:353,latitude:12.09653095,longitude:-86.3029489,descripcion:"La Parrilla"}
// ,{id:354,latitude:12.1562604,longitude:-86.3042514,descripcion:"Policía Distrito II"}
// ,{id:355,latitude:12.1130342,longitude:-86.1922217,descripcion:"Los Mangos"}
// ,{id:356,latitude:12.1129332,longitude:-86.1922326,descripcion:"Los Mangos"}
// ,{id:357,latitude:12.159754,longitude:-86.3501273,descripcion:"ALKE Ciudad Sandino"}
// ,{id:358,latitude:12.1089776,longitude:-86.2983854,descripcion:"Cooperativa de Panificadores"}
// ,{id:359,latitude:12.1525774,longitude:-86.248319,descripcion:"Ajax Delgado Sur"}
// ,{id:360,latitude:12.1511411,longitude:-86.2326542,descripcion:"Dirección General de Aduanas"}
// ,{id:361,latitude:12.1485708,longitude:-86.2031474,descripcion:"Entrada Barrio Hugo Chávez"}
// ,{id:362,latitude:12.1661477,longitude:-86.3616909,descripcion:"Iglesia San José"}
// ,{id:363,latitude:12.12490805,longitude:-86.2236701,descripcion:"Iglesia San José Obrero"}
// ,{id:364,latitude:12.0909139,longitude:-86.306952,descripcion:"La Vuelta"}
// ,{id:365,latitude:12.1492954,longitude:-86.2082342,descripcion:"Bomberos Barrio Waspán"}
// ,{id:366,latitude:12.10921075,longitude:-86.22364075,descripcion:"Tanque Rojo"}
// ,{id:367,latitude:12.1199051,longitude:-86.2319422,descripcion:"Tanque"}
// ,{id:368,latitude:12.1019706,longitude:-86.2940553,descripcion:"Grúas Hocri"}
// ,{id:369,latitude:12.0987815,longitude:-86.2910172,descripcion:"Cementerio Loma Linda"}
// ,{id:370,latitude:12.1269195,longitude:-86.1984141,descripcion:"Terminal Los Laureles Norte"}
// ,{id:371,latitude:12.1078986,longitude:-86.2870227,descripcion:"Terminal Memorial Sandino"}
// ,{id:372,latitude:12.1401777,longitude:-86.2678993,descripcion:"Mirador Tiscapa"}
// ,{id:373,latitude:12.1467716,longitude:-86.213892,descripcion:"Taller Conrado"}
// ,{id:374,latitude:12.086543,longitude:-86.1938692,descripcion:"Pulpería Nohelia"}
// ,{id:375,latitude:12.1132397,longitude:-86.2203138,descripcion:"Pulpería Mejía"}
// ,{id:376,latitude:12.147203,longitude:-86.2412875,descripcion:"San Luis Sur"}
// ,{id:377,latitude:12.1464026,longitude:-86.2640017,descripcion:"Terminal Vanegas"}
// ,{id:378,latitude:12.1465189,longitude:-86.2641305,descripcion:"Terminal Vanegas"}
// ,{id:379,latitude:12.1126971,longitude:-86.2637662,descripcion:"Claro Villa Fontana"}
// ,{id:380,latitude:12.1206853,longitude:-86.2213762,descripcion:"Iglesia Madre del Divino Amor"}
// ,{id:381,latitude:12.15492,longitude:-86.1949721,descripcion:"Café Soluble"}
// ,{id:382,latitude:12.1549403,longitude:-86.1947824,descripcion:"Café Soluble"}
// ,{id:383,latitude:12.1208148,longitude:-86.2353839,descripcion:"La Fuente"}
// ,{id:384,latitude:12.1069902,longitude:-86.1884019,descripcion:"Terminal Lomas de Guadalupe"}
// ,{id:385,latitude:12.1207817,longitude:-86.2214118,descripcion:"Iglesia Madre del Divino Amor"}
// ,{id:386,latitude:12.120683,longitude:-86.2355005,descripcion:"La Fuente"}
// ,{id:387,latitude:12.1654324,longitude:-86.3626847,descripcion:"La Palmera"}
// ,{id:388,latitude:12.09889425,longitude:-86.22709045,descripcion:"Terminal 165"}
// ,{id:389,latitude:12.1382351,longitude:-86.3045296,descripcion:"Aldea SOS"}
// ,{id:390,latitude:12.11698745,longitude:-86.19162355,descripcion:"Terminal 167"}
// ,{id:391,latitude:12.0753636,longitude:-86.229419,descripcion:"Casa España"}
// ,{id:392,latitude:12.1324622,longitude:-86.3138824,descripcion:"Las Piedrecitas"}
// ,{id:393,latitude:12.1664081,longitude:-86.3474123,descripcion:"Bomberos Ciudad Sandino"}
// ,{id:394,latitude:12.10081895,longitude:-86.2221835,descripcion:"Terminal 164"}
// ,{id:395,latitude:12.1280239,longitude:-86.2971943,descripcion:"Alcaldía de Managua"}
// ,{id:396,latitude:12.1589253,longitude:-86.3717996,descripcion:"Colegio Nueva Vida"}
// ,{id:397,latitude:12.1056418,longitude:-86.230698,descripcion:"Terminal 169"}
// ,{id:398,latitude:12.147168,longitude:-86.2823108,descripcion:"Semáforo CST"}
// ,{id:399,latitude:12.1258857,longitude:-86.2967679,descripcion:"INATEC"}
// ,{id:400,latitude:12.1290775,longitude:-86.2340031,descripcion:"Colonia Nicarao"}
// ,{id:401,latitude:12.1491424,longitude:-86.2954814,descripcion:"American Boutique"}
// ,{id:402,latitude:12.1498866,longitude:-86.2743748,descripcion:"Avenida Bolívar"}
// ,{id:403,latitude:12.1143523,longitude:-86.2321461,descripcion:"Pulpería Latina"}
// ,{id:404,latitude:12.1574575,longitude:-86.28678255,descripcion:"Palí Santa Ana"}
// ,{id:405,latitude:12.0968156,longitude:-86.2074966,descripcion:"Campo de béisbol Las Jagüitas"}
// ,{id:406,latitude:12.16579525,longitude:-86.3558075,descripcion:"Palí CIudad Sandino"}
// ,{id:407,latitude:12.126379,longitude:-86.2749418501,descripcion:"Barrio Argentina"}
// ,{id:408,latitude:12.1535747,longitude:-86.3492392,descripcion:"El Cruce de Reyes"}
// ,{id:409,latitude:12.0790152,longitude:-86.2567915,descripcion:"Terminal San Isidro"}
// ,{id:410,latitude:12.1315859,longitude:-86.21727775,descripcion:"El Contil"}
// ,{id:411,latitude:12.1023317,longitude:-86.2185805999,descripcion:"Parque Los Chilamates"}
// ,{id:412,latitude:12.1167555,longitude:-86.2966204999,descripcion:"El Ceibo"}
// ,{id:413,latitude:12.0983219,longitude:-86.2416236501,descripcion:"KM 8 Carretera Masaya / Primera entrada a Las Colinas"}
// ,{id:414,latitude:12.1209132501,longitude:-86.22511395,descripcion:"Primero de Mayo"}
// ,{id:415,latitude:12.1273278501,longitude:-86.2034053003,descripcion:"Predio Mayoreo"}
// ,{id:416,latitude:12.1296184501,longitude:-86.2973813501,descripcion:"Colegio Madre del Divino Pastor"}
// ,{id:417,latitude:12.12832715,longitude:-86.25146965,descripcion:"Colegio Luis Alfonso Velásquez"}
// ,{id:418,latitude:12.1372355,longitude:-86.2166797,descripcion:"Rafaela Herrera"}
// ,{id:419,latitude:12.1376818,longitude:-86.2166559,descripcion:"Rafaela Herrera"}
// ,{id:420,latitude:12.1593462,longitude:-86.1879581,descripcion:"Colegio Las Américas"}
// ,{id:421,latitude:12.1308274,longitude:-86.2614086,descripcion:"Plaza El Sol"}
// ,{id:422,latitude:12.1175347,longitude:-86.2500154,descripcion:"Centro Comercial Managua"}
// ,{id:423,latitude:12.128876,longitude:-86.2219243,descripcion:"Plaza La Sabana"}
// ,{id:424,latitude:12.1757566,longitude:-86.3587016,descripcion:"Iglesia Morava Ciudad Sandino"}
// ,{id:425,latitude:12.1757629,longitude:-86.3586004,descripcion:"Iglesia Morava Ciudad Sandino"}
// ,{id:426,latitude:12.1530176,longitude:-86.282687,descripcion:"Antiguo Estadio Nacional Norte"}
// ,{id:427,latitude:12.1516988,longitude:-86.3091274,descripcion:"Manuel Olivares"}
// ,{id:428,latitude:12.1227914,longitude:-86.2430506,descripcion:"Mercado Huembes Sureste"}
// ,{id:429,latitude:12.1388383001,longitude:-86.2465158999,descripcion:"Semáforo El Paraisito"}
// ,{id:430,latitude:12.1262267,longitude:-86.241175,descripcion:"Parque Don Bosco (Mercado Huembes)"}
// ,{id:431,latitude:12.1496143,longitude:-86.2883143,descripcion:"Taller Automotriz"}
// ,{id:432,latitude:12.07397925,longitude:-86.196801925,descripcion:"Colegio Pablo Antonio Cuadra"}
// ,{id:433,latitude:12.1256611,longitude:-86.2965466001,descripcion:"El Zumen Norte"}
// ,{id:434,latitude:12.13276585,longitude:-86.25255435,descripcion:"El Riguero"}
// ,{id:435,latitude:12.1441911501,longitude:-86.26692175,descripcion:"El Redentor"}
// ,{id:436,latitude:12.1441948503,longitude:-86.3045466756,descripcion:"El Seminario"}
// ,{id:437,latitude:12.1447540501,longitude:-86.3488659,descripcion:"El parque de Villa Soberana"}
// ,{id:438,latitude:12.1516904,longitude:-86.1862831,descripcion:"Cayetana Alberta"}
// ,{id:439,latitude:12.1026105,longitude:-86.2737374,descripcion:"Pulpería La Rojita"}
// ,{id:440,latitude:12.1024748,longitude:-86.2737619,descripcion:"Pulpería La Rojita"}
// ,{id:441,latitude:12.1470419,longitude:-86.2580418,descripcion:"Tienda Power 099"}
// ,{id:442,latitude:12.105589,longitude:-86.2723872,descripcion:"Entrada Miguel Bonilla"}
// ,{id:443,latitude:12.1758655,longitude:-86.3624354,descripcion:"Claro"}
// ,{id:444,latitude:12.19287,longitude:-86.3649024,descripcion:"Los Brasiles"}
// ,{id:445,latitude:12.1917607,longitude:-86.3686425,descripcion:"Los Brasiles Entrada"}
// ,{id:446,latitude:12.192769,longitude:-86.3647544,descripcion:"Los Brasiles"}
// ,{id:447,latitude:12.1918638,longitude:-86.3686364,descripcion:"Los Brasiles Entrada"}
// ,{id:448,latitude:12.1210556,longitude:-86.2312724,descripcion:"Iglesia Inmaculada Concepción"}
// ,{id:449,latitude:12.1519173,longitude:-86.257586,descripcion:"Vidriera"}
// ,{id:450,latitude:12.1530847,longitude:-86.2545077,descripcion:"Llantera Centroamericana"}
// ,{id:451,latitude:12.1296126,longitude:-86.2954226,descripcion:"Colegio Madre del Divino Pastor"}
// ,{id:452,latitude:12.1362928,longitude:-86.2583862,descripcion:"Clínica María Auxiliadora"}
// ,{id:453,latitude:12.1064261,longitude:-86.2978446,descripcion:"San Judas"}
// ,{id:454,latitude:12.1018909,longitude:-86.2917504,descripcion:"Camino a San Isidro de Bolas"}
// ,{id:455,latitude:12.1514905,longitude:-86.2240748,descripcion:"Universidad Central de Nicaragua"}
// ,{id:456,latitude:12.1424451,longitude:-86.2577282,descripcion:"El Cruce"}
// ,{id:457,latitude:12.1532056,longitude:-86.2740495,descripcion:"Cancillería"}
// ,{id:458,latitude:12.1308702,longitude:-86.2747835,descripcion:"Vivero"}
// ,{id:459,latitude:12.1572706,longitude:-86.2819083,descripcion:"Santa Ana"}
// ,{id:460,latitude:12.1524316,longitude:-86.2877626,descripcion:"Delicias del Volga"}
// ,{id:461,latitude:12.1580649,longitude:-86.2992548,descripcion:"Talleres Pellas"}
// ,{id:462,latitude:12.123483,longitude:-86.2092457,descripcion:"Madre de Dios Este"}
// ,{id:463,latitude:12.0905149,longitude:-86.1978495,descripcion:"Residencial Mayales"}
// ,{id:464,latitude:12.0905804,longitude:-86.1977974,descripcion:"Residencial Mayales"}
// ,{id:465,latitude:12.1350299,longitude:-86.2392922,descripcion:"Pulpería Machado"}
// ,{id:466,latitude:12.1607137,longitude:-86.3659328,descripcion:"Cancha de Nueva Vida"}
// ,{id:467,latitude:12.1325847,longitude:-86.2198611,descripcion:"C.D.I. Sol de Libertad"}
// ,{id:468,latitude:12.1569176,longitude:-86.2291481,descripcion:"Colegio Público Santa Clara"}
// ,{id:469,latitude:12.1576316,longitude:-86.2892268,descripcion:"Iglesia Santa Ana Norte"}
// ,{id:470,latitude:12.1502664,longitude:-86.2974894,descripcion:"Impresiones Universales"}
// ,{id:471,latitude:12.1454084,longitude:-86.2241472,descripcion:"La Unión Larreynaga"}
// ,{id:472,latitude:12.1451565,longitude:-86.2184214,descripcion:"Farmacia Jazmín"}
// ,{id:473,latitude:12.1237052,longitude:-86.3060698,descripcion:"Hospital Fernando Vélez Páiz"}
// ,{id:474,latitude:12.1422411,longitude:-86.2376928,descripcion:"Óptica Cristal"}
// ,{id:475,latitude:12.1417201,longitude:-86.2540433,descripcion:"Ciudad Jardín"}
// ,{id:476,latitude:12.1487868,longitude:-86.2025283,descripcion:"Entrada Barrio Hugo Chávez"}
// ,{id:477,latitude:12.1616145,longitude:-86.1882733,descripcion:"Cancha Benito Escobar"}
// ,{id:478,latitude:12.1290578,longitude:-86.2201517,descripcion:"Barrio Américas 1"}
// ,{id:479,latitude:12.1593533,longitude:-86.187888,descripcion:"Colegio Las Américas"}
// ,{id:480,latitude:12.1623868,longitude:-86.1891298,descripcion:"Villa José Benito Escobar"}
// ,{id:481,latitude:12.161627,longitude:-86.1882191,descripcion:"Cancha Benito Escobar"}
// ,{id:482,latitude:12.1593391,longitude:-86.1880282,descripcion:"Colegio Las Américas"}
// ,{id:483,latitude:12.15185,longitude:-86.2490896,descripcion:"Universidad de las Américas"}
// ,{id:484,latitude:12.1504636,longitude:-86.3455779,descripcion:"Pulpería Ebenezer"}
// ,{id:485,latitude:12.1090411,longitude:-86.2285695,descripcion:"Salomón Moreno"}
// ,{id:486,latitude:12.1509209,longitude:-86.2260083,descripcion:"Nabisco"}
// ,{id:487,latitude:12.19181225,longitude:-86.36863945,descripcion:"Los Brasiles Entrada"}
// ,{id:488,latitude:12.15264585,longitude:-86.258703,descripcion:"Llantera Vargas"}
// ,{id:489,latitude:12.15153385,longitude:-86.304557,descripcion:"Linda Vista Sur"}
// ,{id:490,latitude:12.117949,longitude:-86.2387155,descripcion:"Palí La Fuente"}
// ,{id:491,latitude:12.1119483,longitude:-86.231651,descripcion:"Pulpería Jonathan"}
// ,{id:492,latitude:12.17824855,longitude:-86.35825505,descripcion:"Zona 11 Norte"}
// ,{id:493,latitude:12.1519701,longitude:-86.2587437,descripcion:"El Calvario"}
// ,{id:494,latitude:12.0722229,longitude:-86.1975694,descripcion:"Terminal 262"}
// ,{id:495,latitude:12.15076735,longitude:-86.24940265,descripcion:"Uno Hospital Solidaridad"}
// ,{id:496,latitude:12.1388959,longitude:-86.30006105,descripcion:"INVUR"}
// ,{id:497,latitude:12.1034096,longitude:-86.23308115,descripcion:"Iglesia Adventista"}
// ,{id:498,latitude:12.1511591503,longitude:-86.2308756497,descripcion:"Iglesia Adventista Carretera Norte"}
// ,{id:499,latitude:12.140054,longitude:-86.2140808,descripcion:"Semáforos San Jacinto"}
// ,{id:500,latitude:12.1359503,longitude:-86.242016,descripcion:"Sastrería Estilo y La Moda"}
// ,{id:501,latitude:12.1327495,longitude:-86.2421555,descripcion:"Leche Agria 10 de Junio"}
// ,{id:502,latitude:12.1496428,longitude:-86.2119945,descripcion:"ESCASAN"}
// ,{id:503,latitude:12.137001,longitude:-86.2703328,descripcion:"Tiscapa Sur"}
// ,{id:504,latitude:12.1359322,longitude:-86.2460253,descripcion:"Farmacia Cáceres"}
// ,{id:505,latitude:12.1489036,longitude:-86.1577357,descripcion:"Zona Franca Las Mercedes"}
// ,{id:506,latitude:12.1121657,longitude:-86.1969483,descripcion:"Ferretería La Bendición"}
// ,{id:507,latitude:12.1117045,longitude:-86.234195,descripcion:"Germán Pomares"}
// ,{id:508,latitude:12.153062,longitude:-86.1991373,descripcion:"Colegio Camilo Zapata"}
// ,{id:509,latitude:12.1116664,longitude:-86.234288,descripcion:"Germán Pomares"}
// ,{id:510,latitude:12.114744,longitude:-86.2362448,descripcion:"Avenida Isidro Centeno López"}
// ,{id:511,latitude:12.13998625,longitude:-86.3476357,descripcion:"Terminal 125"}
// ,{id:512,latitude:12.1475934,longitude:-86.1938861,descripcion:"La Subasta"}
// ,{id:513,latitude:12.13688505,longitude:-86.2091717,descripcion:"Terminal 119"}
// ,{id:514,latitude:12.1351126,longitude:-86.1982629,descripcion:"Polanco"}
// ,{id:515,latitude:12.1098632,longitude:-86.2338869,descripcion:"Maderería"}
// ,{id:516,latitude:12.16884415,longitude:-86.36512595,descripcion:"Terminal 115"}
// ,{id:517,latitude:12.1468025,longitude:-86.1828545,descripcion:"El Anexo"}
// ,{id:518,latitude:12.1098672,longitude:-86.2338372,descripcion:"Maderería"}
// ,{id:519,latitude:12.1473625,longitude:-86.2642173,descripcion:"Terminal de Retorno 133"}
// ,{id:520,latitude:12.16338305,longitude:-86.36595895,descripcion:"Terminal 133"}
// ,{id:521,latitude:12.1585303,longitude:-86.293063,descripcion:"Pulpería La Providencia"}
// ,{id:522,latitude:12.10254265,longitude:-86.27374965,descripcion:"Pulpería La Rojita"}
// ,{id:523,latitude:12.1398265,longitude:-86.240294,descripcion:"El Recreo"}
// ,{id:524,latitude:12.1454413,longitude:-86.2645881,descripcion:"Pulpería Chu Chu"}
// ,{id:525,latitude:12.1358833,longitude:-86.24601465,descripcion:"Farmacia Cáceres"}
// ,{id:526,latitude:12.1440222,longitude:-86.2139542,descripcion:"Zona Franca Dasol"}
// ,{id:527,latitude:12.148156,longitude:-86.1987594,descripcion:"La Rocargo"}
// ,{id:528,latitude:12.1395677,longitude:-86.208643,descripcion:"Maxi Palí Larreynaga"}
// ,{id:529,latitude:12.1404663,longitude:-86.2132235,descripcion:"Pulpería Doña Fran"}
// ,{id:530,latitude:12.11786565,longitude:-86.23828925,descripcion:"Palí La Fuente"}
// ,{id:531,latitude:12.1552551,longitude:-86.18882155,descripcion:"Transagro"}
// ,{id:532,latitude:12.1481989,longitude:-86.2274584,descripcion:"Peluquería Leysi"}
// ,{id:533,latitude:12.13904965,longitude:-86.2566675,descripcion:"PMS Construcciones"}
// ,{id:534,latitude:12.15666835,longitude:-86.3705578,descripcion:"Terminal 113"}
// ,{id:535,latitude:12.1616332,longitude:-86.34696765,descripcion:"Toño Negro"}
// ,{id:536,latitude:12.1260483,longitude:-86.20486515,descripcion:"Palí - Las Américas"}
// ,{id:537,latitude:12.15357595,longitude:-86.30091565,descripcion:"Tortillería Alicia"}
// ,{id:538,latitude:12.1515081,longitude:-86.18917105,descripcion:"Palí Las Mercedes"}
// ,{id:539,latitude:12.1513892,longitude:-86.2312561,descripcion:"Iglesia Adventista Carretera Norte"}
// ,{id:540,latitude:12.1276871,longitude:-86.2149274,descripcion:"Semáforos Sandak"}
// ,{id:541,latitude:12.13218655,longitude:-86.340208,descripcion:"Puente Mostatepe"}
// ,{id:542,latitude:12.15512685,longitude:-86.2941572,descripcion:"Puente León"}
// ,{id:543,latitude:12.1550965,longitude:-86.21694485,descripcion:"Puente La Toña"}
// ,{id:544,latitude:12.15599995,longitude:-86.2222517,descripcion:"Puente La Primavera"}
// ,{id:545,latitude:12.12004265,longitude:-86.3142482,descripcion:"Puente Frawley"}
// ,{id:546,latitude:12.1401682,longitude:-86.246848,descripcion:"Puente El Paraisito"}
// ,{id:547,latitude:12.1230413,longitude:-86.3082028,descripcion:"Contraloría General de la República"}
// ,{id:548,latitude:12.0888252,longitude:-86.3094923,descripcion:"Terminal Camilo Ortega"}
// ,{id:549,latitude:12.13962235,longitude:-86.21099135,descripcion:"Puente San Jacinto"}
// ,{id:550,latitude:12.1286929,longitude:-86.2221958,descripcion:"Entrada Primero de Mayo"}
// ,{id:551,latitude:12.1412239,longitude:-86.3477268,descripcion:"Calle 12"}
// ,{id:552,latitude:12.1165549002,longitude:-86.2582438997,descripcion:"Colegio Teresiano"}
// ,{id:553,latitude:12.1371147,longitude:-86.2659591,descripcion:"Colegio Simón Bolívar"}
// ,{id:554,latitude:12.13427535,longitude:-86.23412205,descripcion:"Colegio San Rafael"}
// ,{id:555,latitude:12.15493015,longitude:-86.19487725,descripcion:"Café Soluble"}
// ,{id:556,latitude:12.1236608,longitude:-86.2136844,descripcion:"Colegio Villa Venezuela Sur"}
// ,{id:557,latitude:12.1590107,longitude:-86.3389349,descripcion:"Colgate - Palmolive"}
// ,{id:558,latitude:12.1649115,longitude:-86.3484997,descripcion:"Plaza Padre Miguel"}
// ,{id:559,latitude:12.1692684,longitude:-86.3432745,descripcion:"Entrada Ciudad Sandino"}
// ,{id:560,latitude:12.1385025,longitude:-86.2538242,descripcion:"Los Paisas"}
// ,{id:561,latitude:12.152572,longitude:-86.2621449,descripcion:"Pulpería San José"}
// ,{id:562,latitude:12.1327649,longitude:-86.2525094,descripcion:"El Riguero"}
// ,{id:563,latitude:12.1140289,longitude:-86.2388717,descripcion:"Sorbetería Córdoba"}
// ,{id:564,latitude:12.1350928,longitude:-86.2822976,descripcion:"Plaza España Norte"}
// ,{id:565,latitude:12.1592072,longitude:-86.2780385,descripcion:"San Sebastián"}
// ,{id:566,latitude:12.1438887,longitude:-86.2594812,descripcion:"Comercial Vega"}
// ,{id:567,latitude:12.1392637,longitude:-86.2091571,descripcion:"Maxi Palí Larreynaga"}
// ,{id:568,latitude:12.1363837,longitude:-86.2015581,descripcion:"Gerald Repuestos"}
// ,{id:569,latitude:12.1242358,longitude:-86.21554845,descripcion:"Colegio Villa Venezuela Oeste"}
// ,{id:570,latitude:12.1653053,longitude:-86.3626807,descripcion:"La Palmera"}
// ,{id:571,latitude:12.1628018,longitude:-86.3555096,descripcion:"Juzgados Ciudad Sandino"}
// ,{id:572,latitude:12.1653283,longitude:-86.3577935,descripcion:"Mercadito (Ciudad Sandino)"}
// ,{id:573,latitude:12.1666246,longitude:-86.3466762,descripcion:"San Benito"}
// ,{id:574,latitude:12.13278485,longitude:-86.24205055,descripcion:"Leche Agria 10 de Junio"}
// ,{id:575,latitude:12.1456223,longitude:-86.2496603,descripcion:"Uniformes Nicky"}
// ,{id:576,latitude:12.1487965,longitude:-86.3106453,descripcion:"Hospital Lenín Fonseca"}
// ,{id:577,latitude:12.1341975,longitude:-86.233962,descripcion:"Clínica Don Bosco"}
// ,{id:578,latitude:12.1360047,longitude:-86.23830395,descripcion:"Barrio Meneses"}
// ,{id:579,latitude:12.1311543,longitude:-86.233114,descripcion:"Sucursal Rubenia - DISSUR"}
// ,{id:580,latitude:12.150103,longitude:-86.297397,descripcion:"Farmacia Bravo"}
// ,{id:581,latitude:12.1433199,longitude:-86.2968666,descripcion:"Accesa"}
// ,{id:582,latitude:12.1483002,longitude:-86.2532429,descripcion:"Barrio Los Ángeles"}
// ,{id:583,latitude:12.1545552,longitude:-86.2689065,descripcion:"Cine Margot"}
// ,{id:584,latitude:12.1364118,longitude:-86.2011647,descripcion:"Autos Flores"}
// ,{id:585,latitude:12.1047087,longitude:-86.228711,descripcion:"Terminal Reparto Schick"}
// ,{id:586,latitude:12.1153965,longitude:-86.2026603,descripcion:"Villa Libertad"}
// ,{id:587,latitude:12.1458438,longitude:-86.1761416,descripcion:"Aduana"}
// ,{id:588,latitude:12.1280715,longitude:-86.2153897,descripcion:"Farmacia Anita"}
// ,{id:589,latitude:12.1170871,longitude:-86.1882348,descripcion:"Agencia Esso"}
// ,{id:590,latitude:12.1210258,longitude:-86.23130235,descripcion:"Iglesia Inmaculada Concepción"}
// ,{id:591,latitude:12.14224415,longitude:-86.2377464,descripcion:"Iglesia Carmen de Santidad"}
// ,{id:592,latitude:12.089222,longitude:-86.19547295,descripcion:"Iglesia Católica"}
// ,{id:593,latitude:12.1577487,longitude:-86.1499058,descripcion:"Terminal Primero de Mayo"}
// ,{id:594,latitude:12.1460791,longitude:-86.3048997,descripcion:"Universidad Paulo Freire"}
// ,{id:595,latitude:12.1694402,longitude:-86.35887265,descripcion:"Iglesia Las Puertas del Cielo"}
// ,{id:596,latitude:12.0992271,longitude:-86.2984719,descripcion:"Quinta Santa Martha"}
// ,{id:597,latitude:12.0979593,longitude:-86.2994105,descripcion:"Pulpería Telma"}
// ,{id:598,latitude:12.1014935,longitude:-86.298345,descripcion:"Pulpería Manuel"}
// ,{id:599,latitude:12.1129505,longitude:-86.2969105,descripcion:"Pulpería Esperanza"}
// ,{id:600,latitude:12.1264817,longitude:-86.2917794,descripcion:"Sporgym"}
// ,{id:601,latitude:12.1342662,longitude:-86.2890049,descripcion:"Repuestos Jarquín"}
// ,{id:602,latitude:12.1512955,longitude:-86.2238582,descripcion:"Sucursal Norte - DISSUR"}
// ,{id:603,latitude:12.11305955,longitude:-86.20352965,descripcion:"Terminal 116"}
// ,{id:604,latitude:12.1260649,longitude:-86.2882322,descripcion:"Julio Martínez"}
// ,{id:605,latitude:12.11490275,longitude:-86.28297035,descripcion:"Rosa de Saron"}
// ,{id:606,latitude:12.162427,longitude:-86.18912535,descripcion:"Villa José Benito Escobar"}
// ,{id:607,latitude:12.15522945,longitude:-86.1841284,descripcion:"Terminal 105"}
// ,{id:608,latitude:12.09054765,longitude:-86.19782345,descripcion:"Residencial Mayales"}
// ,{id:609,latitude:12.1241096,longitude:-86.1987941,descripcion:"Entrada Sur a Laureles Norte"}
// ,{id:610,latitude:12.14287905,longitude:-86.2098153,descripcion:"Pulpería Amanda"}
// ,{id:611,latitude:12.1241013,longitude:-86.1986899,descripcion:"Entrada Sur a Laureles Norte"}
// ,{id:612,latitude:12.1143176,longitude:-86.2935711,descripcion:"Escuela Melania Morales"}
// ,{id:613,latitude:12.1162506,longitude:-86.2939159,descripcion:"Entrada Barrio El Pilar"}
// ,{id:614,latitude:12.1375548,longitude:-86.2987853,descripcion:"Cemex 150 mts al Norte"}
// ,{id:615,latitude:12.1238922,longitude:-86.2936472,descripcion:"Barrio el Pilar"}
// ,{id:616,latitude:12.1124053,longitude:-86.2910494,descripcion:"Barrio Franciso de Asís"}
// ,{id:617,latitude:12.152277,longitude:-86.2549823,descripcion:"Casa de Empeño Prisa"}
// ,{id:618,latitude:12.1451919,longitude:-86.3001477,descripcion:"Reparto Miraflores"}
// ,{id:619,latitude:12.1492573,longitude:-86.2821316,descripcion:"Antiguo Estadio Nacional Sur"}
// ,{id:620,latitude:12.09405675,longitude:-86.24644795,descripcion:"Notre Dame"}
// ,{id:621,latitude:12.1177084,longitude:-86.1960253,descripcion:"Omar Téllez Sánchez"}
// ,{id:622,latitude:12.15425935,longitude:-86.3341285,descripcion:"Parada sin nombre"}
// ,{id:623,latitude:12.1384101,longitude:-86.2292258,descripcion:"Multicentro Sur"}
// ,{id:624,latitude:12.1255199,longitude:-86.2037873,descripcion:"Colegio San Ignacio de Loyola"}
// ,{id:625,latitude:12.1388206,longitude:-86.2324018,descripcion:"Bello Horizonte Sur"}
// ,{id:626,latitude:12.1512421,longitude:-86.2973488,descripcion:"Avenida de las Milicias"}
// ,{id:627,latitude:12.1169939,longitude:-86.1916932,descripcion:"Terminal 167"}
// ,{id:628,latitude:12.1483557,longitude:-86.2962752,descripcion:"Parque Mennen"}
// ,{id:629,latitude:12.1400876,longitude:-86.2333988,descripcion:"Boulevard Bello Horizonte"}
// ,{id:630,latitude:12.1391468,longitude:-86.2067987,descripcion:"Villa Fraternidad"}
// ,{id:631,latitude:12.140289,longitude:-86.2995763,descripcion:"UCEM"}
// ,{id:632,latitude:12.1266496,longitude:-86.311842,descripcion:"Donde era el Hospital Vélez Páiz"}
// ,{id:633,latitude:12.1482146,longitude:-86.23729775,descripcion:"Colonial Norte"}
// ,{id:634,latitude:12.12973005,longitude:-86.2278117,descripcion:"Colonia Rubenia"}
// ,{id:635,latitude:12.1400022,longitude:-86.21019295,descripcion:"Cafetín Coco"}
// ,{id:636,latitude:12.15975795,longitude:-86.28747745,descripcion:"Plantel Central"}
// ,{id:637,latitude:12.14554615,longitude:-86.2893616501,descripcion:"Budget"}
// ,{id:638,latitude:12.1309278,longitude:-86.26146925,descripcion:"Plaza El Sol"}
// ,{id:639,latitude:12.1296274,longitude:-86.2530834,descripcion:"Colonia Máximo Jerez"}
// ,{id:640,latitude:12.1571374,longitude:-86.2346039,descripcion:"Pulpería La Chontaleña"}
// ,{id:641,latitude:12.1325857,longitude:-86.21979145,descripcion:"C.D.I. Sol de Libertad"}
// ,{id:642,latitude:12.0989292,longitude:-86.2271179,descripcion:"Terminal 165"}
// ,{id:643,latitude:12.1540454,longitude:-86.226704,descripcion:"Barrio Selim Shible"}
// ,{id:644,latitude:12.153018,longitude:-86.2494429,descripcion:"Provinco"}
// ,{id:645,latitude:12.1418043,longitude:-86.2456354,descripcion:"Bar Neptuno"}
// ,{id:646,latitude:12.1716702,longitude:-86.358231,descripcion:"[Parada sin nombre]"}
// ,{id:647,latitude:12.08095205,longitude:-86.25980635,descripcion:"Mini Agencia Ponce"}
// ,{id:648,latitude:12.08550305,longitude:-86.26194785,descripcion:"Iglesia San Isidro"}
// ,{id:649,latitude:12.1567767,longitude:-86.2298635,descripcion:"Materiales de Construcción Santa Clara"}
// ,{id:650,latitude:12.149564,longitude:-86.3369112,descripcion:"Entrada a Bello Amanecer"}
// ,{id:651,latitude:12.1262718,longitude:-86.2989939,descripcion:"INATEC"}
// ,{id:652,latitude:12.1453802,longitude:-86.2536353,descripcion:"Semáforos de Ciudad Jardín"}
// ,{id:653,latitude:12.1554444,longitude:-86.2829864,descripcion:"UNO Santa Ana"}
// ,{id:654,latitude:12.1538282,longitude:-86.3325244,descripcion:"Ultramar"}
// ,{id:655,latitude:12.1557049,longitude:-86.2899182,descripcion:"Asados El Novillo"}
// ,{id:656,latitude:12.165573,longitude:-86.3570861,descripcion:"Alcaldía de Ciudad Sandino"}
// ,{id:657,latitude:12.1359412,longitude:-86.2418929,descripcion:"Sastrería Estilo y La Moda"}
// ,{id:658,latitude:12.1402755,longitude:-86.2413915,descripcion:"Pulpería Jireh"}
// ,{id:659,latitude:12.1407434,longitude:-86.2829349,descripcion:"Canal 2"}
// ,{id:660,latitude:12.1231746,longitude:-86.3080755501,descripcion:"Contraloría General de la República"}
// ,{id:661,latitude:12.1310282,longitude:-86.2615299,descripcion:"Plaza El Sol"}
// ,{id:662,latitude:12.1153396,longitude:-86.2328068,descripcion:"Vuelta II"}
// ,{id:663,latitude:12.0833596,longitude:-86.1919972,descripcion:"Iglesia Solo Cristo Salva"}
// ,{id:664,latitude:12.1484902,longitude:-86.2760521,descripcion:"INSS"}
// ,{id:665,latitude:12.1486651,longitude:-86.2783126,descripcion:"Comedor Getsemani"}
// ,{id:666,latitude:12.1409707,longitude:-86.2418915,descripcion:"Plaza El Edén"}
// ,{id:667,latitude:12.1366117,longitude:-86.3458065,descripcion:"Vuela Rey de Reyes"}
// ,{id:668,latitude:12.1362455,longitude:-86.2894713,descripcion:"Templo Mormón Altagracia"}
// ,{id:669,latitude:12.0967278,longitude:-86.207579,descripcion:"Campo de béisbol Las Jagüitas"}
// ,{id:670,latitude:12.1046022,longitude:-86.2476662,descripcion:"Galerías Santo Domingo Este"}
// ,{id:671,latitude:12.15264945,longitude:-86.2679955,descripcion:"Petronic"}
// ,{id:672,latitude:12.14173135,longitude:-86.19556755,descripcion:"Los Rieles"}
// ,{id:673,latitude:12.0696187,longitude:-86.20972395,descripcion:"Los Robles"}
// ,{id:674,latitude:12.1670835,longitude:-86.3595734,descripcion:"Los Masayas"}
// ,{id:675,latitude:12.1385409,longitude:-86.25381335,descripcion:"Los Paisas"}
// ,{id:676,latitude:12.138494,longitude:-86.3018705,descripcion:"Sitel"}
// ,{id:677,latitude:12.1567711,longitude:-86.2292923001,descripcion:"Colegio Público Santa Clara"}
// ,{id:678,latitude:12.1127205,longitude:-86.25718465,descripcion:"Lotería"}
// ,{id:679,latitude:12.10178005,longitude:-86.29168915,descripcion:"Camino a San Isidro de Bolas"}
// ,{id:680,latitude:12.1566246,longitude:-86.2294365,descripcion:"Colegio Público Santa Clara"}
// ,{id:681,latitude:12.106103,longitude:-86.3095152,descripcion:"Campo de Béisbol"}
// ,{id:682,latitude:12.1606624,longitude:-86.34841,descripcion:"5 de Julio"}
// ,{id:683,latitude:12.1607838,longitude:-86.3484723,descripcion:"5 de Julio"}
// ,{id:684,latitude:12.1459034,longitude:-86.2347273,descripcion:"Rotonda Bello Horizonte Oeste"}
// ,{id:685,latitude:12.114643,longitude:-86.2539701,descripcion:"El Quetzal"}
// ,{id:686,latitude:12.1325867,longitude:-86.2197218,descripcion:"C.D.I. Sol de Libertad"}
// ,{id:687,latitude:12.1215558,longitude:-86.2159214,descripcion:"Panadería San José"}
// ,{id:688,latitude:12.1393193,longitude:-86.293648,descripcion:"Agroalfa"}
// ,{id:689,latitude:12.1162329,longitude:-86.2167771,descripcion:"Panadería Maritza Lucía"}
// ,{id:690,latitude:12.1492696,longitude:-86.3488219,descripcion:"Los Cocos"}
// ,{id:691,latitude:12.1493612,longitude:-86.2130197,descripcion:"AGCO"}
// ,{id:692,latitude:12.1127932,longitude:-86.2034015,descripcion:"Leche Agria La Vaquerita"}
// ,{id:693,latitude:12.1136528,longitude:-86.2033264,descripcion:"Ferretería Klary"}
// ,{id:694,latitude:12.1123503,longitude:-86.2917368,descripcion:"Barrio Franciso de Asís"}
// ,{id:695,latitude:12.1029296,longitude:-86.2984645,descripcion:"Pulpería La Esquinita"}
// ,{id:696,latitude:12.1329838,longitude:-86.1995644,descripcion:"Semáforos Mayoreo"}
// ,{id:697,latitude:12.1417045,longitude:-86.195512,descripcion:"Los Rieles"}
// ,{id:698,latitude:12.1222376,longitude:-86.2959302,descripcion:"Avenida Roberto Vargas"}
// ,{id:699,latitude:12.1449302,longitude:-86.167356,descripcion:"INAC"}
// ,{id:700,latitude:12.0964248,longitude:-86.3028434,descripcion:"La Parrilla"}
// ,{id:701,latitude:12.1299884,longitude:-86.2904115,descripcion:"Colegio Benjamín Zeledón"}
// ,{id:702,latitude:12.1165925,longitude:-86.2965145,descripcion:"El Ceibo"}
// ,{id:703,latitude:12.1367854,longitude:-86.2874578,descripcion:"El Recreo"}
// ,{id:704,latitude:12.0986958,longitude:-86.3022526,descripcion:"Farmacia El Maestro"}
// ,{id:705,latitude:12.1093694,longitude:-86.2972945,descripcion:"Farmacia López Vargas"}
// ,{id:706,latitude:12.1401828,longitude:-86.2677088,descripcion:"Mirador Tiscapa"}
// ,{id:707,latitude:12.1061009,longitude:-86.2976686,descripcion:"Palí San Judas"}
// ,{id:708,latitude:12.1348479,longitude:-86.2822887,descripcion:"Plaza España Norte"}
// ,{id:709,latitude:12.1650754,longitude:-86.2941615,descripcion:"Terminal Huellas de Acahualinca"}
// ,{id:710,latitude:12.1424572,longitude:-86.2511905,descripcion:"Clínica Santamaría"}
// ,{id:711,latitude:12.125748,longitude:-86.2455431,descripcion:"Policía de Tránsito"}
// ,{id:712,latitude:12.1379424,longitude:-86.2390233,descripcion:"Mercado El Periférico"}
// ,{id:713,latitude:12.1390323,longitude:-86.2089538,descripcion:"Entrada Villa Fraternidad"}
// ,{id:714,latitude:12.1148809,longitude:-86.1971226,descripcion:"Pulpería La Bodeguita"}
// ,{id:715,latitude:12.152309,longitude:-86.2898576,descripcion:"Agrosa"}
// ,{id:716,latitude:12.1272342,longitude:-86.2093242,descripcion:"Colegio Inmaculada Concepción"}
// ,{id:717,latitude:12.1531006,longitude:-86.1854508,descripcion:"Modesto Armijo"}
// ,{id:718,latitude:12.1267478,longitude:-86.2064952,descripcion:"El Madroño"}
// ,{id:719,latitude:12.1417388,longitude:-86.220892,descripcion:"El Manguito"}
// ,{id:720,latitude:12.1472146,longitude:-86.2439925,descripcion:"Auto Servicios Pacheco"}
// ,{id:721,latitude:12.1417471,longitude:-86.2186669,descripcion:"Colonia Rubén Darío"}
// ,{id:722,latitude:12.1505434,longitude:-86.2461514,descripcion:"CECNA"}
// ,{id:723,latitude:12.1164776,longitude:-86.2829329,descripcion:"Hialeah"}
// ,{id:724,latitude:12.1446405,longitude:-86.2338052001,descripcion:"Rotonda Bello Horizonte Sur"}
// ,{id:725,latitude:12.0766092,longitude:-86.2221009,descripcion:"Plaza Once"}
// ,{id:726,latitude:12.1459872,longitude:-86.23467375,descripcion:"Rotonda Bello Horizonte Oeste"}
// ,{id:727,latitude:12.09010285,longitude:-86.2342010001,descripcion:"KM 9 Carretera Masaya / Tercera entrada a Santo Domingo"}
// ,{id:728,latitude:12.127005,longitude:-86.2821509999,descripcion:"Rotonda El Periodista"}
// ,{id:729,latitude:12.1342269,longitude:-86.2579184999,descripcion:"Rotonda Cristo Rey"}
// ,{id:730,latitude:12.152514,longitude:-86.1890208,descripcion:"Trigo Dorado"}
// ,{id:731,latitude:12.1034053,longitude:-86.2967608,descripcion:"Pulpería El Bulky"}
// ,{id:732,latitude:12.11064245,longitude:-86.2378754,descripcion:"Puesto Médico Buitrago"}
// ,{id:733,latitude:12.1665805,longitude:-86.36072175,descripcion:"Puente de la Zona#5"}
// ,{id:734,latitude:12.0960957,longitude:-86.3045783,descripcion:"Colegio La Hispanidad"}
// ,{id:735,latitude:12.1343914,longitude:-86.2891343,descripcion:"Tornos Fénix"}
// ,{id:736,latitude:12.1263945,longitude:-86.2919611,descripcion:"Semáforos Julio Martínez"}
// ,{id:737,latitude:12.1362178,longitude:-86.2861597,descripcion:"SINSA Bolonia"}
// ,{id:738,latitude:12.0981029,longitude:-86.299426,descripcion:"Pulpería Telma"}
// ,{id:739,latitude:12.1033657,longitude:-86.2968735,descripcion:"Pulpería El Bulky"}
// ,{id:740,latitude:12.1512267,longitude:-86.2972038,descripcion:"Avenida de las Milicias"}
// ,{id:741,latitude:12.1379559,longitude:-86.2901703,descripcion:"La Racachaca"}
// ,{id:742,latitude:12.1082097,longitude:-86.2506466997,descripcion:"Movistar"}
// ,{id:743,latitude:12.1532169,longitude:-86.18543585,descripcion:"Modesto Armijo"}
// ,{id:744,latitude:12.1393532,longitude:-86.2935141,descripcion:"Agroalfa"}
// ,{id:745,latitude:12.14029395,longitude:-86.29963895,descripcion:"UCEM"}
// ,{id:746,latitude:12.14694235,longitude:-86.1621267,descripcion:"UNA / Agraria"}
// ,{id:747,latitude:12.1260784,longitude:-86.2750375,descripcion:"ENEL Este"}
// ,{id:748,latitude:12.10685195,longitude:-86.2722107003,descripcion:"UNAN Oeste"}
// ,{id:749,latitude:12.1036558,longitude:-86.26946075,descripcion:"UNAN Sur"}
// ,{id:750,latitude:12.08205545,longitude:-86.2302529,descripcion:"UNICA Sur"}
// ,{id:751,latitude:12.1534099,longitude:-86.22422705,descripcion:"Disagro"}
// ,{id:752,latitude:12.1574192,longitude:-86.35242675,descripcion:"Dispensario Villa Soberana"}
// ,{id:753,latitude:12.15141145,longitude:-86.2369787,descripcion:"Distribuidora La Universal"}
// ,{id:754,latitude:12.1514674,longitude:-86.2359807,descripcion:"Best Brand Pacas"}
// ,{id:755,latitude:12.1047207,longitude:-86.2256711,descripcion:"Enrique de Ossó"}
// ,{id:756,latitude:12.1183805,longitude:-86.2392914,descripcion:"Sport Gym La Fuente"}
// ,{id:757,latitude:12.1166175,longitude:-86.2358434,descripcion:"Avenida Pochote"}
// ,{id:758,latitude:12.1015298503,longitude:-86.2445917489,descripcion:"Plaza Familiar"}
// ,{id:759,latitude:12.13497035,longitude:-86.28229315,descripcion:"Plaza España Norte"}
// ,{id:760,latitude:12.145435,longitude:-86.27380615,descripcion:"Plaza Inter"}
// ,{id:761,latitude:12.14019345,longitude:-86.2333113,descripcion:"Boulevard Bello Horizonte"}
// ,{id:762,latitude:12.11321075,longitude:-86.28673595,descripcion:"Bosques de Nejapa"}
// ,{id:763,latitude:12.1407099,longitude:-86.282787,descripcion:"Canal 2"}
// ,{id:764,latitude:12.1392621,longitude:-86.2582148,descripcion:"Colegio Público España"}
// ,{id:765,latitude:12.1488312,longitude:-86.208537,descripcion:"Gasolinera Barrio Waspán"}
// ,{id:766,latitude:12.144232,longitude:-86.2615905,descripcion:"Gancho de Camino"}
// ,{id:767,latitude:12.14228185,longitude:-86.3480951,descripcion:"Calle 10"}
// ,{id:768,latitude:12.16132795,longitude:-86.2936896,descripcion:"Huellas de Acahualinca"}
// ,{id:769,latitude:12.1391520502,longitude:-86.2056210001,descripcion:"Materiales de construcción Howard"}
// ,{id:770,latitude:12.1781757,longitude:-86.3581633,descripcion:"Zona 11 Norte"}
// ,{id:771,latitude:12.1783214,longitude:-86.3583468,descripcion:"Zona 11 Norte"}
// ,{id:772,latitude:12.1806916,longitude:-86.3560829,descripcion:"Ciudad Sandino Entrada Norte"}
// ,{id:773,latitude:12.1716821,longitude:-86.3581013,descripcion:"[Parada sin nombre]"}
// ,{id:774,latitude:12.1733825,longitude:-86.3582837,descripcion:"Zona 11 Sur"}
// ,{id:775,latitude:12.1733825,longitude:-86.3584662,descripcion:"Zona 11 Sur"}
// ,{id:776,latitude:12.1808065,longitude:-86.3562033,descripcion:"Ciudad Sandino Entrada Norte"}
// ,{id:777,latitude:12.1547958,longitude:-86.288729,descripcion:"Partido Camino Cristiano Nicaragüense"}
// ,{id:778,latitude:12.154588,longitude:-86.3121211,descripcion:"Las Brisas"}
// ,{id:779,latitude:12.14760245,longitude:-86.18767805,descripcion:"Entrada Unidad de Propósitos"}
// ,{id:780,latitude:12.1549113,longitude:-86.29980195,descripcion:"Instituto Gaspar García Laviana"}
// ,{id:781,latitude:12.11168545,longitude:-86.2342415,descripcion:"Germán Pomares"}
// ,{id:782,latitude:12.10436825,longitude:-86.22023825,descripcion:"Gimnasio Salomón Moreno"}
// ,{id:783,latitude:12.1512502,longitude:-86.2759654,descripcion:"Miscelánea Lorena"}
// ,{id:784,latitude:12.1233674,longitude:-86.1882109,descripcion:"Comercial Fernández"}
// ,{id:785,latitude:12.1454652,longitude:-86.2622486,descripcion:"Policía Distrito I Norte"}
// ,{id:786,latitude:12.112966,longitude:-86.3139975,descripcion:"Parque San Patricio"}
// ,{id:787,latitude:12.1254717,longitude:-86.2541078,descripcion:"Altamira"}
// ,{id:788,latitude:12.1477268,longitude:-86.1896122,descripcion:"Funeraria Aurora"}
// ,{id:789,latitude:12.1552443,longitude:-86.18876,descripcion:"Transagro"}
// ,{id:790,latitude:12.1495494,longitude:-86.3017793,descripcion:"Pulpería Enmanuel"}
// ,{id:791,latitude:12.1146238,longitude:-86.3004787,descripcion:"Pulpería Elena"}
// ,{id:792,latitude:12.1534863,longitude:-86.2573389,descripcion:"Planta Eléctrica"}
// ,{id:793,latitude:12.1573983,longitude:-86.2867835,descripcion:"Palí Santa Ana"}
// ,{id:794,latitude:12.1146147,longitude:-86.3003819,descripcion:"Pulpería Elena"}
// ,{id:795,latitude:12.1536993,longitude:-86.2295632,descripcion:"Agricons"}
// ,{id:796,latitude:12.1536101,longitude:-86.263265,descripcion:"Iglesia Santo Domingo"}
// ,{id:797,latitude:12.153706,longitude:-86.2669416,descripcion:"Instituto Loyola"}
// ,{id:798,latitude:12.1481812,longitude:-86.2654593,descripcion:"Barrio 19 de Julio"}
// ,{id:799,latitude:12.1522152,longitude:-86.2428961,descripcion:"SINSA Carretera Norte"}
// ,{id:800,latitude:12.1541382,longitude:-86.3363546,descripcion:"Cuesta El Plomo"}
// ,{id:801,latitude:12.0987082,longitude:-86.2297837,descripcion:"Saint Dominic School"}
// ,{id:802,latitude:12.1536446,longitude:-86.3326156,descripcion:"Tropigas"}
// ,{id:803,latitude:12.1532316,longitude:-86.2639309,descripcion:"Vuelta Casa de las Mangueras"}
// ,{id:804,latitude:12.1551602,longitude:-86.2850668,descripcion:"Metalúrgica Martínez"}
// ,{id:805,latitude:12.1505971,longitude:-86.2646833,descripcion:"El Novillo"}
// ,{id:806,latitude:12.1571403,longitude:-86.2428646,descripcion:"Pulpería Matilde"}
// ,{id:807,latitude:12.1650452,longitude:-86.3650301,descripcion:"Zona 6"}
// ,{id:808,latitude:12.1092094,longitude:-86.22356,descripcion:"Tanque Rojo"}
// ,{id:809,latitude:12.1593011,longitude:-86.2780464,descripcion:"San Sebastián"}
// ,{id:810,latitude:12.1441766,longitude:-86.2510199,descripcion:"Sala de Belleza Alma"}
// ,{id:811,latitude:12.1212587,longitude:-86.273975,descripcion:"Farmacia San Lorenzo"}
// ,{id:812,latitude:12.1255411,longitude:-86.2035432,descripcion:"Colegio San Ignacio de Loyola"}
// ,{id:813,latitude:12.1131208,longitude:-86.191042,descripcion:"Barrio Israel Gaelano"}
// ,{id:814,latitude:12.1138074,longitude:-86.1964764,descripcion:"Pulpería Coni"}
// ,{id:815,latitude:12.1239589,longitude:-86.1986442,descripcion:"Entrada Sur a Laureles Norte"}
// ,{id:816,latitude:12.1119572,longitude:-86.2719699,descripcion:"UNICIT"}
// ,{id:817,latitude:12.1157034,longitude:-86.1885619,descripcion:"Pulpería El Maná"}
// ,{id:818,latitude:12.1130913,longitude:-86.3140024,descripcion:"Parque San Patricio"}
// ,{id:819,latitude:12.1498397,longitude:-86.1870064,descripcion:"Abogacía Almendárez y Asociados"}
// ,{id:820,latitude:12.0770452,longitude:-86.1943496,descripcion:"Rótulo Clínica Nuevos Horizontes"}
// ,{id:821,latitude:12.1054254,longitude:-86.2237227,descripcion:"Salomón Moreno"}
// ,{id:822,latitude:12.0987758,longitude:-86.2134055,descripcion:"Cementerio Las Jagüitas"}
// ,{id:823,latitude:12.1046601,longitude:-86.2515552,descripcion:"Semáforos Galerías"}
// ,{id:824,latitude:12.1549122,longitude:-86.2748483,descripcion:"TELCOR"}
// ,{id:825,latitude:12.1340064,longitude:-86.2577932,descripcion:"Rotonda Cristo Rey"}
// ,{id:826,latitude:12.1390698,longitude:-86.2591768,descripcion:"Clínica Ma Auxiliadora"}
// ,{id:827,latitude:12.1443438,longitude:-86.2663773,descripcion:"Pollo El Granjero"}
// ,{id:828,latitude:12.1515125,longitude:-86.2796653,descripcion:"Pinturas Nubia Estrada"}
// ,{id:829,latitude:12.1526438,longitude:-86.2679445,descripcion:"Petronic"}
// ,{id:830,latitude:12.1550652,longitude:-86.2771431,descripcion:"San Sebastián"}
// ,{id:831,latitude:12.1311378,longitude:-86.2474817,descripcion:"Avenida Mártires"}
// ,{id:832,latitude:12.1495509,longitude:-86.2660755,descripcion:"El Novillo"}
// ,{id:833,latitude:12.1274807,longitude:-86.2097171,descripcion:"Colegio Inmaculada Concepción"}
// ,{id:834,latitude:12.134963,longitude:-86.2441898,descripcion:"Video Club"}
// ,{id:835,latitude:12.1183255,longitude:-86.2393597,descripcion:"Sport Gym La Fuente"}
// ,{id:836,latitude:12.1182593,longitude:-86.18903645,descripcion:"Los Laureles Sur"}
// ,{id:837,latitude:12.1292607,longitude:-86.19946985,descripcion:"Los Laureles Norte"}
// ,{id:838,latitude:12.12500045,longitude:-86.17339615,descripcion:"Los Cruces"}
// ,{id:839,latitude:12.1492547501,longitude:-86.34863205,descripcion:"Los Cocos"}
// ,{id:840,latitude:12.1928195,longitude:-86.3648284,descripcion:"Los Brasiles"}
// ,{id:841,latitude:12.1129837,longitude:-86.19222715,descripcion:"Los Mangos"}
// ,{id:842,latitude:12.1568805,longitude:-86.1988983,descripcion:"Terminal Barrio Camilo Chamorro"}
// ,{id:843,latitude:12.1461098,longitude:-86.2429639,descripcion:"Farmacia Luis"}
// ,{id:844,latitude:12.106814,longitude:-86.2967986,descripcion:"Colegio Rodolfo Rodríguez Alvarado"}
// ,{id:845,latitude:12.1016692,longitude:-86.2916279,descripcion:"Camino a San Isidro de Bolas"}
// ,{id:846,latitude:12.1092999,longitude:-86.2351344,descripcion:"Pino Uno"}
// ,{id:847,latitude:12.0947427,longitude:-86.3071321,descripcion:"Plazoleta Camilo Ortega"}
// ,{id:848,latitude:12.0944914,longitude:-86.3089398,descripcion:"Camilo Ortega 3"}
// ,{id:849,latitude:12.1506221,longitude:-86.2720579,descripcion:"Parque Luis Alfonso Velásquez"}
// ,{id:850,latitude:12.1399199,longitude:-86.2970758,descripcion:"Taller El Pelón"}
// ,{id:851,latitude:12.1581747,longitude:-86.3679616,descripcion:"Redes de Solidaridad"}
// ,{id:852,latitude:12.1603054,longitude:-86.3628414,descripcion:"Pulpería Romero"}
// ,{id:853,latitude:12.1653635,longitude:-86.3643865,descripcion:"Casa del Zinc"}
// ,{id:854,latitude:12.1566537,longitude:-86.3705277,descripcion:"Terminal 113"}
// ,{id:855,latitude:12.1661012,longitude:-86.3616667,descripcion:"Iglesia San José"}
// ,{id:856,latitude:12.1311665,longitude:-86.2478732,descripcion:"Avenida Mártires"}
// ,{id:857,latitude:12.1335199,longitude:-86.2650886,descripcion:"Costado El Sol"}
// ,{id:858,latitude:12.1524888,longitude:-86.3059974,descripcion:"Centro Comercial Linda Vista"}
// ,{id:859,latitude:12.152205,longitude:-86.3063796,descripcion:"Centro Comercial Linda Vista"}
// ,{id:860,latitude:12.1579572,longitude:-86.2999916,descripcion:"Talleres Pellas"}
// ,{id:861,latitude:12.1362488,longitude:-86.2508316,descripcion:"Semáforo El Dorado"}
// ,{id:862,latitude:12.09926485,longitude:-86.29848115,descripcion:"Quinta Santa Martha"}
// ,{id:863,latitude:12.1532771,longitude:-86.2545832333,descripcion:"Llantera Centroamericana"}
// ,{id:864,latitude:12.1296314,longitude:-86.2278405,descripcion:"Colonia Rubenia"}
// ,{id:865,latitude:12.1528516,longitude:-86.2514485,descripcion:"Antigua Aduana"}
// ,{id:866,latitude:12.1140221,longitude:-86.2388879,descripcion:"Pulpería Enri"}
// ,{id:867,latitude:12.1546795,longitude:-86.3039617,descripcion:"Francisco Morazán"}
// ,{id:868,latitude:12.1112021,longitude:-86.2166036,descripcion:"Agencia Z Gas"}
// ,{id:869,latitude:12.1091171,longitude:-86.2166301,descripcion:"Barber Shop"}
// ,{id:870,latitude:12.151711,longitude:-86.2491565,descripcion:"Universidad de las Américas"}
// ,{id:871,latitude:12.1288211,longitude:-86.2914258,descripcion:"El Recreo Sur"}
// ,{id:872,latitude:12.1088114,longitude:-86.2129677,descripcion:"Cementerio Milagro de Dios"}
// ,{id:873,latitude:12.0988784,longitude:-86.3022333,descripcion:"Farmacia El Maestro"}
// ,{id:874,latitude:12.1032868,longitude:-86.2217315,descripcion:"Pulpería El Alfarero"}
// ,{id:875,latitude:12.1454407,longitude:-86.2633627,descripcion:"El Panal"}
// ,{id:876,latitude:12.1349562,longitude:-86.194397,descripcion:"Mercado Mayoreo"}
// ,{id:877,latitude:12.1401591,longitude:-86.2470535,descripcion:"Puente El Paraisito"}
// ,{id:878,latitude:12.1506725,longitude:-86.2232622,descripcion:"Sucursal Norte - DISSUR"}
// ,{id:879,latitude:12.1518427,longitude:-86.2362831,descripcion:"Best Brand Pacas"}
// ,{id:880,latitude:12.143633,longitude:-86.2648405,descripcion:"Ministerio de Defensa"}
// ,{id:881,latitude:12.1119706,longitude:-86.2719054,descripcion:"UNICIT"}
// ,{id:882,latitude:12.1412343,longitude:-86.2152028,descripcion:"Miguel Gutiérrez"}
// ,{id:883,latitude:12.15226305,longitude:-86.2851169,descripcion:"Ministerio de Hacienda y Crédito Público"}
// ,{id:884,latitude:12.1498212503,longitude:-86.3165714,descripcion:"Cuesta El Plomo Sur"}
// ,{id:885,latitude:12.1503676,longitude:-86.2200954,descripcion:"La Danto"}
// ,{id:886,latitude:12.1557850667,longitude:-86.3381745002,descripcion:"Cuesta El Plomo Norte"}
// ,{id:887,latitude:12.14552605,longitude:-86.24964745,descripcion:"Uniformes Nicky"}
// ,{id:888,latitude:12.14595915,longitude:-86.3048184,descripcion:"Universidad Paulo Freire"}
// ,{id:889,latitude:12.1377672,longitude:-86.2987436,descripcion:"Batahola Sur"}
// ,{id:890,latitude:12.1688275,longitude:-86.3426136,descripcion:"Entrada Ciudad Sandino"}
// ,{id:891,latitude:12.1468898,longitude:-86.2819641,descripcion:"Gonper"}
// ,{id:892,latitude:12.0902938,longitude:-86.2341178,descripcion:"KM 9 Carretera Masaya / Tercera entrada a Santo Domingo"}
// ,{id:893,latitude:12.1549249,longitude:-86.2998576,descripcion:"Instituto Gaspar García Laviana"}
// ,{id:894,latitude:12.1547708,longitude:-86.2712543,descripcion:"Palacio Nacional"}
// ,{id:895,latitude:12.145255,longitude:-86.2302139,descripcion:"Raspados Loli Bello Horizonte"}
// ,{id:896,latitude:12.1440699,longitude:-86.2269014,descripcion:"Rancho Cubano"}
// ,{id:897,latitude:12.1508091,longitude:-86.248936,descripcion:"Bar La Rotondita"}
// ,{id:898,latitude:12.1488611,longitude:-86.2490939,descripcion:"INETER"}
// ,{id:899,latitude:12.1504333,longitude:-86.2439214,descripcion:"Farmacia Potenza"}
// ,{id:900,latitude:12.1507377,longitude:-86.2489323,descripcion:"Bar La Rotondita"}
// ,{id:901,latitude:12.1445117,longitude:-86.2682506,descripcion:"El Redentor 2"}
// ,{id:902,latitude:12.0946975,longitude:-86.30710145,descripcion:"Plazoleta Camilo Ortega"}
// ,{id:903,latitude:12.1512126,longitude:-86.2549667,descripcion:"Respuestos ALCO"}
// ,{id:904,latitude:12.1655656,longitude:-86.3490312332,descripcion:"Plaza Padre Miguel"}
// ,{id:905,latitude:12.1364949,longitude:-86.2429457,descripcion:"Casa Comunal"}
// ,{id:906,latitude:12.1508608,longitude:-86.2525897,descripcion:"Radio Libertad"}
// ,{id:907,latitude:12.1417728,longitude:-86.2956159,descripcion:"Uniplaza Guanacaste"}
// ,{id:908,latitude:12.1482155,longitude:-86.2937638,descripcion:"Ederli"}
// ,{id:909,latitude:12.1360855,longitude:-86.2417766,descripcion:"Asados Nora"}
// ,{id:910,latitude:12.14916025,longitude:-86.19421155,descripcion:"Bertha Díaz"}
// ,{id:911,latitude:12.13707455,longitude:-86.2444796,descripcion:"Billares Mario Piquete"}
// ,{id:912,latitude:12.1388914,longitude:-86.3476148,descripcion:"Blanca 2"}
// ,{id:913,latitude:12.1088253,longitude:-86.2848891,descripcion:"Segunda entrada a Colinas del Memorial Sandino"}
// ,{id:914,latitude:12.1207818,longitude:-86.2458525501,descripcion:"Hospital Manolo Morales"}
// ,{id:915,latitude:12.13410515,longitude:-86.23823905,descripcion:"Hospital Japonés"}
// ,{id:916,latitude:12.11752785,longitude:-86.25183005,descripcion:"Hospital Central"}
// ,{id:917,latitude:12.1170181501,longitude:-86.284236,descripcion:"Hospedaje San Francisco"}
// ,{id:918,latitude:12.1021673,longitude:-86.2184356,descripcion:"Parque Los Chilamates"}
// ,{id:919,latitude:12.0916777,longitude:-86.1994581,descripcion:"Iglesia de Dios de la Profecía Libre"}
// ,{id:920,latitude:12.1487824,longitude:-86.2257934,descripcion:"Barrio Santa Rosa"}
// ,{id:921,latitude:12.0683251,longitude:-86.2006478,descripcion:"Terminal Los Vanegas"}
// ,{id:922,latitude:12.0973114,longitude:-86.29729645,descripcion:"Villa Roma"}
// ,{id:923,latitude:12.126917,longitude:-86.198383,descripcion:"Terminal Los Laureles Norte"}
// ,{id:924,latitude:12.1561076,longitude:-86.3382434,descripcion:"Cuesta El Plomo Norte"}
// ,{id:925,latitude:12.1495981,longitude:-86.336493,descripcion:"Chilamate"}
// ,{id:926,latitude:12.1490906,longitude:-86.2815705,descripcion:"El Bóer"}
// ,{id:927,latitude:12.1487852,longitude:-86.2783206,descripcion:"Comedor Getsemani"}
// ,{id:928,latitude:12.073768,longitude:-86.1967658,descripcion:"Colegio Pablo Antonio Cuadra"}
// ,{id:929,latitude:12.1079511,longitude:-86.2869961,descripcion:"Terminal Memorial Sandino"}
// ,{id:930,latitude:12.10474705,longitude:-86.2287105,descripcion:"Terminal Reparto Schick"}
// ,{id:931,latitude:12.1047974,longitude:-86.24760785,descripcion:"Galerías Santo Domingo Este"}
// ,{id:932,latitude:12.1453373,longitude:-86.2895063,descripcion:"Budget"}
// ,{id:933,latitude:12.1298183,longitude:-86.3002716,descripcion:"Bomberos Altagracia (Distrito III)"}
// ,{id:934,latitude:12.14888085,longitude:-86.2084912,descripcion:"Gasolinera Barrio Waspán"}
// ,{id:935,latitude:12.1440843,longitude:-86.2919118,descripcion:"Banpro"}
// ,{id:936,latitude:12.1143962,longitude:-86.2029328,descripcion:"Villa Libertad"}
// ,{id:937,latitude:12.1268966,longitude:-86.2973211,descripcion:"Ferretería El Progreso"}
// ,{id:938,latitude:12.1496688,longitude:-86.336259,descripcion:"Chilamate"}
// ,{id:939,latitude:12.1296906,longitude:-86.3001944,descripcion:"Bomberos Altagracia (Distrito III)"}
// ,{id:940,latitude:12.1082435,longitude:-86.3112038,descripcion:"Barrio Germán Pomares"}
// ,{id:941,latitude:12.1310482,longitude:-86.2937445,descripcion:"Farmacia Buendía"}
// ,{id:942,latitude:12.1383618,longitude:-86.2292408,descripcion:"Multicentro Sur"}
// ,{id:943,latitude:12.1496603,longitude:-86.2663735,descripcion:"Sector Este Dupla Sur"}
// ,{id:944,latitude:12.1344474,longitude:-86.2580438,descripcion:"Rotonda Cristo Rey"}
// ,{id:945,latitude:12.1045574,longitude:-86.2230228,descripcion:"Escuela Filemón Rivero Quintero"}
// ,{id:946,latitude:12.1007665,longitude:-86.222182,descripcion:"Terminal 164"}
// ,{id:947,latitude:12.0848836,longitude:-86.2292748,descripcion:"Bosques de Santa María"}
// ,{id:948,latitude:12.1034878,longitude:-86.2506068,descripcion:"Hossana"}
// ,{id:949,latitude:12.112132,longitude:-86.30074,descripcion:"Terminal San Judas"}
// ,{id:950,latitude:12.1170324,longitude:-86.297578,descripcion:"Iglesia San Judas Tadeo"}
// ,{id:951,latitude:12.1413245,longitude:-86.2252652,descripcion:"Rotonda La Virgen"}
// ,{id:952,latitude:12.153885,longitude:-86.2269623,descripcion:"Barrio Selim Shible"}
// ,{id:953,latitude:12.1121195,longitude:-86.3006409,descripcion:"Terminal San Judas"}
// ,{id:954,latitude:12.1524901,longitude:-86.2460855,descripcion:"Súper de los Militares"}
// ,{id:955,latitude:12.1578406,longitude:-86.3042372,descripcion:"Leche Agria"}
// ,{id:956,latitude:12.1288195,longitude:-86.281191,descripcion:"Edificios El Centro"}
// ,{id:957,latitude:12.1378622,longitude:-86.2185694,descripcion:"UPOLI Este"}
// ,{id:958,latitude:12.1634182,longitude:-86.3659578,descripcion:"Terminal 133"}
// ,{id:959,latitude:12.1633479,longitude:-86.3659601,descripcion:"Terminal 133"}
// ,{id:960,latitude:12.1038333,longitude:-86.2213375,descripcion:"La Comunal"}
// ,{id:961,latitude:12.1038025,longitude:-86.221434,descripcion:"La Comunal"}
// ,{id:962,latitude:12.1465138,longitude:-86.2658608,descripcion:"Distribuidora Suramy"}
// ,{id:963,latitude:12.1087977,longitude:-86.2839356,descripcion:"Entrada principal a Colinas del Memorial Sandino"}
// ,{id:964,latitude:12.1023333,longitude:-86.2611345,descripcion:"Entrada a San Isidro"}
// ,{id:965,latitude:12.0822435,longitude:-86.2602722,descripcion:"Cementerio San Isidro"}
// ,{id:966,latitude:12.148664,longitude:-86.2146002,descripcion:"Pollo Estrella"}
// ,{id:967,latitude:12.0821753,longitude:-86.2605994,descripcion:"Cementerio San Isidro"}
// ,{id:968,latitude:12.1169442,longitude:-86.2844084,descripcion:"Hospedaje San Francisco"}
// ,{id:969,latitude:12.1561762,longitude:-86.2133385,descripcion:"Cervecería Toña"}
// ,{id:970,latitude:12.1557842,longitude:-86.2275535,descripcion:"Santa Clara"}
// ,{id:971,latitude:12.1568226,longitude:-86.2323292,descripcion:"Barbería Charlie's"}
// ,{id:972,latitude:12.1475424,longitude:-86.2975077,descripcion:"Hospital Dermatológico"}
// ,{id:973,latitude:12.1438483,longitude:-86.2588428,descripcion:"La Monalisa"}
// ,{id:974,latitude:12.1132222,longitude:-86.2868324,descripcion:"Bosques de Nejapa"}
// ,{id:975,latitude:12.0791889,longitude:-86.2578064,descripcion:"Pulpería Marina"}
// ,{id:976,latitude:12.0792547,longitude:-86.2577482,descripcion:"Pulpería Marina"}
// ,{id:977,latitude:12.0832787,longitude:-86.2607115,descripcion:"Pulpería Nidia"}
// ,{id:978,latitude:12.0799799,longitude:-86.2584686,descripcion:"Entrada al Campo Deportivo"}
// ,{id:979,latitude:12.0851557,longitude:-86.2611699,descripcion:"Centro de Salud"}
// ,{id:980,latitude:12.1149051,longitude:-86.2829281,descripcion:"Rosa de Saron"}
// ,{id:981,latitude:12.0934457,longitude:-86.2625098,descripcion:"Entrada a Los Vanegas"}
// ,{id:982,latitude:12.1292219,longitude:-86.1994825,descripcion:"Los Laureles Norte"}
// ,{id:983,latitude:12.1347425,longitude:-86.2119024,descripcion:"El Puente 9 de Junio"}
// ,{id:984,latitude:12.1428704,longitude:-86.2097541,descripcion:"Pulpería Amanda"}
// ,{id:985,latitude:12.1399944,longitude:-86.2101427,descripcion:"Cafetín Coco"}
// ,{id:986,latitude:12.1343805,longitude:-86.2146033,descripcion:"Villa 9 de Junio"}
// ,{id:987,latitude:12.0790582,longitude:-86.256787,descripcion:"Terminal San Isidro"}
// ,{id:988,latitude:12.1192067,longitude:-86.2057731,descripcion:"La Sabana"}
// ,{id:989,latitude:12.1102962,longitude:-86.1970362,descripcion:"Escuela la Libertad"}
// ,{id:990,latitude:12.1132353,longitude:-86.2011451,descripcion:"Villa Libertad Interior"}
// ,{id:991,latitude:12.1228965,longitude:-86.2315928,descripcion:"4 de Septiembre"}
// ,{id:992,latitude:12.1190982,longitude:-86.2057913,descripcion:"La Sabana"}
// ,{id:993,latitude:12.1103057,longitude:-86.1970571,descripcion:"Escuela la Libertad"}
// ,{id:994,latitude:12.1233409,longitude:-86.2092539,descripcion:"Madre de Dios Este"}
// ,{id:995,latitude:12.13601095,longitude:-86.27690455,descripcion:"Mabale"}
// ,{id:996,latitude:12.14414275,longitude:-86.2673165,descripcion:"Comedor Hossana"}
// ,{id:997,latitude:12.1165241,longitude:-86.2828583,descripcion:"Hialeah"}
// ,{id:998,latitude:12.1384094,longitude:-86.2239746,descripcion:"RUPAP"}
// ,{id:999,latitude:12.1249391,longitude:-86.1733702,descripcion:"Los Cruces"}
// ,{id:1000,latitude:12.1243965,longitude:-86.2185879,descripcion:"Iglesia Mormona"}
// ,{id:1001,latitude:12.1170326,longitude:-86.1998475,descripcion:"Villa Libertad"}
// ,{id:1002,latitude:12.1289846,longitude:-86.2447727,descripcion:"Escuela de Manejo"}
// ,{id:1003,latitude:12.1242723,longitude:-86.2211264,descripcion:"Farmacia Mery"}
// ,{id:1004,latitude:12.1242428,longitude:-86.2210244,descripcion:"Farmacia Mery"}
// ,{id:1005,latitude:12.120996,longitude:-86.2313323,descripcion:"Iglesia Inmaculada Concepción"}
// ,{id:1006,latitude:12.1232233,longitude:-86.2105414,descripcion:"Farmacia Villa Venezuela"}
// ,{id:1007,latitude:12.1459028,longitude:-86.2893455,descripcion:"Las Palmas"}
// ,{id:1008,latitude:12.1207552,longitude:-86.2218005,descripcion:"Iglesia Madre del Divino Amor"}
// ,{id:1009,latitude:12.1458234,longitude:-86.2821416,descripcion:"27 De Mayo"}
// ,{id:1010,latitude:12.1662432,longitude:-86.3546053,descripcion:"Iglesia San Francisco"}
// ,{id:1011,latitude:12.145504,longitude:-86.2790944,descripcion:"Antiguo Cine Cabrera"}
// ,{id:1012,latitude:12.1431798,longitude:-86.2922902,descripcion:"Maquipos"}
// ,{id:1013,latitude:12.1591015,longitude:-86.3641652,descripcion:"Pulpería Duarte"}
// ,{id:1014,latitude:12.1586538,longitude:-86.3718217,descripcion:"Colegio Nueva Vida"}
// ,{id:1015,latitude:12.1162653,longitude:-86.2729664,descripcion:"Radio Universidad"}
// ,{id:1016,latitude:12.1656372,longitude:-86.3575003,descripcion:"Alcaldía de Ciudad Sandino"}
// ,{id:1017,latitude:12.0742408,longitude:-86.2200525,descripcion:"Embajada de Guatemala"}
// ,{id:1018,latitude:12.1491587,longitude:-86.1942752,descripcion:"Bertha Díaz"}
// ,{id:1019,latitude:12.16533695,longitude:-86.3577541,descripcion:"Mercadito de Ciudad Sandino"}
// ,{id:1020,latitude:12.1233215503,longitude:-86.2426643508,descripcion:"Mercado Huembes Sureste"}
// ,{id:1021,latitude:12.1287664,longitude:-86.15951,descripcion:"Ciudad Belén"}
// ,{id:1022,latitude:12.1266796,longitude:-86.2748462,descripcion:"Palí"}
// ,{id:1023,latitude:12.1275228,longitude:-86.3013766,descripcion:"Mercado Israel Lewites Oeste"}
// ,{id:1024,latitude:12.1290072,longitude:-86.1594098,descripcion:"Ciudad Belén"}
// ,{id:1025,latitude:12.1738428,longitude:-86.3640726,descripcion:"Barrio 4 de Abril"}
// ,{id:1026,latitude:12.1462466,longitude:-86.2458352,descripcion:"Taller Joe"}
// ,{id:1027,latitude:12.0835915,longitude:-86.2320253,descripcion:"UNICA Oeste"}
// ,{id:1028,latitude:12.1536263,longitude:-86.3061664,descripcion:"Inmaculada Concepción"}
// ,{id:1029,latitude:12.1464726,longitude:-86.2378891,descripcion:"El Colonial"}
// ,{id:1030,latitude:12.146071,longitude:-86.2346202,descripcion:"Rotonda Bello Horizonte Oeste"}
// ,{id:1031,latitude:12.1263697,longitude:-86.241792,descripcion:"Parque Don Bosco (Mercado Huembes)"}
// ,{id:1032,latitude:12.1464885,longitude:-86.2467561,descripcion:"Mataburros Pancasán"}
// ,{id:1033,latitude:12.1559049,longitude:-86.3129332,descripcion:"Segunda Calle"}
// ,{id:1034,latitude:12.0903421,longitude:-86.2450066,descripcion:"Las Calderas"}
// ,{id:1035,latitude:12.15055485,longitude:-86.34557185,descripcion:"Pulpería Ebenezer"}
// ,{id:1036,latitude:12.1269145,longitude:-86.1983519,descripcion:"Terminal Los Laureles Norte"}
// ,{id:1037,latitude:12.1183201,longitude:-86.2937174,descripcion:"Super Boutique"}
// ,{id:1038,latitude:12.1080036,longitude:-86.2869695,descripcion:"Terminal Memorial Sandino"}
// ,{id:1039,latitude:12.1206302,longitude:-86.2943339,descripcion:"Pulpería Wendy"}
// ,{id:1040,latitude:12.1386592,longitude:-86.3019102,descripcion:"Sitel"}
// ,{id:1041,latitude:12.1087695,longitude:-86.2871802,descripcion:"Memorial Sandino Norte"}
// ,{id:1042,latitude:12.1091079,longitude:-86.290993,descripcion:"Pozo Enacal"}
// ,{id:1043,latitude:12.1392016,longitude:-86.2052799,descripcion:"Materiales de construcción Howard"}
// ,{id:1044,latitude:12.1450075,longitude:-86.2993525,descripcion:"Taller Murillo"}
// ,{id:1045,latitude:12.1404197,longitude:-86.2143278,descripcion:"Semáforos San Jacinto"}
// ,{id:1046,latitude:12.12726185,longitude:-86.26575125,descripcion:"Metrocentro"}
// ,{id:1047,latitude:12.1518557,longitude:-86.2402509,descripcion:"Compañía Recicladora"}
// ,{id:1048,latitude:12.1576779,longitude:-86.29219685,descripcion:"Mercado Oriental II"}
// ,{id:1049,latitude:12.15191395,longitude:-86.25870895,descripcion:"El Calvario"}
// ,{id:1050,latitude:12.1520775,longitude:-86.2427903,descripcion:"Calbri Internacional"}
// ,{id:1051,latitude:12.10188085,longitude:-86.24998615,descripcion:"El Barrio"}
// ,{id:1052,latitude:12.12270975,longitude:-86.2316983501,descripcion:"4 de Septiembre"}
// ,{id:1053,latitude:12.1414,longitude:-86.2152835999,descripcion:"Miguel Gutiérrez"}
// ,{id:1054,latitude:12.1456917,longitude:-86.237454,descripcion:"Parque Maestro Gabriel"}
// ,{id:1055,latitude:12.1379372504,longitude:-86.2906406,descripcion:"La Racachaca"}
// ,{id:1056,latitude:12.1383655,longitude:-86.22397145,descripcion:"RUPAP"}
// ,{id:1057,latitude:12.1165597,longitude:-86.2730964499,descripcion:"Radio Universidad"}
// ,{id:1058,latitude:12.13745865,longitude:-86.2166678,descripcion:"Rafaela Herrera"}
// ,{id:1059,latitude:12.15825495,longitude:-86.3679849,descripcion:"Redes de Solidaridad"}
// ,{id:1060,latitude:12.1122822,longitude:-86.22478625,descripcion:"René Polanco"}
// ,{id:1061,latitude:12.0855008,longitude:-86.2620221,descripcion:"Iglesia San Isidro"}
// ,{id:1062,latitude:12.0855053,longitude:-86.2618736,descripcion:"Iglesia San Isidro"}
// ,{id:1063,latitude:12.0809308,longitude:-86.2598078,descripcion:"Mini Agencia Ponce"}
// ,{id:1064,latitude:12.1423338,longitude:-86.3479622,descripcion:"Calle 10"}
// ,{id:1065,latitude:12.1422299,longitude:-86.348228,descripcion:"Calle 10"}
// ,{id:1066,latitude:12.1548977,longitude:-86.2997463,descripcion:"Instituto Gaspar García Laviana"}
// ,{id:1067,latitude:12.1388927,longitude:-86.3476967,descripcion:"Blanca 2"}
// ,{id:1068,latitude:12.1578704,longitude:-86.2996053,descripcion:"Talleres Pellas"}
// ,{id:1069,latitude:12.1027409,longitude:-86.3082528499,descripcion:"Pre-escolar Hossana"}
// ,{id:1070,latitude:12.1091124,longitude:-86.291023,descripcion:"Pozo Enacal"}
// ,{id:1071,latitude:12.1467544,longitude:-86.19522955,descripcion:"Policía Distrito VI"}
// ,{id:1072,latitude:12.1283328,longitude:-86.2515315,descripcion:"Colegio Luis Alfonso Velásquez"}
// ,{id:1073,latitude:12.1026377502,longitude:-86.2659934001,descripcion:"Porta"}
// ,{id:1074,latitude:12.1516717,longitude:-86.1862362,descripcion:"Cayetana Alberta"}
// ,{id:1075,latitude:12.15983125,longitude:-86.36675905,descripcion:"Cauce"}
// ,{id:1076,latitude:12.1525356,longitude:-86.29119925,descripcion:"Cementerio Central"}
// ,{id:1077,latitude:12.1343524,longitude:-86.2995385,descripcion:"Parque Héroes y Mártires"}
// ,{id:1078,latitude:12.1476031,longitude:-86.3428587,descripcion:"El Puente"}
// ,{id:1079,latitude:12.1399915,longitude:-86.3477646,descripcion:"Terminal 125"}
// ,{id:1080,latitude:12.139981,longitude:-86.3475068,descripcion:"Terminal 125"}
// ,{id:1081,latitude:12.1322889,longitude:-86.3402134,descripcion:"Puente Motastepe"}
// ,{id:1082,latitude:12.0722164,longitude:-86.1974553,descripcion:"Terminal 262"}
// ,{id:1083,latitude:12.0865511,longitude:-86.1938238,descripcion:"Pulpería Nohelia"}
// ,{id:1084,latitude:12.1364804,longitude:-86.3460428,descripcion:"Vuela Rey de Reyes"}
// ,{id:1085,latitude:12.11182035,longitude:-86.20863455,descripcion:"Terminal 195"}
// ,{id:1086,latitude:12.1226672,longitude:-86.1657124,descripcion:"Centro Escolar Benito Pitito"}
// ,{id:1087,latitude:12.1167701,longitude:-86.1969518,descripcion:"Laureles Sur"}
// ,{id:1088,latitude:12.07221965,longitude:-86.19751235,descripcion:"Terminal 262"}
// ,{id:1089,latitude:12.1404057,longitude:-86.2596442,descripcion:"Disco Bar Santo Domingo"}
// ,{id:1090,latitude:12.1453717007,longitude:-86.1707655001,descripcion:"Aeropuerto"}
// ,{id:1091,latitude:12.1241454,longitude:-86.2834581,descripcion:"Universidad del Valle"}
// ,{id:1092,latitude:12.11659515,longitude:-86.2358845,descripcion:"Avenida Pochote"}
// ,{id:1093,latitude:12.1395809,longitude:-86.1961737,descripcion:"Concepción de María"}
// ,{id:1094,latitude:12.11119985,longitude:-86.21658285,descripcion:"Agencia Z Gas"}
// ,{id:1095,latitude:12.15983935,longitude:-86.2906745,descripcion:"Acahualinca Este"}
// ,{id:1096,latitude:12.1324436,longitude:-86.23534,descripcion:"Farmacia Vicky"}
// ,{id:1097,latitude:12.1597997,longitude:-86.35015175,descripcion:"ALKE Ciudad Sandino"}
// ,{id:1098,latitude:12.1554466502,longitude:-86.2913994,descripcion:"ALKE"}
// ,{id:1099,latitude:12.11030095,longitude:-86.19704665,descripcion:"Escuela la Libertad"}
// ,{id:1100,latitude:12.1091006,longitude:-86.22760705,descripcion:"Escuela Adventista"}
// ,{id:1101,latitude:12.0717183,longitude:-86.2177103,descripcion:"Km 12 Carretera a Masaya"}
// ,{id:1102,latitude:12.1479449,longitude:-86.2410202,descripcion:"Barrio Costa Rica"}
// ,{id:1103,latitude:12.1169185,longitude:-86.2967265,descripcion:"El Ceibo"}
// ,{id:1104,latitude:12.1560941,longitude:-86.2364556,descripcion:"Incnik Raya"}
// ,{id:1105,latitude:12.1488409,longitude:-86.2924511,descripcion:"Casino Atlantic City"}
// ,{id:1106,latitude:12.1524117,longitude:-86.2384819,descripcion:"IMISA"}
// ,{id:1107,latitude:12.1514258,longitude:-86.3044898,descripcion:"Linda Vista Sur"}
// ,{id:1108,latitude:12.1552522,longitude:-86.2896994,descripcion:"Asados El Novillo"}
// ,{id:1109,latitude:12.1551903,longitude:-86.2968792,descripcion:"Paraisito"}
// ,{id:1110,latitude:12.1531163,longitude:-86.2919909,descripcion:"Costado Este del Cementerio"}
// ,{id:1111,latitude:12.152289,longitude:-86.2873252,descripcion:"Maxi Palí"}
// ,{id:1112,latitude:12.1559632,longitude:-86.2381458,descripcion:"Colegio José de la Cruz Mena"}
// ,{id:1113,latitude:12.1188279,longitude:-86.2963246,descripcion:"Colegio Bautista Belén"}
// ,{id:1114,latitude:12.1524835,longitude:-86.2606909,descripcion:"Antigua Cervecería Victoria"}
// ,{id:1115,latitude:12.1471143,longitude:-86.2179112,descripcion:"Hospital Alemán Nicaragüense"}
// ,{id:1116,latitude:12.1385383,longitude:-86.2590198,descripcion:"Cristo Rey"}
// ,{id:1117,latitude:12.1443083,longitude:-86.2824326,descripcion:"Panadería Norma"}
// ,{id:1118,latitude:12.1167641,longitude:-86.2585876,descripcion:"Colegio Teresiano"}
// ,{id:1119,latitude:12.14754275,longitude:-86.3428671,descripcion:"El Puente"}
// ,{id:1120,latitude:12.0763793,longitude:-86.2132492,descripcion:"La Ermita de Esquipulas"}
// ,{id:1121,latitude:12.1210068,longitude:-86.2426899,descripcion:"Hospedaje Playboy"}
// ,{id:1122,latitude:12.11486015,longitude:-86.2538632501,descripcion:"El Quetzal"}
// ,{id:1123,latitude:12.1393447,longitude:-86.2582031,descripcion:"Colegio Público España"}
// ,{id:1124,latitude:12.1208984,longitude:-86.224869,descripcion:"Primero de Mayo"}
// ,{id:1125,latitude:12.0814678,longitude:-86.2360413,descripcion:"El Poste Blanco"}
// ,{id:1126,latitude:12.1323606,longitude:-86.24459,descripcion:"Parque 10 de Junio"}
// ,{id:1127,latitude:12.1238517,longitude:-86.2422781,descripcion:"Mercado Huembes Sureste"}
// ,{id:1128,latitude:12.1389972,longitude:-86.2566804,descripcion:"PMS Construcciones"}
// ,{id:1129,latitude:12.1323954,longitude:-86.2447001,descripcion:"Parque 10 de Junio"}
// ,{id:1130,latitude:12.1391021,longitude:-86.2566546,descripcion:"PMS Construcciones"}
// ,{id:1131,latitude:12.1039693,longitude:-86.2217633,descripcion:"Farmacia Fabiola"}
// ,{id:1132,latitude:12.13800465,longitude:-86.2036920501,descripcion:"MATEPSA"}
// ,{id:1133,latitude:12.0954197503,longitude:-86.2390529997,descripcion:"Instituto de Desarrollo Rural"}
// ,{id:1134,latitude:12.1530088,longitude:-86.2824784,descripcion:"Antiguo Estadio Nacional Norte"}
// ,{id:1135,latitude:12.1501618,longitude:-86.3195288,descripcion:"Terminal de la Ruta 114"}
// ,{id:1136,latitude:12.0694504,longitude:-86.1997376,descripcion:"Terminal Esquipulas"}
// ,{id:1137,latitude:12.0746765,longitude:-86.2054883,descripcion:"Costur"}
// ,{id:1138,latitude:12.1383846,longitude:-86.2218424,descripcion:"Bar Doña Thel"}
// ,{id:1139,latitude:12.14646075,longitude:-86.2640661,descripcion:"Terminal Vanegas"}
// ,{id:1140,latitude:12.1362999,longitude:-86.2198378,descripcion:"UPOLI Sur"}
// ,{id:1141,latitude:12.1393917,longitude:-86.226508,descripcion:"Villa Progreso"}
// ,{id:1142,latitude:12.1248137,longitude:-86.2236384,descripcion:"Iglesia San José Obrero"}
// ,{id:1143,latitude:12.1273435,longitude:-86.2659145,descripcion:"Metrocentro"}
// ,{id:1144,latitude:12.1368831,longitude:-86.2092321,descripcion:"Terminal 119"}
// ,{id:1145,latitude:12.1290432,longitude:-86.2200698,descripcion:"Barrio Américas 1"}
// ,{id:1146,latitude:12.150154,longitude:-86.2900704,descripcion:"Desarme El Rubio"}
// ,{id:1147,latitude:12.1278606,longitude:-86.2118962,descripcion:"Clínica Las Américas"}
// ,{id:1148,latitude:12.1276939,longitude:-86.2150402,descripcion:"Semáforos Sandak"}
// ,{id:1149,latitude:12.143073,longitude:-86.2605052,descripcion:"Taller de Mecánica"}
// ,{id:1150,latitude:12.1341988,longitude:-86.2498314,descripcion:"El Dorado"}
// ,{id:1151,latitude:12.1176956,longitude:-86.1959538,descripcion:"Omar Téllez Sánchez"}
// ,{id:1152,latitude:12.1194357,longitude:-86.2079007,descripcion:"Miscelánea La Unión"}
// ,{id:1153,latitude:12.122523,longitude:-86.2318039,descripcion:"4 de Septiembre"}
// ,{id:1154,latitude:12.1217318,longitude:-86.2281988,descripcion:"Semáforos Jardines de Veracruz"}
// ,{id:1155,latitude:12.1389563,longitude:-86.2466998,descripcion:"Semáforo El Paraisito"}
// ,{id:1156,latitude:12.1403881,longitude:-86.2488629,descripcion:"Taller Changai"}
// ,{id:1157,latitude:12.1500846,longitude:-86.2951082,descripcion:"Pulpería Cinthia"}
// ,{id:1158,latitude:12.1553126,longitude:-86.2804409,descripcion:"Pulpería Albertina"}
// ,{id:1159,latitude:12.1167227,longitude:-86.1969608,descripcion:"Laureles Sur"}
// ,{id:1160,latitude:12.1168175,longitude:-86.1969428,descripcion:"Laureles Sur"}
// ,{id:1161,latitude:12.1466481,longitude:-86.2136105,descripcion:"Taller Conrado"}
// ,{id:1162,latitude:12.1670644,longitude:-86.3594459,descripcion:"Los Masayas"}
// ,{id:1163,latitude:12.1388225,longitude:-86.3312313,descripcion:"KM 9"}
// ,{id:1164,latitude:12.165308,longitude:-86.3490015,descripcion:"Plaza Padre Miguel"}
// ,{id:1165,latitude:12.1682998,longitude:-86.3435461,descripcion:"Entrada a Ciudad Sandino"}
// ,{id:1166,latitude:12.1678898,longitude:-86.3503022,descripcion:"Pinar del Río"}
// ,{id:1167,latitude:12.1674823,longitude:-86.3520969,descripcion:"El Gallo Más Gallo"}
// ,{id:1168,latitude:12.1359198,longitude:-86.2382537,descripcion:"Barrio Meneses"}
// ,{id:1169,latitude:12.1419517,longitude:-86.2205865,descripcion:"El Manguito"}
// ,{id:1170,latitude:12.1455536,longitude:-86.2321116,descripcion:"Parque Amistad"}
// ,{id:1171,latitude:12.1572405,longitude:-86.2839268,descripcion:"Ferretería El Serrucho"}
// ,{id:1172,latitude:12.1366702,longitude:-86.2884961,descripcion:"Pulpería Papachano"}
// ,{id:1173,latitude:12.1313701,longitude:-86.2904845,descripcion:"Colegio Benjamín Zeledón"}
// ,{id:1174,latitude:12.1738456,longitude:-86.3639217,descripcion:"Barrio 4 de Abril"}
// ,{id:1175,latitude:12.1516437,longitude:-86.3090949,descripcion:"Manuel Olivares"}
// ,{id:1176,latitude:12.12294025,longitude:-86.1949584,descripcion:"Manuel Fernández"}
// ,{id:1177,latitude:12.1394237001,longitude:-86.2088160001,descripcion:"Maxi Palí Larreynaga"}
// ,{id:1178,latitude:12.0682684,longitude:-86.2006685,descripcion:"Terminal Los Vanegas"}
// ,{id:1179,latitude:12.1568471502,longitude:-86.2295058001,descripcion:"Materiales de Construcción Santa Clara"}
// ,{id:1180,latitude:12.1090605,longitude:-86.2276009,descripcion:"Escuela Adventista"}
// ,{id:1181,latitude:12.1556518,longitude:-86.2879709,descripcion:"El Arbolito"}
// ,{id:1182,latitude:12.1325175,longitude:-86.2301702,descripcion:"Paso a desnivel Rubenia"}
// ,{id:1183,latitude:12.1446289503,longitude:-86.2612102006,descripcion:"Gancho de Camino"}
// ,{id:1184,latitude:12.1453735,longitude:-86.2298761,descripcion:"Parroquia Pío X"}
// ,{id:1185,latitude:12.1033855,longitude:-86.29681715,descripcion:"Pulpería El Bulky"}
// ,{id:1186,latitude:12.1442184,longitude:-86.2667235,descripcion:"El Redentor"}
// ,{id:1187,latitude:12.1441639,longitude:-86.26712,descripcion:"El Redentor"}
// ,{id:1188,latitude:12.1095725,longitude:-86.2320563,descripcion:"Empalme"}
// ,{id:1189,latitude:12.1096633,longitude:-86.2319678,descripcion:"Empalme"}
// ,{id:1190,latitude:12.1046298,longitude:-86.2256699,descripcion:"Enrique de Ossó"}
// ,{id:1191,latitude:12.1489261,longitude:-86.1582559,descripcion:"Zona Franca Las Mercedes"}
// ,{id:1192,latitude:12.1383588,longitude:-86.2270693,descripcion:"Semáforos Villa Progreso"}
// ,{id:1193,latitude:12.1531356,longitude:-86.3044132,descripcion:"Semáforos de Linda Vista"}
// ,{id:1194,latitude:12.11461925,longitude:-86.3004303,descripcion:"Pulpería Elena"}
// ,{id:1195,latitude:12.1474832,longitude:-86.2642012,descripcion:"Terminal de Retorno 133"}
// ,{id:1196,latitude:12.1022459,longitude:-86.2449988,descripcion:"Plaza Familiar"}
// ,{id:1197,latitude:12.0956306,longitude:-86.2394292,descripcion:"Instituto de Desarrollo Rural"}
// ,{id:1198,latitude:12.0695988,longitude:-86.2071153,descripcion:"Alborada"}
// ,{id:1199,latitude:12.0695369,longitude:-86.2048754,descripcion:"Cenicera"}
// ,{id:1200,latitude:12.0699175,longitude:-86.2116177,descripcion:"El Avispero"}
// ,{id:1201,latitude:12.0695993,longitude:-86.2058269,descripcion:"El Chato"}
// ,{id:1202,latitude:12.069093,longitude:-86.2033939,descripcion:"Los Rocha"}
// ,{id:1203,latitude:12.1008138,longitude:-86.2441847,descripcion:"Plaza Familiar"}
// ,{id:1204,latitude:12.1203118,longitude:-86.1956097,descripcion:"Manuel Fernández"}
// ,{id:1205,latitude:12.1340975,longitude:-86.2495282,descripcion:"El Dorado"}
// ,{id:1206,latitude:12.1199512,longitude:-86.2611722,descripcion:"Pharaoh's"}
// ,{id:1207,latitude:12.1266488,longitude:-86.2233555,descripcion:"Parque Primero de Mayo"}
// ,{id:1208,latitude:12.1163457,longitude:-86.2579002,descripcion:"Colegio Teresiano"}
// ,{id:1209,latitude:12.1271802,longitude:-86.265588,descripcion:"Metrocentro"}
// ,{id:1210,latitude:12.136887,longitude:-86.2091113,descripcion:"Terminal 119"}
// ,{id:1211,latitude:12.1498225,longitude:-86.3169783,descripcion:"Cuesta El Plomo Sur"}
// ,{id:1212,latitude:12.1372734,longitude:-86.2090837,descripcion:"Pulpería July"}
// ,{id:1213,latitude:12.1542887,longitude:-86.298127,descripcion:"Semáforos La Ceibita"}
// ,{id:1214,latitude:12.1242941,longitude:-86.2645879,descripcion:"Ministerio Público"}
// ,{id:1215,latitude:12.1489179,longitude:-86.2899015,descripcion:"Impresiones Arca"}
// ,{id:1216,latitude:12.1344294,longitude:-86.2146007,descripcion:"Villa 9 de Junio"}
// ,{id:1217,latitude:12.1350066,longitude:-86.24418245,descripcion:"Video Club"}
// ,{id:1218,latitude:12.09714135,longitude:-86.24820045,descripcion:"Viejo Santo Domingo"}
// ,{id:1219,latitude:12.0809733,longitude:-86.2598049,descripcion:"Mini Agencia Ponce"}
// ,{id:1220,latitude:12.1576335,longitude:-86.36034785,descripcion:"Santa Eduviges"}
// ,{id:1221,latitude:12.1258541,longitude:-86.23680295,descripcion:"Santa Julia"}
// ,{id:1222,latitude:12.15925415,longitude:-86.27804245,descripcion:"San Sebastián"}
// ,{id:1223,latitude:12.1571085,longitude:-86.2820512501,descripcion:"Santa Ana"}
// ,{id:1224,latitude:12.15512005,longitude:-86.2183501,descripcion:"Parque La Primavera"}
// ,{id:1225,latitude:12.1598089,longitude:-86.3667246,descripcion:"Cauce"}
// ,{id:1226,latitude:12.1671026,longitude:-86.3597009,descripcion:"Los Masayas"}
// ,{id:1227,latitude:12.1555807,longitude:-86.2879721,descripcion:"El Arbolito"}
// ,{id:1228,latitude:12.1598536,longitude:-86.3667935,descripcion:"Cauce"}
// ,{id:1229,latitude:12.16671195,longitude:-86.36469075,descripcion:"Parque Zona 5"}
// ,{id:1230,latitude:12.1402989,longitude:-86.2997016,descripcion:"UCEM"}
// ,{id:1231,latitude:12.12663275,longitude:-86.2232978,descripcion:"Parque Primero de Mayo"}
// ,{id:1232,latitude:12.11302865,longitude:-86.31399995,descripcion:"Parque San Patricio"}
// ,{id:1233,latitude:12.14565085,longitude:-86.2375331,descripcion:"Parque Maestro Gabriel"}
// ,{id:1234,latitude:12.14839425,longitude:-86.29627175,descripcion:"Parque Mennen"}
// ,{id:1235,latitude:12.1654334,longitude:-86.3643848,descripcion:"Casa del Zinc"}
// ,{id:1236,latitude:12.1586881,longitude:-86.3518915,descripcion:"Casa del Adulto Mayor Zona 8"}
// ,{id:1237,latitude:12.0752957,longitude:-86.2293474,descripcion:"Casa España"}
// ,{id:1238,latitude:12.1620066,longitude:-86.3647032,descripcion:"Entrada a Nueva Vida"}
// ,{id:1239,latitude:12.1544301,longitude:-86.3341285,descripcion:"Cemex"}
// ,{id:1240,latitude:12.1540886,longitude:-86.3341285,descripcion:"Cemex"}
// ,{id:1241,latitude:12.1502409,longitude:-86.3198122,descripcion:"Unimar"}
// ,{id:1242,latitude:12.1500228,longitude:-86.3197765,descripcion:"Unimar"}
// ,{id:1243,latitude:12.1534975,longitude:-86.3008978,descripcion:"Tortillería Alicia"}
// ,{id:1244,latitude:12.1295142,longitude:-86.2649646499,descripcion:"Catedral de Managua"}
// ,{id:1245,latitude:12.1472418,longitude:-86.2642334,descripcion:"Terminal de Retorno 133"}
// ,{id:1246,latitude:12.1315011504,longitude:-86.2410767001,descripcion:"Don Bosco"}
// ,{id:1247,latitude:12.1130639,longitude:-86.22239995,descripcion:"Domingo Matus"}
// ,{id:1248,latitude:12.1464383501,longitude:-86.2381436,descripcion:"El Colonial"}
// ,{id:1249,latitude:12.1402268,longitude:-86.3075013,descripcion:"ENACAL"}
// ,{id:1250,latitude:12.12427105,longitude:-86.27683325,descripcion:"ENEL Central"}
// ,{id:1251,latitude:12.1446514,longitude:-86.2375131,descripcion:"Farmacias Ebenezer"}
// ,{id:1252,latitude:12.1276905,longitude:-86.2149838,descripcion:"Semáforos Sandak"}
// ,{id:1253,latitude:12.17167615,longitude:-86.35816615,descripcion:"Parada sin nombre"}
// ,{id:1254,latitude:12.1656051001,longitude:-86.3572932,descripcion:"Alcaldía de Ciudad Sandino"}
// ,{id:1255,latitude:12.1085113,longitude:-86.1913182,descripcion:"Taller Olivas"}
// ,{id:1256,latitude:12.0899393,longitude:-86.3095223,descripcion:"Camilo Ortega 1"}
// ,{id:1257,latitude:12.1599877,longitude:-86.19543425,descripcion:"Terminal Berta Díaz"}
// ,{id:1258,latitude:12.1410726,longitude:-86.2418829,descripcion:"El Edén"}
// ,{id:1259,latitude:12.14670985,longitude:-86.21375125,descripcion:"Taller Conrado"}
// ,{id:1260,latitude:12.13933625,longitude:-86.29358105,descripcion:"Agroalfa"}
// ,{id:1261,latitude:12.1537686,longitude:-86.2295304,descripcion:"Agricons"}
// ,{id:1262,latitude:12.1279365016,longitude:-86.2962609997,descripcion:"Alcaldía de Managua"}
// ,{id:1263,latitude:12.1573080001,longitude:-86.2837206501,descripcion:"Ferretería El Serrucho"}
// ,{id:1264,latitude:12.15231015,longitude:-86.2899116,descripcion:"Agrosa"}
// ,{id:1265,latitude:12.1607231,longitude:-86.34844115,descripcion:"5 de Julio"}
// ,{id:1266,latitude:12.0750911,longitude:-86.20968005,descripcion:"FUTEC"}
// ,{id:1267,latitude:12.1624672,longitude:-86.1891209,descripcion:"Villa José Benito Escobar"}
// ,{id:1268,latitude:12.1465931,longitude:-86.2873395498,descripcion:"Estátua de Montoya"}
// ,{id:1269,latitude:12.1363552,longitude:-86.21983515,descripcion:"UPOLI Sur"}
// ,{id:1270,latitude:12.1515049,longitude:-86.1891116,descripcion:"Palí Las Mercedes"}
// ,{id:1271,latitude:12.1549368,longitude:-86.3525003,descripcion:"Villa Nueva"}
// ,{id:1272,latitude:12.1393038001,longitude:-86.2267880001,descripcion:"Villa Progreso"}
// ,{id:1273,latitude:12.0743277022,longitude:-86.1996257494,descripcion:"Vistas de Esquipulas"}
// ,{id:1274,latitude:12.1441372,longitude:-86.2265726,descripcion:"Reparto Pedro Aráuz Palacios"}
// ,{id:1275,latitude:12.13074135,longitude:-86.2749330001,descripcion:"Vivero"}
// ,{id:1276,latitude:12.13654605,longitude:-86.34592465,descripcion:"Vuela Rey de Reyes"}
// ,{id:1277,latitude:12.1153549501,longitude:-86.2325281,descripcion:"Vuelta II"}
// ,{id:1278,latitude:12.1574845,longitude:-86.28956,descripcion:"Entrada Norte Iglesia Santa Ana"}
// ,{id:1279,latitude:12.14018025,longitude:-86.26780405,descripcion:"Mirador Tiscapa"}
// ,{id:1280,latitude:12.1531039,longitude:-86.3019281,descripcion:"Farmacia Pérez Morales"}
// ,{id:1281,latitude:12.1526786,longitude:-86.2482815,descripcion:"Ferretería El Halcón"}
// ,{id:1282,latitude:12.1493276,longitude:-86.2985728,descripcion:"Fotos Luminton"}
// ,{id:1283,latitude:12.123054,longitude:-86.244813,descripcion:"Mercado Huembes Suroeste"}
// ,{id:1284,latitude:12.1253297,longitude:-86.2955552,descripcion:"Colegio Cristiano La Senda"}
// ,{id:1285,latitude:12.1533604,longitude:-86.2242147,descripcion:"Disagro"}
// ,{id:1286,latitude:12.1536375,longitude:-86.2591354,descripcion:"ENABAS"}
// ,{id:1287,latitude:12.1171415,longitude:-86.3001133,descripcion:"Farmacia Helena"}
// ,{id:1288,latitude:12.157341,longitude:-86.2896417,descripcion:"Costado Este Iglesia Santa Ana"}
// ,{id:1289,latitude:12.15306895,longitude:-86.1992176,descripcion:"Colegio Camilo Zapata"}
// ,{id:1290,latitude:12.1551957,longitude:-86.1840753,descripcion:"Terminal 105"}
// ,{id:1291,latitude:12.0692158,longitude:-86.2034653,descripcion:"Los Rocha"}
// ,{id:1292,latitude:12.1228539,longitude:-86.2240672,descripcion:"Colegio Primero de Mayo"}
// ,{id:1293,latitude:12.0701084,longitude:-86.2137815,descripcion:"Entrada a la base"}
// ,{id:1294,latitude:12.0696528,longitude:-86.2097583,descripcion:"Los Robles"}
// ,{id:1295,latitude:12.1249075,longitude:-86.2650716,descripcion:"Ministerio Público"}
// ,{id:1296,latitude:12.0696595,longitude:-86.2049052,descripcion:"Cenicera"}
// ,{id:1297,latitude:12.0696845,longitude:-86.2071697,descripcion:"Alborada"}
// ,{id:1298,latitude:12.1282643,longitude:-86.2131539,descripcion:"Calle El Tamarindo"}
// ,{id:1299,latitude:12.0700286,longitude:-86.2117212,descripcion:"El Avispero"}
// ,{id:1300,latitude:12.1783335,longitude:-86.3624555,descripcion:"Garita Valle Sandino"}
// ,{id:1301,latitude:12.1089073,longitude:-86.2289429,descripcion:"Amanda Aguilar"}
// ,{id:1302,latitude:12.1178599,longitude:-86.2387919,descripcion:"Palí La Fuente"}
// ,{id:1303,latitude:12.1054082,longitude:-86.2235959,descripcion:"Salomón Moreno"}
// ,{id:1304,latitude:12.1375655,longitude:-86.2535434,descripcion:"Comedor Apostólico"}
// ,{id:1305,latitude:12.1758336,longitude:-86.3687356,descripcion:"Colegio"}
// ,{id:1306,latitude:12.1153703,longitude:-86.2322494,descripcion:"Vuelta II"}
// ,{id:1307,latitude:12.1764528,longitude:-86.3695636,descripcion:"Terminal Villa Sandino"}
// ,{id:1308,latitude:12.1402249,longitude:-86.2655414,descripcion:"Cruz Azul"}
// ,{id:1309,latitude:12.1592256,longitude:-86.2791756,descripcion:"Cristo del Rosario Este"}
// ,{id:1310,latitude:12.1598277,longitude:-86.2875033,descripcion:"Plantel Central"}
// ,{id:1311,latitude:12.1596882,longitude:-86.2874516,descripcion:"Plantel Central"}
// ,{id:1312,latitude:12.1130803,longitude:-86.2035829,descripcion:"Terminal 116"}
// ,{id:1313,latitude:12.115766,longitude:-86.2370703,descripcion:"Pulpería Josseling"}
// ,{id:1314,latitude:12.1123964,longitude:-86.2005473,descripcion:"Pulpería Karolina"}
// ,{id:1315,latitude:12.0696982,longitude:-86.2058422,descripcion:"El Chato"}
// ,{id:1316,latitude:12.1450259,longitude:-86.2608299,descripcion:"Gancho de Camino"}
// ,{id:1317,latitude:12.1124983,longitude:-86.2005343,descripcion:"Pulpería Karolina"}
// ,{id:1318,latitude:12.1392159,longitude:-86.227068,descripcion:"Villa Progreso"}
// ,{id:1319,latitude:12.1228576,longitude:-86.2450302,descripcion:"Mercado Huembes Suroeste"}
// ,{id:1320,latitude:12.084198,longitude:-86.2384593,descripcion:"Colegio Girasol"}
// ,{id:1321,latitude:12.0842551,longitude:-86.2384211,descripcion:"Colegio Girasol"}
// ,{id:1322,latitude:12.0759373,longitude:-86.2152524,descripcion:"Iglesia Esquipulas"}
// ,{id:1323,latitude:12.0745106,longitude:-86.2020651,descripcion:"Bar y Billar El Gato"}
// ,{id:1324,latitude:12.0745703,longitude:-86.2258902,descripcion:"Hotel Contempo"}
// ,{id:1325,latitude:12.0742608,longitude:-86.2193935,descripcion:"Entrada a Esquipulas"}
// ,{id:1326,latitude:12.1758599,longitude:-86.3642651,descripcion:"Comercial López Reyes"}
// ,{id:1327,latitude:12.1243454,longitude:-86.2001854,descripcion:"Andrés Castro"}
// ,{id:1328,latitude:12.1145602,longitude:-86.1907907,descripcion:"Pulpería Rosita"}
// ,{id:1329,latitude:12.116981,longitude:-86.1915539,descripcion:"Terminal 167"}
// ,{id:1330,latitude:12.1182174,longitude:-86.1890451,descripcion:"Los Laureles Sur"}
// ,{id:1331,latitude:12.1758463,longitude:-86.3665831,descripcion:"Farmacia Jazmín"}
// ,{id:1332,latitude:12.1354297,longitude:-86.2289792,descripcion:"UCyT"}
// ,{id:1333,latitude:12.1267427,longitude:-86.2081626,descripcion:"Clínica Dental"}
// ,{id:1334,latitude:12.1402037,longitude:-86.265429,descripcion:"Cruz Azul"}
// ,{id:1335,latitude:12.1252843,longitude:-86.2399477,descripcion:"Comedor Liliam"}
// ,{id:1336,latitude:12.1405756,longitude:-86.2511814,descripcion:"Pro Mujer"}
// ,{id:1337,latitude:12.1258228,longitude:-86.2368068,descripcion:"Santa Julia"}
// ,{id:1338,latitude:12.130917,longitude:-86.2667196,descripcion:"Rotonda Rubén Darío"}
// ,{id:1339,latitude:12.1370452,longitude:-86.244494,descripcion:"Billares Mario Piquete"}
// ,{id:1340,latitude:12.1372195,longitude:-86.2659384,descripcion:"Universidad Humanista UNEH"}
// ,{id:1341,latitude:12.140033,longitude:-86.2549566,descripcion:"Central de Azulejos"}
// ,{id:1342,latitude:12.1524081,longitude:-86.2430147,descripcion:"SINSA Carretera Norte"}
// ,{id:1343,latitude:12.152694,longitude:-86.2462398,descripcion:"Súper de los Militares"}
// ,{id:1344,latitude:12.1314984,longitude:-86.2435085,descripcion:"Parque Colombia"}
// ,{id:1345,latitude:12.1435803,longitude:-86.2647998,descripcion:"Ministerio de Defensa"}
// ,{id:1346,latitude:12.1171258,longitude:-86.2975558,descripcion:"Iglesia San Judas Tadeo"}
// ,{id:1347,latitude:12.1417598,longitude:-86.224865,descripcion:"Rotonda La Virgen"}
// ,{id:1348,latitude:12.1462578,longitude:-86.2871925,descripcion:"Estátua de Montoya"}
// ,{id:1349,latitude:12.1322291,longitude:-86.3137957,descripcion:"Las Piedrecitas"}
// ,{id:1350,latitude:12.1526418,longitude:-86.2482814,descripcion:"Ajax Delgado Norte"}
// ,{id:1351,latitude:12.1034202,longitude:-86.2332239,descripcion:"Iglesia Adventista"}
// ,{id:1352,latitude:12.1449178,longitude:-86.2761379,descripcion:"Hotel Morgut"}
// ,{id:1353,latitude:12.1665435,longitude:-86.346628,descripcion:"San Benito"}
// ,{id:1354,latitude:12.1440936,longitude:-86.2911185,descripcion:"Fósforera"}
// ,{id:1355,latitude:12.1635742,longitude:-86.3648207,descripcion:"Centro Comercial Francisco"}
// ,{id:1356,latitude:12.1518117,longitude:-86.3000576,descripcion:"Parque José de San Martín"}
// ,{id:1357,latitude:12.1517579,longitude:-86.2999544,descripcion:"Parque José de San Martín"}
// ,{id:1358,latitude:12.108657,longitude:-86.2508091,descripcion:"Movistar"}
// ,{id:1359,latitude:12.1270604,longitude:-86.2451841,descripcion:"Policía de Tránsito"}
// ,{id:1360,latitude:12.1507816,longitude:-86.3485914,descripcion:"Pulpería Diarte"}
// ,{id:1361,latitude:12.1507734,longitude:-86.24893415,descripcion:"Bar La Rotondita"}
// ,{id:1362,latitude:12.1130694,longitude:-86.2224162,descripcion:"Naná"}
// ,{id:1363,latitude:12.1500921,longitude:-86.3413986,descripcion:"La Panadería"}
// ,{id:1364,latitude:12.1653568,longitude:-86.3488884,descripcion:"Plaza Padre Miguel"}
// ,{id:1365,latitude:12.112629,longitude:-86.218849,descripcion:"Capilla Santa Teresita"}
// ,{id:1366,latitude:12.1523789,longitude:-86.3409081,descripcion:"La Casa de Campaña"}
// ,{id:1367,latitude:12.1628825,longitude:-86.3552654,descripcion:"Juzgados Ciudad Sandino"}
// ,{id:1368,latitude:12.1454247,longitude:-86.1701629,descripcion:"Aeropuerto"}
// ,{id:1369,latitude:12.1523915,longitude:-86.3410052,descripcion:"La Casa de Campaña"}
// ,{id:1370,latitude:12.1272379,longitude:-86.2823026,descripcion:"Rotonda El Periodista"}
// ,{id:1371,latitude:12.1093894,longitude:-86.224891,descripcion:"Colegio Salomón Ibarra"}
// ,{id:1372,latitude:12.1375488,longitude:-86.253452,descripcion:"Comedor Apostólico"}
// ,{id:1373,latitude:12.1092995,longitude:-86.2249958,descripcion:"Colegio Salomón Ibarra"}
// ,{id:1374,latitude:12.1369573,longitude:-86.2536565,descripcion:"Variedades Molina"}
// ,{id:1375,latitude:12.160061,longitude:-86.2937983,descripcion:"Parque Acahualinca"}
// ,{id:1376,latitude:12.1205116,longitude:-86.2090664,descripcion:"La Chelita"}
// ,{id:1377,latitude:12.1449986,longitude:-86.2337504,descripcion:"Rotonda Bello Horizonte Sur"}
// ,{id:1378,latitude:12.1121298,longitude:-86.1975845,descripcion:"Sport Bar Hills"}
// ,{id:1379,latitude:12.1454006,longitude:-86.2975913,descripcion:"Banco Popular"}
// ,{id:1380,latitude:12.1494423,longitude:-86.2246229,descripcion:"Terminal de la MR4"}
// ,{id:1381,latitude:12.1514163,longitude:-86.2370197,descripcion:"Distribuidora La Universal"}
// ,{id:1382,latitude:12.1404221,longitude:-86.2926146,descripcion:"Pulpería Nanda"}
// ,{id:1383,latitude:12.1280256,longitude:-86.2348665,descripcion:"Nicarao"}
// ,{id:1384,latitude:12.1441581,longitude:-86.2912755,descripcion:"Fósforera"}
// ,{id:1385,latitude:12.145755,longitude:-86.289217,descripcion:"Budget"}
// ,{id:1386,latitude:12.1469284,longitude:-86.2874866,descripcion:"Estátua de Montoya"}
// ,{id:1387,latitude:12.1484197,longitude:-86.2495522,descripcion:"Hospital Solidaridad"}
// ,{id:1388,latitude:12.1207504,longitude:-86.1660592,descripcion:"Campo deportivo"}
// ,{id:1389,latitude:12.1281003,longitude:-86.1607547,descripcion:"Centro de Salud"}
// ,{id:1390,latitude:12.1183699,longitude:-86.1672708,descripcion:"Cementerio San José"}
// ,{id:1391,latitude:12.1229264,longitude:-86.1716563,descripcion:"Farmacia Aracely"}
// ,{id:1392,latitude:12.1290828,longitude:-86.2340626,descripcion:"Colonia Nicarao"}
// ,{id:1393,latitude:12.1523231,longitude:-86.3090229,descripcion:"Colegio Manuel Olivares"}
// ,{id:1394,latitude:12.1525937,longitude:-86.2912014,descripcion:"Pulpería el Carmen"}
// ,{id:1395,latitude:12.1451594,longitude:-86.1672547,descripcion:"INAC"}
// ,{id:1396,latitude:12.1521926,longitude:-86.2403359,descripcion:"Big Cola"}
// ,{id:1397,latitude:12.1515886,longitude:-86.3090624,descripcion:"Manuel Olivares"}
// ,{id:1398,latitude:12.1234171,longitude:-86.21890385,descripcion:"Villa Flor Norte"}
// ,{id:1399,latitude:12.1170716003,longitude:-86.2001149667,descripcion:"Villa Libertad"}
// ,{id:1400,latitude:12.150837,longitude:-86.2494014,descripcion:"Uno Hospital Solidaridad"}
// ,{id:1401,latitude:12.1025066,longitude:-86.22385095,descripcion:"Villa Cuba Libre"}
// ,{id:1402,latitude:12.1218246501,longitude:-86.2283740999,descripcion:"Semáforos Jardines de Veracruz"}
// ,{id:1403,latitude:12.144535,longitude:-86.3350624,descripcion:"Satelite de Asososca"}
// ,{id:1404,latitude:12.13594575,longitude:-86.24195445,descripcion:"Sastrería Estilo y La Moda"}
// ,{id:1405,latitude:12.1342839501,longitude:-86.1995002248,descripcion:"Semáforos Mayoreo"}
// ,{id:1406,latitude:12.1616511,longitude:-86.3653068,descripcion:"Entrada Nueva Vida"}
// ,{id:1407,latitude:12.1669194,longitude:-86.3532609,descripcion:"Farmacia Nefi"}
// ,{id:1408,latitude:12.1550573,longitude:-86.2941411,descripcion:"Puente León"}
// ,{id:1409,latitude:12.1616511,longitude:-86.3652723,descripcion:"Entrada Nueva Vida"}
// ,{id:1410,latitude:12.1675051,longitude:-86.3586686,descripcion:"Vuelta de la Uno"}
// ,{id:1411,latitude:12.1551964,longitude:-86.2941733,descripcion:"Puente León"}
// ,{id:1412,latitude:12.1655503,longitude:-86.3628736,descripcion:"La Palmera"}
// ,{id:1413,latitude:12.1655595,longitude:-86.3630265,descripcion:"La Palmera"}
// ,{id:1414,latitude:12.1118285,longitude:-86.2086665,descripcion:"Terminal 195"}
// ,{id:1415,latitude:12.1574349,longitude:-86.2970572,descripcion:"Los Negros"}
// ,{id:1416,latitude:12.1658122,longitude:-86.3559583,descripcion:"Palí Ciudad Sandino"}
// ,{id:1417,latitude:12.1446798,longitude:-86.3041743,descripcion:"El Seminario"}
// ,{id:1418,latitude:12.1230999,longitude:-86.1914328,descripcion:"Bayer"}
// ,{id:1419,latitude:12.1406848,longitude:-86.251173,descripcion:"Pro Mujer"}
// ,{id:1420,latitude:12.1524775,longitude:-86.2911971,descripcion:"Pulpería el Carmen"}
// ,{id:1421,latitude:12.1382632,longitude:-86.227082,descripcion:"Semáforos Villa Progreso"}
// ,{id:1422,latitude:12.1322856002,longitude:-86.2304690503,descripcion:"Paso a desnivel Rubenia"}
// ,{id:1423,latitude:12.14936335,longitude:-86.2238005,descripcion:"Paso a Desnivel Portezuelo"}
// ,{id:1424,latitude:12.12877215,longitude:-86.2810243,descripcion:"Edificios El Centro"}
// ,{id:1425,latitude:12.1288320336,longitude:-86.2223959331,descripcion:"Primero de Mayo"}
// ,{id:1426,latitude:12.12673935,longitude:-86.20820575,descripcion:"Clínica Dental"}
// ,{id:1427,latitude:12.14072665,longitude:-86.28286095,descripcion:"Canal 2"}
// ,{id:1428,latitude:12.1526149,longitude:-86.2587582,descripcion:"Llantera Vargas"}
// ,{id:1429,latitude:12.1125763004,longitude:-86.2642586502,descripcion:"Claro Villa Fontana"}
// ,{id:1430,latitude:12.1034451,longitude:-86.2627407501,descripcion:"Semáforos de Club Terraza"}
// ,{id:1431,latitude:12.11260365,longitude:-86.21885185,descripcion:"Capilla Santa Teresita"}
// ,{id:1432,latitude:12.16162075,longitude:-86.1882462,descripcion:"Cancha Benito Escobar"}
// ,{id:1433,latitude:12.1506717,longitude:-86.3131717,descripcion:"Clínica Bethel Las Brisas"}
// ,{id:1434,latitude:12.1395637,longitude:-86.1961076,descripcion:"Concepción de María"}
// ,{id:1435,latitude:12.1233103,longitude:-86.1882134,descripcion:"Comercial Fernández"}
// ,{id:1436,latitude:12.1424284,longitude:-86.2229676,descripcion:"La Virgen"}
// ,{id:1437,latitude:12.0959294,longitude:-86.3065425,descripcion:"Monumento a Camilo Ortega"}
// ,{id:1438,latitude:12.1377326,longitude:-86.2501326,descripcion:"Bar El Pulpo"}
// ,{id:1439,latitude:12.0959517,longitude:-86.3064627,descripcion:"Monumento a Camilo Ortega"}
// ,{id:1440,latitude:12.1738442,longitude:-86.36399715,descripcion:"Barrio 4 de Abril"}
// ,{id:1441,latitude:12.1733825,longitude:-86.35837495,descripcion:"Zona 11 Sur"}
// ,{id:1442,latitude:12.1688432,longitude:-86.3651823,descripcion:"Terminal 115"}
// ,{id:1443,latitude:12.1254659501,longitude:-86.25430355,descripcion:"Altamira"}
// ,{id:1444,latitude:12.1116618,longitude:-86.23378805,descripcion:"Farmacia Schick"}
// ,{id:1445,latitude:12.1381504,longitude:-86.3045082,descripcion:"Aldea SOS"}
// ,{id:1446,latitude:12.1229186,longitude:-86.2383712,descripcion:"Alesio Blandón"}
// ,{id:1447,latitude:12.1039045,longitude:-86.22174315,descripcion:"Farmacia Ramos"}
// ,{id:1448,latitude:12.1350681,longitude:-86.2547274,descripcion:"El Cristo Rey"}
// ,{id:1449,latitude:12.1525214,longitude:-86.1891456,descripcion:"Trigo Dorado"}
// ,{id:1450,latitude:12.1688451,longitude:-86.3650696,descripcion:"Terminal 115"}
// ,{id:1451,latitude:12.16754155,longitude:-86.3586856,descripcion:"Vuelta de la Uno"}
// ,{id:1452,latitude:12.1472067,longitude:-86.2438882,descripcion:"Auto Servicios Pacheco"}
// ,{id:1453,latitude:12.144111,longitude:-86.21403705,descripcion:"Zona Franca Dasol"}
// ,{id:1454,latitude:12.14577005,longitude:-86.20941405,descripcion:"Waspán Sur"}
// ,{id:1455,latitude:12.1127619,longitude:-86.2545341,descripcion:"El Ministerio"}
// ,{id:1456,latitude:12.1556345,longitude:-86.3056112,descripcion:"Parque Linda Vista"}
// ,{id:1457,latitude:12.1489148501,longitude:-86.1579958,descripcion:"Zona Franca Las Mercedes"}
// ,{id:1458,latitude:12.1506278,longitude:-86.2459365,descripcion:"CECNA"}
// ,{id:1459,latitude:12.1505518,longitude:-86.2439132,descripcion:"Farmacia Potenza"}
// ,{id:1460,latitude:12.1198732,longitude:-86.2319782,descripcion:"Tanque"}
// ,{id:1461,latitude:12.1096179,longitude:-86.23201205,descripcion:"Empalme"}
// ,{id:1462,latitude:12.1699949,longitude:-86.3589837,descripcion:"Enrique Schmidt"}
// ,{id:1463,latitude:12.1289919,longitude:-86.345551,descripcion:"El Cuadro"}
// ,{id:1464,latitude:12.10467525,longitude:-86.2256705,descripcion:"Enrique de Ossó"}
// ,{id:1465,latitude:12.1178865,longitude:-86.2383558,descripcion:"Palí La Fuente"}
// ,{id:1466,latitude:12.124242,longitude:-86.2295368,descripcion:"Farmacia Éxodo"}
// ,{id:1467,latitude:12.1263722,longitude:-86.2278807,descripcion:"Entrada a Barrio Omar Torrijo"}
// ,{id:1468,latitude:12.1092826,longitude:-86.2381786,descripcion:"Monumento Augusto César"}
// ,{id:1469,latitude:12.110645,longitude:-86.2378244,descripcion:"Puesto Médico Buitrago"}
// ,{id:1470,latitude:12.1348319,longitude:-86.2527811,descripcion:"Parque El Riguero"}
// ,{id:1471,latitude:12.1079594,longitude:-86.233494,descripcion:"Miscelánea Darío"}
// ,{id:1472,latitude:12.1526768,longitude:-86.2586478,descripcion:"Llantera Vargas"}
// ,{id:1473,latitude:12.1265509,longitude:-86.2514609,descripcion:"Iglesia Roca Eterna"}
// ,{id:1474,latitude:12.1421773,longitude:-86.2564594,descripcion:"Iglesia Pentecostal"}
// ,{id:1475,latitude:12.1445062,longitude:-86.33517,descripcion:"Satélite de Asososca"}
// ,{id:1476,latitude:12.1055311,longitude:-86.2332757,descripcion:"Farmacia Eva"}
// ,{id:1477,latitude:12.1532462,longitude:-86.252001,descripcion:"Antigua Aduana"}
// ,{id:1478,latitude:12.1496561,longitude:-86.217513,descripcion:"Agri-Corp Oeste"}
// ,{id:1479,latitude:12.1385793,longitude:-86.2538025,descripcion:"Los Paisas"}
// ,{id:1480,latitude:12.1370099,longitude:-86.2659798,descripcion:"Colegio Simón Bolívar"}
// ,{id:1481,latitude:12.0828734,longitude:-86.1918792,descripcion:"Iglesia Solo Cristo Salva"}
// ,{id:1482,latitude:12.1153385,longitude:-86.2025389,descripcion:"Villa Libertad"}
// ,{id:1483,latitude:12.15467,longitude:-86.2961233,descripcion:"Leche Agria El Ternero"}
// ,{id:1484,latitude:12.1489482,longitude:-86.3107299,descripcion:"Hospital Lenín Fonseca"}
// ,{id:1485,latitude:12.1341979,longitude:-86.2381699,descripcion:"Hospital Japonés"}
// ,{id:1486,latitude:12.1450532,longitude:-86.2978066,descripcion:"Las Palmas"}
// ,{id:1487,latitude:12.0696881,longitude:-86.2153607,descripcion:"KM 12 Carretera Masaya / La Base"}
// ,{id:1488,latitude:12.175809,longitude:-86.3689897,descripcion:"Colegio"}
// ,{id:1489,latitude:12.1758343,longitude:-86.3675517,descripcion:"Eskimo"}
// ,{id:1490,latitude:12.1757994,longitude:-86.3675501,descripcion:"Eskimo"}
// ,{id:1491,latitude:12.1444155,longitude:-86.2561512,descripcion:"Boutique Inter Fashion"}
// ,{id:1492,latitude:12.1773057,longitude:-86.3624012,descripcion:"Garita Valle Sandino"}
// ,{id:1493,latitude:12.14412585,longitude:-86.291197,descripcion:"Fósforera"}
// ,{id:1494,latitude:12.1758446,longitude:-86.3624353,descripcion:"Claro"}
// ,{id:1495,latitude:12.1758339,longitude:-86.3646514,descripcion:"Farmacia Anreina"}
// ,{id:1496,latitude:12.1026677,longitude:-86.2985862,descripcion:"Pulpería La Esquinita"}
// ,{id:1497,latitude:12.1594927,longitude:-86.2847714,descripcion:"Pedro Joaquín Chamorro Norte"}
// ,{id:1498,latitude:12.1596319,longitude:-86.2847384,descripcion:"Pedro Joaquín Chamorro Norte"}
// ,{id:1499,latitude:12.1593326,longitude:-86.2821066,descripcion:"Cristo del Rosario Oeste"}
// ,{id:1500,latitude:12.0993026,longitude:-86.2984904,descripcion:"Quinta Santa Martha"}
// ,{id:1501,latitude:12.1298287,longitude:-86.2277829,descripcion:"Colonia Rubenia"}
// ,{id:1502,latitude:12.1565664,longitude:-86.2743874,descripcion:"INSS Sucursal"}
// ,{id:1503,latitude:12.1593442,longitude:-86.2791727,descripcion:"Cristo del Rosario Este"}
// ,{id:1504,latitude:12.1598993,longitude:-86.2906708,descripcion:"Acahualinca Este"}
// ,{id:1505,latitude:12.1008024,longitude:-86.2985803,descripcion:"Sorbetería Haydee"}
// ,{id:1506,latitude:12.1487223,longitude:-86.2275331,descripcion:"Peluquería Leysi"}
// ,{id:1507,latitude:12.1170332,longitude:-86.2006755,descripcion:"Villa Libertad"}
// ,{id:1508,latitude:12.1180081,longitude:-86.2027567,descripcion:"Ixchen"}
// ,{id:1509,latitude:12.1130388,longitude:-86.2034764,descripcion:"Terminal 116"}
// ,{id:1510,latitude:12.1091942,longitude:-86.1931793,descripcion:"Comandante Aureleano"}
// ,{id:1511,latitude:12.1180747,longitude:-86.2027064,descripcion:"Ixchen"}
// ,{id:1512,latitude:12.1092762,longitude:-86.1931446,descripcion:"Comandante Aureleano"}
// ,{id:1513,latitude:12.1309759,longitude:-86.2939441,descripcion:"Farmacia Buendía"}
// ,{id:1514,latitude:12.09345,longitude:-86.26258955,descripcion:"Entrada a Los Vanegas"}
// ,{id:1515,latitude:12.074788,longitude:-86.2177949,descripcion:"Palí"}
// ,{id:1516,latitude:12.0824368,longitude:-86.2373885,descripcion:"Costura Rápida"}
// ,{id:1517,latitude:12.0776548,longitude:-86.2281945,descripcion:"Quinta Johana"}
// ,{id:1518,latitude:12.0745993,longitude:-86.2259031,descripcion:"Hotel Contempo"}
// ,{id:1519,latitude:12.0695846,longitude:-86.2096896,descripcion:"Los Robles"}
// ,{id:1520,latitude:12.1427835,longitude:-86.2290419,descripcion:"Verde Sonrisa"}
// ,{id:1521,latitude:12.1286652,longitude:-86.2329833,descripcion:"Puente Peatonal Rubenia"}
// ,{id:1522,latitude:12.1259734,longitude:-86.2049088,descripcion:"Palí - Las Américas"}
// ,{id:1523,latitude:12.0696263,longitude:-86.2152221,descripcion:"KM 12 Carretera Masaya / La Base"}
// ,{id:1524,latitude:12.1529185,longitude:-86.2387029,descripcion:"Plásticos Modernos"}
// ,{id:1525,latitude:12.1032377,longitude:-86.2217096,descripcion:"Pulpería El Alfarero"}
// ,{id:1526,latitude:12.1320153,longitude:-86.235106,descripcion:"Pulpería Lillian"}
// ,{id:1527,latitude:12.0865349,longitude:-86.1939146,descripcion:"Pulpería Nohelia"}
// ,{id:1528,latitude:12.1008714,longitude:-86.222185,descripcion:"Terminal 164"}
// ,{id:1529,latitude:12.0700454,longitude:-86.2136687,descripcion:"Entrada a la base"}
// ,{id:1530,latitude:12.1361619,longitude:-86.2811341,descripcion:"Parque Las Madres"}
// ,{id:1531,latitude:12.1365347,longitude:-86.2814842,descripcion:"Parque Las Madres"}
// ,{id:1532,latitude:12.1056152,longitude:-86.2307035,descripcion:"Terminal 169"}
// ,{id:1533,latitude:12.1470758,longitude:-86.1621333,descripcion:"UNA / Agraria"}
// ,{id:1534,latitude:12.0952089,longitude:-86.2386768,descripcion:"Instituto de Desarrollo Rural"}
// ,{id:1535,latitude:12.1335106,longitude:-86.281396,descripcion:"Plaza España Este"}
// ,{id:1536,latitude:12.1493656,longitude:-86.2236905,descripcion:"Paso a Desnivel Portezuelo"}
// ,{id:1537,latitude:12.1115826,longitude:-86.2289976,descripcion:"Parque Germán Pomares Ordóñez"}
// ,{id:1538,latitude:12.1467522,longitude:-86.1953098,descripcion:"Policía Distrito VI"}
// ,{id:1539,latitude:12.1160923,longitude:-86.2168854,descripcion:"Panadería Maritza Lucía"}
// ,{id:1540,latitude:12.1215825,longitude:-86.2160114,descripcion:"Panadería San José"}
// ,{id:1541,latitude:12.1369632,longitude:-86.1972629,descripcion:"Pista El Mayoreo"}
// ,{id:1542,latitude:12.114253,longitude:-86.2171023,descripcion:"Milagro de Dios"}
// ,{id:1543,latitude:12.1132754,longitude:-86.2203133,descripcion:"Pulpería Mejía"}
// ,{id:1544,latitude:12.1451121,longitude:-86.2289346,descripcion:"La Taquería"}
// ,{id:1545,latitude:12.1462692,longitude:-86.2426253,descripcion:"Sellos de Hule"}
// ,{id:1546,latitude:12.155958,longitude:-86.2240433,descripcion:"Comedor Fátima"}
// ,{id:1547,latitude:12.1559383,longitude:-86.2222585,descripcion:"Puente La Primavera"}
// ,{id:1548,latitude:12.1550357,longitude:-86.2169473,descripcion:"Puente La Toña"}
// ,{id:1549,latitude:12.1204943,longitude:-86.297879,descripcion:"Plantel Los Cocos"}
// ,{id:1550,latitude:12.158525,longitude:-86.2930181,descripcion:"Pulpería La Providencia"}
// ,{id:1551,latitude:12.1147076,longitude:-86.2363401,descripcion:"Avenida Isidro Centeno López"}
// ,{id:1552,latitude:12.1389907,longitude:-86.2914801,descripcion:"Advent Stereo 92.7 FM"}
// ,{id:1553,latitude:12.1585097,longitude:-86.2765634,descripcion:"Casa para el Pueblo"}
// ,{id:1554,latitude:12.1536426,longitude:-86.257174,descripcion:"Planta Eléctrica"}
// ,{id:1555,latitude:12.1360678,longitude:-86.2420135,descripcion:"Sastrería Estilo y Moda 30 m al Norte"}
// ,{id:1556,latitude:12.1597794,longitude:-86.2906782,descripcion:"Acahualinca Este"}
// ,{id:1557,latitude:12.1506977,longitude:-86.2494039,descripcion:"Uno Hospital Solidaridad"}
// ,{id:1558,latitude:12.1359025,longitude:-86.2499617,descripcion:"El Dorado"}
// ,{id:1559,latitude:12.1297199,longitude:-86.2015461,descripcion:"El Mesías"}
// ,{id:1560,latitude:12.1594358,longitude:-86.2821011,descripcion:"Cristo del Rosario Oeste"}
// ,{id:1561,latitude:12.1148981,longitude:-86.1972158,descripcion:"Pulpería La Bodeguita"}
// ,{id:1562,latitude:12.1320537,longitude:-86.2307679,descripcion:"Paso a desnivel Rubenia"}
// ,{id:1563,latitude:12.1250024,longitude:-86.2237018,descripcion:"Iglesia San José Obrero"}
// ,{id:1564,latitude:12.09596,longitude:-86.3048639,descripcion:"Colegio La Hispanidad"}
// ,{id:1565,latitude:12.1284288,longitude:-86.1963843,descripcion:"Terminal 111"}
// ,{id:1566,latitude:12.1298314,longitude:-86.2015126,descripcion:"El Mesías"}
// ,{id:1567,latitude:12.1564953,longitude:-86.2743941,descripcion:"INSS Sucursal"}
// ,{id:1568,latitude:12.0934469,longitude:-86.2023934,descripcion:"Pulpería Mery"}
// ,{id:1569,latitude:12.1445794,longitude:-86.2185614,descripcion:"Colegio Público República de Argentina"}
// ,{id:1570,latitude:12.0892774,longitude:-86.1954464,descripcion:"Iglesia Católica"}
// ,{id:1571,latitude:12.1577642,longitude:-86.1499422,descripcion:"Terminal Primero de Mayo"}
// ,{id:1572,latitude:12.1206299,longitude:-86.2943985,descripcion:"Pulpería Wendy"}
// ,{id:1573,latitude:12.1542084,longitude:-86.1471013,descripcion:"Salida ENATREL"}
// ,{id:1574,latitude:12.1512749,longitude:-86.1525502,descripcion:"Puente Montefresco"}
// ,{id:1575,latitude:12.1526081,longitude:-86.2622019,descripcion:"Pulpería San José"}
// ,{id:1576,latitude:12.1545433,longitude:-86.1455999,descripcion:"ENATREL"}
// ,{id:1577,latitude:12.0980311,longitude:-86.29941825,descripcion:"Pulpería Telma"}
// ,{id:1578,latitude:12.1590576,longitude:-86.2929614,descripcion:"Acahualinca Sur"}
// ,{id:1579,latitude:12.1633156,longitude:-86.2934276,descripcion:"Pulpería Karla"}
// ,{id:1580,latitude:12.1512064,longitude:-86.2573736,descripcion:"Cooperativa Ricardo Morales"}
// ,{id:1581,latitude:12.1413558,longitude:-86.2435607,descripcion:"Clínica de Salud del Pie"}
// ,{id:1582,latitude:12.1457331,longitude:-86.2534483,descripcion:"Semáforos de Ciudad Jardín"}
// ,{id:1583,latitude:12.1525363,longitude:-86.2583882,descripcion:"El Cazador S.A."}
// ,{id:1584,latitude:12.1314133,longitude:-86.2435123,descripcion:"Parque Colombia"}
// ,{id:1585,latitude:12.1613245,longitude:-86.29365,descripcion:"Huellas de Acahualinca"}
// ,{id:1586,latitude:12.1297019,longitude:-86.245307,descripcion:"Colegio República de Colombia"}
// ,{id:1587,latitude:12.131461,longitude:-86.2415518,descripcion:"Don Bosco"}
// ,{id:1588,latitude:12.1242853,longitude:-86.23426575,descripcion:"Donde fue SERFOSA"}
// ,{id:1589,latitude:12.07695795,longitude:-86.1943019,descripcion:"Rótulo Clínica Nuevos Horizontes"}
// ,{id:1590,latitude:12.1223901,longitude:-86.2375487,descripcion:"Alesio Blandón 2"}
// ,{id:1591,latitude:12.1500786,longitude:-86.1944081,descripcion:"Auto Lavado Big Boy"}
// ,{id:1592,latitude:12.1500877,longitude:-86.1942626,descripcion:"Auto Lavado Big Boy"}
// ,{id:1593,latitude:12.1218971,longitude:-86.2190884,descripcion:"Villa Flor"}
// ,{id:1594,latitude:12.1536544,longitude:-86.3009335,descripcion:"Tortillería Alicia"}
// ,{id:1595,latitude:12.1283215,longitude:-86.2514078,descripcion:"Colegio Luis Alfonso Velásquez"}
// ,{id:1596,latitude:12.1516971,longitude:-86.2816469,descripcion:"Acrilicar"}
// ,{id:1597,latitude:12.1235079,longitude:-86.2393022,descripcion:"CDI Ariel Darce"}
// ,{id:1598,latitude:12.1443649,longitude:-86.266469,descripcion:"Pollo El Granjero"}
// ,{id:1599,latitude:12.1484606,longitude:-86.22749575,descripcion:"Peluquería Leysi"}
// ,{id:1600,latitude:12.1595623,longitude:-86.2847549,descripcion:"Pedro Joaquín Chamorro Norte"}
// ,{id:1601,latitude:12.0967717,longitude:-86.2075378,descripcion:"Campo de béisbol Las Jagüitas"}
// ,{id:1602,latitude:12.1252795502,longitude:-86.2330180499,descripcion:"Colegio 14 de Septiembre"}
// ,{id:1603,latitude:12.16790275,longitude:-86.35025165,descripcion:"Pinar del Río"}
// ,{id:1604,latitude:12.150782,longitude:-86.348463,descripcion:"Pulpería Diarte"}
// ,{id:1605,latitude:12.14335835,longitude:-86.3484786,descripcion:"Calle 8"}
// ,{id:1606,latitude:12.1356409501,longitude:-86.3457551,descripcion:"Calle del Barrio Nuevo"}
// ,{id:1607,latitude:12.14872515,longitude:-86.2783166,descripcion:"Comedor Getsemani"}
// ,{id:1608,latitude:12.1559917,longitude:-86.2240433,descripcion:"Comedor Fátima"}
// ,{id:1609,latitude:12.1320842,longitude:-86.3402026,descripcion:"Puente Motastepe"}
// ,{id:1610,latitude:12.1092352,longitude:-86.19316195,descripcion:"Comandante Aureleano"}
// ,{id:1611,latitude:12.1305982,longitude:-86.2804569,descripcion:"Edificio de las Naciones Unidas"}
// ,{id:1612,latitude:12.1563903,longitude:-86.2358366,descripcion:"Incnik Raya"}
// ,{id:1613,latitude:12.1492399,longitude:-86.3484422,descripcion:"Los Cocos"}
// ,{id:1614,latitude:12.0966371,longitude:-86.3030544,descripcion:"La Parrilla"}
// ,{id:1615,latitude:12.1453601,longitude:-86.2824895,descripcion:"El Gallopinto"}
// ,{id:1616,latitude:12.1544568,longitude:-86.1991556,descripcion:"Parque Camilo Chamorro"}
// ,{id:1617,latitude:12.1360165,longitude:-86.2895561,descripcion:"Templo Mormón Altagracia"}
// ,{id:1618,latitude:12.15049255,longitude:-86.2439173,descripcion:"Farmacia Potenza"}
// ,{id:1619,latitude:12.16696015,longitude:-86.3533121,descripcion:"Farmacia Nefi"}
// ,{id:1620,latitude:12.12425755,longitude:-86.2210754,descripcion:"Farmacia Mery"}
// ,{id:1621,latitude:12.11715035,longitude:-86.3001893,descripcion:"Farmacia Helena"}
// ,{id:1622,latitude:12.11933215,longitude:-86.21634625,descripcion:"Anexo Villa Venezuela"}
// ,{id:1623,latitude:12.15256165,longitude:-86.2606347,descripcion:"Antigua Cervecería Victoria"}
// ,{id:1624,latitude:12.15249455,longitude:-86.25845905,descripcion:"El Cazador S.A."}
// ,{id:1625,latitude:12.1479379,longitude:-86.2745474001,descripcion:"Arboretum"}
// ,{id:1626,latitude:12.1483671,longitude:-86.2026442,descripcion:"Intersección Barrio Hugo Chávez"}
// ,{id:1627,latitude:12.1530759,longitude:-86.1992979,descripcion:"Colegio Camilo Zapata"}
// ,{id:1628,latitude:12.1241743,longitude:-86.2378817,descripcion:"Hospital La Mascota"}
// ,{id:1629,latitude:12.1365415,longitude:-86.2429205,descripcion:"Casa Comunal"}
// ,{id:1630,latitude:12.1485780253,longitude:-86.202972925,descripcion:"Entrada Barrio Hugo Chávez"}
// ,{id:1631,latitude:12.1616511,longitude:-86.36528955,descripcion:"Entrada Nueva Vida"}
// ,{id:1632,latitude:12.12997565,longitude:-86.2016864501,descripcion:"Entrada Norte a Laureles Norte"}
// ,{id:1633,latitude:12.1053303501,longitude:-86.2726513503,descripcion:"Entrada Miguel Bonilla"}
// ,{id:1634,latitude:12.1263223,longitude:-86.2289188,descripcion:"UNACAD"}
// ,{id:1635,latitude:12.1241595,longitude:-86.237835,descripcion:"Hospital La Mascota"}
// ,{id:1636,latitude:12.124225,longitude:-86.2294779,descripcion:"Farmacia Éxodo"}
// ,{id:1637,latitude:12.1497449,longitude:-86.2819507,descripcion:"Estación Julio Buitrago"}
// ,{id:1638,latitude:12.1401235,longitude:-86.2549435,descripcion:"Central de Azulejos"}
// ,{id:1639,latitude:12.1586078,longitude:-86.2419484,descripcion:"Escuela Comunal Las Torres"}
// ,{id:1640,latitude:12.1310236,longitude:-86.2528149,descripcion:"Farmacia Alvarado"}
// ,{id:1641,latitude:12.1404453,longitude:-86.2566157,descripcion:"Iglesia Bautista Eben Ezer"}
// ,{id:1642,latitude:12.0988348,longitude:-86.2316082,descripcion:"Consulado Polonia"}
// ,{id:1643,latitude:12.10787,longitude:-86.2373605,descripcion:"Cruce Walter Ferreti"}
// ,{id:1644,latitude:12.1167964,longitude:-86.2975497,descripcion:"Iglesia San Judas Tadeo"}
// ,{id:1645,latitude:12.1273574501,longitude:-86.2095206499,descripcion:"Colegio Inmaculada Concepción"}
// ,{id:1646,latitude:12.1157701,longitude:-86.2386223,descripcion:"Escuela Japón Nicaragua"}
// ,{id:1647,latitude:12.1587076,longitude:-86.2392033,descripcion:"Boulevard Pedro Joaquín Chamorro"}
// ,{id:1648,latitude:12.1512175,longitude:-86.3105,descripcion:"INIFOM"}
// ,{id:1649,latitude:12.1576145,longitude:-86.2923355,descripcion:"Mercado Oriental II"}
// ,{id:1650,latitude:12.1499547,longitude:-86.3195845,descripcion:"Terminal de la Ruta 114"}
// ,{id:1651,latitude:12.1310264,longitude:-86.2529213,descripcion:"Farmacia Alvarado"}
// ,{id:1652,latitude:12.1485619,longitude:-86.275981,descripcion:"INSS"}
// ,{id:1653,latitude:12.1489305,longitude:-86.2084454,descripcion:"Gasolinera Barrio Waspán"}
// ,{id:1654,latitude:12.1390312,longitude:-86.2090914,descripcion:"Entrada Villa Fraternidad"}
// ,{id:1655,latitude:12.1292995,longitude:-86.1994572,descripcion:"Los Laureles Norte"}
// ,{id:1656,latitude:12.1356392,longitude:-86.2089084,descripcion:"9 de Junio"}
// ,{id:1657,latitude:12.1457823,longitude:-86.2094609,descripcion:"Waspán Sur"}
// ,{id:1658,latitude:12.1428877,longitude:-86.2098765,descripcion:"Pulpería Amanda"}
// ,{id:1659,latitude:12.1063703,longitude:-86.2723693,descripcion:"UNAN Oeste"}
// ,{id:1660,latitude:12.1284808,longitude:-86.1963643,descripcion:"Terminal 111"}
// ,{id:1661,latitude:12.1479016,longitude:-86.1931916,descripcion:"La Subasta"}
// ,{id:1662,latitude:12.1522055,longitude:-86.2850996,descripcion:"Ministerio de Hacienda y Crédito Público"}
// ,{id:1663,latitude:12.1205556,longitude:-86.2092061,descripcion:"La Chelita"}
// ,{id:1664,latitude:12.1342363,longitude:-86.290305,descripcion:"Farmacia David"}
// ,{id:1665,latitude:12.1000334,longitude:-86.2746992,descripcion:"Terminal Miguel Bonilla"}
// ,{id:1666,latitude:12.1284858,longitude:-86.2285137,descripcion:"La salida"}
// ,{id:1667,latitude:12.069394,longitude:-86.1996438,descripcion:"Terminal Esquipulas"}
// ,{id:1668,latitude:12.11167,longitude:-86.227685,descripcion:"Centro de Salud Carlos Rugama"}
// ,{id:1669,latitude:12.1395465,longitude:-86.1960415,descripcion:"Concepción de María"}
// ,{id:1670,latitude:12.134993,longitude:-86.2169395,descripcion:"Colegio Edgard Arvizú"}
// ,{id:1671,latitude:12.1354058,longitude:-86.2171753,descripcion:"Colegio Edgard Arvizú"}
// ,{id:1672,latitude:12.1207489,longitude:-86.2354422,descripcion:"La Fuente"}
// ,{id:1673,latitude:12.1245306,longitude:-86.2178459,descripcion:"Iglesia Mormona"}
// ,{id:1674,latitude:12.1464041,longitude:-86.2383981,descripcion:"El Colonial"}
// ,{id:1675,latitude:12.07634465,longitude:-86.21325085,descripcion:"La Ermita de Esquipulas"}
// ,{id:1676,latitude:12.084386,longitude:-86.23939695,descripcion:"La Estancia"}
// ,{id:1677,latitude:12.1193365,longitude:-86.2162905,descripcion:"Farmacia Daga"}
// ,{id:1678,latitude:12.1399645,longitude:-86.307516,descripcion:"ENACAL"}
// ,{id:1679,latitude:12.1194055,longitude:-86.2070706,descripcion:"Pulpería Meydar"}
// ,{id:1680,latitude:12.1116619,longitude:-86.2337487,descripcion:"Farmacia Schick"}
// ,{id:1681,latitude:12.0741044,longitude:-86.1967317,descripcion:"Colegio Pablo Antonio Cuadra"}
// ,{id:1682,latitude:12.1077542,longitude:-86.2237022,descripcion:"Farmacia Balgar"}
// ,{id:1683,latitude:12.102508,longitude:-86.2237842,descripcion:"Villa Cuba Libre"}
// ,{id:1684,latitude:12.1423045,longitude:-86.2532899,descripcion:"Casa del Adulto Mayor"}
// ,{id:1685,latitude:12.1417582,longitude:-86.1956231,descripcion:"Los Rieles"}
// ,{id:1686,latitude:12.091587,longitude:-86.1995512,descripcion:"Iglesia de Dios de la Profecía Libre"}
// ,{id:1687,latitude:12.137198,longitude:-86.2361023,descripcion:"Centro Escolar Peniel"}
// ,{id:1688,latitude:12.1206488,longitude:-86.2327811,descripcion:"Pollos Al Carbón"}
// ,{id:1689,latitude:12.1266587,longitude:-86.2066634,descripcion:"El Madroño"}
// ,{id:1690,latitude:12.1209491,longitude:-86.2308747,descripcion:"Farmacia San Agustín"}
// ,{id:1691,latitude:12.1254386,longitude:-86.2308942,descripcion:"Restaurante Te HO"}
// ,{id:1692,latitude:12.1288595,longitude:-86.2214981,descripcion:"Centro de Copias"}
// ,{id:1693,latitude:12.1667041,longitude:-86.3647498,descripcion:"Parque Zona 5"}
// ,{id:1694,latitude:12.1502685,longitude:-86.2233531,descripcion:"Banpro Portezuelo"}
// ,{id:1695,latitude:12.1193278,longitude:-86.216402,descripcion:"Farmacia Daga"}
// ,{id:1696,latitude:12.1118499,longitude:-86.2269536,descripcion:"Centro Escolar María Socorro Ponce"}
// ,{id:1697,latitude:12.1667198,longitude:-86.3646317,descripcion:"Parque Zona 5"}
// ,{id:1698,latitude:12.1369545,longitude:-86.2339071,descripcion:"Autolavado El Ceibón"}
// ,{id:1699,latitude:12.1524528,longitude:-86.2585299,descripcion:"El Cazador S.A."}
// ,{id:1700,latitude:12.1141228,longitude:-86.2827922,descripcion:"Entrada"}
// ,{id:1701,latitude:12.1091407,longitude:-86.2276132,descripcion:"Escuela Adventista"}
// ,{id:1702,latitude:12.1500529,longitude:-86.3411405,descripcion:"La Panadería"}
// ,{id:1703,latitude:12.1358344,longitude:-86.246004,descripcion:"Farmacia Cáceres"}
// ,{id:1704,latitude:12.0988593,longitude:-86.227063,descripcion:"Terminal 165"}
// ,{id:1705,latitude:12.1504393,longitude:-86.2251332,descripcion:"Casa de las Mangueras"}
// ,{id:1706,latitude:12.1124442,longitude:-86.2828271,descripcion:"Benito Juárez"}
// ,{id:1707,latitude:12.1149004,longitude:-86.2830126,descripcion:"Rosa de Sarón"}
// ,{id:1708,latitude:12.1131993,longitude:-86.2866395,descripcion:"Bosques de Nejapa"}
// ,{id:1709,latitude:12.1091217,longitude:-86.2832944,descripcion:"Pulpería La Pista"}
// ,{id:1710,latitude:12.1164311,longitude:-86.2830075,descripcion:"Hialeah"}
// ,{id:1711,latitude:12.1104103,longitude:-86.28684,descripcion:"Barrio Memorial Sandino"}
// ,{id:1712,latitude:12.1390351,longitude:-86.3322064,descripcion:"KM 9 Motastepe"}
// ,{id:1713,latitude:12.1180414,longitude:-86.20273155,descripcion:"Ixchen"}
// ,{id:1714,latitude:12.1632887,longitude:-86.3479598,descripcion:"El Molino Zona 8"}
// ,{id:1715,latitude:12.1391244,longitude:-86.3323352,descripcion:"KM 9 Motastepe"}
// ,{id:1716,latitude:12.1535445,longitude:-86.349303,descripcion:"El Cruce de Reyes"}
// ,{id:1717,latitude:12.16284215,longitude:-86.3553875,descripcion:"Juzgados Ciudad Sandino"}
// ,{id:1718,latitude:12.1447392,longitude:-86.3490482,descripcion:"El parque de Bello Amanecer"}
// ,{id:1719,latitude:12.0819225501,longitude:-86.2267645,descripcion:"KM 10 1/2 Carretera Masaya"}
// ,{id:1720,latitude:12.13907975,longitude:-86.3322708,descripcion:"KM 9 Motastepe"}
// ,{id:1721,latitude:12.1447689,longitude:-86.3486836,descripcion:"El parque de Villa Soberana"}
// ,{id:1722,latitude:12.1662987,longitude:-86.354651,descripcion:"Iglesia San Francisco"}
// ,{id:1723,latitude:12.1535180337,longitude:-86.2575571668,descripcion:"Planta Eléctrica"}
// ,{id:1724,latitude:12.13733825,longitude:-86.23906085,descripcion:"Barrio Ducualí"}
// ,{id:1725,latitude:12.1169848667,longitude:-86.2975611667,descripcion:"Iglesia San Judas Tadeo"}
// ,{id:1726,latitude:12.1049926,longitude:-86.2475495,descripcion:"Galerías Santo Domingo Este"}
// ,{id:1727,latitude:12.1602874,longitude:-86.36287895,descripcion:"Pulpería Romero"}
// ,{id:1728,latitude:12.1077624,longitude:-86.2504843,descripcion:"Movistar"}
// ,{id:1729,latitude:12.1562422002,longitude:-86.2361461002,descripcion:"Incnik Raya"}
// ,{id:1730,latitude:12.1505856,longitude:-86.24604395,descripcion:"CECNA"}
// ,{id:1731,latitude:12.16658405,longitude:-86.3466521,descripcion:"San Benito"}
// ,{id:1732,latitude:12.1478880504,longitude:-86.2888072501,descripcion:"Salud Integral"}
// ,{id:1733,latitude:12.1053426001,longitude:-86.2235524499,descripcion:"Salomón Moreno"}
// ,{id:1734,latitude:12.119236,longitude:-86.2735044,descripcion:"Semáforo Rigoberto López Pérez"}
// ,{id:1735,latitude:12.15231165,longitude:-86.2429554,descripcion:"SINSA Carretera Norte"}
// ,{id:1736,latitude:12.1222773,longitude:-86.2376386,descripcion:"Alesio Blandón 2"}
// ,{id:1737,latitude:12.1125085,longitude:-86.2980059,descripcion:"El Nancite"}
// ,{id:1738,latitude:12.1345203,longitude:-86.266001,descripcion:"Serrano"}
// ,{id:1739,latitude:12.1383216,longitude:-86.2239683,descripcion:"RUPAP"}
// ,{id:1740,latitude:12.1535302,longitude:-86.2591388,descripcion:"ENABAS"}
// ,{id:1741,latitude:12.1145491,longitude:-86.1906751,descripcion:"Pulpería Rosita"}
// ,{id:1742,latitude:12.1266167,longitude:-86.2232401,descripcion:"Parque Primero de Mayo"}
// ,{id:1743,latitude:12.1360957,longitude:-86.2769441,descripcion:"Mabale"}
// ,{id:1744,latitude:12.0941406,longitude:-86.3100861,descripcion:"Camilo Ortega 2"}
// ,{id:1745,latitude:12.1359262,longitude:-86.276865,descripcion:"Hospital Militar"}
// ,{id:1746,latitude:12.1371361501,longitude:-86.1970873501,descripcion:"Pista El Mayoreo"}
// ,{id:1747,latitude:12.1243319501,longitude:-86.20042115,descripcion:"Andrés Castro"}
// ,{id:1748,latitude:12.1302349,longitude:-86.2016047,descripcion:"Entrada Norte a Laureles Norte"}
// ,{id:1749,latitude:12.14963345,longitude:-86.336376,descripcion:"Chilamate"}
// ,{id:1750,latitude:12.1338965,longitude:-86.199187,descripcion:"Semáforos Mayoreo"}
// ,{id:1751,latitude:12.1277488,longitude:-86.2032044,descripcion:"2 de Agosto"}
// ,{id:1752,latitude:12.1117599502,longitude:-86.2273193001,descripcion:"Centro de Salud Carlos Rugama"}
// ,{id:1753,latitude:12.11278325,longitude:-86.3114111999,descripcion:"Centro Kairos"}
// ,{id:1754,latitude:12.1421646,longitude:-86.2187588,descripcion:"Auto Lavado La Máquina"}
// ,{id:1755,latitude:12.1593842,longitude:-86.28210385,descripcion:"Cristo del Rosario Oeste"}
// ,{id:1756,latitude:12.1078502,longitude:-86.23746635,descripcion:"Cruce Walter Ferreti"}
// ,{id:1757,latitude:12.09798765,longitude:-86.2486013,descripcion:"Cruz Verde"}
// ,{id:1758,latitude:12.1578166003,longitude:-86.2952371501,descripcion:"Cuadro Gadala María"}
// ,{id:1759,latitude:12.1402143,longitude:-86.2654852,descripcion:"Cruz Azul"}
// ,{id:1760,latitude:12.1414221,longitude:-86.2176447,descripcion:"Entrada Colonia Rubén Darío"}
// ,{id:1761,latitude:12.1492972,longitude:-86.2115917,descripcion:"Auto Hotel La Primavera"}
// ,{id:1762,latitude:12.155934,longitude:-86.2898825,descripcion:"Asados El Novillo"}
// ,{id:1763,latitude:12.1368968,longitude:-86.2587209,descripcion:"Colegio Cristo Rey"}
// ,{id:1764,latitude:12.1484699,longitude:-86.2035853,descripcion:"Entrada Barrio Hugo Chávez"}
// ,{id:1765,latitude:12.1141176,longitude:-86.2829183,descripcion:"Entrada"}
// ,{id:1766,latitude:12.1526551,longitude:-86.2680465,descripcion:"Petronic"}
// ,{id:1767,latitude:12.1391109,longitude:-86.2307829,descripcion:"Las Sopas"}
// ,{id:1768,latitude:12.11931515,longitude:-86.2835258,descripcion:"Farmacia El Valle"}
// ,{id:1769,latitude:12.1030081,longitude:-86.2627715,descripcion:"Club Terraza"}
// ,{id:1770,latitude:12.1038821,longitude:-86.26271,descripcion:"Villa Fontana"}
// ,{id:1771,latitude:12.14798895,longitude:-86.29206275,descripcion:"Farmacia Dayser"}
// ,{id:1772,latitude:12.13700535,longitude:-86.23390345,descripcion:"Autolavado El Ceibón"}
// ,{id:1773,latitude:12.1489737,longitude:-86.2815874,descripcion:"El Bóer"}
// ,{id:1774,latitude:12.1025052,longitude:-86.2239177,descripcion:"Villa Cuba Libre"}
// ,{id:1775,latitude:12.13156305,longitude:-86.3102200001,descripcion:"Asososca"}
// ,{id:1776,latitude:12.0987871,longitude:-86.30224295,descripcion:"Farmacia El Maestro"}
// ,{id:1777,latitude:12.14721065,longitude:-86.24394035,descripcion:"Auto Servicios Pacheco"}
// ,{id:1778,latitude:12.1515532,longitude:-86.2680931,descripcion:"Pulpería Moisés y José"}
// ,{id:1779,latitude:12.1033359,longitude:-86.2217534,descripcion:"Pulpería El Alfarero"}
// ,{id:1780,latitude:12.10562895,longitude:-86.23331955,descripcion:"Farmacia Eva"}
// ,{id:1781,latitude:12.0919902,longitude:-86.3071427,descripcion:"La Económica"}
// ,{id:1782,latitude:12.1116498,longitude:-86.2970857,descripcion:"El Nancite"}
// ,{id:1783,latitude:12.1475964,longitude:-86.1876109,descripcion:"Entrada Unidad de Propósitos"}
// ,{id:1784,latitude:12.10898835,longitude:-86.20946745,descripcion:"Entrada Villa Milagro"}
// ,{id:1785,latitude:12.124003175,longitude:-86.1986991,descripcion:"Entrada Sur a Laureles Norte"}
// ,{id:1786,latitude:12.13903175,longitude:-86.2090226,descripcion:"Entrada Villa Fraternidad"}
// ,{id:1787,latitude:12.122642,longitude:-86.1656507,descripcion:"Centro Escolar Benito Pitito"}
// ,{id:1788,latitude:12.16836835,longitude:-86.3435799,descripcion:"Entrada a Ciudad Sandino"}
// ,{id:1789,latitude:12.163497,longitude:-86.3572732,descripcion:"Distribuidora Comandante Eduardo"}
// ,{id:1790,latitude:12.152816,longitude:-86.3037752,descripcion:"Sofecons"}
// ,{id:1791,latitude:12.1497823,longitude:-86.3045845,descripcion:"ESCASAN"}
// ,{id:1792,latitude:12.1243012,longitude:-86.3044536,descripcion:"Centro Comercial Nejapa"}
// ,{id:1793,latitude:12.1238429,longitude:-86.1986682,descripcion:"Entrada Sur a Laureles Norte"}
// ,{id:1794,latitude:12.1523469001,longitude:-86.3061885001,descripcion:"Centro Comercial Linda Vista"}
// ,{id:1795,latitude:12.163569,longitude:-86.3648563,descripcion:"Centro Comercial Francisco"}
// ,{id:1796,latitude:12.1507519,longitude:-86.2800596,descripcion:"Lubricantes San José"}
// ,{id:1797,latitude:12.1243185,longitude:-86.2006569,descripcion:"Andrés Castro"}
// ,{id:1798,latitude:12.1343184,longitude:-86.2994045,descripcion:"Parque Héroes y Mártires"}
// ,{id:1799,latitude:12.1504352,longitude:-86.2767002,descripcion:"Movimiento María Elena Cuadra"}
// ,{id:1800,latitude:12.1360896,longitude:-86.2383542,descripcion:"Barrio Meneses"}
// ,{id:1801,latitude:12.1343532,longitude:-86.2342821,descripcion:"Colegio San Rafael"}
// ,{id:1802,latitude:12.11626095,longitude:-86.293979,descripcion:"Centro Educativo Especial Melania Morales"}
// ,{id:1803,latitude:12.1345906,longitude:-86.2364979,descripcion:"Villa Don Bosco"}
// ,{id:1804,latitude:12.1730343,longitude:-86.3461839,descripcion:"Maxi Palí"}
// ,{id:1805,latitude:12.1504987,longitude:-86.26785,descripcion:"DNP Petrolub"}
// ,{id:1806,latitude:12.1773447,longitude:-86.3514894,descripcion:"Parque Zetapark"}
// ,{id:1807,latitude:12.1803965,longitude:-86.355385,descripcion:"Zaratoga"}
// ,{id:1808,latitude:12.1826559,longitude:-86.3592303,descripcion:"Ciudad Sandino Entrada Norte"}
// ,{id:1809,latitude:12.1370562,longitude:-86.2338998,descripcion:"Autolavado El Ceibón"}
// ,{id:1810,latitude:12.14001,longitude:-86.2102432,descripcion:"Cafetín Coco"}
// ,{id:1811,latitude:12.1328202,longitude:-86.2419456,descripcion:"Minisúper El Punto"}
// ,{id:1812,latitude:12.1344783,longitude:-86.2145981,descripcion:"Villa 9 de Junio"}
// ,{id:1813,latitude:12.1348346,longitude:-86.2118997,descripcion:"El Puente 9 de Junio"}
// ,{id:1814,latitude:12.1438853,longitude:-86.2619587,descripcion:"La Católica"}
// ,{id:1815,latitude:12.1497807,longitude:-86.2174661,descripcion:"Agri-Corp Norte"}
// ,{id:1816,latitude:12.1554904,longitude:-86.2197255,descripcion:"Super Express"}
// ,{id:1817,latitude:12.1311815,longitude:-86.2916659,descripcion:"Pulpería Gema"}
// ,{id:1818,latitude:12.131794,longitude:-86.291665,descripcion:"Pulpería Gema"}
// ,{id:1819,latitude:12.1523113,longitude:-86.2899656,descripcion:"Agrosa"}
// ,{id:1820,latitude:12.1538379,longitude:-86.2294976,descripcion:"Agricons"}
// ,{id:1821,latitude:12.1516419,longitude:-86.3046242,descripcion:"Linda Vista Sur"}
// ,{id:1822,latitude:12.1364105,longitude:-86.2198325,descripcion:"UPOLI Sur"}
// ,{id:1823,latitude:12.1420893,longitude:-86.2494754,descripcion:"La Tiendona"}
// ,{id:1824,latitude:12.1360246,longitude:-86.2290724,descripcion:"Cooperativa Parrales Vallejos"}
// ,{id:1825,latitude:12.1505901,longitude:-86.3131494,descripcion:"Clínica Bethel Las Brisas"}
// ,{id:1826,latitude:12.1500725,longitude:-86.34126955,descripcion:"La Panadería"}
// ,{id:1827,latitude:12.1466707501,longitude:-86.3487591,descripcion:"La Moncha"}
// ,{id:1828,latitude:12.09602785,longitude:-86.3047211,descripcion:"Colegio La Hispanidad"}
// ,{id:1829,latitude:12.165461875,longitude:-86.362816375,descripcion:"La Palmera"}
// ,{id:1830,latitude:12.1261985,longitude:-86.1586671,descripcion:"Terminal 163"}
// ,{id:1831,latitude:12.1633231,longitude:-86.2935235,descripcion:"Pulpería Karla"}
// ,{id:1832,latitude:12.1374296,longitude:-86.2390892,descripcion:"Barrio Ducualí"}
// ,{id:1833,latitude:12.1482207,longitude:-86.2373478,descripcion:"Colonial Norte"}
// ,{id:1834,latitude:12.1517262,longitude:-86.2562558,descripcion:"Alcohólicos Anónimos"}
// ,{id:1835,latitude:12.1315413,longitude:-86.2406016,descripcion:"Don Bosco"}
// ,{id:1836,latitude:12.145393,longitude:-86.2532633,descripcion:"Semáforos de Ciudad Jardín"}
// ,{id:1837,latitude:12.1613314,longitude:-86.2937292,descripcion:"Huellas de Acahualinca"}
// ,{id:1838,latitude:12.1518578,longitude:-86.2586742,descripcion:"El Calvario"}
// ,{id:1839,latitude:12.1600672,longitude:-86.2938566,descripcion:"Parque Acahualinca"}
// ,{id:1840,latitude:12.1568872,longitude:-86.2344285,descripcion:"Pulpería La Chontaleña"}
// ,{id:1841,latitude:12.1457578,longitude:-86.2093672,descripcion:"Waspán Sur"}
// ,{id:1842,latitude:12.1374034,longitude:-86.2378867,descripcion:"TAMENICSA"}
// ,{id:1843,latitude:12.0747503,longitude:-86.2177919,descripcion:"Palí"}
// ,{id:1844,latitude:12.1283768,longitude:-86.1964043,descripcion:"Terminal 111"}
// ,{id:1845,latitude:12.1450611,longitude:-86.2598667,descripcion:"Gancho de Camino Este"}
// ,{id:1846,latitude:12.1143444,longitude:-86.2322105,descripcion:"Pulpería Latina"}
// ,{id:1847,latitude:12.1551064,longitude:-86.2823926,descripcion:"Cancha de Santa Ana"}
// ,{id:1848,latitude:12.1552743,longitude:-86.2968772,descripcion:"Paraisito"}
// ,{id:1849,latitude:12.1229974,longitude:-86.1910982,descripcion:"Bayer"}
// ,{id:1850,latitude:12.1560254,longitude:-86.2240433,descripcion:"Comedor Fátima"}
// ,{id:1851,latitude:12.1256937,longitude:-86.2932597,descripcion:"Entrada al Pilar"}
// ,{id:1852,latitude:12.146676,longitude:-86.3489551,descripcion:"La Moncha"}
// ,{id:1853,latitude:12.1519256,longitude:-86.3485468,descripcion:"La primera casa"}
// ,{id:1854,latitude:12.13469,longitude:-86.3359241,descripcion:"La Bloquera"}
// ,{id:1855,latitude:12.1466655,longitude:-86.3485631,descripcion:"La Moncha"}
// ,{id:1856,latitude:12.1333759,longitude:-86.337682,descripcion:"La Apostolica"}
// ,{id:1857,latitude:12.1345511,longitude:-86.3357606,descripcion:"La Bloquera"}
// ,{id:1858,latitude:12.13328115,longitude:-86.33755385,descripcion:"La Apostolica"}
// ,{id:1859,latitude:12.1491618,longitude:-86.1941479,descripcion:"Bertha Díaz"}
// ,{id:1860,latitude:12.1391920003,longitude:-86.3316388494,descripcion:"KM 9"}
// ,{id:1861,latitude:12.1523852,longitude:-86.34095665,descripcion:"La Casa de Campaña"}
// ,{id:1862,latitude:12.13462055,longitude:-86.33584235,descripcion:"La Bloquera"}
// ,{id:1863,latitude:12.1205336,longitude:-86.20913625,descripcion:"La Chelita"}
// ,{id:1864,latitude:12.1228546,longitude:-86.2384232,descripcion:"Alesio Blandón"}
// ,{id:1865,latitude:12.1229826,longitude:-86.2383192,descripcion:"Alesio Blandón"}
// ,{id:1866,latitude:12.1533583,longitude:-86.3025501,descripcion:"División Comercial Morazán"}
// ,{id:1867,latitude:12.151989,longitude:-86.2490227,descripcion:"Universidad de las Américas"}
// ,{id:1868,latitude:12.1455964,longitude:-86.2633523,descripcion:"El Panal"}
// ,{id:1869,latitude:12.0981153,longitude:-86.2485975,descripcion:"Cruz Verde"}
// ,{id:1870,latitude:12.0752278,longitude:-86.2292758,descripcion:"Casa España"}
// ,{id:1871,latitude:12.0878751,longitude:-86.2424188,descripcion:"El Cruce Santo Domingo"}
// ,{id:1872,latitude:12.1018867,longitude:-86.2499584,descripcion:"Taller El Chele"}
// ,{id:1873,latitude:12.0789722,longitude:-86.256796,descripcion:"Terminal San Isidro"}
// ,{id:1874,latitude:12.1460726,longitude:-86.1761987,descripcion:"Aduana"}
// ,{id:1875,latitude:12.1650505,longitude:-86.2942734,descripcion:"Terminal Huellas de Acahualinca"}
// ,{id:1876,latitude:12.1542084,longitude:-86.2758641,descripcion:"Polideportivo Alexis Argüello"}
// ,{id:1877,latitude:12.1489855,longitude:-86.2533429,descripcion:"Bodega SERMESA"}
// ,{id:1878,latitude:12.123051,longitude:-86.2443726,descripcion:"Mercado Huembes Suroeste"}
// ,{id:1879,latitude:12.0740573,longitude:-86.1968422,descripcion:"Colegio Pablo Antonio Cuadra"}
// ,{id:1880,latitude:12.1445638,longitude:-86.3349548,descripcion:"Satelite de Asososca"}
// ,{id:1881,latitude:12.1579410251,longitude:-86.29965185,descripcion:"Talleres Pellas"}
// ,{id:1882,latitude:12.1321478,longitude:-86.2954496,descripcion:"Palí Altagracia"}
// ,{id:1883,latitude:12.14027495,longitude:-86.2141946499,descripcion:"Semáforos San Jacinto"}
// ,{id:1884,latitude:12.1666526,longitude:-86.3607633,descripcion:"Puente de la Zona #5"}
// ,{id:1885,latitude:12.1665084,longitude:-86.3606802,descripcion:"Puente de la Zona #5"}
// ,{id:1886,latitude:12.1450105,longitude:-86.29941815,descripcion:"Taller Murillo"}
// ,{id:1887,latitude:12.0818938,longitude:-86.226514,descripcion:"KM 10 1/2 Carretera Masaya"}
// ,{id:1888,latitude:12.1502297,longitude:-86.2971863,descripcion:"Farmacia Bravo"}
// ,{id:1889,latitude:12.1620081,longitude:-86.3648286,descripcion:"Entrada a Nueva Vida"}
// ,{id:1890,latitude:12.156683,longitude:-86.3705879,descripcion:"Terminal 113"}
// ,{id:1891,latitude:12.1684369,longitude:-86.3436137,descripcion:"Entrada a Ciudad Sandino"}
// ,{id:1892,latitude:12.1399753,longitude:-86.2971417,descripcion:"Taller El Pelón"}
// ,{id:1893,latitude:12.1521258,longitude:-86.2971893,descripcion:"Monseñor Lezcano"}
// ,{id:1894,latitude:12.1635638,longitude:-86.3648919,descripcion:"Centro Comercial Francisco"}
// ,{id:1895,latitude:12.0683818,longitude:-86.2006271,descripcion:"Terminal Los Vanegas"}
// ,{id:1896,latitude:12.1334807,longitude:-86.2732251,descripcion:"CCNN"}
// ,{id:1897,latitude:12.1592849,longitude:-86.27917415,descripcion:"Cristo del Rosario Este"}
// ,{id:1898,latitude:12.1373426,longitude:-86.2409498,descripcion:"Sagrada Familia"}
// ,{id:1899,latitude:12.1240858056,longitude:-86.182391752,descripcion:"Cortijo La Sabana"}
// ,{id:1900,latitude:12.1455212,longitude:-86.26224925,descripcion:"Policía Distrito I Norte"}
// ,{id:1901,latitude:12.152267,longitude:-86.2548632,descripcion:"El Cazador S.A."}
// ,{id:1902,latitude:12.1522682,longitude:-86.2549224,descripcion:"Los Ángeles Barbería"}
// ,{id:1903,latitude:12.1397669,longitude:-86.2454489,descripcion:"Iglesia de Dios"}
// ,{id:1904,latitude:12.14561,longitude:-86.2376122,descripcion:"Parque Maestro Gabriel"}
// ,{id:1905,latitude:12.1036964,longitude:-86.2693558,descripcion:"UNAN Sur"}
// ,{id:1906,latitude:12.1568687,longitude:-86.1988398,descripcion:"Terminal Barrio Camilo Chamorro"}
// ,{id:1907,latitude:12.1080401,longitude:-86.2650568,descripcion:"Colegio La Anunciación"}
// ,{id:1908,latitude:12.1025877,longitude:-86.2663206,descripcion:"Porta"}
// ,{id:1909,latitude:12.1026878,longitude:-86.2656662,descripcion:"Porta"}
// ,{id:1910,latitude:12.1036152,longitude:-86.2695657,descripcion:"UNAN Sur"}
// ,{id:1911,latitude:12.1512344,longitude:-86.2972763,descripcion:"Avenida de las Milicias"}
// ,{id:1912,latitude:12.1065206,longitude:-86.2975631,descripcion:"Colegio Rodolfo Rodríguez Alvarado"}
// ,{id:1913,latitude:12.1326683025,longitude:-86.2486565433,descripcion:"Avenida Mártires"}
// ,{id:1914,latitude:12.13101205,longitude:-86.2938443,descripcion:"Farmacia Buendía"}
// ,{id:1915,latitude:12.1147258,longitude:-86.23629245,descripcion:"Avenida Isidro Centeno López"}
// ,{id:1916,latitude:12.10776975,longitude:-86.22362725,descripcion:"Farmacia Balgar"}
// ,{id:1917,latitude:12.1231959,longitude:-86.2969396,descripcion:"Parque Independencia"}
// ,{id:1918,latitude:12.1339784501,longitude:-86.2905580502,descripcion:"Farmacia David"}
// ,{id:1919,latitude:12.1578716,longitude:-86.2997557,descripcion:"Talleres Pellas"}
// ,{id:1920,latitude:12.16405225,longitude:-86.35168045,descripcion:"Ciber City"}
// ,{id:1921,latitude:12.16740755,longitude:-86.35830745,descripcion:"Ciber Extreme"}
// ,{id:1922,latitude:12.1288868,longitude:-86.1594599,descripcion:"Ciudad Belén"}
// ,{id:1923,latitude:12.18074905,longitude:-86.3561431,descripcion:"Ciudad Sandino Entrada Norte"}
// ,{id:1924,latitude:12.1310096,longitude:-86.2331681,descripcion:"Sucursal Rubenia - DISSUR"}
// ,{id:1925,latitude:12.0700769,longitude:-86.2137251,descripcion:"Entrada a la base"}
// ,{id:1926,latitude:12.0799416,longitude:-86.2585384,descripcion:"Entrada al Campo Deportivo"}
// ,{id:1927,latitude:12.0832692,longitude:-86.2607475,descripcion:"Pulpería Nidia"}
// ,{id:1928,latitude:12.0696420335,longitude:-86.215469,descripcion:"KM 12 Carretera Masaya / La Base"}
// ,{id:1929,latitude:12.16200735,longitude:-86.3647659,descripcion:"Entrada a Nueva Vida"}
// ,{id:1930,latitude:12.0934543,longitude:-86.2626693,descripcion:"Entrada a Los Vanegas"}
// ,{id:1931,latitude:12.11324725,longitude:-86.31561685,descripcion:"Entrada a San Patricio"}
// ,{id:1932,latitude:12.1035497,longitude:-86.2541775,descripcion:"Centro Ejecutivo San Marino"}
// ,{id:1933,latitude:12.1526398,longitude:-86.2605785,descripcion:"Antigua Cervecería Victoria"}
// ,{id:1934,latitude:12.1426301,longitude:-86.2567191,descripcion:"Autoservicios Mayorga"}
// ,{id:1935,latitude:12.1477696,longitude:-86.2747065,descripcion:"Arboretum"}
// ,{id:1936,latitude:12.1152469,longitude:-86.2977378,descripcion:"Comercial Enmanuel"}
// ,{id:1937,latitude:12.1505182,longitude:-86.2648623,descripcion:"Bar Santo Domingo"}
// ,{id:1938,latitude:12.109255,longitude:-86.2351046,descripcion:"Pino Uno"}
// ,{id:1939,latitude:12.1566088,longitude:-86.2111748,descripcion:"Terminal 108"}
// ,{id:1940,latitude:12.1281477,longitude:-86.2563324,descripcion:"Colonia Máximo Jerez Oeste"}
// ,{id:1941,latitude:12.128264,longitude:-86.3116084,descripcion:"Hospedaje Ángel"}
// ,{id:1942,latitude:12.1391025,longitude:-86.2059621,descripcion:"Materiales de construcción Howard"}
// ,{id:1943,latitude:12.1254602,longitude:-86.2544993,descripcion:"Altamira"}
// ,{id:1944,latitude:12.1509412,longitude:-86.2724192,descripcion:"Parque Luis Alfonso Velásquez"}
// ,{id:1945,latitude:12.1252619,longitude:-86.298904,descripcion:"Hospital Bertha Calderón"}
// ,{id:1946,latitude:12.1258127,longitude:-86.2849228,descripcion:"Rotonda El Periodista"}
// ,{id:1947,latitude:12.1210174,longitude:-86.2457915,descripcion:"Hospital Manolo Morales"}
// ,{id:1948,latitude:12.1205462,longitude:-86.2459136,descripcion:"Hospital Manolo Morales"}
// ,{id:1949,latitude:12.1350328,longitude:-86.23932755,descripcion:"Pulpería Machado"}
// ,{id:1950,latitude:12.1207615,longitude:-86.2217171,descripcion:"Iglesia Madre del Divino Amor"}
// ,{id:1951,latitude:12.1088413,longitude:-86.21295695,descripcion:"Cementerio Milagro de Dios"}
// ,{id:1952,latitude:12.09881855,longitude:-86.213373,descripcion:"Cementerio Las Jagüitas"}
// ,{id:1953,latitude:12.1136949,longitude:-86.1964842,descripcion:"Pulpería Coni"}
// ,{id:1954,latitude:12.1630257,longitude:-86.35425595,descripcion:"Cementerio Ciudad Sandino"}
// ,{id:1955,latitude:12.13944535,longitude:-86.2379299,descripcion:"Cementerio Oriental"}
// ,{id:1956,latitude:12.1454298,longitude:-86.2496346,descripcion:"Uniformes Nicky"}
// ,{id:1957,latitude:12.1183012,longitude:-86.1890278,descripcion:"Los Laureles Sur"}
// ,{id:1958,latitude:12.169996,longitude:-86.3590257,descripcion:"Enrique Schmidt"}
// ,{id:1959,latitude:12.1089985,longitude:-86.2095189,descripcion:"Entrada Villa Milagro"}
// ,{id:1960,latitude:12.1258854,longitude:-86.2367991,descripcion:"Santa Julia"}
// ,{id:1961,latitude:12.1241442,longitude:-86.3043903,descripcion:"Centro Comercial Nejapa"}
// ,{id:1962,latitude:12.1183951,longitude:-86.2492482,descripcion:"Centro Comercial Managua"}
// ,{id:1963,latitude:12.1226555,longitude:-86.2526517,descripcion:"Liceo Franciscano"}
// ,{id:1964,latitude:12.1401604,longitude:-86.2130453,descripcion:"Billares Pio Pio"}
// ,{id:1965,latitude:12.1551563,longitude:-86.2182259,descripcion:"Parque La Primavera"}
// ,{id:1966,latitude:12.1321234,longitude:-86.3101534,descripcion:"Asososca"}
// ,{id:1967,latitude:12.1401302,longitude:-86.2140615,descripcion:"Semáforos San Jacinto"}
// ,{id:1968,latitude:12.1380657,longitude:-86.3044868,descripcion:"Aldea SOS"}
// ,{id:1969,latitude:12.1118224,longitude:-86.2322182,descripcion:"Librería La Fe"}
// ,{id:1970,latitude:12.1472725,longitude:-86.1901114,descripcion:"Las Mercedes"}
// ,{id:1971,latitude:12.1467566,longitude:-86.1951493,descripcion:"Policía Distrito VI"}
// ,{id:1972,latitude:12.1387203,longitude:-86.246332,descripcion:"Semáforo El Paraisito"}
// ,{id:1973,latitude:12.1122441,longitude:-86.2247778,descripcion:"René Polanco"}
// ,{id:1974,latitude:12.1056161,longitude:-86.2331003,descripcion:"Farmacia Eva"}
// ,{id:1975,latitude:12.1211837,longitude:-86.2526237,descripcion:"Centro Médico Trinidad"}
// ,{id:1976,latitude:12.1244582,longitude:-86.3045169,descripcion:"Centro Comercial Nejapa"}
// ,{id:1977,latitude:12.1479353,longitude:-86.2920639,descripcion:"Farmacia Dayser"}
// ,{id:1978,latitude:12.146851,longitude:-86.2169269,descripcion:"Oswaldo Manzanares"}
// ,{id:1979,latitude:12.1434856,longitude:-86.2592914,descripcion:"Taller Lacayo"}
// ,{id:1980,latitude:12.1201247,longitude:-86.3141509,descripcion:"Puente Frawley"}
// ,{id:1981,latitude:12.1199606,longitude:-86.3143455,descripcion:"Puente Frawley"}
// ,{id:1982,latitude:12.1029169,longitude:-86.3083605,descripcion:"Pre-escolar Hossana"}
// ,{id:1983,latitude:12.1025649,longitude:-86.3081452,descripcion:"Pre-escolar Hossana"}
// ,{id:1984,latitude:12.0946523,longitude:-86.3070708,descripcion:"Plazoleta Camilo Ortega"}
// ,{id:1985,latitude:12.1442824,longitude:-86.23386,descripcion:"Rotonda Bello Horizonte Sur"}
// ,{id:1986,latitude:12.1699938,longitude:-86.3589417,descripcion:"Enrique Schmidt"}
// ,{id:1987,latitude:12.169433,longitude:-86.3589544,descripcion:"Iglesia Las Puertas del Cielo"}
// ,{id:1988,latitude:12.1694474,longitude:-86.3587909,descripcion:"Iglesia Las Puertas del Cielo"}
// ,{id:1989,latitude:12.167396,longitude:-86.3583545,descripcion:"Ciber Extreme"}
// ,{id:1990,latitude:12.1674191,longitude:-86.3582604,descripcion:"Ciber Extreme"}
// ,{id:1991,latitude:12.0905792,longitude:-86.3090825,descripcion:"Intersección de la Ruta 107"}
// ,{id:1992,latitude:12.0905019,longitude:-86.3090279,descripcion:"Intersección de la Ruta 107"}
// ,{id:1993,latitude:12.1526442,longitude:-86.2622589,descripcion:"Pulpería San José"}
// ,{id:1994,latitude:12.1235681,longitude:-86.2240269,descripcion:"Colegio Primero de Mayo"}
// ,{id:1995,latitude:12.1327668,longitude:-86.2525993,descripcion:"El Riguero"}
// ,{id:1996,latitude:12.1140153,longitude:-86.2389041,descripcion:"Pulpería Kony"}
// ,{id:1997,latitude:12.1096302,longitude:-86.2381888,descripcion:"Pulpería César"}
// ,{id:1998,latitude:12.1106399,longitude:-86.2379264,descripcion:"Puesto Médico Buitrago"}
// ,{id:1999,latitude:12.1408262,longitude:-86.239915,descripcion:"Escuela de Comercio"}
// ,{id:2000,latitude:12.1283718,longitude:-86.2158967,descripcion:"Mercado Iván Montenegro Sur"}
// ,{id:2001,latitude:12.126736,longitude:-86.2082489,descripcion:"Clínica Dental"}
// ,{id:2002,latitude:12.11212575,longitude:-86.30069045,descripcion:"Terminal San Judas"}
// ,{id:2003,latitude:12.1461795,longitude:-86.2242248,descripcion:"Parts Nation"}
// ,{id:2004,latitude:12.131025,longitude:-86.2528681,descripcion:"Farmacia Alvarado"}
// ,{id:2005,latitude:12.1161626,longitude:-86.21683125,descripcion:"Panadería Maritza Lucía"}
// ,{id:2006,latitude:12.1226168,longitude:-86.165589,descripcion:"Centro Escolar Benito Pitito"}
// ,{id:2007,latitude:12.1235956,longitude:-86.2135608,descripcion:"Colegio Villa Venezuela Sur"}
// ,{id:2008,latitude:12.1241956,longitude:-86.2156038,descripcion:"Colegio Villa Venezuela Oeste"}
// ,{id:2009,latitude:12.1251735,longitude:-86.2327216,descripcion:"Colegio 14 de Septiembre"}
// ,{id:2010,latitude:12.1219175,longitude:-86.2285494,descripcion:"Semáforos Jardines de Veracruz"}
// ,{id:2011,latitude:12.1243796,longitude:-86.1806164,descripcion:"Cortijo La Sabana"}
// ,{id:2012,latitude:12.123792,longitude:-86.1841671,descripcion:"Cortijo La Sabana"}
// ,{id:2013,latitude:12.1248658,longitude:-86.1747136,descripcion:"Cootracar"}
// ,{id:2014,latitude:12.1232532,longitude:-86.1882159,descripcion:"Comercial Fernández"}
// ,{id:2015,latitude:12.1565408,longitude:-86.3380154,descripcion:"Cuesta El Plomo Norte"}
// ,{id:2016,latitude:12.1332244,longitude:-86.2119803,descripcion:"El Triángulo"}
// ,{id:2017,latitude:12.1279566,longitude:-86.2141762,descripcion:"Mercado Iván Montenegro Sureste"}
// ,{id:2018,latitude:12.1412129,longitude:-86.2166246,descripcion:"Venta de Maderas Pablo"}
// ,{id:2019,latitude:12.1419467,longitude:-86.2183319,descripcion:"Barrio Carlos Marx"}
// ,{id:2020,latitude:12.131193,longitude:-86.2128542,descripcion:"Parroquia Nuestra Señora de las Américas"}
// ,{id:2021,latitude:12.1300835,longitude:-86.2128282,descripcion:"Barrio Américas 3"}
// ,{id:2022,latitude:12.1484887,longitude:-86.2142554,descripcion:"Pulpería Eveling"}
// ,{id:2023,latitude:12.1444475,longitude:-86.2687583,descripcion:"Ministerio de Gobernación"}
// ,{id:2024,latitude:12.1441494,longitude:-86.2673545,descripcion:"Comedor Hossana"}
// ,{id:2025,latitude:12.1415657,longitude:-86.2153644,descripcion:"Miguel Gutiérrez"}
// ,{id:2026,latitude:12.1356788,longitude:-86.2478592,descripcion:"0 de Junio"}
// ,{id:2027,latitude:12.1193664,longitude:-86.2835981,descripcion:"Farmacia El Valle"}
// ,{id:2028,latitude:12.1289775,longitude:-86.2451622,descripcion:"Auto Servicios"}
// ,{id:2029,latitude:12.1314195,longitude:-86.2445413,descripcion:"Farmacia San Miguel"}
// ,{id:2030,latitude:12.115815,longitude:-86.2369821,descripcion:"Pulpería Josseling"}
// ,{id:2031,latitude:12.1550838,longitude:-86.2184743,descripcion:"Parque La Primavera"}
// ,{id:2032,latitude:12.1441361,longitude:-86.2672785,descripcion:"Comedor Hossana"}
// ,{id:2033,latitude:12.14039735,longitude:-86.25662185,descripcion:"Club de billares"}
// ,{id:2034,latitude:12.1535828506,longitude:-86.2734777008,descripcion:"Cancillería"}
// ,{id:2035,latitude:12.1653456,longitude:-86.3577147,descripcion:"Mercadito (Ciudad Sandino)"}
// ,{id:2036,latitude:12.1547068,longitude:-86.3382647,descripcion:"Cuesta El Plomo Norte"}
// ,{id:2037,latitude:12.136986,longitude:-86.2019853,descripcion:"Villa Reconciliación"}
// ,{id:2038,latitude:12.1298796,longitude:-86.2172444,descripcion:"Mercado Iván Montenegro Oeste"}
// ,{id:2039,latitude:12.1433138,longitude:-86.3486305,descripcion:"Calle 8"}
// ,{id:2040,latitude:12.1412573,longitude:-86.3476053,descripcion:"Calle 12"}
// ,{id:2041,latitude:12.1388901,longitude:-86.3475329,descripcion:"Blanca 2"}
// ,{id:2042,latitude:12.1616626,longitude:-86.3469091,descripcion:"Toño Negro"}
// ,{id:2043,latitude:12.1616038,longitude:-86.3470262,descripcion:"Toño Negro"}
// ,{id:2044,latitude:12.1598454,longitude:-86.3501762,descripcion:"ALKE Ciudad Sandino"}
// ,{id:2045,latitude:12.1411905,longitude:-86.3478483,descripcion:"Calle 12"}
// ,{id:2046,latitude:12.15543,longitude:-86.2910826,descripcion:"ALKE"}
// ,{id:2047,latitude:12.1554633,longitude:-86.2917162,descripcion:"ALKE"}
// ,{id:2048,latitude:12.125536,longitude:-86.2846072,descripcion:"Rotonda El Periodista"}
// ,{id:2049,latitude:12.09163235,longitude:-86.19950465,descripcion:"Iglesia de Dios de la Profecía Libre"}
// ,{id:2050,latitude:12.13965155,longitude:-86.2455099,descripcion:"Iglesia de Dios"}
// ,{id:2051,latitude:12.0831165,longitude:-86.1919381999,descripcion:"Iglesia Solo Cristo Salva"}
// ,{id:2052,latitude:12.15755805,longitude:-86.2893934,descripcion:"Entrada Norte Iglesia Santa Ana"}
// ,{id:2053,latitude:12.1474824,longitude:-86.3428755,descripcion:"El Puente"}
// ,{id:2054,latitude:12.1468601,longitude:-86.335839,descripcion:"Diinsa"}
// ,{id:2055,latitude:12.1466157,longitude:-86.3354358,descripcion:"DIINSA"}
// ,{id:2056,latitude:12.1733074,longitude:-86.3667251,descripcion:"Colegio Cristiano el Edén"}
// ,{id:2057,latitude:12.1733205,longitude:-86.3665608,descripcion:"Colegio Cristiano el Edén"}
// ,{id:2058,latitude:12.1641129,longitude:-86.3517105,descripcion:"Ciber City"}
// ,{id:2059,latitude:12.1639916,longitude:-86.3516504,descripcion:"Ciber City"}
// ,{id:2060,latitude:12.1631387,longitude:-86.3542864,descripcion:"Cementerio Ciudad Sandino"}
// ,{id:2061,latitude:12.1629127,longitude:-86.3542255,descripcion:"Cementerio Ciudad Sandino"}
// ,{id:2062,latitude:12.1395414,longitude:-86.2111456,descripcion:"Puente San Jacinto"}
// ,{id:2063,latitude:12.1397033,longitude:-86.2108371,descripcion:"Puente San Jacinto"}
// ,{id:2064,latitude:12.0851913,longitude:-86.2402868,descripcion:"Iglesia de Santo Domingo"}
// ,{id:2065,latitude:12.1128592,longitude:-86.2571915,descripcion:"Lotería"}
// ,{id:2066,latitude:12.0844023,longitude:-86.2393321,descripcion:"La Estancia"}
// ,{id:2067,latitude:12.094091,longitude:-86.2464229,descripcion:"Notre Dame"}
// ,{id:2068,latitude:12.1049229,longitude:-86.2507428,descripcion:"El Establo"}
// ,{id:2069,latitude:12.0823101,longitude:-86.2326864,descripcion:"El Parque"}
// ,{id:2070,latitude:12.1125818,longitude:-86.2571778,descripcion:"Lotería"}
// ,{id:2071,latitude:12.0751476,longitude:-86.2096813,descripcion:"FUTEC"}
// ,{id:2072,latitude:12.1339029,longitude:-86.1978481,descripcion:"Parque Concepción de María"}
// ,{id:2073,latitude:12.082088,longitude:-86.230241,descripcion:"UNICA Sur"}
// ,{id:2074,latitude:12.074465,longitude:-86.2007268,descripcion:"Vistas de Esquipulas"}
// ,{id:2075,latitude:12.1458392,longitude:-86.3047371,descripcion:"Universidad Paulo Freire"}
// ,{id:2076,latitude:12.1506461,longitude:-86.3455658,descripcion:"Pulpería Ebenezer"}
// ,{id:2077,latitude:12.1399476,longitude:-86.29710875,descripcion:"Taller El Pelón"}
// ,{id:2078,latitude:12.1374603,longitude:-86.23788215,descripcion:"TAMENICSA"}
// ,{id:2079,latitude:12.151653,longitude:-86.1861893,descripcion:"Cayetana Alberta"}
// ,{id:2080,latitude:12.1286202,longitude:-86.2334854,descripcion:"Semáforos Nicarao"}
// ,{id:2081,latitude:12.1404648,longitude:-86.24886485,descripcion:"Taller Changai"}
// ,{id:2082,latitude:12.138311,longitude:-86.22707565,descripcion:"Semáforos Villa Progreso"}
// ,{id:2083,latitude:12.1453725,longitude:-86.2318381,descripcion:"Parque Amistad"}
// ,{id:2084,latitude:12.1599685,longitude:-86.3712155,descripcion:"El Coto"}
// ,{id:2085,latitude:12.1479743,longitude:-86.2876242,descripcion:"Montoya"}
// ,{id:2086,latitude:12.1679157,longitude:-86.3502011,descripcion:"Pinar del Río"}
// ,{id:2087,latitude:12.166032,longitude:-86.3492038,descripcion:"Plaza Padre Miguel"}
// ,{id:2088,latitude:12.1592012,longitude:-86.3642545,descripcion:"Pulpería Duarte"}
// ,{id:2089,latitude:12.1583352,longitude:-86.3680082,descripcion:"Redes de Solidaridad"}
// ,{id:2090,latitude:12.1464613,longitude:-86.2550958,descripcion:"El Gallo Más Gallo"}
// ,{id:2091,latitude:12.1602694,longitude:-86.3629165,descripcion:"Pulpería Romero"}
// ,{id:2092,latitude:12.1577413,longitude:-86.2920582,descripcion:"Mercado Oriental II"}
// ,{id:2093,latitude:12.1552659,longitude:-86.1888831,descripcion:"Transagro"}
// ,{id:2094,latitude:12.1443419,longitude:-86.2599037,descripcion:"Billares Millenium"}
// ,{id:2095,latitude:12.1562701,longitude:-86.2133627,descripcion:"Cervecería Toña"}
// ,{id:2096,latitude:12.1229875335,longitude:-86.2447386001,descripcion:"Mercado Huembes Suroeste"}
// ,{id:2097,latitude:12.1560616,longitude:-86.2222449,descripcion:"Puente La Primavera"}
// ,{id:2098,latitude:12.1047854,longitude:-86.22871,descripcion:"Terminal Reparto Schick"}
// ,{id:2099,latitude:12.1394353,longitude:-86.2280309,descripcion:"Multicentro Este"}
// ,{id:2100,latitude:12.1246008001,longitude:-86.2648297497,descripcion:"Ministerio Público"}
// ,{id:2101,latitude:12.10927745,longitude:-86.2351195,descripcion:"Bajada Chaparra"}
// ,{id:2102,latitude:12.152348,longitude:-86.2883806,descripcion:"Delicias del Volga"}
// ,{id:2103,latitude:12.123211,longitude:-86.22404705,descripcion:"Colegio Primero de Mayo"}
// ,{id:2104,latitude:12.1351994,longitude:-86.2170573999,descripcion:"Colegio Edgard Arvizú"}
// ,{id:2105,latitude:12.15878955,longitude:-86.37181065,descripcion:"Colegio Nueva Vida"}
// ,{id:2106,latitude:12.1342427,longitude:-86.2552642,descripcion:"Diesel Motors"}
// ,{id:2107,latitude:12.1523206,longitude:-86.2851342,descripcion:"Ministerio de Hacienda y Crédito Público"}
// ,{id:2108,latitude:12.1298361,longitude:-86.24527505,descripcion:"Colegio República de Colombia"}
// ,{id:2109,latitude:12.1165728,longitude:-86.2359256,descripcion:"Avenida Pochote"}
// ,{id:2110,latitude:12.098179,longitude:-86.2417249,descripcion:"KM 8 Carretera Masaya / Primera entrada a Las Colinas"}
// ,{id:2111,latitude:12.1084628,longitude:-86.1913433,descripcion:"Taller Olivas"}
// ,{id:2112,latitude:12.1546594,longitude:-86.3106215,descripcion:"Manuel Olivares Oeste"}
// ,{id:2113,latitude:12.1539601,longitude:-86.2729059,descripcion:"Cancillería"}
// ,{id:2114,latitude:12.16331805,longitude:-86.3478947,descripcion:"El Molino Zona 8"}
// ,{id:2115,latitude:12.1388677,longitude:-86.23242145,descripcion:"Bello Horizonte Sur"}
// ,{id:2116,latitude:12.1571503,longitude:-86.18821355,descripcion:"El Molino"}
// ,{id:2117,latitude:12.14184525,longitude:-86.2207392501,descripcion:"El Manguito"}
// ,{id:2118,latitude:12.1545123,longitude:-86.2427213,descripcion:"Colegio Sacuanjoche"}
// ,{id:2119,latitude:12.1078304,longitude:-86.2375722,descripcion:"Cruce Walter Ferreti"}
// ,{id:2120,latitude:12.1526891,longitude:-86.2638327,descripcion:"Vuelta Casa de las Mangueras"}
// ,{id:2121,latitude:12.1403494,longitude:-86.256628,descripcion:"Iglesia Bautista Eben Ezer"}
// ,{id:2122,latitude:12.0989232,longitude:-86.2325969,descripcion:"Embajada de España"}
// ,{id:2123,latitude:12.1057268,longitude:-86.2333634,descripcion:"Farmacia Eva"}
// ,{id:2124,latitude:12.1314151,longitude:-86.2446397,descripcion:"Farmacia San Miguel"}
// ,{id:2125,latitude:12.1296295,longitude:-86.2531302,descripcion:"Colonia Máximo Jerez"}
// ,{id:2126,latitude:12.1081833,longitude:-86.2336454,descripcion:"Miscelánea Kathin"}
// ,{id:2127,latitude:12.1420061,longitude:-86.2500279,descripcion:"Infinitus"}
// ,{id:2128,latitude:12.1296217,longitude:-86.265121,descripcion:"Catedral de Managua"}
// ,{id:2129,latitude:12.1291409,longitude:-86.2229013,descripcion:"Villa Austria"}
// ,{id:2130,latitude:12.0947227,longitude:-86.3072444,descripcion:"Iglesia Pentecostal Unida Camilo Ortega"}
// ,{id:2131,latitude:12.1381717,longitude:-86.2035891,descripcion:"MATEPSA"}
// ,{id:2132,latitude:12.1394397,longitude:-86.2086479,descripcion:"Maxi Palí Larreynaga"}
// ,{id:2133,latitude:12.1378376,longitude:-86.203795,descripcion:"MATEPSA"}
// ,{id:2134,latitude:12.1349832,longitude:-86.1946597,descripcion:"Mercado Mayoreo"}
// ,{id:2135,latitude:12.1294067,longitude:-86.2648083,descripcion:"Catedral de Managua"}
// ,{id:2136,latitude:12.1253996,longitude:-86.2998255,descripcion:"Mercado Israel Lewites Sur"}
// ,{id:2137,latitude:12.1044254,longitude:-86.2202575,descripcion:"Gimnasio Salomón Moreno"}
// ,{id:2138,latitude:12.1043111,longitude:-86.220219,descripcion:"Gimnasio Salomón Moreno"}
// ,{id:2139,latitude:12.1038397,longitude:-86.221723,descripcion:"Farmacia Fabiola"}
// ,{id:2140,latitude:12.1123203,longitude:-86.2247947,descripcion:"René Polanco"}
// ,{id:2141,latitude:12.1337206,longitude:-86.2908111,descripcion:"Farmacia David"}
// ,{id:2142,latitude:12.1462252,longitude:-86.2974066,descripcion:"Cerrajería Lico"}
// ,{id:2143,latitude:12.1571434,longitude:-86.1881617,descripcion:"El Molino"}
// ,{id:2144,latitude:12.1633474,longitude:-86.3478296,descripcion:"El Molino Zona 8"}
// ,{id:2145,latitude:12.0984648,longitude:-86.2415224,descripcion:"KM 8 Carretera Masaya / Primera entrada a Las Colinas"}
// ,{id:2146,latitude:12.1286842,longitude:-86.2335855,descripcion:"Semáforos Nicarao"}
// ,{id:2147,latitude:12.1291718,longitude:-86.224905,descripcion:"Conchita Palacios"}
// ,{id:2148,latitude:12.1123778002,longitude:-86.2913931,descripcion:"Barrio Franciso de Asís"}
// ,{id:2149,latitude:12.10823475,longitude:-86.311131,descripcion:"Barrio Germán Pomares"}
// ,{id:2150,latitude:12.11302375,longitude:-86.1911088,descripcion:"Barrio Israel Gaelano"}
// ,{id:2151,latitude:12.1289894,longitude:-86.2561069,descripcion:"Llantasa"}
// ,{id:2152,latitude:12.1285562,longitude:-86.2333853,descripcion:"Semáforos Nicarao"}
// ,{id:2153,latitude:12.1453187,longitude:-86.1713681,descripcion:"Aeropuerto"}
// ,{id:2154,latitude:12.1104091,longitude:-86.28692275,descripcion:"Barrio Memorial Sandino"}
// ,{id:2155,latitude:12.1373091,longitude:-86.1969118,descripcion:"Pista El Mayoreo"}
// ,{id:2156,latitude:12.1404891,longitude:-86.3074866,descripcion:"ENACAL"}
// ,{id:2157,latitude:12.1130584,longitude:-86.2223837,descripcion:"El Negro Ari"}
// ,{id:2158,latitude:12.1125783,longitude:-86.2188547,descripcion:"Capilla Santa Teresita"}
// ,{id:2159,latitude:12.1267721,longitude:-86.2819994,descripcion:"Rotonda El Periodista"}
// ,{id:2160,latitude:12.1534594,longitude:-86.2242394,descripcion:"Disagro"}
// ,{id:2161,latitude:12.1191769,longitude:-86.2972955,descripcion:"Farmacia Los Cocos"}
// ,{id:2162,latitude:12.1171592,longitude:-86.3002653,descripcion:"Farmacia Helena"}
// ,{id:2163,latitude:12.1573755,longitude:-86.2835145,descripcion:"Ferretería El Serrucho"}
// ,{id:2164,latitude:12.1536049,longitude:-86.3491754,descripcion:"El Cruce de Reyes"}
// ,{id:2165,latitude:12.08327395,longitude:-86.2607295,descripcion:"Pulpería Nidia"}
// ,{id:2166,latitude:12.07996075,longitude:-86.2585035,descripcion:"Entrada al Campo Deportivo"}
// ,{id:2167,latitude:12.0792218,longitude:-86.2577773,descripcion:"Pulpería Marina"}
// ,{id:2168,latitude:12.1287248,longitude:-86.2808576,descripcion:"Edificios El Centro"}
// ,{id:2169,latitude:12.147619,longitude:-86.1933833,descripcion:"La Subasta"}
// ,{id:2170,latitude:12.103399,longitude:-86.2329384,descripcion:"Iglesia Adventista"}
// ,{id:2171,latitude:12.1331864,longitude:-86.3374257,descripcion:"La Apostolica"}
// ,{id:2172,latitude:12.1757529,longitude:-86.349759,descripcion:"Puente Los Cabros"}
// ,{id:2173,latitude:12.1507533,longitude:-86.313194,descripcion:"Clínica Bethel Las Brisas"}
// ,{id:2174,latitude:12.1050717,longitude:-86.2729155,descripcion:"Entrada Miguel Bonilla"}
// ,{id:2175,latitude:12.1116617,longitude:-86.2338274,descripcion:"Farmacia Schick"}
// ,{id:2176,latitude:12.117149,longitude:-86.1998219,descripcion:"Villa Libertad"}
// ,{id:2177,latitude:12.1250618,longitude:-86.1734221,descripcion:"Los Cruces"}
// ,{id:2178,latitude:12.124276,longitude:-86.2154931,descripcion:"Colegio Villa Venezuela Oeste"}
// ,{id:2179,latitude:12.123726,longitude:-86.213808,descripcion:"Colegio Villa Venezuela Sur"}
// ,{id:2180,latitude:12.123106,longitude:-86.2105485,descripcion:"Madre de Dios"}
// ,{id:2181,latitude:12.1177212,longitude:-86.1960968,descripcion:"Omar Téllez Sánchez"}
// ,{id:2182,latitude:12.1206881,longitude:-86.1658839,descripcion:"Campo de fútbol"}
// ,{id:2183,latitude:12.1450135,longitude:-86.2994838,descripcion:"Taller Murillo"}
// ,{id:2184,latitude:12.14982,longitude:-86.3161645,descripcion:"Cuesta El Plomo Sur"}
// ,{id:2185,latitude:12.1243009,longitude:-86.1810553,descripcion:"Altos la Sabana"}
// ,{id:2186,latitude:12.1229518,longitude:-86.195029,descripcion:"Manuel Fernández"}
// ,{id:2187,latitude:12.1209281,longitude:-86.2253589,descripcion:"Primero de Mayo"}
// ,{id:2188,latitude:12.1253856,longitude:-86.2333145,descripcion:"Colegio 14 de Septiembre"}
// ,{id:2189,latitude:12.125175,longitude:-86.2319802,descripcion:"Cafetín Nareli"}
// ,{id:2190,latitude:12.1348839,longitude:-86.2089015,descripcion:"9 de Junio"}
// ,{id:2191,latitude:12.12436585,longitude:-86.2835536499,descripcion:"Universidad del Valle"}
// ,{id:2192,latitude:12.1551573,longitude:-86.2169424,descripcion:"Puente La Toña"}
// ,{id:2193,latitude:12.1351198,longitude:-86.2539963,descripcion:"Repuestos Monge"}
// ,{id:2194,latitude:12.1450592,longitude:-86.2601608,descripcion:"Ruta 108 a Carretera Norte"}
// ,{id:2195,latitude:12.1382629,longitude:-86.2190948,descripcion:"UPOLI Norte"}
// ,{id:2196,latitude:12.1245863,longitude:-86.2836492,descripcion:"Universidad del Valle"}
// ,{id:2197,latitude:12.1104079,longitude:-86.2870055,descripcion:"Barrio Memorial Sandino"}
// ,{id:2198,latitude:12.1532662,longitude:-86.2547847,descripcion:"Quinta Nina"}
// ,{id:2199,latitude:12.15743465,longitude:-86.29699355,descripcion:"Pulpería Doña Tere"}
// ,{id:2200,latitude:12.111984,longitude:-86.2718409,descripcion:"UNICIT"}
// ,{id:2201,latitude:12.1073336,longitude:-86.2720521,descripcion:"UNAN Oeste"}
// ,{id:2202,latitude:12.15915135,longitude:-86.36420985,descripcion:"Pulpería Duarte"}
// ,{id:2203,latitude:12.0899119,longitude:-86.2342842,descripcion:"KM 9 Carretera Masaya / Tercera entrada a Santo Domingo"}
// ,{id:2204,latitude:12.1094564,longitude:-86.2381837,descripcion:"Pulpería César"}
// ,{id:2205,latitude:12.1574431,longitude:-86.3524896,descripcion:"Dispensario Villa Soberana"}
// ,{id:2206,latitude:12.1289394,longitude:-86.3459269,descripcion:"El Cuadro"}
// ,{id:2207,latitude:12.1507818,longitude:-86.3485272,descripcion:"Pulpería Diarte"}
// ,{id:2208,latitude:12.1196124,longitude:-86.2734216,descripcion:"Semáforo Rigoberto López Pérez"}
// ,{id:2209,latitude:12.1434029,longitude:-86.3483267,descripcion:"Calle 8"}
// ,{id:2210,latitude:12.1356278,longitude:-86.3459323,descripcion:"Calle del Barrio Nuevo"}
// ,{id:2211,latitude:12.1356541,longitude:-86.3455779,descripcion:"Calle del Barrio Nuevo"}
// ,{id:2212,latitude:12.1586023,longitude:-86.3518179,descripcion:"Casa del Adulto Mayor Zona 8"}
// ,{id:2213,latitude:12.1587739,longitude:-86.3519651,descripcion:"Casa del Adulto Mayor Zona 8"}
// ,{id:2214,latitude:12.1341789,longitude:-86.3458088,descripcion:"Colegio Cuachillo"}
// ,{id:2215,latitude:12.1341894,longitude:-86.3454114,descripcion:"Colegio Cuachillo"}
// ,{id:2216,latitude:12.1573953,longitude:-86.3523639,descripcion:"Dispensario Villa Soberana"}
// ,{id:2217,latitude:12.1539696507,longitude:-86.2662966006,descripcion:"Instituto Loyola"}
// ,{id:2218,latitude:12.15653085,longitude:-86.27439075,descripcion:"Inss Sucursal"}
// ,{id:2219,latitude:12.0851771,longitude:-86.2403265,descripcion:"Iglesia de Santo Domingo"}
// ,{id:2220,latitude:12.1482729,longitude:-86.1974138,descripcion:"Veterinaria Antares"}
// ,{id:2221,latitude:12.1523787,longitude:-86.282291,descripcion:"Estadio Dennis Martínez"}
// ,{id:2222,latitude:12.1293187,longitude:-86.2272903,descripcion:"Entrada a Veracruz"}
// ,{id:2223,latitude:12.1546081,longitude:-86.2809912,descripcion:"Casa Alianza"}
// ,{id:2224,latitude:12.1545275,longitude:-86.2784892,descripcion:"Cafetín Doña Chepita"}
// ,{id:2225,latitude:12.1299703,longitude:-86.2452431,descripcion:"Colegio República de Colombia"}
// ,{id:2226,latitude:12.1242913,longitude:-86.2343169,descripcion:"Donde fue SERFOSA"}
// ,{id:2227,latitude:12.0819513,longitude:-86.227015,descripcion:"KM 10 1/2 Carretera Masaya"}
// ,{id:2228,latitude:12.10279865,longitude:-86.29852535,descripcion:"Pulpería La Esquinita"}
// ,{id:2229,latitude:12.16331935,longitude:-86.29347555,descripcion:"Pulpería Karla"}
// ,{id:2230,latitude:12.11244735,longitude:-86.2005408,descripcion:"Pulpería Karolina"}
// ,{id:2231,latitude:12.1570123,longitude:-86.2345162,descripcion:"Pulpería La Chontaleña"}
// ,{id:2232,latitude:12.1405415,longitude:-86.2488668,descripcion:"Taller Changai"}
// ,{id:2233,latitude:12.1088712,longitude:-86.2129462,descripcion:"Cementerio Milagro de Dios"}
// ,{id:2234,latitude:12.1111976,longitude:-86.2165621,descripcion:"Agencia Z Gas"}
// ,{id:2235,latitude:12.1371039,longitude:-86.2444652,descripcion:"Billares Mario Piquete"}
// ,{id:2236,latitude:12.1091167,longitude:-86.2165841,descripcion:"Barber Shop"}
//     ]


//     let lineaDeLaRuta=[
//         {latitude:12.156879,longitude:-86.1988633}
// ,{latitude:12.1559195,longitude:-86.1989501}
// ,{latitude:12.1556001,longitude:-86.1989783}
// ,{latitude:12.1550779,longitude:-86.1990472}
// ,{latitude:12.1547938,longitude:-86.1990783}
// ,{latitude:12.1545022,longitude:-86.1990996}
// ,{latitude:12.1544575,longitude:-86.1991029}
// ,{latitude:12.1543771,longitude:-86.1991087}
// ,{latitude:12.1536145,longitude:-86.1991713}
// ,{latitude:12.1533675,longitude:-86.199197}
// ,{latitude:12.1530715,longitude:-86.1992157}
// ,{latitude:12.1529994,longitude:-86.1992185}
// ,{latitude:12.1529396,longitude:-86.1992238}
// ,{latitude:12.1523653,longitude:-86.1992723}
// ,{latitude:12.1518562,longitude:-86.1993235}
// ,{latitude:12.1513291,longitude:-86.1993686}
// ,{latitude:12.1505626,longitude:-86.1994847}
// ,{latitude:12.1500033,longitude:-86.1995368}
// ,{latitude:12.1490922,longitude:-86.1996007}
// ,{latitude:12.1489807,longitude:-86.1996052}
// ,{latitude:12.1484471,longitude:-86.1996376}
// ,{latitude:12.1484698,longitude:-86.1998766}
// ,{latitude:12.1485173,longitude:-86.2005397}
// ,{latitude:12.1485641,longitude:-86.2010044}
// ,{latitude:12.1486714,longitude:-86.2022355}
// ,{latitude:12.148567,longitude:-86.2022451}
// ,{latitude:12.1484206,longitude:-86.2022582}
// ,{latitude:12.1484479,longitude:-86.202642}
// ,{latitude:12.1485101,longitude:-86.2033787}
// ,{latitude:12.1485195,longitude:-86.2034764}
// ,{latitude:12.1485292,longitude:-86.2035772}
// ,{latitude:12.1486108,longitude:-86.2044271}
// ,{latitude:12.148703,longitude:-86.2053872}
// ,{latitude:12.1487407,longitude:-86.2058156}
// ,{latitude:12.1487786,longitude:-86.2062455}
// ,{latitude:12.1488876,longitude:-86.2074128}
// ,{latitude:12.1489128,longitude:-86.2081853}
// ,{latitude:12.1488671,longitude:-86.2084931}
// ,{latitude:12.1488578,longitude:-86.208556}
// ,{latitude:12.1488508,longitude:-86.2085903}
// ,{latitude:12.1488037,longitude:-86.2088204}
// ,{latitude:12.148787,longitude:-86.2090006}
// ,{latitude:12.1487786,longitude:-86.2091294}
// ,{latitude:12.1487919,longitude:-86.2093883}
// ,{latitude:12.1487964,longitude:-86.2094648}
// ,{latitude:12.1488252,longitude:-86.209712}
// ,{latitude:12.1488277,longitude:-86.2097322}
// ,{latitude:12.1488373,longitude:-86.2097817}
// ,{latitude:12.1490471,longitude:-86.21064}
// ,{latitude:12.1492357,longitude:-86.211554}
// ,{latitude:12.149241,longitude:-86.2116005}
// ,{latitude:12.1493299,longitude:-86.2123765}
// ,{latitude:12.1493619,longitude:-86.212713}
// ,{latitude:12.1493921,longitude:-86.2130185}
// ,{latitude:12.1495044,longitude:-86.2140812}
// ,{latitude:12.149517,longitude:-86.2143479}
// ,{latitude:12.1495424,longitude:-86.2146874}
// ,{latitude:12.1495516,longitude:-86.2148268}
// ,{latitude:12.1495868,longitude:-86.2151664}
// ,{latitude:12.1496783,longitude:-86.2161162}
// ,{latitude:12.1497435,longitude:-86.2167597}
// ,{latitude:12.1498158,longitude:-86.2174604}
// ,{latitude:12.149824,longitude:-86.2175594}
// ,{latitude:12.1497318,longitude:-86.2175727}
// ,{latitude:12.149665,longitude:-86.2175825}
// ,{latitude:12.1495618,longitude:-86.2175948}
// ,{latitude:12.1494005,longitude:-86.2176196}
// ,{latitude:12.1488648,longitude:-86.2177103}
// ,{latitude:12.1487262,longitude:-86.2177247}
// ,{latitude:12.1485836,longitude:-86.2177345}
// ,{latitude:12.1484768,longitude:-86.217744}
// ,{latitude:12.1483348,longitude:-86.2177043}
// ,{latitude:12.1478619,longitude:-86.2177118}
// ,{latitude:12.1475767,longitude:-86.2177461}
// ,{latitude:12.1474954,longitude:-86.217759}
// ,{latitude:12.1473667,longitude:-86.2177793}
// ,{latitude:12.1471888,longitude:-86.2178078}
// ,{latitude:12.1471093,longitude:-86.2178178}
// ,{latitude:12.1470757,longitude:-86.2178233}
// ,{latitude:12.1469753,longitude:-86.2178325}
// ,{latitude:12.1467375,longitude:-86.2178568}
// ,{latitude:12.1463411,longitude:-86.2179004}
// ,{latitude:12.1461009,longitude:-86.2179641}
// ,{latitude:12.145821,longitude:-86.2180771}
// ,{latitude:12.1452968,longitude:-86.2182967}
// ,{latitude:12.14523,longitude:-86.2183258}
// ,{latitude:12.1451381,longitude:-86.2183658}
// ,{latitude:12.145063,longitude:-86.2183985}
// ,{latitude:12.1448556,longitude:-86.2184863}
// ,{latitude:12.1447518,longitude:-86.2185325}
// ,{latitude:12.144665,longitude:-86.2185645}
// ,{latitude:12.1445855,longitude:-86.2185915}
// ,{latitude:12.1445309,longitude:-86.2186085}
// ,{latitude:12.1444189,longitude:-86.2186456}
// ,{latitude:12.1443254,longitude:-86.2186614}
// ,{latitude:12.1442444,longitude:-86.2186359}
// ,{latitude:12.1441858,longitude:-86.2186191}
// ,{latitude:12.1441577,longitude:-86.218624}
// ,{latitude:12.1440786,longitude:-86.2186379}
// ,{latitude:12.1435852,longitude:-86.2187493}
// ,{latitude:12.1433924,longitude:-86.2187854}
// ,{latitude:12.1431125,longitude:-86.2187967}
// ,{latitude:12.1428884,longitude:-86.2187681}
// ,{latitude:12.1426132,longitude:-86.2187622}
// ,{latitude:12.1424693,longitude:-86.2187602}
// ,{latitude:12.1422238,longitude:-86.2187566}
// ,{latitude:12.1421604,longitude:-86.2187583}
// ,{latitude:12.1420241,longitude:-86.2187618}
// ,{latitude:12.141927,longitude:-86.2187612}
// ,{latitude:12.1418321,longitude:-86.2187604}
// ,{latitude:12.1418295,longitude:-86.2186705}
// ,{latitude:12.1418196,longitude:-86.218609}
// ,{latitude:12.1417746,longitude:-86.2184102}
// ,{latitude:12.1417306,longitude:-86.2182375}
// ,{latitude:12.1415994,longitude:-86.2179585}
// ,{latitude:12.141455,longitude:-86.2176257}
// ,{latitude:12.1414306,longitude:-86.2175695}
// ,{latitude:12.1413465,longitude:-86.2173745}
// ,{latitude:12.1412295,longitude:-86.2171386}
// ,{latitude:12.1411362,longitude:-86.2169187}
// ,{latitude:12.1407694,longitude:-86.2160662}
// ,{latitude:12.1405393,longitude:-86.2154899}
// ,{latitude:12.140441,longitude:-86.2155071}
// ,{latitude:12.1396828,longitude:-86.2156398}
// ,{latitude:12.1390272,longitude:-86.2157551}
// ,{latitude:12.1387927,longitude:-86.2158476}
// ,{latitude:12.138734,longitude:-86.2158708}
// ,{latitude:12.1385283,longitude:-86.2159904}
// ,{latitude:12.1380004,longitude:-86.2163692}
// ,{latitude:12.1376514,longitude:-86.216597}
// ,{latitude:12.1372451,longitude:-86.2168526}
// ,{latitude:12.1372043,longitude:-86.2168986}
// ,{latitude:12.1371793,longitude:-86.2169358}
// ,{latitude:12.1371688,longitude:-86.2169779}
// ,{latitude:12.1371616,longitude:-86.2170099}
// ,{latitude:12.1371578,longitude:-86.2170439}
// ,{latitude:12.1371534,longitude:-86.2170825}
// ,{latitude:12.1371506,longitude:-86.2171285}
// ,{latitude:12.1371567,longitude:-86.2171679}
// ,{latitude:12.1372142,longitude:-86.2173485}
// ,{latitude:12.1372731,longitude:-86.2174389}
// ,{latitude:12.1374794,longitude:-86.2177848}
// ,{latitude:12.1379287,longitude:-86.2185281}
// ,{latitude:12.1380636,longitude:-86.2187551}
// ,{latitude:12.1381865,longitude:-86.2190264}
// ,{latitude:12.1382087,longitude:-86.2191068}
// ,{latitude:12.1382354,longitude:-86.2192026}
// ,{latitude:12.1382504,longitude:-86.2192964}
// ,{latitude:12.1382927,longitude:-86.2197097}
// ,{latitude:12.1382979,longitude:-86.2197511}
// ,{latitude:12.1383556,longitude:-86.2204831}
// ,{latitude:12.1383907,longitude:-86.2206324}
// ,{latitude:12.1384331,longitude:-86.2210797}
// ,{latitude:12.1384413,longitude:-86.2213174}
// ,{latitude:12.1384602,longitude:-86.2218124}
// ,{latitude:12.1384613,longitude:-86.2218411}
// ,{latitude:12.1384672,longitude:-86.2219946}
// ,{latitude:12.1385018,longitude:-86.2229007}
// ,{latitude:12.1384945,longitude:-86.2234271}
// ,{latitude:12.1383897,longitude:-86.2238784}
// ,{latitude:12.138365,longitude:-86.2239599}
// ,{latitude:12.1383341,longitude:-86.2240622}
// ,{latitude:12.1382969,longitude:-86.2241853}
// ,{latitude:12.1382701,longitude:-86.2242737}
// ,{latitude:12.1382659,longitude:-86.2245335}
// ,{latitude:12.138259,longitude:-86.2249644}
// ,{latitude:12.1382571,longitude:-86.2250797}
// ,{latitude:12.1382871,longitude:-86.2266278}
// ,{latitude:12.138303,longitude:-86.2269124}
// ,{latitude:12.138316,longitude:-86.2270755}
// ,{latitude:12.138332,longitude:-86.2272364}
// ,{latitude:12.1383379,longitude:-86.2273024}
// ,{latitude:12.1383436,longitude:-86.2273311}
// ,{latitude:12.1383984,longitude:-86.2275903}
// ,{latitude:12.1384048,longitude:-86.2276092}
// ,{latitude:12.138411,longitude:-86.2276274}
// ,{latitude:12.1384374,longitude:-86.2277059}
// ,{latitude:12.1385038,longitude:-86.2278438}
// ,{latitude:12.1385917,longitude:-86.2279722}
// ,{latitude:12.1385995,longitude:-86.2280513}
// ,{latitude:12.1385975,longitude:-86.2281163}
// ,{latitude:12.1385524,longitude:-86.2282758}
// ,{latitude:12.1385215,longitude:-86.2284323}
// ,{latitude:12.1384172,longitude:-86.229158}
// ,{latitude:12.1384153,longitude:-86.2292106}
// ,{latitude:12.1384141,longitude:-86.2292423}
// ,{latitude:12.1384121,longitude:-86.2292985}
// ,{latitude:12.1384327,longitude:-86.229542}
// ,{latitude:12.138479,longitude:-86.2297619}
// ,{latitude:12.1386607,longitude:-86.2300836}
// ,{latitude:12.1389868,longitude:-86.2305017}
// ,{latitude:12.139014,longitude:-86.2305473}
// ,{latitude:12.139035,longitude:-86.2305969}
// ,{latitude:12.1390445,longitude:-86.2306538}
// ,{latitude:12.1390449,longitude:-86.2307822}
// ,{latitude:12.139045,longitude:-86.2308076}
// ,{latitude:12.1390556,longitude:-86.2312921}
// ,{latitude:12.1390576,longitude:-86.2315899}
// ,{latitude:12.1390587,longitude:-86.231952}
// ,{latitude:12.1388689,longitude:-86.232424}
// ,{latitude:12.1388199,longitude:-86.2325542}
// ,{latitude:12.1387564,longitude:-86.2326178}
// ,{latitude:12.1385734,longitude:-86.2327939}
// ,{latitude:12.1384343,longitude:-86.232936}
// ,{latitude:12.1383623,longitude:-86.2331215}
// ,{latitude:12.138345,longitude:-86.2331695}
// ,{latitude:12.1380215,longitude:-86.2331054}
// ,{latitude:12.1374846,longitude:-86.2330006}
// ,{latitude:12.1368912,longitude:-86.2329746}
// ,{latitude:12.1369622,longitude:-86.2335553}
// ,{latitude:12.1369743,longitude:-86.2336542}
// ,{latitude:12.1370046,longitude:-86.2339014}
// ,{latitude:12.1370827,longitude:-86.234548}
// ,{latitude:12.1371431,longitude:-86.2350788}
// ,{latitude:12.1371852,longitude:-86.2354488}
// ,{latitude:12.137195,longitude:-86.2355562}
// ,{latitude:12.1372246,longitude:-86.2358817}
// ,{latitude:12.1372443,longitude:-86.2360974}
// ,{latitude:12.1372691,longitude:-86.2363692}
// ,{latitude:12.1373758,longitude:-86.23723}
// ,{latitude:12.1374569,longitude:-86.2378844}
// ,{latitude:12.1374655,longitude:-86.2379571}
// ,{latitude:12.1374776,longitude:-86.2380725}
// ,{latitude:12.1374816,longitude:-86.2381112}
// ,{latitude:12.1374863,longitude:-86.238151}
// ,{latitude:12.1375841,longitude:-86.2389873}
// ,{latitude:12.1375902,longitude:-86.2390394}
// ,{latitude:12.1375949,longitude:-86.239087}
// ,{latitude:12.1376701,longitude:-86.239849}
// ,{latitude:12.1376787,longitude:-86.2399364}
// ,{latitude:12.137687,longitude:-86.2400161}
// ,{latitude:12.1377725,longitude:-86.2408359}
// ,{latitude:12.1376427,longitude:-86.2408497}
// ,{latitude:12.1373337,longitude:-86.2408825}
// ,{latitude:12.1369028,longitude:-86.2409282}
// ,{latitude:12.1360264,longitude:-86.2410192}
// ,{latitude:12.1360997,longitude:-86.2417741}
// ,{latitude:12.1361148,longitude:-86.2419301}
// ,{latitude:12.1361241,longitude:-86.2420093}
// ,{latitude:12.1361782,longitude:-86.2424696}
// ,{latitude:12.1362221,longitude:-86.2426041}
// ,{latitude:12.1362802,longitude:-86.2426784}
// ,{latitude:12.1364109,longitude:-86.2427526}
// ,{latitude:12.1364722,longitude:-86.2428253}
// ,{latitude:12.1365061,longitude:-86.2428979}
// ,{latitude:12.1365197,longitude:-86.2429354}
// ,{latitude:12.1370805,longitude:-86.2444796}
// ,{latitude:12.1371419,longitude:-86.2446818}
// ,{latitude:12.1373278,longitude:-86.2451905}
// ,{latitude:12.1373966,longitude:-86.2453939}
// ,{latitude:12.1375124,longitude:-86.2455166}
// ,{latitude:12.1377809,longitude:-86.2456883}
// ,{latitude:12.1387419,longitude:-86.2460049}
// ,{latitude:12.1387764,longitude:-86.2460163}
// ,{latitude:12.13868,longitude:-86.2463163}
// ,{latitude:12.1385883,longitude:-86.2465535}
// ,{latitude:12.1386329,longitude:-86.2465694}
// ,{latitude:12.1389608,longitude:-86.246686}
// ,{latitude:12.1391394,longitude:-86.2467495}
// ,{latitude:12.1392703,longitude:-86.2467953}
// ,{latitude:12.1393436,longitude:-86.2468146}
// ,{latitude:12.1394677,longitude:-86.2468522}
// ,{latitude:12.1397991,longitude:-86.246947}
// ,{latitude:12.1401685,longitude:-86.2469511}
// ,{latitude:12.1402553,longitude:-86.2469521}
// ,{latitude:12.1403302,longitude:-86.2478246}
// ,{latitude:12.1404413,longitude:-86.2486693}
// ,{latitude:12.1404579,longitude:-86.2488638}
// ,{latitude:12.1405134,longitude:-86.2495104}
// ,{latitude:12.1405912,longitude:-86.2504163}
// ,{latitude:12.1406382,longitude:-86.2511768}
// ,{latitude:12.1406477,longitude:-86.2512705}
// ,{latitude:12.140654,longitude:-86.2513324}
// ,{latitude:12.1413213,longitude:-86.2512595}
// ,{latitude:12.141712,longitude:-86.2512254}
// ,{latitude:12.1421627,longitude:-86.2511797}
// ,{latitude:12.1421895,longitude:-86.251177}
// ,{latitude:12.1424523,longitude:-86.251145}
// ,{latitude:12.1430384,longitude:-86.2510737}
// ,{latitude:12.1433355,longitude:-86.2510393}
// ,{latitude:12.1435373,longitude:-86.2510158}
// ,{latitude:12.1439319,longitude:-86.2509633}
// ,{latitude:12.1441775,longitude:-86.2509357}
// ,{latitude:12.1442323,longitude:-86.2509323}
// ,{latitude:12.144343,longitude:-86.2509231}
// ,{latitude:12.1447153,longitude:-86.2508844}
// ,{latitude:12.1448526,longitude:-86.2508712}
// ,{latitude:12.1451608,longitude:-86.2508354}
// ,{latitude:12.1452617,longitude:-86.2508237}
// ,{latitude:12.1456004,longitude:-86.2507833}
// ,{latitude:12.1456408,longitude:-86.2507785}
// ,{latitude:12.1458704,longitude:-86.2507577}
// ,{latitude:12.1465537,longitude:-86.2507182}
// ,{latitude:12.1467949,longitude:-86.250669}
// ,{latitude:12.1468298,longitude:-86.2506574}
// ,{latitude:12.1469995,longitude:-86.250601}
// ,{latitude:12.1470489,longitude:-86.2505748}
// ,{latitude:12.1472313,longitude:-86.2504906}
// ,{latitude:12.1473862,longitude:-86.2504055}
// ,{latitude:12.1475325,longitude:-86.2502875}
// ,{latitude:12.1475909,longitude:-86.2502296}
// ,{latitude:12.1476201,longitude:-86.2502029}
// ,{latitude:12.1476723,longitude:-86.2501519}
// ,{latitude:12.1477063,longitude:-86.2501196}
// ,{latitude:12.1478134,longitude:-86.2500164}
// ,{latitude:12.1480555,longitude:-86.2497676}
// ,{latitude:12.1481851,longitude:-86.2496498}
// ,{latitude:12.1482086,longitude:-86.249628}
// ,{latitude:12.1482629,longitude:-86.2495841}
// ,{latitude:12.1483711,longitude:-86.2494954}
// ,{latitude:12.1484037,longitude:-86.2494687}
// ,{latitude:12.1485552,longitude:-86.2493625}
// ,{latitude:12.1487184,longitude:-86.2492664}
// ,{latitude:12.1488967,longitude:-86.2491965}
// ,{latitude:12.1491261,longitude:-86.2491278}
// ,{latitude:12.1493403,longitude:-86.2491161}
// ,{latitude:12.1501352,longitude:-86.2491268}
// ,{latitude:12.150753,longitude:-86.2491091}
// ,{latitude:12.1507565,longitude:-86.2491535}
// ,{latitude:12.1507732,longitude:-86.2493628}
// ,{latitude:12.1507734,longitude:-86.2493987}
// ,{latitude:12.1507962,longitude:-86.2499216}
// ,{latitude:12.1508293,longitude:-86.2507288}
// ,{latitude:12.1508859,longitude:-86.2521053}
// ,{latitude:12.150899,longitude:-86.2524253}
// ,{latitude:12.1509074,longitude:-86.2525864}
// ,{latitude:12.1509244,longitude:-86.2529146}
// ,{latitude:12.1509393,longitude:-86.2531497}
// ,{latitude:12.1509497,longitude:-86.253329}
// ,{latitude:12.1509891,longitude:-86.2540075}
// ,{latitude:12.1510112,longitude:-86.2544183}
// ,{latitude:12.1510381,longitude:-86.2549187}
// ,{latitude:12.1510394,longitude:-86.254943}
// ,{latitude:12.1510406,longitude:-86.2549642}
// ,{latitude:12.1510708,longitude:-86.2555093}
// ,{latitude:12.1510955,longitude:-86.2559295}
// ,{latitude:12.151756,longitude:-86.2558952}
// ,{latitude:12.1523853,longitude:-86.2558781}
// ,{latitude:12.1524138,longitude:-86.256795}
// ,{latitude:12.1524155,longitude:-86.2568485}
// ,{latitude:12.1524177,longitude:-86.2568945}
// ,{latitude:12.1524469,longitude:-86.2575101}
// ,{latitude:12.1524575,longitude:-86.2577325}
// ,{latitude:12.1524779,longitude:-86.2584542}
// ,{latitude:12.1524917,longitude:-86.2587341}
// ,{latitude:12.152609,longitude:-86.2587093}
// ,{latitude:12.1526814,longitude:-86.2586972}
// ,{latitude:12.1535133,longitude:-86.2585413}
// ,{latitude:12.1536476,longitude:-86.2585335}
// ,{latitude:12.1537289,longitude:-86.2585191}
// ,{latitude:12.1538017,longitude:-86.2595889}
// ,{latitude:12.1538462,longitude:-86.2601285}
// ,{latitude:12.1539091,longitude:-86.2609525}
// ,{latitude:12.1539622,longitude:-86.2612192}
// ,{latitude:12.1540733,longitude:-86.2617943}
// ,{latitude:12.1541098,longitude:-86.261952}
// ,{latitude:12.1541976,longitude:-86.2624225}
// ,{latitude:12.1542028,longitude:-86.2625443}
// ,{latitude:12.1542079,longitude:-86.2626503}
// ,{latitude:12.1542149,longitude:-86.2627803}
// ,{latitude:12.1542135,longitude:-86.2630502}
// ,{latitude:12.1542105,longitude:-86.2631036}
// ,{latitude:12.1541906,longitude:-86.2634517}
// ,{latitude:12.154156,longitude:-86.2637358}
// ,{latitude:12.1541056,longitude:-86.2640621}
// ,{latitude:12.1541056,longitude:-86.2640624}
// ,{latitude:12.1540855,longitude:-86.2642856}
// ,{latitude:12.1540662,longitude:-86.2645072}
// ,{latitude:12.1540594,longitude:-86.2647673}
// ,{latitude:12.1541242,longitude:-86.2653564}
// ,{latitude:12.1541322,longitude:-86.2654293}
// ,{latitude:12.1541551,longitude:-86.2656627}
// ,{latitude:12.1541828,longitude:-86.2659455}
// ,{latitude:12.1542438,longitude:-86.2665112}
// ,{latitude:12.1543113,longitude:-86.2670792}
// ,{latitude:12.1543613,longitude:-86.2675666}
// ,{latitude:12.1543972,longitude:-86.2679024}
// ,{latitude:12.1544694,longitude:-86.2686363}
// ,{latitude:12.154478,longitude:-86.2687276}
// ,{latitude:12.1544954,longitude:-86.2689124}
// ,{latitude:12.154558,longitude:-86.2695812}
// ,{latitude:12.1546498,longitude:-86.2703456}
// ,{latitude:12.1546782,longitude:-86.2706171}
// ,{latitude:12.1546813,longitude:-86.2708495}
// ,{latitude:12.1546887,longitude:-86.2712046}
// ,{latitude:12.1546872,longitude:-86.2712527}
// ,{latitude:12.1546644,longitude:-86.2720004}
// ,{latitude:12.1546492,longitude:-86.2725587}
// ,{latitude:12.1546581,longitude:-86.2731148}
// ,{latitude:12.1546885,longitude:-86.2736758}
// ,{latitude:12.1552964,longitude:-86.2736161}
// ,{latitude:12.1556599,longitude:-86.2735667}
// ,{latitude:12.1559653,longitude:-86.273528}
// ,{latitude:12.1564076,longitude:-86.2734671}
// ,{latitude:12.1564142,longitude:-86.2735452}
// ,{latitude:12.1564572,longitude:-86.2738627}
// ,{latitude:12.1565281,longitude:-86.2743864}
// ,{latitude:12.1565775,longitude:-86.2747516}
// ,{latitude:12.1566618,longitude:-86.2753753}
// ,{latitude:12.1567708,longitude:-86.2760188}
// ,{latitude:12.156805,longitude:-86.276246}
// ,{latitude:12.1568354,longitude:-86.2765958}
// ,{latitude:12.1571325,longitude:-86.2765793}
// ,{latitude:12.1577564,longitude:-86.2765379}
// ,{latitude:12.1585063,longitude:-86.2765212}
// ,{latitude:12.1586382,longitude:-86.2765183}
// ,{latitude:12.1592007,longitude:-86.2764913}
// ,{latitude:12.159222,longitude:-86.2773473}
// ,{latitude:12.1592376,longitude:-86.2779704}
// ,{latitude:12.1592396,longitude:-86.27803}
// ,{latitude:12.1592546,longitude:-86.2784687}
// ,{latitude:12.1592783,longitude:-86.279162}
// ,{latitude:12.1592843,longitude:-86.2793378}
// ,{latitude:12.1593141,longitude:-86.2802216}
// ,{latitude:12.159347,longitude:-86.2811714}
// ,{latitude:12.1593788,longitude:-86.2821015}
// ,{latitude:12.1593841,longitude:-86.2822569}
// ,{latitude:12.1594063,longitude:-86.2829048}
// ,{latitude:12.1594115,longitude:-86.2830581}
// ,{latitude:12.1594454,longitude:-86.2836195}
// ,{latitude:12.1594849,longitude:-86.2840386}
// ,{latitude:12.1595085,longitude:-86.2842245}
// ,{latitude:12.1595621,longitude:-86.2847657}
// ,{latitude:12.1595612,longitude:-86.2849198}
// ,{latitude:12.1595995,longitude:-86.2852613}
// ,{latitude:12.1596922,longitude:-86.2861519}
// ,{latitude:12.1597465,longitude:-86.2872646}
// ,{latitude:12.1597569,longitude:-86.2874667}
// ,{latitude:12.1598002,longitude:-86.2884107}
// ,{latitude:12.1598111,longitude:-86.2886226}
// ,{latitude:12.1598662,longitude:-86.2896103}
// ,{latitude:12.1598808,longitude:-86.2899403}
// ,{latitude:12.1598602,longitude:-86.2906819}
// ,{latitude:12.1598462,longitude:-86.2908459}
// ,{latitude:12.159841,longitude:-86.2911309}
// ,{latitude:12.1598116,longitude:-86.2920537}
// ,{latitude:12.1597803,longitude:-86.292933}
// ,{latitude:12.1590547,longitude:-86.2930071}
// ,{latitude:12.1588663,longitude:-86.2930263}
// ,{latitude:12.1585347,longitude:-86.2930625}
// ,{latitude:12.1577489,longitude:-86.2931237}
// ,{latitude:12.1577641,longitude:-86.2935209}
// ,{latitude:12.1577656,longitude:-86.2935601}
// ,{latitude:12.1577684,longitude:-86.2936565}
// ,{latitude:12.1577712,longitude:-86.2937297}
// ,{latitude:12.1577922,longitude:-86.2942479}
// ,{latitude:12.1578122,longitude:-86.2948212}
// ,{latitude:12.1578244,longitude:-86.2951701}
// ,{latitude:12.1578436,longitude:-86.2956203}
// ,{latitude:12.1578452,longitude:-86.295654}
// ,{latitude:12.1578633,longitude:-86.2960361}
// ,{latitude:12.1578822,longitude:-86.2965167}
// ,{latitude:12.1579003,longitude:-86.2969768}
// ,{latitude:12.1579224,longitude:-86.2974347}
// ,{latitude:12.1579416,longitude:-86.2978605}
// ,{latitude:12.1579869,longitude:-86.29877}
// ,{latitude:12.1580076,longitude:-86.2992207}
// ,{latitude:12.1580089,longitude:-86.2992556}
// ,{latitude:12.1580246,longitude:-86.2996627}
// ,{latitude:12.1578712,longitude:-86.2996766}
// ,{latitude:12.157147,longitude:-86.2997065}
// ,{latitude:12.1562485,longitude:-86.2997443}
// ,{latitude:12.1559426,longitude:-86.2997572}
// ,{latitude:12.1553717,longitude:-86.2997813}
// ,{latitude:12.1549067,longitude:-86.2998008}
// ,{latitude:12.1544784,longitude:-86.2998188}
// ,{latitude:12.1538169,longitude:-86.2998434}
// ,{latitude:12.1535873,longitude:-86.2998582}
// ,{latitude:12.1535701,longitude:-86.2998597}
// ,{latitude:12.152748,longitude:-86.2999308}
// ,{latitude:12.1519048,longitude:-86.2999957}
// ,{latitude:12.151757,longitude:-86.3000098}
// ,{latitude:12.1510234,longitude:-86.3000526}
// ,{latitude:12.150327,longitude:-86.3000797}
// ,{latitude:12.1498466,longitude:-86.3000918}
// ,{latitude:12.1494273,longitude:-86.3001023}
// ,{latitude:12.1493951,longitude:-86.2991971}
// ,{latitude:12.1493803,longitude:-86.298781}
// ,{latitude:12.1493731,longitude:-86.2985782}
// ,{latitude:12.1493621,longitude:-86.2982681}
// ,{latitude:12.1493301,longitude:-86.297368}
// ,{latitude:12.1488536,longitude:-86.2973908}
// ,{latitude:12.1484463,longitude:-86.2974048}
// ,{latitude:12.1478289,longitude:-86.2974305}
// ,{latitude:12.1475415,longitude:-86.2974433}
// ,{latitude:12.1469724,longitude:-86.2974686}
// ,{latitude:12.1462364,longitude:-86.2975015}
// ,{latitude:12.1460841,longitude:-86.2975112}
// ,{latitude:12.14613,longitude:-86.2984348}
// ,{latitude:12.1451796,longitude:-86.2984778}
// ,{latitude:12.1452341,longitude:-86.2994107}
// ,{latitude:12.1451146,longitude:-86.2994163}
// ,{latitude:12.1450368,longitude:-86.2994221}
// ,{latitude:12.1450106,longitude:-86.2994232}
// ,{latitude:12.1443902,longitude:-86.2994504}
// ,{latitude:12.1432174,longitude:-86.2994984}
// ,{latitude:12.1429699,longitude:-86.2994642}
// ,{latitude:12.1426817,longitude:-86.2994058}
// ,{latitude:12.1424356,longitude:-86.2993911}
// ,{latitude:12.1419779,longitude:-86.2994192}
// ,{latitude:12.1413713,longitude:-86.2994503}
// ,{latitude:12.1410141,longitude:-86.2994924}
// ,{latitude:12.1407881,longitude:-86.2995506}
// ,{latitude:12.1406078,longitude:-86.2995971}
// ,{latitude:12.1404463,longitude:-86.2996242}
// ,{latitude:12.1402898,longitude:-86.2996378}
// ,{latitude:12.1401276,longitude:-86.2996522}
// ,{latitude:12.1396471,longitude:-86.2995816}
// ,{latitude:12.1394953,longitude:-86.2995545}
// ,{latitude:12.1389934,longitude:-86.2994597}
// ,{latitude:12.1389332,longitude:-86.2998187}
// ,{latitude:12.1388942,longitude:-86.3000588}
// ,{latitude:12.1388756,longitude:-86.3001734}
// ,{latitude:12.13883,longitude:-86.3004281}
// ,{latitude:12.1387979,longitude:-86.300647}
// ,{latitude:12.1385838,longitude:-86.3018866}
// ,{latitude:12.1385527,longitude:-86.3020668}
// ,{latitude:12.1385226,longitude:-86.3022488}
// ,{latitude:12.1383022,longitude:-86.3035825}
// ,{latitude:12.1382256,longitude:-86.3040271}
// ,{latitude:12.1381541,longitude:-86.3045033}
// ,{latitude:12.1381476,longitude:-86.3045469}
// ,{latitude:12.1381199,longitude:-86.3047239}
// ,{latitude:12.1379563,longitude:-86.3056641}
// ,{latitude:12.137867,longitude:-86.3061797}
// ,{latitude:12.1378535,longitude:-86.3064085}
// ,{latitude:12.1378361,longitude:-86.3065694}
// ,{latitude:12.1377538,longitude:-86.3070424}
// ,{latitude:12.1377106,longitude:-86.3071694}
// ,{latitude:12.1376713,longitude:-86.3072701}
// ,{latitude:12.1376203,longitude:-86.3073908}
// ,{latitude:12.1375318,longitude:-86.3075648}
// ,{latitude:12.1374423,longitude:-86.3077052}
// ,{latitude:12.1373444,longitude:-86.3078494}
// ,{latitude:12.137277,longitude:-86.3079339}
// ,{latitude:12.1371979,longitude:-86.3080087}
// ,{latitude:12.1371492,longitude:-86.3080526}
// ,{latitude:12.1369964,longitude:-86.3081726}
// ,{latitude:12.1367475,longitude:-86.3083499}
// ,{latitude:12.136333,longitude:-86.3085187}
// ,{latitude:12.1358322,longitude:-86.308683}
// ,{latitude:12.1349983,longitude:-86.3089854}
// ,{latitude:12.1340933,longitude:-86.309331}
// ,{latitude:12.1332881,longitude:-86.3096433}
// ,{latitude:12.1327741,longitude:-86.3097968}
// ,{latitude:12.1327277,longitude:-86.3098088}
// ,{latitude:12.1326308,longitude:-86.3098473}
// ,{latitude:12.1323222,longitude:-86.3099543}
// ,{latitude:12.13223,longitude:-86.3099908}
// ,{latitude:12.1320742,longitude:-86.3100487}
// ,{latitude:12.1318633,longitude:-86.310128}
// ,{latitude:12.1317545,longitude:-86.3101677}
// ,{latitude:12.1310845,longitude:-86.3104124}
// ,{latitude:12.131012,longitude:-86.3104508}
// ,{latitude:12.1306949,longitude:-86.310632}
// ,{latitude:12.1305813,longitude:-86.3106879}
// ,{latitude:12.129829,longitude:-86.3109064}
// ,{latitude:12.1297367,longitude:-86.3109378}
// ,{latitude:12.1294936,longitude:-86.3110253}
// ,{latitude:12.1294039,longitude:-86.3110536}
// ,{latitude:12.1291384,longitude:-86.3111507}
// ,{latitude:12.1289811,longitude:-86.3112066}
// ,{latitude:12.1288732,longitude:-86.3112471}
// ,{latitude:12.1287547,longitude:-86.3112901}
// ,{latitude:12.1286641,longitude:-86.3113256}
// ,{latitude:12.128233,longitude:-86.3114815}
// ,{latitude:12.1273438,longitude:-86.311803}
// ,{latitude:12.1267982,longitude:-86.3120143}
// ,{latitude:12.1262947,longitude:-86.3122093}
// ,{latitude:12.1255599,longitude:-86.3124755}
// ,{latitude:12.1243342,longitude:-86.3128895}
// ,{latitude:12.1242228,longitude:-86.3129261}
// ,{latitude:12.1240341,longitude:-86.3129881}
// ,{latitude:12.1239372,longitude:-86.3130332}
// ,{latitude:12.1238559,longitude:-86.3130857}
// ,{latitude:12.1237806,longitude:-86.3131747}
// ,{latitude:12.1237274,longitude:-86.3133206}
// ,{latitude:12.1236284,longitude:-86.3134389}
// ,{latitude:12.123548,longitude:-86.3134923}
// ,{latitude:12.1234581,longitude:-86.3135265}
// ,{latitude:12.123363,longitude:-86.3135398}
// ,{latitude:12.1232125,longitude:-86.3135164}
// ,{latitude:12.123079,longitude:-86.3134415}
// ,{latitude:12.1229789,longitude:-86.3133242}
// ,{latitude:12.1229244,longitude:-86.3131788}
// ,{latitude:12.1229222,longitude:-86.3130231}
// ,{latitude:12.1229724,longitude:-86.3128761}
// ,{latitude:12.1229873,longitude:-86.3126508}
// ,{latitude:12.122946,longitude:-86.3124213}
// ,{latitude:12.1229272,longitude:-86.3123196}
// ,{latitude:12.1228831,longitude:-86.3120806}
// ,{latitude:12.1227572,longitude:-86.3116461}
// ,{latitude:12.1226654,longitude:-86.3112813}
// ,{latitude:12.1226025,longitude:-86.3109326}
// ,{latitude:12.1225763,longitude:-86.3106523}
// ,{latitude:12.1225619,longitude:-86.3104565}
// ,{latitude:12.1225592,longitude:-86.3103747}
// ,{latitude:12.1225553,longitude:-86.3102406}
// ,{latitude:12.1225671,longitude:-86.3101132}
// ,{latitude:12.1226025,longitude:-86.3099496}
// ,{latitude:12.1226523,longitude:-86.3097806}
// ,{latitude:12.1226904,longitude:-86.309664}
// ,{latitude:12.1227467,longitude:-86.3094749}
// ,{latitude:12.122807,longitude:-86.3092817}
// ,{latitude:12.1229067,longitude:-86.3088647}
// ,{latitude:12.1230103,longitude:-86.3085334}
// ,{latitude:12.1230796,longitude:-86.3083015}
// ,{latitude:12.1231051,longitude:-86.3082225}
// ,{latitude:12.1235642,longitude:-86.3067598}
// ,{latitude:12.1237695,longitude:-86.3060849}
// ,{latitude:12.1238404,longitude:-86.3058519}
// ,{latitude:12.1238664,longitude:-86.3057725}
// ,{latitude:12.1240335,longitude:-86.305136}
// ,{latitude:12.1241124,longitude:-86.3048093}
// ,{latitude:12.1242083,longitude:-86.3044122}
// ,{latitude:12.1242143,longitude:-86.3043872}
// ,{latitude:12.1243804,longitude:-86.3037104}
// ,{latitude:12.1246675,longitude:-86.3025087}
// ,{latitude:12.1250116,longitude:-86.3009529}
// ,{latitude:12.1250404,longitude:-86.3007879}
// ,{latitude:12.1251275,longitude:-86.3002954}
// ,{latitude:12.1252697,longitude:-86.2994345}
// ,{latitude:12.1253138,longitude:-86.299181}
// ,{latitude:12.1253541,longitude:-86.2989215}
// ,{latitude:12.125433,longitude:-86.2983772}
// ,{latitude:12.1255081,longitude:-86.2978907}
// ,{latitude:12.1254707,longitude:-86.2978417}
// ,{latitude:12.1254347,longitude:-86.2977469}
// ,{latitude:12.1254189,longitude:-86.2976477}
// ,{latitude:12.1255036,longitude:-86.2971417}
// ,{latitude:12.1253721,longitude:-86.2971207}
// ,{latitude:12.1253397,longitude:-86.2971181}
// ,{latitude:12.1253114,longitude:-86.2971136}
// ,{latitude:12.1250901,longitude:-86.2970784}
// ,{latitude:12.1247087,longitude:-86.2970275}
// ,{latitude:12.1244732,longitude:-86.2970258}
// ,{latitude:12.1241803,longitude:-86.2970564}
// ,{latitude:12.1239812,longitude:-86.2970833}
// ,{latitude:12.1235256,longitude:-86.2971665}
// ,{latitude:12.1232092,longitude:-86.2972248}
// ,{latitude:12.1231674,longitude:-86.2969512}
// ,{latitude:12.1231674,longitude:-86.2969512}
// ,{latitude:12.1231311,longitude:-86.2967798}
// ,{latitude:12.1230904,longitude:-86.296524}
// ,{latitude:12.1230728,longitude:-86.2964012}
// ,{latitude:12.1230375,longitude:-86.2962268}
// ,{latitude:12.1230045,longitude:-86.2959753}
// ,{latitude:12.1229976,longitude:-86.295919}
// ,{latitude:12.1235964,longitude:-86.2958318}
// ,{latitude:12.1239343,longitude:-86.295801}
// ,{latitude:12.1241964,longitude:-86.2957702}
// ,{latitude:12.1246093,longitude:-86.2957067}
// ,{latitude:12.1247164,longitude:-86.2956972}
// ,{latitude:12.1249978,longitude:-86.2956683}
// ,{latitude:12.1251107,longitude:-86.295656}
// ,{latitude:12.1253324,longitude:-86.2956334}
// ,{latitude:12.1257436,longitude:-86.2955974}
// ,{latitude:12.1258244,longitude:-86.2955954}
// ,{latitude:12.1258094,longitude:-86.2958195}
// ,{latitude:12.1257583,longitude:-86.296395}
// ,{latitude:12.1257566,longitude:-86.2964097}
// ,{latitude:12.125712,longitude:-86.2967984}
// ,{latitude:12.1256698,longitude:-86.2971658}
// ,{latitude:12.1255761,longitude:-86.2978956}
// ,{latitude:12.1255064,longitude:-86.2983855}
// ,{latitude:12.1253588,longitude:-86.2994451}
// ,{latitude:12.1253142,longitude:-86.2997241}
// ,{latitude:12.1252999,longitude:-86.2998158}
// ,{latitude:12.1252856,longitude:-86.2999072}
// ,{latitude:12.1252154,longitude:-86.3003642}
// ,{latitude:12.1251799,longitude:-86.3005856}
// ,{latitude:12.1251235,longitude:-86.3009365}
// ,{latitude:12.1251085,longitude:-86.3010072}
// ,{latitude:12.1247798,longitude:-86.3025355}
// ,{latitude:12.1244813,longitude:-86.3037449}
// ,{latitude:12.1244148,longitude:-86.3040325}
// ,{latitude:12.1244386,longitude:-86.3043612}
// ,{latitude:12.1244246,longitude:-86.3044288}
// ,{latitude:12.1244073,longitude:-86.3045017}
// ,{latitude:12.1243905,longitude:-86.3045669}
// ,{latitude:12.1242087,longitude:-86.3048384}
// ,{latitude:12.1241244,longitude:-86.3051613}
// ,{latitude:12.1239512,longitude:-86.3058034}
// ,{latitude:12.1239243,longitude:-86.3058862}
// ,{latitude:12.1236392,longitude:-86.3067831}
// ,{latitude:12.1232726,longitude:-86.3079361}
// ,{latitude:12.1232132,longitude:-86.308123}
// ,{latitude:12.1231486,longitude:-86.3083234}
// ,{latitude:12.1230699,longitude:-86.308592}
// ,{latitude:12.1229794,longitude:-86.3089109}
// ,{latitude:12.1229034,longitude:-86.3092489}
// ,{latitude:12.1228433,longitude:-86.3095719}
// ,{latitude:12.1228084,longitude:-86.310069}
// ,{latitude:12.1228123,longitude:-86.3103773}
// ,{latitude:12.1228241,longitude:-86.3106751}
// ,{latitude:12.1228674,longitude:-86.3109191}
// ,{latitude:12.1229243,longitude:-86.3112437}
// ,{latitude:12.1229911,longitude:-86.3115404}
// ,{latitude:12.1230489,longitude:-86.3117569}
// ,{latitude:12.1231797,longitude:-86.3121246}
// ,{latitude:12.1232304,longitude:-86.3122672}
// ,{latitude:12.1233859,longitude:-86.3125604}
// ,{latitude:12.1235001,longitude:-86.3126754}
// ,{latitude:12.1236425,longitude:-86.3127658}
// ,{latitude:12.1237983,longitude:-86.3127941}
// ,{latitude:12.1238886,longitude:-86.3128086}
// ,{latitude:12.1239989,longitude:-86.3128129}
// ,{latitude:12.1241274,longitude:-86.3127941}
// ,{latitude:12.1241769,longitude:-86.3127776}
// ,{latitude:12.1253862,longitude:-86.312375}
// ,{latitude:12.1255042,longitude:-86.3123354}
// ,{latitude:12.1255863,longitude:-86.3123064}
// ,{latitude:12.1256396,longitude:-86.3122884}
// ,{latitude:12.1264194,longitude:-86.3119975}
// ,{latitude:12.1266826,longitude:-86.3118962}
// ,{latitude:12.1268925,longitude:-86.3118206}
// ,{latitude:12.1272292,longitude:-86.3116948}
// ,{latitude:12.1275084,longitude:-86.3115859}
// ,{latitude:12.1287257,longitude:-86.3111499}
// ,{latitude:12.1288639,longitude:-86.3110975}
// ,{latitude:12.1291807,longitude:-86.3109823}
// ,{latitude:12.1293061,longitude:-86.310947}
// ,{latitude:12.1294575,longitude:-86.3108976}
// ,{latitude:12.1299386,longitude:-86.3107288}
// ,{latitude:12.1304462,longitude:-86.3105747}
// ,{latitude:12.131012,longitude:-86.3104508}
// ,{latitude:12.1310845,longitude:-86.3104124}
// ,{latitude:12.1317545,longitude:-86.3101677}
// ,{latitude:12.1318633,longitude:-86.310128}
// ,{latitude:12.1320742,longitude:-86.3100487}
// ,{latitude:12.13223,longitude:-86.3099908}
// ,{latitude:12.1323222,longitude:-86.3099543}
// ,{latitude:12.1326308,longitude:-86.3098473}
// ,{latitude:12.1327277,longitude:-86.3098088}
// ,{latitude:12.1327741,longitude:-86.3097968}
// ,{latitude:12.1332881,longitude:-86.3096433}
// ,{latitude:12.1340933,longitude:-86.309331}
// ,{latitude:12.1349983,longitude:-86.3089854}
// ,{latitude:12.1358322,longitude:-86.308683}
// ,{latitude:12.1363459,longitude:-86.3083905}
// ,{latitude:12.1365638,longitude:-86.3082759}
// ,{latitude:12.1367199,longitude:-86.3081462}
// ,{latitude:12.1368181,longitude:-86.3080761}
// ,{latitude:12.1369073,longitude:-86.3079943}
// ,{latitude:12.1370692,longitude:-86.3078386}
// ,{latitude:12.1371914,longitude:-86.3076821}
// ,{latitude:12.1372945,longitude:-86.3075594}
// ,{latitude:12.1375262,longitude:-86.3071757}
// ,{latitude:12.1376493,longitude:-86.3069355}
// ,{latitude:12.1377259,longitude:-86.3067098}
// ,{latitude:12.1377913,longitude:-86.3064202}
// ,{latitude:12.137867,longitude:-86.3061797}
// ,{latitude:12.1379563,longitude:-86.3056641}
// ,{latitude:12.1381199,longitude:-86.3047239}
// ,{latitude:12.1381476,longitude:-86.3045469}
// ,{latitude:12.1381541,longitude:-86.3045033}
// ,{latitude:12.1382256,longitude:-86.3040271}
// ,{latitude:12.1383022,longitude:-86.3035825}
// ,{latitude:12.1385226,longitude:-86.3022488}
// ,{latitude:12.1385527,longitude:-86.3020668}
// ,{latitude:12.1385838,longitude:-86.3018866}
// ,{latitude:12.1387979,longitude:-86.300647}
// ,{latitude:12.13883,longitude:-86.3004281}
// ,{latitude:12.1388756,longitude:-86.3001734}
// ,{latitude:12.1388942,longitude:-86.3000588}
// ,{latitude:12.1389332,longitude:-86.2998187}
// ,{latitude:12.1389934,longitude:-86.2994597}
// ,{latitude:12.1394953,longitude:-86.2995545}
// ,{latitude:12.1396471,longitude:-86.2995816}
// ,{latitude:12.1401276,longitude:-86.2996522}
// ,{latitude:12.1402898,longitude:-86.2996378}
// ,{latitude:12.1404463,longitude:-86.2996242}
// ,{latitude:12.1406078,longitude:-86.2995971}
// ,{latitude:12.1407881,longitude:-86.2995506}
// ,{latitude:12.1410141,longitude:-86.2994924}
// ,{latitude:12.1413713,longitude:-86.2994503}
// ,{latitude:12.1419779,longitude:-86.2994192}
// ,{latitude:12.1424356,longitude:-86.2993911}
// ,{latitude:12.1426817,longitude:-86.2994058}
// ,{latitude:12.1429699,longitude:-86.2994642}
// ,{latitude:12.1432174,longitude:-86.2994984}
// ,{latitude:12.1443902,longitude:-86.2994504}
// ,{latitude:12.1450106,longitude:-86.2994232}
// ,{latitude:12.1450368,longitude:-86.2994221}
// ,{latitude:12.1451146,longitude:-86.2994163}
// ,{latitude:12.1452341,longitude:-86.2994107}
// ,{latitude:12.1451796,longitude:-86.2984778}
// ,{latitude:12.1451509,longitude:-86.2978033}
// ,{latitude:12.1451387,longitude:-86.2975169}
// ,{latitude:12.1454011,longitude:-86.2975376}
// ,{latitude:12.1456432,longitude:-86.2975403}
// ,{latitude:12.1460841,longitude:-86.2975112}
// ,{latitude:12.1462364,longitude:-86.2975015}
// ,{latitude:12.1469724,longitude:-86.2974686}
// ,{latitude:12.1475415,longitude:-86.2974433}
// ,{latitude:12.1478289,longitude:-86.2974305}
// ,{latitude:12.1484463,longitude:-86.2974048}
// ,{latitude:12.1488536,longitude:-86.2973908}
// ,{latitude:12.1493301,longitude:-86.297368}
// ,{latitude:12.1500968,longitude:-86.2973315}
// ,{latitude:12.1502051,longitude:-86.2973263}
// ,{latitude:12.1502131,longitude:-86.2975078}
// ,{latitude:12.1502448,longitude:-86.2982227}
// ,{latitude:12.1502859,longitude:-86.2991509}
// ,{latitude:12.150327,longitude:-86.3000797}
// ,{latitude:12.1510234,longitude:-86.3000526}
// ,{latitude:12.151757,longitude:-86.3000098}
// ,{latitude:12.1519048,longitude:-86.2999957}
// ,{latitude:12.152748,longitude:-86.2999308}
// ,{latitude:12.1535701,longitude:-86.2998597}
// ,{latitude:12.1535873,longitude:-86.2998582}
// ,{latitude:12.1538169,longitude:-86.2998434}
// ,{latitude:12.1544784,longitude:-86.2998188}
// ,{latitude:12.1549067,longitude:-86.2998008}
// ,{latitude:12.1553717,longitude:-86.2997813}
// ,{latitude:12.1559426,longitude:-86.2997572}
// ,{latitude:12.1562485,longitude:-86.2997443}
// ,{latitude:12.157147,longitude:-86.2997065}
// ,{latitude:12.1578712,longitude:-86.2996766}
// ,{latitude:12.1580246,longitude:-86.2996627}
// ,{latitude:12.1580089,longitude:-86.2992556}
// ,{latitude:12.1580076,longitude:-86.2992207}
// ,{latitude:12.1579869,longitude:-86.29877}
// ,{latitude:12.1579416,longitude:-86.2978605}
// ,{latitude:12.1579224,longitude:-86.2974347}
// ,{latitude:12.1579003,longitude:-86.2969768}
// ,{latitude:12.1578822,longitude:-86.2965167}
// ,{latitude:12.1578633,longitude:-86.2960361}
// ,{latitude:12.1578452,longitude:-86.295654}
// ,{latitude:12.1578436,longitude:-86.2956203}
// ,{latitude:12.1578244,longitude:-86.2951701}
// ,{latitude:12.1578122,longitude:-86.2948212}
// ,{latitude:12.1577922,longitude:-86.2942479}
// ,{latitude:12.1577712,longitude:-86.2937297}
// ,{latitude:12.1577684,longitude:-86.2936565}
// ,{latitude:12.1577656,longitude:-86.2935601}
// ,{latitude:12.1577641,longitude:-86.2935209}
// ,{latitude:12.1577489,longitude:-86.2931237}
// ,{latitude:12.1585347,longitude:-86.2930625}
// ,{latitude:12.1588663,longitude:-86.2930263}
// ,{latitude:12.1590547,longitude:-86.2930071}
// ,{latitude:12.1597803,longitude:-86.292933}
// ,{latitude:12.1598116,longitude:-86.2920537}
// ,{latitude:12.159841,longitude:-86.2911309}
// ,{latitude:12.1598462,longitude:-86.2908459}
// ,{latitude:12.1598602,longitude:-86.2906819}
// ,{latitude:12.1598808,longitude:-86.2899403}
// ,{latitude:12.1598662,longitude:-86.2896103}
// ,{latitude:12.1598111,longitude:-86.2886226}
// ,{latitude:12.1598002,longitude:-86.2884107}
// ,{latitude:12.1597569,longitude:-86.2874667}
// ,{latitude:12.1597465,longitude:-86.2872646}
// ,{latitude:12.1596922,longitude:-86.2861519}
// ,{latitude:12.1595995,longitude:-86.2852613}
// ,{latitude:12.1595612,longitude:-86.2849198}
// ,{latitude:12.1595621,longitude:-86.2847657}
// ,{latitude:12.1595085,longitude:-86.2842245}
// ,{latitude:12.1594849,longitude:-86.2840386}
// ,{latitude:12.1594454,longitude:-86.2836195}
// ,{latitude:12.1594115,longitude:-86.2830581}
// ,{latitude:12.1594063,longitude:-86.2829048}
// ,{latitude:12.1593841,longitude:-86.2822569}
// ,{latitude:12.1593788,longitude:-86.2821015}
// ,{latitude:12.159347,longitude:-86.2811714}
// ,{latitude:12.1593141,longitude:-86.2802216}
// ,{latitude:12.1592843,longitude:-86.2793378}
// ,{latitude:12.1592783,longitude:-86.279162}
// ,{latitude:12.1592546,longitude:-86.2784687}
// ,{latitude:12.1592396,longitude:-86.27803}
// ,{latitude:12.1592376,longitude:-86.2779704}
// ,{latitude:12.159222,longitude:-86.2773473}
// ,{latitude:12.1592007,longitude:-86.2764913}
// ,{latitude:12.1586382,longitude:-86.2765183}
// ,{latitude:12.1585063,longitude:-86.2765212}
// ,{latitude:12.1577564,longitude:-86.2765379}
// ,{latitude:12.1571325,longitude:-86.2765793}
// ,{latitude:12.1568354,longitude:-86.2765958}
// ,{latitude:12.156805,longitude:-86.276246}
// ,{latitude:12.1567708,longitude:-86.2760188}
// ,{latitude:12.1566618,longitude:-86.2753753}
// ,{latitude:12.1565775,longitude:-86.2747516}
// ,{latitude:12.1565281,longitude:-86.2743864}
// ,{latitude:12.1564572,longitude:-86.2738627}
// ,{latitude:12.1563721,longitude:-86.2737357}
// ,{latitude:12.1562828,longitude:-86.2736463}
// ,{latitude:12.156219,longitude:-86.273612}
// ,{latitude:12.1561234,longitude:-86.2735885}
// ,{latitude:12.155482,longitude:-86.2736752}
// ,{latitude:12.1552837,longitude:-86.2737002}
// ,{latitude:12.1546951,longitude:-86.2737794}
// ,{latitude:12.1541166,longitude:-86.2738538}
// ,{latitude:12.1541162,longitude:-86.2737494}
// ,{latitude:12.1540989,longitude:-86.2734973}
// ,{latitude:12.1540697,longitude:-86.2729122}
// ,{latitude:12.1540587,longitude:-86.2726094}
// ,{latitude:12.1540548,longitude:-86.2724715}
// ,{latitude:12.1540236,longitude:-86.2716748}
// ,{latitude:12.1540233,longitude:-86.2715127}
// ,{latitude:12.1540674,longitude:-86.2709896}
// ,{latitude:12.1540754,longitude:-86.2706461}
// ,{latitude:12.1540904,longitude:-86.2702394}
// ,{latitude:12.1540871,longitude:-86.2699259}
// ,{latitude:12.1540789,longitude:-86.2695948}
// ,{latitude:12.1539653,longitude:-86.2685547}
// ,{latitude:12.1539117,longitude:-86.2679993}
// ,{latitude:12.1539033,longitude:-86.2679033}
// ,{latitude:12.1538667,longitude:-86.2675509}
// ,{latitude:12.1538188,longitude:-86.2670775}
// ,{latitude:12.1538035,longitude:-86.2669269}
// ,{latitude:12.1537829,longitude:-86.2667234}
// ,{latitude:12.1537752,longitude:-86.2666467}
// ,{latitude:12.1537067,longitude:-86.2659706}
// ,{latitude:12.1536867,longitude:-86.2657728}
// ,{latitude:12.1536173,longitude:-86.2649921}
// ,{latitude:12.1536054,longitude:-86.2648586}
// ,{latitude:12.153595,longitude:-86.2642638}
// ,{latitude:12.1536046,longitude:-86.2640576}
// ,{latitude:12.1536309,longitude:-86.2637644}
// ,{latitude:12.1537151,longitude:-86.2632885}
// ,{latitude:12.1538075,longitude:-86.2627684}
// ,{latitude:12.1538343,longitude:-86.262637}
// ,{latitude:12.1538549,longitude:-86.2625281}
// ,{latitude:12.1539104,longitude:-86.2622246}
// ,{latitude:12.1538216,longitude:-86.261865}
// ,{latitude:12.1537421,longitude:-86.2610001}
// ,{latitude:12.1536643,longitude:-86.2601531}
// ,{latitude:12.1536628,longitude:-86.2601372}
// ,{latitude:12.1535832,longitude:-86.2592705}
// ,{latitude:12.1535706,longitude:-86.2591309}
// ,{latitude:12.1535133,longitude:-86.2585413}
// ,{latitude:12.1526814,longitude:-86.2586972}
// ,{latitude:12.152609,longitude:-86.2587093}
// ,{latitude:12.1524917,longitude:-86.2587341}
// ,{latitude:12.1524779,longitude:-86.2584542}
// ,{latitude:12.1524575,longitude:-86.2577325}
// ,{latitude:12.1524469,longitude:-86.2575101}
// ,{latitude:12.1524177,longitude:-86.2568945}
// ,{latitude:12.1524155,longitude:-86.2568485}
// ,{latitude:12.1524138,longitude:-86.256795}
// ,{latitude:12.1523853,longitude:-86.2558781}
// ,{latitude:12.1523319,longitude:-86.2549782}
// ,{latitude:12.1523265,longitude:-86.2548867}
// ,{latitude:12.1522694,longitude:-86.2548893}
// ,{latitude:12.1522676,longitude:-86.2548893}
// ,{latitude:12.1516917,longitude:-86.2549152}
// ,{latitude:12.151212,longitude:-86.2549356}
// ,{latitude:12.1510394,longitude:-86.254943}
// ,{latitude:12.1503042,longitude:-86.2549737}
// ,{latitude:12.1501598,longitude:-86.2549797}
// ,{latitude:12.1501387,longitude:-86.2549806}
// ,{latitude:12.1500857,longitude:-86.2540372}
// ,{latitude:12.1500402,longitude:-86.2532281}
// ,{latitude:12.1501459,longitude:-86.2532206}
// ,{latitude:12.1502662,longitude:-86.2532099}
// ,{latitude:12.1508832,longitude:-86.2531547}
// ,{latitude:12.1509393,longitude:-86.2531497}
// ,{latitude:12.1509244,longitude:-86.2529146}
// ,{latitude:12.1509074,longitude:-86.2525864}
// ,{latitude:12.150899,longitude:-86.2524253}
// ,{latitude:12.1508859,longitude:-86.2521053}
// ,{latitude:12.1508293,longitude:-86.2507288}
// ,{latitude:12.1507962,longitude:-86.2499216}
// ,{latitude:12.1507734,longitude:-86.2493987}
// ,{latitude:12.1507732,longitude:-86.2493628}
// ,{latitude:12.1507565,longitude:-86.2491535}
// ,{latitude:12.150753,longitude:-86.2491091}
// ,{latitude:12.1501352,longitude:-86.2491268}
// ,{latitude:12.1493403,longitude:-86.2491161}
// ,{latitude:12.1491261,longitude:-86.2491278}
// ,{latitude:12.1488967,longitude:-86.2491965}
// ,{latitude:12.1487184,longitude:-86.2492664}
// ,{latitude:12.1485552,longitude:-86.2493625}
// ,{latitude:12.1484037,longitude:-86.2494687}
// ,{latitude:12.1483711,longitude:-86.2494954}
// ,{latitude:12.1482629,longitude:-86.2495841}
// ,{latitude:12.1482086,longitude:-86.249628}
// ,{latitude:12.1481851,longitude:-86.2496498}
// ,{latitude:12.1480555,longitude:-86.2497676}
// ,{latitude:12.1478134,longitude:-86.2500164}
// ,{latitude:12.1477063,longitude:-86.2501196}
// ,{latitude:12.1476723,longitude:-86.2501519}
// ,{latitude:12.1476201,longitude:-86.2502029}
// ,{latitude:12.1475909,longitude:-86.2502296}
// ,{latitude:12.1475325,longitude:-86.2502875}
// ,{latitude:12.1473862,longitude:-86.2504055}
// ,{latitude:12.1472313,longitude:-86.2504906}
// ,{latitude:12.1470489,longitude:-86.2505748}
// ,{latitude:12.1469995,longitude:-86.250601}
// ,{latitude:12.1468298,longitude:-86.2506574}
// ,{latitude:12.1467949,longitude:-86.250669}
// ,{latitude:12.1465537,longitude:-86.2507182}
// ,{latitude:12.1458704,longitude:-86.2507577}
// ,{latitude:12.1456408,longitude:-86.2507785}
// ,{latitude:12.1456004,longitude:-86.2507833}
// ,{latitude:12.1452617,longitude:-86.2508237}
// ,{latitude:12.1451608,longitude:-86.2508354}
// ,{latitude:12.1448526,longitude:-86.2508712}
// ,{latitude:12.1447153,longitude:-86.2508844}
// ,{latitude:12.144343,longitude:-86.2509231}
// ,{latitude:12.1442323,longitude:-86.2509323}
// ,{latitude:12.1441775,longitude:-86.2509357}
// ,{latitude:12.1439319,longitude:-86.2509633}
// ,{latitude:12.1435373,longitude:-86.2510158}
// ,{latitude:12.1433355,longitude:-86.2510393}
// ,{latitude:12.1430384,longitude:-86.2510737}
// ,{latitude:12.1424523,longitude:-86.251145}
// ,{latitude:12.1421895,longitude:-86.251177}
// ,{latitude:12.1421627,longitude:-86.2511797}
// ,{latitude:12.141712,longitude:-86.2512254}
// ,{latitude:12.1413213,longitude:-86.2512595}
// ,{latitude:12.140654,longitude:-86.2513324}
// ,{latitude:12.1406477,longitude:-86.2512705}
// ,{latitude:12.1406382,longitude:-86.2511768}
// ,{latitude:12.1405912,longitude:-86.2504163}
// ,{latitude:12.1405134,longitude:-86.2495104}
// ,{latitude:12.1404579,longitude:-86.2488638}
// ,{latitude:12.1404413,longitude:-86.2486693}
// ,{latitude:12.1403302,longitude:-86.2478246}
// ,{latitude:12.1402553,longitude:-86.2469521}
// ,{latitude:12.1401685,longitude:-86.2469511}
// ,{latitude:12.1397991,longitude:-86.246947}
// ,{latitude:12.1394677,longitude:-86.2468522}
// ,{latitude:12.1393436,longitude:-86.2468146}
// ,{latitude:12.1392703,longitude:-86.2467953}
// ,{latitude:12.1391394,longitude:-86.2467495}
// ,{latitude:12.1389608,longitude:-86.246686}
// ,{latitude:12.1386329,longitude:-86.2465694}
// ,{latitude:12.1385883,longitude:-86.2465535}
// ,{latitude:12.13868,longitude:-86.2463163}
// ,{latitude:12.1387764,longitude:-86.2460163}
// ,{latitude:12.1387419,longitude:-86.2460049}
// ,{latitude:12.1377809,longitude:-86.2456883}
// ,{latitude:12.1375124,longitude:-86.2455166}
// ,{latitude:12.1373966,longitude:-86.2453939}
// ,{latitude:12.1373278,longitude:-86.2451905}
// ,{latitude:12.1371419,longitude:-86.2446818}
// ,{latitude:12.1370805,longitude:-86.2444796}
// ,{latitude:12.1365197,longitude:-86.2429354}
// ,{latitude:12.1365061,longitude:-86.2428979}
// ,{latitude:12.1364722,longitude:-86.2428253}
// ,{latitude:12.1364109,longitude:-86.2427526}
// ,{latitude:12.1362802,longitude:-86.2426784}
// ,{latitude:12.1362221,longitude:-86.2426041}
// ,{latitude:12.1361782,longitude:-86.2424696}
// ,{latitude:12.1361241,longitude:-86.2420093}
// ,{latitude:12.1361148,longitude:-86.2419301}
// ,{latitude:12.1360997,longitude:-86.2417741}
// ,{latitude:12.1360264,longitude:-86.2410192}
// ,{latitude:12.1359228,longitude:-86.240213}
// ,{latitude:12.1359139,longitude:-86.2401434}
// ,{latitude:12.1367883,longitude:-86.2400417}
// ,{latitude:12.1376787,longitude:-86.2399364}
// ,{latitude:12.1376701,longitude:-86.239849}
// ,{latitude:12.1375949,longitude:-86.239087}
// ,{latitude:12.1375902,longitude:-86.2390394}
// ,{latitude:12.1375841,longitude:-86.2389873}
// ,{latitude:12.1374863,longitude:-86.238151}
// ,{latitude:12.1374816,longitude:-86.2381112}
// ,{latitude:12.1374776,longitude:-86.2380725}
// ,{latitude:12.1374655,longitude:-86.2379571}
// ,{latitude:12.1374569,longitude:-86.2378844}
// ,{latitude:12.1373758,longitude:-86.23723}
// ,{latitude:12.1372691,longitude:-86.2363692}
// ,{latitude:12.1372443,longitude:-86.2360974}
// ,{latitude:12.1372246,longitude:-86.2358817}
// ,{latitude:12.137195,longitude:-86.2355562}
// ,{latitude:12.1371852,longitude:-86.2354488}
// ,{latitude:12.1371431,longitude:-86.2350788}
// ,{latitude:12.1370827,longitude:-86.234548}
// ,{latitude:12.1370046,longitude:-86.2339014}
// ,{latitude:12.1369743,longitude:-86.2336542}
// ,{latitude:12.1369622,longitude:-86.2335553}
// ,{latitude:12.1368912,longitude:-86.2329746}
// ,{latitude:12.1374846,longitude:-86.2330006}
// ,{latitude:12.1380215,longitude:-86.2331054}
// ,{latitude:12.138345,longitude:-86.2331695}
// ,{latitude:12.1383623,longitude:-86.2331215}
// ,{latitude:12.1384343,longitude:-86.232936}
// ,{latitude:12.1385734,longitude:-86.2327939}
// ,{latitude:12.1387564,longitude:-86.2326178}
// ,{latitude:12.1388199,longitude:-86.2325542}
// ,{latitude:12.1388689,longitude:-86.232424}
// ,{latitude:12.1390587,longitude:-86.231952}
// ,{latitude:12.1390576,longitude:-86.2315899}
// ,{latitude:12.1390556,longitude:-86.2312921}
// ,{latitude:12.139045,longitude:-86.2308076}
// ,{latitude:12.1390449,longitude:-86.2307822}
// ,{latitude:12.1390445,longitude:-86.2306538}
// ,{latitude:12.139035,longitude:-86.2305969}
// ,{latitude:12.139014,longitude:-86.2305473}
// ,{latitude:12.1389868,longitude:-86.2305017}
// ,{latitude:12.1386607,longitude:-86.2300836}
// ,{latitude:12.138479,longitude:-86.2297619}
// ,{latitude:12.1384327,longitude:-86.229542}
// ,{latitude:12.1384121,longitude:-86.2292985}
// ,{latitude:12.1384141,longitude:-86.2292423}
// ,{latitude:12.1384153,longitude:-86.2292106}
// ,{latitude:12.1384172,longitude:-86.229158}
// ,{latitude:12.1385215,longitude:-86.2284323}
// ,{latitude:12.1385524,longitude:-86.2282758}
// ,{latitude:12.1385975,longitude:-86.2281163}
// ,{latitude:12.1385995,longitude:-86.2280513}
// ,{latitude:12.1385917,longitude:-86.2279722}
// ,{latitude:12.1385038,longitude:-86.2278438}
// ,{latitude:12.1384374,longitude:-86.2277059}
// ,{latitude:12.138411,longitude:-86.2276274}
// ,{latitude:12.1384048,longitude:-86.2276092}
// ,{latitude:12.1383984,longitude:-86.2275903}
// ,{latitude:12.1383436,longitude:-86.2273311}
// ,{latitude:12.1383379,longitude:-86.2273024}
// ,{latitude:12.138332,longitude:-86.2272364}
// ,{latitude:12.138316,longitude:-86.2270755}
// ,{latitude:12.138303,longitude:-86.2269124}
// ,{latitude:12.1382871,longitude:-86.2266278}
// ,{latitude:12.1382571,longitude:-86.2250797}
// ,{latitude:12.138259,longitude:-86.2249644}
// ,{latitude:12.1382659,longitude:-86.2245335}
// ,{latitude:12.1382701,longitude:-86.2242737}
// ,{latitude:12.1382969,longitude:-86.2241853}
// ,{latitude:12.1383341,longitude:-86.2240622}
// ,{latitude:12.138365,longitude:-86.2239599}
// ,{latitude:12.1383897,longitude:-86.2238784}
// ,{latitude:12.1384945,longitude:-86.2234271}
// ,{latitude:12.1385018,longitude:-86.2229007}
// ,{latitude:12.1384672,longitude:-86.2219946}
// ,{latitude:12.1384613,longitude:-86.2218411}
// ,{latitude:12.1384602,longitude:-86.2218124}
// ,{latitude:12.1384413,longitude:-86.2213174}
// ,{latitude:12.1384331,longitude:-86.2210797}
// ,{latitude:12.1383907,longitude:-86.2206324}
// ,{latitude:12.1383556,longitude:-86.2204831}
// ,{latitude:12.1382979,longitude:-86.2197511}
// ,{latitude:12.1382927,longitude:-86.2197097}
// ,{latitude:12.1382504,longitude:-86.2192964}
// ,{latitude:12.1382354,longitude:-86.2192026}
// ,{latitude:12.1382087,longitude:-86.2191068}
// ,{latitude:12.1381865,longitude:-86.2190264}
// ,{latitude:12.1380636,longitude:-86.2187551}
// ,{latitude:12.1379287,longitude:-86.2185281}
// ,{latitude:12.1374794,longitude:-86.2177848}
// ,{latitude:12.1372731,longitude:-86.2174389}
// ,{latitude:12.1372142,longitude:-86.2173485}
// ,{latitude:12.1370003,longitude:-86.2169979}
// ,{latitude:12.1369898,longitude:-86.2169369}
// ,{latitude:12.1369841,longitude:-86.2168699}
// ,{latitude:12.1370865,longitude:-86.2168215}
// ,{latitude:12.1372529,longitude:-86.2167278}
// ,{latitude:12.1374559,longitude:-86.2166033}
// ,{latitude:12.1376831,longitude:-86.2164503}
// ,{latitude:12.1381156,longitude:-86.2161459}
// ,{latitude:12.1384911,longitude:-86.2158773}
// ,{latitude:12.1387439,longitude:-86.2157439}
// ,{latitude:12.1390103,longitude:-86.2156539}
// ,{latitude:12.1393946,longitude:-86.2155847}
// ,{latitude:12.1399308,longitude:-86.2154977}
// ,{latitude:12.1404202,longitude:-86.2154043}
// ,{latitude:12.1405153,longitude:-86.215387}
// ,{latitude:12.1406608,longitude:-86.2153586}
// ,{latitude:12.1406915,longitude:-86.2154605}
// ,{latitude:12.1407348,longitude:-86.2155778}
// ,{latitude:12.1410066,longitude:-86.2162179}
// ,{latitude:12.1411871,longitude:-86.2166429}
// ,{latitude:12.141459,longitude:-86.217326}
// ,{latitude:12.1417423,longitude:-86.2179812}
// ,{latitude:12.1417997,longitude:-86.218121}
// ,{latitude:12.1418606,longitude:-86.2183512}
// ,{latitude:12.1419123,longitude:-86.2185567}
// ,{latitude:12.141927,longitude:-86.2187612}
// ,{latitude:12.1420241,longitude:-86.2187618}
// ,{latitude:12.1421604,longitude:-86.2187583}
// ,{latitude:12.1422238,longitude:-86.2187566}
// ,{latitude:12.1424693,longitude:-86.2187602}
// ,{latitude:12.1426132,longitude:-86.2187622}
// ,{latitude:12.1428884,longitude:-86.2187681}
// ,{latitude:12.1431125,longitude:-86.2187967}
// ,{latitude:12.1433924,longitude:-86.2187854}
// ,{latitude:12.1435852,longitude:-86.2187493}
// ,{latitude:12.1440786,longitude:-86.2186379}
// ,{latitude:12.1441577,longitude:-86.218624}
// ,{latitude:12.1441858,longitude:-86.2186191}
// ,{latitude:12.1442444,longitude:-86.2186359}
// ,{latitude:12.1443254,longitude:-86.2186614}
// ,{latitude:12.1444189,longitude:-86.2186456}
// ,{latitude:12.1445309,longitude:-86.2186085}
// ,{latitude:12.1445855,longitude:-86.2185915}
// ,{latitude:12.144665,longitude:-86.2185645}
// ,{latitude:12.1445072,longitude:-86.2178921}
// ,{latitude:12.1444993,longitude:-86.2178583}
// ,{latitude:12.1445561,longitude:-86.2178679}
// ,{latitude:12.1446582,longitude:-86.2178329}
// ,{latitude:12.1447842,longitude:-86.217749}
// ,{latitude:12.1448878,longitude:-86.2176597}
// ,{latitude:12.1450174,longitude:-86.2175365}
// ,{latitude:12.1450611,longitude:-86.2174875}
// ,{latitude:12.1451149,longitude:-86.2174627}
// ,{latitude:12.1452226,longitude:-86.2174287}
// ,{latitude:12.145322,longitude:-86.2173633}
// ,{latitude:12.1454309,longitude:-86.217313}
// ,{latitude:12.1457358,longitude:-86.2171795}
// ,{latitude:12.1460568,longitude:-86.2170752}
// ,{latitude:12.146458,longitude:-86.2170107}
// ,{latitude:12.1468521,longitude:-86.2169674}
// ,{latitude:12.1469673,longitude:-86.2169548}
// ,{latitude:12.1473795,longitude:-86.2168979}
// ,{latitude:12.1477577,longitude:-86.2168479}
// ,{latitude:12.148102,longitude:-86.2168008}
// ,{latitude:12.1481754,longitude:-86.216833}
// ,{latitude:12.1482328,longitude:-86.2169871}
// ,{latitude:12.1483229,longitude:-86.2176208}
// ,{latitude:12.1483348,longitude:-86.2177043}
// ,{latitude:12.1484768,longitude:-86.217744}
// ,{latitude:12.1485836,longitude:-86.2177345}
// ,{latitude:12.1487262,longitude:-86.2177247}
// ,{latitude:12.1488648,longitude:-86.2177103}
// ,{latitude:12.1494005,longitude:-86.2176196}
// ,{latitude:12.1495618,longitude:-86.2175948}
// ,{latitude:12.149665,longitude:-86.2175825}
// ,{latitude:12.1497318,longitude:-86.2175727}
// ,{latitude:12.149824,longitude:-86.2175594}
// ,{latitude:12.1498158,longitude:-86.2174604}
// ,{latitude:12.1497435,longitude:-86.2167597}
// ,{latitude:12.1496783,longitude:-86.2161162}
// ,{latitude:12.1495868,longitude:-86.2151664}
// ,{latitude:12.1495516,longitude:-86.2148268}
// ,{latitude:12.1495424,longitude:-86.2146874}
// ,{latitude:12.149517,longitude:-86.2143479}
// ,{latitude:12.1495044,longitude:-86.2140812}
// ,{latitude:12.1493921,longitude:-86.2130185}
// ,{latitude:12.1493619,longitude:-86.212713}
// ,{latitude:12.1493299,longitude:-86.2123765}
// ,{latitude:12.149241,longitude:-86.2116005}
// ,{latitude:12.1492357,longitude:-86.211554}
// ,{latitude:12.1490471,longitude:-86.21064}
// ,{latitude:12.1488373,longitude:-86.2097817}
// ,{latitude:12.1488277,longitude:-86.2097322}
// ,{latitude:12.1488252,longitude:-86.209712}
// ,{latitude:12.1487964,longitude:-86.2094648}
// ,{latitude:12.1487919,longitude:-86.2093883}
// ,{latitude:12.1487786,longitude:-86.2091294}
// ,{latitude:12.148787,longitude:-86.2090006}
// ,{latitude:12.1488037,longitude:-86.2088204}
// ,{latitude:12.1488508,longitude:-86.2085903}
// ,{latitude:12.1488578,longitude:-86.208556}
// ,{latitude:12.1488671,longitude:-86.2084931}
// ,{latitude:12.1489128,longitude:-86.2081853}
// ,{latitude:12.1488876,longitude:-86.2074128}
// ,{latitude:12.1487786,longitude:-86.2062455}
// ,{latitude:12.1487407,longitude:-86.2058156}
// ,{latitude:12.148703,longitude:-86.2053872}
// ,{latitude:12.1486108,longitude:-86.2044271}
// ,{latitude:12.1485292,longitude:-86.2035772}
// ,{latitude:12.1485195,longitude:-86.2034764}
// ,{latitude:12.1485101,longitude:-86.2033787}
// ,{latitude:12.1484479,longitude:-86.202642}
// ,{latitude:12.1484206,longitude:-86.2022582}
// ,{latitude:12.148567,longitude:-86.2022451}
// ,{latitude:12.1485499,longitude:-86.2020575}
// ,{latitude:12.1485017,longitude:-86.20151}
// ,{latitude:12.1483586,longitude:-86.1999373}
// ,{latitude:12.1483424,longitude:-86.1997166}
// ,{latitude:12.1483357,longitude:-86.1996419}
// ,{latitude:12.1484471,longitude:-86.1996376}
// ,{latitude:12.1489807,longitude:-86.1996052}
// ,{latitude:12.1490922,longitude:-86.1996007}
// ,{latitude:12.1500033,longitude:-86.1995368}
// ,{latitude:12.1505626,longitude:-86.1994847}
// ,{latitude:12.1513291,longitude:-86.1993686}
// ,{latitude:12.1518562,longitude:-86.1993235}
// ,{latitude:12.1523653,longitude:-86.1992723}
// ,{latitude:12.1529396,longitude:-86.1992238}
// ,{latitude:12.1529994,longitude:-86.1992185}
// ,{latitude:12.1530715,longitude:-86.1992157}
// ,{latitude:12.1533675,longitude:-86.199197}
// ,{latitude:12.1536145,longitude:-86.1991713}
// ,{latitude:12.1543771,longitude:-86.1991087}
// ,{latitude:12.1544575,longitude:-86.1991029}
// ,{latitude:12.1545022,longitude:-86.1990996}
// ,{latitude:12.1547938,longitude:-86.1990783}
// ,{latitude:12.1550779,longitude:-86.1990472}
// ,{latitude:12.1556001,longitude:-86.1989783}
// ,{latitude:12.1559195,longitude:-86.1989501}
// ,{latitude:12.156879,longitude:-86.1988633}
//     ]


    let paradasQueDeseoVer=[
        {id:1,latitude:12.1578077,longitude:-86.3137174,descripcion:""}
,{id:2,latitude:12.1559049,longitude:-86.3129332,descripcion:""}
,{id:3,latitude:12.1545880,longitude:-86.3121211,descripcion:""}
,{id:4,latitude:12.1546594,longitude:-86.3106215,descripcion:""}
,{id:5,latitude:12.1523231,longitude:-86.3090229,descripcion:""}
,{id:6,latitude:12.1536263,longitude:-86.3061664,descripcion:""}
,{id:7,latitude:12.1556345,longitude:-86.3056112,descripcion:""}
,{id:8,latitude:12.1546795,longitude:-86.3039617,descripcion:""}
,{id:9,latitude:12.1533583,longitude:-86.3025501,descripcion:""}
,{id:10,latitude:12.1541202,longitude:-86.2984103,descripcion:""}
,{id:11,latitude:12.1546700,longitude:-86.2961233,descripcion:""}
,{id:12,latitude:12.1554300,longitude:-86.2910826,descripcion:""}
,{id:13,latitude:12.1547958,longitude:-86.2887290,descripcion:""}
,{id:14,latitude:12.1523480,longitude:-86.2883806,descripcion:""}
,{id:15,latitude:12.1522055,longitude:-86.2850996,descripcion:""}
,{id:16,latitude:12.1521400,longitude:-86.2834939,descripcion:""}
,{id:17,latitude:12.1492573,longitude:-86.2821316,descripcion:""}
,{id:18,latitude:12.1458234,longitude:-86.2821416,descripcion:""}
,{id:19,latitude:12.1455040,longitude:-86.2790944,descripcion:""}
,{id:20,latitude:12.1449178,longitude:-86.2761379,descripcion:""}
,{id:21,latitude:12.1453369,longitude:-86.2738749,descripcion:""}
,{id:22,latitude:12.1441639,longitude:-86.2671200,descripcion:""}
,{id:23,latitude:12.1442320,longitude:-86.2615905,descripcion:""}
,{id:24,latitude:12.1434856,longitude:-86.2592914,descripcion:""}
,{id:25,latitude:12.1426301,longitude:-86.2567191,descripcion:""}
,{id:26,latitude:12.1423045,longitude:-86.2532899,descripcion:""}
,{id:27,latitude:12.1435307,longitude:-86.2509417,descripcion:""}
,{id:28,latitude:12.1488611,longitude:-86.2490939,descripcion:""}
,{id:29,latitude:12.1519890,longitude:-86.2490227,descripcion:""}
,{id:30,latitude:12.1525774,longitude:-86.2483190,descripcion:""}
,{id:31,latitude:12.1523704,longitude:-86.2460690,descripcion:""}
,{id:32,latitude:12.1520775,longitude:-86.2427903,descripcion:""}
,{id:33,latitude:12.1514163,longitude:-86.2370197,descripcion:""}
,{id:34,latitude:12.1482207,longitude:-86.2373478,descripcion:""}
,{id:35,latitude:12.1456100,longitude:-86.2376122,descripcion:""}
,{id:36,latitude:12.1422472,longitude:-86.2378000,descripcion:""}
,{id:37,latitude:12.1396747,longitude:-86.2379861,descripcion:""}
,{id:38,latitude:12.1360896,longitude:-86.2383542,descripcion:""}
,{id:39,latitude:12.1340124,longitude:-86.2383082,descripcion:""}
,{id:40,latitude:12.1310096,longitude:-86.2331681,descripcion:""}
,{id:41,latitude:12.1254386,longitude:-86.2308942,descripcion:""}
,{id:42,latitude:12.1225230,longitude:-86.2318039,descripcion:""}
,{id:43,latitude:12.1198732,longitude:-86.2319782,descripcion:""}
,{id:44,latitude:12.1217318,longitude:-86.2281988,descripcion:""}
,{id:45,latitude:12.1209281,longitude:-86.2253589,descripcion:""}
,{id:46,latitude:12.1228539,longitude:-86.2240672,descripcion:""}
,{id:47,latitude:12.1248137,longitude:-86.2236384,descripcion:""}
,{id:48,latitude:12.1266167,longitude:-86.2232401,descripcion:""}
,{id:49,latitude:12.1288595,longitude:-86.2214981,descripcion:""}
,{id:50,latitude:12.1286691,longitude:-86.2196044,descripcion:""}
,{id:51,latitude:12.1279566,longitude:-86.2141762,descripcion:""}
,{id:52,latitude:12.1276504,longitude:-86.2119791,descripcion:""}
,{id:53,latitude:12.1272342,longitude:-86.2093242,descripcion:""}
,{id:54,latitude:12.1266587,longitude:-86.2066634,descripcion:""}
,{id:55,latitude:12.1269069,longitude:-86.2036062,descripcion:""}
,{id:56,latitude:12.1297164,longitude:-86.2017682,descripcion:""}
,{id:57,latitude:12.1329838,longitude:-86.1995644,descripcion:""}
,{id:58,latitude:12.1339029,longitude:-86.1978481,descripcion:""}
,{id:59,latitude:12.1349562,longitude:-86.1943970,descripcion:""}
    ];
    

    // for(let i=0;i<arreglo.length;i++){
    //     for(let y=0;y<lineaDeLaRuta.length;y++){
    //         let distancia=Math.sqrt(Math.pow((arreglo[i].latitude-lineaDeLaRuta[y].latitude),2)
    //         +Math.pow((arreglo[i].longitude-lineaDeLaRuta[y].longitude),2));

    //         if(distancia<=0.001153){
    //             paradasQueDeseoVer.push(arreglo[i]);
    //             y=lineaDeLaRuta.length;
    //         }
    //     }
    // }


    
    return(
        <View>
            {
                paradasQueDeseoVer.map((item)=>{
                    return(
                        <Marker
                            key={item.id}
                            coordinate={{latitude:item.latitude,longitude:item.longitude}}
                        >
                            <Text style={{color:'black'}}>{item.id}</Text>
                            <Image style={{height:20,width:20}} source={require("../assets/parada-de-autobusIzquierda.png")}></Image>

                        </Marker>
                    )
                })
            }
        </View>
    )
}


export default Paradas