const initState = {
    categ : null,
    err : null,
    dataState : "NOT_INIT",
    sucMsg : null
};

export default function(state=initState, action)
{
    console.log(action);
    switch(action.type)
    {
        case "ON_CFETCH":
            return {
                ...state,
                dataState:"FETCHING"
            }
        case "CFETCH_SUC":
            return {
                ...state,
                categ : action.payload,
                dataState : "FETCH_SUCCESS"
            }
        case "CFETCH_FAIL":
            return {
                ...state,
                err : action.payload
            }
        case "ADD_SUC":
            return {
                ...state,
                sucMsg : action.payload
            }
        case "ADD_FAIL":
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
        default :
            return state;
    }   
}