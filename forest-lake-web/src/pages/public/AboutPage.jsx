export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-dark mb-6">About Forest Lake Sum-ag</h1>
        <div className="prose prose-lg text-gray-600 space-y-4">
          <p>
            Cemeteries serve as resting places for loved ones and play an important role in preserving family history.
            Proper management of burial lots and client information is essential to maintain organized and efficient cemetery operations.
          </p>
          <p>
            The Forest Lake Sum-ag Cemetery Client Management System with Geo-Tagging is a web-based platform designed to digitize
            client records, manage burial lot information, monitor reservation status, and provide a map-based Geo-Tagging feature
            for locating and managing burial lots at Forest Lake Memorial Park, Sum-ag, Bacolod City.
          </p>
          <p>
            This system addresses common problems associated with manual cemetery record management, including difficult record searching,
            manual data entry errors, data redundancy, delayed record updates, difficulty locating burial lots, and lack of centralized client information.
          </p>
          <h2 className="text-xl font-bold text-primary-dark mt-8">System Objectives</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Store and manage client information in a centralized digital database</li>
            <li>Monitor and display the real-time status of burial lots</li>
            <li>Integrate a map-based Geo-Tagging feature for accurate identification and location of burial lots</li>
            <li>Reduce manual recording errors and improve efficiency</li>
            <li>Provide clients with an easy-to-use platform for viewing availability and requesting reservations</li>
            <li>Allow administrators to efficiently manage the entire cemetery operation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
