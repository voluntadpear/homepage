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
  return (
      <div className={`font-sans antialiased theme-text-color leading-normal ${trackingWider ? 'tracking-wider' : ''}`}>
        <main>{children}</main>
        <NightModeToggle />
      </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
