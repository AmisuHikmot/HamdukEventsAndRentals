import { createClient } from "@/lib/supabase"

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
  fileName?: string
}

export interface UploadOptions {
  bucket: string
  folder?: string
  maxSize?: number // in bytes
  allowedTypes?: string[]
}

const defaultOptions: UploadOptions = {
  bucket: "uploads",
  folder: "general",
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
}

export async function uploadFile(file: File, options: Partial<UploadOptions> = {}): Promise<UploadResult> {
  const opts = { ...defaultOptions, ...options }

  try {
    // Validate file size
    if (file.size > opts.maxSize!) {
      return {
        success: false,
        error: `File size exceeds ${opts.maxSize! / (1024 * 1024)}MB limit`,
      }
    }

    // Validate file type
    if (opts.allowedTypes && !opts.allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: `File type ${file.type} is not allowed`,
      }
    }

    const supabase = createClient()

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const fileName = `${timestamp}_${randomString}.${fileExtension}`
    const filePath = opts.folder ? `${opts.folder}/${fileName}` : fileName

    // Upload file
    const { data, error } = await supabase.storage.from(opts.bucket).upload(filePath, file, {
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
    const { data: urlData } = supabase.storage.from(opts.bucket).getPublicUrl(filePath)

    return {
      success: true,
      url: urlData.publicUrl,
      fileName: fileName,
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: "Failed to upload file",
    }
  }
}

export async function deleteFile(bucket: string, filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return {
      success: false,
      error: "Failed to delete file",
    }
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please select a valid image file (JPEG, PNG, or WebP)",
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Image size must be less than 5MB",
    }
  }

  return { valid: true }
}

export function validateDocumentFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please select a valid document file (PDF, DOC, or DOCX)",
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Document size must be less than 10MB",
    }
  }

  return { valid: true }
}

// Upload service class for easier usage
export class FileUploadService {
  async uploadFile(file: File, options: Partial<UploadOptions> = {}): Promise<UploadResult> {
    return uploadFile(file, options)
  }

  async deleteFile(bucket: string, filePath: string): Promise<{ success: boolean; error?: string }> {
    return deleteFile(bucket, filePath)
  }

  validateImageFile(file: File): { valid: boolean; error?: string } {
    return validateImageFile(file)
  }

  validateDocumentFile(file: File): { valid: boolean; error?: string } {
    return validateDocumentFile(file)
  }
}

// Export uploadService instance
export const uploadService = new FileUploadService()
