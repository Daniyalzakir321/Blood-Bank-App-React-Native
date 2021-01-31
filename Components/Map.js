import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Text, PermissionsAndroid } from 'react-native'
const { width, height } = Dimensions.get('window');
import firestore from '@react-native-firebase/firestore';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import pin from './pin.png'


export default function Map({ navigation, route }) {

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



    return (
        <View>

            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "#d2232a", elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                    style={{ marginLeft: -20, marginVertical: 14, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}><Ionicons name="md-chevron-back" size={30} color="#ffff" /></Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>{route.params.fn} {route.params.ln}  </Text>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>{route.params.bg}</Text>
            </View>

            <View style={styles.container}>
                <MapView
                minZoomLevel={4}  // default => 0
                maxZoomLevel={20} // default => 20
                enableZoomControl={true}
                showsUserLocation = {true}
                showsMyLocationButton = {true}
                zoomEnabled = {true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    // pinColor='red'
                    region={{
                        latitude: Number(la),
                        longitude: Number(lo),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} >       
                        <Marker
                            coordinate={{
                                latitude: Number(la),
                                longitude: Number(lo),
                            }} >

                            <Callout>
                                <View style={{ alignItems:'center', marginTop:-20}}>  
                                     <View>  
                                         <Text style={{paddingBottom:35}}> 
                                             <Image source={{ uri: 'https://www.seekpng.com/png/detail/402-4022635_avatar-generic-person-icon.png' }}
                                             style={{ width: 70, height: 75, borderRadius: 10}} />
                                         </Text>
                                     </View>  
                                     <View  style={{width:120,paddingTop:1,alignItems:'center' }}>  
                                        <Text style={{ fontSize: 17, fontWeight: 'bold', textTransform: 'uppercase'}} >Me</Text>
                                     </View>  
                                </View>
                            </Callout >
                            
                        </Marker>


                    {locationData.map((d, i) => {
                        return <Marker
                            key={i}
                            coordinate={{
                                latitude: Number(d.ala),
                                longitude: Number(d.alo),
                            }}
                            width={48}
                            height={48} >

                            <Callout>
                                     <View style={{ alignItems:'center', marginTop:-22}}>  
                                     <View>  

                                      <Text style={{paddingBottom:35}}> 
                                      {d.gender=='Female'?
                                      <Image source={{ uri: 'https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png' }}
                                         style={{ width: 70, height: 70, borderRadius: 50,}} />
                                          :
                                      <Image source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png' }}
                                          style={{ width: 70, height: 70, borderRadius: 50 }} />
                                         }</Text>
                                     </View>  

                                     <View  style={{width:120,paddingTop:1,alignItems:'center' }}>  
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize'}} >{d.fn} {d.ln}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'uppercase'}}>{d.bloodgroup}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', textTransform: 'capitalize'}}>{d.address}</Text>
                                     </View>  
                                    
                                </View>
                            </Callout >

                        </Marker>
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