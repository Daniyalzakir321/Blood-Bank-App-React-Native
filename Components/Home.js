import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Modal, Dimensions, StatusBar } from 'react-native'
import Map from './Map.js'
const { width, height } = Dimensions.get('window');

export default function Homes({navigation}) {

    const [data, setData] = useState([])
    useEffect(() => {
        firestore().collection('USER-DATA').orderBy('TimeStamp', 'desc').onSnapshot(function (querySnapshot) {
            setData(
                querySnapshot.docs.map((doc) => ({
                    Id: doc.id,
                    fn: doc.data().FirstName,
                    ln: doc.data().LastName,
                    gender: doc.data().Gender,
                    bloodgroup: doc.data().BloodGroup,
                    address: doc.data().Address,
                    pn: doc.data().PhoneNum,
                    dateTime: doc.data().DateTime,
                }))

            )
        })
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f1f0" />
            <View style={styles.start}>
                <ImageBackground source={{ uri: 'https://res.cloudinary.com/ds62zhv7k/image/upload/v1611513795/dsadsadas_voybyo.png' }}
                    style={{
                        flex: 1, backgroundColor: '#d2232a',
                        justifyContent: 'center',
                    }} >
                         <View style={{
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('BBL')}}style={{backgroundColor:'#ffff', borderRadius:10, padding:20,paddingHorizontal:25, elevation:5,alignItems:'center', borderColor:"red", borderWidth:2  }} >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color:'red',textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2 }}>Donate</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color:'red',textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2}}>Blood</Text>

                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('who')}} style={{backgroundColor:'#ffff', borderRadius:10, padding:20,paddingHorizontal:26, elevation:5, alignItems:'center', borderColor:"red", borderWidth:2 }} >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color:'red',textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2}}> Blood </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color:'red',textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2 }}>Groups</Text>
                        </TouchableOpacity>
                        </View>
                 </ImageBackground>   
            </View>

            <Text style={{ fontSize: 17, fontWeight: 'bold', color:'black',textShadowColor: 'grey', textShadowOffset: { width: 0.2, height: 0.2 }, textShadowRadius: 2,marginLeft:10,marginTop:10 }}> Available Donors</Text>

            <ScrollView style={styles.end}>
                {data.map((d, i) => {
                    return <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Map', {
                        key: d.Id,
                        fn: d.fn, 
                        ln: d.ln,
                        bg:d.bloodgroup,
                        add:d.address,
                      }) 
                      }} style={styles.data} key={i}>
                       
                        <View style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                            <View>
                               {d.gender=='Female'?
                                <Image source={{ uri: 'https://www.pngarts.com/files/3/Avatar-PNG-High-Quality-Image.png' }}
                                    style={{ width: 65, height: 65, borderRadius: 50, marginRight: 12}} />
                                :
                                <Image source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png' }}
                                    style={{ width: 65, height: 65, borderRadius: 50, marginRight: 12 }} />
                                }
                                </View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize', paddingTop:5 }}>{d.fn}  {d.ln}</Text>
                                {/* <Text>{d.gender}</Text> */}
                                <Text style={{ fontSize: 12, textTransform: 'capitalize', paddingTop:3 }}>{d.pn}</Text>
                                {/* <Text>{d.address}</Text> */}
                                {/* <Text>{d.dateTime}</Text> */}
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color:'red',textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2,marginRight:5 }}>{d.bloodgroup}</Text>
                        </View>
                    </TouchableOpacity>
                })}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    start: {
        flex: 0.4,
    },

    end: {
        marginTop:10,
        flex: 1,
        backgroundColor: "#f4f0ef",
    },
    data: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        backgroundColor: "#ffff",
        elevation: 5,
        borderRadius: 15,
        padding: 12,
        // paddingLeft:40
    }




});
