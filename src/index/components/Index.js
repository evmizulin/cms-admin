import React, { Component } from 'react'
import { Icon } from 'src/lib/components/Icon'
import { colors } from 'src/colors'
import { Typography } from 'src/lib/components/Typography'
import { Divider } from 'material-ui'
import { CircledIcon } from 'src/lib/components/CircledIcon'

import { cn } from 'src/index/components/Index.style'

export class Index extends Component {
  render() {
    return (
      <div className="p-lg">
        <div className={cn.card}>
          <div className="pb-md">
            <Typography type="md">Get started with these steps</Typography>
          </div>
          <Divider />
          <div className={`pt-md ${cn.container}`}>
            <div className={`${cn.left}`}>
              <CircledIcon color={colors.secondary.main} size={48}>
                <Icon type="menu-item-models" color={colors.white.main} size={30} />
              </CircledIcon>
            </div>
            <div className={`${cn.right}`}>
              <div className="pb-sm">
                <Typography type="md">Create a model</Typography>
              </div>
              <div className="pb-md">
                <Typography type="sm">
                  Model is a schema which gives an answer: how does your content entry should look like?
                </Typography>
              </div>
            </div>
          </div>
          <Divider />
          <div className={`pt-md ${cn.container}`}>
            <div className={`${cn.left}`}>
              <CircledIcon color={colors.secondary.main} size={48}>
                <Icon type="menu-item-content" color={colors.white.main} size={30} />
              </CircledIcon>
            </div>
            <div className={`${cn.right}`}>
              <div className="pb-sm">
                <Typography type="md">Create an entry</Typography>
              </div>
              <div className="pb-md">
                <Typography type="sm">Entry is content itself based on corresponding model.</Typography>
              </div>
            </div>
          </div>
          <Divider />
          <div className={`pt-md ${cn.container}`}>
            <div className={`${cn.left}`}>
              <CircledIcon color={colors.secondary.main} size={48}>
                <Icon type="menu-item-tokens" color={colors.white.main} size={30} />
              </CircledIcon>
            </div>
            <div className={`${cn.right}`}>
              <div className="pb-sm">
                <Typography type="md">Create an API Key</Typography>
              </div>
              <div className="pb-md">
                <Typography type="sm">
                  Any client requesting content from the API needs to provide an API Key.
                </Typography>
              </div>
            </div>
          </div>
          <Divider />
          <div className={`pt-md ${cn.container}`}>
            <div className={`${cn.left}`}>
              <CircledIcon color={colors.secondary.main} size={48}>
                <Icon type="menu-item-explorer" color={colors.white.main} size={30} />
              </CircledIcon>
            </div>
            <div className={`${cn.right}`}>
              <div className="pb-sm">
                <Typography type="md">Fetch your entries</Typography>
              </div>
              <div className="pb-md">
                <Typography type="sm">Fetch your entries as a JSON and use them in any app.</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
