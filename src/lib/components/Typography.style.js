import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    bigTransperent: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '34px',
    },
    light: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '14px',
    },
    lg: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '22px',
    },
    md: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '18px',
    },
    sm: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '14px',
    },
    xs: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '12px',
    },
    label: {
      boxSizing: 'border-box',
      color: colors.black.l2t2,
      fontSize: '0.8125rem',
      lineHeight: '1.4em',
      background: colors.grey.l5t3,
      borderRadius: '2px',
      padding: '3px 4px',
      minWidth: 56,
      minHeight: 24,
      textAlign: 'center',
      '&$disabled': {
        background: colors.white.d5t2,
      },
    },
    disabled: {
      color: colors.black.t3,
    },
  })
  .attach()

export const cn = classes
