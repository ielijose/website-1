// Dependencies
import * as React from 'react'
import { NextPage } from 'next'

// Generated
import { Post } from '@/generated/graphql'

// Lib
import { getApolloClient } from '@/lib/apollo'

// Queries
import GET_RSS_POSTS from '@/graphql/postsRss.query'

const toUrl = (host: string, post: Post, route: string): string => {
  return `<item>
    <title>${post.title}</title>
    <guid>https://${host}/blog/${route}</guid>
    <pubDate>${new Date()}</pubDate>
    <link>https://${host}/blog/${route}</link>
    <description>${post.seo?.description}</description>
  </item>`
}

const createSitemap = (host: string, posts: string[]): string => {
  return `<rss
      xmlns:atom="http://www.w3.org/2005/Atom"
      version="2.0"
    >
      <channel>
        <title>Desarrollador Web Frontend | @danestves</title>
        <link>https://${host}</link>
        <language>es-ES</language>
        <lastBuildDate>${new Date()}</lastBuildDate>
        <atom:link href="https://${host}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts.map((post: any) => toUrl(host, post, post.slug)).join('')}
      </channel>
    </rss>
  `
}

const SitemapPage: NextPage = () => {
  return <></>
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
SitemapPage.getInitialProps = async ({ req, res }) => {
  const apollo = getApolloClient()
  const { data } = await apollo.query({
    query: GET_RSS_POSTS,
    variables: {
      first: 100,
    },
  })

  const posts = data.posts.map((post: Post) => post)

  const sitemap = createSitemap((req && req.headers.host) || '', posts)

  res && res.setHeader('Content-Type', 'text/xml')
  res && res.write(sitemap)
  res && res.end()

  return res
}

export default SitemapPage