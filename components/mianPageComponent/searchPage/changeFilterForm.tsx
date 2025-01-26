import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DisplayToUserFilters} from "@/components/mianPageComponent/searchPage/searchPage";
import {useEffect, useState} from "react";

interface ChangeFilterFormProps {
    usageFilter: DisplayToUserFilters,
    setUsageFilter: (usageFilter: DisplayToUserFilters) => void,
    setChangeFilter: (bool: boolean) => void,
}

type filterListType = { filterName: DisplayToUserFilters, active: boolean }
let filterList: filterListType[] = [
    {filterName: "Upload date: latest", active: false},
    {filterName: "Upload date: oldest", active: false},
    {filterName: "Most popular", active: false},
]
export default function ChangeFilterForm(props: ChangeFilterFormProps) {
    const [activeElement, setActiveElement] = useState<filterListType>();
    useEffect(() => {
        filterList.forEach((el: filterListType) => {
            el.active = false
        })
        let activeFilter = filterList.find(el => el.filterName === props.usageFilter)
        if (activeFilter) {
            activeFilter.active = true;
            setActiveElement(activeFilter);
        }
    }, []);
    const changeActive = (element: filterListType) => {
        filterList.forEach((el: filterListType) => {
            el.active = false
        })
        element.active = true;
        setActiveElement(element);
    }
    return (<View style={styles.container}>
        <View style={styles.formContainer}>
            <View style={styles.formView}>
                <Text style={styles.formTitle}>Sort records by:</Text>
                {filterList.map((el, index) =>
                    (
                        <TouchableOpacity key={index} onPress={() => changeActive(el)} style={styles.formElem}>
                            <View style={styles.radiosBtn}>
                                {el.active &&
                                    <View style={styles.activeRadios}></View>
                                }
                            </View>
                            <Text style={styles.formElemText}>{el.filterName}</Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity style={styles.submitBtn} onPress={() => {
                    activeElement ? props.setUsageFilter(activeElement.filterName) : null
                    props.setChangeFilter(false)
                }
                }>
                    <Text style={styles.submitText}>Confirm</Text></TouchableOpacity>
            </View>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    container: {

        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        width: 320,
        height: 400,
        backgroundColor: "#8D99AE",
        borderRadius: 24,

    },
    formView: {
        flex: 0.5,
        padding: 20
    },
    formTitle: {
        fontFamily: "Poppins",
        fontSize: 18,
        color: "white",
    }, formElem: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 15
    }, radiosBtn: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    activeRadios: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "#2B2D42",
    },

    formElemText: {
        paddingHorizontal: 10,
        fontFamily: "Poppins",
        color: "white",
        fontSize: 14,
    },
    submitView: {
        flex: 0.5,
        margin: 32,
        justifyContent: "flex-end",

    },
    submitBtn: {
        height: 40,
        backgroundColor: "#2B2D42",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        fontFamily: 'Poppins',
        color: 'white',
        fontSize: 14
    }
})