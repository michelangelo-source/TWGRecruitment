import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {router} from "expo-router";
import {Image} from "expo-image";
import DatePicker from "react-native-date-picker";
import {useEffect, useRef, useState} from "react";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {SchedulableTriggerInputTypes} from "expo-notifications/src/Notifications.types";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function settings() {
    const [alarmHour,setAlarmHour] = useState<number>(new Date(Date.now()).getHours());
    const [alarmMinutes,setAlarmMinutes] = useState<number>(new Date(Date.now()).getMinutes());
    const [date]=useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false)
    const [changeHourMode, setChangeHourMode] = useState(false)


    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        checkScheduledNotifications().then();

        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    const turnOnOfNotifications=async ()=>{
        if(!isEnabled){
            await scheduleNotification()
        }else{
            await cancelAllScheduledNotifications()
        }
    }

     const checkScheduledNotifications=async()=> {
        const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
        if(scheduledNotifications.length > 0) {
            setIsEnabled(true)
        }
    }

     const scheduleNotification =async()=> {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Learn something new",
                body: 'Start learning you will thank yourself tomorrow',
            },
           trigger:{
               type: SchedulableTriggerInputTypes.DAILY,
               hour: alarmHour,
               minute: alarmMinutes,
           },
        });
       await checkScheduledNotifications()
    }

     const cancelAllScheduledNotifications =async()=> {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setIsEnabled(false)
    }

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

            <TouchableOpacity onPress={() => {
                setChangeHourMode(true)
            }} style={{flexDirection: "row"}}>
                <Image
                    style={styles.clockIcon}
                    source={require('@/assets/images/clock-icon.svg')}
                    placeholder={"clock"}
                    contentFit={'contain'}
                />
                <Text> {alarmHour}:{alarmMinutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={isEnabled ? styles.switchOnBack : styles.switchOfBack}
                              onPress={async () => {
                                  await turnOnOfNotifications()
                              }}
            >
                <View style={isEnabled ? styles.switchOnFront : styles.switchOfFront}>

                </View>
            </TouchableOpacity>


        </View>
        <View>
            <Text style={styles.bottomText}>You will receive friendly reminder to remember to study</Text>
        </View>


        {changeHourMode &&
            <View style={styles.changeHourView}>
                <DatePicker mode={"time"} date={date} onDateChange={async (data) => {
                    setAlarmHour( data.getHours())
                    setAlarmMinutes(data.getMinutes())
                    await cancelAllScheduledNotifications()
                }}/>
                <TouchableOpacity onPress={() => {
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
    }, notificationTitleView: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginLeft: 20,
        marginVertical: 15
    }, notificationIcon: {
        width: 36,
        height: 36,
        marginRight: 10
    }, notificationTitle: {
        fontFamily: "Poppins",
        fontSize: 14,
        color: "#2B2D42"
    }, notificationSetupView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    }, clockIcon: {
        width: 24,
        height: 24,
    },

    switchOfBack: {
        width: 66,
        height: 36,
        borderRadius: 16,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#2B2D42",
        paddingHorizontal: 5,
        justifyContent: "center"
    },
    switchOnBack: {
        width: 66,
        height: 36,
        borderRadius: 16,
        backgroundColor: "#2B2D42",
        borderWidth: 1,
        borderColor: "#2B2D42",
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    switchOfFront: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#2B2D42",
    },
    switchOnFront: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "white",

    },


    bottomText: {
        fontFamily: "Poppins-Bold",
        fontSize: 10,
        marginTop: 10,
        paddingHorizontal: 30
    }, changeHourView: {
        position: "absolute",
        top: Dimensions.get("screen").height / 2 - 250,
        left: Dimensions.get("screen").width / 2 - 125,
        height: 300,
        width: 250,
        backgroundColor: "#8D99AE",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 16
    }, confirmText: {
        fontFamily: "Poppins",
        fontSize: 16,
        color: "white"
    }
})



async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('myNotificationChannel', {
            name: 'A channel is needed for the permissions prompt to appear',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
        } catch (e) {
            token = `${e}`;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
