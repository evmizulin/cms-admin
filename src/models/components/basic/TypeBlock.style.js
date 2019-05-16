import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    typeBlock: {
      cursor: 'pointer',
      '& .avatar > div': {
        margin: 'auto',
      },
      '&:hover .avatar > div': {
        'background-color': `${colors.primary.d2} !important`,
      },
    },
  })
  .attach()

export const cn = classes
