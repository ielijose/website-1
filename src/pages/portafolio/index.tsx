// Dependencies
import * as React from 'react'
import { NextPage } from 'next'
import Image from 'graphcms-image'
import removeMarkdown from 'markdown-to-text'
import Loader from 'react-loaders'
import { motion } from 'framer-motion'

// Components
import { SEO, Pagination, Link } from '@/components'

// Generated
import { usePortfoliosQuery, PageInfo } from '@/generated/graphql'

// Queries
import GET_PORTFOLIOS from '@/graphql/portfolios.query'

const PortfolioPage: NextPage = () => {
  const [state, setState] = React.useState({
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
  })
  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  /**
   * Get initial query variables
   */
  const getPageQueryVariables = (): { first: number; skip: number } => {
    return { first: state.pageSize, skip: (state.currentPage - 1) * state.pageSize }
  }

  const { data, loading, error, fetchMore } = usePortfoliosQuery({
    variables: getPageQueryVariables(),
  })

  if (loading) {
    return (
      <div className="container flex items-center justify-center px-5 py-48">
        <Loader type="pacman" active />
      </div>
    )
  }
  if (error) return <p>Error: ${error.message}</p>

  const count = data?.count.aggregate.count
  const pageInfo = data?.portfolios.pageInfo
  const portfolios = data?.portfolios.edges

  return (
    <>
      <SEO
        title="Portfolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Portafolio
          </h1>
        </div>
      </section>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        className="container px-5 space-y-16"
      >
        {portfolios?.map(({ node: portfolio }) => (
          <motion.div key={portfolio.id} variants={item}>
            <Link
              href={`/portafolio/${portfolio.slug}`}
              className="grid items-center grid-cols-1 gap-6 overflow-hidden rounded-lg md:grid-cols-2 group focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none"
            >
              <div className="w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg">
                <Image
                  // eslint-disable-next-line
                  // @ts-ignore
                  image={portfolio.cover}
                  maxWidth={700}
                  outerWrapperClassName="w-full"
                  alt={portfolio.title}
                />
              </div>
              <div>
                <h2 className="mb-4 text-4xl leading-tight text-white group-hover:underline">
                  {portfolio.title}
                </h2>
                <p className="text-white">{removeMarkdown(portfolio.content.slice(0, 250))}...</p>
                <div className="flex mt-4">
                  <button
                    type="button"
                    className="flex items-center px-6 py-2 font-semibold transition-all duration-150 transform rounded group-hover:-translate-y-1 focus:outline-none bg-primary text-secondary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                  >
                    Ver Portafolio
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <Pagination
          state={state}
          query={GET_PORTFOLIOS}
          variables={getPageQueryVariables()}
          setState={setState}
          fetchMore={fetchMore}
          count={count || 0}
          pageInfo={pageInfo as PageInfo}
        />
      </motion.div>
    </>
  )
}

export default PortfolioPage