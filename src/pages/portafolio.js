import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { default as Link } from "gatsby-plugin-transition-link/AniLink"
import useDarkMode from "use-dark-mode"

import Layout from "../components/layout"
import { Fade } from "../components"

export default ({ data }) => {
  const darkMode = useDarkMode()

  return (
    <Layout>
      <div className="flex flex-wrap justify-center py-5">
        {data
          ? data.allStrapiPortfolios.nodes.map(item => (
              <Link
                to={`portafolio/${item.slug}`}
                key={item.id}
                className="w-full px-3 my-3 sm:w-1/2 md:w-1/3 lg:w-1/4 portfolio-link"
                swipe
                direction="down"
                entryOffset={80}
              >
                <Fade>
                  <Img
                    fluid={item.cover.childImageSharp.fluid}
                    className={`w-full border rounded-lg shadow-2xl portfolio-image transition-all transition-250`}
                  />

                  <div className="relative px-4 -mt-10">
                    <div
                      className={`flex flex-col ${
                        darkMode.value ? "bg-indigo-900" : "bg-white"
                      } border rounded-lg portfolio-meta transition-all transition-250`}
                    >
                      <h2 className="my-2 text-2xl leading-none text-center lg:text-xl">
                        {item.title}
                      </h2>
                      <h3 className="mb-2 text-xl font-light leading-none text-center text-gray-500 lg:text-lg">
                        {item.category.name}
                      </h3>
                    </div>
                  </div>
                </Fade>
              </Link>
            ))
          : ""}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Portafolios {
    allStrapiPortfolios(sort: { fields: [title], order: [ASC] }) {
      nodes {
        id
        slug
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 300, maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        category {
          name
        }
      }
    }
  }
`
