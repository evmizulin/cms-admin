import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    container: {
      background: '#fff',
      boxShadow:
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderRadius: '2px',
      marginBottom: '15px',
      '&:hover $cardButtons': {
        visibility: 'visible !important',
      },
    },
    cardButtons: {
      display: 'inline-block',
      visibility: 'hidden',
    },
  })
  .attach()

export const cn = classes
