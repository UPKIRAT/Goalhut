import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import db from '../config';
import TickAnimation from '../components/TickAnimation'

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    this.notificationRef = db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
        <View style = {styles.list}>
        <ListItem
          key={index}
          leftElement={<TickAnimation/>}
          title={item.comment + " on your recent post"}
          titleStyle={{ color: 'black', fontFamily:'nunito-l', fontSize:18, marginBottom:7 }}
          subtitle = {"Commented on " + item.date.toDate()}
          subtitleStyle={{ color: 'black', fontFamily:'nunito-l', fontSize:13 }}
          bottomDivider
        />
        </View>
      )
 }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'white'}}>You have no notifications</Text>
              </View>
            )
            :(
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.setState({
                        allNotifications : []
                      })
                    }}>
                  <Text style={{color:'white', fontFamily: 'nunito-l', fontSize:17, textAlign:'center'}}> Delete all notifications permanently</Text>
                  </TouchableOpacity>
              </View>
              
              <FlatList
                  style = {styles.FlastItem}
                  data={this.state.allNotifications}
                  renderItem={this.renderItem}
              />

              </View>
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor:'black'
  },
  button:{
    width:330,
    height:65,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center",
    borderRadius:30,
    backgroundColor:'red',
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
  list:{
    margin:12,
   }
})
