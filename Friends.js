import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'

class Friends extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email : "",
            friends : []
        }
    }

    componentDidMount (){
        if (this.props.email == "null"){
            this.props.navigation.dispatch(resetAction)
        }
        console.log("ici");
        axios.get('http://192.168.1.13:8084/user').then((response) => {
            this.setState({ friends: response.data })
            console.log(response.data);
        }, (error) => {
          console.log(error);
          this.setState({ emailAlreadyUse: true })
        });
    }
    
    render() {
        var friends = this.state.friends.map (element => {
            console.log(element.email);
            return (<TouchableOpacity style={styles.friends}><Text style={styles.nickname}>{element.nickname}</Text><Text style={styles.email}>{element.email}</Text></TouchableOpacity>)
        })
        return (
            <ScrollView style={styles.bc}>
                {friends}
            </ScrollView>
            
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
  return {
    email: state.email
  }
}

const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login'})
    ]
})

export default connect(mapStateToProps)(Friends)

const styles = StyleSheet.create({
    bc : {
        backgroundColor : "white",
        paddingBottom : "100%"
    },
    container: {
        flex:1,
        backgroundColor: '#007bff',
        padding : "5%",
        paddingTop : "10%",
        height : "100%"
    },
    nickname : {
        color : "black",
        fontWeight : "bold"
    },
    email : {
        color: "black"
    },
    friends : {
        backgroundColor : "white",
        padding : "5%",
        borderRadius : 5,
        borderColor : "#007bff",
        margin : "5%",
        paddingBottom : "5%",
        borderWidth : 2,

    }

});
