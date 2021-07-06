import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { StyleSheet, View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, Modal, Dimensions, StatusBar, Alert } from 'react-native'
import Map from './Map.js'
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux';
import * as auththenticate from './Store/action';
import Communications from 'react-native-communications';

export default function Homes({ navigation, route }) {
    const [modal, setModal] = useState(false)
    const [e_mail, setEmail] = useState()


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
                    doner: doc.data().Doner,
                    laroute: doc.data().Latitude,
                    loroute: doc.data().Longitude,
                    dateTime: doc.data().DateTime,
                }))

            )
        })
    }, [])

    const dispatch = useDispatch()

    const storeData = async () => {
        try {
            await AsyncStorage.removeItem('SIGNINEMAIL')
        } catch (e) {
            console.log(e)
        }
    }

    const SignOut = () => {
        auth().signOut()
            .then((res) => {
                console.log('LogOut Successful!')
                navigation.replace('Signin')
                // dispatch(auththenticate.LogoutUser())
                storeData()
            })
            .catch(function (error) {
                console.log("Error", error.message);
            })
    }

    const [search, setSearch] = useState("")
    const filterSearch = data.filter((f) => {
        return f.bloodgroup.toLowerCase().includes(search.toLowerCase())
    })


    AsyncStorage.getItem('SIGNINEMAIL')
        .then((value) => {
            console.log('SIGNINEMAIL==>', value)
            setEmail(value)
        })
    // const e_mail = route.params.email

    const [numberModal, setNumberModal] = useState([])
    const phoneNumber = (num) => {
        setModal(true)
        setNumberModal(num)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f1f0" />
            <View style={styles.start}>
                <ImageBackground source={require('./Images/background.png')}
                    style={{
                        flex: 1, backgroundColor: '#d2232a',
                        justifyContent: 'center',
                    }} >

                    <TouchableOpacity activeOpacity={0.7} onPress={() => { SignOut() }} style={{ borderRadius: 15, padding: 5, position: 'absolute', right: 5, top: 5, backgroundColor: '#ffff', elevation: 5 }} >
                        <AntDesign name="logout" size={17} color="black" style={{ elevation: 5 }} />
                    </TouchableOpacity>

                    <View style={{
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('BBL') }} style={{ backgroundColor: '#ffff', borderRadius: 10, padding: 20, paddingHorizontal: 24, alignItems: 'center', borderColor: "#ef3856", borderWidth: 2 }} >
                            <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', color: 'red', textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2 }}>Donate</Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'red', textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2 }}>Blood</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('who') }} style={{ backgroundColor: '#ffff', borderRadius: 10, padding: 20, paddingHorizontal: 25, elevation: 5, alignItems: 'center', borderColor: "#ef3856", borderWidth: 2 }} >
                            <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', color: 'red', textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2 }}> Blood </Text>
                            <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: 'red', textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2 }}>Groups</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>





            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 10, paddingHorizontal: 12 }}>

                <TouchableOpacity onPress={() => Communications.web('https://github.com/Daniyalzakir321')} activeOpacity={0.8} style={{ backgroundColor: '#ffff', borderRadius: 10, padding: 10.5, elevation: 5, alignItems: 'center', }} >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textShadowColor: 'grey', textShadowOffset: { width: 0.2, height: 0.2 }, textShadowRadius: 1 }}>Donors</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#ffff', borderRadius: 25, paddingVertical: 0, paddingHorizontal: 10, elevation: 4, alignItems: 'center' }} >
                    <RNPickerSelect onValueChange={(text) => { setSearch(text) }}
                        placeholder={{ label: "Search by blood group", value: '', }}
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

                <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Set', { email: e_mail, }) }} style={{ backgroundColor: '#ffff', borderRadius: 10, padding: 10, elevation: 5, alignItems: 'center' }} >
                    <Ionicons name="md-settings-outline" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.end}>
                {filterSearch.map((d, i) => {
                    return <>{d.doner == 'Yes' ?
                        <TouchableOpacity activeOpacity={0.8} key={d.Id} onPress={() => {
                            navigation.navigate('Map', {
                                key: d.Id,
                                fn: d.fn,
                                ln: d.ln,
                                bg: d.bloodgroup,
                                add: d.address,
                                laroute: d.laroute,
                                loroute: d.loroute,
                            })
                        }} style={styles.data} key={i}>

                            <View style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                                <View>
                                    {d.gender == 'Female' ?
                                        <Image source={require('./Images/female.png')}
                                            style={{ width: 70, height: 70, borderRadius: 50, marginRight: 12 }} />
                                        :
                                        <Image source={require('./Images/male.webp')}
                                            style={{ width: 70, height: 70, borderRadius: 50, marginRight: 12 }} />
                                    }
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize', paddingTop: 1 }}>{d.fn}  {d.ln}</Text>
                                    <TouchableOpacity onPress={() => phoneNumber(d.pn)}>
                                        <Text style={{ fontSize: 12, textTransform: 'capitalize', paddingTop: 1 }}><FontAwesome name="phone" size={12} color="black" />  {d.pn}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 10, textTransform: 'capitalize', paddingTop: 1 }}><Entypo name="location-pin" size={11.3} color="black" />  {d.address}</Text>
                                    <Text style={{ fontSize: 8, textTransform: 'capitalize', paddingTop: 2 }}><Fontisto name="date" size={10} color="black" />   {d.dateTime}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'red', textShadowColor: 'grey', textShadowOffset: { width: 0.1, height: 1 }, textShadowRadius: 2, marginRight: 5 }}>{d.bloodgroup}</Text>
                            </View>
                        </TouchableOpacity>
                        : <></>
                    }
                    </>
                })}
            </ScrollView>
            {/* Model Home 2*/}
            <Home2 numberModal={numberModal} modal={modal} setModal={setModal}/>

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
        marginTop: 8,
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
        width: 160,
        fontSize: 14,
        color: "grey",
        paddingVertical: 7,
    },
    placeholder: {
        color: 'grey',
    },
});



export const Home2 = ({ numberModal, modal, setModal }) => {
    return (
        <Modal visible={modal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModal(false);
            }}>
            <View style={{
                flexDirection: 'row', position: 'absolute', bottom: 0, width: '100%', height: 130, backgroundColor: 'white', elevation: 5, justifyContent: 'space-around', alignItems: 'center', borderTopRightRadius: 30, borderTopLeftRadius: 30,
                borderWidth: 1,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 10,
            }} >
                <TouchableOpacity onPress={() => setModal(false)} style={{ position: 'absolute', top: 8, right: 10 }}>
                    <MaterialIcons name="close" size={19} color="grey" />
                </TouchableOpacity >

                <TouchableOpacity onPress={() => Communications.phonecall(numberModal, true)} style={{ borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignItems: 'center', width: 100, elevation: 0.5, }}>
                    <FontAwesome name="phone" size={30} color="#ef3856" />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#ef3856', }}>Phone</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Communications.text(numberModal)} style={{ borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignItems: 'center', width: 100, elevation: 0.5 }}>
                    <MaterialCommunityIcons name="android-messages" size={30} color="#ef3856" />
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', color: '#ef3856', }}>Message</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
