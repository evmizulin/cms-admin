import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    content: {
      padding: '20px',
    },
  })
  .attach()

export const cn = classes
