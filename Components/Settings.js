import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux'
const { width, height } = Dimensions.get('window');

export default function Setting({ navigation, route }) {
    
    const [activityIndicator, setActivityIndicator] = useState(true)


    const data = useSelector(state => state.user)
    // console.log('ddddddddddddddddd', data.UserEmail)
    console.log('route.params.email==>>', route.params.email)

    // const e_mail=route.params.email
    // console.log("oooo",e_mail)

    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [gender, setGender] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [address, setAddress] = useState('')
    const [doner, setDoner] = useState('')
    const [pn, setPn] = useState('')
    const [registerdatetime, setRegisterdatetime] = useState('')

    useEffect(() => {
        firestore().collection('USER-DATA').doc(route.params.email).get()
            .then(function (doc) {
                     setFn(doc.data().FirstName),
                    setLn(doc.data().LastName),
                    setGender(doc.data().Gender),
                    setBloodgroup(doc.data().BloodGroup),
                    setAddress(doc.data().Address),
                    setDoner(doc.data().Doner),
                    setPn(doc.data().PhoneNum),
                    setRegisterdatetime(doc.data().DateTime)
            })
            .then(() => {
                console.log('✅ Search Successfull')
                setActivityIndicator(false)
            })
            .catch((error) => {
                console.log(error.message);
                console.log('⚠️ This Key Is Not Present In Database', error.message)
            });
    }, [])


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
        if (fn.length == '' || ln.length == '' || address.length == '' || pn.length == '') {
            Alert.alert("User Information", "Text Field Can Not Be Empty")
        }
        else if (pn.length < 11) {
            Alert.alert("Phone Number", "Please Enter 11 Digits Phone Number")
        }
        else if (gender == null) {
            Alert.alert("Gender", "Please Select Gender")
        }
        else if (bloodgroup == null) {
            Alert.alert("Blood Group", "Please Select Blood Group")
        }
        else if (doner == null) {
            Alert.alert("Doner", "Please Select Are You A Doner?")
        }
        else if (la == 0 || lo == 0) {
            console.log("Location Access Successfull", typeof (la), la)
        }
        else {
            firestore().collection('USER-DATA').doc(data.UserEmail).update({
                FirstName: fn,
                LastName: ln,
                Gender: gender,
                BloodGroup: bloodgroup,
                Address: address,
                Doner: doner,
                PhoneNum: pn,
                Latitude: la,
                Longitude: lo,
            })
                .then(() => {
                    Alert.alert('Edit', 'Edit Successfull!');
                })
                .catch(error => {
                    Alert.alert('Error!', error.message);
                })
        }
    }


    const locationUpdate = () => {
        firestore().collection('USER-DATA').doc(data.UserEmail).update({
            Latitude: la,
            Longitude: lo,
        })
            .then(() => {
                Alert.alert('Location', 'Your Doner Location Has Been Updated Successfully!');
                console.log('locationUpdate', la, lo)
            })
            .catch(error => {
                Alert.alert('Error!', error.message);
            })
    }

    const dateT = registerdatetime
    const onlyDate = dateT.substring(0, 12);
    console.log('onlyDate==>>', onlyDate)

    // {data.UserName}
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#d2232a" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#d2232a', elevation: 5, width: '100%', }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                    style={{ marginLeft: -20, marginVertical: 7, width: 30, }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold', fontSize: 27,
                        textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    }}><Ionicons name="md-chevron-back" size={27} color="#ffff" /></Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'white', marginVertical: 7, fontSize: 20,
                    textShadowColor: 'grey', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5,
                    fontFamily:'Montserrat-SemiBold',
                }}>Settings </Text>
                <Text style={{ marginVertical: 13 }}><Ionicons name="md-settings-outline" size={20} color="white" /></Text>
            </View>


            <View style={{ alignItems: 'center' }}>
                <Text style={{
                    color: 'white', marginVertical: 2, fontSize: 20, marginTop: 13,
                    textShadowColor: 'grey', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 5,
                    fontFamily:'Montserrat-Bold',
                }}>Edit Your Details  <Feather name="edit" size={19} color="white"  /> </Text>
                <Text style={{
                    color: 'white', marginVertical: 3, fontSize: 12, marginTop: 0,
                    textShadowColor: 'grey', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 5,
                    fontFamily:'Montserrat-SemiBold',
                }}>Member: {onlyDate}<FontAwesome name="user-circle" size={12} color="white"/></Text>
            </View>

    {  activityIndicator ?<Settings2 />:
            <Content style={{ marginHorizontal: 18, marginTop: 5 }}>

                <Item floatingLabel style={{ marginBottom: 15, marginTop: 4, color: '#ffff' }}>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, }}>

                    <View style={{ width: '48%', }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Label style={{ color: '#ffff', fontSize: 15, opacity: 0.7 }}>Gender:  </Label>
                            <Label style={{ color: '#ffff', fontSize: 15.2, opacity: 0.9 }}>{gender}</Label>
                        </View>
                        {/* {gender == 'Male'? */}
                        <RNPickerSelect onValueChange={(text) => { setGender(text) }}
                            placeholder={{ label: "Gender ▼", value: gender }}
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
                        <View style={{ flexDirection: 'row' }}>
                            <Label style={{ color: '#ffff', fontSize: 15, opacity: 0.7 }}> Group:  </Label>
                            <Label style={{ color: '#ffff', fontSize: 15.5, opacity: 0.9 }}>{bloodgroup}</Label>
                        </View>

                        <RNPickerSelect onValueChange={(text) => { setBloodgroup(text) }}
                            placeholder={{ label: "Blood Group ▼", value: bloodgroup }}
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


                <Item floatingLabel style={{ marginBottom: 14, marginTop: 5, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Phone Number</Label>
                    <Input
                        maxLength={11}
                        keyboardType='phone-pad'
                        style={{ color: '#ffff' }}
                        onChangeText={text => setPn(text)}
                        value={pn} />
                </Item>


                <Item floatingLabel style={{ marginBottom: 10, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Address</Label>
                    <Input
                        style={{ color: '#ffff' }}
                        onChangeText={text => setAddress(text)}
                        value={address} />
                </Item>

                <View style={{ marginBottom: 13, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Label style={{ color: '#ffff', fontSize: 15, opacity: 0.7 }}> Doner: </Label>
                        <Label style={{ color: '#ffff', fontSize: 15.5, opacity: 0.95 }}>{doner}</Label>
                    </View>
                    {/* {doner == 'Yes' ? */}
                    <RNPickerSelect onValueChange={(text) => { setDoner(text) }}
                        placeholder={{ label: "Are you a doner? ▼ ", value: doner }}
                        style={{ ...pickerSelectStyles }}
                        useNativeAndroidPickerStyle={false}
                        items={[
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                    />
                    
                </View>


                <TouchableOpacity activeOpacity={0.7}
                    style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 10, margin: 5, height: 50, borderRadius: 50, }}
                    onPress={() => { Update() }}>
                    {su ?
                        <ActivityIndicator size="small" color="black" />
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Feather name="edit" size={22} color="black" style={{ marginLeft: -38 }} />
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>    &nbsp;EDIT&nbsp;DONE</Text>
                        </View>
                    }
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.7}
                    style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 15, margin: 5, height: 50, borderRadius: 50, }}
                    onPress={() => { locationUpdate() }}>
                    {su ?
                        <ActivityIndicator size="small" color="black" />
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Entypo name="location-pin" size={27} color="black" style={{ marginLeft: -10 }} />
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>&nbsp;UPDATE&nbsp;LOCATION</Text>
                        </View>
                    }
                </TouchableOpacity>

            </Content>
        }

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
        paddingTop: 7,
        paddingBottom: 4.5,
        borderBottomColor: '#E9DCDC',
        borderBottomWidth: 1,
        color: "white"
    },
    placeholder: {
        color: 'white',
    },
});



export function Settings2() {
    return (
        <View style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:200}}>
            <ActivityIndicator size="large" color="#ffff" />
        </View>
    )
}
