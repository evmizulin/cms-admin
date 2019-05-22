import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    label: {
      'font-size': '1rem',
    },
    dirtyAlign: {
      marginTop: 6,
      marginBottom: -6,
    },
    disabled: {
      '& $label': {
        color: colors.black.l2t3,
      },
    },
  })
  .attach()

export const cn = classes
