import { useState } from 'react'
import type { NavProps } from '../App'

export default function Login({ navigate }: NavProps) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('dashboard')
    }, 1000)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5EBDD',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Back to landing */}
        <button
          onClick={() => navigate('landing')}
          className="pet-btn-ghost mb-6"
          style={{ paddingLeft: 0 }}
        >
          ← Voltar ao início
        </button>

        <div className="pet-card" style={{ padding: '40px 36px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)' }}
            >
              P
            </div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 26, color: '#2D3748', marginBottom: 6 }}>
              Bem-vindo de volta
            </h1>
            <p style={{ fontSize: 14, color: '#718096' }}>
              Entre na sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                E-mail
              </label>
              <input
                className="pet-input"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568' }}>
                  Senha
                </label>
                <button
                  type="button"
                  style={{ fontSize: 12, color: '#5FB8A8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  Esqueci minha senha
                </button>
              </div>
              <input
                className="pet-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              className="pet-btn-primary"
              type="submit"
              style={{ width: '100%', marginTop: 8, fontSize: 15, padding: '14px' }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                  </svg>
                  Entrando...
                </span>
              ) : 'Entrar'}
            </button>

            {/* Demo access */}
            <div style={{ background: '#D9F2EE', borderRadius: 12, padding: '12px 16px', marginTop: 4 }}>
              <p style={{ fontSize: 12, color: '#5FB8A8', margin: 0, fontWeight: 700 }}>
                Demo rápido — clique em Entrar para acessar o painel
              </p>
            </div>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#718096', marginTop: 24 }}>
            Ainda não tem conta?{' '}
            <button
              onClick={() => navigate('register')}
              style={{ color: '#5FB8A8', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
            >
              Criar conta
            </button>
          </p>
        </div>

        {/* Admin link */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#A0AEC0', marginTop: 16 }}>
          Administrador?{' '}
          <button
            onClick={() => navigate('admin')}
            style={{ color: '#718096', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}
          >
            Acesso admin →
          </button>
        </p>
      </div>
    </div>
  )
}
