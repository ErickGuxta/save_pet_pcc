import Sidebar from '../components/Sidebar'
import type { NavProps } from '../App'

const stats = [
  { icon: '🐾', label: 'Total de Pets', value: '4', color: '#D9F2EE', accent: '#5FB8A8' },
  { icon: '💉', label: 'Vacinas cadastradas', value: '12', color: '#F5EBDD', accent: '#E58B4A' },
  { icon: '📰', label: 'Artigos salvos', value: '8', color: '#EDE9FE', accent: '#7C3AED' },
  { icon: '📍', label: 'Rastreadores ativos', value: '2', color: '#FEF3C7', accent: '#D97706' },
]

const recentPets = [
  { name: 'Thor', species: 'Cão', breed: 'Golden Retriever', status: 'Saudável', statusColor: '#5FB8A8', lastVaccine: '10 Jul 2026', avatar: 'https://images.unsplash.com/photo-1655306963086-a34411c0915b?w=80&h=80&fit=crop&auto=format' },
  { name: 'Luna', species: 'Gato', breed: 'Siamês', status: 'Consulta pendente', statusColor: '#D97706', lastVaccine: '02 Jun 2026', avatar: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?w=80&h=80&fit=crop&auto=format' },
  { name: 'Bob', species: 'Cão', breed: 'Labrador', status: 'Saudável', statusColor: '#5FB8A8', lastVaccine: '28 Jul 2026', avatar: 'https://images.unsplash.com/photo-1715475160658-39c34218fb84?w=80&h=80&fit=crop&auto=format' },
]

const vaccineSchedule = [
  { pet: 'Thor', vaccine: 'V8 - Reforço anual', date: '15 Ago 2026', urgent: true },
  { pet: 'Luna', vaccine: 'Antirrábica', date: '20 Ago 2026', urgent: false },
  { pet: 'Bob', vaccine: 'V10 - Reforço', date: '01 Set 2026', urgent: false },
]

const monthlyData = [
  { month: 'Mar', vacinas: 2, consultas: 1 },
  { month: 'Abr', vacinas: 1, consultas: 3 },
  { month: 'Mai', vacinas: 4, consultas: 2 },
  { month: 'Jun', vacinas: 2, consultas: 1 },
  { month: 'Jul', vacinas: 3, consultas: 4 },
  { month: 'Ago', vacinas: 2, consultas: 1 },
]
const maxVal = 5

export default function Dashboard({ navigate, params }: NavProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <div className="flex">
      <Sidebar navigate={navigate} params={params} active="dashboard" />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 26, color: '#2D3748', margin: 0 }}>
              Olá, Ana! 👋
            </h1>
            <p style={{ fontSize: 14, color: '#718096', margin: '4px 0 0' }}>
              Terça-feira, 06 de agosto de 2026
            </p>
          </div>
          <button className="pet-btn-primary" style={{ fontSize: 14, padding: '10px 22px' }} onClick={() => navigate('pets')}>
            + Novo Pet
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="stat-card flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: s.color }}>
                  {s.icon}
                </div>
                <span style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 600 }}>↑ este mês</span>
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 30, color: s.accent, margin: 0 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 13, color: '#718096', margin: '2px 0 0' }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 pet-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: 0 }}>
                Atividades nos últimos 6 meses
              </h2>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, borderRadius: 3, background: '#5FB8A8', display: 'inline-block' }} /> Vacinas</span>
                <span className="flex items-center gap-1"><span style={{ width: 10, height: 10, borderRadius: 3, background: '#F5EBDD', border: '2px solid #E58B4A', display: 'inline-block' }} /> Consultas</span>
              </div>
            </div>
            <div className="flex items-end gap-3" style={{ height: 140 }}>
              {monthlyData.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 w-full justify-center" style={{ height: 110 }}>
                    <div
                      style={{
                        width: '40%', background: '#5FB8A8', borderRadius: '6px 6px 0 0',
                        height: `${(d.vacinas / maxVal) * 100}%`,
                        minHeight: 4, transition: 'height 0.4s ease'
                      }}
                    />
                    <div
                      style={{
                        width: '40%', background: '#F5EBDD', border: '2px solid #E58B4A', borderRadius: '6px 6px 0 0',
                        height: `${(d.consultas / maxVal) * 100}%`,
                        minHeight: 4, transition: 'height 0.4s ease'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 600 }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Vaccines */}
          <div className="pet-card p-6">
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: '0 0 20px' }}>
              Próximas vacinas 💉
            </h2>
            <div className="flex flex-col gap-4">
              {vaccineSchedule.map(v => (
                <div key={v.vaccine} className="flex gap-3">
                  <div
                    className="w-2 self-stretch rounded-full shrink-0"
                    style={{ background: v.urgent ? '#FC8181' : '#8FD8C8' }}
                  />
                  <div>
                    <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 13, color: '#2D3748', margin: 0 }}>
                      {v.pet}
                    </p>
                    <p style={{ fontSize: 12, color: '#718096', margin: '1px 0 3px' }}>{v.vaccine}</p>
                    <span
                      style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 50,
                        background: v.urgent ? '#FEF2F2' : '#D9F2EE',
                        color: v.urgent ? '#FC8181' : '#5FB8A8'
                      }}
                    >
                      {v.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="pet-btn-secondary w-full mt-5"
              style={{ fontSize: 13, padding: '9px' }}
              onClick={() => navigate('pet-profile', { tab: 'vaccination' })}
            >
              Ver calendário
            </button>
          </div>
        </div>

        {/* Recent Pets */}
        <div className="pet-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', margin: 0 }}>
              Meus Pets
            </h2>
            <button
              className="pet-btn-ghost"
              style={{ fontSize: 13 }}
              onClick={() => navigate('pets')}
            >
              Ver todos →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>Espécie</th>
                  <th>Raça</th>
                  <th>Status</th>
                  <th>Última Vacina</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentPets.map(p => (
                  <tr key={p.name}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-xl object-cover" />
                        <span style={{ fontWeight: 700 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#718096' }}>{p.species}</td>
                    <td style={{ color: '#718096' }}>{p.breed}</td>
                    <td>
                      <span style={{
                        fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 50,
                        background: p.statusColor === '#5FB8A8' ? '#D9F2EE' : '#FEF3C7',
                        color: p.statusColor
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ color: '#718096', fontSize: 13 }}>{p.lastVaccine}</td>
                    <td>
                      <button
                        className="pet-btn-ghost"
                        style={{ fontSize: 12, padding: '6px 12px' }}
                        onClick={() => navigate('pet-profile', { petName: p.name })}
                      >
                        Ver perfil →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}
