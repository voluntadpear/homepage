import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProfileCard from "../components/profileCard"
import NightModeToggle from "../components/nightModeToggle";

const IndexPage = () => {
  const [nightMode, setNightMode] = useState(false)
  return (
  <Layout nightMode={nightMode}>
    <SEO title="Home" />
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <ProfileCard nightMode={nightMode}/>
      {/* Pin to top right corner */}
      <NightModeToggle nightMode={nightMode} setNightMode={setNightMode} />
    </div>
  </Layout>
)
}

export default IndexPage
