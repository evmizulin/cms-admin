import React, { Component } from 'react'
import { Header } from 'src/global/components/Header'
import { Content } from 'src/global/components/Content'
import { Button } from 'src/lib/components/Button'
import { Icon } from 'src/lib/components/Icon'
import { arrayOf, func, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import { Card } from 'src/tokens/components/basic/Card'
import { TokenDialog } from 'src/tokens/components/TokenDialog'
import { ConfirmDialog } from 'src/tokens/components/ConfirmDialog'
import { CircularProgress } from 'src/lib/components/CircularProgress'
import { getAction } from 'src/tokens/actions/getAction'
import { Typography } from 'src/lib/components/Typography'
import { onAdd } from 'src/tokens/actions/onAdd'
import { onAddDialogDone } from 'src/tokens/actions/onAddDialogDone'
import { onConfirmDialogConfirm } from 'src/tokens/actions/onConfirmDialogConfirm'
import { onDelete } from 'src/tokens/actions/onDelete'
import { onDialogClose } from 'src/tokens/actions/onDialogClose'
import { onDialogExited } from 'src/tokens/actions/onDialogExited'
import { onEdit } from 'src/tokens/actions/onEdit'
import { onEditDialogDone } from 'src/tokens/actions/onEditDialogDone'

class ATokens extends Component {
  static propTypes = {
    initialGet: bool.isRequired,
    tokens: arrayOf(object).isRequired,
    dialogs: object.isRequired,
    getAction: func.isRequired,
    onAdd: func.isRequired,
    onAddDialogDone: func.isRequired,
    onConfirmDialogConfirm: func.isRequired,
    onDelete: func.isRequired,
    onDialogClose: func.isRequired,
    onDialogExited: func.isRequired,
    onEdit: func.isRequired,
    onEditDialogDone: func.isRequired,
  }

  componentDidMount() {
    const { getAction } = this.props
    getAction()
  }

  render() {
    const {
      initialGet,
      tokens,
      dialogs,
      onAdd,
      onAddDialogDone,
      onConfirmDialogConfirm,
      onDelete,
      onDialogClose,
      onDialogExited,
      onEdit,
      onEditDialogDone,
    } = this.props
    return (
      <div>
        <ConfirmDialog
          title="Delete key?"
          text={
            'Are you sure you want to delete key? ' +
            'Apps that using this key will be not able to communicate with api.'
          }
          open={dialogs.confirm.show}
          mount={dialogs.confirm.mount}
          onDone={onConfirmDialogConfirm}
          onClose={() => onDialogClose('confirm')}
          onExited={() => onDialogExited('confirm')}
        />
        <TokenDialog
          title="Create new key"
          open={dialogs.add.show}
          mount={dialogs.add.mount}
          onDone={onAddDialogDone}
          onClose={() => onDialogClose('add')}
          onExited={() => onDialogExited('confirm')}
        />
        <TokenDialog
          token={dialogs.edit.token}
          title="Edit key"
          open={dialogs.edit.show}
          mount={dialogs.edit.mount}
          onDone={onEditDialogDone}
          onClose={() => onDialogClose('edit')}
          onExited={() => onDialogExited('confirm')}
        />
        <Header>
          <Button color="primary" onClick={onAdd}>
            <Icon type="models-header-add" />
            <div className="pl-xs">Add api key</div>
          </Button>
        </Header>
        <Content>
          {initialGet ? (
            <div className="text-center pt-md">
              <CircularProgress size={100} />
            </div>
          ) : !tokens.length ? (
            <div className="text-center mt-xl">
              <Typography type="bigTransperent">Still no api keys</Typography>
              <div>
                <Button color="primary" onClick={onAdd}>
                  Create new api key
                </Button>
              </div>
            </div>
          ) : (
            tokens.map(item => (
              <Card
                key={item.id}
                title={item.name}
                labels={[`#${item.token}`]}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
              />
            ))
          )}
        </Content>
      </div>
    )
  }
}

export const Tokens = connect(
  state => ({
    tokens: state.tokens.data,
    dialogs: state.tokens.dialogs,
    initialGet: state.tokens.loading.initialGet,
  }),
  dispatch => ({
    getAction: (...props) => dispatch(getAction(...props)),
    onAdd: (...props) => dispatch(onAdd(...props)),
    onAddDialogDone: (...props) => dispatch(onAddDialogDone(...props)),
    onConfirmDialogConfirm: (...props) => dispatch(onConfirmDialogConfirm(...props)),
    onDelete: (...props) => dispatch(onDelete(...props)),
    onDialogClose: (...props) => dispatch(onDialogClose(...props)),
    onDialogExited: (...props) => dispatch(onDialogExited(...props)),
    onEdit: (...props) => dispatch(onEdit(...props)),
    onEditDialogDone: (...props) => dispatch(onEditDialogDone(...props)),
  })
)(ATokens)
