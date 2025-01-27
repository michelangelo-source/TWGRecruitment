import {Platform, Text, TouchableOpacity, View} from 'react-native'
import {router} from "expo-router";
import {Image} from "expo-image";
import DatePicker from "react-native-date-picker";
import {useEffect, useRef, useState} from "react";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {SchedulableTriggerInputTypes} from "expo-notifications/src/Notifications.types";
import {settingStyles} from "@/app/mainPage/settingStyle";

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
        if(scheduledNotifications[0].trigger){
            // @ts-ignore
            if (scheduledNotifications[0].trigger.hour!==alarmHour){
                // @ts-ignore
                setAlarmHour(scheduledNotifications[0].trigger.hour)
            }
            // @ts-ignore
            if (scheduledNotifications[0].trigger.minute!==alarmMinutes){
                // @ts-ignore
                setAlarmMinutes(scheduledNotifications[0].trigger.minute)
            }
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

    return (<View style={settingStyles.container}>
        <View style={settingStyles.topView}>
            <TouchableOpacity onPress={() => {
                router.back()
            }}>
                <Image
                    style={settingStyles.leftIcon}
                    source={require('@/assets/images/leftarrow-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                />
            </TouchableOpacity>
            <Text style={settingStyles.titleText}>Settings</Text>
        </View>
        <View style={settingStyles.accountData}>
            <View style={settingStyles.personIconView}>
                <Image
                    style={settingStyles.personIcon}
                    source={require('@/assets/images/person-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                    tintColor={"white"}
                />
            </View>
            <Text style={settingStyles.accountName}>John Doe</Text>
        </View>
        <View style={settingStyles.notificationTitleView}>
            <Image
                style={settingStyles.notificationIcon}
                source={require('@/assets/images/notification-icon.svg')}
                placeholder={"blur hash"}
                contentFit={'contain'}
            />
            <Text style={settingStyles.notificationTitle}>Learning reminders</Text>
        </View>
        <View style={settingStyles.notificationSetupView}>
            <Text style={settingStyles.notificationSetupText}>Repeat everyday at:</Text>

            <TouchableOpacity onPress={() => {
                setChangeHourMode(true)
            }} style={{flexDirection: "row"}}>
                <Image
                    style={settingStyles.clockIcon}
                    source={require('@/assets/images/clock-icon.svg')}
                    placeholder={"clock"}
                    contentFit={'contain'}
                />
                <Text> {alarmHour}:{alarmMinutes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={isEnabled ? settingStyles.switchOnBack : settingStyles.switchOfBack}
                              onPress={async () => {
                                  await turnOnOfNotifications()
                              }}
            >
                <View style={isEnabled ? settingStyles.switchOnFront : settingStyles.switchOfFront}>

                </View>
            </TouchableOpacity>


        </View>
        <View>
            <Text style={settingStyles.bottomText}>You will receive friendly reminder to remember to study</Text>
        </View>


        {changeHourMode &&
            <View style={settingStyles.changeHourView}>
                <DatePicker mode={"time"} date={date} onDateChange={async (data) => {
                    setAlarmHour( data.getHours())
                    setAlarmMinutes(data.getMinutes())
                    await cancelAllScheduledNotifications()
                }}/>
                <TouchableOpacity onPress={() => {
                    setChangeHourMode(false)
                }}><Text style={settingStyles.confirmText}>Confirm</Text></TouchableOpacity>
            </View>}
    </View>)
}


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
