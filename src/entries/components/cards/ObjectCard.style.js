import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    dividerContainer: {
      '&:last-child > $divider': {
        display: 'none',
      },
    },
    divider: {},
    error: {
      color: colors.error.main,
    },
  })
  .attach()

export const cn = classes
