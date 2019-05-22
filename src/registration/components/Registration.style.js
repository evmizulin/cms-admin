import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    link: {
      fontSize: '0.9em',
    },
  })
  .attach()

export const cn = classes
