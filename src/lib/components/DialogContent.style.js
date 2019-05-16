import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    dialogContent: {
      'padding-top': '24px !important',
      overflowY: 'inherit',
    },
  })
  .attach()

export const cn = classes
