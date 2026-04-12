import { getTheme } from '../data/themes'

export function generatePortfolioHTML(data) {
  const t = getTheme(data.themeId)
  const skills  = data.skills    ? data.skills.split(',').map(s=>s.trim()).filter(Boolean) : []
  const langs   = data.languages ? data.languages.split(',').map(s=>s.trim()).filter(Boolean) : []

  const hasExp   = data.experience.some(e=>e.company||e.role)
  const hasProj  = data.projects.some(p=>p.name)
  const hasEdu   = data.education.some(e=>e.school)
  const hasCerts = data.certifications?.some(c=>c.name)

  const tagStyle = `background:${t.accent}18;color:${t.accent};border:1px solid ${t.accent}44;border-radius:4px;padding:2px 10px;font-size:12px;font-weight:600;letter-spacing:0.3px;`

  const links = [
    data.email    && `<a href="mailto:${data.email}" style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;text-decoration:none;font-family:${t.mono}"><span style="color:${t.accent}">&#10005;</span>${data.email}</a>`,
    data.phone    && `<a href="tel:${data.phone}" style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;text-decoration:none;font-family:${t.mono}"><span style="color:${t.accent}">&#9990;</span>${data.phone}</a>`,
    data.location && `<span style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;font-family:${t.mono}"><span style="color:${t.accent}">&#9678;</span>${data.location}</span>`,
    data.website  && `<a href="${data.website}" target="_blank" style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;text-decoration:none;font-family:${t.mono}"><span style="color:${t.accent}">&#127760;</span>${data.website}</a>`,
    data.github   && `<a href="https://github.com/${data.github}" target="_blank" style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;text-decoration:none;font-family:${t.mono}"><span style="color:${t.accent}">GH</span>github/${data.github}</a>`,
    data.linkedin && `<a href="https://linkedin.com/in/${data.linkedin}" target="_blank" style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;text-decoration:none;font-family:${t.mono}"><span style="color:${t.accent}">in</span>${data.linkedin}</a>`,
    data.twitter  && `<a href="https://twitter.com/${data.twitter}" target="_blank" style="display:flex;align-items:center;gap:6px;background:${t.accent}15;color:${t.sub};border:1px solid ${t.accent}25;border-radius:20px;padding:4px 13px;font-size:12px;text-decoration:none;font-family:${t.mono}"><span style="color:${t.accent}">X</span>@${data.twitter}</a>`,
  ].filter(Boolean)

  const initials = data.name ? data.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '?'
  const avatarHTML = data.avatar
    ? `<img src="${data.avatar}" alt="${data.name}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;border:2px solid ${t.accent};flex-shrink:0;" />`
    : `<div style="width:88px;height:88px;border-radius:50%;background:${t.accent}22;border:2px solid ${t.accent};display:flex;align-items:center;justify-content:center;font-size:30px;color:${t.accent};font-weight:700;flex-shrink:0;">${initials}</div>`

  const sectionHTML = (title, content) => `
    <div style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
        <span style="color:${t.accent};font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;white-space:nowrap;">${title}</span>
        <div style="flex:1;height:1px;background:${t.accent}30;"></div>
      </div>
      ${content}
    </div>`

  let bodyHTML = ''

  if (skills.length > 0) {
    bodyHTML += sectionHTML('Skills', `<div style="display:flex;flex-wrap:wrap;gap:8px;">${skills.map(s=>`<span style="${tagStyle}">${s}</span>`).join('')}</div>`)
  }

  if (hasExp) {
    const expItems = data.experience.filter(e=>e.company||e.role).map(exp=>`
      <div style="margin-bottom:22px;padding-left:16px;border-left:2px solid ${t.accent}40;">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px;margin-bottom:2px;">
          <span style="font-weight:700;color:${t.text};font-size:15px;">${exp.role||'Role'}</span>
          <span style="color:${t.accent};font-family:${t.mono};font-size:12px;">${exp.duration}</span>
        </div>
        <div style="color:${t.sub};font-size:13px;margin-bottom:${exp.desc?'6px':'0'};">${exp.company}</div>
        ${exp.desc ? `<p style="margin:0;color:${t.sub};font-size:13px;line-height:1.7;">${exp.desc}</p>` : ''}
      </div>`).join('')
    bodyHTML += sectionHTML('Experience', expItems)
  }

  if (hasProj) {
    const projItems = `<div style="display:grid;gap:14px;">${data.projects.filter(p=>p.name).map(proj=>`
      <div style="background:${t.card};border:1px solid ${t.border};border-radius:10px;padding:16px 18px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
          <span style="font-weight:700;color:${t.accent};font-size:15px;">${proj.name}</span>
          ${proj.link ? `<a href="${proj.link}" target="_blank" style="color:${t.sub};font-size:11px;font-family:${t.mono};text-decoration:none;">view &rarr;</a>` : ''}
        </div>
        ${proj.desc ? `<p style="margin:0 0 10px;color:${t.sub};font-size:13px;line-height:1.7;">${proj.desc}</p>` : ''}
        ${proj.tech ? `<div style="display:flex;flex-wrap:wrap;gap:6px;">${proj.tech.split(',').map(t2=>t2.trim()).filter(Boolean).map(tech=>`<span style="${tagStyle}">${tech}</span>`).join('')}</div>` : ''}
      </div>`).join('')}</div>`
    bodyHTML += sectionHTML('Projects', projItems)
  }

  if (hasEdu) {
    const eduItems = data.education.filter(e=>e.school).map(edu=>`
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;flex-wrap:wrap;gap:4px;">
        <div>
          <div style="font-weight:700;color:${t.text};font-size:14px;">${edu.degree}</div>
          <div style="color:${t.sub};font-size:13px;">${edu.school}</div>
        </div>
        <span style="color:${t.accent};font-family:${t.mono};font-size:12px;">${edu.year}</span>
      </div>`).join('')
    bodyHTML += sectionHTML('Education', eduItems)
  }

  if (hasCerts) {
    const certItems = data.certifications.filter(c=>c.name).map(cert=>`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:4px;">
        <div>
          <div style="font-weight:600;color:${t.text};font-size:14px;">${cert.name}</div>
          ${cert.issuer ? `<div style="color:${t.sub};font-size:12px;">${cert.issuer}</div>` : ''}
        </div>
        ${cert.year ? `<span style="color:${t.accent};font-family:${t.mono};font-size:12px;">${cert.year}</span>` : ''}
      </div>`).join('')
    bodyHTML += sectionHTML('Certifications', certItems)
  }

  if (langs.length > 0) {
    bodyHTML += sectionHTML('Languages', `<div style="display:flex;flex-wrap:wrap;gap:8px;">${langs.map(l=>`<span style="${tagStyle}">${l}</span>`).join('')}</div>`)
  }

  const fontNames = []
  ;[t.font, t.mono].forEach(f => {
    const m = f.match(/'([^']+)'/)
    if (m) fontNames.push(m[1])
  })
  const uniqueFonts = [...new Set(fontNames)]
  const googleFontsURL = uniqueFonts.length
    ? `https://fonts.googleapis.com/css2?${uniqueFonts.map(f=>`family=${f.replace(/ /g,'+')}`).join('&')}&display=swap`
    : null

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name || 'Portfolio'}</title>
  ${googleFontsURL ? `<link rel="stylesheet" href="${googleFontsURL}" />` : ''}
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin:0; padding:24px; background:#030303; font-family:${t.font}; min-height:100vh; display:flex; justify-content:center; }
    .wrap { width:100%; max-width:860px; }
    @media(max-width:600px){ body{padding:12px;} .hero-flex{flex-direction:column !important;} }
  </style>
</head>
<body>
  <div class="wrap">
    <div style="background:${t.bg};color:${t.text};font-family:${t.font};border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px ${t.border};">
      <div style="background:${t.heroGrad};padding:40px 36px 32px;border-bottom:1px solid ${t.border};">
        <div class="hero-flex" style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">
          ${avatarHTML}
          <div style="flex:1;min-width:160px;">
            <h1 style="margin:0 0 6px;font-size:30px;font-weight:700;color:${t.text};line-height:1.1;letter-spacing:-0.5px;">${data.name||'Your Name'}</h1>
            <p style="margin:0 0 14px;color:${t.accent};font-family:${t.mono};font-size:13px;letter-spacing:1px;">${data.title||'Your Title'}</p>
            ${data.bio ? `<p style="margin:0;color:${t.sub};font-size:14px;line-height:1.75;max-width:500px;">${data.bio}</p>` : ''}
          </div>
        </div>
        ${links.length > 0 ? `<div style="margin-top:22px;display:flex;flex-wrap:wrap;gap:10px;">${links.join('')}</div>` : ''}
      </div>
      <div style="padding:32px 36px;">${bodyHTML}</div>
      <div style="padding:14px 36px;border-top:1px solid ${t.border};text-align:center;color:${t.sub};font-size:10px;font-family:${t.mono};opacity:0.5;">
        built with portfolio builder &middot; by Md. Nabinur Islam Roni
      </div>
    </div>
  </div>
</body>
</html>`
}
