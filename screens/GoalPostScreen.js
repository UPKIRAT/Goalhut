import React, { Component } from 'react';
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';
import { SearchBar, ListItem, Input } from "react-native-elements";
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";




export default class GoalPostScreen extends Component {

    state = {
      userId : firebase.auth().currentUser.email,
      post:"",
      username:""
    }

    getDonorDetails=(userId)=>{
      db.collection("users").where("email_id","==", userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          this.setState({
            "username" : doc.data().user_name
          })
        });
      })
    }

    componentDidMount(){
      this.getDonorDetails(this.state.userId)
    }

    createUniqueId() {
      return Math.random().toString(36).substring(7);
    }
  
    addRequest = async (post,username) => {
      var userId = this.state.userId;
      var randomRequestId = this.createUniqueId();  
  
      db.collection("posted_goals").add({
        user_id: userId,
        username:username,
        post:post,
        request_id: randomRequestId,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      this.setState({
        post:"",
        requestId: randomRequestId,
      });
  
      return Alert.alert("Goal posted succesfully");
    };

 render(){
    return(
      
        <View style = {styles.container}>
          <ScrollView>
          <View>
            <MyHeader navigation={this.props.navigation} title = "create post"/>
          </View>

          <View style = {{margin:20, flexDirection:"column"}}>
            <TextInput
              style={styles.Goalinput}
              placeholder={"What is that you want to achieve, share it with other to gain motivation and interact with people with the same goals and ambitions"}
              placeholderTextColor="grey"
              multiline = {true}
              onChangeText={(text) => {
                this.setState({
                  post: text,
                });
              }}
              value = {this.state.post}
            />
          </View>

          <TouchableOpacity
            style={styles.ModalButtons}
            onPress={() => {
              this.addRequest(this.state.post,this.state.username)         
            }}
          >
              <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>          
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#101214'
  },
  Goalinput: {
    width: "88%",
    height: RFValue(400),
    padding: RFValue(15),
    borderWidth:3,
    borderRadius:10,
    borderColor:"white",
    alignSelf:"center",
    marginBottom:RFValue(20),
    fontFamily: 'nunito-l',
    fontSize:16,
    color:"white"
  },
  buttonText:{
    color:'black',
    fontWeight:'200',
    fontSize:23,
    fontFamily: 'nunito-l',
  },
  ModalButtons:{
    width:"80%",
    height:55,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    borderRadius:25,
    backgroundColor:'white',
    shadowColor: 'white',
    shadowOffset: {
       width: 0,
       height: 6,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    margin:0
},
  
})