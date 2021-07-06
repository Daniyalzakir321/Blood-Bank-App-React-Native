import React, { useEffect, useState, useRef } from 'react';
import { Button, View, Modal, StatusBar, Image, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import SignIn from '../Signin';
import Homes from '../Home';
import Map from '../Map';
import Whocandonate from '../Whocandonate';
import BloodBanksLocations from '../Bloodbanklocations'
import Setting from '../Settings'
import Signup from '../Signup'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './onboarding';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  const [asyncLoginAuth, setAsyncLoginAuth] = useState(null)
  const [onboardingAsync, setOnboardingAsync] = useState(null)

  useEffect(() => {
    getOnboarding()
    getUserData()
  }, [])


  const getOnboarding =  () => {
    try {
         AsyncStorage.getItem('ONBOARD')
        .then((value) => {
          if (value == null) {
          AsyncStorage.setItem('ONBOARD','true' )
            console.log('Onboarding IF=====>', onboardingAsync)
            setOnboardingAsync(true)
          }
          else {
            setOnboardingAsync(null)
          }
        })
    }
    catch (e) {
      console.log(e)
    }
  }

  AsyncStorage.getItem('ONBOARD')
    .then((value) => {
      console.log('GET Onboarding Value====>', onboardingAsync)
    })


  const getUserData = async () => {
    try {
      await AsyncStorage.getItem('SIGNINEMAIL')
        .then((value) => {
          if (value != null) {
            console.log('SIGNINEMAIL Navigation==>', value)
            setAsyncLoginAuth(value)
          }
        })
    }
    catch (e) {
      console.log(e)
    }
  }

  const data = useSelector(state => state.user)

  const [modal, setModal] = useState(true)
  setTimeout(() => {
    setModal(false)
  }, 3000);

  const showSreens = () => {
    return <>
      {asyncLoginAuth ? <>
        <Stack.Screen name="Home" component={Homes} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Set" component={Setting} />
        <Stack.Screen name="who" component={Whocandonate} />
        <Stack.Screen name="BBL" component={BloodBanksLocations} />
      </> : <>
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Homes} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Set" component={Setting} />
        <Stack.Screen name="who" component={Whocandonate} />
        <Stack.Screen name="BBL" component={BloodBanksLocations} />
      </>}
    </>
  }

  return (
    // modal
    //   ?
    //   <Modal visible={modal} animationType="slide">
    //     <StatusBar backgroundColor="#d2232a" style={{ color: 'white' }}  barStyle="light-content" />
    //     <View style={{ flex: 1, backgroundColor: '#d2232a', alignItems: 'center', justifyContent: "center" }} >
    //       <Image source={require('../Images/splasht.png')}
    //         style={{ flex: 1, backgroundColor: '#d2232a', width: "50%", resizeMode: 'contain', }} />
    //       <Image source={require('../Images/splashb.png')}
    //         style={{ flex: 1, backgroundColor: '#d2232a', width: "70%", resizeMode: 'contain' }} />
    //     </View>
    //   </Modal>
    //   : 


    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {
         onboardingAsync==null?
          <>
            {/* <Stack.Screen name="OnBoarding" component={Onboarding} /> */}
            {showSreens()} 
          </>
        : onboardingAsync ?
            <>
              <Stack.Screen name="OnBoarding" component={Onboarding} />
              {showSreens()}
            </>
         :null
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}





{/*: 'Blood Bank',
          //    headerTintColor: '#ffff',
          //    headerStyle: {
          //    backgroundColor: '#d2232a',
              
          //   },
    // headerLeft: () => (
    //   <DrawerButton onPress={() => navigation.toggleDrawer()} />
    // ), */}

{/*  screenOptions={{ headerShown: false }} */ }
