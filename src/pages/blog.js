import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { default as Link } from "gatsby-plugin-transition-link"

import { Fade, SEO, Layout } from "../components"
import { ClockIcon } from "../icons"
import removeMarkdown from "../helpers/removeMarkdown"

export default ({ data }) => (
  <Layout>
    <SEO
      isTemplate
      title="Blog"
      description="Blog de Daniel Esteves para dar a conocer a la comunidad información sobre frameworks, snippets de código y enseñanzas que ha aprendido con el tiempo."
    />

    {data
      ? data.allStrapiBlogs.nodes.map(item => (
          <Fade key={item.id}>
            <Link
              to={`/blog/${item.slug}`}
              className="flex flex-wrap items-stretch my-5 overflow-hidden bg-white border border-transparent rounded-lg shadow hover:border-indigo-900 dark:hover:border-white dark:bg-indigo-900 hover:shadow-lg dark:shadow-white dark:hover:shadow-white-lg transition-all transition-250"
            >
              <Img
                fluid={item.cover.childImageSharp.fluid}
                className="w-full sm:w-2/5 lg:w-1/3 xl:w-1/5 transition-all transition-250"
              />

              <div className="w-full px-4 py-5 sm:w-3/5 lg:w-2/3 xl:w-4/5 transition-all transition-250">
                <div className="flex flex-col justify-around h-full">
                  <h2 className="my-2 text-2xl leading-none text-center lg:text-3xl xl:text-left">
                    {item.title}
                  </h2>

                  <span className="flex justify-center mt-2 text-gray-600 xl:justify-start">
                    <ClockIcon className="w-6 h-6 mr-2 fill-current" />{" "}
                    {item.date}
                  </span>

                  <p className="mt-4 font-light text-gray-500 lg:text-2xl xl:text-xl">
                    {removeMarkdown(item.content.substr(0, 154))}...
                  </p>
                </div>
              </div>
            </Link>
          </Fade>
        ))
      : ""}
  </Layout>
)

export const query = graphql`
  query Blogs {
    allStrapiBlogs(sort: { fields: [date], order: [DESC] }) {
      nodes {
        id
        slug
        cover {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        date(fromNow: true, locale: "es")
        content
      }
    }
  }
`