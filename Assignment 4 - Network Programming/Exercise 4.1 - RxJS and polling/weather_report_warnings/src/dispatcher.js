import { ajax } from 'rxjs/ajax'
import { interval, of, merge} from 'rxjs'
import { pairwise, filter, map, concatMap, takeWhile, first, share } from 'rxjs/operators'
import store from './store'

const log = (data) => {
    console.log(data.time)
    return data;
}

export const pollWarnings = () => interval(5000).pipe(
    map(({lastPoll}) => lastPoll ),
    concatMap((lastPoll) => ajax.getJSON(`http://localhost:8080/warnings/since/${lastPoll}`)),
    map(log),
    map(data => store({ type: 'updateWarnings', ...data })),
    takeWhile(({pollEnabled}) => pollEnabled, true)
    );


export default store => async ({ type, ...params }) => {
    switch (type) {
        case 'togglePoll':
            store({type, ...params})
            break;
        case 'updateMinSeverityLevel':
            const { minSeverityLevel } = params
            store({ type, ...params, minSeverityLevel })
            break;
        case 'updatePollEnabled':
            const refreshedWarnings = await fetch('http://localhost:8080/warnings').then(res => res.json())
            store({ type, ...params, refreshedWarnings })
            break;
        default:
    }
}