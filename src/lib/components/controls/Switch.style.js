import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    checked: {
      color: colors.primary.main,
    },
    disabled: {
      color: colors.grey.l5t2,
    },
    bar: {
      'background-color': `${colors.primary.main} !important`,
    },
  })
  .attach()

export const cn = classes
