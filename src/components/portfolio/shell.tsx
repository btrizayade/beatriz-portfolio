import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import linkedinIcon from '@/assets/linkedin-icon.png.asset.json';
import githubIcon from '@/assets/github-icon.png.asset.json';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const items = [{ to: '/', label: 'Início' }, { to: '/projetos', label: 'Projetos' }, { to: '/mural', label: 'Mural' }, { to: '/sobre', label: 'Sobre & contato' }] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner"><Link to="/" className="wordmark" aria-label="Beatriz Ayade, início">B<span className="logo-asterisk">✳</span><span className="wordmark-caption">BEATRIZ AYADE</span></Link><nav className="desktop-nav" aria-label="Navegação principal">{items.map(item => <Button asChild variant="ghost" key={item.to} className="nav-link"><Link to={item.to} activeProps={{ className: 'nav-active' }} activeOptions={{ exact: item.to === '/' }}>{item.label}{item.to === '/mural' && <span className="nav-star">✧</span>}</Link></Button>)}</nav><a href="https://github.com/btrizayade" target="_blank" rel="noreferrer" className="header-github" aria-label="GitHub de Beatriz"><img src={githubIcon.url} width={782} height={765} alt="" className="social-icon"/></a><Button variant="ghost" size="icon" className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</Button></div>{open && <nav className="mobile-nav" aria-label="Navegação móvel">{items.map(item => <Button asChild variant="ghost" key={item.to}><Link to={item.to} onClick={() => setOpen(false)}>{item.label}</Link></Button>)}</nav>}</header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Link to="/" className="footer-name">Beatriz Ayade<span>✳</span></Link><p>Construindo tecnologia<br/> com propósito.</p><div className="footer-links"><a href="https://www.linkedin.com/in/beatriz-ayade/" target="_blank" rel="noreferrer"><img src={linkedinIcon.url} width={709} height={708} alt="" className="social-icon"/>LinkedIn</a><a href="https://github.com/btrizayade" target="_blank" rel="noreferrer"><img src={githubIcon.url} width={782} height={765} alt="" className="social-icon"/>GitHub</a><Link to="/sobre"><ArrowUpRight size={14}/></Link></div></div><div className="footer-bottom"><span>© 2026 Beatriz Ayade</span><span><span className="pink-heart">♡</span></span></div></footer>;
}
