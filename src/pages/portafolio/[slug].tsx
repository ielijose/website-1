// Dependencies
import * as React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import { useRouter } from 'next/dist/client/router'
import Image from 'graphcms-image'
import { BiLinkExternal } from 'react-icons/bi'

// Components
import { SEO } from '@/components'
import Markdown from '@/components/Markdown'

// Generated
import { Portfolio } from '@/generated/graphql'

// Interfaces
import { Asset } from '@/interfaces'

// Lib
import { getApolloClient } from '@/lib/apollo'

// Queries
import GET_PORTFOLIO_SLUGS from '@/graphql/portfolioSlugs.query'
import GET_PORTFOLIO from '@/graphql/portfolio.query'

interface Props {
  portfolio: Portfolio
}

const DynamicPortfolio: NextPage<Props> = ({ portfolio }) => {
  // Hooks
  const router = useRouter()

  // Render
  if ((!router.isFallback && !portfolio) || !portfolio) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  return (
    <>
      <SEO
        title={portfolio.seo?.title as string}
        description={portfolio.seo?.description as string}
        shareImage={portfolio.seo?.image as Asset}
      />

      <div className="container px-5 py-16 space-y-16">
        <h1 className="mb-10 text-4xl text-center text-white sm:text-5xl md:text-6xl">
          {portfolio.title}
        </h1>

        <div className="w-full max-w-screen-lg mx-auto overflow-hidden rounded-lg">
          <Image
            image={{
              handle: portfolio.cover.handle,
              width: portfolio.cover.width || 0,
              height: portfolio.cover.height || 0,
            }}
            maxWidth={1200}
            outerWrapperClassName="w-full"
            alt={portfolio.title}
          />
        </div>

        <div className="grid items-center max-w-screen-md grid-cols-1 p-5 mx-auto bg-white md:grid-cols-3 rounded-xl bg-opacity-20">
          <div>
            <h2 className="font-semibold text-center text-white">Industria</h2>
            <p className="text-lg text-center text-white">{portfolio.industry}</p>
          </div>
          <div>
            <h2 className="font-semibold text-center text-white">Tecnologías</h2>
            <p className="text-lg text-center text-white">{portfolio.technologies.join(', ')}</p>
          </div>
          <div>
            <h2 className="font-semibold text-center text-white">Sitio Web</h2>
            <div className="flex justify-center">
              <a
                href={portfolio.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-lg underline focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none text-primary"
              >
                <span>Ver</span>
                <BiLinkExternal className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-screen-md mx-auto">
          <Markdown markdown={portfolio.content} />
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apollo = getApolloClient()
  const { data } = await apollo.query({
    query: GET_PORTFOLIO_SLUGS,
    variables: {
      first: 100,
    },
  })

  const paths = data?.portfolios.map((portfolio: Portfolio) => {
    return {
      params: { slug: portfolio.slug },
    }
  })

  return {
    paths: paths || [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apollo = getApolloClient()
  const { data } = await apollo.query({
    query: GET_PORTFOLIO,
    variables: {
      slug: params?.slug as string,
    },
  })

  if (!data?.portfolio) {
    return {
      props: {},
    }
  }

  return {
    props: {
      portfolio: data.portfolio,
    },
    revalidate: 1200,
  }
}

export default DynamicPortfolio