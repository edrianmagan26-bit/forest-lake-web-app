import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LeoGGEtAAAAAIJsVDCAR9V9SxzzLE9Hqc46Fetz';

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', email: '', subject: '', message: '' });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [sending, setSending] = useState(false);
  const recaptchaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) { alert('Please complete the reCAPTCHA verification.'); return; }
    setSending(true);
    setTimeout(() => {
      alert('Message sent successfully!');
      setForm({ firstName: '', lastName: '', mobile: '', email: '', subject: '', message: '' });
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
      setSending(false);
    }, 1000);
  };

  return (
    <div>
      {/* Hero with Map Background */}
      <section className="relative pt-24 pb-0">
        <div className="h-[40vh] w-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1863.4731628487024!2d122.9466465524275!3d10.660853178478213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed1ca792a42d9%3A0x12d07dcbcee0e923!2sNEGROS%20FIRST%20Cyber%20Centre%20IT%20and%20BPO%20Hub!5e0!3m2!1sen!2sph!4v1784790247105!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '40vh' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Forest Lake Sales Office Location"
          ></iframe>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">We Would Be Happy To Hear From You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We value your input. Feel free to reach out, we're here to listen and assist with any inquiries you may have.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info - Left */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-8 sm:p-10 text-white h-full">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Contact Number</p>
                      <p className="text-white/70 text-sm">(034) 458-9408 / 700-0381</p>
                      <p className="text-white/70 text-sm">0909 579 3984 / 0948 655 8636</p>
                      <p className="text-white/70 text-sm">0947 722 4557 / 0999 805 9953</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email Address</p>
                      <p className="text-white/70 text-sm">info@forestlakeparks.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Sales Office</p>
                      <p className="text-white/70 text-sm">Units A04-A06, GF Annex Bldg., Negros First Cyber Center, Hernaez St., Bacolod City</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-10 pt-8 border-t border-white/20">
                  <p className="font-semibold mb-4">Social Media</p>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition text-sm">
                      <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                      </div>
                      @ForestLakeMemorialParks
                    </a>
                    <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition text-sm">
                      <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
                      </div>
                      @forestlakememorialparks
                    </a>
                    <a href="#" className="flex items-center gap-3 text-white/70 hover:text-white transition text-sm">
                      <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/></svg>
                      </div>
                      @forestlakeparks
                    </a>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="relative mt-10">
                  <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
                  <div className="absolute -bottom-10 -right-5 w-24 h-24 bg-white/5 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                <p className="text-gray-500 text-sm mb-8">Fill out the form and our team will get back to you shortly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                      <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required placeholder="First Name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                      <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required placeholder="Last Name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                      <input type="tel" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} required placeholder="Mobile Number" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="Email Address" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required placeholder="How can we help?" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows="5" placeholder="Write your message here..." className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition text-sm resize-none"></textarea>
                  </div>
                  {/* ReCaptcha */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(value) => setCaptchaValue(value)}
                      onExpired={() => setCaptchaValue(null)}
                    />
                  </div>
                  <button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-primary to-primary-accent hover:from-primary-accent hover:to-primary text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50">
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
