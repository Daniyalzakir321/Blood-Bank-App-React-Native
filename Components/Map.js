import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Text, PermissionsAndroid } from 'react-native'
const { width, height } = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


export default function Map({ navigation, route }) {

    const [ll, setll] = useState([])
    const [la, setla] = useState('')
    const [lo, setlo] = useState('')
    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            setll(position.coords)
            console.log("position.coords=========>", position.coords)
            console.log("LA=========>", position.coords.latitude)
            console.log("LO=========>", position.coords.longitude)
            setla(position.coords.latitude)
            setlo(position.coords.longitude)

        })
    }, [])

    // console.log("Latitude=========>",ll.latitude)
    // console.log("Longitude=========>",ll.longitude)
    console.log("LATI===", la)
    console.log("LONG===", lo)




    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Blood Bank App',
                    'message': 'Need access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
                //   alert("You can use the location");
            } else {
                console.log("location permission denied")
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    };
    requestCameraPermission()


    return (
        <View>

            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: "#d2232a", elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                    style={{ marginLeft: -20, marginVertical: 14, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}>&nbsp;˂&nbsp;</Text>
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

            {/* <Text style={{
                color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
            }}>   Address:    v{route.params.add}</Text>
 */}




            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    pinColor='red'
                    region={{
                        latitude: la,
                        longitude: lo,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: la,
                            longitude: lo,
                        }}
                        // image={require('./pin.png')}
                        title={route.params.fn + " " + route.params.ln}
                        description={"Blood Group " + route.params.bg}
                    />
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