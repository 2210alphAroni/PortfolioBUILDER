import React, { useRef, useState } from 'react'
import { translations } from '../data/i18n'

const IG = ({ label, children, LS }) => (
  <div style={{marginBottom:14}}>
    <label style={LS}>{label}</label>
    {children}
  </div>
)

const TABS = [
  {id:'basic',        icon:'👤', key:'basic'},
  {id:'links',        icon:'🔗', key:'links'},
  {id:'skills',       icon:'🛠',  key:'skills'},
  {id:'exp',          icon:'💼', key:'exp'},
  {id:'projects',     icon:'🚀', key:'projects'},
  {id:'edu',          icon:'🎓', key:'edu'},
  {id:'certs',        icon:'📜', key:'certs'},
  {id:'achieve',      icon:'🏆', key:'achieve'},      // ✅ নতুন
  {id:'testimonials', icon:'💬', key:'testimonials'}, // ✅ নতুন
  {id:'services',     icon:'🎯', key:'services'},     // ✅ নতুন
  {id:'stats',        icon:'📊', key:'stats'},        // ✅ নতুন
  {id:'theme',        icon:'🎨', key:'theme'},
]

const SimpleInput = ({ value, onChange, placeholder, IS }) => (
  <input style={IS} value={value} onChange={onChange} placeholder={placeholder} />
)

const SimpleTextarea = ({ value, onChange, placeholder, TS }) => (
  <textarea style={TS} value={value} onChange={onChange} placeholder={placeholder} />
)

export default function Editor({ data, set, setListItem, addListItem, removeListItem, themes, darkMode, lang }) {
  const [tab, setTab] = useState('basic')
  const fileRef = useRef()
  const dm = darkMode
  const t = translations[lang] || translations.en

  const IS = { width:'100%', background:dm?'#0f0f0f':'#ffffff', border:`1px solid ${dm?'#252525':'#d0d0d0'}`, borderRadius:8, padding:'10px 13px', color:dm?'#f0ece4':'#111111', fontSize:13, fontFamily:'inherit', outline:'none', boxSizing:'border-box', transition:'border-color 0.2s' }
  const TS = { ...IS, resize:'vertical', minHeight:88, lineHeight:1.7 }
  const LS = { display:'block', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:dm?'#555':'#999', marginBottom:6 }
  const CS = { background:dm?'#0d0d0d':'#f7f7f7', border:`1px solid ${dm?'#1e1e1e':'#e0e0e0'}`, borderRadius:10, padding:16, marginBottom:14 }
  const AS = { width:'100%', padding:'10px', background:'transparent', border:`1px dashed ${dm?'#2a2a2a':'#ccc'}`, borderRadius:8, color:dm?'#555':'#999', fontSize:12, fontWeight:600, letterSpacing:1, cursor:'pointer', transition:'all 0.15s' }

  const handleAvatar = e => {
    const f = e.target.files[0]; if(!f) return
    const r = new FileReader(); r.onload = ev => set('avatar', ev.target.result); r.readAsDataURL(f)
  }

  const RemoveBtn = ({ onClick }) => (
    <button style={{background:'none', border:'none', color:dm?'#555':'#999', cursor:'pointer', fontSize:18}} onClick={onClick}>×</button>
  )

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%', overflow:'hidden'}}>
      {/* Tabs */}
      <div style={{padding:'10px 12px', borderBottom:`1px solid ${dm?'#161616':'#e8e8e8'}`, display:'flex', gap:2, flexWrap:'wrap', background:dm?'#050505':'#fafafa', position:'sticky', top:0, zIndex:5}}>
        {TABS.map(item=>(
          <button key={item.id} onClick={()=>setTab(item.id)} style={{padding:'7px 11px', fontSize:11, fontWeight:600, letterSpacing:0.5, textTransform:'uppercase', border:'none', cursor:'pointer', borderRadius:6, transition:'all 0.15s', background:tab===item.id?'#e8d5b7':'transparent', color:tab===item.id?'#0a0a0a':dm?'#555':'#888'}}>
            <span style={{marginRight:4}}>{item.icon}</span>{t[item.key]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{flex:1, overflowY:'auto', padding:'22px 18px', background:dm?'#0a0a0a':'#ffffff'}}>

        {tab==='basic' && <>
          <IG label={t.fullName} LS={LS}>
            <SimpleInput IS={IS} value={data.name} onChange={e=>set('name',e.target.value)} placeholder={t.ph_name} />
          </IG>
          <IG label={t.titleRole} LS={LS}>
            <SimpleInput IS={IS} value={data.title} onChange={e=>set('title',e.target.value)} placeholder={t.ph_title} />
          </IG>
          <IG label={t.bioAbout} LS={LS}>
            <SimpleTextarea TS={TS} value={data.bio} onChange={e=>set('bio',e.target.value)} placeholder={t.ph_bio} />
          </IG>
          <IG label={t.profilePhoto} LS={LS}>
            <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
              {data.avatar && <img src={data.avatar} alt="av" style={{width:48, height:48, borderRadius:'50%', objectFit:'cover', border:`2px solid ${dm?'#333':'#ccc'}`}} />}
              <button onClick={()=>fileRef.current.click()} style={{padding:'8px 14px', background:dm?'#161616':'#f0f0f0', border:`1px solid ${dm?'#2a2a2a':'#ccc'}`, borderRadius:7, color:'#e8d5b7', fontSize:12, cursor:'pointer'}}>{data.avatar ? t.changePhoto : t.uploadPhoto}</button>
              {data.avatar && <button onClick={()=>set('avatar','')} style={{padding:'8px 14px', background:dm?'#1a0a0a':'#fff0f0', border:`1px solid ${dm?'#3d1010':'#ffcccc'}`, borderRadius:7, color:'#f87171', fontSize:12, cursor:'pointer'}}>{t.removePhoto}</button>}
              <input type="file" accept="image/*" hidden ref={fileRef} onChange={handleAvatar} />
            </div>
          </IG>
          <IG label={t.location} LS={LS}>
            <SimpleInput IS={IS} value={data.location} onChange={e=>set('location',e.target.value)} placeholder={t.ph_location} />
          </IG>
        </>}

        {tab==='links' && <>
          <IG label={t.emailAddress} LS={LS}><SimpleInput IS={IS} value={data.email} onChange={e=>set('email',e.target.value)} placeholder={t.ph_email} /></IG>
          <IG label={t.phoneNumber} LS={LS}><SimpleInput IS={IS} value={data.phone} onChange={e=>set('phone',e.target.value)} placeholder={t.ph_phone} /></IG>
          <IG label={t.websiteURL} LS={LS}><SimpleInput IS={IS} value={data.website} onChange={e=>set('website',e.target.value)} placeholder={t.ph_website} /></IG>
          <IG label={t.githubUsername} LS={LS}><SimpleInput IS={IS} value={data.github} onChange={e=>set('github',e.target.value)} placeholder={t.ph_github} /></IG>
          <IG label={t.linkedinUsername} LS={LS}><SimpleInput IS={IS} value={data.linkedin} onChange={e=>set('linkedin',e.target.value)} placeholder={t.ph_linkedin} /></IG>
          <IG label={t.twitterHandle} LS={LS}><SimpleInput IS={IS} value={data.twitter} onChange={e=>set('twitter',e.target.value)} placeholder={t.ph_twitter} /></IG>
        </>}

        {tab==='skills' && <>
          <IG label={t.skillsLabel} LS={LS}>
            <SimpleTextarea TS={TS} value={data.skills} onChange={e=>set('skills',e.target.value)} placeholder={t.ph_skills} />
          </IG>
          <IG label={t.languagesLabel} LS={LS}>
            <SimpleInput IS={IS} value={data.languages} onChange={e=>set('languages',e.target.value)} placeholder={t.ph_languages} />
          </IG>
        </>}

        {tab==='exp' && <>
          {data.experience.map((exp,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.experienceNum} #{i+1}</span>
                {data.experience.length>1 && <RemoveBtn onClick={()=>removeListItem('experience',i)} />}
              </div>
              <IG label={t.jobTitle} LS={LS}><SimpleInput IS={IS} value={exp.role} onChange={e=>setListItem('experience',i,'role',e.target.value)} placeholder={t.ph_role} /></IG>
              <IG label={t.company} LS={LS}><SimpleInput IS={IS} value={exp.company} onChange={e=>setListItem('experience',i,'company',e.target.value)} placeholder={t.ph_company} /></IG>
              <IG label={t.duration} LS={LS}><SimpleInput IS={IS} value={exp.duration} onChange={e=>setListItem('experience',i,'duration',e.target.value)} placeholder={t.ph_duration} /></IG>
              <IG label={t.description} LS={LS}><SimpleTextarea TS={TS} value={exp.desc} onChange={e=>setListItem('experience',i,'desc',e.target.value)} placeholder={t.ph_desc} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('experience',{company:'',role:'',duration:'',desc:''})}>{t.addExperience}</button>
        </>}

        {tab==='projects' && <>
          {data.projects.map((proj,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.projectNum} #{i+1}</span>
                {data.projects.length>1 && <RemoveBtn onClick={()=>removeListItem('projects',i)} />}
              </div>
              <IG label={t.projectName} LS={LS}><SimpleInput IS={IS} value={proj.name} onChange={e=>setListItem('projects',i,'name',e.target.value)} placeholder={t.ph_projName} /></IG>
              <IG label={t.repoLink} LS={LS}><SimpleInput IS={IS} value={proj.link} onChange={e=>setListItem('projects',i,'link',e.target.value)} placeholder={t.ph_projLink} /></IG>
              <IG label={t.technologies} LS={LS}><SimpleInput IS={IS} value={proj.tech} onChange={e=>setListItem('projects',i,'tech',e.target.value)} placeholder={t.ph_tech} /></IG>
              <IG label={t.description} LS={LS}><SimpleTextarea TS={TS} value={proj.desc} onChange={e=>setListItem('projects',i,'desc',e.target.value)} placeholder={t.ph_projDesc} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('projects',{name:'',desc:'',link:'',tech:''})}>{t.addProject}</button>
        </>}

        {tab==='edu' && <>
          {data.education.map((edu,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.educationNum} #{i+1}</span>
                {data.education.length>1 && <RemoveBtn onClick={()=>removeListItem('education',i)} />}
              </div>
              <IG label={t.schoolUniversity} LS={LS}><SimpleInput IS={IS} value={edu.school} onChange={e=>setListItem('education',i,'school',e.target.value)} placeholder={t.ph_school} /></IG>
              <IG label={t.degreeProgram} LS={LS}><SimpleInput IS={IS} value={edu.degree} onChange={e=>setListItem('education',i,'degree',e.target.value)} placeholder={t.ph_degree} /></IG>
              <IG label={t.yearPeriod} LS={LS}><SimpleInput IS={IS} value={edu.year} onChange={e=>setListItem('education',i,'year',e.target.value)} placeholder={t.ph_year} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('education',{school:'',degree:'',year:''})}>{t.addEducation}</button>
        </>}

        {tab==='certs' && <>
          {data.certifications.map((cert,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.certNum} #{i+1}</span>
                {data.certifications.length>1 && <RemoveBtn onClick={()=>removeListItem('certifications',i)} />}
              </div>
              <IG label={t.certName} LS={LS}><SimpleInput IS={IS} value={cert.name} onChange={e=>setListItem('certifications',i,'name',e.target.value)} placeholder={t.ph_certName} /></IG>
              <IG label={t.issuingBody} LS={LS}><SimpleInput IS={IS} value={cert.issuer} onChange={e=>setListItem('certifications',i,'issuer',e.target.value)} placeholder={t.ph_issuer} /></IG>
              <IG label={t.year} LS={LS}><SimpleInput IS={IS} value={cert.year} onChange={e=>setListItem('certifications',i,'year',e.target.value)} placeholder={t.ph_certYear} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('certifications',{name:'',issuer:'',year:''})}>{t.addCert}</button>
        </>}

        {/* ✅ ACHIEVEMENTS */}
        {tab==='achieve' && <>
          {data.achievements.map((a,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.achieveNum} #{i+1}</span>
                {data.achievements.length>1 && <RemoveBtn onClick={()=>removeListItem('achievements',i)} />}
              </div>
              <IG label={t.achieveTitle} LS={LS}><SimpleInput IS={IS} value={a.title} onChange={e=>setListItem('achievements',i,'title',e.target.value)} placeholder={t.ph_achieveTitle} /></IG>
              <IG label={t.achieveDesc} LS={LS}><SimpleTextarea TS={TS} value={a.desc} onChange={e=>setListItem('achievements',i,'desc',e.target.value)} placeholder={t.ph_achieveDesc} /></IG>
              <IG label={t.achieveYear} LS={LS}><SimpleInput IS={IS} value={a.year} onChange={e=>setListItem('achievements',i,'year',e.target.value)} placeholder={t.ph_achieveYear} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('achievements',{title:'',desc:'',year:''})}>{t.addAchieve}</button>
        </>}

        {/* ✅ TESTIMONIALS */}
        {tab==='testimonials' && <>
          {data.testimonials.map((t2,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.testiNum} #{i+1}</span>
                {data.testimonials.length>1 && <RemoveBtn onClick={()=>removeListItem('testimonials',i)} />}
              </div>
              <IG label={t.testiName} LS={LS}><SimpleInput IS={IS} value={t2.name} onChange={e=>setListItem('testimonials',i,'name',e.target.value)} placeholder={t.ph_testiName} /></IG>
              <IG label={t.testiRole} LS={LS}><SimpleInput IS={IS} value={t2.role} onChange={e=>setListItem('testimonials',i,'role',e.target.value)} placeholder={t.ph_testiRole} /></IG>
              <IG label={t.testiText} LS={LS}><SimpleTextarea TS={TS} value={t2.text} onChange={e=>setListItem('testimonials',i,'text',e.target.value)} placeholder={t.ph_testiText} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('testimonials',{name:'',role:'',text:''})}>{t.addTesti}</button>
        </>}

        {/* ✅ SERVICES */}
        {tab==='services' && <>
          {data.services.map((s,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.serviceNum} #{i+1}</span>
                {data.services.length>1 && <RemoveBtn onClick={()=>removeListItem('services',i)} />}
              </div>
              <IG label={t.serviceTitle} LS={LS}><SimpleInput IS={IS} value={s.title} onChange={e=>setListItem('services',i,'title',e.target.value)} placeholder={t.ph_serviceTitle} /></IG>
              <IG label={t.serviceDesc} LS={LS}><SimpleTextarea TS={TS} value={s.desc} onChange={e=>setListItem('services',i,'desc',e.target.value)} placeholder={t.ph_serviceDesc} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('services',{title:'',desc:''})}>{t.addService}</button>
        </>}

        {/* ✅ STATS */}
        {tab==='stats' && <>
          {data.stats.map((s,i)=>(
            <div key={i} style={CS}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontSize:11, color:dm?'#555':'#999', fontWeight:700, letterSpacing:1, textTransform:'uppercase'}}>{t.statNum} #{i+1}</span>
                {data.stats.length>1 && <RemoveBtn onClick={()=>removeListItem('stats',i)} />}
              </div>
              <IG label={t.statLabel} LS={LS}><SimpleInput IS={IS} value={s.label} onChange={e=>setListItem('stats',i,'label',e.target.value)} placeholder={t.ph_statLabel} /></IG>
              <IG label={t.statValue} LS={LS}><SimpleInput IS={IS} value={s.value} onChange={e=>setListItem('stats',i,'value',e.target.value)} placeholder={t.ph_statValue} /></IG>
            </div>
          ))}
          <button style={AS} onClick={()=>addListItem('stats',{label:'',value:''})}>{t.addStat}</button>
        </>}

        {tab==='theme' && <>
          <p style={{color:dm?'#555':'#999', fontSize:12, marginBottom:18, lineHeight:1.6}}>{t.themeDesc}</p>
          <div style={{display:'grid', gap:10}}>
            {themes.map(th=>(
              <div key={th.id} onClick={()=>set('themeId',th.id)} style={{display:'flex', alignItems:'center', gap:14, padding:'12px 16px', background:th.bg, border:`2px solid ${data.themeId===th.id?th.accent:th.border}`, borderRadius:10, cursor:'pointer', transition:'border-color 0.2s'}}>
                <span style={{fontSize:18}}>{th.emoji}</span>
                <div style={{display:'flex', gap:5}}>
                  {[th.bg,th.card,th.accent,th.text,th.sub].map((c,i)=><div key={i} style={{width:13,height:13,borderRadius:'50%',background:c,border:'1px solid #ffffff15'}} />)}
                </div>
                <span style={{color:th.text, fontWeight:600, fontSize:13, fontFamily:th.font, flex:1}}>{th.label}</span>
                {data.themeId===th.id && <span style={{color:th.accent, fontSize:16, fontWeight:700}}>✓</span>}
              </div>
            ))}
          </div>
        </>}

      </div>
    </div>
  )
}