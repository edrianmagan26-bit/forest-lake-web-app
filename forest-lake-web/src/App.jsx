import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from './layouts/ClientLayout';

// Public pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import FeaturesPage from './pages/public/FeaturesPage';
import ProductsPage from './pages/public/ProductsPage';
import MapPreviewPage from './pages/public/MapPreviewPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import VerifyEmail from './pages/public/VerifyEmail';

// Client pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProfile from './pages/client/ClientProfile';
import ClientBurialLots from './pages/client/ClientBurialLots';
import ClientMap from './pages/client/ClientMap';
import ClientReservations from './pages/client/ClientReservations';
import ClientSettings from './pages/client/ClientSettings';

import ClientManageLots from './pages/client/ClientManageLots';
import ClientHistory from './pages/client/ClientHistory';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminBurialLots from './pages/admin/AdminBurialLots';
import AdminBurialLotsMap from './pages/admin/AdminBurialLotsMap';
import AdminReservations from './pages/admin/AdminReservations';
import AdminManageLots from './pages/admin/AdminManageLots';
import AdminSettings from './pages/admin/AdminSettings';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', padding: '12px 16px', fontSize: '14px' } }} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/features" element={<PublicLayout><FeaturesPage /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><ProductsPage /></PublicLayout>} />
          <Route path="/map-preview" element={<PublicLayout><MapPreviewPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<PublicLayout><VerifyEmail /></PublicLayout>} />

          {/* Client routes */}
          <Route path="/client" element={<ProtectedRoute allowedRole="client"><ClientLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="burial-lots" element={<ClientBurialLots />} />
            <Route path="map" element={<ClientMap />} />
            <Route path="reservations" element={<ClientReservations />} />
            <Route path="manage-lots" element={<ClientManageLots />} />
            <Route path="history" element={<ClientHistory />} />
            <Route path="settings" element={<ClientSettings />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="burial-lots" element={<AdminBurialLots />} />
            <Route path="burial-lots/map" element={<AdminBurialLotsMap />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="manage-lots" element={<AdminManageLots />} />
            <Route path="reports" element={<AdminReservations />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}
