export interface Document {
  id: string;
  title: string;
  imageSrc: string;
  uploadDate: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
}