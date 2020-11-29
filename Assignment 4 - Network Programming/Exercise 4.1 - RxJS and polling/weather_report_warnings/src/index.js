import ReactDOM from 'react-dom';
import model from './model.js'
import { reduce } from './store'
import dispatcher from './dispatcher.js'
import { create_view } from './view.js'
import { map, mergeMap, scan, } from 'rxjs/operators'
import { Subject , of} from 'rxjs';

fetch('http://localhost:8080/warnings')
.then(res => res.json())
.then(data => {
  const actions = new Subject()
  const dispatch = action => actions.next(action)
  const render = dom => ReactDOM.render(dom, document.getElementById('root'))
  const view = create_view(dispatch)
  const init_state = model(data.warnings, false, "1", data.time, false)
  
  render(view(init_state))

  actions.pipe(
    mergeMap(dispatcher),
    scan(reduce, init_state),
    map(view)
  )
  .subscribe(render)
})