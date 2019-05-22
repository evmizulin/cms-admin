import React, { Component } from 'react'
import { Header } from 'src/global/components/Header'
import { Content } from 'src/global/components/Content'
import { Button } from 'src/lib/components/Button'
import { Icon } from 'src/lib/components/Icon'
import { shape, arrayOf, string, func, bool, instanceOf, object } from 'prop-types'
import { ModelType } from 'src/lib/types/models/ModelType'
import { EntryType } from 'src/lib/types/entries/EntryType'
import { Typography } from 'src/lib/components/Typography'
import { connect } from 'react-redux'
import { Redirect } from 'src/global/components/Redirect'
import { EntryDialog } from 'src/entries/components/dialogs/EntryDialog'
import { ConfirmDialog } from 'src/lib/components/ConfirmDialog'
import { CardFactory } from 'src/entries/components/cards/CardFactory'
import { onAddDialogDone } from 'src/entries/actions/onAddDialogDone'
import { onAddEntry } from 'src/entries/actions/onAddEntry'
import { onDeleteEntry } from 'src/entries/actions/onDeleteEntry'
import { onDialogClose } from 'src/entries/actions/onDialogClose'
import { onDialogExited } from 'src/entries/actions/onDialogExited'
import { onEditDialogDone } from 'src/entries/actions/onEditDialogDone'
import { onEditEntry } from 'src/entries/actions/onEditEntry'
import { onConfirmDialogConfirm } from 'src/entries/actions/onConfirmDialogConfirm'
import { routes } from 'src/lib/services/Routes'

class AEntries extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        modelId: string.isRequired,
      }).isRequired,
    }).isRequired,
    models: arrayOf(instanceOf(ModelType)).isRequired,
    entries: arrayOf(instanceOf(EntryType)).isRequired,
    conflicts: arrayOf(
      shape({
        id: string.isRequired,
        conflict: bool.isRequired,
      })
    ).isRequired,
    dialogs: shape({
      confirm: object.isRequired,
      add: object.isRequired,
      edit: object.isRequired,
    }).isRequired,
    onAddDialogDone: func.isRequired,
    onAddEntry: func.isRequired,
    onDeleteEntry: func.isRequired,
    onDialogClose: func.isRequired,
    onDialogExited: func.isRequired,
    onEditDialogDone: func.isRequired,
    onEditEntry: func.isRequired,
    onConfirmDialogConfirm: func.isRequired,
  }

  getModel() {
    const { modelId } = this.props.match.params
    const { models } = this.props
    return models.find(model => model.id === modelId)
  }

  getEntries() {
    const { entries } = this.props
    const model = this.getModel()
    return entries.filter(item => item.modelId === model.id)
  }

  render() {
    const model = this.getModel()
    if (!model) return <Redirect to={routes.notFound()} />
    const entries = this.getEntries()
    const {
      conflicts,
      dialogs,
      onAddDialogDone,
      onAddEntry,
      onDeleteEntry,
      onDialogClose,
      onDialogExited,
      onEditDialogDone,
      onEditEntry,
      onConfirmDialogConfirm,
      entries: allEntries,
    } = this.props
    return (
      <div>
        <ConfirmDialog
          title="Delete entry?"
          text="Are you sure you want to delete entry?"
          open={dialogs.confirm.show}
          onDone={() => onConfirmDialogConfirm()}
          onClose={() => onDialogClose('confirm')}
          onExited={() => onDialogExited('confirm')}
        />
        <EntryDialog
          open={dialogs.add.show}
          title="Create new entry"
          onDone={onAddDialogDone}
          onClose={() => onDialogClose('add')}
          onExited={() => onDialogExited('add')}
          model={dialogs.add.model}
          entries={allEntries}
        />
        <EntryDialog
          title="Edit entry"
          open={dialogs.edit.show}
          onDone={onEditDialogDone}
          onClose={() => onDialogClose('edit')}
          model={dialogs.edit.model}
          entry={dialogs.edit.entry}
          onExited={() => onDialogExited('edit')}
          entries={allEntries}
        />
        <Header>
          <Button color="primary" onClick={() => onAddEntry(model)}>
            <Icon type="models-header-add" />
            <div className="pl-xs">Add entry</div>
          </Button>
        </Header>
        <Content>
          {!entries.length ? (
            <div className="mt-xl text-center">
              <Typography type="bigTransperent">Still no entries</Typography>
              <div>
                <Button color="primary" onClick={() => onAddEntry(model)}>
                  Create new entry
                </Button>
              </div>
            </div>
          ) : (
            entries.map((entry, i) => (
              <CardFactory
                key={entry.id}
                model={model}
                entry={entry}
                entries={allEntries}
                conflict={conflicts.find(conflict => conflict.id === entry.id).conflict}
                onEdit={() => onEditEntry(entry, model)}
                onDelete={() => onDeleteEntry(entry.id)}
              />
            ))
          )}
        </Content>
      </div>
    )
  }
}

export const Entries = connect(
  state => ({
    models: state.models.data,
    entries: state.entries.data,
    conflicts: state.entries.conflicts,
    dialogs: state.entries.dialogs,
  }),
  dispatch => ({
    onAddDialogDone: (...props) => dispatch(onAddDialogDone(...props)),
    onAddEntry: (...props) => dispatch(onAddEntry(...props)),
    onDeleteEntry: (...props) => dispatch(onDeleteEntry(...props)),
    onDialogClose: (...props) => dispatch(onDialogClose(...props)),
    onDialogExited: (...props) => dispatch(onDialogExited(...props)),
    onEditDialogDone: (...props) => dispatch(onEditDialogDone(...props)),
    onEditEntry: (...props) => dispatch(onEditEntry(...props)),
    onConfirmDialogConfirm: (...props) => dispatch(onConfirmDialogConfirm(...props)),
  })
)(AEntries)
