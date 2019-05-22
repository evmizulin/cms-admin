import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    card: {
      boxShadow:
        '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      textAlign: 'center',
      borderRadius: '2px',
    },
    newProjectCard: {
      boxShadow:
        '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      textAlign: 'center',
      borderRadius: '2px',
      cursor: 'pointer',
      height: '100%',
      background: colors.white.t3,
      '&:hover': {
        background: colors.white.t5,
      },
    },
    newProjectCardInner: {
      padding: '60px 25px',
    },
    newProjectText: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '30px',
    },
    avatar: {
      margin: 'auto',
      width: '100%',
      height: '100%',
    },
    cardBody: {
      cursor: 'pointer',
      borderRadius: '2px 2px 0 0',
      padding: '25px 25px',
      background: colors.white.main,
      transition: '0.2s',
      '&:hover': {
        background: colors.white.t4,
      },
    },
    cardFooter: {
      cursor: 'default',
      padding: '20px 25px',
      borderRadius: '0 0 2px 2px',
      background: colors.white.main,
    },
  })
  .attach()

export const cn = classes
