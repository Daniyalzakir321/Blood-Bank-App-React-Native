import React from 'react'
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Text } from 'react-native'
const { width, height } = Dimensions.get('window');

export default function Whocandonate({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#d2232a', elevation: 5, width: '100%', }}>
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
                }}>Blood Groups    </Text>
                <Text></Text>
            </View>
         
            <View style={{ alignItems:'center' }}>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 5, fontSize: 25, marginTop: 50,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>WHICH BLOOD TYPES</Text>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 5, fontSize: 15,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>AM I COMPATIBLE WITH?</Text>
            </View>

            <Image source={{ uri: 'https://res.cloudinary.com/ds62zhv7k/image/upload/v1611682466/jkdskjjkjf_aooeij.png' }}
                style={{ flex: 0.7, backgroundColor: '#d2232a', width: '100%', resizeMode: 'contain', }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#d2232a'
    },
});