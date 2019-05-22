import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    container: {
      minHeight: '100%',
      background: colors.tertiary.main,
    },
  })
  .attach()

export const cn = classes
