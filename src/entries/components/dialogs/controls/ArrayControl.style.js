import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    controlContainer: {
      marginBottom: '24px',
      '&:last-child': {
        marginBottom: '0',
      },
    },
    disabled: {
      color: `${colors.black.t4}`,
    },
    addBtnContainer: {
      marginTop: '24px',
      borderLeft: `3px solid ${colors.secondary.main}`,
      '&.disabled': {
        borderLeftColor: `${colors.black.t4} !important`,
      },
    },
  })
  .attach()

export const cn = classes
