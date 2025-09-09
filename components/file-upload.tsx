"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Upload, ImageIcon } from "lucide-react"
import { uploadService } from "@/lib/upload"

interface FileUploadProps {
  bucket: string
  folder?: string
  maxFiles?: number
  maxSize?: number
  allowedTypes?: string[]
  onUploadComplete?: (urls: string[]) => void
  onUploadError?: (error: string) => void
  className?: string
}

interface UploadedFile {
  file: File
  url?: string
  error?: string
  uploading?: boolean
  progress?: number
}

export function FileUpload({
  bucket,
  folder = "uploads",
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  onUploadComplete,
  onUploadError,
  className = "",
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles).slice(0, maxFiles - files.length)
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({ file }))

    setFiles((prev) => [...prev, ...uploadedFiles])

    // Start uploading each file
    uploadedFiles.forEach((uploadedFile, index) => {
      uploadFile(uploadedFile, files.length + index)
    })
  }

  const uploadFile = async (uploadedFile: UploadedFile, index: number) => {
    // Update file status to uploading
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, uploading: true, progress: 0 } : f)))

    try {
      const result = await uploadService.uploadFile(uploadedFile.file, {
        bucket,
        folder,
        maxSize,
        allowedTypes,
      })

      if (result.success && result.url) {
        setFiles((prev) =>
          prev.map((f, i) => (i === index ? { ...f, url: result.url, uploading: false, progress: 100 } : f)),
        )

        // Call success callback
        const completedUrls = files.map((f) => f.url).filter(Boolean) as string[]
        onUploadComplete?.(completedUrls)
      } else {
        throw new Error(result.error || "Upload failed")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed"

      setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, error: errorMessage, uploading: false } : f)))

      onUploadError?.(errorMessage)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    }
    return <ImageIcon className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? "border-rose-500 bg-rose-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Upload Files</h3>
        <p className="text-gray-600 mb-4">Drag and drop files here, or click to select files</p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={files.length >= maxFiles}
        >
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(",")}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <p className="text-xs text-gray-500 mt-2">
          Max {maxFiles} files, {Math.round(maxSize / 1024 / 1024)}MB each
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files</h4>
          {files.map((uploadedFile, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
              {getFileIcon(uploadedFile.file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                <p className="text-xs text-gray-500">{Math.round(uploadedFile.file.size / 1024)} KB</p>

                {uploadedFile.uploading && <Progress value={uploadedFile.progress || 0} className="mt-1" />}

                {uploadedFile.error && (
                  <Alert className="mt-2 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800 text-xs">{uploadedFile.error}</AlertDescription>
                  </Alert>
                )}

                {uploadedFile.url && <p className="text-xs text-green-600 mt-1">✓ Uploaded successfully</p>}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
