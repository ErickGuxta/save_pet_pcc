import type { NavProps } from '../App'

const related = [
  { id: 2, image: 'https://images.unsplash.com/photo-1562874855-988ba2330251?w=400&h=260&fit=crop&auto=format', category: 'Nutrição', title: 'A dieta ideal para gatos em todas as fases da vida' },
  { id: 3, image: 'https://images.unsplash.com/photo-1715475160658-39c34218fb84?w=400&h=260&fit=crop&auto=format', category: 'Bem-estar', title: 'Como manter seu cão ativo e feliz no inverno' },
]

export default function Article({ navigate }: NavProps) {
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
            <button className="pet-btn-ghost" style={{ fontSize: 13 }} onClick={() => navigate('blog')}>← Blog</button>
            <button className="pet-btn-primary" style={{ fontSize: 13, padding: '9px 20px' }} onClick={() => navigate('register')}>Cadastrar</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Article */}
          <article className="lg:col-span-2">
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: '16/9', background: '#F5EBDD' }}>
              <img
                src="https://images.unsplash.com/photo-1770836037289-e00e5f351d11?w=900&h=500&fit=crop&auto=format"
                alt="Vacinação em cães"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="pet-badge">Saúde</span>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>01 de agosto de 2026</span>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>·</span>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>⏱ 5 min de leitura</span>
            </div>

            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 34px)', color: '#2D3748', lineHeight: 1.2, marginBottom: 20 }}>
              Vacinação em cães: calendário completo por faixa etária
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-6" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ width: 44, height: 44, borderRadius: 50, background: '#D9F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins', fontWeight: 800, color: '#5FB8A8', fontSize: 17 }}>
                A
              </div>
              <div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#2D3748', margin: 0 }}>Dra. Ana Silva</p>
                <p style={{ fontSize: 12, color: '#718096', margin: 0 }}>Médica Veterinária — CRMV-SP 12.345</p>
              </div>
            </div>

            {/* Content */}
            <div style={{ fontSize: 16, lineHeight: 1.8, color: '#4A5568' }}>
              <p style={{ marginBottom: 20 }}>
                A vacinação é uma das formas mais eficazes de proteger a saúde do seu cão. Por meio das vacinas, o organismo desenvolve defesas contra doenças graves, muitas delas potencialmente fatais. Mas para que a proteção seja completa, é essencial seguir um calendário de vacinação adequado para cada fase da vida do animal.
              </p>

              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, color: '#2D3748', margin: '32px 0 16px' }}>
                Por que vacinar seu cão?
              </h2>
              <p style={{ marginBottom: 20 }}>
                As vacinas estimulam o sistema imunológico a produzir anticorpos contra determinados agentes infecciosos. Dessa forma, caso o animal entre em contato com o vírus ou bactéria real, seu organismo estará preparado para combatê-lo com rapidez e eficiência, reduzindo drasticamente o risco de adoecimento grave.
              </p>

              {/* Callout */}
              <div style={{ background: '#D9F2EE', borderLeft: '4px solid #5FB8A8', borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '28px 0', display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 22 }}>💡</span>
                <p style={{ fontSize: 15, color: '#2D3748', fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                  Dica importante: filhotes precisam completar o esquema básico antes de ter contato com outros animais ou de frequentar locais públicos para garantir a imunização adequada.
                </p>
              </div>

              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, color: '#2D3748', margin: '32px 0 16px' }}>
                Calendário de vacinação para filhotes
              </h2>

              {[
                { age: '6 a 8 semanas', vaccine: 'V8 ou V10 — 1ª dose', desc: 'Proteção inicial contra as principais doenças virais e bacterianas.' },
                { age: '10 a 12 semanas', vaccine: 'V8 ou V10 — 2ª dose + Giárdia', desc: 'Reforço do esquema básico e proteção contra a Giárdia.' },
                { age: '14 a 16 semanas', vaccine: 'V8 ou V10 — 3ª dose + Antirrábica', desc: 'Conclusão do esquema e vacinação antirrábica obrigatória.' },
              ].map(row => (
                <div key={row.age} className="flex gap-4 mb-4 p-4 rounded-2xl" style={{ background: '#F7F7F7' }}>
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#5FB8A8', background: '#D9F2EE', padding: '3px 8px', borderRadius: 50, whiteSpace: 'nowrap' }}>
                      {row.age}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 14, color: '#2D3748', margin: '0 0 4px' }}>{row.vaccine}</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: 0 }}>{row.desc}</p>
                  </div>
                </div>
              ))}

              <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 22, color: '#2D3748', margin: '32px 0 16px' }}>
                Reforços anuais
              </h2>
              <p style={{ marginBottom: 20 }}>
                Após a conclusão do esquema básico de filhote, o cão adulto deve receber reforços anuais da V8 ou V10 e da vacina antirrábica. Isso garante que os anticorpos permaneçam em níveis protetores ao longo de toda a vida do animal.
              </p>
              <p>
                Consulte sempre o seu médico veterinário para avaliar quais vacinas são mais indicadas para o estilo de vida e a região onde o seu cão vive. Registre todas as vacinas no SavePet para nunca perder uma data de reforço!
              </p>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-8 pt-6" style={{ borderTop: '1px solid #F0F0F0' }}>
              {['Saúde', 'Vacinação', 'Cão', 'Filhote', 'Veterinário'].map(tag => (
                <span key={tag} style={{ background: '#F7F7F7', color: '#718096', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 50 }}>
                  # {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            {/* CTA */}
            <div className="pet-card p-6 mb-6" style={{ background: 'linear-gradient(135deg, #D9F2EE 0%, #F5EBDD 100%)', textAlign: 'center' }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>🐾</span>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 17, color: '#2D3748', marginBottom: 8 }}>
                Nunca perca uma vacina
              </h3>
              <p style={{ fontSize: 13, color: '#718096', marginBottom: 16, lineHeight: 1.6 }}>
                Cadastre seu pet e receba lembretes automáticos de vacinação.
              </p>
              <button className="pet-btn-primary w-full" style={{ fontSize: 13 }} onClick={() => navigate('register')}>
                Criar conta grátis
              </button>
            </div>

            {/* Related Articles */}
            <div className="pet-card p-6">
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 15, color: '#2D3748', marginBottom: 16 }}>
                Artigos relacionados
              </h3>
              <div className="flex flex-col gap-4">
                {related.map(r => (
                  <div
                    key={r.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate('article', { articleId: r.id })}
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="rounded-xl object-cover shrink-0"
                      style={{ width: 70, height: 56, flexShrink: 0 }}
                    />
                    <div>
                      <span className="pet-badge" style={{ fontSize: 10, padding: '2px 8px', marginBottom: 5, display: 'inline-flex' }}>{r.category}</span>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#2D3748', lineHeight: 1.4, margin: 0 }}>{r.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
