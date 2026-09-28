import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:ml-64 min-h-screen">

        <AdminHeader
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 sm:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;