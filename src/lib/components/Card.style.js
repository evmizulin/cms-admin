import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    container: {
      background: '#fff',
      boxShadow:
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderRadius: '2px',
      marginBottom: '15px',
      position: 'relative',
      '&:hover $cardButtons': {
        visibility: 'visible !important',
      },
    },
    cardButtons: {
      display: 'inline-block',
      visibility: 'hidden',
    },
    left: {
      borderRadius: '2px 0 0 2px',
      position: 'absolute',
      left: '0px',
      top: '0px',
      bottom: '0px',
      width: '80px',
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        margin: 'auto',
      },
    },
    right: {
      marginLeft: '80px',
    },
    head: {
      padding: '10px',
    },
    body: {
      padding: '10px',
    },
    exclamationIcon: {
      display: 'inline-block',
      position: 'relative',
      top: '4px',
    },
  })
  .attach()

export const cn = classes
