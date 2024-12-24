"use client";

import { Card } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";

export function DocumentCard({ title, imageSrc, uploadDate }) {
    const formattedDate = format(new Date(uploadDate), 'dd MMM yyyy');

    return (
        <Card className="overflow-hidden">
            <div className="aspect-video relative">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">Uploaded on {formattedDate}</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                </div>
            </div>
        </Card>
    );
}
