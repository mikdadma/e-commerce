import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="ml-64">

        <AdminHeader />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;