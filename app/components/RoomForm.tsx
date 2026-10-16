import {FormEvent, useState} from "react";

const emptyForm = {
    name: ",",
    description: "",
    price: 0,
    maxGuests: 0,
    image: ""
    //todo: check
}

export default function RoomForm() {
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //todo:

        // const response = await fetch('/admin/api/rooms', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(form)
        // })
        //
        // const data = await response.json()
        //
        // if(!data.ok) {
        //     setMessage("Addition error")
        // } else {
        //     setMessage("Addition success")
        //     setForm(emptyForm)
        // }
    }

    return (
        <div>
            <h1>Add room</h1>
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )
}