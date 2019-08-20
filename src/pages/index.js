import React from "react"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProfileCard from "../components/profileCard/profileCard"
import LatestPosts from "../components/latestPosts";


const IndexPage = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  return (
    <Layout trackingWider>
      <SEO noTitle={true} />
      <div className="max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex items-center h-auto lg:h-screen flex-wrap md:flex-no-wrap mx-auto my-32 lg:my-0">
        <ProfileCard />
        <LatestPosts posts={edges} />
        {/* Pin to top right corner */}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}, limit: 2) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            summary
          }
        }
      }
    }
  }
`

export default IndexPage
