export default  async function successPage({searchParams}: {
    searchParams: Promise<{
        book_id: string, check_in: string, check_out: string, name: string, room: string
    }>
}) {

    const sp = await searchParams
    const {book_id, check_in, check_out, name, room} = sp

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Thank you, <span
                className="text-blue-600">{name}</span>! The room is booked.</h1>
            <p className="text-2xl font-bold tracking-wide mb-8 text-gray-900">
                Booking number: <span className="text-blue-600">{book_id}</span>
            </p>
            <p className="text-2xl font-bold tracking-wide mb-8 text-gray-900">
                Room: <span className="text-blue-600">{room}</span>
            </p>
            <p className="text-2xl font-bold tracking-wide mb-8 text-gray-900">
                Dates: <span className="text-blue-600">Check In: {check_in}, Check Out: {check_out}</span>
            </p>
            <a href="/rooms"
               className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Back to Rooms →
            </a>
        </main>
    )
}