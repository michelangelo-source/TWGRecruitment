import React from 'react';
import {StyleSheet, ScrollView, View, TextInput, TouchableOpacity} from "react-native";
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
        {title: "React JS"},
        {title: "Typescript"},
        {title: "Javascript"},
    ]



    return (<View style={styles.container}>
        <View style={styles.header}>

            <View style={styles.searchBar}>
                <TouchableOpacity style={styles.submitIconView} onPress={() => {}}>
                <Image
                    style={styles.submitIcon}
                    source={require('@/assets/images/search-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                    contentPosition={"left"}
                />
                </TouchableOpacity>

                <TextInput placeholder={"React Native"}/>
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
        <ScrollView>
            {listElements.map((element, index) => (<MainList setSearchText={props.setSearchText} setMode={props.setMode} title={element.title} key={index}/>))}
        </ScrollView>
    </View>)
}
const styles = StyleSheet.create({
    container: {
     height: "100%",
    },
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
        flexDirection: "row",
        flex: 0.85,
        alignContent: "flex-start",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 16,
        width: "80%",
    },
    submitIconView:{
        height:"100%",
        width:32,
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