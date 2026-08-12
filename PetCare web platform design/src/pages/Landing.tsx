import { useState } from 'react'
import type { NavProps } from '../App'

const features = [
  {
    icon: '🐾',
    title: 'Cadastro de Pets',
    desc: 'Registre todos os dados do seu pet: espécie, raça, alergias, medicamentos e muito mais em um só lugar.',
    color: '#D9F2EE',
  },
  {
    icon: '💉',
    title: 'Controle de Vacinação',
    desc: 'Acompanhe o histórico de vacinas, datas de reforço e clínicas veterinárias com total organização.',
    color: '#F5EBDD',
  },
  {
    icon: '📍',
    title: 'Rastreamento',
    desc: 'Monitore a localização do seu pet em tempo real e consulte o histórico de posições a qualquer momento.',
    color: '#EDE9FE',
  },
  {
    icon: '📰',
    title: 'Artigos Informativos',
    desc: 'Acesse um blog completo com dicas de saúde, nutrição e bem-estar para o seu companheiro.',
    color: '#FEF3C7',
  },
]

const articles = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1770836037289-e00e5f351d11?w=600&h=360&fit=crop&auto=format',
    category: 'Saúde',
    title: 'Vacinação em cães: tudo que você precisa saber',
    author: 'Dra. Ana Silva',
    date: '01 Ago 2026',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1562874855-988ba2330251?w=600&h=360&fit=crop&auto=format',
    category: 'Nutrição',
    title: 'A dieta ideal para gatos em todas as fases da vida',
    author: 'Dr. Carlos Mendes',
    date: '28 Jul 2026',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1715475160658-39c34218fb84?w=600&h=360&fit=crop&auto=format',
    category: 'Bem-estar',
    title: 'Como manter seu cão ativo e saudável no inverno',
    author: 'Dra. Luana Rocha',
    date: '22 Jul 2026',
  },
]

export default function Landing({ navigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      {/* Header */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)', borderBottom: '1px solid #F0F0F0',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 70 }}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)', fontSize: 17 }}
            >
              P
            </div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 20, color: '#2D3748' }}>
              SavePet
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {['Início', 'Blog', 'Categorias', 'Sobre'].map(item => (
              <button
                key={item}
                onClick={() => item === 'Blog' ? navigate('blog') : undefined}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                style={{ color: '#718096', border: 'none', background: 'transparent', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#2D3748')}
                onMouseLeave={e => (e.currentTarget.style.color = '#718096')}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="pet-btn-ghost" onClick={() => navigate('login')}>
              Entrar
            </button>
            <button className="pet-btn-primary" style={{ padding: '10px 22px', fontSize: 14 }} onClick={() => navigate('register')}>
              Cadastrar
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ background: '#F7F7F7', border: 'none', cursor: 'pointer', fontSize: 18 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-2" style={{ borderTop: '1px solid #F0F0F0', background: '#fff' }}>
            {['Início', 'Blog', 'Categorias', 'Sobre'].map(item => (
              <button
                key={item}
                className="py-2 text-left text-sm font-semibold"
                style={{ color: '#718096', border: 'none', background: 'transparent', cursor: 'pointer' }}
                onClick={() => item === 'Blog' ? navigate('blog') : setMenuOpen(false)}
              >
                {item}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <button className="pet-btn-secondary" style={{ padding: '9px 20px', fontSize: 14 }} onClick={() => navigate('login')}>Entrar</button>
              <button className="pet-btn-primary" style={{ padding: '9px 20px', fontSize: 14 }} onClick={() => navigate('register')}>Cadastrar</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section style={{ background: '#F5EBDD', paddingTop: 80, paddingBottom: 80, overflow: 'hidden' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="pet-badge mb-4" style={{ display: 'inline-flex' }}>
                ✨ Plataforma completa para tutores
              </span>
              <h1 style={{ fontSize: 'clamp(34px, 5vw, 54px)', fontWeight: 800, color: '#2D3748', lineHeight: 1.15, margin: '16px 0 24px' }}>
                Cuidar do seu melhor amigo nunca foi{' '}
                <span style={{ color: '#5FB8A8' }}>tão fácil.</span>
              </h1>
              <p style={{ fontSize: 17, color: '#718096', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
                Gerencie a saúde, vacinação e localização dos seus pets em uma plataforma moderna, intuitiva e segura.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="pet-btn-primary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={() => navigate('register')}>
                  🐾 Cadastrar Pet
                </button>
                <button className="pet-btn-secondary" style={{ fontSize: 15, padding: '12px 28px' }} onClick={() => navigate('login')}>
                  Ver demonstração
                </button>
              </div>
              <div className="flex items-center gap-6 mt-10">
                {[['2.800+', 'Pets cadastrados'], ['98%', 'Tutores satisfeitos'], ['12', 'Cidades cobertas']].map(([n, l]) => (
                  <div key={l}>
                    <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 22, color: '#5FB8A8', margin: 0 }}>{n}</p>
                    <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                <img
                  src="https://images.unsplash.com/photo-1779049979022-77528c1aa6e3?w=800&h=600&fit=crop&auto=format"
                  alt="Tutora feliz com seu cão"
                  className="w-full h-full object-cover"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(95,184,168,0.2), transparent)' }} />
              </div>
              {/* Floating pill */}
              <div
                className="absolute flex items-center gap-3 bg-white rounded-2xl shadow-lg"
                style={{ bottom: -16, left: -16, padding: '12px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <span style={{ fontSize: 28 }}>💉</span>
                <div>
                  <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Próxima vacina</p>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#2D3748', margin: 0 }}>Thor — 15 Ago 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="pet-badge mb-3" style={{ display: 'inline-flex' }}>Funcionalidades</span>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 36, color: '#2D3748', margin: '8px 0 12px' }}>
              Tudo que o seu pet precisa
            </h2>
            <p style={{ fontSize: 16, color: '#718096', maxWidth: 520, margin: '0 auto' }}>
              Uma plataforma completa com todas as ferramentas para cuidar da saúde e bem-estar do seu companheiro.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="pet-card p-6 flex flex-col gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: f.color }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', marginBottom: 8 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#718096', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section style={{ padding: '80px 0', background: '#F7F7F7' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="pet-badge mb-2" style={{ display: 'inline-flex' }}>Blog</span>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 32, color: '#2D3748', margin: '8px 0 0' }}>
                Artigos recentes
              </h2>
            </div>
            <button className="pet-btn-secondary hidden sm:flex" style={{ fontSize: 13, padding: '9px 22px' }} onClick={() => navigate('blog')}>
              Ver todos →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(a => (
              <div key={a.id} className="pet-card cursor-pointer" onClick={() => navigate('article', { articleId: a.id })}>
                <div className="overflow-hidden" style={{ height: 200 }}>
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ borderRadius: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <div className="p-5">
                  <span className="pet-badge" style={{ marginBottom: 10, display: 'inline-flex' }}>{a.category}</span>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, color: '#2D3748', marginBottom: 12, lineHeight: 1.4 }}>
                    {a.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 12, color: '#718096' }}>por {a.author}</span>
                    <span style={{ fontSize: 12, color: '#718096' }}>{a.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #8FD8C8 0%, #5FB8A8 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 36, color: '#fff', marginBottom: 16 }}>
            Comece a cuidar melhor do seu pet hoje
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 36 }}>
            Crie sua conta gratuitamente e tenha todos os dados do seu pet sempre ao alcance.
          </p>
          <button
            className="pet-btn-primary"
            style={{ background: '#fff', color: '#5FB8A8', fontSize: 16, padding: '16px 40px', boxShadow: '0 6px 24px rgba(0,0,0,0.15)' }}
            onClick={() => navigate('register')}
          >
            Criar conta gratuita
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2D3748', color: '#A0AEC0', padding: '48px 0 32px' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ background: '#5FB8A8', fontSize: 14 }}>P</div>
                <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 18, color: '#fff' }}>SavePet</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>
                A plataforma completa para o cuidado e bem-estar do seu melhor amigo.
              </p>
            </div>
            {[
              { title: 'Plataforma', links: ['Dashboard', 'Meus Pets', 'Vacinação', 'Rastreamento'] },
              { title: 'Conteúdo', links: ['Blog', 'Categorias', 'Sobre nós', 'Contato'] },
              { title: 'Suporte', links: ['Central de ajuda', 'Privacidade', 'Termos de uso', 'Cookies'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ fontSize: 13, color: '#A0AEC0', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#8FD8C8')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#A0AEC0')}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ borderColor: '#4A5568' }}>
            <p style={{ fontSize: 12, margin: 0 }}>© 2026 SavePet. Todos os direitos reservados.</p>
            <p style={{ fontSize: 12, margin: 0 }}>Feito com ❤️ para tutores de pets</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
