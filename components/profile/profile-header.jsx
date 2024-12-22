"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Edit2, Mail, Phone, MapPin, Briefcase, Calendar, Camera, Upload, X, Check } from "lucide-react";

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  );
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    company: "TechCorp Inc.",
    joinDate: "May 2018",
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setNewAvatarFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewAvatarFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSaveAvatar = () => {
    if (newAvatarFile && previewUrl) {
      setAvatarSrc(previewUrl);
      setIsUploadOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-48 sm:h-56"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white object-cover" src={avatarSrc} alt="Profile" />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-2 py-1 w-full"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
              )}

            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsUploadOpen(true)}
              >
                <Camera className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                Change Photo
              </button>
              <button
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Check className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit2 className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { icon: Mail, name: "email", value: profile.email },
            { icon: Phone, name: "phone", value: profile.phone },
            { icon: MapPin, name: "location", value: profile.location },
            { icon: Briefcase, name: "company", value: profile.company },
            { icon: Calendar, name: "joinDate", value: `Joined ${profile.joinDate}` },
          ].map((item) => (
            <div key={item.name} className="flex items-center text-sm text-gray-500">
              <item.icon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {isEditing && item.name !== "joinDate" ? (
                <input
                  type="text"
                  name={item.name}
                  value={item.value}
                  onChange={handleInputChange}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-2 py-1 w-full"
                />
              ) : (
                item.value
              )}
            </div>
          ))}
        </dl>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload New Profile Picture</h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Choose a new image for your profile picture or drag and drop an image file.
            </p>
            <div className="flex justify-around items-center">
              <div {...getRootProps()} className="border-2 border-dashed w-1/2 border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
                <input {...getInputProps()} onChange={handleFileChange} />
                {isDragActive ? (
                  <p className="text-gray-600">Drop the image here ...</p>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">Drag & drop an image here, or click to select one</p>
                  </div>
                )}
              </div>
              {previewUrl && (
                <div className="">
                  <img src={previewUrl} alt="Preview" className="border-4 border-gray-100 h-28 w-28 sm:h-32 sm:w-32 rounded-full ring-4 ring-white object-cover" />
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setIsUploadOpen(false);
                  setPreviewUrl(null);
                  setNewAvatarFile(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSaveAvatar}
                disabled={!newAvatarFile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
