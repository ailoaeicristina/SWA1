import { ajax } from 'rxjs/ajax'
import { interval, of, merge } from 'rxjs'
import { pairwise, filter, map, concatMap, takeWhile, first, share } from 'rxjs/operators'
import { reduce } from './store'

const log = (data) => {
    console.log(data)
    return data;
}

const poll_url = url => interval(5000).pipe(concatMap(() => ajax.getJSON(url)))

export const polling = state =>
    poll_url(`http://localhost:8080/warnings/since/${state.lastPolled}`)
        .pipe(
            map(state => state),
            map(log),
            takeWhile(state => state.pollEnabled, true)
        )


/*const pollWarnings = () => interval(5000).pipe(
    map(({lastPoll}) => lastPoll ),
    concatMap((lastPoll) => ajax.getJSON(`http://localhost:8080/warnings/since/${lastPoll}`)),
    map(log),
    map(data => store({ type: 'updateWarnings', ...data })),
    takeWhile(({pollEnabled}) => pollEnabled, true)
    );


*/




export default action => {
    console.log(action.state.lastPolled)
    switch (action.type) {
        case 'togglePoll':
            if (action.state.started)
                return of(action)
            else
            {
                action.state.started = true;
                return of(action).pipe(
                    map(action => action.state),
                    concatMap(polling)
                    )
            }
        /*case 'togglePoll':
            reduce({type: action.type})
            break;
        case 'updateMinSeverityLevel':
            reduce({ type: action.type, action })
            break;*/
        default:
            return of(action)
    }
}