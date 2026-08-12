import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import type { NavProps } from '../App'

type Tab = 'info' | 'vaccination' | 'location'

const vaccines = [
  { id: 1, name: 'V8 Multipla Canina', lot: 'A2024-001', applied: '10 Jul 2025', booster: '10 Jul 2026', vet: 'Dr. Paulo Souza', clinic: 'Clínica VetCare' },
  { id: 2, name: 'Antirrábica', lot: 'B2023-114', applied: '15 Mar 2024', booster: '15 Mar 2025', vet: 'Dra. Carla Lima', clinic: 'Pet Saúde' },
  { id: 3, name: 'Giárdia', lot: 'C2024-047', applied: '20 Jan 2025', booster: '20 Jan 2026', vet: 'Dr. Paulo Souza', clinic: 'Clínica VetCare' },
]

const locationHistory = [
  { lat: '-23.5505', lng: '-46.6333', date: '06 Ago 2026', time: '14:32', address: 'Parque Ibirapuera, São Paulo' },
  { lat: '-23.5512', lng: '-46.6340', date: '06 Ago 2026', time: '10:15', address: 'Parque Ibirapuera, São Paulo' },
  { lat: '-23.5490', lng: '-46.6315', date: '05 Ago 2026', time: '17:45', address: 'Avenida das Flores, São Paulo' },
]

export default function PetProfile({ navigate, params }: NavProps) {
  const initialTab: Tab = (params.tab as Tab) || 'info'
  const [tab, setTab] = useState<Tab>(initialTab)
  const [saved, setSaved] = useState(false)
  const [editVaccine, setEditVaccine] = useState<number | null>(null)
  const [vaccineList, setVaccineList] = useState(vaccines)
  const [showNewVaccine, setShowNewVaccine] = useState(false)
  const [newVaccine, setNewVaccine] = useState({ name: '', lot: '', applied: '', booster: '', vet: '', clinic: '' })

  const petName = (params.petName as string) || 'Thor'

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const addVaccine = () => {
    setVaccineList(v => [...v, { id: Date.now(), ...newVaccine }])
    setNewVaccine({ name: '', lot: '', applied: '', booster: '', vet: '', clinic: '' })
    setShowNewVaccine(false)
  }

  const deleteVaccine = (id: number) => setVaccineList(v => v.filter(x => x.id !== id))

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <div className="flex">
      <Sidebar navigate={navigate} params={params} active="pets" />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* Pet Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', padding: '24px 32px' }}>
          <button className="pet-btn-ghost mb-3" style={{ paddingLeft: 0, fontSize: 13 }} onClick={() => navigate('pets')}>
            ← Meus Pets
          </button>
          <div className="flex items-center gap-5">
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1655306963086-a34411c0915b?w=120&h=120&fit=crop&auto=format"
                alt={petName}
                className="rounded-2xl object-cover"
                style={{ width: 72, height: 72, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
              />
              <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#5FB8A8', borderRadius: 50, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', fontSize: 12 }}>
                🐶
              </div>
            </div>
            <div>
              <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, color: '#2D3748', margin: 0 }}>
                {petName}
              </h1>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className="pet-badge">Cão</span>
                <span className="pet-badge" style={{ background: '#F5EBDD', color: '#E58B4A' }}>Golden Retriever</span>
                <span className="pet-badge" style={{ background: '#D9F2EE', color: '#5FB8A8' }}>✓ Saudável</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mt-5 border-b" style={{ borderColor: '#F0F0F0', overflowX: 'auto' }}>
            {([
              { id: 'info', label: '📋 Informações' },
              { id: 'vaccination', label: '💉 Vacinação' },
              { id: 'location', label: '📍 Localização' },
            ] as { id: Tab; label: string }[]).map(t => (
              <button
                key={t.id}
                className={`tab-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* ── TAB 1: INFO ── */}
          {tab === 'info' && (
            <div style={{ maxWidth: 720 }}>
              {saved && (
                <div style={{ background: '#D9F2EE', border: '1px solid #8FD8C8', borderRadius: 12, padding: '12px 20px', marginBottom: 20, color: '#5FB8A8', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  ✓ Alterações salvas com sucesso!
                </div>
              )}

              {/* Photo Upload */}
              <div className="pet-card p-6 mb-5">
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', marginBottom: 16 }}>
                  Foto do pet
                </h2>
                <div className="flex items-center gap-5">
                  <img
                    src="https://images.unsplash.com/photo-1655306963086-a34411c0915b?w=200&h=200&fit=crop&auto=format"
                    alt="Thor"
                    className="rounded-2xl object-cover"
                    style={{ width: 88, height: 88 }}
                  />
                  <div>
                    <button className="pet-btn-secondary" style={{ fontSize: 13, padding: '8px 20px' }}>
                      📷 Alterar foto
                    </button>
                    <p style={{ fontSize: 11, color: '#A0AEC0', marginTop: 8 }}>JPG, PNG ou WEBP. Máximo 5MB.</p>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="pet-card p-6 mb-5">
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', marginBottom: 20 }}>
                  Informações gerais
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Nome *', placeholder: 'Thor', defaultVal: 'Thor' },
                    { label: 'Espécie *', placeholder: 'Cão, Gato...', defaultVal: 'Cão' },
                    { label: 'Raça *', placeholder: 'Golden Retriever', defaultVal: 'Golden Retriever' },
                    { label: 'Data de Nascimento *', placeholder: '12/05/2023', defaultVal: '12/05/2023' },
                    { label: 'Pelagem', placeholder: 'Dourado', defaultVal: 'Dourado curto' },
                    { label: 'Peso (kg)', placeholder: '32', defaultVal: '32' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                        {f.label}
                      </label>
                      <input className="pet-input" placeholder={f.placeholder} defaultValue={f.defaultVal} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                      Sexo *
                    </label>
                    <select className="pet-input" defaultValue="Macho">
                      <option>Macho</option>
                      <option>Fêmea</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Health Info */}
              <div className="pet-card p-6 mb-5">
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', marginBottom: 20 }}>
                  Saúde e histórico
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Alergias', placeholder: 'Ex: Frango, ácaros...', rows: 2 },
                    { label: 'Doenças', placeholder: 'Ex: Displasia, Diabetes...', rows: 2 },
                    { label: 'Medicamentos em uso', placeholder: 'Nome, dosagem e frequência...', rows: 2 },
                    { label: 'Observações', placeholder: 'Outras informações relevantes...', rows: 3 },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                        {f.label}
                      </label>
                      <textarea
                        className="pet-input"
                        placeholder={f.placeholder}
                        rows={f.rows}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button className="pet-btn-primary" style={{ fontSize: 15, padding: '14px 36px' }} onClick={handleSave}>
                💾 Salvar Alterações
              </button>
            </div>
          )}

          {/* ── TAB 2: VACCINATION ── */}
          {tab === 'vaccination' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: '#2D3748', margin: 0 }}>
                    Histórico de Vacinação
                  </h2>
                  <p style={{ fontSize: 13, color: '#718096', margin: '4px 0 0' }}>
                    {vaccineList.length} registros de vacinas
                  </p>
                </div>
                <button className="pet-btn-primary" style={{ fontSize: 13, padding: '10px 22px' }} onClick={() => setShowNewVaccine(true)}>
                  + Nova Vacina
                </button>
              </div>

              {/* New Vaccine Form */}
              {showNewVaccine && (
                <div className="pet-card p-6 mb-5" style={{ border: '2px solid #8FD8C8' }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', marginBottom: 16 }}>
                    Nova vacina
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {[
                      { key: 'name', label: 'Nome da vacina', placeholder: 'V8 Múltipla Canina' },
                      { key: 'lot', label: 'Lote', placeholder: 'A2026-001' },
                      { key: 'applied', label: 'Data da aplicação', placeholder: '06/08/2026' },
                      { key: 'booster', label: 'Data do reforço', placeholder: '06/08/2027' },
                      { key: 'vet', label: 'Veterinário', placeholder: 'Dr. Nome' },
                      { key: 'clinic', label: 'Clínica', placeholder: 'Clínica VetCare' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 5 }}>
                          {f.label}
                        </label>
                        <input
                          className="pet-input"
                          placeholder={f.placeholder}
                          value={(newVaccine as Record<string, string>)[f.key]}
                          onChange={e => setNewVaccine(v => ({ ...v, [f.key]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="pet-btn-primary" style={{ fontSize: 13 }} onClick={addVaccine}>Salvar</button>
                    <button className="pet-btn-ghost" onClick={() => setShowNewVaccine(false)}>Cancelar</button>
                  </div>
                </div>
              )}

              {/* Vaccine Cards — Timeline style */}
              <div className="flex flex-col gap-4">
                {vaccineList.map((v, i) => (
                  <div key={v.id} className="pet-card p-5" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center pt-1 shrink-0">
                      <div style={{ width: 14, height: 14, borderRadius: 50, background: '#5FB8A8', border: '3px solid #D9F2EE' }} />
                      {i < vaccineList.length - 1 && <div style={{ width: 2, flex: 1, background: '#F0F0F0', marginTop: 4, minHeight: 40 }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: 0 }}>
                            {v.name}
                          </h3>
                          <p style={{ fontSize: 12, color: '#A0AEC0', margin: '2px 0 0' }}>Lote: {v.lot}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="pet-btn-ghost"
                            style={{ fontSize: 12, padding: '5px 12px' }}
                            onClick={() => setEditVaccine(editVaccine === v.id ? null : v.id)}
                          >
                            ✏ Editar
                          </button>
                          <button
                            style={{ fontSize: 12, padding: '5px 12px', background: '#FEF2F2', color: '#FC8181', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontFamily: 'Nunito' }}
                            onClick={() => deleteVaccine(v.id)}
                          >
                            🗑 Excluir
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { label: 'Aplicação', val: v.applied, color: '#D9F2EE' },
                          { label: 'Reforço', val: v.booster, color: '#FEF3C7' },
                          { label: 'Veterinário', val: v.vet, color: '#F7F7F7' },
                          { label: 'Clínica', val: v.clinic, color: '#F7F7F7' },
                        ].map(item => (
                          <div key={item.label} style={{ background: item.color, borderRadius: 10, padding: '8px 12px' }}>
                            <p style={{ fontSize: 10, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{item.label}</p>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#2D3748', margin: '2px 0 0' }}>{item.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 3: LOCATION ── */}
          {tab === 'location' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: '#2D3748', margin: 0 }}>
                    Rastreamento GPS
                  </h2>
                  <p style={{ fontSize: 13, color: '#718096', margin: '4px 0 0' }}>
                    Última atualização: 06 Ago 2026 às 14:32
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="pet-btn-secondary" style={{ fontSize: 13, padding: '9px 18px' }}>✏ Editar</button>
                  <button className="pet-btn-primary" style={{ fontSize: 13, padding: '9px 18px' }}>🔄 Atualizar</button>
                </div>
              </div>

              {/* Map */}
              <div className="pet-card mb-5 overflow-hidden">
                <iframe
                  title="Localização do pet"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6500%2C-23.5600%2C-46.6200%2C-23.5400&layer=mapnik&marker=-23.5505%2C-46.6333"
                  style={{ width: '100%', height: 320, border: 'none', display: 'block' }}
                />
              </div>

              {/* Current Location Card */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Latitude', val: '-23.5505', icon: '📐' },
                  { label: 'Longitude', val: '-46.6333', icon: '📐' },
                  { label: 'Data', val: '06 Ago 2026', icon: '📅' },
                  { label: 'Hora', val: '14:32', icon: '🕐' },
                ].map(item => (
                  <div key={item.label} className="stat-card">
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                      {item.icon} {item.label}
                    </p>
                    <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: 0 }}>
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>

              {/* Location History */}
              <div className="pet-card p-6">
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', marginBottom: 16 }}>
                  Histórico de localizações
                </h3>
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Endereço</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Data</th>
                        <th>Hora</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locationHistory.map((loc, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{loc.address}</td>
                          <td style={{ color: '#718096', fontFamily: 'monospace', fontSize: 12 }}>{loc.lat}</td>
                          <td style={{ color: '#718096', fontFamily: 'monospace', fontSize: 12 }}>{loc.lng}</td>
                          <td style={{ color: '#718096', fontSize: 13 }}>{loc.date}</td>
                          <td style={{ color: '#718096', fontSize: 13 }}>{loc.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-3 mt-5">
                  <button className="pet-btn-secondary" style={{ fontSize: 13, padding: '9px 18px' }}>
                    🗺 Ver no mapa completo
                  </button>
                  <button
                    style={{ fontSize: 13, padding: '9px 18px', background: '#FEF2F2', color: '#FC8181', border: 'none', borderRadius: 50, cursor: 'pointer', fontWeight: 700, fontFamily: 'Nunito' }}
                  >
                    🗑 Remover rastreador
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  )
}
