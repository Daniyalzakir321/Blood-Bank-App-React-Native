import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import Entypo  from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux'
const { width, height } = Dimensions.get('window');

export default function Setting({navigation, route}) {

    const data = useSelector(state => state.user)
    console.log('ddddddddddddddddd', data.UserEmail)
    console.log('NNNNNNN', route.params.email)

// const e_mail=route.params.email
//     const [fn, setFn] = useState('')
//     const [ln, setLn] = useState('')
//     const [gender, setGender] = useState('')
//     const [bloodgroup, setBloodgroup] = useState('')
//     const [address, setAddress] = useState('')
//     const [doner, setDoner] = useState('')
//     const [pn, setPn] = useState('')
//     const [registerdatetime, setRegisterdatetime] = useState('')

// useEffect(() => {
// Search()
// }, [])

//   const Search = () => {
//       firebase().collection('USER-DATA').doc('basiq@b.com').get()
//       .then(function (doc) {
//         setFn(doc.data().FirstName),
//         setLn(doc.data().LastName),
//         setGender(doc.data().Gender),
//         setBloodgroup(doc.data().BloodGroup),
//         setAddress(doc.data().Address),
//         setDoner(doc.data().Doner),
//         setPn(doc.data().PhoneNum),
//         setRegisterdatetime(doc.data().DateTime)
//       })
//       .then(() => {
//         console.log('✅ Search Successfull')
//       })
//       .catch((error) => {
//         console.log(error.message);
//         console.log('⚠️ This Key Is Not Present In Database', error.message)
//       });
//   }






   const [su, setsu] = useState(false)
    setTimeout(() => {
        setsu(false)
    }, 6000);

  

    const [la, setla] = useState('')
    const [lo, setlo] = useState('')
    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            setla(position.coords.latitude)
            setlo(position.coords.longitude)
        })
    }, [])
 

    // Update
     
  const Update = () => {
        //  if (fn.length == '' || ln.length == '' || address.length == '' || pn.length == '') {
        //     Alert.alert("User Information", "Text Field Can Not Be Empty")
        // }
        // else if (gender == null) {
        //     Alert.alert("Gender", "Please Select Gender")
        // }
        // else if (bloodgroup == null) {
        //     Alert.alert("Blood Group", "Please Select Blood Group")
        // }
        // else if (doner == null) {
        //     Alert.alert("Doner", "Please Select Are You A Doner?")
        // }
        //  if (la == 0 || lo == 0) {
        //     console.log("Location Access Successfull", typeof (la), la)
        // }
        // else{
        //     firebase().collection('USER-DATA').doc(data.UserEmail).update({
        //         // FirstName: fn,
        //         // LastName: ln,
        //         // Gender: gender,
        //         // BloodGroup: bloodgroup,
        //         // Address: address,
        //         // Doner: doner,
        //         // PhoneNum: pn,
        //         Latitude: la,
        //         Longitude: lo,
        //         })
        // .then(() => {
        //     Alert.alert('Edit', 'Edit Successfull');
        //      })
        // .catch(error => {
        //     Alert.alert('Weak Password!', error.message);
        // })
    // }
}
  

// {data.UserName}
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#d2232a', elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack() }
                    style={{ marginLeft: -20, marginVertical: 14, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}><Ionicons name="md-chevron-back" size={30} color="#ffff" /></Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                }}>Settings </Text>
                <Text style={{marginVertical:18}}><Ionicons name="md-settings-outline" size={20} color="white" /></Text>
            </View>
         

            {/* <View style={{ alignItems:'center' }}>
                <Text style={{
                    color: 'white', fontWeight: 'bold', marginVertical: 5, fontSize:20 , marginTop: 25,
                    textShadowColor: 'grey', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 5,
                }}>Edit Your Details</Text>
            </View> */}



            <Content style={{ marginHorizontal: 25, marginTop: 5 }}>


                    <TouchableOpacity activeOpacity={0.7}
                            style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 100, borderRadius: 40, padding:50, elevation:5}}
                            onPress={() => { Update() }}>
                            {su ?
                                <ActivityIndicator size="small" color="black" />
                                :<>
                                <Entypo name="location-pin" size={55} color="black" />
                                <Text></Text>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 19 }}>UPDATE&nbsp;LOCATION</Text>
                         </>   }
                        </TouchableOpacity>


                        {/* <Item floatingLabel style={{ marginBottom: 15, marginTop: 4, color: '#ffff' }}>
                            <Label style={{ color: '#ffff' }}>First Name</Label>
                            <Input
                                maxLength={20}
                                keyboardType='default'
                                style={{ color: '#ffff' }}
                                onChangeText={text => setFn(text)}
                                value={fn} />
                        </Item>

                        <Item floatingLabel style={{ marginBottom: 15, color: '#ffff' }}>
                            <Label style={{ color: '#ffff' }}>Last Name</Label>
                            <Input
                                maxLength={20}
                                keyboardType='default'
                                style={{ color: '#ffff' }}
                                onChangeText={text => setLn(text)}
                                value={ln} />
                        </Item>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, }}>

                            <View style={{ width: '48%', }}>
                                <RNPickerSelect onValueChange={(text) => { setGender(text) }}
                                    placeholder={{ label: "Gender ▼", value: null }}
                                    style={{ ...pickerSelectStyles }}
                                    itemStyle={{ color: "white" }}
                                    useNativeAndroidPickerStyle={false}
                                    items={[
                                        { label: 'Male', value: 'Male' },
                                        { label: 'Female', value: 'Female' },
                                    ]}
                                />
                            </View>

                            <View style={{ width: '48%' }}>
                                <RNPickerSelect onValueChange={(text) => { setBloodgroup(text) }}
                                    placeholder={{ label: "Blood Group ▼", value: null, }}
                                    style={{ ...pickerSelectStyles }}
                                    useNativeAndroidPickerStyle={false}
                                    items={[
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
                            </View>
                        </View>


                        <Item floatingLabel style={{ marginBottom: 14, color: '#ffff' }}>
                            <Label style={{ color: '#ffff' }}>Phone Number</Label>
                            <Input
                                maxLength={11}
                                keyboardType='phone-pad'
                                style={{ color: '#ffff' }}
                                onChangeText={text => setPn(text)}
                                value={pn} />
                        </Item>


                        <Item floatingLabel style={{ marginBottom: 16, color: '#ffff' }}>
                            <Label style={{ color: '#ffff' }}>Address</Label>
                            <Input
                                style={{ color: '#ffff' }}
                                onChangeText={text => setAddress(text)}
                                value={address} />
                        </Item>

                        <View style={{ marginBottom: 13, }}>
                            <RNPickerSelect onValueChange={(text) => { setDoner(text) }}
                                placeholder={{ label: "Are you a doner? ▼", value: null }}
                                style={{ ...pickerSelectStyles }}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    { label: 'Yes', value: 'Yes' },
                                    { label: 'No', value: 'No' },
                                ]}
                            />
                        </View> */}


                        {/* <TouchableOpacity activeOpacity={0.7}
                            style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 10, margin: 5, height: 50, borderRadius: 50, }}
                            onPress={() => { Update() }}>
                            {su ?
                                <ActivityIndicator size="small" color="black" />
                                :
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>DONE</Text>
                            }
                        </TouchableOpacity>*/}

                    </Content> 



           
                
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

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 17,
        paddingBottom: 5,
        borderBottomColor: '#E9DCDC',
        borderBottomWidth: 1,
        color: "#ffff"
    },
    placeholder: {
        color: 'white',
    },
});