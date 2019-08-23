const styles = theme => ({
  slider: {
    height: 'calc(100vh - 56px)',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: 'url("/static/home.jpg") center no-repeat',
    backgroundSize: 'cover',
    color: '#fff',

    '&::after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: 'linear-gradient(-135deg, #307FE2, #0090DA, #00A3E1, #00A9E0)',
      opacity: 0.85
    },

    '& a': {
      '&.previousButton, &.nextButton': {
        fontSize: 22,
        lineHeight: 0,
        display: 'block',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'all 0.3s linear',
        zIndex: 2,
        color: '#fff',
        padding: 10,
        textDecoration: 'none',
        backfaceVisibility: 'hidden', /* prevent jump effect when scaling */

        '&:not(.disabled):hover': {
          transform: 'translateY(-50%) scale(1.25)',
          cursor: 'pointer'
        },

        '& svg': {
          '& polygon': {
            fill: '#fff'
          }
        }
      },

      '&.previousButton': {
        left: 20
      },

      '&.nextButton': {
        right: 20
      }
    },

    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 64px)'
    }
  },
  sliderItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,

    '&.hidden': {
      visibility: 'hidden'
    },

    '&.previous': {
      left: '-100%'
    },

    '&.current': {
      left: 0
    },

    '&.next': {
      left: '100%'
    },

    '&.animateIn, &.animateOut': {
      transition: 'all 2s ease'
    },

    '&.animateIn': {
      '&.previous, &.next': {
        left: 0,
        visibility: 'visible',

        '& $img': {
          transitionDelay: '1.1s'
        },

        '& $title': {
          transitionDelay: '1.3s'
        },

        '& $description': {
          transitionDelay: '1.3s'
        }
      }
    },

    '&.animateOut': {
      '&.previous': {
        left: '100%'
      },

      '&.next': {
        left: '-100%'
      },

      '& $img': {
        transitionDelay: '0.3s'
      },

      '& $title': {
        transitionDelay: '0.2s'
      },

      '& $description': {
        transitionDelay: '0.1s'
      }
    },

    '&.current, &.animateIn': {
      '& $img, & $title, & $description': {
        transform: 'translateX(0)',
        transitionDelay: '0.9s',
        opacity: 1
      }
    },

    '& .inner': {
      padding: '0 70',
      boxSizing: 'border-box',
      position: 'absolute',
      width: '100%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  img: {
    width: '100%',
    maxWidth: 128,
    transition: 'all 0.3s ease',
    transform: 'translateY(-20px)',
    opacity: 0
  },
  title: {
    margin: theme.spacing(2, 0, 0),
    fontWeight: 700,
    transition: 'all 0.3s ease',
    transform: 'translateY(20px)',
    opacity: 0
  },
  description: {
    transition: 'all 0.3s ease',
    transform: 'translateY(20px)',
    opacity: 0,
    width: '100%',
    maxWidth: 320
  }
})

export default styles