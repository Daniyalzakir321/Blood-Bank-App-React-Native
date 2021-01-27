import React, { useEffect, useState, useRef } from 'react';
import { Button, View, Modal, StatusBar, Image, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import SignIn from './Components/Signin';
import Homes from './Components/Home';
import Map from './Components/Map';
import Whocandonate from './Components/whocandonate';
import BloodBanksLocations from './Components/bloodbanklocations'



// function LoginScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <SignIn navigation= {navigation}  />
//       {/* <Button onPress={() => navigation.navigate('Notifications')} title="Go to notifications" /> */}
//     </View>
//   );
// }


// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Homes navigation= {navigation} />
//       {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
//     </View>
//   );
// }





const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [modal, setModal] = useState(true)
  setTimeout(() => {
    setModal(false)
  }, 1000);

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
        <StatusBar backgroundColor="#d2232a" style={{ color: 'white' }}
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
        <Stack.Navigator  // screenOptions={{ headerShown: false }}
         >
          <Stack.Screen name="Home" component={Homes}  options={{headerShown: false}} 
          //  options={{
          //    title: 'Blood Bank',
          //    headerTintColor: '#ffff',
          //    headerStyle: {
          //    backgroundColor: '#d2232a',
              
          //   },
    // headerLeft: () => (
    //   <DrawerButton onPress={() => navigation.toggleDrawer()} />
    // ),
    />
          <Stack.Screen name="Login" component={SignIn} options={{headerShown: false}} />
          <Stack.Screen name="Map" component={Map}  options={{headerShown: false}} />
          <Stack.Screen name="who" component={Whocandonate} options={{headerShown: false}} />
          <Stack.Screen name="BBL" component={BloodBanksLocations} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
