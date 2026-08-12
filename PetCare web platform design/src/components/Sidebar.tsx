import { useState } from 'react'
import type { Page, NavProps } from '../App'

interface SidebarProps extends NavProps {
  active: Page
  isAdmin?: boolean
}

const userLinks: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'pets', label: 'Meus Pets', icon: '🐾' },
  { id: 'blog', label: 'Blog', icon: '📝' },
]

const adminLinks: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'admin', label: 'Painel Admin', icon: '⚙' },
  { id: 'pets', label: 'Meus Pets', icon: '🐾' },
  { id: 'blog', label: 'Blog', icon: '📝' },
]

export default function Sidebar({ navigate, active, isAdmin }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = isAdmin ? adminLinks : userLinks

  const go = (page: Page) => {
    navigate(page)
    setMobileOpen(false)
  }

  const SidebarContent = () => (
    <div className="flex flex-col" style={{ height: '100%' }}>
      {/* Logo */}
      <button
        onClick={() => go('landing')}
        className="flex items-center gap-3 border-none bg-transparent cursor-pointer text-left"
        style={{ padding: '20px 20px 14px' }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 17, flexShrink: 0 }}>
          S
        </div>
        <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 18, color: '#2D3748' }}>
          SavePet
        </span>
      </button>

      {/* User Card */}
      <div style={{ margin: '0 12px 14px', background: '#F5EBDD', borderRadius: 16, padding: '12px 14px' }}>
        <button
          onClick={() => go('profile')}
          className="flex items-center gap-3 w-full border-none bg-transparent cursor-pointer p-0 text-left"
        >
          <img
            src="https://images.unsplash.com/photo-1779049979022-77528c1aa6e3?w=80&h=80&fit=crop&auto=format"
            alt="Foto do usuário"
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 13, color: '#2D3748', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Ana Ferreira
            </p>
            <p style={{ fontSize: 11, color: '#718096', margin: 0 }}>Editar perfil →</p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '0 12px', overflowY: 'auto' }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 12px', marginBottom: 6, marginTop: 0 }}>
          Menu
        </p>
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => go(link.id)}
            className={`sidebar-link w-full text-left ${active === link.id ? 'active' : ''}`}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{link.icon}</span>
            {link.label}
          </button>
        ))}

        <div style={{ borderTop: '1px solid #F0F0F0', margin: '10px 0 8px' }} />
        <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 12px', marginBottom: 6, marginTop: 0 }}>
          Conta
        </p>
        <button
          onClick={() => go('profile')}
          className={`sidebar-link w-full text-left ${active === 'profile' ? 'active' : ''}`}
        >
          <span style={{ fontSize: 16 }}>👤</span>
          Meu Perfil
        </button>
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid #F0F0F0', marginTop: 'auto' }}>
        <button
          onClick={() => go('landing')}
          className="sidebar-link w-full text-left"
          style={{ color: '#FC8181' }}
        >
          <span style={{ fontSize: 16 }}>🚪</span>
          Sair
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Top Bar */}
      <div
        className="lg:hidden flex items-center justify-between bg-white"
        style={{ position: 'sticky', top: 0, zIndex: 40, padding: '10px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
      >
        <button onClick={() => go('landing')} className="flex items-center gap-2 border-none bg-transparent cursor-pointer p-0">
          <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>
            S
          </div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 16, color: '#2D3748' }}>SavePet</span>
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: '#F7F7F7', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className="lg:hidden fixed top-0 left-0 h-full bg-white z-40"
        style={{
          width: 250,
          overflowY: 'auto',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          boxShadow: mobileOpen ? '4px 0 24px rgba(0,0,0,0.14)' : 'none',
        }}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block bg-white shrink-0"
        style={{
          width: 240,
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          boxShadow: '2px 0 16px rgba(0,0,0,0.05)',
        }}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
