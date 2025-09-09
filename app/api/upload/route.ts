import { type NextRequest, NextResponse } from "next/server"
import { uploadService } from "@/lib/upload"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const bucket = formData.get("bucket") as string
    const folder = formData.get("folder") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!bucket) {
      return NextResponse.json({ error: "Bucket name required" }, { status: 400 })
    }

    const result = await uploadService.uploadFile(file, {
      bucket,
      folder,
      maxSize: 50 * 1024 * 1024, // 50MB
      allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      path: result.path,
    })
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
