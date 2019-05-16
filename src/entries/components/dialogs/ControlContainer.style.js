import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    container: {
      borderLeft: `3px solid`,
      borderLeftColor: colors.secondary.main,
      '&.error': {
        borderLeftColor: colors.error.main,
      },
      '&.disabled': {
        borderLeftColor: `${colors.black.t4} !important`,
      },
    },
    head: {
      position: 'relative',
      minHeight: 40,
    },
    left: {
      position: 'absolute',
      left: '0px',
      top: '0px',
      bottom: '0px',
      width: '60px',
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        margin: 'auto',
      },
    },
    right: {
      marginLeft: '60px',
    },
    buttons: {
      display: 'inline-block',
    },
    body: {
      padding: '30px 0 0 32px',
      '&.noBodyPedding': {
        padding: '20px 0 0 10px',
      },
    },
    label: {
      minWidth: 50,
      minHeight: 20,
      fontSize: '0.62rem',
    },
    errorMsg: {
      color: colors.error.main,
    },
  })
  .attach()

export const cn = classes
