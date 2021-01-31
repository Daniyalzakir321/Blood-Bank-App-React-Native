import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Modal, Dimensions, StatusBar, Alert } from 'react-native'
import Map from './Map.js'
const { width, height } = Dimensions.get('window');
import Ionicons  from 'react-native-vector-icons/Ionicons';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import Entypo  from 'react-native-vector-icons/Entypo';
import Fontisto  from 'react-native-vector-icons/Fontisto';

import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux';
import * as auththenticate from './Store/action';

export default function Homes({navigation, route}) {

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

    const dispatch = useDispatch()
    const SignOut = () => {
    // firebase().auth().signOut()
    // .then((res) => {
        console.log('LogOut Successful!')
        navigation.replace('Signin')         
    //     dispatch(auththenticate.LoginUser({
    //     UserEmail: '' , })
    // )
    // })
    // .catch(function(error) {
    //     console.log("Error", error.message);
    // })
    }
const [search, setSearch] = useState("")
  const filterSearch = data.filter((f) => {
      return f.bloodgroup.toLowerCase().includes(search.toLowerCase())
  })

const e_mail= route.params.email 

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f1f0" />
            <View style={styles.start}>
                <ImageBackground source={{ uri: 'https://res.cloudinary.com/ds62zhv7k/image/upload/v1611513795/dsadsadas_voybyo.png' }}
                    style={{
                        flex: 1, backgroundColor: '#d2232a',
                        justifyContent: 'center',
                    }} >
                   
                    <TouchableOpacity activeOpacity={0.7} onPress={()=> {SignOut()}} style={{borderRadius:15, padding:5, position:'absolute', right:5 , top:5, backgroundColor:'#ffff', elevation:5 }} >
                                <AntDesign name="logout" size={17} color="black" style={{elevation:5}} />
                    </TouchableOpacity>

                         <View style={{
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('BBL')}}style={{backgroundColor:'#ffff', borderRadius:10, padding:20, paddingHorizontal:25, alignItems:'center', borderColor:"red", borderWidth:2  }} >
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





<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', width:'100%',marginVertical:10, paddingHorizontal:12 }}>
         
            <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:'#ffff', borderRadius:10, padding:10.5, elevation:5,alignItems:'center',  }} >
                   <Text style={{ fontSize: 16, fontWeight: 'bold', color:'black',textShadowColor: 'grey', textShadowOffset: { width: 0.2, height: 0.2 }, textShadowRadius: 1 }}>Donors</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'row', justifyContent: 'space-evenly',backgroundColor:'#ffff', borderRadius:25, paddingVertical:0,paddingHorizontal:10, elevation:4,alignItems:'center' }} >
                                <RNPickerSelect onValueChange={(text) => {setSearch(text) }}
                                    placeholder={{ label: "Search by blood group", value:'', }}
                                    style={{ ...pickerSelectStyles }}
                                    useNativeAndroidPickerStyle={false}
                                    items={[
                                        { label: 'All blood groups', value: '' },
                                        { label: 'O+', value: 'O+' },
                                        { label: 'A+', value: 'A+' },
                                        { label: 'B+', value: 'B+' },
                                        { label: 'AB+', value: 'AB+' },
                                        { label: 'O-', value: 'O-' },
                                        { label: 'A-', value: 'A-' },
                                        { label: 'B-', value: 'B-' },
                                        { label: 'AB-', value: 'AB-' },
                                    ]}
                                />
                                <Ionicons name="search" size={17} color="grey" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Set',{email:e_mail})}} style={{backgroundColor:'#ffff', borderRadius:10, padding:10, elevation:5,alignItems:'center'  }} >
                 <Ionicons name="md-settings-outline" size={20} color="black" />
            </TouchableOpacity>
</View>



            <ScrollView style={styles.end}>
                {filterSearch.map((d, i) => {
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
                                    style={{ width: 70, height: 70, borderRadius: 50, marginRight: 12}} />
                                :
                                <Image source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png' }}
                                    style={{ width: 70, height: 70, borderRadius: 50, marginRight: 12 }} />
                                }
                                </View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize', paddingTop:1 }}>{d.fn}  {d.ln}</Text>
                                <Text style={{ fontSize: 12, textTransform: 'capitalize', paddingTop:1 }}><FontAwesome name="phone" size={12} color="black" />  {d.pn}</Text>
                                <Text style={{ fontSize: 10, textTransform: 'capitalize', paddingTop:1 }}><Entypo name="location-pin" size={11.3} color="black" />  {d.address}</Text>
                                <Text style={{ fontSize: 8, textTransform: 'capitalize', paddingTop:2}}><Fontisto name="date" size={10} color="black" />   {d.dateTime}</Text>                     
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
        flex: 0.5,
    },

    end: {
        marginTop:8,
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
        padding: 10,
        // paddingLeft:18
    }




});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        width:160,
        fontSize: 14,
        color: "grey",
         paddingVertical:7,
    },
    placeholder: {
        color: 'grey',
    },
});
