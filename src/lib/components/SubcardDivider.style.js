import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    divider: {
      margin: '8px 0',
    },
  })
  .attach()

export const cn = classes
