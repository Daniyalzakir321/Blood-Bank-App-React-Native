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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Navigation() {

  const data = useSelector(state => state.user)

  const [modal, setModal] = useState(true)
  setTimeout(() => {
    setModal(false)
  }, 3000);

  function MyStack() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen name="Home" component={Homes} />
          <Drawer.Screen name="Map" component={Map} />
          <Drawer.Screen name="who" component={Whocandonate} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  // HeaderMode='none'
  return (
    modal
      ?
      <Modal visible={modal} animationType="slide">
        <StatusBar backgroundColor="#d2232a" style={{ color: 'white' }}  barStyle="light-content" 
        // barStyle="dark-content" 
        />
        <View style={{ flex: 1, backgroundColor: '#d2232a', alignItems: 'center', justifyContent: "center" }} >
          <Image source={{ uri: 'https://res.cloudinary.com/ds62zhv7k/image/upload/v1611487990/sadas_qhpztv.png' }}
            style={{ flex: 1, backgroundColor: '#d2232a', width: "50%", resizeMode: 'contain', }} />
          <Image source={{ uri: 'https://res.cloudinary.com/ds62zhv7k/image/upload/v1611600737/dsa_zghdds.png' }}
            style={{ flex: 1, backgroundColor: '#d2232a', width: "70%", resizeMode: 'contain' }} />
        </View>
      </Modal>
      :

      <NavigationContainer>
        <Stack.Navigator > 
        {/* {data.UserEmail==''? */}
        {/* <> */}
          <Stack.Screen name="Signin" component={SignIn} options={{headerShown: false}} />
          <Stack.Screen name="Signup" component={Signup}  options={{headerShown: false}} />
        {/* </> */}
        {/* : */}
        {/* <> */}
          <Stack.Screen name="Home" component={Homes}  options={{headerShown: false}} />   
          <Stack.Screen name="Map" component={Map}  options={{headerShown: false}} />
          <Stack.Screen name="Set" component={Setting}  options={{headerShown: false}} />
          <Stack.Screen name="who" component={Whocandonate} options={{headerShown: false}} />
          <Stack.Screen name="BBL" component={BloodBanksLocations} options={{headerShown: false}} />
        {/* </> */}
          {/* } */}
        </Stack.Navigator>
      </NavigationContainer>
  )
}





         {/* //  options={{
          //    title: 'Blood Bank',
          //    headerTintColor: '#ffff',
          //    headerStyle: {
          //    backgroundColor: '#d2232a',
              
          //   },
    // headerLeft: () => (
    //   <DrawerButton onPress={() => navigation.toggleDrawer()} />
    // ), */}
 
        {/*  screenOptions={{ headerShown: false }} */}
 