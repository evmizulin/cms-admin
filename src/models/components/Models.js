import React, { Component } from 'react'
import { Header } from 'src/global/components/Header'
import { Content } from 'src/global/components/Content'
import { Button } from 'src/lib/components/Button'
import { Icon } from 'src/lib/components/Icon'
import { AddDialog } from 'src/models/components/dialogs/AddDialog'
import { func, arrayOf, instanceOf, shape, object, string, bool } from 'prop-types'
import { CardFactory } from 'src/models/components/cards/CardFactory'
import { Typography } from 'src/lib/components/Typography'
import { connect } from 'react-redux'
import { ModelType } from 'src/lib/types/models/ModelType'
import { ConfirmDialog } from 'src/models/components/dialogs/ConfirmDialog'
import { onDeleteItem } from 'src/models/actions/onDeleteItem'
import { onDeleteModel } from 'src/models/actions/onDeleteModel'
import { onDeleteProp } from 'src/models/actions/onDeleteProp'
import { onDialogConfirmConfirmItem } from 'src/models/actions/onDialogConfirmConfirmItem'
import { onDialogConfirmConfirmModel } from 'src/models/actions/onDialogConfirmConfirmModel'
import { onDialogConfirmConfirmProp } from 'src/models/actions/onDialogConfirmConfirmProp'
import { onAddModel } from 'src/models/actions/onAddModel'
import { onAddProp } from 'src/models/actions/onAddProp'
import { onAddItem } from 'src/models/actions/onAddItem'
import { onDialogAddDoneModel } from 'src/models/actions/onDialogAddDoneModel'
import { onDialogAddDoneProp } from 'src/models/actions/onDialogAddDoneProp'
import { onDialogAddDoneItem } from 'src/models/actions/onDialogAddDoneItem'
import { EditDialog } from 'src/models/components/dialogs/EditDialog'
import { onDialogEditDoneItem } from 'src/models/actions/onDialogEditDoneItem'
import { onDialogEditDoneModel } from 'src/models/actions/onDialogEditDoneModel'
import { onDialogEditDoneProp } from 'src/models/actions/onDialogEditDoneProp'
import { onEditItem } from 'src/models/actions/onEditItem'
import { onEditModel } from 'src/models/actions/onEditModel'
import { onEditProp } from 'src/models/actions/onEditProp'
import { onDialogExited } from 'src/models/actions/onDialogExited'
import { onDialogClose } from 'src/models/actions/onDialogClose'

class AModels extends Component {
  static propTypes = {
    conflicts: arrayOf(
      shape({
        id: string.isRequired,
        conflict: bool.isRequired,
      })
    ).isRequired,
    models: arrayOf(instanceOf(ModelType)).isRequired,
    dialogs: shape({
      confirm: object.isRequired,
      add: object.isRequired,
      edit: object.isRequired,
    }).isRequired,
    onDeleteItem: func.isRequired,
    onDeleteModel: func.isRequired,
    onDeleteProp: func.isRequired,
    onDialogConfirmConfirmItem: func.isRequired,
    onDialogConfirmConfirmModel: func.isRequired,
    onDialogConfirmConfirmProp: func.isRequired,
    onAddModel: func.isRequired,
    onAddProp: func.isRequired,
    onAddItem: func.isRequired,
    onDialogAddDoneModel: func.isRequired,
    onDialogAddDoneProp: func.isRequired,
    onDialogAddDoneItem: func.isRequired,
    onEditModel: func.isRequired,
    onEditProp: func.isRequired,
    onEditItem: func.isRequired,
    onDialogEditDoneModel: func.isRequired,
    onDialogEditDoneProp: func.isRequired,
    onDialogEditDoneItem: func.isRequired,
    onDialogExited: func.isRequired,
    onDialogClose: func.isRequired,
  }

  render() {
    const {
      conflicts,
      models,
      dialogs,
      onDeleteItem,
      onDeleteModel,
      onDeleteProp,
      onDialogConfirmConfirmItem,
      onDialogConfirmConfirmModel,
      onDialogConfirmConfirmProp,
      onAddModel,
      onAddProp,
      onAddItem,
      onDialogAddDoneModel,
      onDialogAddDoneProp,
      onDialogAddDoneItem,
      onEditModel,
      onEditProp,
      onEditItem,
      onDialogEditDoneModel,
      onDialogEditDoneProp,
      onDialogEditDoneItem,
      onDialogExited,
      onDialogClose,
    } = this.props
    return (
      <div>
        <ConfirmDialog
          open={dialogs.confirm.show}
          mod={dialogs.confirm.mod}
          onConfirmItem={onDialogConfirmConfirmItem}
          onConfirmModel={onDialogConfirmConfirmModel}
          onConfirmProp={onDialogConfirmConfirmProp}
          onClose={() => onDialogClose('confirm')}
          onExited={() => onDialogExited('confirm')}
        />
        <AddDialog
          open={dialogs.add.show}
          mod={dialogs.add.mod}
          onDoneModel={onDialogAddDoneModel}
          onDoneProp={onDialogAddDoneProp}
          onDoneItem={onDialogAddDoneItem}
          onClose={() => onDialogClose('add')}
          onExited={() => onDialogExited('add')}
          models={models}
        />
        <EditDialog
          open={dialogs.edit.show}
          mod={dialogs.edit.mod}
          initialModel={dialogs.edit.model}
          onDoneItem={onDialogEditDoneItem}
          onDoneModel={onDialogEditDoneModel}
          onDoneProp={onDialogEditDoneProp}
          onClose={() => onDialogClose('edit')}
          onExited={() => onDialogExited('edit')}
          models={models}
        />
        <Header>
          <Button color="primary" onClick={onAddModel}>
            <Icon type="models-header-add" />
            <div className="pl-xs">Add content model</div>
          </Button>
        </Header>
        <Content>
          {!models ? (
            <div className="text-center mt-xl">
              <Typography type="bigTransperent">
                Something went wrong. <br />
                Try to reload the page.
              </Typography>
            </div>
          ) : !models.length ? (
            <div className="text-center mt-xl">
              <Typography type="bigTransperent">Still no content models</Typography>
              <div>
                <Button color="primary" onClick={onAddModel}>
                  Create new model
                </Button>
              </div>
            </div>
          ) : (
            models.map(model => (
              <CardFactory
                conflict={conflicts.find(item => item.id === model.id).conflict}
                key={model.id}
                model={model}
                onDelete={() => onDeleteModel(model.id)}
                onDeleteItem={dist => onDeleteItem(model.id, dist)}
                onDeleteProp={dist => onDeleteProp(model.id, dist)}
                onAddProp={dist => onAddProp(model.id, dist)}
                onAddItem={dist => onAddItem(model.id, dist)}
                onEdit={() => onEditModel(model)}
                onEditProp={(dist, property) => onEditProp(model.id, dist, property)}
                onEditItem={(dist, item) => onEditItem(model.id, dist, item)}
              />
            ))
          )}
        </Content>
      </div>
    )
  }
}

export const Models = connect(
  state => ({ models: state.models.data, dialogs: state.models.dialogs, conflicts: state.models.conflicts }),
  dispatch => ({
    onDeleteItem: (...props) => dispatch(onDeleteItem(...props)),
    onDeleteModel: (...props) => dispatch(onDeleteModel(...props)),
    onDeleteProp: (...props) => dispatch(onDeleteProp(...props)),
    onDialogConfirmConfirmItem: (...props) => dispatch(onDialogConfirmConfirmItem(...props)),
    onDialogConfirmConfirmModel: (...props) => dispatch(onDialogConfirmConfirmModel(...props)),
    onDialogConfirmConfirmProp: (...props) => dispatch(onDialogConfirmConfirmProp(...props)),
    onAddModel: (...props) => dispatch(onAddModel(...props)),
    onAddProp: (...props) => dispatch(onAddProp(...props)),
    onAddItem: (...props) => dispatch(onAddItem(...props)),
    onDialogAddDoneModel: (...props) => dispatch(onDialogAddDoneModel(...props)),
    onDialogAddDoneProp: (...props) => dispatch(onDialogAddDoneProp(...props)),
    onDialogAddDoneItem: (...props) => dispatch(onDialogAddDoneItem(...props)),
    onDialogEditDoneItem: (...props) => dispatch(onDialogEditDoneItem(...props)),
    onDialogEditDoneModel: (...props) => dispatch(onDialogEditDoneModel(...props)),
    onDialogEditDoneProp: (...props) => dispatch(onDialogEditDoneProp(...props)),
    onEditItem: (...props) => dispatch(onEditItem(...props)),
    onEditModel: (...props) => dispatch(onEditModel(...props)),
    onEditProp: (...props) => dispatch(onEditProp(...props)),
    onDialogExited: (...props) => dispatch(onDialogExited(...props)),
    onDialogClose: (...props) => dispatch(onDialogClose(...props)),
  })
)(AModels)
