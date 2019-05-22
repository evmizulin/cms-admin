import { getStringLine } from 'src/mocks/getStringLine'
import { getStringMultiline } from 'src/mocks/getStringMultiline'
import { getStringMarkdown } from 'src/mocks/getStringMarkdown'
import { getStringHtml } from 'src/mocks/getStringHtml'
import { getNumber } from 'src/mocks/getNumber'
import { getBoolean } from 'src/mocks/getBoolean'
import { getObject } from 'src/mocks/getObject'
import { getArray } from 'src/mocks/getArray'
import { getEnum } from 'src/mocks/getEnum'
import { getReference } from 'src/mocks/getReference'
import { getAsset } from 'src/mocks/getAsset'
import clone from 'clone'

const get = {
  boolean: getBoolean,
  stringLine: getStringLine,
  stringMultiline: getStringMultiline,
  stringMarkdown: getStringMarkdown,
  stringHtml: getStringHtml,
  number: getNumber,
  object: getObject,
  array: getArray,
  enum: getEnum,
  reference: getReference,
  asset: getAsset,
}

class Mocks {
  constructor() {
    const data = []
    this.models = data.map(item => item.model)
    this.entries = data.map(item => item.entry)
    this.sync()
  }

  sync() {
    window.mocks = {
      models: this.models,
      entries: this.entries,
    }
  }

  getEntries() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(clone(this.entries))
      }, 300)
    })
  }

  getModels() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(clone(this.models))
      }, 300)
    })
  }

  deleteEntry(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.entries = this.entries.filter(item => item.id !== id)
        this.sync()
        resolve()
      }, 300)
    })
  }

  deleteModel(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.models = this.models.filter(item => item.id !== id)
        this.sync()
        resolve()
      }, 300)
    })
  }

  addEntry(entry) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.entries.push({
          id: `${Math.round(Math.random() * 1e9)}`,
          ...entry,
        })
        this.sync()
        resolve()
      }, 300)
    })
  }

  addModel(model) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.models.push({
          id: `${Math.round(Math.random() * 1e9)}`,
          ...model,
        })
        this.sync()
        resolve()
      }, 300)
    })
  }

  updateEntry(entry) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.entries.forEach((item, i) => {
          if (item.id === entry.id) {
            this.entries[i] = entry
          }
        })
        this.sync()
        resolve()
      }, 300)
    })
  }

  updateModel(model) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.models.forEach((item, i) => {
          if (item.id === model.id) {
            this.models[i] = model
          }
        })
        this.sync()
        resolve()
      }, 300)
    })
  }

  addFile(file) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`http://localhost:3000/${Math.round(Math.random() * 1e3)}.jpg`)
      }, 300)
    })
  }

  deleteFile(fileUrl) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  }
}

export const mocks = new Mocks()
