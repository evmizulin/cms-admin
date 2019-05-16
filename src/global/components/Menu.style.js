import jss from 'src/lib/services/Jss'
import { colors } from 'src/colors'

const { classes } = jss
  .createStyleSheet({
    pageContainer: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    pageInner: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    menuContainer: {
      position: 'relative',
      height: '100%',
      width: '300px',
      transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
      background: colors.primary.main,
    },
    menuContainerClosed: {
      width: '60px',
      'overflow-x': 'hidden',
      transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    menuInner: {
      width: '300px',
      overflowX: 'hidden',
      '& .selected': {
        background: colors.primary.d1,
        color: colors.white.main,
      },
    },
    menuHeader: {
      cursor: 'pointer',
      background: colors.primary.d2,
    },
    menuHeaderInner: {
      'padding-top': '5px',
      'padding-bottom': '5px',
    },
    pojectName: {
      color: colors.secondary.main,
      textTransform: 'uppercase',
      fontSize: 19,
      flex: '1 1 auto',
      padding: '0 2px 0 4px',
      letterSpacing: 2,
    },
    menuItem: {
      paddingTop: 12,
      paddingBottom: 12,
      color: colors.white.t1,
      transition: 'padding 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
      '&:hover': {
        color: `${colors.white.main} !important`,
      },
    },
    menuItemColapsed: {
      paddingTop: 17,
      paddingBottom: 17,
    },
    menuItemAva: {
      transition:
        'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, ' +
        'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    menuItemText: {
      textTransform: 'uppercase',
      fontSize: 18,
      flex: '1 1 auto',
      padding: '0 10px 0 4px',
      letterSpacing: 2,
    },
    menuItemAvaColapsed: {
      marginLeft: -3,
    },
    menuSubItem: {
      fontSize: 14,
      letterSpacing: 1.5,
      paddingLeft: 28,
      color: colors.white.t1,
      '&:hover': {
        color: colors.white.main,
        background: colors.primary.d3,
      },
      '&:hover.selected': {
        color: colors.white.main,
        background: colors.primary.d3,
      },
      '&.selected': {
        color: colors.white.t1,
      },
      '&.selected.subSelected': {
        color: colors.white.main,
        background: colors.primary.d4,
      },
    },
    menuSubItemCollapsed: {
      fontSize: 14,
      letterSpacing: 1.2,
      color: colors.white.t1,
      '&:hover': {
        color: colors.white.main,
        background: colors.primary.d3,
      },
      '&:hover.selected': {
        color: colors.white.main,
        background: colors.primary.d3,
      },
      '&.selected': {
        color: colors.white.t1,
      },
      '&.selected.subSelected': {
        color: colors.white.main,
        background: colors.primary.d4,
      },
    },
    menuSubItemTextColapsed: {
      width: '43px',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis',
      overflow: 'hidden',
    },
    menuSubItemTextExpanded: {
      paddingLeft: 5,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    menuSubItemCounter: {
      flex: '1 1 auto',
      padding: '0 8px 0 16px',
      textAlign: 'right',
    },
    content: {
      width: '100%',
      'flex-grow': '1',
      'background-color': colors.tertiary.main,
      'overflow-y': 'auto',
    },
    arrow: {
      width: 32,
      height: 32,
      backgroundColor: colors.primary.d4,
      cursor: 'pointer',
      position: 'absolute',
      zIndex: '1301',
      top: '65%',
    },
    arrowOpen: {
      left: '285px',
      transition: 'left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    arrowClose: {
      left: '45px',
      transition: 'left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    avatarBig: {
      marginLeft: -3,
      width: '50px',
      height: '50px',
      padding: '0px',
      transition:
        'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, ' +
        'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    avatarSmall: {
      marginLeft: '-3px',
      width: '36px',
      height: '36px',
      margin: '7px 16px 7px 0',
      transition:
        'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, ' +
        'margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
  })
  .attach()

export const cn = classes
