import React from 'react'
import { Dimensions } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import { NavigationActions, StackActions, route } from 'react-navigation'

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });

class Messages extends React.Component {
    intervalID = 0;

    constructor(props) {
        super(props)
        this.state = {
            email : "",
            id : "",
            messages : [],
            name : "",
            group : "",
            message : ""
        };
        this.scroll = this.scroll.bind(this)
    }

    scroll (){
        if (this.scrollView != null) this.scrollView.scrollToEnd({animated : true}) 
    }

    getMessage (){
        axios.get('http://192.168.1.13:8084/message/group/'+this.state.group).then((response) => {
            if (this.state.messages.toString() != response.data.toString()){
                this.setState ({messages : response.data});
                let that = this;
                setTimeout(() => { 
                    this.scroll();
                }, 500);
                this.intervalID = setInterval(() => {
                    this.getMessage()
                }, 2500);
            }
        }, (error) => {
            console.log(error);
            this.setState({ emailAlreadyUse: true })
        });
    }

    componentDidMount (){
        
        const group = this.props.navigation.state.params.group;
        this.setState({group : group});
        axios.get('http://192.168.1.13:8084/participant/'+this.props.id+'/'+group).then((response) => {
            
            this.setState ({name : response.data.name}, () => this.getMessage())
            
        }, (error) => {
          console.log(error);
          this.setState({ emailAlreadyUse: true })
        });
        
    }   

    componentWillUnmount (){
        clearInterval(this.intervalID);
    }

    send (){
        const tempsEnMs = new Date().getTime() / 1000;
        axios.post('http://192.168.1.13:8084/message', {
          "sender" : this.props.id,
          "group" : this.state.group,
          "content" : this.state.message,
          "date" : tempsEnMs
        }).then((response) => {
          this.setState({message : ""})
        }, (error) => {
          console.log(error);
        });
        
    }

    goBack (){
        
        this.props.navigation.dispatch(resetAction);
    }
    
    render() {
        var messages = this.state.messages.map (element => {
            const a = new Date(parseInt(element[4]) * 1000);
            const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            const year = a.getFullYear();
            const month = months[a.getMonth()];
            const date = a.getDate();
            const hour = a.getHours();
            const min = a.getMinutes();
            const sec = a.getSeconds();
            const time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
            if (element[1] == this.props.id){
                return (
                <View style={styles.sender}><Text style={{color : "white", fontSize : 10}}>{time}</Text><Text style={{color : "white", fontSize : 16}}>{element[3]}</Text></View>
                )
            }else {
                return (
                    <View style={styles.receiver}><Text style={{color : "black", fontSize : 10}}>{time}</Text><Text style={{fontSize : 16}}>{element[3]}</Text></View>
                )
            } 
        })
        return (
            <View style={styles.bc}>
                <View style={{marginBottom : 10, backgroundColor : "#007bff", color : "black", padding : "5%", paddingBottom : 0, paddingTop : 0, flexDirection:'row', flexWrap:'wrap', alignItems: 'center',}}>
                    <TouchableOpacity style={{marginRight : 5}} onPress={() => this.goBack()}>
                        <Image
                            style={{height: 50, width: 25}}
                            source={require('./image/back.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Image
                        style={{height: 75, width: 50}}
                        source={require('./image/oneWhite.png')}
                        resizeMode="contain"
                    />
                    <Text style={{textAlign : "center", paddingLeft : "2%", fontSize : 20, color : "white", fontWeight : "bold"}}>{this.state.name}</Text>
                </View>
                <ScrollView  ref={(ref) => (this.scrollView = ref)}>
                    {messages}
                </ScrollView>
                <View style={styles.write}>
                    <TextInput multiline={true} style={styles.input} secureTextEntry={true} placeholder="Aa" onChangeText={(text) => this.setState({message:text})} value={this.state.message}/>
                    <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.send()}>
                        <Text style={styles.textWhite}>&#x27A5;</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
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
        width : "90%",
        padding: "5%",
        paddingTop : 0,
        paddingBottom : 0
    },

    write : {
        flexDirection:'row', 
        flexWrap:'wrap', 
        alignItems: 'center',
        padding : "3%",
        paddingBottom : "1%",
        height : "15%",
        borderTopColor : "#F1F1F1",
        borderTopWidth : 1,
        justifyContent : "center"
    },

    textWhite : {
        fontSize : 40,
        color : "#007bff",
        alignItems: 'center',
    },

    buttonPrimary : {
        alignItems: 'center',
        justifyContent : "center",
        width : "15%",
        height : "100%"
    },

    input : {
        backgroundColor : "#EBEDEF",
        padding : "2%",
        width : "85%",
        height : "100%",
        flex : 1,
        borderRadius : 10
    },

    sender : {
        width : "80%",
        backgroundColor : "#007bff",
        color : "white",
        padding : "3%",
        marginLeft : "15%",
        borderRadius : 20,
        fontSize : 16,
        marginBottom : "3%"
    },

    receiver : {
        width : "80%",
        backgroundColor : "#DDDDDD",
        color : "black",
        padding : "3%",
        borderRadius : 20,
        marginLeft : "5%",
        fontSize : 16,
        marginBottom : "3%"
    },


    bc: {
        flex:1,
        marginTop : 25,
        backgroundColor: 'white',
        height : "100%"
      },

    text : {
        flex : 2,
    },

    textTab : {
        flex : 5,
    },

    wrapper : {
        flexDirection:'row', 
        flexWrap:'wrap',  
        backgroundColor: 'white', 
        margin : "2%", 
        borderRadius : 5
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


export default connect(mapStateToProps)(Messages)