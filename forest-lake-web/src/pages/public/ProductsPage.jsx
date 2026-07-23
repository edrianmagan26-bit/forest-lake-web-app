import { useState } from 'react';

const products = [
  {
    name: 'Lawn Lot',
    image: '/src/assets/products/lawn.jpg',
    description: 'Set in a healing garden to soothe the soul, lawn lots are simple yet one with nature.',
    features: [
      'Underground interment.',
      'Double interment option.',
      'Transferable and assignable.',
      'Flat on ground marble markers.',
      'Transfer of remains (4 sets of bones maximum).',
    ],
  },
  {
    name: 'Mini-Mausoleum',
    image: '/src/assets/products/mausoleum.jpg',
    description: 'Get in touch with nature while you connect with your loved ones. Mausoleums are ideal for those seeking peace under the sun.',
    features: [
      'Underground interment.',
      'Double interment option.',
      'Transferable and assignable.',
      'Flat on ground marble markers.',
      'Transfer of remains (4 sets of bones maximum).',
    ],
  },
  {
    name: 'Estate Lot',
    image: '/src/assets/products/estate.jpg',
    description: 'Have more privacy and space to relive those precious memories with your loved ones. The estate lot is a comfortable choice for you and your family.',
    features: [
      '12-lotters.',
      'Above-ground interment inside open-type mausoleum.',
      'Indivisible.',
      'Transferable/Assignable as a whole.',
    ],
  },
  {
    name: 'Legacy Lot',
    image: '/src/assets/products/legacy.jpg',
    description: 'This is the absolute testament of your unfading love for the dearly departed. Legacy lots are the most spacious and most comfortable place you\'ll ever be during your visit.',
    features: [
      'Underground interment.',
      'Double interment option.',
      'Transferable and assignable.',
      'Flat on ground marble markers.',
      'Transfer of remains (4 sets of bones maximum).',
    ],
  },
];

export default function ProductsPage() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-end overflow-hidden">
        <img src="/src/assets/products/bcd.jpg" alt="Our Products" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="relative w-full px-8 sm:px-16 pb-20">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white drop-shadow-2xl">Our Products</h1>
        </div>
        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 C1300,80 1380,70 1440,60 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Products List */}
      {products.map((product, index) => (
        <section key={index} className={`min-h-screen flex items-center px-4 py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-5xl mx-auto w-full">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
              {/* Content side */}
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{product.name}</h2>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
                  {product.description}
                </p>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image side */}
              <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="rounded-3xl overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-300" onClick={() => setLightbox(product.image)}>
                  <img src={product.image} alt={product.name} className="w-full h-[400px] sm:h-[500px] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-mid to-primary"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Ready to Reserve?</h2>
          <p className="text-green-100/80 text-lg mb-10 max-w-lg mx-auto">Contact us to learn more about our lot types and find the perfect resting place for your loved ones.</p>
          <a href="/map-preview" className="inline-block bg-white text-primary-dark px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Explore Available Lots
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10" onClick={() => setLightbox(null)}>&times;</button>
          <img src={lightbox} alt="Product" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
