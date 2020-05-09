import { createAppContainer} from 'react-navigation';
import React from 'react'
import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack';
import { View, Text, Image} from 'react-native';
import Login from './Login'
import Register from './Register'
import Profil from './Profil'
import Home from './Home'
import Friends from './Friends'
import Messages from './Messages'

const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Messages',
      tabBarIcon: () => {
        return <Image source={require ("../image/home.png")}
        style={{width: 24, height: 24}}/>
      }
    }
  },
  Friends: {
    screen: Friends,
    navigationOptions: {
      title: 'Contact',
      tabBarIcon: () => {
        return <Image source={require ("../image/contact.png")}
        style={{width: 24, height: 24}}/>
      }
    }
  },
  Profil: {
    screen: Profil,
    navigationOptions: {
      title: 'Paramètres',
      tabBarIcon: () => {
        return <Image source={require ("../image/settings.png")}
        style={{width: 24, height: 24}}/>
      }
    }
  }
},{
  tabBarOptions: {
    activeBackgroundColor: 'white', // Couleur d'arrière-plan de l'onglet sélectionné
    activeTintColor: 'black', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveTintColor: 'black', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: "#F1F1F1", // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true, // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    style:{
      borderTopWidth : 0,
      borderTopColor : "#007bff",
    },
  }
}

)

const LoginStackNavigator = createStackNavigator({

  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Connexion',
      headerShown: false
    }
  },

  Home : {
    screen: BottomTabNavigator,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#007bff",
      },
      headerTintColor: "white",
      header: () => (
        <View style={{marginTop : 25, backgroundColor : "#007bff", color : "black", padding : "5%", paddingBottom : 0, paddingTop : 0, flexDirection:'row', flexWrap:'wrap', alignItems: 'center',}}>
          <Image
              style={{height: 75, width: 50}}
              source={require('../image/logo.png')}
              resizeMode="contain"
          />
          <Text style={{textAlign : "center", paddingLeft : "2%", fontSize : 20, color : "white", fontWeight : "bold"}}>UnTel</Text>
      </View>
      ),
    }
  },

  Register: {
    screen: Register,
    navigationOptions: {
      title: '',
      headerShown: true
    }
  },

  Messages : {
    screen: Messages,
    navigationOptions: {
      title: 'Conversation',
      headerShown: false
    }
  }
})

const AppContainer = createAppContainer(LoginStackNavigator);
export default AppContainer