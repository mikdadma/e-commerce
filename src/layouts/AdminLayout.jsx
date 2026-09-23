import React from "react";

function AdminLayout({ children }) {
  return (
    <div>
      <aside>
        Sidebar
      </aside>

      <main>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;