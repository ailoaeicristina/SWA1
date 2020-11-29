import ReactDOM from 'react-dom';
import model from './model.js'
import store from './store.js'
import view from './view.js'
import dispatcher from './dispatcher.js'
import { Observable } from 'rxjs'
import { map, mergeMap, scan } from 'rxjs/operators'

async function init() {
  try {
    const warnings_res = await fetch('http://localhost:8080/warnings')
    const warnings = await warnings_res.json()

    const observable = new Observable()

    const theModel = model(warnings, 'ON')
    let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
    let theDispatcher
    const theView = view(() => theDispatcher)
    const theStore = store(theModel, theView, renderer)
    theDispatcher = dispatcher(theStore)

    renderer(theView(theModel))

    observable.pipe(
      mergeMap(dispatcher),
      scan(store, theModel),
      map(theView)
    )
    .subscribe(renderer)
  } catch (err) {
    console.log(err)
  }
}

init()
