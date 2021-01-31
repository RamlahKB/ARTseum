const initState = {
    comms : null,
    err : null, 
    dataState : "NOT_INIT",
    sucMsg : null
};

export default function(state=initState, action)
{
    switch(action.type)
    {
        case "ON_ComFETCH" :
            return {
                ...state,
                dataState : "FETCHING"
            }
        case "ComFETCH_SUC" :
            return {
                ...state,
                comms : action.payload,
                dataState : "FETCH_SUCCESS"
            }
        case "ComFETCH_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "ComADD_SUC" :
            return {
                ...state,
                sucMsg : action.payload
            }
        case "ComADD_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "ComDEL_SUC":
            return {
                ...state,
                sucMsg : action.payload
            }
        case "ComDEL_FAIL":
            return {
                ...state,
                err : action.payload
            }
        default :
            return state;
    }   
}