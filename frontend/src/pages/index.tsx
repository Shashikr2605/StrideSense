import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="container">
        {/* Hero Section */}
        <header className="text-center mb-16 fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="header">GaitXpert</h1>
            <p className="text-xl text-slate-600 mb-2 font-medium">AI-Powered Gait Analysis Platform</p>
            <p className="text-lg text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your physiotherapy practice with advanced AI-driven gait analysis, 
              providing precise movement assessment and personalized rehabilitation plans.
            </p>
            {/* <Link href="/upload" className="button">
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Start Gait Analysis
              </span>
            </Link> */}
          </div>
        </header>

        {/* Features Grid */}
        <section className="mb-16 slide-up">
          <div className="text-center mb-12">
            <h2 className="subheader-primary">Advanced Clinical Features</h2>
            <p className="text-medical max-w-2xl mx-auto">
              Comprehensive gait analysis tools designed for healthcare professionals 
              and rehabilitation specialists.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card card-primary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="subheader">Precise Analysis</h3>
              </div>
              <p className="text-medical">
                AI-powered biomechanical analysis detecting subtle gait abnormalities 
                with clinical-grade accuracy and detailed joint angle measurements.
              </p>
            </div>

            <div className="card card-success">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="subheader">Personalized Plans</h3>
              </div>
              <p className="text-medical">
                Evidence-based exercise recommendations tailored to individual gait patterns, 
                with progressive rehabilitation protocols and outcome tracking.
              </p>
            </div>

            <div className="card card-info">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="subheader">Clinical Dashboard</h3>
              </div>
              <p className="text-medical">
                Intuitive interface with comprehensive visualizations, progress tracking, 
                and exportable reports for clinical documentation and patient communication.
              </p>
            </div>
          </div>
        </section>

        {/* Clinical Benefits */}
        <section className="mb-16">
          <div className="card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="subheader-primary mb-6">Clinical Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-medical">
                      <strong>Objective Assessment:</strong> Quantitative gait metrics reducing subjective evaluation bias
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-medical">
                      <strong>Early Detection:</strong> Identify movement abnormalities before they become symptomatic
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-medical">
                      <strong>Treatment Monitoring:</strong> Track rehabilitation progress with measurable outcomes
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-medical">
                      <strong>Patient Education:</strong> Visual reports enhance patient understanding and compliance
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold text-blue-800 mb-2">95%</div>
                <p className="text-slate-600 mb-4">Analysis Accuracy</p>
                <div className="text-3xl font-bold text-emerald-600 mb-2"> &lt; 2 min</div>
                <p className="text-slate-600">Processing Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card card-primary">
            <h3 className="subheader-primary mb-4">Ready to Transform Your Practice?</h3>
            <p className="text-medical mb-8 max-w-2xl mx-auto">
              Join leading rehabilitation centers using GaitXpert for enhanced patient outcomes 
              and streamlined gait assessment workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload" className="button">
                Start Analysis Now
              </Link>
              <button className="button-outline">
                Request Demo
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-slate-800/5 backdrop-blur-sm border-t border-slate-200/50">
        <div className="container text-center">
          <p className="text-slate-500 text-sm">
            <strong>Medical Disclaimer:</strong> GaitXpert is a clinical decision support tool and not intended 
            for primary diagnosis. Always consult qualified healthcare professionals for medical advice and treatment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;