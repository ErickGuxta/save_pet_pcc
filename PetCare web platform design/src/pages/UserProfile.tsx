import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import type { NavProps } from '../App'

type Tab = 'personal' | 'address' | 'security' | 'notifications'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'personal', label: 'Dados Pessoais', icon: '👤' },
  { id: 'address', label: 'Endereço', icon: '📍' },
  { id: 'security', label: 'Segurança', icon: '🔒' },
  { id: 'notifications', label: 'Notificações', icon: '🔔' },
]

const brazilStates = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

export default function UserProfile({ navigate, params }: NavProps) {
  const [tab, setTab] = useState<Tab>('personal')
  const [saved, setSaved] = useState(false)
  const [avatarHover, setAvatarHover] = useState(false)

  const [personal, setPersonal] = useState({
    name: 'Ana Ferreira',
    email: 'ana@email.com',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    birthdate: '15/03/1992',
    bio: 'Tutora apaixonada por animais. Tenho 4 pets: Thor, Luna, Bob e Mel.',
  })

  const [address, setAddress] = useState({
    cep: '01310-100',
    street: 'Avenida Paulista',
    number: '1000',
    complement: 'Apto 52',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
  })

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  })

  const [notifications, setNotifications] = useState({
    vaccineReminder: true,
    newArticles: true,
    locationAlert: true,
    weeklyReport: false,
    promotions: false,
  })

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2800)
  }

  const setP = (key: string, val: string) => setPersonal(f => ({ ...f, [key]: val }))
  const setA = (key: string, val: string) => setAddress(f => ({ ...f, [key]: val }))

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <div className="flex">
      <Sidebar navigate={navigate} params={params} active="profile" />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* Page Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '24px 32px' }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 24, color: '#2D3748', margin: '0 0 4px' }}>
            Meu Perfil
          </h1>
          <p style={{ fontSize: 14, color: '#718096', margin: 0 }}>
            Gerencie suas informações pessoais e preferências
          </p>

          {/* Tabs */}
          <div className="flex mt-5 border-b" style={{ borderColor: '#F0F0F0', overflowX: 'auto', marginLeft: -32, marginRight: -32, paddingLeft: 32 }}>
            {tabs.map(t => (
              <button
                key={t.id}
                className={`tab-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toast */}
        {saved && (
          <div style={{
            position: 'fixed', top: 24, right: 24, zIndex: 200,
            background: '#2D3748', color: '#fff', borderRadius: 14,
            padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)', fontWeight: 700, fontSize: 14,
            animation: 'slideIn 0.3s ease',
          }}>
            <span style={{ fontSize: 18 }}>✅</span>
            Alterações salvas com sucesso!
          </div>
        )}

        <div className="p-6 lg:p-8">
          {/* ── PERSONAL ── */}
          {tab === 'personal' && (
            <div className="grid lg:grid-cols-3 gap-6" style={{ maxWidth: 900 }}>
              {/* Avatar Column */}
              <div className="lg:col-span-1">
                <div className="pet-card p-6 text-center">
                  <div
                    className="relative mx-auto mb-4 cursor-pointer"
                    style={{ width: 100, height: 100 }}
                    onMouseEnter={() => setAvatarHover(true)}
                    onMouseLeave={() => setAvatarHover(false)}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1779049979022-77528c1aa6e3?w=200&h=200&fit=crop&auto=format"
                      alt="Foto de perfil"
                      style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid #D9F2EE' }}
                    />
                    {avatarHover && (
                      <div style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexDirection: 'column', gap: 4,
                      }}>
                        <span style={{ fontSize: 22 }}>📷</span>
                        <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>Alterar</span>
                      </div>
                    )}
                  </div>

                  <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 17, color: '#2D3748', margin: '0 0 4px' }}>
                    {personal.name}
                  </h2>
                  <p style={{ fontSize: 13, color: '#718096', margin: '0 0 16px' }}>{personal.email}</p>

                  <div className="flex flex-col gap-2">
                    <div style={{ background: '#F7F7F7', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: '#718096' }}>Pets cadastrados</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#5FB8A8' }}>4</span>
                    </div>
                    <div style={{ background: '#F7F7F7', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: '#718096' }}>Membro desde</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#2D3748' }}>Jan 2026</span>
                    </div>
                    <div style={{ background: '#F7F7F7', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: '#718096' }}>Plano</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#5FB8A8' }}>Gratuito</span>
                    </div>
                  </div>

                  <button
                    className="pet-btn-secondary w-full mt-4"
                    style={{ fontSize: 13, padding: '9px' }}
                  >
                    📷 Trocar foto
                  </button>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-2">
                <div className="pet-card p-6">
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: '0 0 20px' }}>
                    Informações pessoais
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Nome completo</label>
                      <input className="pet-input" value={personal.name} onChange={e => setP('name', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>E-mail</label>
                      <input className="pet-input" type="email" value={personal.email} onChange={e => setP('email', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Telefone</label>
                      <input className="pet-input" value={personal.phone} onChange={e => setP('phone', e.target.value)} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>CPF</label>
                      <input className="pet-input" value={personal.cpf} readOnly style={{ background: '#F7F7F7', cursor: 'not-allowed' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Data de nascimento</label>
                      <input className="pet-input" value={personal.birthdate} onChange={e => setP('birthdate', e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Bio</label>
                      <textarea
                        className="pet-input"
                        rows={3}
                        value={personal.bio}
                        onChange={e => setP('bio', e.target.value)}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button className="pet-btn-primary" style={{ fontSize: 14, padding: '12px 32px' }} onClick={showSaved}>
                      💾 Salvar alterações
                    </button>
                    <button className="pet-btn-ghost">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ADDRESS ── */}
          {tab === 'address' && (
            <div style={{ maxWidth: 680 }}>
              <div className="pet-card p-6">
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: '0 0 20px' }}>
                  📍 Endereço
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>CEP</label>
                    <input className="pet-input" value={address.cep} onChange={e => setA('cep', e.target.value)} placeholder="00000-000" />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Logradouro</label>
                    <input className="pet-input" value={address.street} onChange={e => setA('street', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Número</label>
                    <input className="pet-input" value={address.number} onChange={e => setA('number', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Complemento</label>
                    <input className="pet-input" value={address.complement} onChange={e => setA('complement', e.target.value)} placeholder="Apto, Bloco..." />
                  </div>
                  <div className="sm:col-span-3">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Bairro</label>
                    <input className="pet-input" value={address.neighborhood} onChange={e => setA('neighborhood', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Cidade</label>
                    <input className="pet-input" value={address.city} onChange={e => setA('city', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Estado</label>
                    <select className="pet-input" value={address.state} onChange={e => setA('state', e.target.value)}>
                      {brazilStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button className="pet-btn-primary" style={{ fontSize: 14, padding: '12px 32px' }} onClick={showSaved}>
                    💾 Salvar endereço
                  </button>
                  <button className="pet-btn-ghost">Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {/* ── SECURITY ── */}
          {tab === 'security' && (
            <div style={{ maxWidth: 560 }}>
              <div className="pet-card p-6 mb-5">
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: '0 0 6px' }}>
                  🔒 Alterar senha
                </h3>
                <p style={{ fontSize: 13, color: '#718096', margin: '0 0 20px' }}>
                  Use uma senha forte com pelo menos 8 caracteres, incluindo letras e números.
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Senha atual</label>
                    <input className="pet-input" type="password" placeholder="••••••••"
                      value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Nova senha</label>
                    <input className="pet-input" type="password" placeholder="••••••••"
                      value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>Confirmar nova senha</label>
                    <input className="pet-input" type="password" placeholder="••••••••"
                      value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
                  </div>

                  {passwords.newPass && passwords.confirm && passwords.newPass !== passwords.confirm && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FC8181', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#FC8181', fontWeight: 600 }}>
                      ⚠ As senhas não coincidem.
                    </div>
                  )}

                  {/* Strength bar */}
                  {passwords.newPass && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span style={{ fontSize: 12, color: '#718096', fontWeight: 600 }}>Força da senha</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: passwords.newPass.length >= 10 ? '#5FB8A8' : passwords.newPass.length >= 6 ? '#D97706' : '#FC8181' }}>
                          {passwords.newPass.length >= 10 ? 'Forte' : passwords.newPass.length >= 6 ? 'Média' : 'Fraca'}
                        </span>
                      </div>
                      <div style={{ background: '#F0F0F0', height: 6, borderRadius: 4 }}>
                        <div style={{
                          height: '100%', borderRadius: 4, transition: 'width 0.3s',
                          width: passwords.newPass.length >= 10 ? '100%' : passwords.newPass.length >= 6 ? '60%' : '25%',
                          background: passwords.newPass.length >= 10 ? '#5FB8A8' : passwords.newPass.length >= 6 ? '#D97706' : '#FC8181',
                        }} />
                      </div>
                    </div>
                  )}
                </div>
                <button className="pet-btn-primary mt-5" style={{ fontSize: 14, padding: '12px 32px' }} onClick={showSaved}
                  disabled={!passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm}>
                  🔒 Atualizar senha
                </button>
              </div>

              {/* Danger zone */}
              <div className="pet-card p-6" style={{ border: '1.5px solid #FCA5A5' }}>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#DC2626', margin: '0 0 8px' }}>
                  ⚠ Zona de risco
                </h3>
                <p style={{ fontSize: 13, color: '#718096', margin: '0 0 16px' }}>
                  Estas ações são irreversíveis. Prossiga com cuidado.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    style={{ background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FCA5A5', borderRadius: 50, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito' }}
                  >
                    Encerrar sessão em todos os dispositivos
                  </button>
                  <button
                    style={{ background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FCA5A5', borderRadius: 50, padding: '9px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito' }}
                  >
                    🗑 Excluir conta
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {tab === 'notifications' && (
            <div style={{ maxWidth: 560 }}>
              <div className="pet-card p-6">
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: '0 0 6px' }}>
                  🔔 Preferências de notificação
                </h3>
                <p style={{ fontSize: 13, color: '#718096', margin: '0 0 24px' }}>
                  Escolha quais avisos você deseja receber por e-mail.
                </p>

                {[
                  { key: 'vaccineReminder', label: 'Lembrete de vacinas', desc: 'Aviso 7 dias antes da data de reforço do seu pet' },
                  { key: 'newArticles', label: 'Novos artigos', desc: 'Quando um novo artigo for publicado no blog' },
                  { key: 'locationAlert', label: 'Alertas de localização', desc: 'Quando o rastreador do pet sair de uma área definida' },
                  { key: 'weeklyReport', label: 'Relatório semanal', desc: 'Resumo semanal das atividades dos seus pets' },
                  { key: 'promotions', label: 'Promoções e novidades', desc: 'Ofertas e atualizações da plataforma SavePet' },
                ].map(item => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-4"
                    style={{ borderBottom: '1px solid #F7F7F7' }}
                  >
                    <div style={{ flex: 1, paddingRight: 16 }}>
                      <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#2D3748', margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>{item.desc}</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={(notifications as Record<string, boolean>)[item.key]}
                      onClick={() => setNotifications(n => ({ ...n, [item.key]: !(n as Record<string, boolean>)[item.key] }))}
                      style={{
                        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                        background: (notifications as Record<string, boolean>)[item.key] ? '#5FB8A8' : '#CBD5E0',
                        position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%', background: '#fff',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s',
                        left: (notifications as Record<string, boolean>)[item.key] ? 23 : 3,
                      }} />
                    </button>
                  </div>
                ))}

                <button className="pet-btn-primary mt-6" style={{ fontSize: 14, padding: '12px 32px' }} onClick={showSaved}>
                  💾 Salvar preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  )
}
