import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    container: {
      paddingBottom: 42,
    },
    deleteButton: {
      marginTop: 16,
    },
    textError: {
      color: colors.error.main,
    },
  })
  .attach()

export const cn = classes
