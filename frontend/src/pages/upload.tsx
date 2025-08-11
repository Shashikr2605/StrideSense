import React from 'react';
import VideoUploader from '../components/VideoUploader';
import { useRouter } from 'next/router';

const Upload: React.FC = () => {
  const router = useRouter();

  const handleUpload = (fileId: string) => {
    router.push(`/results?fileId=${fileId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 fade-in">
          <h1 className="header">Gait Video Upload</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Upload your patient's gait video for comprehensive AI-powered biomechanical analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Recording Instructions */}
          <div className="card slide-up">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="subheader-primary">Clinical Recording Guidelines</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Essential Requirements */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Essential Requirements
                </h3>
                <ul className="space-y-3 text-medical">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Sagittal View:</strong> Record from the side (90° angle)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Duration:</strong> 15-120 seconds of continuous walking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Full Body:</strong> Capture head to feet in frame</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Resolution:</strong> Minimum 720p for accurate analysis</span>
                  </li>
                </ul>
              </div>

              {/* Optimal Setup */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Optimal Setup
                </h3>
                <ul className="space-y-3 text-medical">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Distance:</strong> 6-10 feet from camera</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Lighting:</strong> Even, bright lighting without shadows</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Background:</strong> Plain, contrasting background</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Clothing:</strong> Form-fitting, contrasting attire</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="card">
            <h3 className="subheader-primary mb-4 flex items-center">
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Patient Information (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Age Range</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus-ring bg-white">
                  <option>Select age range</option>
                  <option>18-30 years</option>
                  <option>31-50 years</option>
                  <option>51-70 years</option>
                  <option>70+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Concern</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus-ring bg-white">
                  <option>Select concern</option>
                  <option>Post-injury rehabilitation</option>
                  <option>Balance issues</option>
                  <option>Joint pain</option>
                  <option>Gait asymmetry</option>
                  <option>General assessment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Walking Aid</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus-ring bg-white">
                  <option>None</option>
                  <option>Cane</option>
                  <option>Walker</option>
                  <option>Crutches</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload Component */}
          <div className="card card-primary">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="subheader-primary">Upload Gait Video</h3>
              <p className="text-medical">
                Drag and drop your video file or click to browse. Supported formats: MP4, AVI, MOV
              </p>
            </div>
            <VideoUploader onUpload={handleUpload} />
          </div>

          {/* Privacy Notice */}
          <div className="card bg-slate-50 border-slate-200">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-slate-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Privacy & Data Security</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  All uploaded videos are processed securely and deleted automatically after analysis. 
                  No personal health information is stored permanently. Data transmission is encrypted 
                  and complies with healthcare privacy standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;