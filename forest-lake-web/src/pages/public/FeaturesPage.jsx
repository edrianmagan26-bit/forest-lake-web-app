import { useState, useEffect, useCallback } from 'react';

import fl1 from '../../assets/features/fl1.jpg';
import fl2 from '../../assets/features/fl2.jpg';
import fl3 from '../../assets/features/fl3.jpg';
import fl4 from '../../assets/features/fl4.jpg';
import fl5 from '../../assets/features/fl5.jpg';
import fl6 from '../../assets/features/fl6.jpg';
import fl7 from '../../assets/features/fl7.jpg';
import fl8 from '../../assets/features/fl8.jpg';
import fl9 from '../../assets/features/fl9.jpg';
import fl10 from '../../assets/features/fl10.jpg';

const slides = [fl1, fl2, fl3, fl4, fl5];
const activitySlides = [fl6, fl7, fl8, fl9, fl10];

const amenities = [
  'Multi-purpose halls, gazebos and trellis',
  'Beautifully designed signage',
  'Mediterranean inspired gates and guardhouse',
  'Lush and expansive ground and landscape',
  'Jogging trails',
  'Meditation gardens',
  'High concrete perimeter & security fences',
  'Street and park lighting',
  'Water sprinkler system',
  'Double interment option',
  'Assurance of maintenance care fund',
  'Strategically located and well-maintained restrooms',
  'Drainage facilities',
  'Modern interment equipment',
  'Well-organized interment set-up',
  'Computerized database system',
];

const activities = [
  { icon: '🪁', name: 'Kite Flying' },
  { icon: '🙏', name: 'Prayer and Meditation' },
  { icon: '🏃', name: 'Jogging' },
  { icon: '🚴', name: 'Biking' },
  { icon: '💪', name: 'Fitness Activities' },
  { icon: '🏅', name: 'Fun Run' },
  { icon: '💃', name: 'Zumba' },
];

export default function FeaturesPage() {
  const [current, setCurrent] = useState(0);
  const [currentActivity, setCurrentActivity] = useState(0);

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), []);
  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);

  const nextActivity = useCallback(() => setCurrentActivity(i => (i + 1) % activitySlides.length), []);
  const prevActivity = () => setCurrentActivity(i => (i - 1 + activitySlides.length) % activitySlides.length);

  useEffect(() => {
    const timer1 = setInterval(next, 3000);
    const timer2 = setInterval(nextActivity, 3000);
    return () => { clearInterval(timer1); clearInterval(timer2); };
  }, [next, nextActivity]);

  return (
    <div>
      {/* Hero Section - Full image */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src="/src/assets/features/amenities.jpg" alt="Features and Amenities" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">Features and Amenities</h1>
        </div>
      </section>

      {/* Always Striving Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 italic mb-6 leading-tight">Always Striving To Give You More Every Time You Visit</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            Forest Lake understands the significance of each visit to your loved ones. So we want to maximize the experience by making sure every minute you spend at the park is worth your while.
          </p>
        </div>
      </section>

      {/* Features & Amenities with Carousel */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[400px] sm:h-[500px]">
                {slides.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Forest Lake ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              {/* Arrows */}
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition" aria-label="Previous">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition" aria-label="Next">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-110' : 'bg-white/50'}`} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Features & Amenities</h3>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl text-amber-400">★</span>
                ))}
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
                Memorial parks serve the transcendental purpose of providing a final resting place where family members can mourn and honor the dead for many years. We ensure that our parks have everything families would need, more so during times they need to gather in good faith and remembrance.
              </p>
              <ul className="space-y-3">
                {amenities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Activities */}
      <section className="px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Fun Activities</h3>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl text-amber-400">★</span>
                ))}
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
                Memorial parks also evolve. While the solemn ambiance is preserved, these places are for celebrating life as well. A vital part of the grieving process includes spending time at the park and paying tribute to how the person lived his or her life. These fun activities help families create new memories while honoring the old.
              </p>
              <ul className="space-y-3">
                {activities.map((activity, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{activity.name}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-400 mt-8 italic">
                Disclaimer: The activities allowed inside the park are determined by each LGU's community quarantine protocols.
              </p>
            </div>

            {/* Image Carousel */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[400px] sm:h-[500px]">
                {activitySlides.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Fun Activity ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentActivity ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <button onClick={prevActivity} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition" aria-label="Previous">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextActivity} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition" aria-label="Next">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {activitySlides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentActivity(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentActivity ? 'bg-white scale-110' : 'bg-white/50'}`} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
