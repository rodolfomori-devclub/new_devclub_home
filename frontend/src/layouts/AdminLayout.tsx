import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, FileText, Megaphone, Mail, LogOut, Home } from 'lucide-react';
import './AdminLayout.css';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: FileText, label: 'Posts', path: '/admin/posts' },
  { icon: Megaphone, label: 'CTAs', path: '/admin/ctas' },
  { icon: Mail, label: 'Newsletter', path: '/admin/newsletter' },
];

function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <NavLink to="/" className="admin-sidebar__logo">
            <img src="/figma/Group.png" alt="DevClub" />
            <span>DevClub</span>
          </NavLink>
        </div>

        <nav className="admin-sidebar__nav">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="admin-sidebar__user-info">
              <span className="admin-sidebar__user-email">{user?.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-sidebar__logout">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
          <NavLink to="/" className="admin-sidebar__back">
            <Home size={20} />
            <span>Voltar ao site</span>
          </NavLink>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
