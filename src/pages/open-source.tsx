// Dependencies
import { NextPage, GetStaticProps } from 'next'
import useSWR from 'swr'

// Components
import { GeneralObserver, SEO } from '@/components'

// Interfaces
import { Repository } from '@/interfaces'

// Libraries
import fetcher, { server } from '@/lib/fetcher'

interface Props {
  github: Response
}

const OpenSource: NextPage<Props> = ({ github }) => {
  const { data } = useSWR('/api/github', fetcher, { initialData: github })

  const repositories = (data as any)?.repositories as Repository[]

  return (
    <>
      <SEO
        title="Open Source - Proyectos para la comunidad"
        description="Proyectos libres para aportar nuevas herramientas a la comunidad. "
      />

      <section className="container">
        <div className="mx-auto my-20 text-center lg:w-3/4 xl:w-2/3">
          <h1 className="mb-10 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Open Source
          </h1>
        </div>
      </section>

      <section className="container px-5">
        <h2 className="mb-10 text-3xl font-bold text-white">Proyectos destacados</h2>

        <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          <GeneralObserver>
            <div className="relative">
              <object
                data="https://github-readme-stats.danestves.com/api/pin/?username=opengraphimg&repo=generator&title_color=fff&icon_color=00C389&text_color=9f9f9f&bg_color=0c1014&show_owner=true"
                className="w-full"
              ></object>

              {/* Fix object cannot be inside anchor tag (link not working) */}
              <a
                href="https://github.com/opengraphimg/generator"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
              ></a>
            </div>
          </GeneralObserver>
        </div>
      </section>

      <section className="container px-5 mt-16">
        <h2 className="mb-10 text-3xl font-bold text-white">Repositorios en GitHub</h2>

        <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {repositories?.map((repository) => (
            <GeneralObserver key={repository.id}>
              <div className="relative">
                <object
                  data={`https://github-readme-stats.danestves.com/api/pin/?username=${
                    repository.owner.login
                  }&repo=${
                    repository.name
                  }&title_color=fff&icon_color=00C389&text_color=9f9f9f&bg_color=0c1014${
                    repository.owner.login === 'opengraphimg' ? '&show_owner=true' : ''
                  }`}
                  className="w-full"
                ></object>

                {/* Fix object cannot be inside anchor tag (link not working) */}
                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                ></a>
              </div>
            </GeneralObserver>
          ))}
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetcher(`${server}/api/github`)

  return {
    props: {
      repositories: data,
    },
    // View every 24 hours if there is a new repository
    revalidate: 86400,
  }
}

export default OpenSource
