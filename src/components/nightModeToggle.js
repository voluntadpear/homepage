import React from "react"

const NightModeToggle = ({nightMode, setNightMode}) => (
  <div className={`absolute m-8 top-0 right-0 border rounded-full border-grey flex items-center cursor-pointer w-15 bg-black ${nightMode ? 'justify-end' : 'justify-start'}`} onClick={() => setNightMode(!nightMode)} role="checkbox" aria-checked={nightMode}>
  {nightMode && <span className="pl-1 text-white" role="img" aria-label="night mode on">🌙</span>}
  <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow" />
    {!nightMode && <span className="text-white" role="img" aria-label="night mode off">☀️</span>}
</div>
)

export default NightModeToggle
