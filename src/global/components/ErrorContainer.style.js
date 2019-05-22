import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    errorAlert: {
      '& > div': {
        'background-color': colors.error.main,
      },
    },
  })
  .attach()

export const cn = classes
