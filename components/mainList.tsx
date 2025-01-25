import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {mode} from "@/app/mainPage";

interface mainListProps {
    title: string;
    setSearchText:(title: string)=>void
    setMode:(search: mode)=>void
}

export default function MainList(props: mainListProps) {
    return (<View style={styles.container}>
        <View style={styles.titleBar}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <View style={styles.showMoreView}>
                <TouchableOpacity onPress={()=>{
                    props.setSearchText(props.title)
                    props.setMode("search")
                }}>
                <Text style={styles.showMoreText} >Show more</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>)
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    titleBar: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    titleView: {
        display: "flex",
        flex: 0.5,
        alignItems: "flex-start",
    },
    titleText: {
        fontFamily: "Poppins",
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 24,
    },
    showMoreView: {
        display: "flex",
        flex: 0.5,
        alignItems: "flex-end",
    },
    showMoreText: {
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 24,
        textDecorationLine: "underline",
    }
})