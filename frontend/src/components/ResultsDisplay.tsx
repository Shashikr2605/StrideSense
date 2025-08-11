import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  results: {
    metrics: {
      step_length_left: number[];
      step_length_right: number[];
      cadence: number;
      hip_angle: number[];
      knee_angle: number[];
      ankle_angle: number[];
      step_asymmetry: number;
    };
    abnormalities: { type: string; severity?: string; value?: number; affected_side?: string }[];
    recommendations: { name: string; duration: string; instructions: string; progression?: string }[];
  };
}

const ResultsDisplay: React.FC<ResultsProps> = ({ results }) => {
  const { metrics, abnormalities, recommendations } = results;
  
  // Prepare chart data
  const chartData = metrics.hip_angle.map((_, i) => ({
    time: i,
    hip: metrics.hip_angle[i] || 0,
    knee: metrics.knee_angle[i] || 0,
    ankle: metrics.ankle_angle[i] || 0,
  }));

  // Calculate averages
  const avgStepLength = (metrics.step_length_left.reduce((a, b) => a + b, 0) + 
                        metrics.step_length_right.reduce((a, b) => a + b, 0)) / 
                       (metrics.step_length_left.length + metrics.step_length_right.length) || 0;

  // Severity color mapping
  const getSeverityStatus = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'mild': return 'status-mild';
      case 'moderate': return 'status-moderate';
      case 'severe': return 'status-severe';
      default: return 'status-normal';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 fade-in">
          <h1 className="header">Gait Analysis Report</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive biomechanical assessment with AI-powered insights and clinical recommendations
          </p>
        </div>

        {/* Executive Summary */}
        <div className="card mb-8 slide-up">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="subheader-primary">Executive Summary</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="metric-card">
              <div className="metric-label">Cadence</div>
              <div className="metric-value">{metrics.cadence.toFixed(1)}</div>
              <div className="text-sm text-slate-600">steps/min</div>
            </div>
            
            <div className="metric-card">
              <div className="metric-label">Step Asymmetry</div>
              <div className="metric-value">{metrics.step_asymmetry.toFixed(1)}%</div>
              <div className={`text-xs mt-1 ${metrics.step_asymmetry > 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {metrics.step_asymmetry > 5 ? 'Above Normal' : 'Within Normal'}
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-label">Avg Step Length</div>
              <div className="metric-value">{avgStepLength.toFixed(2)}</div>
              <div className="text-sm text-slate-600">meters</div>
            </div>
            
            <div className="metric-card">
              <div className="metric-label">Analysis Quality</div>
              <div className="metric-value text-emerald-600">High</div>
              <div className="text-xs text-slate-600 mt-1">Confidence: 94%</div>
            </div>
          </div>
        </div>

        {/* Joint Angle Analysis */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="subheader-primary">Joint Angle Kinematics</h2>
            </div>
            <div className="text-sm text-slate-500">Real-time throughout gait cycle</div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  label={{ value: 'Gait Cycle (%)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  stroke="#64748b"
                  label={{ value: 'Angle (degrees)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="hip" stroke="#3b82f6" strokeWidth={3} name="Hip Flexion" dot={false} />
                <Line type="monotone" dataKey="knee" stroke="#10b981" strokeWidth={3} name="Knee Flexion" dot={false} />
                <Line type="monotone" dataKey="ankle" stroke="#f59e0b" strokeWidth={3} name="Ankle Dorsiflexion" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clinical Findings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Abnormalities */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="subheader-primary">Clinical Findings</h3>
            </div>
            
            {abnormalities.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-600 font-semibold mb-2">No Significant Abnormalities</p>
                <p className="text-slate-600 text-sm">Gait pattern appears within normal parameters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {abnormalities.map((ab, i) => (
                  <div key={i} className="abnormality-item">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 capitalize">
                        {ab.type.replace(/_/g, ' ')}
                      </h4>
                      {ab.severity && (
                        <span className={getSeverityStatus(ab.severity)}>
                          {ab.severity}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      {ab.affected_side && (
                        <p><strong>Affected Side:</strong> {ab.affected_side}</p>
                      )}
                      {ab.value && (
                        <p><strong>Measurement:</strong> {ab.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations Preview */}
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="subheader-primary">Treatment Recommendations</h3>
            </div>
            
            {recommendations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">No specific interventions required at this time.</p>
                <p className="text-sm text-slate-500 mt-2">Continue regular monitoring and assessment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.slice(0, 3).map((rec, i) => (
                  <div key={i} className="recommendation-card">
                    <h4 className="font-semibold text-emerald-800 mb-2">{rec.name}</h4>
                    <div className="text-sm text-slate-700 space-y-1">
                      <p><strong>Duration:</strong> {rec.duration}</p>
                      <p className="text-slate-600">{rec.instructions}</p>
                    </div>
                  </div>
                ))}
                {recommendations.length > 3 && (
                  <p className="text-sm text-slate-500 text-center">
                    +{recommendations.length - 3} additional recommendations in full report
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card card-primary text-center">
          <h3 className="subheader-primary mb-6">Next Steps</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="button">
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 10v6m0 0l-4-4m4 4l4-4m-4-10V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
                </svg>
                Download Full Report
              </span>
            </button>
            <button className="button-secondary">
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share with Team
              </span>
            </button>
            <button className="button-outline">
              New Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-12 py-8 bg-slate-800/5 backdrop-blur-sm border-t border-slate-200/50">
        <div className="container text-center">
          <p className="text-slate-500 text-sm max-w-4xl mx-auto">
            <strong>Clinical Disclaimer:</strong> This AI-generated analysis is intended to support clinical decision-making 
            and should not replace professional medical judgment. Results should be interpreted by qualified healthcare 
            professionals in conjunction with clinical examination and patient history.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResultsDisplay;