import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    container: {
      background: '#fff',
      borderRadius: '2px',
      position: 'relative',
      minHeight: 40,
    },
    left: {
      borderLeft: `4px solid`,
      position: 'absolute',
      left: '0px',
      top: '0px',
      bottom: '0px',
      width: '60px',
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        margin: 'auto',
      },
    },
    right: {
      marginLeft: '64px',
    },
    head: {
      padding: '0',
    },
    body: {
      padding: '10px 0 0',
      fontSize: '12px',
    },
    label: {
      minWidth: 50,
      minHeight: 20,
      fontSize: '0.62rem',
    },
    exclamationIcon: {
      display: 'inline-block',
      position: 'relative',
      top: '3px',
    },
  })
  .attach()

export const cnHoverTrick = () => {
  const { classes } = jss
    .createStyleSheet({
      hoverContainer: {
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

  return classes
}

export const cn = classes
