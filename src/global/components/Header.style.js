import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    header: {
      height: '36px',
      background: colors.tertiary.d2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '20px',
      borderBottom: `1px solid ${colors.grey.l3t5}`,
    },
  })
  .attach()

export const cn = classes
