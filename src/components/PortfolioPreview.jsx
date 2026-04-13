import React from 'react'

const Avatar = ({ src, name, size=96, accent }) => {
  if (src) return <img src={src} alt={name} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',border:`2px solid ${accent}`,flexShrink:0}} />
  const init = name ? name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '?'
  return <div style={{width:size,height:size,borderRadius:'50%',background:accent+'22',border:`2px solid ${accent}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.35,color:accent,fontWeight:700,flexShrink:0}}>{init}</div>
}

const Tag = ({ children, accent }) => (
  <span style={{background:accent+'18',color:accent,border:`1px solid ${accent}44`,borderRadius:4,padding:'2px 10px',fontSize:12,fontWeight:600,letterSpacing:0.3}}>{children}</span>
)

const Divider = ({ accent }) => <div style={{flex:1,height:1,background:accent+'30'}} />

const Section = ({ title, accent, children }) => (
  <div style={{marginBottom:32}}>
    <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
      <span style={{color:accent,fontSize:10,fontWeight:700,letterSpacing:3,textTransform:'uppercase',whiteSpace:'nowrap'}}>{title}</span>
      <Divider accent={accent} />
    </div>
    {children}
  </div>
)

export default function PortfolioPreview({ data, theme: t }) {
  const skills  = data.skills    ? data.skills.split(',').map(s=>s.trim()).filter(Boolean) : []
  const langs   = data.languages ? data.languages.split(',').map(s=>s.trim()).filter(Boolean) : []
  const links   = [
    data.email    && { icon:'✉',  label:data.email,             href:`mailto:${data.email}` },
    data.phone    && { icon:'☎',  label:data.phone,             href:`tel:${data.phone}` },
    data.location && { icon:'◎',  label:data.location },
    data.website  && { icon:'🌐', label:data.website,            href:data.website },
    data.github   && { icon:'⌥',  label:`github/${data.github}`, href:`https://github.com/${data.github}` },
    data.linkedin && { icon:'in', label:data.linkedin,           href:`https://linkedin.com/in/${data.linkedin}` },
    data.twitter  && { icon:'𝕏',  label:`@${data.twitter}`,      href:`https://twitter.com/${data.twitter}` },
  ].filter(Boolean)

  return (
    <div style={{background:t.bg,color:t.text,fontFamily:t.font,minHeight:'100%',borderRadius:16,overflow:'hidden',boxShadow:`0 0 0 1px ${t.border}`}}>

      {/* Hero */}
      <div style={{background:t.heroGrad,padding:'40px 36px 32px',borderBottom:`1px solid ${t.border}`}}>
        <div style={{display:'flex',gap:24,alignItems:'flex-start',flexWrap:'wrap'}}>
          <Avatar src={data.avatar} name={data.name} size={88} accent={t.accent} />
          <div style={{flex:1,minWidth:160}}>
            <h1 style={{margin:'0 0 6px',fontSize:30,fontWeight:700,color:t.text,lineHeight:1.1,letterSpacing:-0.5}}>{data.name||'Your Name'}</h1>
            <p style={{margin:'0 0 14px',color:t.accent,fontFamily:t.mono,fontSize:13,letterSpacing:1}}>{data.title||'Your Title'}</p>
            {data.bio && <p style={{margin:0,color:t.sub,fontSize:14,lineHeight:1.75,maxWidth:500}}>{data.bio}</p>}
          </div>
        </div>
        {links.length>0 && (
          <div style={{marginTop:22,display:'flex',flexWrap:'wrap',gap:10}}>
            {links.map((l,i)=>(
              <a key={i} href={l.href||'#'} target="_blank" rel="noreferrer"
                style={{display:'flex',alignItems:'center',gap:6,background:t.accent+'15',color:t.sub,border:`1px solid ${t.accent}25`,borderRadius:20,padding:'4px 13px',fontSize:12,textDecoration:'none',fontFamily:t.mono}}>
                <span style={{color:t.accent}}>{l.icon}</span> {l.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{padding:'32px 36px'}}>

        {skills.length>0 && (
          <Section title="Skills" accent={t.accent}>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>{skills.map((s,i)=><Tag key={i} accent={t.accent}>{s}</Tag>)}</div>
          </Section>
        )}

        {data.experience.some(e=>e.company||e.role) && (
          <Section title="Experience" accent={t.accent}>
            {data.experience.filter(e=>e.company||e.role).map((exp,i)=>(
              <div key={i} style={{marginBottom:22,paddingLeft:16,borderLeft:`2px solid ${t.accent}40`}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:4,marginBottom:2}}>
                  <span style={{fontWeight:700,color:t.text,fontSize:15}}>{exp.role||'Role'}</span>
                  <span style={{color:t.accent,fontFamily:t.mono,fontSize:12}}>{exp.duration}</span>
                </div>
                <div style={{color:t.sub,fontSize:13,marginBottom:exp.desc?6:0}}>{exp.company}</div>
                {exp.desc && <p style={{margin:0,color:t.sub,fontSize:13,lineHeight:1.7}}>{exp.desc}</p>}
              </div>
            ))}
          </Section>
        )}

        {data.projects.some(p=>p.name) && (
          <Section title="Projects" accent={t.accent}>
            <div style={{display:'grid',gap:14}}>
              {data.projects.filter(p=>p.name).map((proj,i)=>(
                <div key={i} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:10,padding:'16px 18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,flexWrap:'wrap',gap:8}}>
                    <span style={{fontWeight:700,color:t.accent,fontSize:15}}>{proj.name}</span>
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{color:t.sub,fontSize:11,fontFamily:t.mono,textDecoration:'none'}}>→ view</a>}
                  </div>
                  {proj.desc && <p style={{margin:'0 0 10px',color:t.sub,fontSize:13,lineHeight:1.7}}>{proj.desc}</p>}
                  {proj.tech && (
                    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                      {proj.tech.split(',').map(t2=>t2.trim()).filter(Boolean).map((tech,j)=><Tag key={j} accent={t.accent}>{tech}</Tag>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.education.some(e=>e.school) && (
          <Section title="Education" accent={t.accent}>
            {data.education.filter(e=>e.school).map((edu,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14,flexWrap:'wrap',gap:4}}>
                <div>
                  <div style={{fontWeight:700,color:t.text,fontSize:14}}>{edu.degree}</div>
                  <div style={{color:t.sub,fontSize:13}}>{edu.school}</div>
                </div>
                <span style={{color:t.accent,fontFamily:t.mono,fontSize:12}}>{edu.year}</span>
              </div>
            ))}
          </Section>
        )}

        {data.certifications?.some(c=>c.name) && (
          <Section title="Certifications" accent={t.accent}>
            {data.certifications.filter(c=>c.name).map((cert,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,flexWrap:'wrap',gap:4}}>
                <div>
                  <div style={{fontWeight:600,color:t.text,fontSize:14}}>{cert.name}</div>
                  {cert.issuer && <div style={{color:t.sub,fontSize:12}}>{cert.issuer}</div>}
                </div>
                {cert.year && <span style={{color:t.accent,fontFamily:t.mono,fontSize:12}}>{cert.year}</span>}
              </div>
            ))}
          </Section>
        )}

        {langs.length>0 && (
          <Section title="Languages" accent={t.accent}>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>{langs.map((l,i)=><Tag key={i} accent={t.accent}>{l}</Tag>)}</div>
          </Section>
        )}

      </div>

      <div style={{padding:'14px 36px',borderTop:`1px solid ${t.border}`,textAlign:'center',color:t.sub,fontSize:10,fontFamily:t.mono,opacity:0.5}}>
        2026 All Right Reserved. portfolio builder.
      </div>
    </div>
  )
}
