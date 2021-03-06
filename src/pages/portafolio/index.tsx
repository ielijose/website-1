// Dependencies
import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'

// Components
import { SEO, Link } from '@/components'

// Interfaces
import { FrontMatterPortfolio } from '@/interfaces'

// Libraries
import { getAllFilesFrontMatter } from '@/lib/mdx'

interface Props {
  portfolios: FrontMatterPortfolio[]
}

const PortfolioPage: NextPage<Props> = ({ portfolios }) => {
  return (
    <>
      <SEO
        title="Portafolio"
        description="Portafolio de Daniel Esteves para mostrar sus proyectos realizados en todo su trayecto como desarrollador web frontend. React, NextJS, Gatsby y WordPress."
      />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Portafolio
          </h1>
        </div>
      </section>

      <div className="container px-5 space-y-16">
        {portfolios.map((portfolio) => (
          <div key={portfolio.slug}>
            <Link
              href={`/portafolio/${portfolio.slug}`}
              className="grid items-center grid-cols-1 gap-6 overflow-hidden rounded-lg md:grid-cols-2 group focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none"
            >
              <div className="flex w-full overflow-hidden duration-200 transform rounded-lg group-hover:shadow-lg">
                <Image src={portfolio.image} width={736} height={414} alt={portfolio.title} />
              </div>
              <div>
                <h2 className="mb-4 text-4xl leading-tight text-white group-hover:underline">
                  {portfolio.title}
                </h2>
                <p className="text-white">{portfolio.summary}</p>
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
          </div>
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolios = await getAllFilesFrontMatter('portfolio')

  return {
    props: {
      portfolios: portfolios.sort((a: FrontMatterPortfolio, b: FrontMatterPortfolio) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }),
    },
  }
}

export default PortfolioPage
