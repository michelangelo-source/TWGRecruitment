import {Dimensions, StyleSheet} from "react-native";

export const  settingStyles = StyleSheet.create({
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
    },notificationSetupText:{
        fontFamily: "Poppins",
        fontSize: 14,
        color: "#2B2D42"
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

