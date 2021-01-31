const initState = {
    isAuth : false,
    user : {},
    err : null,
    sMsg : null
};

export default function(state=initState, action)
{
    switch(action.type)
    {
        case "REG_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "LOG_SUC" :
            return {
                ...state,
                isAuth : true,
                user : action.payload
            };
        case "LOG_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "GLOG_SUC" :
            return {
                ...state,
                isAuth : true,
                user : action.payload
            };
        case "GLOG_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        case "UDEL_SUC" :
            return {
                ...state,
                sMsg : action.payload,
                isAuth : false,
                user : {}
            };
        case "UDEL_FAIL" :
            return {
                ...state,
                err : action.payload
            }
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
        case "LOGOUT_SUC" :
            return {
                ...state,
                isAuth : false,
                user : {}
            }
        case "UPDUSR_SUC" :
            return {
                ...state,
                user : action.payload
            }
        case "UPDUSR_FAIL" :
            return {
                ...state,
                err : action.payload
            }
        default :
            return state;
    }   
}