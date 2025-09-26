import { supabase, supabaseAdmin } from "./supabase"

interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

interface FileValidation {
  maxSize: number // in bytes
  allowedTypes: string[]
}

class FileUploadService {
  private defaultValidation: FileValidation = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/plain"],
  }

  // Validate file
  private validateFile(file: File, validation?: Partial<FileValidation>): { valid: boolean; error?: string } {
    const config = { ...this.defaultValidation, ...validation }

    if (file.size > config.maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${this.formatFileSize(config.maxSize)}`,
      }
    }

    if (!config.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${config.allowedTypes.join(", ")}`,
      }
    }

    return { valid: true }
  }

  // Format file size
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Generate unique filename
  private generateFileName(originalName: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = originalName.split(".").pop()
    return `${timestamp}_${random}.${extension}`
  }

  // Upload single file
  async uploadFile(
    file: File,
    bucket: string,
    folder?: string,
    validation?: Partial<FileValidation>,
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validationResult = this.validateFile(file, validation)
      if (!validationResult.valid) {
        return {
          success: false,
          error: validationResult.error,
        }
      }

      // Generate file path
      const fileName = this.generateFileName(file.name)
      const filePath = folder ? `${folder}/${fileName}` : fileName

      // Upload file
      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
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
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath,
      }
    } catch (error) {
      console.error("Upload service error:", error)
      return {
        success: false,
        error: "Upload failed due to an unexpected error",
      }
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(
    files: File[],
    bucket: string,
    folder?: string,
    validation?: Partial<FileValidation>,
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => this.uploadFile(file, bucket, folder, validation))

    return await Promise.all(uploadPromises)
  }

  // Delete file
  async deleteFile(bucket: string, filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseAdmin.storage.from(bucket).remove([filePath])

      if (error) {
        console.error("Delete error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      return { success: true }
    } catch (error) {
      console.error("Delete service error:", error)
      return {
        success: false,
        error: "Delete failed due to an unexpected error",
      }
    }
  }

  // List files in bucket
  async listFiles(bucket: string, folder?: string): Promise<{ success: boolean; files?: any[]; error?: string }> {
    try {
      const { data, error } = await supabaseAdmin.storage.from(bucket).list(folder, {
        limit: 100,
        offset: 0,
      })

      if (error) {
        console.error("List files error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
        files: data,
      }
    } catch (error) {
      console.error("List files service error:", error)
      return {
        success: false,
        error: "Failed to list files",
      }
    }
  }

  // Get file info
  async getFileInfo(bucket: string, filePath: string): Promise<{ success: boolean; info?: any; error?: string }> {
    try {
      const { data, error } = await supabaseAdmin.storage.from(bucket).list("", {
        search: filePath,
      })

      if (error) {
        console.error("Get file info error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      const fileInfo = data?.find((file) => file.name === filePath.split("/").pop())

      return {
        success: true,
        info: fileInfo,
      }
    } catch (error) {
      console.error("Get file info service error:", error)
      return {
        success: false,
        error: "Failed to get file info",
      }
    }
  }

  // Create signed URL for private files
  async createSignedUrl(
    bucket: string,
    filePath: string,
    expiresIn = 3600,
  ): Promise<{ success: boolean; signedUrl?: string; error?: string }> {
    try {
      const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUrl(filePath, expiresIn)

      if (error) {
        console.error("Create signed URL error:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
        signedUrl: data.signedUrl,
      }
    } catch (error) {
      console.error("Create signed URL service error:", error)
      return {
        success: false,
        error: "Failed to create signed URL",
      }
    }
  }

  // Get public URL
  getPublicUrl(bucket: string, filePath: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return data.publicUrl
  }

  // Bucket-specific upload methods
  async uploadEventImage(file: File): Promise<UploadResult> {
    return this.uploadFile(file, "event-images", "events", {
      maxSize: 10 * 1024 * 1024, // 10MB for event images
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    })
  }

  async uploadRentalImage(file: File): Promise<UploadResult> {
    return this.uploadFile(file, "rental-images", "rentals", {
      maxSize: 5 * 1024 * 1024, // 5MB for rental images
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    })
  }

  async uploadBlogImage(file: File): Promise<UploadResult> {
    return this.uploadFile(file, "blog-images", "blog", {
      maxSize: 5 * 1024 * 1024, // 5MB for blog images
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    })
  }

  async uploadDocument(file: File): Promise<UploadResult> {
    return this.uploadFile(file, "documents", "uploads", {
      maxSize: 20 * 1024 * 1024, // 20MB for documents
      allowedTypes: [
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    })
  }
}

// Create and export instance
export const uploadService = new FileUploadService()

// Export class for custom instances
export { FileUploadService }

// Export types
export type { UploadResult, FileValidation }

// Default export
export default uploadService
