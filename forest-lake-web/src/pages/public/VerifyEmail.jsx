import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../utils/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    api.get(`/auth/verify-email.php?token=${token}`)
      .then(res => { setStatus('success'); setMessage(res.data.message || 'Email verified successfully!'); })
      .catch(err => { setStatus('error'); setMessage(err.response?.data?.message || 'Verification failed. The link may have expired.'); });
  }, [searchParams]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your email...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-primary-dark mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link to="/" className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition">Go to Login</Link>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link to="/" className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition">Back to Home</Link>
          </>
        )}
      </div>
    </div>
  );
}
