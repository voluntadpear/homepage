import React from "react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const NightModeToggle = () => (
  <ThemeToggler>
    {({theme, toggleTheme}) => (
      <button className={`absolute m-8 top-0 right-0 border rounded-full border-grey flex items-center cursor-pointer w-15 bg-black ${theme === 'dark' ? 'justify-end' : 'justify-start'}`} onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')} role="checkbox" aria-checked={theme === 'dark'}>
      {theme === 'dark' && <span className="pl-1 text-white" role="img" aria-label="night mode on">🌙</span>}
      <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow" />
        {theme === 'light' && <span className="text-white" role="img" aria-label="night mode off">☀️</span>}
      </button>
    )}
  </ThemeToggler>
)

export default NightModeToggle
