import { supabaseAdmin } from "./supabase"

export interface UploadOptions {
  bucket: string
  path?: string
  upsert?: boolean
  contentType?: string
}

export interface UploadResult {
  success: boolean
  data?: {
    path: string
    fullPath: string
    publicUrl: string
  }
  error?: string
}

export class FileUploadService {
  // Upload file to Supabase Storage
  async uploadFile(file: File, options: UploadOptions): Promise<UploadResult> {
    try {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = options.path ? `${options.path}/${fileName}` : fileName

      const { data, error } = await supabaseAdmin.storage.from(options.bucket).upload(filePath, file, {
        upsert: options.upsert || false,
        contentType: options.contentType || file.type,
      })

      if (error) {
        console.error("Upload error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage.from(options.bucket).getPublicUrl(data.path)

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
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(files: File[], options: UploadOptions): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, options))
    return Promise.all(uploadPromises)
  }

  // Delete file from storage
  async deleteFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseAdmin.storage.from(bucket).remove([path])

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Get file URL
  getFileUrl(bucket: string, path: string): string {
    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)

    return data.publicUrl
  }

  // Validate file
  validateFile(
    file: File,
    options: {
      maxSize?: number // in bytes
      allowedTypes?: string[]
    } = {},
  ): { valid: boolean; error?: string } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options // Default 10MB

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`,
      }
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`,
      }
    }

    return { valid: true }
  }
}

// Create and export upload service instance
export const uploadService = new FileUploadService()

// Export utilities
export default uploadService
