import {Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native'
import {router} from "expo-router";
import {Image} from "expo-image";
import DatePicker from "react-native-date-picker";
import {useState} from "react";
import {handleTime} from "@/components/functions/handleTime";

export default function settings() {
    const [date, setDate] = useState(new Date())
    const [isEnabled, setIsEnabled] = useState(true)
    const [changeHourMode, setChangeHourMode] = useState(false)
    return (<View style={styles.container}>
        <View style={styles.topView}>
            <TouchableOpacity onPress={() => {
                router.back()
            }}>
                <Image
                    style={styles.leftIcon}
                    source={require('@/assets/images/leftarrow-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                />
            </TouchableOpacity>
            <Text style={styles.titleText}>Settings</Text>
        </View>
        <View style={styles.accountData}>
            <View style={styles.personIconView}>
                <Image
                    style={styles.personIcon}
                    source={require('@/assets/images/person-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                    tintColor={"white"}
                />
            </View>
            <Text style={styles.accountName}>John Doe</Text>
        </View>
        <View style={styles.notificationTitleView}>
            <Image
            style={styles.notificationIcon}
            source={require('@/assets/images/notification-icon.svg')}
            placeholder={"blur hash"}
            contentFit={'contain'}
        />
            <Text style={styles.notificationTitle}>Learning reminders</Text>
        </View>
        <View style={styles.notificationSetupView}>
              <Text>Repeat everyday at:</Text>

          <TouchableOpacity onPress={()=>{
              setChangeHourMode(true)
          }} style={{flexDirection:"row"}}>
              <Image
                  style={styles.clockIcon}
                  source={require('@/assets/images/clock-icon.svg')}
                  placeholder={"clock"}
                  contentFit={'contain'}
              />
            <Text> {handleTime(date)}</Text>
          </TouchableOpacity>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>setIsEnabled(!isEnabled)}
                value={isEnabled}
            />
        </View>
        <View>
            <Text style={styles.bottomText}>You will receive friendly reminder to remember to study</Text>
        </View>



        {changeHourMode&&
            <View style={styles.changeHourView}>
                <DatePicker mode={"time"} date={date} onDateChange={(data)=>setDate(data)}/>
                <TouchableOpacity onPress={()=>{
                    setChangeHourMode(false)
                }}><Text style={styles.confirmText}>Confirm</Text></TouchableOpacity>
            </View>}
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        flexDirection: "row",
        alignItems: "center",
    },
    leftIcon: {
        width: 32,
        height: 32,
        margin: 10
    },
    titleText: {
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        margin: 10,
        color: "#2B2D42"
    },
    accountData: {
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderBottomWidth: 2,
        borderColor: "#2B2D42",
    },
    personIconView: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#2B2D42",
        width: 48,
        height: 48,
        borderRadius: 48,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    personIcon: {
        width: 24,
        height: 24
    }, accountName: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#2B2D42"
    },notificationTitleView:{
        alignItems:"center",
        justifyContent: "flex-start",
        flexDirection:"row",
        marginLeft:20,
        marginVertical:15
    },notificationIcon:{
        width: 36,
        height:36,
        marginRight:10
    },notificationTitle:{
        fontFamily: "Poppins",
        fontSize: 14,
        color: "#2B2D42"
    },notificationSetupView:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:30,
    },clockIcon:{
        width:24,
        height:24,
    },
    bottomText:{
        fontFamily:"Poppins-Bold",
        fontSize: 10,
        marginTop:10,
        paddingHorizontal:30
    },changeHourView:{
        position:"absolute",
        top:Dimensions.get("screen").height/2-250,
        left:Dimensions.get("screen").width/2-125,
        height:300,
        width:250,
        backgroundColor:"#8D99AE",
        alignItems:"center",
        justifyContent:"space-evenly",
        borderRadius:16
    },confirmText:{
        fontFamily:"Poppins",
        fontSize: 16,
        color:"white"
    }
})