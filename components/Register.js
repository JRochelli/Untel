import React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { createAppContainer, createStackNavigator } from 'react-navigation';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

        nickname : '',
        email: '',
        password: '',
        firtname : '',
        lastname : '',
        error : false,
        errorEmail : false,
        emailAlreadyUse : false
    };
  }

  register(){
    const nickname = this.state.nickname;
    const lastname = this.state.lastname;
    const firstname = this.state.firstname;
    const email = this.state.email;
    const password = this.state.password;
    
    if (nickname != '' && lastname != '' && firstname != '' && email != '' && password != '')
    {
      if (this.validate(email))
      {
        axios.post('http://192.168.1.13:8084/user', {
          "nickname": nickname,
          "lastname": lastname,
          "firstname" : firstname,
          "email" : email,
          "password" : password
        }).then((response) => {
          if (response.data.email == email){
            this.props.navigation.navigate("Login")
          }
        }, (error) => {
          console.log(error);
          this.setState({ emailAlreadyUse: true })
        });

      } else this.setState({ errorEmail: true })
    } else this.setState({ error: true })
  }

  validate (text){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text })
      return false;
    }
    else {
      this.setState({ email: text })
      return true
    }
  }

  render (){
    let error = <Text style={styles.errorFalse}></Text>;
    if (this.state.error == true) error = <Text style={styles.errorTrue}>Veuillez remplir tous les champs</Text>;
    if (this.state.errorEmail == true) error = <Text style={styles.errorTrue}>L'adresse email est invalide</Text>;
    if (this.state.emailAlreadyUse == true) error = <Text style={styles.errorTrue}>L'adresse email est associé à un autre compte</Text>;
    return (
      <View style = {styles.bc}>
      <ScrollView style={{flex : 1}}>
        <View style = {styles.container}> 
          <View style={styles.jumbotron}>
            <View style={styles.contain}>
              <Image
                style={{flex:1, height: 100, width: 75}}
                source={require('../image/logo.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.subtitle}>Inscription</Text>
            {error}
            <Text style={styles.label}>Prénom</Text>
            <TextInput style={styles.input} placeholder='Prénom' onChangeText={(text) => this.setState({firstname:text})} value={this.state.firstname}/>
            <Text style={styles.label}>Nom</Text>
            <TextInput style={styles.input} placeholder="Nom" onChangeText={(text) => this.setState({lastname:text})} value={this.state.lastname}/>
            <Text style={styles.label}>Pseudo</Text>
            <TextInput style={styles.input} placeholder="Pseudo" onChangeText={(text) => this.setState({nickname:text})} value={this.state.pseudo}/>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder='Email' onChangeText={(text) => this.setState({email:text})} value={this.state.email}/>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Mot de passe" onChangeText={(text) => this.setState({password:text})} value={this.state.password}/>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.register()}>
              <Text style={styles.textWhite}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLight} onPress={() => this.props.navigation.navigate("Login")}>
                <Text style={styles.textLink}>Déjà inscrit ?</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    padding : "5%",
    paddingTop : "0%",
    height : "100%"
  },

  colorWhite : {
    color : "white"
  },

  notfound : {
    fontFamily : "underline"
  },

  contain : {
    justifyContent: 'center',
    alignItems: 'center',
  },

  bc : {
    backgroundColor : "white",
    flex : 1
  },

  label : {
    fontWeight : "bold"
  },

  subtitle : {
    color:"black", 
    textAlign : "center", 
    fontSize : 20,  
    marginTop : "5%", 
    marginBottom : "10%",
    paddingBottom : "5%",
    fontWeight: "bold",
  },

  errorTrue : {
    backgroundColor : "#dc3545",
    borderRadius : 5,
    padding : "5%",
    color : "white",
    marginBottom : "5%"
  },

  errorFalse : {
    display :"none"
  },

  title : {
    color:"white", 
    textAlign : "center", 
    fontSize : 30,  
    marginTop : "5%", 
    fontWeight: "bold"
  },

  jumbotron : {
    margin : "5%",
    backgroundColor : "white",
    padding : "5%",
    borderRadius : 10,
  },

  input : {
    backgroundColor : "white",
    marginTop : "5%",
    marginBottom : "5%",
  },

  textWhite:{
    fontSize : 15,
    color: "white",
    textAlign : "center"
  },

  textLink:{
    fontSize : 15,
    color: "#007bff",
    backgroundColor: '#fff',
    textAlign : "center"
  },

  buttonPrimary: {
    padding : "5%",
    borderRadius : 5,
    marginTop : "2%",
    color: "#fff",
    backgroundColor:"#007bff",
    borderColor:"#007bff",
    textAlign : "center",
  },

  buttonLight: {
    marginTop : "5%",
    textAlign : "center",
    color: "#212529",
    borderColor:"#f8f9fa",
    textAlign : "center",
  }
  
});