import React from 'react'
import { StyleSheet, View, Image, Dimensions, StatusBar, TouchableOpacity, Text } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto  from 'react-native-vector-icons/Fontisto';
const { width, height } = Dimensions.get('window');

export default function Whocandonate({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#d2232a', elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                    style={{ marginLeft: -20, marginVertical: 14, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}><Ionicons name="md-chevron-back" size={30} color="#ffff" /></Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white', fontFamily:'Montserrat-SemiBold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>Blood Groups</Text>
                <Text style={{marginVertical:18}}><MaterialCommunityIcons name="blood-bag" size={22} color="#ffff" /></Text>
            </View>
         
            <View style={{ alignItems:'center' }}>
                <Text style={{
                    color: 'white', fontFamily:'Montserrat-Bold', marginVertical: 5, fontSize: 23, marginTop: 50,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>WHICH BLOOD TYPES</Text>
                <Text style={{
                    color: 'white', fontFamily:'Montserrat-Bold', marginVertical: 5, fontSize: 15,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>AM I COMPATIBLE WITH?</Text>
            </View>

            <Image source={require('./Images/bloodgroups.png')}
                style={{ flex: 0.7, backgroundColor: '#d2232a', width: '100%', resizeMode: 'contain', }} />
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d2232a'
    },
});