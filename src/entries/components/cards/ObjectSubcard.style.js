import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    dividerContainer: {
      '&:last-child > $divider': {
        display: 'none',
      },
    },
    divider: {},
  })
  .attach()

export const cn = classes
