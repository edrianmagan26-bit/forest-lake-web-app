import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_hi8elef';
const PUBLIC_KEY = 'l-Xt-vuiulvg5_mZF';

// OTP for registration/email verification
const TEMPLATE_OTP = 'template_bwpjllo';
// OTP for password reset
const TEMPLATE_RESET = 'template_abwzbf8';

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getExpiryTime() {
  const expiry = new Date(Date.now() + 15 * 60 * 1000);
  return expiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export async function sendVerificationOTP(email, passcode) {
  const time = getExpiryTime();
  return emailjs.send(SERVICE_ID, TEMPLATE_OTP, {
    to_email: email,
    email: email,
    passcode,
    time,
  }, PUBLIC_KEY);
}

export async function sendResetOTP(email, passcode) {
  const time = getExpiryTime();
  return emailjs.send(SERVICE_ID, TEMPLATE_RESET, {
    to_email: email,
    email: email,
    passcode,
    time,
  }, PUBLIC_KEY);
}
