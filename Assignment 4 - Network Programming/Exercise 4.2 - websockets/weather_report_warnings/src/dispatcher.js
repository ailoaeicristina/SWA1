export const server_dispatch = ws => action => {
    console.log(action)
    return action;
    /*switch(action.type) {
      case 'concede': {
        const winner  = action.player === 'X' ? 'O' : 'X'
        return { ...action, winner }
      }
      default:
        return action
    }*/
  }

  export const create_action = server_msg => {
    console.log(server_msg)
  }

export default store => async ({ type, ...params }) => {
    console.log(type)
    console.log(params)
    /*switch (type) {
        case 'updateMinSeverityLevel':
            const { minSeverityLevel } = params
            store({ type, ...params, minSeverityLevel })
            break;
        case 'updateWarningsStatusClicked':
            const refreshedWarnings = await fetch('http://localhost:8080/warnings').then(res => res.json())
            store({ type, ...params, refreshedWarnings })
            break;
        default:
    }*/
}