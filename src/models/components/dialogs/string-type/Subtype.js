import React, { Component } from 'react'
import { func } from 'prop-types'
import { TypeBlock } from 'src/models/components/basic/TypeBlock'
import { Grid } from 'material-ui'
import { Button } from 'src/lib/components/Button'
import { Icon } from 'src/lib/components/Icon'
import { DialogContent } from 'src/lib/components/DialogContent'
import { DialogActions } from 'src/lib/components/DialogActions'

export class Subtype extends Component {
  static propTypes = {
    onTypeChange: func.isRequired,
    onClose: func.isRequired,
    onFirstBack: func,
  }

  static defaultProps = {
    onFirstBack: null,
  }

  render() {
    const { onTypeChange, onClose, onFirstBack } = this.props
    return (
      <div>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onTypeChange('string-line')}
                icon={<Icon type="models-dialog-string-line" size={40} />}
                title="Single line"
                description="Single line text input"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onTypeChange('string-multiline')}
                icon={<Icon type="models-dialog-string-multiline" size={40} />}
                title="Multi line"
                description="Multi line text input"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onTypeChange('string-markdown')}
                icon={<Icon type="models-dialog-string-markdown" size={40} />}
                title="Markdown"
                description="Markdown editor"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TypeBlock
                onClick={() => onTypeChange('string-html')}
                icon={<Icon type="models-dialog-string-html" size={40} />}
                title="Html"
                description="Html editor"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions onClose={onClose}>
          {!onFirstBack ? null : (
            <Button color="secondary" onClick={onFirstBack}>
              Back
            </Button>
          )}
        </DialogActions>
      </div>
    )
  }
}
