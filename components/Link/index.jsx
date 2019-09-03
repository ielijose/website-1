import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withRouter } from 'next/router'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

const NextComposed = React.forwardRef(function NextComposed (props, ref) {
  const { as, href, prefetch, ...other } = props

  return (
    <NextLink href={href} as={as || `${href}/`}>
      <a ref={ref} rel='alternate' hrefLang='es' {...other} />
    </NextLink>
  )
})

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool
}

function Link (props) {
  const {
    activeClassName = 'active',
    router,
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} underline='none' {...other} />
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

const RouterLink = withRouter(Link)

export default React.forwardRef((props, ref) => <RouterLink {...props} innerRef={ref} />)
