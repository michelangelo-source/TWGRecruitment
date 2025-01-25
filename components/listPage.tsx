import React from 'react';
import {StyleSheet, View} from "react-native";
import MainList from "@/components/mainList";
import {Image} from "expo-image";
import {mode} from "@/app/mainPage";

interface ListPageProps {
    setSearchText:(text:string)=>void
    setMode:(mode: mode)=>void
}
export default function ListPage(props:ListPageProps) {
    const listElements = [
        {title: "React Native"},
        {title: "React"},
        {title: "Typescript"},
        {title: "Javascript"},
    ]

    return (<View style={styles.container}>
        <View style={styles.header}>

            <View style={styles.searchBar}>
                <Image
                    style={styles.submitIcon}
                    source={require('@/assets/images/search-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                    contentPosition={"left"}
                />

            </View>
            <View style={styles.settings}>

                <Image
                    style={styles.settingIcon}
                    source={require('@/assets/images/settings-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                    contentPosition={"right"}
                />

            </View>
        </View>
        <View>
            {listElements.map((element, index) => (<MainList setSearchText={props.setSearchText} setMode={props.setMode} title={element.title} key={index}/>))}
        </View>
        {/*<View>footer</View>*/}
    </View>)
}
const styles = StyleSheet.create({
    container: {},
    header: {
        display: "flex",
        flexDirection: "row",
        height: 44,
        width: "100%",
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    searchBar: {
        display: "flex",
        flex: 0.85,
        alignContent: "flex-start",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 16,
        width: "80%",
        padding: 5
    },
    submitIcon: {
        height: "100%",
    },
    settings:{
        display: "flex",
        flex:0.15,
        justifyContent: "center",

    },
    settingIcon: {

        height: 32,
    }
})