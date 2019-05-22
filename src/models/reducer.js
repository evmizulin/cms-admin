import { errorSet } from 'src/global/reducer'
import { fetchingStart, fetchingEnd } from 'src/global/reducer'
import { dispatch } from 'src/store'
import { deleteAction } from 'src/models/actions/delete'
import { putAction } from 'src/models/actions/put'
import { postAction } from 'src/models/actions/post'
import clone from 'clone'

export function deleteStart(state) {
  fetchingStart(state)
  state.models.loading.delete = true
}

export function deleteEnd(state, models) {
  fetchingEnd(state)
  state.models.loading.delete = false
}

export function deleteError(state, error) {
  fetchingEnd(state)
  state.models.loading.delete = false
  errorSet(state, { show: true, error })
}

export function postStart(state) {
  fetchingStart(state)
  state.models.loading.post = true
}

export function postEnd(state) {
  fetchingEnd(state)
  state.models.loading.post = false
}

export function postError(state, error) {
  fetchingEnd(state)
  state.models.loading.post = false
  errorSet(state, { show: true, error })
}

export function putStart(state) {
  fetchingStart(state)
  state.models.loading.put = true
}

export function putEnd(state, models) {
  fetchingEnd(state)
  state.models.loading.put = false
}

export function putError(state, error) {
  fetchingEnd(state)
  state.models.loading.put = false
  errorSet(state, { show: true, error })
}

export function onDialogExited(state, payload) {
  const { dialogType } = payload
  state.models.dialogs[dialogType] = { show: false }
}

export function onDialogClose(state, payload) {
  const { dialogType } = payload
  state.models.dialogs[dialogType].show = false
}

export function onDeleteModel(state, payload) {
  const { id } = payload
  state.models.dialogs.confirm = { mod: 'model', id, show: true }
}

export function onDeleteProp(state, payload) {
  const { id, dist } = payload
  state.models.dialogs.confirm = { mod: 'prop', id, dist, show: true }
}

export function onDeleteItem(state, payload) {
  const { id, dist } = payload
  state.models.dialogs.confirm = { mod: 'item', id, dist, show: true }
}

export function onDialogConfirmConfirmModel(state) {
  const { id } = state.models.dialogs.confirm
  const entries = state.entries.data.filter(item => item.modelId === id)
  state.models.dialogs.confirm.show = false
  setTimeout(() => dispatch(deleteAction(id, entries)), 0)
}

export function onDialogConfirmConfirmItem(state) {
  const { id, dist } = state.models.dialogs.confirm
  state.models.dialogs.confirm.show = false
  const model = state.models.data.find(item => item.id === id)
  const newModel = clone(model)
  dist.reduce((res, prop, i) => {
    const last = i === dist.length - 1
    if (last) {
      delete res.items
      return null
    } else {
      return res[prop]
    }
  }, newModel)
  setTimeout(() => dispatch(putAction(newModel)), 0)
}

export function onDialogConfirmConfirmProp(state) {
  const { id, dist } = state.models.dialogs.confirm
  state.models.dialogs.confirm.show = false
  const model = state.models.data.find(item => item.id === id)
  const newModel = clone(model)
  dist.reduce((res, prop, i) => {
    const last = i === dist.length - 2
    if (last) {
      const propName = dist.slice(-1).pop()
      res.required = res.required.filter(field => field !== propName)
      delete res.properties[propName]
      return {}
    } else {
      return res[prop]
    }
  }, newModel)
  setTimeout(() => dispatch(putAction(newModel)), 0)
}

export function onAddModel(state) {
  state.models.dialogs.add = { mod: 'model', show: true }
}

export function onAddProp(state, payload) {
  const { id, dist } = payload
  state.models.dialogs.add = { mod: 'prop', show: true, id, dist }
}

export function onAddItem(state, payload) {
  const { id, dist } = payload
  state.models.dialogs.add = { mod: 'item', show: true, id, dist }
}

export function onDialogAddDoneModel(state, payload) {
  const { model } = payload
  state.models.dialogs.add.show = false
  setTimeout(() => dispatch(postAction(model)), 0)
}

export function onDialogAddDoneProp(state, payload) {
  const { property } = payload
  const { id, dist } = state.models.dialogs.add
  const model = state.models.data.find(item => item.id === id)
  const newModel = clone(model)
  state.models.dialogs.add.show = false
  dist.reduce((res, prop, i) => {
    const last = i === dist.length - 1
    if (last) {
      res.required = res.required.filter(field => field !== property.propertyName)
      if (property.requiredProperty) {
        res.required.push(property.propertyName)
      }
      delete property.requiredProperty

      res.properties[property.propertyName] = property
      delete property.propertyName

      return {}
    } else {
      return res[prop]
    }
  }, newModel)
  setTimeout(() => dispatch(putAction(newModel)), 0)
}

export function onDialogAddDoneItem(state, payload) {
  const { item } = payload
  const { id, dist } = state.models.dialogs.add
  const model = state.models.data.find(item => item.id === id)
  const newModel = clone(model)
  state.models.dialogs.add.show = false
  dist.reduce((res, prop, i) => {
    const last = i === dist.length - 1
    if (last) {
      res.items = item
      return {}
    } else {
      return res[prop]
    }
  }, newModel)
  setTimeout(() => dispatch(putAction(newModel)), 0)
}

export function onEditModel(state, payload) {
  const { model } = payload
  state.models.dialogs.edit = { mod: 'model', model, show: true }
}

export function onEditProp(state, payload) {
  const { id, dist, property } = payload
  state.models.dialogs.edit = { mod: 'prop', id, dist, model: property, show: true }
}

export function onEditItem(state, payload) {
  const { id, dist, item } = payload
  state.models.dialogs.edit = { mod: 'item', id, dist, model: item, show: true }
}

export function onDialogEditDoneModel(state, payload) {
  const { model } = payload
  state.models.dialogs.edit.show = false
  setTimeout(() => dispatch(putAction(model)), 0)
}

export function onDialogEditDoneProp(state, payload) {
  const { property } = payload
  const { id, dist } = state.models.dialogs.edit
  const model = state.models.data.find(item => item.id === id)
  const newModel = clone(model)
  state.models.dialogs.edit.show = false
  dist.reduce((res, prop, i) => {
    const last = i === dist.length - 2
    if (last) {
      const oldPropertyName = dist.slice(-1).pop()
      res.required = res.required.filter(
        field => field !== oldPropertyName && field !== property.propertyName
      )
      if (property.requiredProperty) {
        res.required.push(property.propertyName)
      }
      delete property.requiredProperty

      delete res.properties[oldPropertyName]
      res.properties[property.propertyName] = property
      delete property.propertyName

      return {}
    } else {
      return res[prop]
    }
  }, newModel)
  setTimeout(() => dispatch(putAction(newModel)), 0)
}

export function onDialogEditDoneItem(state, payload) {
  const { item } = payload
  const { id, dist } = state.models.dialogs.edit
  const model = state.models.data.find(item => item.id === id)
  const newModel = clone(model)
  state.models.dialogs.edit.show = false
  dist.reduce((res, prop, i) => {
    const last = i === dist.length - 1
    if (last) {
      res.items = item
      return {}
    } else {
      return res[prop]
    }
  }, newModel)
  setTimeout(() => dispatch(putAction(newModel)), 0)
}

const modifiers = {
  deleteStart,
  deleteEnd,
  deleteError,
  postStart,
  postEnd,
  postError,
  putStart,
  putEnd,
  putError,
  onDeleteModel,
  onDeleteProp,
  onDeleteItem,
  onDialogConfirmConfirmModel,
  onDialogConfirmConfirmItem,
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
}

export const modelsReducer = (state, action) => {
  const modifier = modifiers[action.type]
  modifier(state, action.payload)
}
