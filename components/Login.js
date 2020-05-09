import React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
//import https from 'https'


const mapStateToProps = (state) => {
  return {
    email: state.userEmail,
    id : state.userId
  }
}

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      id : "",
      password: '',
      error : false,
      errorEmail : false,
      userNotFound : false,
    };
  }

  componentDidMount (){
    if (this.props.email != "null" || this.props.email == undefined){
      this.props.navigation.dispatch(resetAction)
    }
  }

  register (){
    this.setState({errorEmail : false, error : false, userNotFound : false, email : "", password : ""})
    this.props.navigation.navigate("Register")
  }

  login(){
    const email = this.state.email;
    const password = this.state.password;
    if (email != '' && password != '')
    {
      if (this.validate(email))
      {
        /*const instance = axios.create({
          httpsAgent: new https.Agent({  
            rejectUnauthorized: false
          })
        });
        instance.post('https://192.168.1.13:8084/validate/user', {
          "email" : email,
          "password" : password
        }).then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.data != "notValid"){
            const id = response.data;
            var action = { type: "CONNECT", value : email}
            this.props.dispatch(action);
            action = { type: "SETID", value : id}
            this.props.dispatch(action);
            this.props.navigation.dispatch(resetAction)
          }else{
            this.setState({ userNotFound : true })
          }
        }, (error) => {
          console.log(error);
          this.setState({ userNotFound : true })
        });*/
        axios.post('http://192.168.1.13:8084/validate/user', {
          "email" : email,
          "password" : password
        }).then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.data.id != "notValid"){
            const id = response.data.id;
            var action = { type: "CONNECT", value : email}
            this.props.dispatch(action);
            action = { type: "SETID", value : id}
            this.props.dispatch(action);
            this.props.navigation.dispatch(resetAction)
          }else{
            this.setState({ userNotFound : true })
          }
        }, (error) => {
          console.log(error);
          this.setState({ userNotFound : true })
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
    if (this.state.error == true) error = <Text style={styles.errorTrue}>Veuillez saisir les informations</Text>;
    if (this.state.userNotFound == true) error = <View style={styles.errorTrue}><Text style={styles.colorWhite}>Il semblerait que vous ne soyez pas inscrit. Veuilez créer un compte</Text></View>
    if (this.state.errorEmail == true) error = <Text style={styles.errorTrue}>L'adresse email est invalide</Text>;
    return (
      <ScrollView style = {styles.bc}>
        <View style = {styles.container}> 
          <View style={styles.jumbotron}>
            <View style={styles.contain}>
              <Image
                style={{flex:1, height: 100, width: 75}}
                source={require('../image/logo.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.subtitle}>Connexion</Text>
            {error}
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder='Email' onChangeText={(text) => this.setState({email:text})} value={this.state.email}/>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Mot de passe" onChangeText={(text) => this.setState({password:text})} value={this.state.password}/>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.login()}>
              <Text style={styles.textWhite}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLight}>
                <Text style={styles.textLink}>Mot de passe oublié</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLight} onPress={() => this.register()}>
                <Text style={styles.textLink}>Pas encore inscrit ?</Text>
            </TouchableOpacity>
          </View>
        </View> 
      </ScrollView>
    )
  };
}

export default connect(mapStateToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    padding : "5%",
    paddingTop : "10%",
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
