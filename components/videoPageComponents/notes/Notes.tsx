import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RefObject, useEffect, useState} from "react";
import {VideoRef} from "react-native-video";

interface NotesProps {
    notesId: string
    videoRef: RefObject<VideoRef>;
}

type singleNote = {
    timer: string,
    note: string,
}
type Notes =
    {
        notes: singleNote[]
    }
export default function Notes(props: NotesProps) {
    const [oldNotes, setOldNotes] = useState<Notes>()
    const [text, setText] = useState<string>("")
    useEffect(() => {
        getMyNotes().then((res) => {
            if (res) {
                setOldNotes(res)
            }
        })
    }, [])

    const getMyNotes = async (): Promise<Notes | undefined> => {
        try {
            const notes = await AsyncStorage.getItem(props.notesId)
            return notes != null ? JSON.parse(notes) : null
        } catch (e) {
        }
    }

    const saveNote = async (newNote: singleNote) => {
        if (oldNotes) {
            let allNotes = {notes: [newNote, ...oldNotes.notes]}
            try {
                const jsonValue = JSON.stringify(allNotes)
                await AsyncStorage.setItem(props.notesId, jsonValue)
            } catch (e) {
            }
            setOldNotes(allNotes)
        } else {
            try {
                const jsonValue = JSON.stringify({notes: [newNote]})
                await AsyncStorage.setItem(props.notesId, jsonValue)
            } catch (e) {
            }
            setOldNotes({notes: [newNote]})
        }
    }
    const formatTime = (time: number) => {
        let result = ""
        if (Math.floor(time / 60) < 10) {
            result += "0"
        }
        result += Math.floor(time / 60) + ":"
        if (Math.floor(time % 60) < 10) {
            result += "0"
        }
        result += Math.floor(time % 60)
        return result
    }

    return (<>
        <ScrollView style={styles.notesScrollView}>
            {oldNotes && oldNotes.notes.map((note, index) => (<View style={styles.singleNoteView} key={index}>
                <Text style={styles.noteText}>{note.note}</Text>
                <View style={{justifyContent: "flex-end" ,width:"100%", alignItems:"flex-end"}}>
                    <Text style={styles.timeText}>{note.timer}</Text>
                </View>
            </View>))}
        </ScrollView>

        <TextInput style={styles.noteTextArea}
                   placeholder={"Enter notes..."}
                   multiline={true} onChange={({nativeEvent: {text}}) => {
            setText(text)
        }}/>
        <TouchableOpacity onPress={() => {


            if (props.videoRef.current)
                props.videoRef.current.getCurrentPosition().then(async (res) => {
                    await saveNote({timer: formatTime(res), note: text})
                })


        }} style={styles.addNoteBtn}><Text style={styles.addNoteText}>Add note</Text></TouchableOpacity>
    </>)
}
const styles = StyleSheet.create({
    notesScrollView: {
        width: "100%",
        marginBottom:10

    }, singleNoteView: {
        marginHorizontal: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#C8C8C8",
        borderRadius: 12,
        padding: 5
    }, noteText: {
        fontFamily: "Poppins",
        fontSize: 12,
        color:"#2B2D42"
    },timeText:{
        marginLeft:10,
        fontFamily: "Poppins-Bold",
        fontSize:10,
        color:"#2B2D42"
    }
    , noteTextArea: {
        borderWidth: 1,
        borderColor: "#C8C8C8",
        height: 60,
        marginHorizontal: 10,
        borderRadius: 12

    }, addNoteBtn: {
        marginHorizontal: 50,
        backgroundColor: "#2B2D42",
        height: 40,
        borderRadius: 8,
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center"
    }, addNoteText: {
        fontFamily: "Poppins-Bold",
        color: "white",
    }
})