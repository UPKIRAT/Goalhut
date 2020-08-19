import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'
import TickAnimation from '../components/TickAnimation'

export default class MyRatesScreen extends Component {
   constructor(){
     super()
     this.state = {
       raterId : firebase.auth().currentUser.email,
       raterName : "",
       allRates : []
     }
     this.requestRef= null
   }

   static navigationOptions = { header: null };

   getallRates =()=>{
     this.requestRef = db.collection("all_given_rates").where("donor_id" ,'==', this.state.raterId)
     .onSnapshot((snapshot)=>{
       var allRates = []
       snapshot.docs.map((doc) =>{
         var donation = doc.data()
         donation["doc_id"] = doc.id
         allRates.push(donation)
       });
       this.setState({
         allRates : allRates
       });
     })
   }

   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
      key={i}
      title={item.message}
      subtitle={item.rate1 + ", " + item.rate2 + ", " + item.rate3 + ", " + item.rate4 + ", " + item.rate5}
      leftElement={<TickAnimation/>}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      bottomDivider
     />
   )


  //  componentDidMount(){
  //    this.getallRates()
  //  }

  //  componentWillUnmount(){
  //    this.requestRef();
  //  }

   render(){
     return(
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="Responded to"/>
         <View style={{flex:1}}>
           {
             this.state.allRates.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all rates you have given</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allRates}
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
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  
})
