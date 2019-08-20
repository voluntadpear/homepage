import React from 'react'
import { Link } from 'gatsby'

const PostLink = ({ post }) => (
  <article className="mb-8">
      <header>
        <h1 className="font-bold underline hover:no-underline">
          <Link to={post.frontmatter.path}>
            {post.frontmatter.title}
          </Link>
        </h1>
        <small>{post.frontmatter.date}</small>
      </header>
      <p>{post.frontmatter.summary}</p>
  </article>
)

export default PostLink