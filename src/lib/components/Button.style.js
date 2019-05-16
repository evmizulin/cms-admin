import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    primary: {
      color: colors.secondary.main,
      '&.outlined': {
        borderColor: `${colors.secondary.main}`,
      },
      '&.filled': {
        background: colors.secondary.main,
        color: colors.white.main,
        '&:hover': {
          background: colors.secondary.l3,
        },
        '&.outlined': {
          borderColor: `${colors.secondary.d2}`,
        },
      },
    },
    secondary: {
      color: colors.primary.main,
      '&.outlined': {
        borderColor: `${colors.primary.main}`,
      },
      '&.filled': {
        background: colors.primary.main,
        color: colors.white.main,
        '&:hover': {
          background: colors.primary.l3,
        },
        '&.outlined': {
          borderColor: `${colors.primary.d2}`,
        },
      },
    },
    accent: {
      color: colors.error.main,
      '&.outlined': {
        borderColor: `${colors.error.main}`,
      },
      '&.filled': {
        background: colors.error.main,
        color: colors.white.main,
        '&:hover': {
          background: colors.error.l3,
        },
        '&.outlined': {
          borderColor: `${colors.error.d2}`,
        },
      },
    },
    lg: {
      '&.outlined': {
        border: '1px solid',
        padding: '7px 16px',
      },
    },
    md: {
      '&.outlined': {
        border: '1px solid',
        padding: '6px 8px',
      },
    },
    sm: {
      padding: '3px 4px',
      minWidth: 56,
      minHeight: 24,
      '&.outlined': {
        border: '1px solid',
        padding: '2px 4px',
      },
    },
    xs: {
      padding: '3px 4px',
      minWidth: 50,
      minHeight: 20,
      fontSize: '0.62rem',
      '&.outlined': {
        border: '1px solid',
        padding: '2px 4px',
      },
    },
    disabled: {
      background: `${colors.white.d5t2} !important`,
      color: `${colors.black.t3}`,
      '&.outlined': {
        borderColor: `${colors.white.d5t2} !important`,
      },
    },
  })
  .attach()

export const cn = classes
