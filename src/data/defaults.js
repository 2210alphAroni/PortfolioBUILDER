export const DEFAULT_DATA = {
  name: '', title: '', bio: '', avatar: '',
  email: '', phone: '', location: '', website: '', github: '', linkedin: '', twitter: '',
  skills: '', languages: '',
  experience:     [{ company:'', role:'', duration:'', desc:'' }],
  projects:       [{ name:'', desc:'', link:'', tech:'' }],
  education:      [{ school:'', degree:'', year:'' }],
  certifications: [{ name:'', issuer:'', year:'' }],

  // ✅ নতুন ৪টা
  achievements:  [{ title:'', desc:'', year:'' }],
  testimonials:  [{ name:'', role:'', text:'' }],
  services:      [{ title:'', desc:'' }],
  stats:         [{ label:'', value:'' }],

  themeId: 'noir',
}
export const STORAGE_KEY = 'pf_builder_v2'