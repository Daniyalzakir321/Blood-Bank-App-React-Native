import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Text, PermissionsAndroid,Platform } from 'react-native'
const { width, height } = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout, Polyline } from 'react-native-maps';
import { decode } from "@mapbox/polyline";
import Share from 'react-native-share';


export default function Map({ navigation, route }) {
      
      const socialShare = async (d) => {
        const shareOptions = {
            // title: `Hi There `,
            message: `Hi There... \nWe found a blood group for you. \nHere are the details of donor: \n\nName: ${d.fn} ${d.ln} \nGroup: ${d.bloodgroup} \nPhone: ${d.pn} \nAddress: ${d.address}`,
            url: '\n\nFor details download our app: https://react-native-share.github.io',
            // social: Share.Social.WHATSAPP,
            // whatsAppNumber: "9199999999",  
            // filename: 'test' , 
          };

        Share.open(shareOptions)  // Share.shareSingle(shareOptions)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
      }

    const [locationData, setLocationData] = useState([])
    useEffect(() => {
        firestore().collection('USER-DATA').orderBy('TimeStamp', 'desc').onSnapshot(function (querySnapshot) {
            setLocationData(
                querySnapshot.docs.map((doc) => ({
                    Id: doc.id,
                    fn: doc.data().FirstName,
                    ln: doc.data().LastName,
                    gender: doc.data().Gender,
                    bloodgroup: doc.data().BloodGroup,
                    address: doc.data().Address,
                    doner: doc.data().Doner,
                    pn: doc.data().PhoneNum,
                    ala: doc.data().Latitude,
                    alo: doc.data().Longitude,
                }))
            )
        })
    }, [])
    console.log("locationData>>>===", locationData)



    const [la, setla] = useState('')
    const [lo, setlo] = useState('')
    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            setla(position.coords.latitude)
            setlo(position.coords.longitude)
        })
    }, [])
    console.log("Curent LATI===", la)
    console.log("Curent LONG===", lo)


    console.log("Curent LONG==dasdsadsaddddddddddddddd=", route.params.laroute)
    console.log("Curent LONG==dasdsadsaddddddddddddddd=", route.params.loroute)


    // direction(startLoc, destinationLoc)

    // const direction = async ()=>{
    //     try {
    //         let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
    //         let respJson = await resp.json();
    //         let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    //         let coords = points.map((point, index) => {
    //             return  {
    //                 latitude : point[0],
    //                 longitude : point[1]
    //             }
    //         })
    //         this.setState({coords: coords})
    //         return coords
    //     } catch(error) {
    //         return error
    //     }
    // }

    // const getDirections = async (startLoc, destinationLoc) => {
    //     try {
    //         const KEY = "AIzaSyCAwjvt8eZER4w6PpdvfzeqmSnRN_obry4";
    //         let resp = await fetch(
    //             `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    //         );
    //         console.log("resp====>", resp)
    //         let respJson = await resp.json();
    //         let points = decode(respJson.routes[0].overview_polyline.points);
    //         console.log("points=======>", points);
    //         let coords = points.map((point, index) => {
    //             console.log("coords=======>", coords);
    //             return {
    //                 latitude: point[0],
    //                 longitude: point[1]
    //             };

    //         });
    //         return coords;
    //     } catch (error) {
    //         return error;
    //     }
    // };


    // const [cords, setCords] = useState([]);

    // useEffect(() => {
    //     getDirections("40.1884979, 29.061018", "41.0082,28.9784")
    //         .then(coords => setCords(coords))
    //         .catch(err => console.log("Something went wrong"));
    // }, [])

    // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;===>", cords)

    return (
        <View>

            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "#d2232a", elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                    style={{ marginLeft: -10, marginVertical: 14, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}><Ionicons name="md-chevron-back" size={30} color="#ffff" /></Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white',  fontFamily:'Montserrat-SemiBold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>{route.params.fn} {route.params.ln}  </Text>
                <Text style={{
                    color: 'white',  fontFamily:'Montserrat-SemiBold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>{route.params.bg}</Text>
            </View>

            <View style={styles.container}>
                <MapView
                    minZoomLevel={4}  // default => 0
                    maxZoomLevel={20} // default => 20
                    enableZoomControl={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: Number(la),
                        longitude: Number(lo),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} >

                    {/* <Polyline coordinates={cords} strokeColor="red" strokeWidth={2} /> */}

                    <Polyline
                        coordinates={[
                            { latitude: Number(la), longitude: Number(lo) },
                            { latitude: Number(route.params.laroute), longitude: Number(route.params.loroute) },
                        ]}
                        strokeColor="#69A0FA"
                        strokeWidth={2.5}
                    />

                    <Marker
                        pinColor={'skyblue'}
                        draggable
                        onDragEnd={(e) => { e.nativeEvent.coordinate }}
                        // pinColor={'skyblue'}
                        coordinate={{
                            latitude: Number(la),
                            longitude: Number(lo),
                        }} >

                        <Callout>
                            <View style={{ alignItems: 'center', marginTop: -20 }}>
                                <View>
                                    <Text style={{ paddingBottom: 35 }}>
                                        <Image source={require('./Images/mylocation.jpg')}
                                            style={{ width: 70, height: 75, borderRadius: 10 }} />
                                    </Text>
                                </View>
                                <View style={{ width: 120, paddingTop: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', textTransform: 'uppercase' }} >Me</Text>
                                </View>
                            </View>
                        </Callout >

                    </Marker>


                    {locationData.map((d, i) => {
                        return <>{d.doner=='Yes'? <Marker
                            key={i}
                            coordinate={{
                                latitude: Number(d.ala),
                                longitude: Number(d.alo),
                            }}
                            width={48}
                            height={48} >

                            <Callout  onPress={() => {socialShare(d)}}>
                                <View style={{ alignItems: 'center', marginTop: -22 }}>
                                    <View>

                                        <Text style={{ paddingBottom: 35 }}>
                                            {d.gender == 'Female' ?
                                                <Image source={require('./Images/female.png')}
                                                    style={{ width: 70, height: 70, borderRadius: 50, }} />
                                                :
                                                <Image source={require('./Images/male.webp')}
                                                    style={{ width: 70, height: 70, borderRadius: 50 }} />
                                            }</Text>
                                    </View>

                                    <View style={{ width: 120, paddingTop: 1, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize' }} >{d.fn} {d.ln}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'uppercase' }}>{d.bloodgroup}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize' }}>{d.address}</Text>
                                    </View>

                                </View>
                            </Callout >

                        </Marker>
                        :
                        <></>
                        }
                        </>
                        
                        
                    })}


                    {/* {locationData.map((d, i) => {
                        return <Marker
                            key={i}
                            center={{
                                latitude: Number(d.ala),
                                longitude: Number(d.alo),
                            }}
                            radius={200}
                            fillColor={'#AADAFF'}
                            // image={require('./pin.png')}
                            width={48}
                            height={48}
                            title={d.fn + " " + d.ln+"    "+  d.bloodgroup}
                            description={"Gender: "+d.gender}
                        >
                        <Image source={require('./pin.png')} style={{height: 45, width:45 }} />
                        </Marker>
                    })} */}


                    {/* <Marker
                        coordinate={{
                            latitude: la,
                            longitude: lo,
                        }}
                        // image={require('./pin.png')}
                        title={route.params.fn + " " + route.params.ln}
                        description={"Blood Group " + route.params.bg}
                    /> */}
                </MapView>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: 'red'
        // ...StyleSheet.absoluteFillObject,
    },
    map: {
        width: '100%',
        height: '100%',
        // ...StyleSheet.absoluteFillObject,/
    },
});