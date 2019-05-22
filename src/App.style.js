import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

jss
  .createStyleSheet({
    '@global': {
      '.text-error': {
        color: colors.error.main,
      },
      '.text-disabled': {
        color: colors.black.t4,
      },
      '.loader-page-container': {
        background: colors.tertiary.main,
        minHeight: 'calc(100% - 50px)',
        paddingTop: '50px',
        textAlign: 'center',
      },
      'a:link': {
        color: colors.primary.main,
      },
      'a:visited': {
        color: colors.primary.main,
      },
      'a:hover': {
        color: colors.primary.d5,
      },
      'a:active': {
        color: colors.primary.l3,
      },
    },
  })
  .attach()
