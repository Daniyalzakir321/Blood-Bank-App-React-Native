import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');


export default function Signup({ navigation }) {

    const requestLocationPermission = async () => {
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
            console.log(err)
        }
    };
    requestLocationPermission()


    const [la, setla] = useState('')
    const [lo, setlo] = useState('')

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            setla(position.coords.latitude)
            setlo(position.coords.longitude)
        })
    }, [])

    console.log("LATI==+++=", typeof (la))
    console.log("LONG===", lo)



    const [su, setsu] = useState(false)
    setTimeout(() => {
        setsu(false)
    }, 6000);

    // Date Time
    var today = new Date();
    var dateTime = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + "    " +
        today.getHours() + ":" + today.getMinutes();

    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [gender, setGender] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [address, setAddress] = useState('')
    const [doner, setDoner] = useState('')
    const [pn, setPn] = useState('')
    const [signupemail, setSignupemail] = useState('')
    const [signuppassword, setSignuppassword] = useState('')

    const userSignUp = () => {
        console.log("donn", doner)
        if (fn.length == '' || ln.length == '' || address.length == '' || pn.length == '') {
            Alert.alert("User Information", "Text Field Can Not Be Empty")
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
        else if (signupemail.length == '') {
            Alert.alert("Email", "Please Enter Email")
        }
        else if (signuppassword.length == '') {
            Alert.alert("Password", "Please Enter Password")
        }
        else if (signuppassword.length < 6) {
            Alert.alert("Password", "Minimum 6 Character Or Digits")
        }
        else if (la == 0 || lo == 0) {
            requestLocationPermission()
            console.log("Location Access Successfull", typeof (la), la)
        }
        else {
            setsu(true)
            auth().createUserWithEmailAndPassword(signupemail, signuppassword)
                .then(() => {
                    firestore().collection('USER-DATA').doc(signupemail).set({
                        FirstName: fn,
                        LastName: ln,
                        Gender: gender,
                        BloodGroup: bloodgroup,
                        Address: address,
                        Doner: doner,
                        PhoneNum: pn,
                        DateTime: dateTime,
                        Latitude: la,
                        Longitude: lo,
                        TimeStamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        setFn("")
                        setLn("")
                        setGender("")
                        setBloodgroup("")
                        setAddress("")
                        setDoner("")
                        setPn("")
                        setSignupemail("")
                        setSignuppassword("")
                        navigation.replace('Signin')
                        Alert.alert('Congratulations' +fn , 'You Are SuccessFully Register In Blood Bank! Proceed To LogIn');
                    })
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('This email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('This email address is invalid!');
                    }
                    if (error.code === 'auth/weak-password') {
                        Alert.alert('Weak Password!');
                    }
                    // if (error) {
                    // Alert.alert("Error", error.message);
                    // }
                    // console.error(error);
                    // console.log(error.message);
                })
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#d2232a", width: '100%', height: '100%', justifyContent: 'center' }}>

            <Content style={{ marginHorizontal: 25, marginTop: 5 }}>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}
                        style={{ marginLeft: -20, marginVertical: 14, width: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 27, }}>
                            <Ionicons name="md-chevron-back" size={30} color="#ffff" />
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginVertical: 15, fontSize: 20 }}>CREATE ACCOUNT</Text>
                    <Text></Text>
                </View>



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
                        keyboardType='number-pad'
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
                </View>


                <Item floatingLabel style={{ marginBottom: 13, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Email</Label>
                    <Input
                        maxLength={20}
                        keyboardType="email-address"
                        style={{ color: '#ffff' }}
                        onChangeText={text => setSignupemail(text)}
                        value={signupemail} />
                </Item>

                <Item floatingLabel style={{ marginBottom: 15, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Password</Label>
                    <Input
                        maxLength={15}
                        secureTextEntry={true}
                        style={{ color: '#ffff' }}
                        onChangeText={text => setSignuppassword(text)}
                        value={signuppassword} />
                </Item>


                <TouchableOpacity activeOpacity={0.7}
                    style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 5, margin: 5, height: 50, borderRadius: 50, }}
                    onPress={() => { userSignUp() }}>
                    {su ?
                        <ActivityIndicator size="small" color="black" />
                        :
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>CREATE</Text>
                    }
                </TouchableOpacity>

            </Content>
        </View>


    )
}


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