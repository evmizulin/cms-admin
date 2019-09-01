export const state = () => ({
  global: {
    error: {
      show: false,
      message: '',
    },
    redirect: '',
    loading: [], // [true, true]
    projectId: null, // id
  },
  models: {
    loading: {
      initialGet: true,
      get: false,
      delete: false,
      post: false,
      put: false,
    },
    data: [],
    dialogs: {
      // mod = model || prop || item
      // dist = [properties, name]
      // addDist = [properties, obj, properties]
      // model = model || submodel
      confirm: { show: false }, // { mod, id, dist }
      add: { show: false }, // { mod, id, dist: addDist, show }
      edit: { show: false }, // { mod, id, dist, model }
    },
    conflicts: [], // [{id, conflict: bool}]
  },
  entries: {
    loading: {
      initialGet: true,
      get: false,
      post: false,
      put: false,
      delete: false,
    },
    data: [],
    conflicts: [], // [{id, conflict: bool}]
    dialogs: {
      confirm: { show: false }, // { id, show }
      add: { show: false }, // { model, show }
      edit: { show: false }, // { entry, model, show }
    },
  },
  projects: {
    loading: {
      initialGet: true,
      get: false,
      post: false,
      put: false,
      delete: false,
    },
    data: [],
    dialogs: {
      confirm: { show: false, mount: false }, // { id, show, mount }
      add: { show: false, mount: false }, // { show, mount }
      edit: { show: false, mount: false }, // { project, show, mount }
    },
  },
  tokens: {
    loading: {
      initialGet: true,
      get: false,
      post: false,
      put: false,
      delete: false,
    },
    data: [],
    dialogs: {
      confirm: { show: false, mount: false }, // { id, show, mount }
      add: { show: false, mount: false }, // { show, mount }
      edit: { show: false, mount: false }, // { token, show, mount }
    },
  },
  login: {
    loading: {
      post: false,
    },
  },
  signup: {
    loading: {
      signup: false,
    },
    showCheckEmailMessage: false,
    confirmStatus: 'loading',
  },
  recoverPass: {
    loading: {
      post: false,
    },
    showMessage: false,
  },
  changePass: {
    loading: {
      post: false,
    },
    showMessage: false,
  },
  contacts: {
    loading: {
      post: false,
    },
    status: 'form', // form || success
  },
})
