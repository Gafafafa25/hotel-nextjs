import {ChangeEvent, FormEvent, useRef, useState} from "react";
import {serializeValidationErrorsToFlight} from "next/dist/server/app-render/dev-validation-error-delivery";
import {Room} from "@/app/types/room";

const AMENITIES_OPTIONS = [
    "Wi-Fi",
    "TV",
    "Kitchen",
    "Washing machine",
    "Mini‑bar",
    "Safe",
    "Conditioner"
]

const emptyForm = {
    room_number: "",
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    image: [] as string[],
    amenities: [] as string[]
}

export default function RoomForm() {
    const [form, setForm] = useState(emptyForm)
    const [amenity, setAmenity] = useState("")
    const [files, setFiles] = useState<File[] | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [message, setMessage] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }

        // console.log('Files selected:', e.target.files.length)

        Array.from(e.target.files).forEach(file => {
            console.log('-', file.name, '(', file.size, 'byte)')
        })
    }

    const toggleAmenity = (amenity: string) => {
        setForm((prevForm) => {
            const current = prevForm.amenities
            if (current.includes(amenity)) {
                return {...prevForm, amenities: current.filter(a => a !== amenity)}
            }
            return {...prevForm, amenities: [...current, amenity]}
        })
    }

    const addAmenity = () => {
        const value = amenity.trim()
        if (!value) return

        setForm({...form, amenities: [...form.amenities, value]})
        setAmenity("")
    }

    const handleAmenityKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') addAmenity()
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!files || files.length === 0) return

        const uploadsData = new FormData()


        Array.from(files).forEach(file => {
            uploadsData.append('files', file)
        })

        const uploadResponse = await fetch("/api/rooms/upload", {
            method: "POST",
            body: uploadsData
        })

        const uploadResult = await uploadResponse.json()

        if (!uploadResult.ok) {
            setMessage(uploadResult.error)
        }

        const filesNames = uploadResult.filesNames

        const room: Room = {
            room_number: form.room_number,
            name: form.name,
            description: form.description,
            price: form.price,
            maxGuests: form.maxGuests,
            image: filesNames as string[],
            amenities: form.amenities
        }

        const response = await fetch("/api/rooms/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(room)
        })

        const data = await response.json()

        if (!data.ok) {
            setMessage("Addition error")
        } else {
            setMessage("Addition success")
            setForm(emptyForm)
        }
    }

    return (
        <main className="mx-auto py-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200  w-full max-w-sm">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Room</h1>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Number
                        <input type="text"
                               placeholder="001"
                               value={form.room_number}
                               onChange={(e) => {
                                   setForm({...form, room_number: e.target.value})
                               }}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               required
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Name
                        <input type="text"
                               value={form.name}
                               onChange={(e) => {
                                   setForm({...form, name: e.target.value})
                               }}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               required
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Description
                        <input type="text"
                               value={form.description}
                               onChange={(e) => {
                                   setForm({...form, description: e.target.value})
                               }}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               required
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Price
                        <input type="text"
                               value={form.price}
                               onChange={(e) => {
                                   setForm({...form, price: Number(e.target.value)})
                               }}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               required
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests
                        <select id="guests"
                                value={form.maxGuests}
                                onChange={(e) => setForm({...form, maxGuests: Number(e.target.value)})}
                                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                        >
                            <option value={1}>1 guest</option>
                            <option value={2}>2 guests</option>
                            <option value={3}>3 guests</option>
                            <option value={4}>4 guests</option>
                            <option value={5}>5+ guests</option>
                        </select>
                    </label>


                    <label className="block text-sm font-medium text-gray-700 mb-1">Image
                        <input type="file"
                               multiple
                               accept=".jpeg,.jpg,.png"
                               ref={fileInputRef}
                               onChange={handleChange}
                               value={form.image}
                               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </label>

                    {files && (
                        <div className="block text-sm font-medium text-gray-700 mb-1">Files
                            selected: {files.length}</div>
                    )}

                    <div className="space-y-3">
                        <h3 className="block text-sm font-medium text-gray-700 mb-1">Amenities</h3>
                        {AMENITIES_OPTIONS.map((amenity) =>
                            <label key={amenity} className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <input type="checkbox"
                                       checked={form.amenities.includes(amenity)}
                                       onChange={() => toggleAmenity(amenity)}
                                />{amenity}
                            </label>
                        )}

                        <p className="block text-sm font-medium text-gray-700 mb-1">Others:</p>
                        <p className="block text-sm font-medium text-gray-700 mb-1">
                            {(form.amenities).filter((a) => !(AMENITIES_OPTIONS.includes(a))).join(", ")}
                        </p>
                        <div className="flex gap-1 justify-end ">
                            <input type="text"
                                   value={amenity}
                                   onChange={(e) => setAmenity(e.target.value)}
                                   onKeyDown={handleAmenityKeyDown}
                                   placeholder="Balcony"
                                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button type="button"
                                    onClick={addAmenity}
                                    className="mx-auto p-3 border border-gray-300 rounded-lg hover:bg-gray-200
                            transition-colors duration-200"
                            >Add
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700
                            transition-colors duration-200"
                    >Add room
                    </button>
                </form>
            </div>
        </main>
    )
}