import { useAppContext } from './store';
import ClientLogin from './views/client/Login';
import ClientRegister from './views/client/Register';
import ClientCatalog from './views/client/Catalog';
import ClientCart from './views/client/Cart';
import ClientCheckout from './views/client/Checkout';
import ClientPayment from './views/client/Payment';
import ClientOrderTracking from './views/client/OrderTracking';
import ClientMyOrders from './views/client/MyOrders';

import AdminLogin from './views/admin/AdminLogin';
import AdminDashboard from './views/admin/Dashboard';
import AdminProducts from './views/admin/Products';
import AdminOrders from './views/admin/Orders';
import AdminCoupons from './views/admin/Coupons';
import AdminReports from './views/admin/Reports';

export default function App() {
  const { currentView, toastMessage } = useAppContext();

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-white shadow-xl overflow-hidden relative font-sans text-surface-900 border-x border-surface-100 flex flex-col items-stretch">
      {/* Views Container */}
      <div key={currentView} className="flex-1 flex flex-col h-full w-full animate-slide-up relative">
        {/* Client Views */}
        {currentView === 'login' && <ClientLogin />}
        {currentView === 'register' && <ClientRegister />}
        {currentView === 'catalog' && <ClientCatalog />}
        {currentView === 'cart' && <ClientCart />}
        {currentView === 'checkout' && <ClientCheckout />}
        {currentView === 'payment' && <ClientPayment />}
        {currentView === 'order-tracking' && <ClientOrderTracking />}
        {currentView === 'my-orders' && <ClientMyOrders />}

        {/* Admin Views */}
        {currentView === 'admin-login' && <AdminLogin />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'admin-products' && <AdminProducts />}
        {currentView === 'admin-orders' && <AdminOrders />}
        {currentView === 'admin-coupons' && <AdminCoupons />}
        {currentView === 'admin-reports' && <AdminReports />}
      </div>
      
      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 w-max max-w-[90%]">
          <div className="bg-surface-900 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
