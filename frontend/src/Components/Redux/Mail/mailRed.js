const initState = {
    err : null,
    sMsg : null
};

export default function(state=initState, action)
{
    switch(action.type)
    {
        case "MAIL_SUC" :
            return {
                ...state,
                sMsg : action.payload
            };
        case "MAIL_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "NPASS_SUC" :
            return {
                ...state,
                sMsg : action.payload
            };
        case "NPASS_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "CMAIL_SUC" :
            return {
                ...state,
                sMsg : action.payload
            };
        case "CMAIL_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        default :
            return state;
    }   
}