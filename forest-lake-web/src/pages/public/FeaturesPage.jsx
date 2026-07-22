const features = [
  { icon: '📂', title: 'Digital Client Records', desc: 'All client information is stored digitally in a centralized database for easy access, searching, and updating. No more paper-based record keeping.' },
  { icon: '🗺️', title: 'Burial Lot Management', desc: 'Monitor the status of all burial lots in real-time. Lots are categorized as Available, Reserved, or Occupied with clear visual indicators.' },
  { icon: '📍', title: 'Geo-Tagged Cemetery Map', desc: 'An interactive Leaflet-based map displays burial lot locations using coordinates. Easily locate any burial lot within the cemetery.' },
  { icon: '📋', title: 'Reservation Management', desc: 'Clients can submit reservation requests for available burial lots. Administrators review and approve or decline requests.' },
  { icon: '🔒', title: 'Secure Authentication', desc: 'Role-based access control with email verification ensures only authorized users can access the system.' },
  { icon: '👥', title: 'User Management', desc: 'Administrators can manage client accounts, activate or deactivate users, and maintain system security.' },
];

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary-dark mb-4">System Features</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive set of tools designed to streamline cemetery management operations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
