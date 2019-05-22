import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    dialog: {
      'align-items': 'flex-start !important',
    },
  })
  .attach()

export const cn = classes
