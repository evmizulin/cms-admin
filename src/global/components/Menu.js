import React from 'react'
import { node, func, shape, string, arrayOf, bool } from 'prop-types'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { ListItem, ListItemIcon } from 'material-ui/List'
import { Icon } from 'src/lib/components/Icon'
import Avatar from 'material-ui/Avatar'
import Collapse from 'material-ui/transitions/Collapse'
import { CircledIcon } from 'src/lib/components/CircledIcon'
import { colors } from 'src/colors'
import { Loader } from 'src/global/components/Loader'
import { routes } from 'src/lib/services/Routes'

import { cn } from './Menu.style'

export class Menu extends React.Component {
  static propTypes = {
    redirectSet: func.isRequired,
    children: node.isRequired,
    models: arrayOf(
      shape({
        id: string.isRequired,
        apiId: string.isRequired,
        title: string.isRequired,
      })
    ).isRequired,
    entries: arrayOf(
      shape({
        modelId: string.isRequired,
      })
    ).isRequired,
    project: shape({
      name: string.isRequired,
      image: string.isRequired,
    }).isRequired,
    conflicts: arrayOf(
      shape({
        id: string.isRequired,
        conflict: bool.isRequired,
      })
    ).isRequired,
    projectId: string.isRequired,
  }

  state = {
    open: true,
    contentExpanded: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  contentClick() {
    this.setState({ contentExpanded: !this.state.contentExpanded })
  }

  render() {
    const { children, redirectSet, models, entries, conflicts, projectId, project } = this.props
    const { open, contentExpanded } = this.state
    return (
      <div className={cn.pageContainer}>
        <div className={cn.pageInner}>
          <Avatar
            className={open ? `${cn.arrow} ${cn.arrowOpen}` : `${cn.arrow} ${cn.arrowClose}`}
            onClick={open ? () => this.handleDrawerClose() : () => this.handleDrawerOpen()}
          >
            {open ? <Icon type="menu-close" /> : <Icon type="menu-open" />}
          </Avatar>
          <Drawer
            type="permanent"
            classes={{
              paper: classNames(cn.menuContainer, !open && cn.menuContainerClosed),
            }}
            open={open}
          >
            <div className={cn.menuInner}>
              <List className={cn.menuHeader} onClick={() => redirectSet(routes.projects())}>
                <ListItem className={cn.menuHeaderInner}>
                  <ListItemIcon>
                    <Avatar
                      src={project.image}
                      alt="Project avatar"
                      className={open ? cn.avatarBig : cn.avatarSmall}
                    />
                  </ListItemIcon>
                  <div className={`${cn.pojectName} text-one-line`}>{project.name}</div>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  onClick={() => redirectSet(routes.index(projectId))}
                  className={classNames(cn.menuItem, open ? '' : cn.menuItemColapsed, {
                    selected: routes.isIndex(projectId),
                  })}
                >
                  <ListItemIcon>
                    <CircledIcon
                      className={`${cn.menuItemAva} ${open ? '' : cn.menuItemAvaColapsed}`}
                      size={open ? 44 : 36}
                      color={colors.black.t5}
                    >
                      <Icon type="menu-item-dashboard" size={open ? 22 : 20} color={colors.white.main} />
                    </CircledIcon>
                  </ListItemIcon>
                  <div className={`${cn.menuItemText} text-one-line`}>Dashboard</div>
                </ListItem>
                <ListItem
                  button
                  onClick={() => redirectSet(routes.models(projectId))}
                  className={classNames(cn.menuItem, open ? '' : cn.menuItemColapsed, {
                    selected: routes.isModels(projectId),
                  })}
                >
                  <ListItemIcon>
                    <CircledIcon
                      className={`${cn.menuItemAva} ${open ? '' : cn.menuItemAvaColapsed}`}
                      size={open ? 44 : 36}
                      color={colors.black.t5}
                    >
                      <Icon type="menu-item-models" size={open ? 22 : 20} color={colors.white.main} />
                    </CircledIcon>
                  </ListItemIcon>
                  <div className={`${cn.menuItemText} text-one-line`}>Models</div>
                </ListItem>
                <ListItem
                  button
                  onClick={() => this.contentClick()}
                  className={classNames(cn.menuItem, open ? '' : cn.menuItemColapsed, {
                    selected: routes.isEntries(projectId),
                  })}
                >
                  <ListItemIcon>
                    <CircledIcon
                      className={`${cn.menuItemAva} ${open ? '' : cn.menuItemAvaColapsed}`}
                      size={open ? 44 : 36}
                      color={colors.black.t5}
                    >
                      <Icon type="menu-item-content" size={open ? 22 : 20} color={colors.white.main} />
                    </CircledIcon>
                  </ListItemIcon>
                  <div className={`${cn.menuItemText} text-one-line`}>Entries</div>
                  {contentExpanded ? (
                    <Icon type="menu-item-content-close" color={colors.white.main} />
                  ) : (
                    <Icon type="menu-item-content-open" color={colors.white.main} />
                  )}
                </ListItem>
                <Collapse in={contentExpanded} unmountOnExit>
                  {!models || !entries
                    ? null
                    : models.map(
                        (model, i) =>
                          open ? (
                            <ListItem
                              button
                              className={classNames(cn.menuSubItem, {
                                selected: routes.isEntries(projectId),
                                subSelected: routes.isExactEntry(projectId, model.id),
                              })}
                              key={model.id}
                              onClick={() => redirectSet(routes.entries(projectId, model.id))}
                            >
                              <ListItemIcon>
                                {entries
                                  .filter(entry => entry.modelId === model.id)
                                  .some(
                                    entry => conflicts.filter(item => item.id === entry.id)[0].conflict
                                  ) ? (
                                  <CircledIcon size={20} color={colors.error.main}>
                                    <Icon
                                      type="menu-item-content-exclamation"
                                      color={colors.white.main}
                                      size={14}
                                    />
                                  </CircledIcon>
                                ) : (
                                  <Icon type="menu-item-content-model" color={colors.white.main} size={20} />
                                )}
                              </ListItemIcon>
                              <div className={cn.menuSubItemTextExpanded}>{model.title}</div>
                              <div className={cn.menuSubItemCounter}>
                                {entries.filter(item => item.modelId === model.id).length}
                              </div>
                            </ListItem>
                          ) : (
                            <ListItem
                              button
                              key={model.id}
                              onClick={() => redirectSet(routes.entries(projectId, model.id))}
                              className={classNames(cn.menuSubItemCollapsed, {
                                selected: routes.isEntries(projectId),
                                subSelected: routes.isExactEntry(projectId, model.id),
                              })}
                            >
                              <div className={cn.menuSubItemTextColapsed}>{model.title}</div>
                            </ListItem>
                          )
                      )}
                </Collapse>
                <ListItem
                  button
                  onClick={() => redirectSet(routes.tokens(projectId))}
                  className={classNames(cn.menuItem, open ? '' : cn.menuItemColapsed, {
                    selected: routes.isTokens(projectId),
                  })}
                >
                  <ListItemIcon>
                    <CircledIcon
                      className={`${cn.menuItemAva} ${open ? '' : cn.menuItemAvaColapsed}`}
                      size={open ? 44 : 36}
                      color={colors.black.t5}
                    >
                      <Icon type="menu-item-tokens" size={open ? 22 : 20} color={colors.white.main} />
                    </CircledIcon>
                  </ListItemIcon>
                  <div className={`${cn.menuItemText} text-one-line`}>Api keys</div>
                </ListItem>
                <ListItem
                  button
                  onClick={() => redirectSet(routes.explorer(projectId))}
                  className={classNames(cn.menuItem, open ? '' : cn.menuItemColapsed, {
                    selected: routes.isExplorer(projectId),
                  })}
                >
                  <ListItemIcon>
                    <CircledIcon
                      className={`${cn.menuItemAva} ${open ? '' : cn.menuItemAvaColapsed}`}
                      size={open ? 44 : 36}
                      color={colors.black.t5}
                    >
                      <Icon type="menu-item-explorer" size={open ? 22 : 20} color={colors.white.main} />
                    </CircledIcon>
                  </ListItemIcon>
                  <div className={`${cn.menuItemText} text-one-line`}>Api explorer</div>
                </ListItem>
              </List>
              <Loader />
            </div>
          </Drawer>
          <main className={cn.content}>{children}</main>
        </div>
      </div>
    )
  }
}
