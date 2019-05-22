import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    inkbar: {
      '&:after': {
        backgroundColor: colors.primary.main,
      },
    },
    inkbarError: {
      '&:after': {
        backgroundColor: colors.error.main,
      },
    },
  })
  .attach()

export const cn = classes
