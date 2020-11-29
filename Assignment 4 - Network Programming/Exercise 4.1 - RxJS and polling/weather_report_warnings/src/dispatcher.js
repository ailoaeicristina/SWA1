import { ajax } from 'rxjs/ajax'
import { interval, of } from 'rxjs'
import { map, concatMap, takeWhile, } from 'rxjs/operators'

const log = (data) => {
    console.log(data)
    return data;
}

const poll_url = url => interval(1000).pipe(concatMap(() => ajax.getJSON(url)))

export const polling = state =>
    poll_url(`http://localhost:8080/warnings/since/${state.lastPolled}`)
        .pipe(
            map(state => state),
            map(log),
            takeWhile(state => /*state.pollEnabled*/ true, true)
        )


export default action => {
    console.log(action.state.lastPolled)
    switch (action.type) {
        case 'togglePoll':
            if (action.state.started)
                return of(action)
            else {
                action.state.started = true;
                return of(action).pipe(
                    map(action => action.state),
                    concatMap(polling)
                )
            }
        default:
            return of(action)
    }
}