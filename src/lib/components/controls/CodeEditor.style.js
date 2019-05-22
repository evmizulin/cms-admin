import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    container: {
      height: 150,
    },
  })
  .attach()

export const cn = classes
