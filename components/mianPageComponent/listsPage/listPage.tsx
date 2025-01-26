import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from "react-native";
import MainList from "@/components/mianPageComponent/listsPage/mainList";
import {Image} from "expo-image";
import {mode} from "@/app/mainPage";
import {Link} from "expo-router";

interface ListPageProps {
    setSearchText: (text: string) => void
    setMode: (mode: mode) => void
}

export default function ListPage(props: ListPageProps) {
    const handleSearch = (text: string) => {
        props.setSearchText(text);
        props.setMode("search");
    }

    const listElements = [
        {title: "React Native"},
        //{title: "React JS"},
        // {title: "Typescript"},
        // {title: "Javascript"},
    ]


    return (<View style={styles.container}>
        <View style={styles.header}>

            <View style={styles.searchBar}>
                <View style={styles.submitIconView}>
                    <Image
                        style={styles.submitIcon}
                        source={require('@/assets/images/search-icon.svg')}
                        placeholder={"blur hash"}
                        contentFit={'contain'}
                        contentPosition={"left"}
                    />
                </View>

                <TextInput placeholder={"React Native"}
                           onSubmitEditing={({nativeEvent: {text}}) => handleSearch(text)}/>
            </View>
            <View style={styles.settings}>
                <Link  style={styles.settingIcon} href={"/mainPage/settings"}>

                <Image
                    style={styles.settingIcon}
                    source={require('@/assets/images/settings-icon.svg')}
                    placeholder={"blur hash"}
                    contentFit={'contain'}
                    contentPosition={"right"}
                />
                </Link>

            </View>
        </View>
        <ScrollView>
            {listElements.map((element, index) => (
                <MainList setSearchText={props.setSearchText} setMode={props.setMode} title={element.title}
                          key={index}/>))}
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
    submitIconView: {
        height: "100%",
        width: 32,
    },
    submitIcon: {

        height: "100%",
    },
    settings: {
        display: "flex",
        flex: 0.15,
        justifyContent: "center",

    },
    settingIcon: {
        height: 32,
        width:32,
        marginLeft: 10,
    }
})