import React, { useState } from "react";
// import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "639308849008cf07057fe4f31",
            "user": "6392c7ef857dcc946d660666",
            "title": "mytitle",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2022-12-09T10:05:56.584Z",
            "__v": 0
        },
        {
            "_id": "639308849008cf03707fe4f33",
            "user": "6392c7ef857dcc946d660666",
            "title": "mytitle",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2022-12-09T10:05:56.718Z",
            "__v": 0
        },
        {
            "_id": "639308849008cf04707fe4f33",
            "user": "6392c7ef857dcc946d660666",
            "title": "mytitle",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2022-12-09T10:05:56.718Z",
            "__v": 0
        },
        {
            "_id": "639308849008c4f0707fe4f33",
            "user": "6392c7ef857dcc946d660666",
            "title": "mytitle",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2022-12-09T10:05:56.718Z",
            "__v": 0
        },
        {
            "_id": "639308849008cf40707fe4f33",
            "user": "6392c7ef857dcc946d660666",
            "title": "mytitle",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2022-12-09T10:05:56.718Z",
            "__v": 0
        },
        {
            "_id": "639308849008c5f0707fe4f33",
            "user": "6392c7ef857dcc946d660666",
            "title": "mytitle",
            "description": "please wake up early",
            "tag": "personal",
            "date": "2022-12-09T10:05:56.718Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;