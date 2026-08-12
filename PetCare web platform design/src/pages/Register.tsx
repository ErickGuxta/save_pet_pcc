import { useState } from 'react'
import type { NavProps } from '../App'

const initialForm = {
  name: '', cpf: '', phone: '', cep: '',
  street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
}

const brazilStates = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

export default function Register({ navigate }: NavProps) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const handleCep = async (cep: string) => {
    set('cep', cep)
    if (cep.replace(/\D/g, '').length === 8) {
      setForm(f => ({ ...f, street: 'Rua das Flores', neighborhood: 'Jardim Primavera', city: 'São Paulo', state: 'SP' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('dashboard') }, 1200)
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
      <div style={{ width: '100%', maxWidth: 560 }}>
        <button onClick={() => navigate('landing')} className="pet-btn-ghost mb-6" style={{ paddingLeft: 0 }}>
          ← Voltar ao início
        </button>

        <div className="pet-card" style={{ padding: '40px 36px' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)' }}
            >
              🐾
            </div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 26, color: '#2D3748', marginBottom: 6 }}>
              Criar conta
            </h1>
            <p style={{ fontSize: 14, color: '#718096' }}>
              Passo {step} de 2 — {step === 1 ? 'Seus dados pessoais' : 'Endereço'}
            </p>
          </div>

          {/* Steps indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map(s => (
              <div
                key={s}
                style={{
                  flex: 1, height: 4, borderRadius: 4,
                  background: s <= step ? '#5FB8A8' : '#E2E8F0',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Nome completo *
                    </label>
                    <input className="pet-input" placeholder="Ex: Maria Oliveira" value={form.name}
                      onChange={e => set('name', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      CPF *
                    </label>
                    <input className="pet-input" placeholder="000.000.000-00" value={form.cpf}
                      onChange={e => set('cpf', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Telefone *
                    </label>
                    <input className="pet-input" placeholder="(11) 99999-0000" value={form.phone}
                      onChange={e => set('phone', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      E-mail *
                    </label>
                    <input className="pet-input" type="email" placeholder="seu@email.com" required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Senha *
                    </label>
                    <input className="pet-input" type="password" placeholder="Mínimo 8 caracteres" required />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      CEP *
                    </label>
                    <input className="pet-input" placeholder="00000-000" value={form.cep}
                      onChange={e => handleCep(e.target.value)} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Logradouro *
                    </label>
                    <input className="pet-input" placeholder="Rua, Avenida..." value={form.street}
                      onChange={e => set('street', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Número *
                    </label>
                    <input className="pet-input" placeholder="123" value={form.number}
                      onChange={e => set('number', e.target.value)} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Complemento
                    </label>
                    <input className="pet-input" placeholder="Apto 4B, Casa..." value={form.complement}
                      onChange={e => set('complement', e.target.value)} />
                  </div>
                  <div className="sm:col-span-3">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Bairro *
                    </label>
                    <input className="pet-input" placeholder="Jardim das Flores" value={form.neighborhood}
                      onChange={e => set('neighborhood', e.target.value)} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Cidade *
                    </label>
                    <input className="pet-input" placeholder="São Paulo" value={form.city}
                      onChange={e => set('city', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Estado *
                    </label>
                    <select className="pet-input" value={form.state} onChange={e => set('state', e.target.value)} required>
                      <option value="">UF</option>
                      {brazilStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 mt-2">
              {step === 2 && (
                <button type="button" className="pet-btn-secondary" style={{ flex: 1, padding: '13px' }} onClick={() => setStep(1)}>
                  ← Voltar
                </button>
              )}
              <button className="pet-btn-primary" type="submit" style={{ flex: 1, padding: '13px', fontSize: 15 }} disabled={loading}>
                {loading ? 'Cadastrando...' : step === 1 ? 'Continuar →' : '🐾 Criar minha conta'}
              </button>
            </div>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#718096', marginTop: 20 }}>
            Já tem uma conta?{' '}
            <button onClick={() => navigate('login')}
              style={{ color: '#5FB8A8', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
