import { supabaseAdmin } from "./supabase"

interface UploadOptions {
  bucket: string
  path: string
  file: File
  upsert?: boolean
}

interface UploadResult {
  success: boolean
  data?: {
    path: string
    fullPath: string
    publicUrl: string
  }
  error?: string
}

class FileUploadService {
  // Upload file to Supabase Storage
  async uploadFile({ bucket, path, file, upsert = false }: UploadOptions): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file)
      if (!validation.valid) {
        return { success: false, error: validation.error }
      }

      // Upload to Supabase Storage
      const { data, error } = await supabaseAdmin.storage.from(bucket).upload(path, file, {
        upsert,
        contentType: file.type,
      })

      if (error) {
        console.error("Upload error:", error)
        return { success: false, error: error.message }
      }

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path)

      return {
        success: true,
        data: {
          path: data.path,
          fullPath: data.fullPath,
          publicUrl: publicUrlData.publicUrl,
        },
      }
    } catch (error) {
      console.error("Upload service error:", error)
      return { success: false, error: "Upload failed" }
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(uploads: UploadOptions[]): Promise<UploadResult[]> {
    const results = await Promise.all(uploads.map((upload) => this.uploadFile(upload)))
    return results
  }

  // Delete file
  async deleteFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseAdmin.storage.from(bucket).remove([path])

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error("Delete error:", error)
      return { success: false, error: "Delete failed" }
    }
  }

  // Get file URL
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)

    return data.publicUrl
  }

  // Validate file
  validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return { valid: false, error: "File size must be less than 10MB" }
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "File type not supported" }
    }

    return { valid: true }
  }

  // Generate unique filename
  generateFileName(originalName: string): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    const extension = originalName.split(".").pop()
    return `${timestamp}_${random}.${extension}`
  }

  // Get file info
  async getFileInfo(bucket: string, path: string) {
    try {
      const { data, error } = await supabaseAdmin.storage.from(bucket).list(path)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Get file info error:", error)
      return { success: false, error: "Failed to get file info" }
    }
  }
}

// Export singleton instance
export const uploadService = new FileUploadService()

// Export class for custom instances
export { FileUploadService }

// Export utilities
export const uploadUtils = {
  generateFileName: (name: string) => uploadService.generateFileName(name),
  validateFile: (file: File) => uploadService.validateFile(file),
  getPublicUrl: (bucket: string, path: string) => uploadService.getPublicUrl(bucket, path),
}

export default uploadService
