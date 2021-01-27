import React, { useState } from 'react'
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Text } from 'react-native'
const { width, height } = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';


export default function BloodBanksLocations({ navigation, route }) {

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
                }}>Donate To Blood Banks</Text>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}></Text>
            </View>


            <View style={styles.container}>
                <WebView
                    source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d115788.38475721108!2d67.05528341796875!3d24.91888212180192!3m2!1i1024!2i768!4f13.1!2m1!1sblood%20bank!5e0!3m2!1sen!2sus!4v1611773804478!5m2!1sen!2sus" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>' }}
                    // style={{ marginTop: 20 }}
                />
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