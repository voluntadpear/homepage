import React from 'react'
import PostLink from './postLink';
import { Link } from 'gatsby';

const LatestPosts = ({posts}) => {
  const links = posts.map(post => <PostLink key={post.node.id} post={post.node} />)
  return (
    <section id="latest-blog-posts"
      className="w-full my-10 md:w-1/2 lg:w-1/3 md:mx-0 md:my-0 rounded-lg bg-gray-500 shadow-lg p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold py-8">Latest Posts</h1>
        {links}
      </div>
      <p>
      <Link to="/blog" className="underline hover:no-underline">More posts</Link>
      </p>
    </section> 

  )
}

export default LatestPosts
