import axios from 'axios';

export const onFetchCom=()=>{
    // console.log("fetch art");
    return(dispatch)=>{
        dispatch(onComFetch);
        axios.get("http://localhost:2000/viewCom")
        .then((res)=>{
            if(res.status === 200)
            {
                dispatch(onComFetchSuc(res.data));
                return true;
            }
            else 
            {
                dispatch(onComFetchFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err.response.data);
        });
    };
}

export const onComFetch=()=>{
    return {
        type : "ON_ComFETCH"
    }
}

export const onComFetchSuc=(data)=>{
    return {
        type : "ComFETCH_SUC",
        payload : data
    }
}

export const onComFetchFail=(msg)=>{
    return {
        type : "ComFETCH_FAIL",
        payload : msg
    }
}

export const onAddCom=(data)=>{
    return(dispatch)=>{
        axios.post("http://localhost:2000/addCom", data)
        .then((res)=>{
            if(res.status === 200)
            {
                dispatch(onComAddSuc(res.data.msg));
                return true;
            }
            else
            {
                dispatch(onComAddFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(onComAddFail(err.response.data.msg));
        });
    };
}

export const onComAddSuc=(msg)=>{
    return {
        type : "ComADD_SUC",
        payload : msg
    }
}

export const onComAddFail=(msg)=>{
    return {
        type : "ComADD_FAIL",
        payload : msg
    }
}

export const onComDel=(id)=>{
    console.log(id);
    return (dispatch)=>{
        dispatch(onComFetch);
         return axios.get("http://localhost:2000/delCom/"+id)
        .then((res)=>{
            if(res.status === 200)
            {   
                dispatch(onComDelSuc(res.data));
                return true;
            }
            else
            {
                dispatch(onComDelFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err.response.data);
        });
    };
}

export const onComDelSuc=(msg)=>{
    return {
        type : "ComDEL_SUC",
        payload : msg
    }
}

export const onComDelFail=(msg)=>{
    return {
        type : "ComDEL_FAIL",
        payload : msg
    }
}
