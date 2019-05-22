import React, { Component } from 'react'
import { Grid } from 'material-ui'
import { Icon } from 'src/lib/components/Icon'
import { func } from 'prop-types'
import { TypeBlock } from 'src/models/components/basic/TypeBlock'
import { DialogActions } from 'src/lib/components/DialogActions'
import { DialogContent } from 'src/lib/components/DialogContent'

export class SelectType extends Component {
  static propTypes = {
    onChange: func.isRequired,
    onClose: func.isRequired,
  }

  render() {
    const { onChange, onClose } = this.props
    return (
      <div>
        <DialogContent className="content">
          <Grid container spacing={8}>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('string')}
                icon={<Icon type="models-dialog-string" size={50} />}
                title="Text"
                description="Simple text, html, markdown"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('number')}
                icon={<Icon type="models-dialog-number" size={50} />}
                title="Number"
                description="Integer or floating number"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('boolean')}
                icon={<Icon type="models-dialog-boolean" size={50} />}
                title="Boolean"
                description="True or false"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('object')}
                icon={<Icon type="models-dialog-object" size={50} />}
                title="Object"
                description="Group of fields"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('array')}
                icon={<Icon type="models-dialog-array" size={50} />}
                title="Array"
                description="Collection of fields"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('enum')}
                icon={<Icon type="models-dialog-enum" size={50} />}
                title="Enumerated"
                description="Exact string, number or boolean"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('reference')}
                icon={<Icon type="models-dialog-reference" size={50} />}
                title="Reference"
                description="Reference to another model"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onChange('asset')}
                icon={<Icon type="models-dialog-asset" size={50} />}
                title="Asset"
                description="Any file: images, fonts etc."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions onClose={onClose} />
      </div>
    )
  }
}
