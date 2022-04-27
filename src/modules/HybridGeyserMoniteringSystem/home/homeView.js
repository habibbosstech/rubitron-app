import React from 'react';
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
  SafeAreaView,
    YellowBox,
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
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
// import { Dropdown } from '../../../components';
import { Button, Colors } from 'react-native-ui-lib';
import ProgressCircle from 'react-native-progress-circle'
YellowBox.ignoreWarnings(['Warning:Can']);
const backGround = require("../../../../assets/images/background.png")
const flam =require('../../../../assets/images/icons/fire.png')
const Electric_icon =require('../../../../assets/images/icons/Electric.png')
const Hybrid_icon =require('../../../../assets/images/icons/Hybrid_icon.png')
const manu_icon =require('../../../../assets/images/manu_icon.png')
import Dropdown1  from '../../../DropdownCom/DropDown';
class HybridGeyserHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleArray: [],
      selectedModule: -1,
      selectedModuleValue: null,
      sensorIndex: null,
      value: 0,
    };
  }
 
  async componentDidMount() {
    const { user, navigation } = this.props;
    // console.log(user)
    const done = await this.props.getSensors(user.id);
    console.log(done)
    if (done === 'done') {
      // console.log('doneee')
      this.handleSensorData();
    } else {
      console.log('error');
    }
    this.focusListener = navigation.addListener('didFocus', async () => {
      const done = await this.props.getSensors(user.id);
      // console.log(done)
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
    // var temp =geyserModule[selectedModule].temp_upperthreshold
    // console.log(temp);
    // console.log(geyserModule[selectedModule].temperature)
var tim = new Date();
var curHours = tim.getHours()
    if (selectedModuleValue === null && selectedModule === -1) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      );
    }
    return (
     
      
      // <View style={{ flex: 1, backgroundColor: '#4169e1' }}>
      //   <ImageBackground source={backGround} resizeMode="cover" style={styles.image} >
      //   <Dropdown
      //     placeholder="Select Module..."
      //     style={styles.Dropdown}
      //     items={moduleArray}
      //     selectedIndex={selectedModule}
      //     onSelect={(index, value) => this.handleSensorChange(index, value)}
      //   />
      //   {geyserLoading === true ||
      //   geyserModule === null ||
      //   geyserModule === undefined ? (
      //     <View
      //       style={{
      //         flex: 1,
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //         alignSelf: 'center',
      //       }}
      //     >
      //       <Bars size={15} color={colors.primary} />
      //     </View>
      //   ) : (
      //     <ScrollView>
      //     <View
      //       style={{ flex: 1, flexDirection: 'column', marginTop: hp('4%'),marginBottom:'5%' }}
      //     >
           
      //       <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
      //         <Card containerStyle={styles.cards}>
      //           <Text style={styles.text}>GEYSER CONTROL</Text>
      //           <Divider />
      //           <View
      //             style={{
      //               justifyContent: 'flex-start',
      //               justifyContent: 'center',
      //               alignItems: 'center',
      //               marginTop: hp('2%'),
      //             }}
      //           >
                 
      //             {geyserModule[selectedModule].geyser_status === true ? (
      //               <Image
      //                 source={require('../../../../assets/images/editGeyser.png')}
      //                 style={{ width: wp('15%'), height: hp('15%') }}
      //               />
      //             ) : (
      //               <Image
      //                 source={require('../../../../assets/images/geyserIcon.png')}
      //                 style={{ width: wp('15%'), height: hp('15%') }}
      //               />
      //             )}
      //           </View>

      //           {geyserModule[selectedModule].geyser_control === 0 ? (
      //           <TouchableOpacity
      //             onPress={() => this.onClickButton()}
      //             style={styles.offStatus}
      //           >
      //             {/* {geyserModule[selectedModule].geyser_control === 1 ? (
      //               <Icon1 name={'power-off'} size={15} color={'green'} />
      //             ) : (
      //               <Icon1 name={'power-off'} size={15} color={'white'} />
      //             )} */}
      //             <Icon1 name={'power-off'} size={20} color={'white'} />
      //             <Text style={styles.cardText}>OFF</Text>
                    
                  
      //           </TouchableOpacity>
      //           ) : (
      //             <TouchableOpacity
      //             onPress={() => this.onClickButton()}
      //             style={styles.onStatus}
      //           >
      //               <Text style={styles.cardText}>ON</Text>
      //               <Icon1 name={'power-off'} size={20} color={'white'} />
                  
      //           </TouchableOpacity>
      //           )
      //           }

                
      //         </Card>
      //         <Card containerStyle={styles.cards}>
      //           <Text style={styles.text}>MODE</Text>
      //           <Divider />
      //           <View
      //             style={{
      //               width: 120,
      //               height: 170,
      //               backgroundColor: '#f8f8ff',
      //               borderRadius: 50,
      //               marginTop: hp('3%'),
      //               alignSelf: 'center',
      //               justifyContent: 'center',
      //               shadowOpacity: 0.1,
      //               alignItems: 'center',
      //               elevation: 2,
      //             }}
      //           >
                  
      //             {geyserModule[selectedModule].burner_status === false ? (
      //                 <Text style={[styles.cardText1, { color: 'green' }]}>
      //                  GAS
      //                 </Text>
      //               ) : (
      //                 <Text style={[styles.cardText1, { color: 'green' }]}>
                     
      //                   ELECTRIC
      //                 </Text>
      //               )}
      //                <View
      //             style={{
      //               flexDirection: 'row',
      //               justifyContent: 'space-around',
      //               marginTop: hp('4%'),
      //             }}
      //           >
      //             <View>
                
      //             { 
      //             false === 'Gas' ? (
      //               <Image
      //                 source={flam}
      //                 style={{ width: wp('15%'), height: hp('8%') }}
      //               />
      //             ) : false === 'Electric' ? (
      //               <Image
      //                 source={Electric_icon}
      //                 style={{ width: wp('12%'), height: hp('6%') }}
      //               />
      //             ): 'Hybrid' === 'Hybrid' ? (
      //               <Image
      //                 source={Hybrid_icon}
      //                 style={{ width: wp('10%'), height: hp('10%') }}
      //               />
      //             ): null
      //           }
      //             </View>
      //           </View>
      //           </View>
               
      //         </Card>
            
      //       </View>
            

      //       <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
      //       <Card containerStyle={styles.cards}>
      //           <Text style={styles.text}>BURNER STATUS</Text>
      //           <Divider />
      //           <View
      //             style={{
      //               width: 100,
      //               height: 170,
      //               backgroundColor: '#f8f8ff',
      //               borderRadius: 50,
      //               marginTop: hp('3%'),
      //               alignSelf: 'center',
      //               justifyContent: 'center',
      //               shadowOpacity: 0.1,
      //               alignItems: 'center',
      //               elevation: 2,
      //             }}
      //           >
                  
      //             {geyserModule[selectedModule].burner_status === true ? (
      //                 <Text style={[styles.cardText1, { color: 'green' }]}>
      //                   ON
      //                 </Text>
      //               ) : (
      //                 <Text style={[styles.cardText1, { color: 'red' }]}>
      //                   OFF
      //                 </Text>
      //               )}
      //                <View
      //             style={{
      //               flexDirection: 'row',
      //               justifyContent: 'space-around',
      //               marginTop: hp('4%'),
      //             }}
      //           >
      //             <View>
      //             {geyserModule[selectedModule].burner_status === true ? (
      //               <Image
      //                 source={require('../../../../assets/images/fire.gif')}
      //                 style={{ width: wp('15%'), height: hp('8%') }}
      //               />
      //             ) : (
      //               <Image
      //                 source={require('../../../../assets/images/burner.png')}
      //                 style={{ width: wp('12%'), height: hp('6%') }}
      //               />
      //             )}
      //             </View>
      //           </View>
      //           </View>
               
      //         </Card>
      //         <Card containerStyle={styles.cards}>
      //           <Text style={styles.text}>TEMPERATURE</Text>
      //           <Divider />
      //           {/* <View style={styles.progressView}>
      //           <AnimatedCircularProgress
      //                   startDeg={45}
      //                   endDeg={120}
      //                   innerRadius={0}
      //                   duration={300}
      //                   style={{ marginTop: 10 }}
      //               /> 
      //           <AnimatedCircularProgress
      //                   style={{alignSelf:'center',marginTop:hp('4%')}}
      //                   size={hp('10%')}
      //                   width={wp('1%')}
      //                   // fill={127}
      //                   fill={geyserModule[selectedModule].temperature}
      //                       // eslint-disable-next-line no-nested-ternary
      //                   tintColor="#DB0015"
      //                   onAnimationComplete={() => console.log('onAnimationComplete')}
      //                   backgroundColor="#f5f5f5"
      //                   >
      //                   {
      //                   () => (
      //                       <View style={{alignItems:'center'}}>
      //                       <Icon1 name="temperature-high" size={25} color="#DB0015" />
      //                       </View>
      //                   )
      //                   }
      //                   </AnimatedCircularProgress>
      //           </View> */}

      //           <View
      //             style={{
      //               width: 100,
      //               height: 170,
      //               backgroundColor: '#f8f8ff',
      //               borderRadius: 50,
      //               marginTop: hp('4%'),
      //               alignSelf: 'center',
      //               justifyContent: 'center',
      //               shadowOpacity: 0.1,
      //               alignItems: 'center',
      //               elevation: 2,
      //             }}
      //           >
                 
      //             <Text
      //             style={{
      //               fontSize: hp('3.5%'),
      //               alignSelf: 'center',
      //               marginTop: hp('0.5%'),
      //               fontWeight: 'bold',
      //             }}
      //           >
      //             {geyserModule[selectedModule].temperature} °C
      //           </Text>
      //           <View
      //           style={{
      //             marginTop: hp('3.5%'),
      //           }}
      //           >
      //            <Icon1 name="temperature-high" size={40} color="#DB0015"  />
      //            </View>
      //           </View>
               
      //         </Card>
             
      //       </View>
      //       <Card containerStyle={styles.cards}>
      //           <Text style={styles.text}>GAS VALVE</Text>
      //           <Divider />
      //           <View
      //             style={{
      //               width: 100,
      //               height: 170,
      //               backgroundColor: '#f8f8ff',
      //               borderRadius: 50,
      //               marginTop: hp('4%'),
      //               alignSelf: 'center',
      //               justifyContent: 'center',
      //               shadowOpacity: 0.1,
      //               elevation: 2,
      //             }}
      //           >
      //             {/* <Icon1 name='user' color={'red'} size={45}/> */}
      //             <View style={{ alignItems: 'center', marginTop: hp('1%') }}>
      //             {geyserModule[selectedModule].gas_valve === true ? (
      //               <Text style={styles.textStatus1}> OPEN </Text>
      //             ) : (
      //               <Text style={styles.textStatus}> CLOSE </Text>
      //             )}
      //           </View>
      //             <Image
      //               source={require('../../../../assets/images/valve.png')}
      //               style={{
      //                 width: wp('12%'),
      //                 height: hp('8%'),
      //                 marginTop: hp('1.5%'),
      //                 alignSelf: 'center',
      //               }}
      //             />
      //           </View>
                
      //         </Card>
      //     </View>
      //     </ScrollView>
      //   )}
      //   </ImageBackground>
      // </View>
      <SafeAreaView>
         {geyserLoading === true ||
        geyserModule === null ||
        geyserModule === undefined ? (
          <View
            style={{
              height : hp('100%'),
              // flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : ( 
      <View style = {styles.maincontainer}>
        <View style={{padding:hp('2.5%'),  borderWidth:2.5,
      borderTopColor:'#0000',
      borderColor: '#1976D2',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
      }}>
        <View style = {[styles.displayFlex,{justifyContent:'space-between',
        // borderWidth:2
        }]}>  
        <View>
      <Text style = {styles.textColorHeading}>

        {
          (curHours < 12) ? (
            <Text>GOOD MORNING,</Text>
          ) :(curHours >= 12 && curHours < 17 )?(
            <Text>GOOD AFTERNOON,</Text>
          ) :(curHours >= 17 && curHours <= 20) ?(
            <Text>GOOD EVENING,</Text>
          ) :(curHours > 21) (
            <Text>GOOD NiGHT,</Text>
          )
        }
        
        </Text>
      <Text style = {styles.textUser}>{user.name}.</Text>
      </View>
      <Dropdown1
          // placeholder="Select Module..."
          style={styles.Dropdown}
          items={moduleArray}
          selectedIndex={selectedModule}
          onSelect={(index, value) => this.handleSensorChange(index, value)}
        />
        
      {/* <Image
      source={manu_icon}
      style={{height:30,width:30,marginLeft:-5,paddingTop:-4}}
      /> */}
     </View>
      <View style={{
        // height:hp("20%"),
      // borderWidth:2

      }}>
      <View style = {[styles.displayFlex,
        {paddingTop:hp('2%')
        }]}>               
          {/* <View style = {styles.circleView}>
       <Text style={{padding:hp(5),fontWeight:'bold'}}>{+38}</Text>
       </View> */}
          <ProgressCircle
      
  percent={(((geyserModule[selectedModule].temperature)/geyserModule[selectedModule].temp_upperthreshold))*100}
  radius={wp('16%')}
  borderWidth={6}
  color="#3399FF"
  shadowColor="#999"
  bgColor="#fff"
>
  <Text style={{fontWeight:'bold', fontSize: 20, }}>{Math.floor((((geyserModule[selectedModule].temperature)/geyserModule[selectedModule].temp_upperthreshold))*100)}%</Text>
       <View style={{flexDirection: "row",}}>
  <Text style={{opacity:0.3, marginRight:10}}>of</Text>
  <Text style={{fontWeight:'bold',fontSize:15}}>{geyserModule[selectedModule].temp_upperthreshold}° C</Text>
  </View>
</ProgressCircle>
       <View style={{paddingLeft:wp(3),paddingTop:hp('1%')}}>
       <Text style={{   color: '#1976D2',fontWeight:'bold',fontSize: wp('4.5%'),}}>{selectedModule > -1 && moduleArray[selectedModule]
              ? moduleArray[selectedModule]
              :null}</Text>
       <Text style={{fontWeight:'bold',fontSize: hp('3%'),}}>{geyserModule[selectedModule].temperature}° C</Text>
              <Text style={{fontWeight:'bold',  color: '#1976D2',fontSize: wp('3.5%')}}>WATER TEMPERATURE</Text>
              <View style={{flexDirection: "row",borderWidth:2,borderColor:'#1976D2',padding:'1.2%',borderRadius:5,marginTop:'1%'}}>
              <Text style={{fontWeight:'bold',  color: '#1976D2',fontSize: wp('4.5%')}}>MODE:  </Text>
              <Animatable.Text
            animation="bounceIn" 
            style={{
              // color:'white',
            fontSize: wp('4.6s%'),
            fontWeight:'bold',
            // margin:8
             }}>
      { 
       geyserModule[selectedModule].supply_mode=== 'Gas' ? (
        <Text style={{fontWeight:'bold' ,fontSize: wp('4.5%')}}> GAS </Text>
        ) :  geyserModule[selectedModule].supply_mode=== 'Electric' ? (
          <Text style={{fontWeight:'bold' ,fontSize: wp('4.5%')}}> ELECTRIC</Text>
        ): geyserModule[selectedModule].supply_mode=== 'Hybrid' ? (
          <Text style={{fontWeight:'bold',fontSize: wp('4.5%')}}>  HYBRID</Text>
        ): null
      }
            </Animatable.Text>
            </View>
           </View>
       </View>
       </View>
       </View>
       <View  
        style = {{
          height:hp('55%'),
                    // marginTop:hp('1')
                    
      
        }}>
       <ScrollView                  
    // horizontal={true}
    showsHorizontalScrollIndicator={false}>
<View

>

      <View style={{ paddingBottom: hp("2%")
        // flexDirection: 'row', 
      }}>
        
      <Card containerStyle = {[styles.Card,{backgroundColor:'#1976D2'}]} >
        
        <View style ={{ flexDirection: "row",
                     justifyContent: 'space-between',flexWrap: "wrap",}} >
        <View>
           <Text style ={styles.TextCard}> GEYSER STATUS</Text>
         
             { geyserModule[selectedModule].geyser_status === false ?
           (
            <Animatable.Text 
            animation="bounceIn"
            style ={{  color:'white',
            fontSize: hp('3.0%'),
            fontWeight:'bold',
            margin:8 }}>OFF</Animatable.Text>
           ):(
            <Animatable.Text
            animation="bounceIn" 
            // duration={}
            style ={{  color:'white',
            fontSize: hp('3.0%'),
            fontWeight:'bold',
            margin:8 }}>ON</Animatable.Text> 
           )} 
          
          
        </View>
            <View style={{marginTop:'-6%'}}>
            {
   geyserModule[selectedModule].geyser_status === false ?  (
   <TouchableOpacity
     onPress={() => this.onClickButton()}
     style={styles.offStatus}
   >
     <Icon1 
 
     name={'power-off'} size={20} color={'white'} />
     
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
        </View>

    </Card>
    
       <Card containerStyle =  {[styles.Card,{backgroundColor:'#34a8eb',}]} >
        
           <View style ={{ flexDirection: "row",
                  justifyContent: 'space-between'       }} >
           <View>
              <Text style ={styles.TextCard}> GAS VALVE</Text>
              {geyserModule[selectedModule].gas_valve === true ?
                             ( 
                              <Animatable.Text
                               animation="bounceIn"  
                               style ={{  color:'white',
                               fontSize: hp('3.0%'),
                               fontWeight:'bold',
                               margin:8 }}>OPEN</Animatable.Text>) :
                               (
                                <Animatable.Text
                                animation="bounceIn"
                                style ={{  color:'white',
                                fontSize: hp('3.0%'),
                                fontWeight:'bold',
                                margin:8 }}>CLOSE</Animatable.Text>
                               )
                              }
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
           <Text style ={styles.TextCard}> BURNER STATUS</Text>
           {geyserModule[selectedModule].burner_status === true ? (
                  <Animatable.Text
                       animation="bounceIn"  
                       style ={{  color:'white',
                       fontSize: hp('3.0%'),
                       fontWeight:'bold',
                       margin:8 }}>ON
                       </Animatable.Text>):(
                            <Animatable.Text
                             animation="bounceIn"  
                            style ={{  color:'white',
                            fontSize: hp('3.0%'),
                            fontWeight:'bold',
                            margin:8 }}>OFF</Animatable.Text>)
                            }
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
       { geyserModule[selectedModule].burner_status === true  ? (
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
    {/* <Card containerStyle =  {[styles.Card,{backgroundColor: '#1976D2',}]} >
        
        <View style ={{ flexDirection: "row",
                  justifyContent: 'space-between',    }} >
        <View>
           <Text style ={styles.TextCard}> MODE</Text>
                              
           <Animatable.Text
            animation="bounceIn" 
            style={{color:'white',
            fontSize: hp('3.0%'),
            fontWeight:'bold',
            margin:8 }}>
           {geyserModule[selectedModule].supply_mode}
            </Animatable.Text>
      
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
     { 
       geyserModule[selectedModule].supply_mode=== 'Gas' ? (
          <Image
            source={flam}
            style={{ width: wp(7), height: hp('5%') ,
          marginLeft:wp('3.5%')}}
          />
        ) :  geyserModule[selectedModule].supply_mode=== 'Electric' ? (
          <Image
            source={Electric_icon}
            style={{ width: wp('5%'), height: hp('5%'),marginLeft:wp('5%') }}
          />
        ): geyserModule[selectedModule].supply_mode=== 'Hybrid' ? (
          <Image
            source={Hybrid_icon}
            style={{ width: 50, height: 50,marginLeft:4 }}
          />
        ): null
      }
   </View>
        </View>
    </Card>      */}
       </View>
       </View>
       
       </ScrollView>
    
       </View>
       <View style={{
        //  borderWidth:2,
        height:hp('6%'),paddingBottom:hp('2%')}}></View>
     
       {/* <View  style = {styles.senserView} >
          <Text style={{fontSize:20,fontWeight:'bold',color:'#1976D2',}}>GEYSERS </Text>
          <View  style = {styles.displayFlex} >
        {/* <View style = {styles.iconSensorView}>
          <ImageBackground source={require('../../../../assets/images/editGeyser.png')}
                style={{ width: wp('5%'), height: hp('5%') }}> 
                <View>
                 
     </View>
          </ImageBackground>
            
                </View>   */}
       {/* <View>  
   
       {  moduleArray === "Hybrid Geyser System 1"    ? (
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
      }
          </View>
          </View> */}
     {/* </View> */} 
    
    
  </View>
  )}
  </SafeAreaView>
    );
  }
}

export default HybridGeyserHomeScreen;

// const styles = StyleSheet.create({
//   cardStyle: { width: wp('30%'), height: hp('20%') },

//   textStatus: { fontWeight: 'bold', fontSize: hp('3%') },
//   textStatus1: { fontWeight: 'bold', fontSize: hp('3%'), color:'green' },

//   text: { alignSelf: 'center', fontSize: hp('2.0%'), fontWeight: 'bold' },
//   progressView: {
//     marginTop: hp('4%'),
//     width: 100,
//     height: 100,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     shadowOpacity: 0.1,
//   },
//   cardText: { 
//     color:'white',
//     fontSize: hp('2.0%'),
//     fontWeight:'bold', 
//     alignSelf: 'center',

//    },
//   cardText1: { fontSize: hp('3.0%'), alignSelf: 'center', fontWeight: 'bold' },
//   cards: { 
//     width: wp('42%'), 
//     height: hp('35%'),
//     borderRadius: 20,
//    },
//   card: {
//     width: wp('30%'),
//     height: hp('5.5%'),
//     borderRadius: hp('15%'),
//     marginTop: hp('4%'),
//   },
//   offStatus: {
//     width: wp('30%'),
//     height: hp('5.0%'),
//     borderRadius: hp('15%'),
//     marginTop: hp('3.5%'),
//     alignItems: 'center',
//     borderWidth: 0.1,
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     shadowOpacity: 0.1,
//     backgroundColor: 'red',
//     alignSelf: 'center',
//   },
//   onStatus: {
//     width: wp('30%'),
//     height: hp('5.0%'),
//     borderRadius: hp('15%'),
//     marginTop: hp('2.5%'),
//     alignItems: 'center',
//     borderWidth: 0.1,
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     shadowOpacity: 0.1,
//     backgroundColor: '#32cd32',
//     alignSelf: 'center',
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   card1: {
//     width: wp('20%'),
//     height: hp('5.5%'),
//     borderRadius: hp('15%'),
//     marginTop: hp('3%'),
//     alignSelf: 'center',
//   },
// });
const styles = StyleSheet.create({
  maincontainer :{
      // padding:"5%",
   //    backgroundColor: '#4169e1',
   height : hp('100%'),
   width:wp('100%')
  //  borderWidth:4
   },
   Dropdown: {
    width: wp('8%'),
    height: hp('4.2%'),
    alignSelf: 'center',
    // marginTop: hp('5%'),
  },
   displayFlex:{
       flexDirection: "row",
       flexWrap: "wrap",
       // backgroundColor: '#4169e1',
   },
   textColorHeading:{
       // color: 'white',
       fontWeight:'bold',
       fontSize: wp('5.5%'),
       color: '#1976D2'
   },
   textUser:{
       fontWeight:'bold',
       fontSize: wp('4.5%'),
   },
   Card:{
     justifyContent: 'space-around',
     // justifyContent: 'space-between',
       height:hp('17%'),
       width:wp('92%'),
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
  //  senserView:{
  //      paddingTop:hp(5),
  //      justifyContent:'center',
  //      alignItems:'center',
  //  },
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
     backgroundColor: '#1976D2',
     alignItems: 'center',
     justifyContent: 'center',
     shadowOffset: { width: wp('0%'), height: hp('0%') },
     shadowColor: 'black',
     shadowOpacity: 0.5,
     shadowRadius: wp('2%'),
     elevation: 10,
     borderRadius:10,
     borderWidth: 2,
     borderColor: '#FFFFFF',
 },
   cardText: { 
       color:'white',
       fontSize: hp('2.0%'),
       fontWeight:'bold', 
       alignSelf: 'center',
      },
      TextCard :{
       color:'white',
       fontSize: hp('2%'),
       fontWeight:'bold', 
      },
   offStatus: {
       width: wp('30%'),
       height: hp('5.0%'),
       borderRadius: hp('15%'),
       marginTop: hp('4.5%'),
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
       marginTop: hp('4.5%'),
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