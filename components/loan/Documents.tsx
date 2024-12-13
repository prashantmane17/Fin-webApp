"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DocumentCard } from "./DocumentCard";
import { UploadCard } from "./UploadCard";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
// import { useToast } from "@/components/ui/use-toast";

export function Documents() {
  const { documents, handleUpload } = useDocumentUpload();
  // const { toast } = useToast();

  const onUpload = (file: File) => {
    try {
      handleUpload(file);
      // toast({
      //   title: "Document uploaded",
      //   description: `${file.name} has been successfully uploaded.`,
      //   variant: "default",
      // });
    } catch (error) {
      // toast({
      //   title: "Upload failed",
      //   description: "There was an error uploading your document. Please try again.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))}
          <UploadCard onUpload={onUpload} />
        </div>
      </CardContent>
    </Card>
  );
}