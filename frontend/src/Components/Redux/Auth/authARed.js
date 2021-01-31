const initState = {
    isAuth : false,
    admin : {},
    err : null,
    // roll : admin
};

export default function(state=initState, action)
{
    switch(action.type)
    {
        case "AREG_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "ALOG_SUC" :
            return {
                ...state,
                isAuth : true,
                admin : action.payload
            };
        case "ALOG_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "ALOGOUT_SUC" :
            return {
                ...state,
                isAuth : false,
                admin : {}
            }
        default :
            return state;
    }   
}