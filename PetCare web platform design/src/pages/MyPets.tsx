import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import type { NavProps } from '../App'

const pets = [
  {
    id: 1, name: 'Thor', species: 'Cão', breed: 'Golden Retriever', age: '3 anos',
    gender: 'Macho', weight: '32 kg', status: 'Saudável',
    photo: 'https://images.unsplash.com/photo-1655306963086-a34411c0915b?w=400&h=400&fit=crop&auto=format',
    vaccinesUp: true,
  },
  {
    id: 2, name: 'Luna', species: 'Gato', breed: 'Siamês', age: '2 anos',
    gender: 'Fêmea', weight: '4,2 kg', status: 'Consulta pendente',
    photo: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?w=400&h=400&fit=crop&auto=format',
    vaccinesUp: false,
  },
  {
    id: 3, name: 'Bob', species: 'Cão', breed: 'Labrador', age: '5 anos',
    gender: 'Macho', weight: '28 kg', status: 'Saudável',
    photo: 'https://images.unsplash.com/photo-1715475160658-39c34218fb84?w=400&h=400&fit=crop&auto=format',
    vaccinesUp: true,
  },
  {
    id: 4, name: 'Mel', species: 'Gato', breed: 'Persa', age: '1 ano',
    gender: 'Fêmea', weight: '3,8 kg', status: 'Saudável',
    photo: 'https://images.unsplash.com/photo-1542652735873-fb2825bac6e2?w=400&h=400&fit=crop&auto=format',
    vaccinesUp: true,
  },
]

export default function MyPets({ navigate, params }: NavProps) {
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filters = ['Todos', 'Cão', 'Gato']
  const filtered = pets.filter(p =>
    (filter === 'Todos' || p.species === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      <div className="flex">
      <Sidebar navigate={navigate} params={params} active="pets" />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 26, color: '#2D3748', margin: 0 }}>
              Meus Pets 🐾
            </h1>
            <p style={{ fontSize: 14, color: '#718096', margin: '4px 0 0' }}>
              {filtered.length} de {pets.length} pets
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1" style={{ maxWidth: 360 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#A0AEC0' }}>
              🔍
            </span>
            <input
              className="pet-input"
              style={{ paddingLeft: 40 }}
              placeholder="Buscar por nome..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '9px 20px', borderRadius: 50, border: 'none', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: filter === f ? '#5FB8A8' : '#fff',
                  color: filter === f ? '#fff' : '#718096',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  fontFamily: 'Nunito',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(pet => (
            <div key={pet.id} className="pet-card overflow-hidden">
              <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: '#F5EBDD' }}>
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50,
                    background: pet.vaccinesUp ? 'rgba(217,242,238,0.95)' : 'rgba(254,243,199,0.95)',
                    color: pet.vaccinesUp ? '#5FB8A8' : '#D97706',
                    backdropFilter: 'blur(4px)',
                  }}>
                    {pet.vaccinesUp ? '✓ Vacinas OK' : '⚠ Pendente'}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 18, color: '#2D3748', margin: 0 }}>
                      {pet.name}
                    </h3>
                    <p style={{ fontSize: 13, color: '#718096', margin: '2px 0 0' }}>
                      {pet.species} · {pet.breed}
                    </p>
                  </div>
                  <span style={{ fontSize: 22 }}>{pet.species === 'Cão' ? '🐶' : '🐱'}</span>
                </div>

                <div className="flex gap-3 mt-3 mb-4">
                  {[['⚤', pet.gender], ['⚖', pet.weight], ['🎂', pet.age]].map(([icon, val]) => (
                    <div key={String(val)} className="flex flex-col items-center" style={{ flex: 1, background: '#F7F7F7', borderRadius: 10, padding: '6px 4px' }}>
                      <span style={{ fontSize: 14 }}>{icon}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#718096', marginTop: 2 }}>{val}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="pet-btn-primary w-full"
                  style={{ fontSize: 13, padding: '10px' }}
                  onClick={() => navigate('pet-profile', { petId: pet.id, petName: pet.name })}
                >
                  Ver Perfil →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p style={{ fontSize: 48, marginBottom: 12 }}>🐾</p>
            <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: '#2D3748' }}>
              Nenhum pet encontrado
            </p>
            <p style={{ fontSize: 14, color: '#718096' }}>Tente outro filtro ou cadastre um novo pet.</p>
          </div>
        )}
      </main>

      {/* Modal Nova Vacina */}
      {showModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="pet-card"
            style={{ width: '100%', maxWidth: 440, padding: 32 }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: '#2D3748', marginBottom: 24 }}>
              Adicionar novo pet
            </h2>
            <p style={{ fontSize: 14, color: '#718096', marginBottom: 20 }}>
              Esta funcionalidade está disponível no perfil completo.
            </p>
            <button className="pet-btn-primary w-full" onClick={() => { setShowModal(false); navigate('pet-profile') }}>
              Ir para cadastro completo →
            </button>
          </div>
        </div>
      )}

      </div>

      {/* FAB */}
      <button className="floating-btn" onClick={() => setShowModal(true)}>
        + Novo Pet
      </button>
    </div>
  )
}
