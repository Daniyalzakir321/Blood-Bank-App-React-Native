import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Alert, StatusBar, Image, Modal, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { Content, Item, Input, Label, Button, Text, Left, Body, Right, Icon, } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import * as auththenticate from './Store/action';
const { width, height } = Dimensions.get('window');

export default function SignIn({navigation}) {

    const dispatch = useDispatch()

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
                    navigation.replace('Home',{email:signinemail})
                     
                    //  dispatch(auththenticate.LoginUser({
                    //     UserEmail: signinemail,
                    // })  )
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
                    <TouchableOpacity activeOpacity={0.5} onPress={() =>  {navigation.navigate('Signup')}}
                        style={{ height: 20, marginVertical: 5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', }}> Create account</Text>
                    </TouchableOpacity>
                </View>

            </Content>


        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#d2232a',
    },
});
