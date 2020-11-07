import ReactDOM from 'react-dom';
import model from './model.js'
import store from './store.js'
import view from './view.js'
import dispatcher from './dispatcher.js'

function init() {
  try {
    const theModel = model("")
    let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
    let theDispatcher
    const theView = view(() => theDispatcher)
    const theStore = store(theModel, theView, renderer)
    theDispatcher = dispatcher(theStore)
    renderer(theView(theModel))

  } catch (err) {
    console.log(err)
  }
}

init()
