import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    header: {
      background: colors.white.main,
      boxShadow: '0px 1px 4px 0px rgba(13,26,44,.23)',
    },
    body: {
      width: 760,
      margin: 'auto',
      padding: '0 4px',
    },
    firstMessage: {
      marginTop: 60,
    },
    message: {
      background: colors.primary.l5t5,
      padding: 15,
      borderRadius: 2,
    },
    title: {
      paddingTop: 40,
      fontSize: 40,
      fontWeight: 300,
      lineHeight: '52px',
    },
    explanation: {
      fontSize: 14,
      lineHeight: 1.7,
    },
  })
  .attach()

export const cn = classes
