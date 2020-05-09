import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'

class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email : "",
            id : "",
            firstname : "",
            lastname : "",
            nickname : ""
        };
    }

    componentDidMount (){
        if (this.props.email == "null" || this.props.email == undefined){
            this.props.navigation.dispatch(resetAction)
        }
        
        axios.get('http://192.168.1.13:8084/user/'+this.props.id).then((response) => {
            this.setState ({
                firstname : response.data.firstname,
                lastname : response.data.lastname,
                nickname : response.data.nickname
            })
        }, (error) => {
          this.setState({ emailAlreadyUse: true })
        });
    }
    
    render() {
        return (
            <ScrollView style = {styles.bc}>
                <View style = {styles.container}> 
                    <View style={styles.jumbotron}>
                        <View style={styles.contain}>
                        <Image
                            style={{flex:1, height: 100, width: 75}}
                            source={require('./image/one.png')}
                            resizeMode="contain"
                        />
                        </View>
                        <Text style={styles.subtitle}>{this.state.firstname} {this.state.lastname}</Text>
                        <Text style={styles.subsubtitle}>{this.state.nickname}</Text>
                        <Text style={styles.titleLabel}>Informations personnelles</Text>
                        <Text style={styles.label}>{this.props.email}</Text>
                        <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.login()}>
                        <Text style={styles.textWhite}>Modifier</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    email: state.userEmail,
    id :  state.userId
  }
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login'})
    ]
})

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
  
    contain : {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    bc : {
        backgroundColor : "white",
        paddingBottom : "100%"
    },
  
    label : {
      fontWeight : "bold",
      marginBottom : "10%"
    },

    titleLabel : {
        fontWeight : "bold",
        fontSize : 20, 
        marginBottom : "5%",
        paddingBottom : "2%",
        borderBottomWidth : 2
    },
  
    subtitle : {
      color:"black", 
      textAlign : "center", 
      fontSize : 20,  
      marginTop : "5%", 
      fontWeight: "bold",
    },

    subsubtitle : {
        color:"black", 
        textAlign : "center", 
        fontSize : 16,  
        marginBottom : "10%",
        paddingBottom : "5%",
        fontWeight: "bold",
    },
  
  
    jumbotron : {
      margin : "5%",
      backgroundColor : "white",
      padding : "5%",
      borderRadius : 10,
    },
  
    textWhite:{
      fontSize : 15,
      color: "white",
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
    
  });

export default connect(mapStateToProps)(Profil)