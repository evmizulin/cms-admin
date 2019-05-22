import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    dialogActions: {
      padding: '5px',
    },
    actionsLeft: {
      'justify-content': 'flex-start',
    },
  })
  .attach()

export const cn = classes
