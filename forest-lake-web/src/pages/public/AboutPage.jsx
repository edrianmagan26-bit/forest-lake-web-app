import aboutImg from '../../assets/about/forest-lake-about.jpg';
import about1 from '../../assets/about/about1.jpg';
import about2 from '../../assets/about/about2.jpg';
import about3 from '../../assets/about/about3.jpg';
import about4 from '../../assets/about/about4.png';
import about5 from '../../assets/about/about5.png';
import about6 from '../../assets/about/about6.png';
import about7 from '../../assets/about/about7.png';
import forestLakeLogo from '../../assets/global/forest-lake-logo.png';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img src={aboutImg} alt="Forest Lake Memorial Park" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm font-medium">Forest Lake Memorial Park</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">About Us</h1>
          <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">A peaceful resting place nestled in the heart of Sum-ag, Bacolod City — honoring lives with dignity, care, and respect.</p>
          <div className="mt-12 animate-bounce">
            <svg className="w-8 h-8 text-white/60 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="min-h-screen flex items-center px-4 py-24 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">Who We Are</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Our Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-60 h-60 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group-hover:border-primary/40 group-hover:scale-105 transition-all duration-500">
                <img src={about1} alt="Our Vision" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-bold text-primary-dark mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xs mx-auto">To build a better place where generations of family memories are treasured and immortalized by the living.</p>
            </div>

            <div className="text-center group">
              <div className="w-60 h-60 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group-hover:border-primary/40 group-hover:scale-105 transition-all duration-500">
                <img src={about2} alt="Our Mission" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-bold text-primary-dark mb-4">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xs mx-auto">To offer accessible, affordable, efficiently designed & sustainable parks and services managed by a professional team dedicated to provide value, innovation and personalized service.</p>
            </div>

            <div className="text-center group">
              <div className="w-60 h-60 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group-hover:border-primary/40 group-hover:scale-105 transition-all duration-500">
                <img src={about3} alt="Our Values" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-bold text-primary-dark mb-4">Our Values</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xs mx-auto">Personalized Service, Value Creation, Teamwork, Innovation & Creativity and Professionalism.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Story */}
      <section className="min-h-screen flex items-center px-4 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <img src={forestLakeLogo} alt="Forest Lake Logo" className="h-56 sm:h-72 w-auto mx-auto mb-6 drop-shadow-lg" />
            <p className="text-sm text-gray-400 uppercase tracking-widest">Memorial Parks · Chapels · Services</p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto text-justify">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              The logo is derived from the infinity symbol; here at Forest Lake we interpret this symbol as a representation of <span className="font-bold text-primary-dark">LOVE</span>, <span className="font-bold text-primary-dark">LEGACY</span>, and <span className="font-bold text-primary-dark">GRATITUDE</span>. The two loops further reinforce the idea of one generation cradling and caring for the next – the imagery mirroring that of a parent and child. It is a visual embodiment of the unbreakable bond between families, representing how love transcends time and continues to flourish through the generations that follow. The gold color is intended to resonate these very values that we treasure while the green portion signifies serenity, peace, and the nurturing embrace of nature that Forest Lake provides to every family who entrusts their loved ones to our care.
            </p>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              The transition to this logo also signifies a profound change in the Forest Lake business. From the topographic representation of the park in the previous logo, the current brand stands for more than just a memorial park. The icon represents a more holistic business that includes chapels, memorial services, pre-need plans, and comprehensive family care solutions. As the business grows to provide a more complete representation of a family's legacy and the celebration of a person's life beyond death, so is the importance of representing this evolution in the Brand's design. It reflects our commitment to being not just a resting place, but a living tribute — a space where memories are preserved, stories are honored, and the bonds of family continue to be celebrated for generations to come.
            </p>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Every element of the logo has been thoughtfully crafted to communicate our purpose. The flowing lines represent continuity and the eternal nature of love. The intertwined loops symbolize connection — between past and present, between those who have departed and those who remain. Together, these elements tell a story of hope, remembrance, and the enduring power of family. At Forest Lake, we believe that every life deserves to be remembered beautifully, and our brand identity reflects that belief in every curve and color.
            </p>
          </div>
        </div>
      </section>

      {/* Trailblazing Through The Years */}
      <section className="min-h-screen flex items-center overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="bg-gradient-to-br from-green-50 via-green-100/30 to-white p-12 sm:p-20 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-10 italic leading-tight">Trailblazing Through The Years</h2>
            <blockquote className="text-xl sm:text-2xl text-gray-700 italic leading-relaxed mb-8 border-l-4 border-primary pl-6">
              "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible."
            </blockquote>
            <p className="text-lg text-gray-500 font-medium">– St. Francis of Assisi</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-gray-100">
            <img src={about4} alt="Forest Lake Park" className="w-full h-full object-cover rounded-sm" />
            <img src={about5} alt="Forest Lake Sculpture" className="w-full h-full object-cover rounded-sm" />
            <img src={about6} alt="Forest Lake Art" className="w-full h-full object-cover rounded-sm" />
            <img src={about7} alt="Forest Lake Monument" className="w-full h-full object-cover rounded-sm" />
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="min-h-screen flex items-center px-4 py-24 bg-white">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-14 leading-tight">
            Immortalizing And Celebrating Family Memories For Over <span className="relative inline-block text-primary-dark"><span className="relative z-10">69 Years</span><span className="absolute bottom-1 left-0 right-0 h-3 bg-primary-light/40 rounded-full -z-0"></span></span>
          </h2>
          <div className="space-y-8 text-lg sm:text-xl text-gray-600 leading-relaxed">
            <p>
              For 25 years Forest Lake has been serving its communities and is now the Philippines' largest memorial care brand with close to 40 parks nationwide across Luzon, Visayas and Mindanao.
            </p>
            <p>
              The company opened its first memorial park in the Philippines in 1997 with Forest Lake Zamboanga and within the same year they launched Forest Lake Iloilo. In the following years, the company continued to expand briskly, opening one park after another, serving community after community. Their signature personalized service and nature-themed, family-friendly and efficiently-designed parks boasting wide open spaces with vast manicured lawns conducive to leisure and relaxation quickly established Forest Lake as the preferred park where family memories are celebrated by the living.
            </p>
            <p>
              In 2018, Forest Lake launched its Grief Therapy Program, "A Better Day ~ Your Journey to Healing." The workshop series facilitated by Grief Coach Cathy Babao offered support to bereaved clients by guiding them on a path towards healing and wholeness so that they may live healthy, productive and happy lives after their loss. Given the challenging times brought about by the 2020 COVID-19 pandemic, the company began its online advocacy, "Creating Better Days" webinar series advocating mental health and well-being. Recognizing that the pandemic has changed the way we grieve and come to terms with loss, the free webinar series aims to empower its audience with the knowledge and tools needed to thrive in our brand new world by teaching us how to adapt and create a better now.
            </p>
            <p>
              Behind Forest Lake Memorial Parks is a formidable management team with extensive experience in property development, memorial services, sales and marketing. The company currently has more than 30 memorial parks in the Philippines and one chapel in Biñan, Laguna. Its portfolio spans Luzon, Visayas and Mindanao in the following locations: Albay, Bataan, Bulacan, Davao del Sur, Iloilo, Laguna, La Union, Misamis Oriental, Negros Occidental, Nueva Ecija, Pampanga, Pangasinan, South Cotabato, Tarlac and Zamboanga. The company aims to be A Better Place where the memories of our loved ones are celebrated and immortalized while consistently expanding the business to serve more Filipinos.
            </p>
          </div>
        </div>
      </section>

      {/* Map Sites */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <img src="/src/assets/about/MAP-SITES.jpg" alt="Forest Lake Memorial Parks Locations" className="w-full h-full object-contain max-h-screen" />
      </section>
    </div>
  );
}
