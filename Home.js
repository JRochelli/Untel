import React from 'react'
import { Dimensions } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView, Image, RefreshControl} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
//import https from 'https'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email : "",
            id : "",
            messages : [],
            refreshing : false
        };
    }
    
    refreshList(){
        this.setState({refreshing: true});
        this.setState({refreshing: false});
    }

    componentDidMount (){
        /*const instance = axios.create({
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            })
          });
        instance.get('https://192.168.1.13:8084/message/'+this.props.id).then((response) => {
            this.setState ({messages : response.data});

        }, (error) => {
          console.log(error);
          this.setState({ emailAlreadyUse: true })
        });*/
        axios.get('http://192.168.1.13:8084/message/'+this.props.id).then((response) => {
            this.setState ({messages : response.data});
        }, (error) => {
          console.log(error);
          this.setState({ emailAlreadyUse: true })
        });
    }    
    
    render() {
        const width = Dimensions.get('window').width;
        const size = width/7;
        var messages = <View style={{justifyContent: 'center',
        alignItems: 'center',}}><View style={styles.noMessage}><TouchableOpacity style={styles.btnplus}><Text style={styles.btnNewDiscus}>&#x271A;</Text><Text style={styles.btnNewDiscus} >Nouvelle conversation</Text></TouchableOpacity><TouchableOpacity style={styles.btnplus}><Text style={styles.btnNewDiscus}>&#x271A;</Text><Text style={styles.btnNewDiscus} >Nouveau contact</Text></TouchableOpacity></View></View>;
        if (this.state.messages.length != 0){
            messages = this.state.messages.map (element => {
                return (<View style={styles.wrapper}>
                            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("Messages", {group : element[0]})}>
                                <View style={styles.image}>
                                    <Image style={{flex:1, height: size, width: size}} source={require('./image/one.png')} resizeMode="contain" />
                                </View>
                                <View style = {{width : width - size - 50, paddingLeft : "2%"}}>
                                    <Text style={styles.nickname}>{element[2]}</Text>
                                    <Text style={styles.msg}>{element[1]}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>)
            })
        }
        
        return (
            
            <ScrollView style={styles.bc} refreshControl={
                <RefreshControl
                    refreshing = {this.state.refreshing}
                    onRefresh={() => this.refreshList()}
                />
            }>
                {messages}
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

const styles = StyleSheet.create({

    container : {
        flexDirection:'row', 
        flexWrap:'wrap',
        alignItems: 'center',
        paddingTop : "1%",
        paddingBottom : 0
    },

    noMessage : {
        backgroundColor : "#DDDDDD",
        
        zIndex : 1,
        width : "100%",
        
        
    },

    btnplus : {
        borderTopWidth : 1,
        borderColor : "white",
        padding : "3%"
    },

    btnNewDiscus : {
        color : "black",
        textAlign : "center",
        justifyContent : "center",
        alignContent : "center",
        textAlignVertical : "center",
        fontSize : 16,
    },

    bc : {
        flex : 1,
        backgroundColor : "white",
      },

    wrapper : {
        flexDirection:'row', 
        flexWrap:'wrap', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderBottomWidth : 2,
        borderColor : "#DDDDDD",
        paddingBottom : "3%",
        margin : "5%",
        marginTop : 0,
        marginBottom : "2%"
    },

    image : {
        flex : 1,
    },

    nickname : {
        color : "black",
        fontWeight : "bold",
        width : "80%"
    },

    msg : {
        color: "black"
    },

    click : {
        width : "10%",
    },

    font20 : {
        fontSize : 20
    }
})


export default connect(mapStateToProps)(Home)