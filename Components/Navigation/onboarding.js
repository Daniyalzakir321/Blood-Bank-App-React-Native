import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    {
        title: 'Donate Blood',
        text: 'Find out what blood type you are!\nRegister with one of our approved\nhospitals and get started',
        image: require('../Images/onboarding111.png'),
        bg: '#ef3856',
    },
    {
        title: 'Search Blood Donor',
        text: 'Find out what blood type you are!\nRegister with one of our approved\nhospitals and get started',
        image: require('../Images/onboarding222.png'),
        bg: '#ef3856',
    },
    {
        title: 'Explore Updates around you',
        text: "Find out what blood type you are!\nRegister with one of our approved\nhospitals and get started",
        image: require('../Images/onboarding333.png'),
        bg: '#ef3856',
    },
];

export default function Onboarding({navigation}) {

    const done_button=()=>{
        // const s_c= 'ONBOARDING'
        // AsyncStorage.setItem('ONBOARD', s_c)
        navigation.replace('Signin')
    }

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.slide, {backgroundColor: item.bg,} ,]}>
                    {/* <Text style={styles.titles}>Blood Bank</Text> */}
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.titles}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    const keyExtractor = (item) => item.title;

    const renderDoneButton = () => {
        return <TouchableOpacity onPress={()=>done_button()} style={styles.doneContainer}>
            <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
    }

    const renderNextButton = () => {
        return <View style={styles.nextContainer}>
            <Text style={styles.nextText}>Next</Text>
        </View>
    }

    const renderPrevButton = () => {
        return <View style={styles.prevContainer}>
            <Text style={styles.prevText}>Prev</Text>
        </View>
    }
    const renderSkipButton = () => {
        return <View style={styles.prevContainer}>
            <Text style={styles.prevText}>Skip</Text>
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                data={data}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                renderPrevButton={renderPrevButton}
                renderSkipButton={renderSkipButton}
                showPrevButton={true}
                showSkipButton={true}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                dotClickEnabled={true}
                // bottomButton={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ef3856',
    },
    image: {
        width: 220,
        height: 220,
        marginVertical:32,
        resizeMode: 'contain',
    },
    titles: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        // fontWeight: 'bold',
        borderRadius:10,
        fontFamily:'Montserrat-Bold',
    },
    text: {
        // fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginVertical: 10,
        fontFamily:'Montserrat-Regular',
    },

    dotStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    activeDotStyle: {
        backgroundColor: '#ffffff',
    },
    doneContainer: {
        // backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginRight: -17,
        height: 35,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#ffffff',
        borderWidth:1,
    },
    doneText: {
        // fontWeight: 'bold',
        color:'#ffffff',
        fontFamily:'Montserrat-SemiBold',
    },
    nextContainer: {
        // backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginRight: -17,
        height: 35,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#ffffff',
        borderWidth:1,
    },
    nextText: {
        // fontWeight: 'bold',
        color:'#ffffff',
        fontFamily:'Montserrat-SemiBold',

    },
    prevContainer: {
        // backgroundColor: '#ffffff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: -17,
        height: 35,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'#ffffff',
        borderWidth:1,
    },
    prevText: {
        // fontWeight: 'bold',
        color:'#ffffff',
        fontFamily:'Montserrat-SemiBold',
    }
});