import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { ScrollView } from 'react-native-gesture-handler';

export default class ViewPosts extends React.Component{

    constructor(){
        super()
        this.state = {
          userId  : firebase.auth().currentUser.email,
          PostDetailsList : []
        }
      this.requestRef= null
      }
    
      getPostDetailsList =()=>{
        this.requestRef = db.collection("posted_goals")
        .onSnapshot((snapshot)=>{
          var PostDetailsList = snapshot.docs.map(document => document.data());
          this.setState({
            PostDetailsList : PostDetailsList
          });
        })
      }
    
      componentDidMount(){
        this.getPostDetailsList();
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
            <View style = {styles.list}>
                <ListItem
                    key={i}
                    title={item.username + "'s " + 'goal'}
                    subtitle = {'View this post '+ 'to understand more and motivate ' + item.username}
                    subtitleStyle = {{ color: "black", fontSize:13, marginBottom:5, marginTop:5,  fontFamily: 'nunito-l',}}
                    titleStyle={{ color: "black", fontSize:20, marginBottom:5, marginTop:5,  fontFamily: 'nunito-l',}}
                    rightElement={
                        <TouchableOpacity style={styles.button}
                        onPress ={()=>{
                          this.props.navigation.navigate("PostDetails",{"details": item})
                        }}
                        >
                        <Text style={{color:'#ffff', fontFamily: 'nunito-l', fontSize:18}}>View</Text>
                        </TouchableOpacity>
                    }
                    bottomDivider
                />
            </View>
        )
      }
    

    render(){
        return(<View style = {styles.container}>
                    <View>
                    <MyHeader title="View Goals" navigation ={this.props.navigation}/>
                    </View>
                    <View style={{flex:1}}>
                    {
                        this.state.PostDetailsList.length === 0
                        ?(
                        <View style={styles.subContainer}>
                            <Text style={styles.ButtonText}>List of all posted goals</Text>
                        </View>
                        )
                        :(
                        <FlatList
                        style = {styles.FlastItem}
                            keyExtractor={this.keyExtractor}
                            data={this.state.PostDetailsList}
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
    container:{
        flex:1,       
        backgroundColor:'#101214' 
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color : '#40E0D0',
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
    },
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
        width:110,
        height:55,
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
    ButtonText:{
        color:'black',
        fontWeight:'200',
        fontSize:25,
        textAlign:"center",
        marginTop:50,
        fontFamily: 'nunito-l',
    },
    list:{
        borderWidth:2,
        margin:12,
        borderColor:"#4C516D"
    }
  })