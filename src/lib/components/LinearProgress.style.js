import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    progressBg: {
      backgroundColor: colors.primary.d2t4,
    },
    progressColor: {
      backgroundColor: colors.primary.d2,
    },
    progressColorLight: {
      backgroundColor: colors.secondary.d5t2,
    },
    progressNoHeight: {
      marginBottom: -5,
    },
  })
  .attach()

export const cn = classes
