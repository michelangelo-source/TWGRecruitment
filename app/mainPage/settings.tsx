import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {router} from "expo-router";
import {Image} from "expo-image";

export default function settings() {
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
        <View style={styles.notificationTitleView}>   <Image
            style={styles.notificationIcon}
            source={require('@/assets/images/notification-icon.svg')}
            placeholder={"blur hash"}
            contentFit={'contain'}
        />
            <Text style={styles.notificationTitle}>Learning reminders</Text>
        </View>
        <View></View>
        <View></View>
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
    }
})