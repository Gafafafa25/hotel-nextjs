import {NextResponse} from "next/server";
import {join} from "path";
import {existsSync} from "node:fs";
import {mkdir, writeFile} from "node:fs/promises";


export async function POST(request: Request) {
    let formData: FormData

    try {
        formData = await request.formData()
    } catch {
        return NextResponse.json({status: 400, statusText: "Invalid Request1"})
    }

    const files = formData.getAll('files') as File[]

    const fileNameBase = `${Date.now()}`
    const filesNames = []
    let fileNumber = 1

    for (const file of files) {
        // if (!file.type.startsWith('image/')) {
        const extension = file.type
        if (extension !== "image/jpg" && extension !== "image/png" && extension !== "image/jpeg") {
            return NextResponse.json({status: 400, statusText: "Internal Server Error2"})
        }
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                {error: `File ${(file as File).name} is too large and will not be attached. `}, {status: 400}
            )
        }

        const fileName = `r${fileNameBase}_${fileNumber}.jpg`
        fileNumber++
        filesNames.push(fileName)

        const uploadsDir = join(process.cwd(), "public", "uploadsDir")

        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, {recursive: true})
        }

        const filePath = join(uploadsDir, fileName)

        await writeFile(filePath, Buffer.from(await file.arrayBuffer()))
    }
    return NextResponse.json({files: files, ok: true, filesNames: filesNames})
}