import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'
import './styles.css'
import { useState, useEffect, useRef } from 'react'

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
      />
      <nav className="nav-container">
        <button 
          ref={buttonRef}
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div 
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
        >
          <ul className="nav-list">
            <li><a href="#home" onClick={handleMenuItemClick}>{t('nav.home')}</a></li>
            <li><a href="#skills" onClick={handleMenuItemClick}>{t('nav.skills')}</a></li>
            <li><a href="#projects" onClick={handleMenuItemClick}>{t('nav.projects')}</a></li>
            <li><a href="#contact" onClick={handleMenuItemClick}>{t('nav.contact')}</a></li>
          </ul>
        </div>
        
        <div className="controls">
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">EN</option>
            <option value="pt">PT</option>
          </select>
        </div>
      </nav>
    </header>
  )
}

export default Header 