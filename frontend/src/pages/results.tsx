import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultsDisplay from '../components/ResultsDisplay';
import { useRouter } from 'next/router';

const Results: React.FC = () => {
  const router = useRouter();
  const { fileId } = router.query;
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fileId) {
      axios.post('http://localhost:5000/api/analyze', { file_id: fileId })
        .then(response => setResults(response.data))
        .catch(err => setError('Failed to fetch results'));
    }
  }, [fileId]);

  if (error) return <div className="container mt-8 text-red-500">{error}</div>;
  if (!results) return <div className="container mt-8">Loading...</div>;

  return <ResultsDisplay results={results} />;
};

export default Results;