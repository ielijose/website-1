import React from 'react'
import Head from 'next/head'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { usePlatziData } from '../hooks/usePlatziData'
import { Loading, Hero, Course, Career } from '../components'
import { KEYWORDS } from '../constants'
import styles from '../styles/pages/certifications'

const useStyles = makeStyles(styles)

export default function Certifications () {
  const { loading, courses, careers } = usePlatziData()
  const classes = useStyles()

  const coursesJS = courses.filter(course => {
    if (course.career !== null) {
      return course.career.toLowerCase().match('js') ||
        course.career.toLowerCase().match('javascript') ||
        course.title.toLowerCase().match('javascript') ||
        course.title.toLowerCase().match('js')
    }
  })

  const coursesEnglish = courses.filter(course => {
    if (course.career !== null) {
      return course.career.toLowerCase().match('ingles') ||
        course.career.toLowerCase().match('inglés') ||
        course.title.toLowerCase().match('ingles') ||
        course.title.toLowerCase().match('inglés')
    }
  })

  const coursesOther = courses.filter(course => {
    if (course.career !== null) {
      return !course.career.toLowerCase().match('ingles') &&
        !course.career.toLowerCase().match('inglés') &&
        !course.title.toLowerCase().match('ingles') &&
        !course.title.toLowerCase().match('inglés') &&
        !course.career.toLowerCase().match('js') &&
        !course.career.toLowerCase().match('javascript') &&
        !course.title.toLowerCase().match('javascript') &&
        !course.title.toLowerCase().match('js')
    }
  })

  return (
    <>
      <Head>
        <title>Certificaciones | Daniel Esteves - Desarrollador Web Frontend</title>
        <meta name='description' content='Certificaciones de Daniel Esteves. Educación autodidacta en distintas plataformas como Platzi e Udemy. Experiencia en trabajos freelance usando WordPress y React.' />
        <meta
          name='keywords'
          content={`Certificaciones, certificaciones de daniel esteves, certificaciones de danestves, ${KEYWORDS}`}
        />
        <meta
          property='og:title'
          content='Certificaciones | Daniel Esteves - Desarrollador Web Frontend'
        />
        <meta property='og:description' content='Certificaciones de Daniel Esteves. Educación autodidacta en distintas plataformas como Platzi e Udemy. Experiencia en trabajos freelance usando WordPress y React.' />
        <meta
          name='twitter:title'
          content='Certificaciones | Daniel Esteves - Desarrollador Web Frontend'
        />
        <meta name='twitter:description' content='Certificaciones de Daniel Esteves. Educación autodidacta en distintas plataformas como Platzi e Udemy. Experiencia en trabajos freelance usando WordPress y React.' />
        <meta
          name='twitter:image:alt'
          content='Certificaciones | Daniel Esteves - Desarrollador Web Frontend'
        />
      </Head>
      <Hero img='/static/portafolio.jpg' title='Portafolio' />
      {loading ? (
        <Loading />
      ) : courses && careers ? (
        <div className={classes.container}>
          <Grid
            container
            spacing={2}
            justify='center'
            alignItems='center'
            className={classes.containerGrid}
          >
            <Grid item xs={12}>
              <Typography
                variant='h4'
                component='div'
                align='center'
                data-aos='zoom-in'
                className={classes.titleItem}
              >
              Carreras
              </Typography>
            </Grid>
            {careers &&
            careers.map(career => (
              <Grid item xs={12} sm={6} md={4} key={career.id}>
                <Career career={career} />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography
                variant='h4'
                component='div'
                align='center'
                data-aos='fade-up'
                className={classes.titleItem}
              >
              JavaScript
              </Typography>
            </Grid>
            {coursesJS &&
            coursesJS.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Course course={course} />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography
                variant='h4'
                component='div'
                align='center'
                data-aos='fade-up'
                className={classes.titleItem}
              >
              Inglés
              </Typography>
            </Grid>
            {coursesEnglish &&
            coursesEnglish.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Course course={course} />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography
                variant='h4'
                component='div'
                align='center'
                data-aos='fade-up'
                className={classes.titleItem}
              >
              Otros
              </Typography>
            </Grid>
            {coursesOther &&
            coursesOther.map(course => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Course course={course} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        'Error!'
      )}
    </>
  )
}
