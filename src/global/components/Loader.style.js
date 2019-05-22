import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    loader: {
      width: '100%',
      background: 'white',
      position: 'fixed',
      top: '0',
      zIndex: 1,
    },
  })
  .attach()

export const cn = classes
