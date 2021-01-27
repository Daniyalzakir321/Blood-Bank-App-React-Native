import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import Homes from './Home';
import { set } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SignIn({ navigation }) {

    const [ai, setai] = useState(false)
    setTimeout(() => {
        setai(false)
    }, 6000);


    const [signinemail, setSigninemail] = useState('')
    const [signinpassword, setSigninpassword] = useState('')

    const userSignIn = () => {
        if (signinemail.length == '') {
            Alert.alert("Email", "Please Enter Email To LogIn")
        }
        else if (signinpassword.length == '') {
            Alert.alert("Password", "Please Enter Password To LogIn")
        }
        else {
            setai(true)
            auth().signInWithEmailAndPassword(signinemail, signinpassword)
                .then((res) => {
                    console.log('Signed In Successful!', res)
                    navigation.replace('Home')

                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Error', 'This email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('Error', 'This email address is invalid!');
                    }
                    if (error.code === 'auth/wrong-password') {
                        Alert.alert('Error', 'This password is invalid!');
                    }
                    if (error) {
                        Alert.alert("Error", error.message);
                    }
                    // console.log(error.message);
                })
        }
    }

    const [su, setsu] = useState(false)
    setTimeout(() => {
        setsu(false)
    }, 6000);

    const [modal, setModal] = useState(false)
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
                        setModal(false)
                        Alert.alert('Congratulations', 'Your Account Has Been Created! Proceed To LogIn');
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
    // const [selectedValue, setSelectedValue] = useState("java");
    return (
        <View style={styles.container}>

            <StatusBar backgroundColor="#d2232a" />
            <Image source={{ uri: 'https://res.cloudinary.com/ds62zhv7k/image/upload/v1611487990/sadas_qhpztv.png' }}
                style={{ backgroundColor: '#d2232a', resizeMode: 'contain', height: 150, marginTop: 45 }} />

            <Content style={{ marginHorizontal: 25, alignContent: 'center' }}>

                <Item floatingLabel style={{ marginBottom: 15, marginTop: 5, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Email</Label>
                    <Input
                        type='email'
                        maxLength={20}
                        keyboardType="email-address"
                        style={{ color: '#ffff' }}
                        onChangeText={text => setSigninemail(text)}
                        value={signinemail} />
                </Item>

                <Item floatingLabel style={{ marginBottom: 15, color: '#ffff' }}>
                    <Label style={{ color: '#ffff' }}>Password</Label>
                    <Input
                        maxLength={15}
                        secureTextEntry={true}
                        style={{ color: '#ffff' }}
                        onChangeText={text => setSigninpassword(text)}
                        value={signinpassword} />
                </Item>

                <TouchableOpacity activeOpacity={0.7}
                    style={{ elevation: 3, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffff', marginTop: 10, margin: 5, height: 50, borderRadius: 50, }}
                    onPress={() => { userSignIn() }}
                >
                    {ai ?
                        <ActivityIndicator size="small" color="black" />
                        :
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>SIGNIN</Text>
                    }
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginVertical: 5 }}>Don't have an account? </Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setModal(true)}
                        style={{ height: 20, marginVertical: 5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', }}> Create account</Text>
                    </TouchableOpacity>
                </View>

            </Content>

            {/* ============================================================================= */}
            <Modal visible={modal}
                animationType="slide"
                onRequestClose={() => { setModal(false) }}>
                <View style={{ flex: 1, backgroundColor: "#d2232a", width: '100%', height: '100%', justifyContent: 'center' }}>

                    <Content style={{ marginHorizontal: 25, marginTop: 5 }}>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setModal(false)}
                                style={{ marginLeft: -20, marginVertical: 14, width: 30 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 27, }}>&nbsp;˂&nbsp;</Text>
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
            </Modal>
            {/* =========================================== */}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#d2232a',
    },
});
