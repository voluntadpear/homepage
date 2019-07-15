/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

const Layout = ({ children, nightMode }) => {
  return (
    <div className={`font-sans antialiased ${nightMode ? 'text-gray-100' : 'text-gray-900'} leading-normal tracking-wider`}>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
