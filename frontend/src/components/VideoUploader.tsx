import React, { useState } from 'react';
import axios from 'axios';

const VideoUploader: React.FC<{ onUpload: (fileId: string) => void }> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!['video/mp4', 'video/avi'].includes(selectedFile.type)) {
        setError('Please upload an MP4 or AVI file');
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percent);
        },
      });
      setUploading(false);
      onUpload(response.data.file_id);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="subheader">Upload Video</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="video/mp4,video/avi"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload" className="cursor-pointer text-blue-600 hover:underline">
          Drag and drop your video here or click to browse
        </label>
      </div>
      {file && (
        <div className="mt-4">
          <p className="text-gray-600">Selected: {file.name}</p>
          <video controls width="100%" className="mt-2 rounded-lg shadow">
            <source src={URL.createObjectURL(file)} type={file.type} />
          </video>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {uploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-gray-600 mt-2">Uploading: {progress}%</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="button mt-6 w-full disabled:bg-gray-400"
      >
        {uploading ? `Uploading... ${progress}%` : 'Analyze Video'}
      </button>
    </div>
  );
};

export default VideoUploader;