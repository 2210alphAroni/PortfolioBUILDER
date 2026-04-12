import React, { useRef, useState, useCallback } from 'react'

const IS = { width:'100%',background:'#0f0f0f',border:'1px solid #252525',borderRadius:8,padding:'10px 13px',color:'#f0ece4',fontSize:13,fontFamily:'inherit',outline:'none',boxSizing:'border-box',transition:'border-color 0.2s' }
const TS = { ...IS, resize:'vertical', minHeight:88, lineHeight:1.7 }
const LS = { display:'block',fontSize:10,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'#555',marginBottom:6 }
const CS = { background:'#0d0d0d',border:'1px solid #1e1e1e',borderRadius:10,padding:16,marginBottom:14 }
const AS = { width:'100%',padding:'10px',background:'transparent',border:'1px dashed #2a2a2a',borderRadius:8,color:'#555',fontSize:12,fontWeight:600,letterSpacing:1,cursor:'pointer',transition:'all 0.15s' }

const IG = ({ label, children }) => (
  <div style={{marginBottom:14}}>
    <label style={LS}>{label}</label>
    {children}
  </div>
)

const TABS = [
  {id:'basic',    icon:'👤',label:'Basic'},
  {id:'links',    icon:'🔗',label:'Links'},
  {id:'skills',   icon:'🛠', label:'Skills'},
  {id:'exp',      icon:'💼',label:'Experience'},
  {id:'projects', icon:'🚀',label:'Projects'},
  {id:'edu',      icon:'🎓',label:'Education'},
  {id:'certs',    icon:'📜',label:'Certs'},
  {id:'theme',    icon:'🎨',label:'Theme'},
]

// ✅ FIX: These are defined OUTSIDE the Editor component so they don't remount on every render
const SimpleInput = ({ value, onChange, placeholder }) => (
  <input style={IS} value={value} onChange={onChange} placeholder={placeholder} />
)

const SimpleTextarea = ({ value, onChange, placeholder }) => (
  <textarea style={TS} value={value} onChange={onChange} placeholder={placeholder} />
)

export default function Editor({ data, set, setListItem, addListItem, removeListItem, themes }) {
  const [tab, setTab] = useState('basic')
  const fileRef = useRef()

  const handleAvatar = e => {
    const f = e.target.files[0]; if(!f) return
    const r = new FileReader(); r.onload = ev => set('avatar', ev.target.result); r.readAsDataURL(f)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%',overflow:'hidden'}}>
      {/* Tabs */}
      <div style={{padding:'10px 12px',borderBottom:'1px solid #161616',display:'flex',gap:2,flexWrap:'wrap',background:'#050505',position:'sticky',top:0,zIndex:5}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'7px 11px',fontSize:11,fontWeight:600,letterSpacing:0.5,textTransform:'uppercase',border:'none',cursor:'pointer',borderRadius:6,transition:'all 0.15s',background:tab===t.id?'#e8d5b7':'transparent',color:tab===t.id?'#0a0a0a':'#555'}}>
            <span style={{marginRight:4}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{flex:1,overflowY:'auto',padding:'22px 18px'}}>

        {tab==='basic' && <>
          <IG label="Full Name">
            <SimpleInput value={data.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Rahim Chowdhury" />
          </IG>
          <IG label="Title / Role">
            <SimpleInput value={data.title} onChange={e=>set('title',e.target.value)} placeholder="e.g. Full Stack Developer" />
          </IG>
          <IG label="Bio / About">
            <SimpleTextarea value={data.bio} onChange={e=>set('bio',e.target.value)} placeholder="A brief intro about yourself..." />
          </IG>
          <IG label="Profile Photo">
            <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
              {data.avatar && <img src={data.avatar} alt="av" style={{width:48,height:48,borderRadius:'50%',objectFit:'cover',border:'2px solid #333'}} />}
              <button onClick={()=>fileRef.current.click()} style={{padding:'8px 14px',background:'#161616',border:'1px solid #2a2a2a',borderRadius:7,color:'#e8d5b7',fontSize:12,cursor:'pointer'}}>{data.avatar?'Change Photo':'Upload Photo'}</button>
              {data.avatar && <button onClick={()=>set('avatar','')} style={{padding:'8px 14px',background:'#1a0a0a',border:'1px solid #3d1010',borderRadius:7,color:'#f87171',fontSize:12,cursor:'pointer'}}>Remove</button>}
              <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleAvatar} />
            </div>
          </IG>
          <IG label="Location">
            <SimpleInput value={data.location} onChange={e=>set('location',e.target.value)} placeholder="Dhaka, Bangladesh" />
          </IG>
        </>}

        {tab==='links' && <>
          <IG label="Email Address">
            <SimpleInput value={data.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com" />
          </IG>
          <IG label="Phone Number">
            <SimpleInput value={data.phone} onChange={e=>set('phone',e.target.value)} placeholder="+880 1xxx-xxxxxx" />
          </IG>
          <IG label="Website URL">
            <SimpleInput value={data.website} onChange={e=>set('website',e.target.value)} placeholder="https://yoursite.com" />
          </IG>
          <IG label="GitHub Username">
            <SimpleInput value={data.github} onChange={e=>set('github',e.target.value)} placeholder="yourusername" />
          </IG>
          <IG label="LinkedIn Username">
            <SimpleInput value={data.linkedin} onChange={e=>set('linkedin',e.target.value)} placeholder="yourprofile" />
          </IG>
          <IG label="Twitter / X Handle">
            <SimpleInput value={data.twitter} onChange={e=>set('twitter',e.target.value)} placeholder="yourhandle" />
          </IG>
        </>}

        {tab==='skills' && <>
          <IG label="Skills (comma separated)">
            <SimpleTextarea value={data.skills} onChange={e=>set('skills',e.target.value)} placeholder="React, Node.js, Python, TypeScript, Figma, Docker..." />
          </IG>
          <IG label="Languages (comma separated)">
            <SimpleInput value={data.languages} onChange={e=>set('languages',e.target.value)} placeholder="Bengali, English, Hindi" />
          </IG>
        </>}

        {tab==='exp' && <>
          {data.experience.map((exp,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:11,color:'#555',fontWeight:700,letterSpacing:1,textTransform:'uppercase'}}>Experience #{i+1}</span>
                {data.experience.length>1 && <button style={{background:'none',border:'none',color:'#555',cursor:'pointer',fontSize:18}} onClick={()=>removeListItem('experience',i)}>×</button>}
              </div>
              <IG label="Job Title">
                <SimpleInput value={exp.role} onChange={e=>setListItem('experience',i,'role',e.target.value)} placeholder="Software Engineer" />
              </IG>
              <IG label="Company">
                <SimpleInput value={exp.company} onChange={e=>setListItem('experience',i,'company',e.target.value)} placeholder="Tech Corp Ltd." />
              </IG>
              <IG label="Duration">
                <SimpleInput value={exp.duration} onChange={e=>setListItem('experience',i,'duration',e.target.value)} placeholder="2022 – Present" />
              </IG>
              <IG label="Description">
                <SimpleTextarea value={exp.desc} onChange={e=>setListItem('experience',i,'desc',e.target.value)} placeholder="Key responsibilities and achievements..." />
              </IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('experience',{company:'',role:'',duration:'',desc:''})}>+ Add Experience</button>
        </>}

        {tab==='projects' && <>
          {data.projects.map((proj,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:11,color:'#555',fontWeight:700,letterSpacing:1,textTransform:'uppercase'}}>Project #{i+1}</span>
                {data.projects.length>1 && <button style={{background:'none',border:'none',color:'#555',cursor:'pointer',fontSize:18}} onClick={()=>removeListItem('projects',i)}>×</button>}
              </div>
              <IG label="Project Name">
                <SimpleInput value={proj.name} onChange={e=>setListItem('projects',i,'name',e.target.value)} placeholder="My Awesome App" />
              </IG>
              <IG label="Live / Repo Link">
                <SimpleInput value={proj.link} onChange={e=>setListItem('projects',i,'link',e.target.value)} placeholder="https://github.com/you/project" />
              </IG>
              <IG label="Technologies (comma sep)">
                <SimpleInput value={proj.tech} onChange={e=>setListItem('projects',i,'tech',e.target.value)} placeholder="React, Firebase, Tailwind" />
              </IG>
              <IG label="Description">
                <SimpleTextarea value={proj.desc} onChange={e=>setListItem('projects',i,'desc',e.target.value)} placeholder="What does this project do?" />
              </IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('projects',{name:'',desc:'',link:'',tech:''})}>+ Add Project</button>
        </>}

        {tab==='edu' && <>
          {data.education.map((edu,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:11,color:'#555',fontWeight:700,letterSpacing:1,textTransform:'uppercase'}}>Education #{i+1}</span>
                {data.education.length>1 && <button style={{background:'none',border:'none',color:'#555',cursor:'pointer',fontSize:18}} onClick={()=>removeListItem('education',i)}>×</button>}
              </div>
              <IG label="School / University">
                <SimpleInput value={edu.school} onChange={e=>setListItem('education',i,'school',e.target.value)} placeholder="BUET" />
              </IG>
              <IG label="Degree / Program">
                <SimpleInput value={edu.degree} onChange={e=>setListItem('education',i,'degree',e.target.value)} placeholder="B.Sc in Computer Science" />
              </IG>
              <IG label="Year / Period">
                <SimpleInput value={edu.year} onChange={e=>setListItem('education',i,'year',e.target.value)} placeholder="2018 – 2022" />
              </IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('education',{school:'',degree:'',year:''})}>+ Add Education</button>
        </>}

        {tab==='certs' && <>
          {data.certifications.map((cert,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <span style={{fontSize:11,color:'#555',fontWeight:700,letterSpacing:1,textTransform:'uppercase'}}>Cert #{i+1}</span>
                {data.certifications.length>1 && <button style={{background:'none',border:'none',color:'#555',cursor:'pointer',fontSize:18}} onClick={()=>removeListItem('certifications',i)}>×</button>}
              </div>
              <IG label="Certificate Name">
                <SimpleInput value={cert.name} onChange={e=>setListItem('certifications',i,'name',e.target.value)} placeholder="AWS Certified Developer" />
              </IG>
              <IG label="Issuing Body">
                <SimpleInput value={cert.issuer} onChange={e=>setListItem('certifications',i,'issuer',e.target.value)} placeholder="Amazon Web Services" />
              </IG>
              <IG label="Year">
                <SimpleInput value={cert.year} onChange={e=>setListItem('certifications',i,'year',e.target.value)} placeholder="2023" />
              </IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('certifications',{name:'',issuer:'',year:''})}>+ Add Certification</button>
        </>}

        {tab==='theme' && <>
          <p style={{color:'#555',fontSize:12,marginBottom:18,lineHeight:1.6}}>Choose from 20 handcrafted themes.</p>
          <div style={{display:'grid',gap:10}}>
            {themes.map(t=>(
              <div key={t.id} onClick={()=>set('themeId',t.id)} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 16px',background:t.bg,border:`2px solid ${data.themeId===t.id?t.accent:t.border}`,borderRadius:10,cursor:'pointer',transition:'border-color 0.2s'}}>
                <span style={{fontSize:18}}>{t.emoji}</span>
                <div style={{display:'flex',gap:5}}>
                  {[t.bg,t.card,t.accent,t.text,t.sub].map((c,i)=><div key={i} style={{width:13,height:13,borderRadius:'50%',background:c,border:'1px solid #ffffff15'}} />)}
                </div>
                <span style={{color:t.text,fontWeight:600,fontSize:13,fontFamily:t.font,flex:1}}>{t.label}</span>
                {data.themeId===t.id && <span style={{color:t.accent,fontSize:16,fontWeight:700}}>✓</span>}
              </div>
            ))}
          </div>
        </>}

      </div>
    </div>
  )
}
