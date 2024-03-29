import ReactDOM from 'react-dom';
import model from './model.js'
import store from './store.js'
import view from './view.js'
import dispatcher from './dispatcher.js'

async function init() {
  try {
    const historicals_res = await fetch('http://localhost:8080/data')
    const historicals = await historicals_res.json()

    const predictions_res = await fetch('http://localhost:8080/forecast')
    const predictions = await predictions_res.json()

    var d = new Date()
    d.setDate(d.getDate() - 5)
    const theModel = model(historicals, predictions, 'All', d, new Date(), 'historical')
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
