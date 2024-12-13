"use client";

import { useState } from "react";
import { Document, UploadedFile } from "@/lib/types/document";

export function useDocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "AADHAR",
      imageSrc: "/placeholder-1.jpg",
      uploadDate: new Date().toISOString(),
    },
    {
      id: "2",
      title: "PAN",
      imageSrc: "/placeholder-2.jpg",
      uploadDate: new Date().toISOString(),
    },
    {
      id: "3",
      title: "PASSBOOK",
      imageSrc: "/placeholder-3.jpg",
      uploadDate: new Date().toISOString(),
    },
    {
      id: "4",
      title: "DL",
      imageSrc: "/placeholder-4.jpg",
      uploadDate: new Date().toISOString(),
    },
  ]);

  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const newDocument: Document = {
        id: Date.now().toString(),
        title: file.name.split(".")[0].toUpperCase(),
        imageSrc: reader.result as string,
        uploadDate: new Date().toISOString(),
      };

      setDocuments((prev) => [...prev, newDocument]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return {
    documents,
    handleUpload,
  };
}
