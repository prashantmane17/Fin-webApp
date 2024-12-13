"use client";

import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploadCardProps {
  onUpload: (file: File) => void;
}

export function UploadCard({ onUpload }: UploadCardProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  return (
    <Card
      {...getRootProps()}
      className={`border-2 border-dashed flex flex-col items-center justify-center p-6 
        text-gray-500 hover:text-gray-600 hover:border-gray-400 transition-colors cursor-pointer
        ${isDragActive ? 'border-blue-400 bg-blue-50' : ''}`}
    >
      <input {...getInputProps()} />
      <Upload className="h-8 w-8 mb-2" />
      <div className="text-center">
        <p className="font-medium">Upload File / Document</p>
        <p className="text-sm mt-1">
          {isDragActive ? 'Drop the file here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
      </div>
    </Card>
  );
}