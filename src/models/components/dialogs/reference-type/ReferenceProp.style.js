import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    contentContainer: {
      paddingBottom: 210 - 76,
    },
  })
  .attach()

export const cn = classes
