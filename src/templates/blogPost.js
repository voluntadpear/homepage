import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import '../css/blogPost.css'
import "prismjs/themes/prism-tomorrow.css"

const BlogPost = ({data: { markdownRemark }}) => {
  const { frontmatter, html, timeToRead } = markdownRemark
  return (
    <Layout>
    <SEO title={frontmatter.title} />
      <article className="mx-6 md:mx-auto md:max-w-2xl my-8">
        <header className="text-3xl font-bold mt-16 mb-8"><Link to="/" className="hover:underline">Guillermo Peralta</Link></header>
        <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        <small>{frontmatter.date} | {timeToRead} min read</small>
        <div 
          className="blog-post-content mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <p className="mt-8">
        <Link to="/" className="underline hover:no-underline default-link">Go back to home</Link>
        </p>
      </article>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path }}) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
