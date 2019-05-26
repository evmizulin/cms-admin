import React, { Component } from 'react'
import { string, number } from 'prop-types'
import { MdKeyboardArrowLeft as ArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight as ArrowRight } from 'react-icons/md'
import { MdDashboard as Dashboard } from 'react-icons/md'
import { FaCubes as Cubes } from 'react-icons/fa'
import { FaEdit as Edit } from 'react-icons/fa'
import { MdKeyboardArrowDown as ArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp as ArrowUp } from 'react-icons/md'
import { FaCube as Cube } from 'react-icons/fa'
import { MdAddCircleOutline as Add } from 'react-icons/md'
import { MdTextFields as TextFields } from 'react-icons/md'
import { MdShortText as ShortText } from 'react-icons/md'
import { MdFormatAlignLeft as FormatAlignLeft } from 'react-icons/md'
import { GoMarkdown as Markdown } from 'react-icons/go'
import { GoCode as Code } from 'react-icons/go'
import { GoLinkExternal as LinkExternal } from 'react-icons/go'
import { FaExclamation as Exclamation } from 'react-icons/fa'
import { FaObjectGroup as ObjectGroup } from 'react-icons/fa'
import clone from 'clone'
import { TiSortNumerically } from 'react-icons/ti'
import { IoIosSwitch } from 'react-icons/io'
// import { FiLayers as ViewArray } from 'react-icons/fi'
import { MdViewArray as ViewArray } from 'react-icons/md'
import { MdList as Enum } from 'react-icons/md'
import { MdLink as Reference } from 'react-icons/md'
import { MdInsertDriveFile as Asset } from 'react-icons/md'
import { MdCloudDownload } from 'react-icons/md'
import { MdVpnKey } from 'react-icons/md'

const MAP = {
  'projects-add': Add,
  'menu-close': ArrowLeft,
  'menu-open': ArrowRight,
  'menu-item-dashboard': Dashboard,
  'menu-item-models': Cubes,
  'menu-item-content': Edit,
  'menu-item-content-open': ArrowDown,
  'menu-item-content-close': ArrowUp,
  'menu-item-content-model': Cube,
  'menu-item-content-exclamation': Exclamation,
  'menu-item-tokens': MdVpnKey,
  'menu-item-explorer': MdCloudDownload,
  'models-header-add': Add,
  'models-dialog-string': TextFields,
  'models-dialog-string-line': ShortText,
  'models-dialog-string-multiline': FormatAlignLeft,
  'models-dialog-string-markdown': Markdown,
  'models-dialog-string-html': Code,
  'models-dialog-number': TiSortNumerically,
  'models-dialog-boolean': IoIosSwitch,
  'models-dialog-object': ObjectGroup,
  'models-dialog-array': ViewArray,
  'models-dialog-enum': Enum,
  'models-dialog-enum-add-button': Add,
  'models-dialog-reference': Reference,
  'models-dialog-asset': Asset,
  'models-view-string-line': ShortText,
  'models-view-string-multiline': FormatAlignLeft,
  'models-view-string-markdown': Markdown,
  'models-view-string-html': Code,
  'models-view-number': TiSortNumerically,
  'models-view-boolean': IoIosSwitch,
  'models-view-object': ObjectGroup,
  'models-view-array': ViewArray,
  'models-view-enum': Enum,
  'models-view-reference': Reference,
  'models-view-asset': Asset,
  'entries-view-string-line': ShortText,
  'entries-view-string-multiline': FormatAlignLeft,
  'entries-view-string-markdown': Markdown,
  'entries-view-string-html': Code,
  'entries-view-number': TiSortNumerically,
  'entries-view-boolean': IoIosSwitch,
  'entries-view-object': ObjectGroup,
  'entries-view-array': ViewArray,
  'entries-view-enum': Enum,
  'entries-view-reference': Reference,
  'entries-view-asset': Asset,
  'link-external': LinkExternal,
}

const defaultStyles = {
  fill: 'currentColor',
  display: 'inline-block',
  transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  userSelect: 'none',
}

export class Icon extends Component {
  static propTypes = {
    type: string.isRequired,
    size: number,
    color: string,
  }

  static defaultProps = {
    size: 24,
    color: 'currentColor',
  }

  render() {
    const { type, size, color, ...props } = this.props
    const Component = MAP[type]

    const buildedStyles = clone(defaultStyles)
    buildedStyles.width = `${size}px`
    buildedStyles.height = `${size}px`
    buildedStyles.fill = color

    return Component ? <Component {...props} style={buildedStyles} /> : <div>icon not found</div>
  }
}
