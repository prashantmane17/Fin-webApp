"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DocumentCard } from "./DocumentCard";
import { UploadCard } from "./UploadCard";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

export function Documents() {
    const { documents, handleUpload } = useDocumentUpload();

    const onUpload = async (file) => {
        try {

            handleUpload(file);
        } catch (error) {
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