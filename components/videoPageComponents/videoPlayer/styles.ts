import {StyleSheet} from "react-native";

export const videoPlayerStyles = StyleSheet.create({
    menuVideo: {
        position: "absolute",
        top: 0,
        height: 280,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.3)",
        zIndex: 1,
    },
    backgroundVideo: {
        backgroundColor: "black",
        width: "100%",
        height: 280
    },
    topPartMenu:{
        flex: 0.1,
        flexDirection:"row",
        justifyContent:"space-between",
    },leftView:{
        width: 32,
        height: 32,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 16,
        marginTop:10,
        marginLeft:10,
        justifyContent: "center",
        alignItems:"center"
    },
    topIcons:{
        width:20,
        height:20,
        paddingRight:8,
    },
    topLeftView:{
        flexDirection:"row",
        marginRight:10
    },

    centerPartMenu:{
        flex: 0.8,
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'space-evenly',
    },backwardsIconView:{
        width: 32,
        height: 32,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 16,
        justifyContent: "center",
        alignItems:"center"
    },
    centerIcons:{
        width:24,
        height:24,
        paddingRight:8,
    },playPauseView:{
        width: 40,
        height: 40,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 20,
        justifyContent: "center",
        alignItems:"center"
    },


    bottomPartMenu:{
        flex: 0.1,
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"flex-end",
        padding:8
    },timerText:{
        fontFamily: "Poppins",
        fontSize: 10,
        color: "white",
    },fullScreenIcon:{
        height:24,
        width:24,
    }
})
