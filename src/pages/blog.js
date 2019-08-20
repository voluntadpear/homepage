import { graphql, Link } from 'gatsby';
import React from 'react';
import PostLink from '../components/postLink';
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPosts = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const posts = edges
  .filter(edge => Boolean(edge.node.frontmatter.date))
  .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Blog" />
      <main className="mx-auto max-w-md lg:max-w-2xl my-8">
      <header className="text-3xl font-bold mb-8">
      <Link to="/" className="hover:underline">Guillermo Peralta</Link></header>
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="w-4/5 pt-3 border-b-2 border-blue-500 opacity-50 mb-8" />
        {posts}
        <p className="mt-16">
          <Link to="/" className="underline hover:no-underline default-link">Go back to home</Link>
        </p>
      </main>
    </Layout>
  )
}

export default BlogPosts

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
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
