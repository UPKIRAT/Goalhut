import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, TextInput, FlatList} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements'

import db from '../config.js';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";


export default class PostDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      recieverId      : this.props.navigation.getParam('details')["user_id"],
      requestId       : this.props.navigation.getParam('details')["request_id"],
      postDocId : '',
      user_name:"",
      post:"",
      commenters_username:"",
      comment:"",
      CommentsList : []
    }
    this.requestRef= null
  }

  getComments =()=>{
    this.requestRef = db.collection("all_notifications").where('request_id','==',this.state.requestId)
    .onSnapshot((snapshot)=>{
      var CommentsList = snapshot.docs.map(document => document.data());
      this.setState({
        CommentsList : CommentsList
      });
    })
  }
  
  getRecieverDetails(){
    db.collection('posted_goals').where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          user_name : doc.data().username,
          post : doc.data().post,
          postDocId : doc.id
        })
      })
    });
}

getCommentersUsername(){
  db.collection('users').where('email_id','==',this.state.userId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        commenters_username : doc.data().user_name
      })
    })
  });
}


addNotification = () => {
  var real_comment = this.state.comment;
  var comment =
    this.state.commenters_username + " has commented, " + this.state.comment;
  db.collection("all_notifications").add({
    targeted_user_id: this.state.recieverId,
    commenter_id: this.state.userId,
    request_id: this.state.requestId,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    notification_status: "unread",
    comment: comment,
    real_comment : real_comment,
    commenters_username : this.state.commenters_username
  });
};

addRate = () => {
  var comment =
    "You recently rated " + this.state.user_name + " on the following categories";
  db.collection("all_given_rates").add({
    targeted_user_id: this.state.recieverId,
    commenters_id: this.state.userId,
    request_id: this.state.requestId,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    comment: comment,
  });
};

  componentDidMount(){
    this.getComments()
    this.getRecieverDetails()
    this.getCommentersUsername()
  }

  componentWillUnmount(){
    this.requestRef();
  }

    
      renderItem = data =>{
        return (
            <View style = {styles.list}>
                <ListItem
                    title = {data.item.commenters_username + " :- " + data.item.real_comment}
                    titleStyle = {{ color: "black", fontSize:16, fontFamily: 'nunito-l',}}
                    bottomDivider
                />
            </View>
        )
      }

    render(){
      return(
        
        <View style={styles.container}>
          <ScrollView>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#fff'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Details", style: { color: '#fff', fontSize:26, fontFamily:'frontage' } }}
              backgroundColor = '#101214'

            />
          </View>
          <View style={{flex:0.45,}}>
            <Card
                title={this.state.user_name + "'s post"}
                titleStyle= {{fontSize : 29, fontFamily:"nunito-l"}}
              >
              <Card>
                <View style = {{flexDirection:"row"}}>
                <Text style={{fontSize : 16, fontFamily:"nunito-l"}}>{this.state.post}</Text>
                </View>
              </Card>
            </Card>

            <Card
                title={"Comments"}
                titleStyle= {{fontSize : 22, fontFamily:"nunito-l"}}
              >
              <Card>
                <View style = {{flexDirection:"column"}}>
                <FlatList
                  style = {styles.FlastItem}
                  data={this.state.CommentsList}
                  renderItem={this.renderItem}
                />
                </View>
              </Card>
            </Card>

            <Card
                title={"Wanna Comment?"}
                titleStyle= {{fontSize : 22, fontFamily:"nunito-l"}}
              >
              <Card>
                <View style = {{flexDirection:"column"}}>
                <TextInput
                  style={styles.valueInput}
                  placeholder={"Say something..."}
                  maxLength={50}
                  onChangeText={(text) => {
                    this.setState({
                      comment: text,
                    });
                  }}
                  comment = {this.state.comment}
                />
                </View>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.addNotification()
                      this.props.navigation.navigate('MyRatesScreen')
                    }}>
                  <Text style={{color:'black', fontFamily: 'nunito-l', fontSize:18}}>Comment!</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
          </ScrollView>
        </View>
        
        
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#101214'
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:170,
    height:65,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    borderRadius:30,
    backgroundColor:'white',
    shadowColor: 'white',
    shadowOffset: {
       width: 4,
       height: 7,
    },
    shadowOpacity: 0.20,
    shadowRadius: 12.32,
    elevation: 30,
    marginTop:20,
    marginBottom:30
  },
  valueInput: {
    width: "90%",
    height: RFValue(40),
    borderWidth:1.2,
    borderRadius:20,
    borderColor:"#05386B",
    marginLeft:"5%",
    fontFamily: 'nunito-l',
    fontSize:15,
    paddingLeft : 20
  },
  list:{
   margin:12,
  }
})
