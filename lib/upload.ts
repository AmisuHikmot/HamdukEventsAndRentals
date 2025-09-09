import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export interface UploadOptions {
  bucket: string
  folder?: string
  maxSize?: number
  allowedTypes?: string[]
}

export interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

export class FileUploadService {
  async uploadFile(file: File, options: UploadOptions): Promise<UploadResult> {
    try {
      // Validate file size
      if (options.maxSize && file.size > options.maxSize) {
        return {
          success: false,
          error: `File size exceeds ${options.maxSize / 1024 / 1024}MB limit`,
        }
      }

      // Validate file type
      if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
        return {
          success: false,
          error: `File type ${file.type} is not allowed`,
        }
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = file.name.split(".").pop()
      const fileName = `${timestamp}_${randomString}.${fileExtension}`

      // Create file path
      const folder = options.folder || "uploads"
      const filePath = `${folder}/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from(options.bucket).upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Upload error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from(options.bucket).getPublicUrl(filePath)

      // Store file record in database
      const { error: dbError } = await supabase.from("file_uploads").insert({
        bucket_name: options.bucket,
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        public_url: urlData.publicUrl,
      })

      if (dbError) {
        console.error("Database error:", dbError)
      }

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath,
      }
    } catch (error) {
      console.error("Upload service error:", error)
      return {
        success: false,
        error: "Upload failed",
      }
    }
  }

  async deleteFile(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path])

      if (error) {
        console.error("Delete error:", error)
        return false
      }

      // Remove from database
      await supabase.from("file_uploads").delete().eq("bucket_name", bucket).eq("file_path", path)

      return true
    } catch (error) {
      console.error("Delete service error:", error)
      return false
    }
  }

  async getFileUrl(bucket: string, path: string): Promise<string | null> {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)

      return data.publicUrl
    } catch (error) {
      console.error("Get URL error:", error)
      return null
    }
  }
}

export const uploadService = new FileUploadService()
