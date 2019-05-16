import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    label: {
      color: colors.primary.main,
    },
    labelError: {
      color: colors.error.main,
    },
    textError: {
      color: colors.error.main,
    },
  })
  .attach()

export const cn = classes
