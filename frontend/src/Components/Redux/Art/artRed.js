const initState = {
    arts : null,
    err : null, 
    dataState : "NOT_INIT",
    sucMsg : null
};

export default function(state=initState, action)
{
    switch(action.type)
    {
        case "ON_FETCH" :
            return {
                ...state,
                dataState : "FETCHING"
            }
        case "FETCH_SUC" :
            return {
                ...state,
                arts : action.payload,
                dataState : "FETCH_SUCCESS"
            }
        case "FETCH_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "ADD_SUC" :
            return {
                ...state,
                sucMsg : action.payload
            }
        case "ADD_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "MOD_SUC":
            return {
                ...state,
                sucMsg : action.payload
            }
        case "MOD_FAIL":
            return {
                ...state,
                err : action.payload
            }
        case "DEL_SUC":
            return {
                ...state,
                sucMsg : action.payload
            }
        case "DEL_FAIL":
            return {
                ...state,
                err : action.payload
            }
        case "UPD_SUC" :
            return {
                ...state,
                sucMsg : action.payload
            }
        case "UPD_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "LIK_SUC" :
            return {
                ...state,
                sucMsg : action.payload
            }
        case "LIK_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "DLIK_SUC" :
            return {
                ...state,
                sucMsg : action.payload
            }
        case "DLIK_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        default :
            return state;
    }   
}