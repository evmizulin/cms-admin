import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    add: {
      borderLeft: `4px solid ${colors.primary.main}`,
    },
  })
  .attach()

export const cn = classes
