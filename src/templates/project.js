// Dependencies
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Markdown from 'react-markdown';
import { FaGithubAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { window } from 'browser-monads';

// Components
import { Layout, SEO, Blockquote, MarkdownLink } from '../components';

// Helpers
import removeMarkdown from '../helpers/removeMarkdown';

const markdownRenderers = {
  blockquote: Blockquote,
  link: MarkdownLink
};

export default ({ data: { strapiProjects: project, strapiHome: home } }) => {
  return (
    <Layout>
      <SEO
        isTemplate
        title={project.title}
        description={removeMarkdown(project.sort)}
        meta={[
          {
            name: 'language',
            content: 'ES'
          },
          {
            name: 'url',
            content: window.location.href
          },
          {
            name: 'date',
            content: project.createdAt,
            schema: 'YYYY-MM-DD'
          },
          {
            name: 'identifier',
            content: '0-2345-6634-6',
            scheme: 'ISBN'
          },
          {
            property: 'og:url',
            content: window.location.href
          },
          {
            name: 'twitter:image',
            content: `https://danestves.com${project.ogCover.publicURL}`
          },
          {
            name: 'twitter:image:alt',
            content: project.title
          }
        ]}
      />

      <Helmet>
        <meta property="og:image" content={project.ogCover.publicURL} />
      </Helmet>

      <div className="mt-12">
        <section className="text-gray-700 body-font">
          <h2 className="px-5 mb-6 text-3xl font-bold text-center text-gray-900 dark:text-gray-400">
            {project.title}
          </h2>

          <div className="container flex flex-col px-5 mx-auto">
            <div className="mx-auto lg:w-4/6">
              <div className="overflow-hidden rounded-lg">
                <Img
                  fluid={project.cover.childImageSharp.fluid}
                  alt={`Proyecto: ${project.title} | Daniel Esteves`}
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <div className="flex flex-col mt-10 sm:flex-row">
                <div className="text-center sm:w-1/3 sm:pr-8 sm:py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 text-gray-400 bg-gray-200 rounded-full">
                    <Img
                      alt="Daniel Esteves"
                      className="w-20 h-20 rounded-full"
                      fluid={home.image.childImageSharp.fluid}
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="mt-4 text-lg font-medium text-gray-900 title-font dark:text-gray-400">
                      Daniel Esteves
                    </h2>

                    <div className="w-12 h-1 mt-2 mb-4 bg-indigo-500 rounded"></div>

                    <p className="text-base text-gray-600">
                      Fullstack Web Developer
                    </p>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-3 py-2 mt-4 text-black transition-all duration-200 border border-black rounded shadow hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:border-black dark:hover:text-black dark:hover:bg-white"
                    >
                      Ver en GitHub <FaGithubAlt size="20" className="ml-1" />
                    </a>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-3 py-2 mt-4 text-white transition-all duration-200 bg-blue-700 rounded shadow hover:bg-blue-600 hover:shadow-md"
                    >
                      Ver en Vivo <FaGithubAlt size="20" className="ml-1" />
                    </a>
                  </div>
                </div>
                <div className="pt-4 mt-4 text-center border-t border-gray-400 dark:border-gray-300 sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l sm:border-t-0 sm:mt-0 sm:text-left">
                  <Markdown
                    className="py-5 text-lg text-justify text-gray-600 markdown markdown-content"
                    source={project.description}
                    renderers={markdownRenderers}
                    escapeHtml={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    strapiProjects(slug: { eq: $slug }) {
      id
      title
      slug
      description
      cover {
        childImageSharp {
          fluid(maxWidth: 1280, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ogCover {
        publicURL
      }
      github
      url
      createdAt
    }

    strapiHome {
      image {
        childImageSharp {
          fluid(maxWidth: 100, maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;