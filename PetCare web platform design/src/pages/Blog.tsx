import { useState } from 'react'
import type { NavProps } from '../App'

const categories = ['Todos', 'Saúde', 'Nutrição', 'Bem-estar', 'Comportamento', 'Dicas']

const articles = [
  { id: 1, image: 'https://images.unsplash.com/photo-1770836037289-e00e5f351d11?w=600&h=380&fit=crop&auto=format', category: 'Saúde', title: 'Vacinação em cães: calendário completo por faixa etária', author: 'Dra. Ana Silva', date: '01 Ago 2026', readTime: '5 min' },
  { id: 2, image: 'https://images.unsplash.com/photo-1562874855-988ba2330251?w=600&h=380&fit=crop&auto=format', category: 'Nutrição', title: 'A dieta ideal para gatos em todas as fases da vida', author: 'Dr. Carlos Mendes', date: '28 Jul 2026', readTime: '7 min' },
  { id: 3, image: 'https://images.unsplash.com/photo-1715475160658-39c34218fb84?w=600&h=380&fit=crop&auto=format', category: 'Bem-estar', title: 'Como manter seu cão ativo e feliz durante o inverno', author: 'Dra. Luana Rocha', date: '22 Jul 2026', readTime: '4 min' },
  { id: 4, image: 'https://images.unsplash.com/photo-1770836037275-38b44e4b101f?w=600&h=380&fit=crop&auto=format', category: 'Saúde', title: 'Sinais de alerta: quando levar seu pet ao veterinário', author: 'Dr. Pedro Alves', date: '18 Jul 2026', readTime: '6 min' },
  { id: 5, image: 'https://images.unsplash.com/photo-1587723958656-ee042cc565a1?w=600&h=380&fit=crop&auto=format', category: 'Comportamento', title: 'Entendendo a linguagem corporal do seu gato', author: 'Dra. Fernanda Costa', date: '14 Jul 2026', readTime: '8 min' },
  { id: 6, image: 'https://images.unsplash.com/photo-1524491496106-f413c4d2917b?w=600&h=380&fit=crop&auto=format', category: 'Dicas', title: 'Guia completo para adoção responsável de pets', author: 'Maria Fernandes', date: '10 Jul 2026', readTime: '9 min' },
]

export default function Blog({ navigate }: NavProps) {
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = articles.filter(a =>
    (category === 'Todos' || a.category === category) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7' }}>
      {/* Navbar */}
      <header style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, zIndex: 40 }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          <button onClick={() => navigate('landing')} className="flex items-center gap-2 border-none bg-transparent cursor-pointer">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)', fontSize: 14 }}>P</div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 18, color: '#2D3748' }}>SavePet</span>
          </button>
          <div className="flex gap-3">
            <button className="pet-btn-ghost" style={{ fontSize: 13 }} onClick={() => navigate('login')}>Entrar</button>
            <button className="pet-btn-primary" style={{ fontSize: 13, padding: '9px 20px' }} onClick={() => navigate('register')}>Cadastrar</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #F5EBDD 0%, #D9F2EE 100%)', padding: '56px 24px', textAlign: 'center' }}>
        <span className="pet-badge mb-4" style={{ display: 'inline-flex' }}>✍ Blog SavePet</span>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 44px)', color: '#2D3748', margin: '8px 0 16px' }}>
          Conteúdo para tutores apaixonados
        </h1>
        <p style={{ fontSize: 16, color: '#718096', maxWidth: 480, margin: '0 auto 32px' }}>
          Dicas de saúde, nutrição, bem-estar e comportamento para cuidar melhor do seu pet.
        </p>
        {/* Search */}
        <div className="relative mx-auto" style={{ maxWidth: 480 }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#A0AEC0' }}>
            🔍
          </span>
          <input
            className="pet-input"
            style={{ paddingLeft: 48, paddingRight: 16, fontSize: 15, borderRadius: 50, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            placeholder="Buscar artigos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '8px 20px', borderRadius: 50, border: 'none', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Nunito',
                background: category === c ? '#5FB8A8' : '#fff',
                color: category === c ? '#fff' : '#718096',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <p style={{ fontSize: 13, color: '#718096', marginBottom: 20 }}>
          {filtered.length} {filtered.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => (
            <div key={a.id} className="pet-card cursor-pointer" onClick={() => navigate('article', { articleId: a.id })}>
              <div style={{ height: 210, overflow: 'hidden', background: '#F5EBDD' }}>
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.35s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="pet-badge">{a.category}</span>
                  <span style={{ fontSize: 11, color: '#A0AEC0', fontWeight: 600 }}>⏱ {a.readTime}</span>
                </div>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', lineHeight: 1.4, marginBottom: 14 }}>
                  {a.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 28, height: 28, borderRadius: 50, background: '#D9F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#5FB8A8' }}>
                      {a.author.charAt(0)}
                    </div>
                    <span style={{ fontSize: 12, color: '#718096' }}>{a.author}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#A0AEC0' }}>{a.date}</span>
                </div>
                <button
                  className="pet-btn-secondary w-full mt-4"
                  style={{ fontSize: 13, padding: '9px' }}
                >
                  Ler mais →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p style={{ fontSize: 44, marginBottom: 12 }}>📰</p>
            <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: '#2D3748' }}>Nenhum artigo encontrado</p>
            <p style={{ fontSize: 14, color: '#718096' }}>Tente outros termos ou categorias.</p>
          </div>
        )}
      </div>
    </div>
  )
}
