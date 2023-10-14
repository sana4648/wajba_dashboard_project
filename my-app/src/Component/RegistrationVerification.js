import React, { useState } from 'react';
import './RgistrationVarification.css'
import { useNavigate } from "react-router-dom";

export default function EmailVerificationScreen() {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
    setVerificationError('');
  };

  const handleVerify = () => {
    // Simulate API call to verify the code (replace with actual logic)
    if (verificationCode === '123456') {
      setIsVerified(true);
    } else {
      setVerificationError('Invalid verification code. Please try again.');
    }
  };
  const navigate = useNavigate();

  return (
    <div className="verification-container">
      {isVerified ? (
        <div className="verification-success">
          <h2>Email Verified Successfully</h2>
          <p>Your email has been successfully verified.</p>
        </div>
      ) : (
        <div className="verification-form">
          <h2>Email Verification</h2>
          <p>Please enter the verification code sent to your email.</p>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
          {verificationError && <p className="error">{verificationError}</p>}
          <button onClick={() =>
                      navigate('/')}>Verify</button>
        </div>
      )}
    </div>
  );
}
