/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import NightModeToggle from './nightModeToggle'


const Layout = ({ children, trackingWider }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if(!mounted) {
    setMounted(true)
    }
  }, [mounted])

  return (
      <div className={`font-sans antialiased theme-text-color leading-normal ${trackingWider ? 'tracking-wider' : ''}`}>
        <main>{children}</main>
        {mounted ?
        <NightModeToggle /> : null}
      </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
