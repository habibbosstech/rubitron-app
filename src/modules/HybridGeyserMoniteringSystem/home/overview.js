import React,{ useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Animated,
  Alert,
  ActivityIndicator,
  Platform,
  YellowBox,
  CheckBox
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { Shake } from 'react-native-motion';
import CardFlip from 'react-native-card-flip';
import { withNavigation } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';
import { Button, Colors } from 'react-native-ui-lib';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import { BottomNavigation } from 'react-native-paper';
const backGround = require("../../../../assets/images/background.png")
const flam =require('../../../../assets/images/icons/fire.png')
const Electric_icon =require('../../../../assets/images/icons/Electric.png')
const Hybrid_icon =require('../../../../assets/images/icons/Hybrid_icon.png')
class HybridGeyserOverViewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          moduleArray: [],
          selectedModule: -1,
          selectedModuleValue: null,
          sensorIndex: null,
          value: 0,
         
        };
        // console.log(this.state)
      }
     
      async componentDidMount() {
        const { user, navigation } = this.props;
        const done = await this.props.getSensors(user.id);
        console.log(done);
        if (done === 'done') {
          console.log('doneee')
          this.handleSensorData();
        } else {
          console.log('error');
        }
        this.focusListener = navigation.addListener('didFocus', async () => {
          const done = await this.props.getSensors(user.id);
          if (done === 'done') {
            this.handleSensorData();
          } else {
            console.log('error');
          }
        });
      }
      handleSensorData = () => {
        const { geyserModule } = this.props;
        // console.log('module',geyserModule)
        const temp = [];
        geyserModule.map(s => {
          console.log(s.name)
          temp.push(s.name);
        });
    
        this.setState({
          moduleArray: temp,
          selectedModule: 0,
          selectedModuleValue: geyserModule[0].name,
        });
      };
      handleSensorChange = (index, value) => {
        const { geyserModule } = this.props;
        const Index2 = geyserModule.findIndex(s => s.name === value);
        // console.log('index',Index2)
        this.setState({
          selectedModule: index,
          selectedModuleValue: value,
          sensorIndex: Index2,
        });
      };
      onClickButtonSencer =()=>{
        console.log('done');
      }
      onClickButton = () => {
        console.log('pressed............');
        const { geyserModule } = this.props;
        const { selectedModule } = this.state;
        if (geyserModule[selectedModule].geyser_control === 0) {
          this.props.GeyserStatus(geyserModule[selectedModule]._id, 1);  
        } else if (geyserModule[selectedModule].geyser_control === 1) {
          this.props.GeyserStatus(geyserModule[selectedModule]._id, 0);
        }
      };
     
      render() {
        const { moduleArray, selectedModule, selectedModuleValue } = this.state;
        const { user, geyserModule, geyserLoading,addRoutineLoading } = this.props;
        console.log('geyser',moduleArray);
        // console.log('geyser',selectedModule);
        // if (selectedModuleValue === null && selectedModule === -1) {
        //   return (
        //     <View
        //       style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //     >
        //       <Bars size={15} color={colors.primary} />
        //     </View>
        //   );
        // }
        // const [isSelected, setSelection] = useState(false);
        return(
            <View style = {styles.maincontainer}>
                <Text style = {styles.textColorHeading}>GOOD MORNING,</Text>
                <Text style = {styles.textUser}>RubiTron Lab.</Text>
                <View style = {[styles.displayFlex,{paddingTop:30}]}>               
                    {/* <View style = {styles.circleView}>
                 <Text style={{padding:hp(5),fontWeight:'bold'}}>{+38}</Text>
                 </View> */}
                    <ProgressCircle
                
            percent={30}
            radius={60}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{'30%'}</Text>
        </ProgressCircle>
                 <View style={{padding:hp(2.5)}}>
                 <Text style={{   color: '#1976D2',fontWeight:'bold',fontSize: 18,}}>MAIN HEATER</Text>
                 <Text style={{fontWeight:'bold',fontSize: 25,}}>{55}° C</Text>
                        <Text style={{fontWeight:'bold',  color: '#1976D2',}}>WATER HEATER TEMPERATURE</Text>
                     </View>
                 </View>
                 <View  
                  style = {{height:'35%',width:'100%'}}>
                 <ScrollView                  
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
        <View
        
          >
                <View style={{ flexDirection: 'row', paddingTop:10 }}>
                <Card containerStyle = {[styles.Card,{backgroundColor: '#34a8eb',}]} >
                  
                  <View style ={{ flexDirection: "row",
                               justifyContent: 'space-between',  flexWrap: "wrap",}} >
                  <View>
                     <Text style ={styles.TextCard}> GEYSER STATUS</Text>
                     <Text style ={{  color:'white',
                                      fontSize: hp('3.0%'),
                                      fontWeight:'bold',
                                      margin:8 }}>ON</Text>
                  </View>
                      {
                      0 === 0 ? (
             <TouchableOpacity
               onPress={() => this.onClickButton()}
               style={styles.offStatus}
             >
               {/* {geyserModule[selectedModule].geyser_control === 1 ? (
                 <Icon1 name={'power-off'} size={15} color={'green'} />
               ) : (
                 <Icon1 name={'power-off'} size={15} color={'white'} />
               )} */}
               <Icon1 name={'power-off'} size={20} color={'white'} />
               <Text style={styles.cardText}>OFF</Text>
                 
               
             </TouchableOpacity>
             ) : (
               <TouchableOpacity
               onPress={() => this.onClickButton()}
               style={styles.onStatus}
             >
                 <Text style={styles.cardText}>ON</Text>
                 <Icon1 name={'power-off'} size={20} color={'white'} />
               
             </TouchableOpacity>
             )
             }

                  </View>
              </Card>
                 <Card containerStyle =  {[styles.Card,{backgroundColor: '#1976D2',}]} >
                  
                     <View style ={{ flexDirection: "row",
                            justifyContent: 'space-between'       }} >
                     <View>
                        <Text style ={styles.TextCard}> GAS VALVE</Text>
                        <Text style ={{  color:'white',
                                         fontSize: hp('3.0%'),
                                         fontWeight:'bold',
                                         margin:8 }}>ON</Text>
                     </View>
                        
                     <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    // marginTop: hp('4%'),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    shadowOpacity: 0.1,
                    elevation: 2,
                    marginLeft:20
                  }}
                >
                  {/* <Icon1 name='user' color={'red'} size={45}/> */}
                  <Image
                    source={require('../../../../assets/images/volveGas.png')}
                    style={{
                      width: wp('10%'),
                      height: hp('6%'),
                      alignSelf: 'center',
                    }}
                  />
                </View>
                     </View>
                 </Card>
                
              
              <Card containerStyle =  {[styles.Card,{backgroundColor: '#34a8eb',}]} >
                  
                  <View style ={{ flexDirection: "row",
                           justifyContent: 'space-between'     }} >
                  <View>
                     <Text style ={styles.TextCard}> GAS VALVE</Text>
                     <Text style ={{  color:'white',
                                      fontSize: hp('3.0%'),
                                      fontWeight:'bold',
                                      margin:8 }}>ON</Text>
                  </View>
                     
                  <View
               style={{
                 width: 60,
                 height: 60,
                 backgroundColor: '#fff',
                 borderRadius: 50,
                 // marginTop: hp('4%'),
                 alignSelf: 'center',
                 justifyContent: 'center',
                 shadowOpacity: 0.1,
                 elevation: 2,
                 marginLeft:20
               }}
             >
               {/* <Icon1 name='user' color={'red'} size={45}/> */}
                {true=== true ? (
                    <Image
                      source={require('../../../../assets/images/editBurner.png')}
                      style={{ width: wp('7%'), height: hp('3%'),alignSelf:'center' }}
                    />
                  ) : (
                    <Image
                      source={require('../../../../assets/images/burner.png')}
                      style={{ width: wp('7%'), height: hp('3%'),alignSelf:'center' }}
                    />
                  )}
             </View>
                  </View>
              </Card>      
              <Card containerStyle =  {[styles.Card,{backgroundColor: '#1976D2',}]} >
                  
                  <View style ={{ flexDirection: "row",
                            justifyContent: 'space-between',    }} >
                  <View>
                     <Text style ={styles.TextCard}> MODE</Text>
                     {/* <Text style ={{  color:'white',
                                      fontSize: hp('3.0%'),
                                      fontWeight:'bold',
                                      margin:8 }}>ON</Text> */} 
                                        {
                     true === true ? (
                      <Text style={{color:'white',
                      fontSize: hp('3.0%'),
                      fontWeight:'bold',
                      margin:8 }}>
                       GAS
                      </Text>
                    ) : (
                      <Text style={{color:'white',
                      fontSize: hp('3.0%'),
                      fontWeight:'bold',
                      margin:8 }}>
                     
                        ELECTRIC
                      </Text>
                    )}
                  </View>
                     
                  <View
             style={{
              width: 60,
              height: 60,
              backgroundColor: '#fff',
              borderRadius: 50,
              // marginTop: hp('4%'),
              alignSelf: 'center',
              justifyContent: 'center',
              shadowOpacity: 0.1,
              elevation: 2,
              marginLeft:20
            }}
             >
                 
               {/* <Icon1 name='user' color={'red'} size={45}/> */}
               { 
                  'Gas' === 'Gas' ? (
                    <Image
                      source={flam}
                      style={{ width: wp('5%'), height: hp('5%') ,
                    marginLeft:wp('5%')}}
                    />
                  ) : false === 'Electric' ? (
                    <Image
                      source={Electric_icon}
                      style={{ width: wp('5%'), height: hp('5%'),marginLeft:wp('5%') }}
                    />
                  ):false === 'Hybrid' ? (
                    <Image
                      source={Hybrid_icon}
                      style={{ width: 50, height: 50,marginLeft:4 }}
                    />
                  ): null
                }
             </View>
                  </View>
              </Card>     
                 </View>
                 </View>
                 </ScrollView>
                 </View>
                
               
                 <View  style = {styles.senserView} >
                    <Text style={{fontSize:20,fontWeight:'bold',}}>GEYSERS </Text>
                    <View  style = {styles.displayFlex} >
                    {/* <View style = {styles.iconSensorView}>
                    <ImageBackground source={require('../../../../assets/images/editGeyser.png')}
                          style={{ width: wp('5%'), height: hp('5%') }}> 
                          <View>
                           
               </View>
                    </ImageBackground>
                      
                          </View>  */}
                 <View>       
              {  0==0     ? (
                <TouchableOpacity
                  onPress={() => this.onClickButtonSencer()}
                  style={styles.iconSensorViewoff}
                >
                
               <Image  source={require('../../../../assets/images/editGeyser.png')}
                          style={{ width: wp('5%'), height: hp('5%') }}/>
                    
                  
                </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                  onPress={() => this.onClickButtonSencer()}
                  style={styles.iconSensorViewon}
                >
                 <Image  source={require('../../../../assets/images/editGeyser.png')}
                          style={{ width: wp('5%'), height: hp('5%') }}/>
                  
                </TouchableOpacity>
                )
                }</View>  
                       
                    </View>
                    </View>
               
               
            </View>
        ) 
            
        
    }
}
export default HybridGeyserOverViewScreen;

const styles = StyleSheet.create({
   maincontainer :{
       padding:"5%",
    //    backgroundColor: '#4169e1',
       flex: 1
    },

    displayFlex:{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop:hp(2),
        // backgroundColor: '#4169e1',
    },
    textColorHeading:{
        // color: 'white',
        fontSize: 25,
        color: '#1976D2'
    },
    textUser:{
        fontWeight:'bold',
        fontSize: 22,
      
    },
    Card:{
      justifyContent: 'space-around',
      // justifyContent: 'space-between',
        height:hp(20),
        width:wp(80),
        
        // backgroundColor: '#eb4634',
        // backgroundColor: '#eb8634',
        // backgroundColor: '#1976D2',
        // backgroundColor: '#34a8eb',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
        borderWidth: 2,
        borderRadius: 20,
        // opacity:0.8
    },
    progressBar:{
        marginTop:20
    },
    senserView:{
        paddingTop:hp(3),
        justifyContent:'center',
        alignItems:'center',
       
    },
    iconSensorViewoff:{
        marginRight:10,
        // marginTop:8,
        width: 55,
        height: 55,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
        borderRadius:10,
        borderWidth: 2,
        borderColor: 'white',
    },
    iconSensorViewon:{
      marginRight:10,
      // marginTop:8,
      width: 55,
      height: 55,
      borderRadius: 20,
      backgroundColor: '#34a8eb',
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: wp('0%'), height: hp('0%') },
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: wp('2%'),
      elevation: 10,
      borderRadius:10,
      borderWidth: 2,
      borderColor: '#34a8eb',
  },
    cardText: { 
        color:'white',
        fontSize: hp('2.0%'),
        fontWeight:'bold', 
        alignSelf: 'center',
    
       },
       TextCard :{
        color:'white',
        fontSize: hp('2.8%'),
        fontWeight:'bold', 
       },
    offStatus: {
        width: wp('30%'),
        height: hp('5.0%'),
        borderRadius: hp('15%'),
        marginTop: hp('3.5%'),
        alignItems: 'center',
        borderWidth: 0.1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        shadowOpacity: 0.1,
        backgroundColor: 'red',
        alignSelf: 'center',
      },
    onStatus: {
        width: wp('30%'),
        height: hp('5.0%'),
        borderRadius: hp('15%'),
        marginTop: hp('2.5%'),
        alignItems: 'center',
        borderWidth: 0.1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        shadowOpacity: 0.1,
        backgroundColor: '#32cd32',
        alignSelf: 'center',
      },
    CheckBox:{
      marginHorizontal:10,
    //   marginTop:17

    }


    
    
    
})
