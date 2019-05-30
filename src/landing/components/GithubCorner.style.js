import jss from 'src/lib/services/Jss'

const { classes } = jss
  .createStyleSheet({
    svg: {
      fill: '#151513',
      color: '#fff',
      position: 'absolute',
      top: 0,
      border: 0,
      left: 0,
      transform: 'scale(-1, 1)',
    },
    path: {
      transformOrigin: '130px 106px',
    },
  })
  .attach()

export const cn = classes
