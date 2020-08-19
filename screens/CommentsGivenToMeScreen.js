import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import db from '../config';
import RateAnimation from '../components/100PercentAnimation'

export default class CommentsGivenToMeScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allPosts : [],
    };

    this.notificationRef = null
  }

getPostDetails = () => {
    this.notificationRef = db.collection("posted_goals")
    .where("user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allPosts =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allPosts.push(notification)
      });
      this.setState({
          allPosts : allPosts
      });
    })
  }

  componentDidMount(){
    this.getPostDetails()
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
          title={item.username + ", you recently posted this: " + item.post}
          titleStyle={{ color: 'black', fontFamily: 'nunito-l', fontSize:15 }}
          subtitle={"Posted on, " + item.date.toDate()}
          subtitleStyle = {{fontFamily:'nunito-l', fontSize:13}}
          rightElement={
            <TouchableOpacity style={styles.button}
            onPress ={()=>{
              this.props.navigation.navigate("PostDetails",{"details": item})
            }}
            >
            <Text style={{color:'#ffff', fontFamily: 'nunito-l', fontSize:15}}>View</Text>
            </TouchableOpacity>
        }
          bottomDivider
        />
        </View>
      )
 }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Your posts"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allPosts.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'white', fontFamily:'nunito-l'}}>All you posts and their details</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allPosts}
                renderItem={this.renderItem}
               />
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
    backgroundColor:'#101214' 
  },

list:{
  borderWidth:3,
  margin:18,
},
button:{
  width:90,
  height:45,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:25,
  backgroundColor:"black",
  shadowColor: "#000",
  shadowOffset: {
     width: 0,
     height: 8,
  },
  shadowOpacity: 0.30,
  shadowRadius: 10.32,
  elevation: 16,
  marginRight:10
},
})
