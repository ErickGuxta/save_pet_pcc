import { useState } from 'react'
import type { NavProps } from '../App'

type Module = 'users' | 'pets' | 'categories' | 'articles' | 'vaccines' | 'trackers' | 'locations'

const modules: { id: Module; label: string; icon: string }[] = [
  { id: 'users', label: 'Usuários', icon: '👥' },
  { id: 'pets', label: 'Pets', icon: '🐾' },
  { id: 'categories', label: 'Categorias', icon: '🏷' },
  { id: 'articles', label: 'Artigos', icon: '📝' },
  { id: 'vaccines', label: 'Vacinação', icon: '💉' },
  { id: 'trackers', label: 'Rastreadores', icon: '📡' },
  { id: 'locations', label: 'Localizações', icon: '📍' },
]

type Row = string[]

interface FieldDef { key: string; label: string; type?: string; options?: string[] }

interface ModuleConfig {
  headers: string[]
  rows: Row[]
  formFields: FieldDef[]
}

const initialData: Record<Module, ModuleConfig> = {
  users: {
    headers: ['Nome', 'E-mail', 'Telefone', 'Cidade', 'Pets', 'Cadastro'],
    rows: [
      ['Ana Ferreira', 'ana@email.com', '(11) 98765-4321', 'São Paulo — SP', '4', '12/01/2026'],
      ['Carlos Souza', 'carlos@email.com', '(21) 99887-6655', 'Rio de Janeiro — RJ', '2', '03/03/2026'],
      ['Lúcia Mendes', 'lucia@email.com', '(41) 97654-3210', 'Curitiba — PR', '1', '20/05/2026'],
      ['Pedro Alves', 'pedro@email.com', '(31) 98888-1234', 'Belo Horizonte — MG', '3', '08/07/2026'],
    ],
    formFields: [
      { key: '0', label: 'Nome completo' },
      { key: '1', label: 'E-mail', type: 'email' },
      { key: '2', label: 'Telefone' },
      { key: '3', label: 'Cidade / Estado' },
    ],
  },
  pets: {
    headers: ['Nome', 'Espécie', 'Raça', 'Tutor', 'Nascimento', 'Status'],
    rows: [
      ['Thor', 'Cão', 'Golden Retriever', 'Ana Ferreira', '12/05/2023', 'Saudável'],
      ['Luna', 'Gato', 'Siamês', 'Ana Ferreira', '03/08/2024', 'Consulta pendente'],
      ['Bob', 'Cão', 'Labrador', 'Carlos Souza', '22/11/2021', 'Saudável'],
      ['Nina', 'Gato', 'Persa', 'Lúcia Mendes', '15/02/2025', 'Saudável'],
    ],
    formFields: [
      { key: '0', label: 'Nome do pet' },
      { key: '1', label: 'Espécie', type: 'select', options: ['Cão', 'Gato', 'Pássaro', 'Outro'] },
      { key: '2', label: 'Raça' },
      { key: '3', label: 'Tutor' },
      { key: '4', label: 'Data de nascimento' },
      { key: '5', label: 'Status', type: 'select', options: ['Saudável', 'Consulta pendente', 'Em tratamento'] },
    ],
  },
  categories: {
    headers: ['Nome', 'Slug', 'Artigos', 'Criada em'],
    rows: [
      ['Saúde', 'saude', '12', '01/01/2026'],
      ['Nutrição', 'nutricao', '8', '01/01/2026'],
      ['Bem-estar', 'bem-estar', '6', '01/01/2026'],
      ['Comportamento', 'comportamento', '5', '15/01/2026'],
      ['Dicas', 'dicas', '9', '15/01/2026'],
    ],
    formFields: [
      { key: '0', label: 'Nome da categoria' },
      { key: '1', label: 'Slug (URL amigável)' },
    ],
  },
  articles: {
    headers: ['Título', 'Categoria', 'Autor', 'Data', 'Leituras', 'Status'],
    rows: [
      ['Vacinação em cães: calendário completo', 'Saúde', 'Dra. Ana Silva', '01/08/2026', '1.2k', 'Publicado'],
      ['Dieta ideal para gatos', 'Nutrição', 'Dr. Carlos Mendes', '28/07/2026', '854', 'Publicado'],
      ['Cão ativo no inverno', 'Bem-estar', 'Dra. Luana Rocha', '22/07/2026', '632', 'Publicado'],
      ['Sinais de alerta no pet', 'Saúde', 'Dr. Pedro Alves', '18/07/2026', '1.5k', 'Publicado'],
    ],
    formFields: [
      { key: '0', label: 'Título' },
      { key: '1', label: 'Categoria', type: 'select', options: ['Saúde', 'Nutrição', 'Bem-estar', 'Comportamento', 'Dicas'] },
      { key: '2', label: 'Autor' },
      { key: '5', label: 'Status', type: 'select', options: ['Publicado', 'Rascunho', 'Arquivado'] },
    ],
  },
  vaccines: {
    headers: ['Pet', 'Tutor', 'Vacina', 'Lote', 'Aplicação', 'Reforço'],
    rows: [
      ['Thor', 'Ana Ferreira', 'V8 Múltipla', 'A2025-001', '10/07/2025', '10/07/2026'],
      ['Luna', 'Ana Ferreira', 'Tríplice Felina', 'B2025-022', '02/06/2025', '02/06/2026'],
      ['Bob', 'Carlos Souza', 'V10 Múltipla', 'C2025-033', '28/07/2025', '28/07/2026'],
      ['Nina', 'Lúcia Mendes', 'Antirrábica', 'D2025-044', '15/04/2025', '15/04/2026'],
    ],
    formFields: [
      { key: '0', label: 'Nome do pet' },
      { key: '1', label: 'Tutor' },
      { key: '2', label: 'Nome da vacina' },
      { key: '3', label: 'Lote' },
      { key: '4', label: 'Data de aplicação' },
      { key: '5', label: 'Data de reforço' },
    ],
  },
  trackers: {
    headers: ['Pet', 'Tutor', 'Dispositivo', 'Modelo', 'Status', 'Bateria'],
    rows: [
      ['Thor', 'Ana Ferreira', 'TRK-001', 'GPS Tracker Pro', 'Ativo', '87%'],
      ['Bob', 'Carlos Souza', 'TRK-002', 'GPS Tracker Lite', 'Ativo', '54%'],
      ['Nina', 'Lúcia Mendes', 'TRK-003', 'GPS Tracker Pro', 'Inativo', '12%'],
    ],
    formFields: [
      { key: '0', label: 'Nome do pet' },
      { key: '1', label: 'Tutor' },
      { key: '2', label: 'ID do dispositivo' },
      { key: '3', label: 'Modelo' },
      { key: '4', label: 'Status', type: 'select', options: ['Ativo', 'Inativo', 'Manutenção'] },
      { key: '5', label: 'Nível de bateria (%)' },
    ],
  },
  locations: {
    headers: ['Pet', 'Endereço', 'Latitude', 'Longitude', 'Data', 'Hora'],
    rows: [
      ['Thor', 'Parque Ibirapuera, São Paulo', '-23.5505', '-46.6333', '06/08/2026', '14:32'],
      ['Thor', 'Av. das Flores, São Paulo', '-23.5490', '-46.6315', '05/08/2026', '17:45'],
      ['Bob', 'Praia de Copacabana, Rio de Janeiro', '-22.9714', '-43.1823', '06/08/2026', '09:20'],
    ],
    formFields: [
      { key: '0', label: 'Nome do pet' },
      { key: '1', label: 'Endereço' },
      { key: '2', label: 'Latitude' },
      { key: '3', label: 'Longitude' },
      { key: '4', label: 'Data (DD/MM/AAAA)' },
      { key: '5', label: 'Hora (HH:MM)' },
    ],
  },
}

const moduleStats = [
  { label: 'Usuários', value: '248', color: '#D9F2EE', icon: '👥' },
  { label: 'Pets', value: '612', color: '#F5EBDD', icon: '🐾' },
  { label: 'Artigos', value: '40', color: '#EDE9FE', icon: '📝' },
  { label: 'Rastreadores', value: '89', color: '#FEF3C7', icon: '📡' },
]

const positiveStatuses = new Set(['Saudável', 'Publicado', 'Ativo'])

function statusStyle(val: string): React.CSSProperties {
  const ok = positiveStatuses.has(val)
  return {
    fontSize: 12, padding: '3px 10px', borderRadius: 50, fontWeight: 700,
    background: ok ? '#D9F2EE' : '#FEF3C7',
    color: ok ? '#5FB8A8' : '#D97706',
    display: 'inline-block',
  }
}

function isStatusCol(headers: string[], colIdx: number) {
  const h = headers[colIdx]?.toLowerCase() ?? ''
  return h === 'status' || h === 'bateria'
}

/* ─── CRUD Modal ─── */
interface ModalProps {
  title: string
  fields: FieldDef[]
  initialValues: Record<string, string>
  onSave: (v: Record<string, string>) => void
  onClose: () => void
}

function CRUDModal({ title, fields, initialValues, onSave, onClose }: ModalProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(values)
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, padding: 32, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: '#2D3748', margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: '#F7F7F7', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {fields.map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#4A5568', display: 'block', marginBottom: 6 }}>
                {f.label}
              </label>
              {f.type === 'select' ? (
                <select
                  className="pet-input"
                  value={values[f.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  required
                >
                  <option value="">Selecione...</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  className="pet-input"
                  type={f.type || 'text'}
                  value={values[f.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  required
                />
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="submit" className="pet-btn-primary" style={{ flex: 1, padding: '13px', fontSize: 15 }}>
              💾 Salvar
            </button>
            <button type="button" className="pet-btn-ghost" onClick={onClose} style={{ padding: '13px 20px' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Delete confirm ─── */
function DeleteModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420, padding: 36, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: '#2D3748', marginBottom: 10 }}>Confirmar exclusão</h2>
        <p style={{ fontSize: 14, color: '#718096', marginBottom: 28, lineHeight: 1.6 }}>
          Tem certeza que deseja excluir <strong style={{ color: '#2D3748' }}>{name}</strong>? Esta ação é irreversível.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{ flex: 1, padding: '13px', background: '#FEF2F2', color: '#DC2626', border: '2px solid #FCA5A5', borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito' }}
            onClick={onConfirm}
          >
            🗑 Sim, excluir
          </button>
          <button className="pet-btn-secondary" style={{ flex: 1, padding: '13px', fontSize: 14 }} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Toast ─── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 300,
      background: '#2D3748', color: '#fff', borderRadius: 14, padding: '14px 20px',
      display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      fontWeight: 700, fontSize: 14, fontFamily: 'Nunito', maxWidth: 340,
    }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, width: 24, height: 24, cursor: 'pointer', color: '#fff', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        ✕
      </button>
    </div>
  )
}

/* ─── Main Admin page ─── */
export default function Admin({ navigate }: NavProps) {
  const [activeModule, setActiveModule] = useState<Module>('users')
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [data, setData] = useState(initialData)
  const [modal, setModal] = useState<null | { mode: 'create' | 'edit'; rowIndex?: number }>(null)
  const [deleteTarget, setDeleteTarget] = useState<null | { rowIndex: number; name: string }>(null)
  const [toast, setToast] = useState<string | null>(null)

  const config = data[activeModule]
  const currentModule = modules.find(m => m.id === activeModule)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const filtered = config.rows.filter(row =>
    row.some(cell => cell.toLowerCase().includes(search.toLowerCase()))
  )

  const getInitialValues = (row?: Row): Record<string, string> => {
    const vals: Record<string, string> = {}
    config.formFields.forEach(f => { vals[f.key] = row ? (row[Number(f.key)] ?? '') : '' })
    return vals
  }

  const handleSave = (values: Record<string, string>) => {
    const baseRow: Row = modal?.rowIndex !== undefined
      ? [...config.rows[modal.rowIndex]]
      : Array(config.headers.length).fill('')
    config.formFields.forEach(f => { baseRow[Number(f.key)] = values[f.key] || '' })

    setData(prev => {
      const rows = [...prev[activeModule].rows]
      if (modal?.mode === 'edit' && modal.rowIndex !== undefined) {
        rows[modal.rowIndex] = baseRow
        showToast('Registro atualizado com sucesso!')
      } else {
        rows.push(baseRow)
        showToast('Registro criado com sucesso!')
      }
      return { ...prev, [activeModule]: { ...prev[activeModule], rows } }
    })
    setModal(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    const name = deleteTarget.name
    setData(prev => {
      const rows = prev[activeModule].rows.filter((_, i) => i !== deleteTarget.rowIndex)
      return { ...prev, [activeModule]: { ...prev[activeModule], rows } }
    })
    showToast(`"${name}" excluído com sucesso!`)
    setDeleteTarget(null)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F7F7F7' }}>
      {/* Top Bar */}
      <header style={{ background: '#2D3748', padding: '0 20px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="lg:hidden border-none bg-transparent text-white cursor-pointer"
            style={{ fontSize: 20, padding: '4px 8px', lineHeight: 1 }}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#5FB8A8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>S</div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 16, color: '#fff' }}>SavePet</span>
            <span style={{ fontSize: 11, background: '#5FB8A8', color: '#fff', padding: '2px 8px', borderRadius: 50, fontWeight: 700 }}>Admin</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            style={{ background: 'transparent', border: 'none', color: '#A0AEC0', cursor: 'pointer', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700, padding: '6px 12px', borderRadius: 8 }}
            onClick={() => navigate('dashboard')}
          >
            Painel →
          </button>
          <button
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#CBD5E0', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontFamily: 'Nunito', fontWeight: 700 }}
            onClick={() => navigate('login')}
          >
            Sair
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Mobile overlay */}
        {mobileMenu && (
          <div
            className="lg:hidden fixed inset-0 z-30"
            style={{ background: 'rgba(0,0,0,0.45)', top: 58 }}
            onClick={() => setMobileMenu(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`bg-white shrink-0 overflow-y-auto ${mobileMenu ? 'fixed z-40 block' : 'hidden lg:block'}`}
          style={{ width: 210, boxShadow: '2px 0 12px rgba(0,0,0,0.06)', top: 58, height: 'calc(100vh - 58px)', position: mobileMenu ? 'fixed' : 'sticky' }}
        >
          <div style={{ padding: '12px 10px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#A0AEC0', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 12px 6px', margin: 0 }}>
              Módulos
            </p>
            {modules.map(m => (
              <button
                key={m.id}
                className={`sidebar-link w-full text-left ${activeModule === m.id ? 'active' : ''}`}
                onClick={() => { setActiveModule(m.id); setSearch(''); setMobileMenu(false) }}
              >
                <span style={{ fontSize: 15 }}>{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden', padding: 20 }}>
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {moduleStats.map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, marginBottom: 10 }}>{s.icon}</div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, color: '#2D3748', margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: 0 }}>
                  {currentModule?.icon} {currentModule?.label}
                </h2>
                <p style={{ fontSize: 12, color: '#718096', margin: '2px 0 0' }}>
                  {filtered.length} {filtered.length === 1 ? 'registro' : 'registros'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#A0AEC0' }}>🔍</span>
                  <input
                    className="pet-input"
                    style={{ paddingLeft: 30, fontSize: 13, paddingTop: 8, paddingBottom: 8 }}
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className="pet-btn-primary"
                  style={{ fontSize: 13, padding: '8px 18px' }}
                  onClick={() => setModal({ mode: 'create' })}
                >
                  + Criar
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    {config.headers.map(h => <th key={h}>{h}</th>)}
                    <th style={{ width: 130 }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, filtIdx) => {
                    const actualIdx = config.rows.indexOf(row)
                    return (
                      <tr key={filtIdx}>
                        {row.map((cell, colIdx) => (
                          <td key={colIdx}>
                            {isStatusCol(config.headers, colIdx) ? (
                              <span style={statusStyle(cell)}>{cell}</span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              style={{ fontSize: 12, padding: '5px 10px', background: '#D9F2EE', color: '#5FB8A8', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontFamily: 'Nunito', whiteSpace: 'nowrap' }}
                              onClick={() => setModal({ mode: 'edit', rowIndex: actualIdx })}
                            >
                              ✏ Editar
                            </button>
                            <button
                              style={{ fontSize: 12, padding: '5px 10px', background: '#FEF2F2', color: '#FC8181', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontFamily: 'Nunito' }}
                              onClick={() => setDeleteTarget({ rowIndex: actualIdx, name: row[0] })}
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <p style={{ fontSize: 36, marginBottom: 8 }}>🔍</p>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', margin: '0 0 4px' }}>Nenhum resultado</p>
                  <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>Tente outros termos ou crie um novo registro.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #F0F0F0', flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>
                Mostrando {filtered.length} de {config.rows.length} registros
              </p>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3].map(p => (
                  <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, background: p === 1 ? '#5FB8A8' : '#F7F7F7', color: p === 1 ? '#fff' : '#718096' }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* CRUD Modal */}
      {modal && (
        <CRUDModal
          title={modal.mode === 'create' ? `Novo registro — ${currentModule?.label}` : `Editar registro`}
          fields={config.formFields}
          initialValues={getInitialValues(modal.rowIndex !== undefined ? config.rows[modal.rowIndex] : undefined)}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
