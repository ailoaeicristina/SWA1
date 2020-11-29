import ReactDOM from 'react-dom';
import model from './model.js'
import store from './store.js'
import view from './view.js'
import dispatcher from './dispatcher.js'
import {pollWarnings} from './dispatcher.js'
import { Observable, of } from 'rxjs'
import { map, mergeMap, scan } from 'rxjs/operators'

const kalle = () => console.log("test")

async function init() {
  try {
    const data_res = await fetch('http://localhost:8080/warnings')
    const data = await data_res.json()

    const observable = new Observable()

    const theModel = model(data.warnings, true, "1", data.time)
    let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
    let theDispatcher
    const theView = view(() => theDispatcher)
    const theStore = store(theModel, theView, renderer)
    theDispatcher = dispatcher(theStore)

    renderer(theView(theModel))

    observable.pipe(
      map(kalle),
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
