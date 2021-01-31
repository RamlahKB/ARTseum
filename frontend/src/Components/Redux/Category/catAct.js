import axios from 'axios';

export const onFetchCat=()=>{
    // console.log("ON Fetch");
    return (dispatch)=>{
        console.log("ON Fetch1");
        dispatch(onCFetch);
        axios.get("http://localhost:2000/viewCat")
        .then(res=>{
            if(res.status === 200)
            {
                console.log("ON FetchSuc");
                dispatch(onCFetchSuc(res.data));
            }
            else 
            {
                dispatch(onCFetchFail(res.data.msg));
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
}

export const onCFetch=()=>{
    return{
        type : "ON_CFETCH"
    }
}

export const onCFetchSuc=(data)=>{
    return{
        type : "CFETCH_SUC",
        payload : data
    }
}

export const onCFetchFail=(msg)=>{
    return{
        type : "CFETCH_FAIL",
        payload : msg
    }
}

export const onAddCat=(data, history)=>{
    const fd = new FormData();
    fd.append("category", data.category);
    fd.append("image", data.image);
    fd.append("status", data.status);
    fd.append("author_id", data.author_id);
    return(dispatch)=>{
        axios.post("http://localhost:2000/addCat", fd)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log("ON AddSuc");
                dispatch(onAddSuc(res.data.msg));
                history.push("/admCat");
            }
            else 
            {
                dispatch(onAddFail(res.data.msg));
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
}

export const onAddSuc=(msg)=>{
    return{
        type : "ADD_SUC",
        payload : msg
    }
}

export const onAddFail=(msg)=>{
    return{
        type : "ADD_FAIL",
        payload : msg
    }
}

export const onCatDel=(id)=>{
    return(dispatch)=>{
        dispatch(onCFetch);
        return axios.get("http://localhost:2000/delCat/"+id)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log("ON DelSuc");
                dispatch(onDelSuc(res.data.msg));
                return true;
            }
            else 
            {
                dispatch(onDelFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err);
            return false;
        });
    }
}

export const onDelSuc=(msg)=>{
    return{
        type : "DEL_SUC",
        payload : msg
    }
}

export const onDelFail=(msg)=>{
    return{
        type : "DEL_FAIL",
        payload : msg
    }
}

export const onEditCat=(id)=>{
    return(dispatch)=>{
        dispatch(onCFetch);
        return axios.get("http://localhost:2000/editCat/"+id)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log("ON EditSuc");
                return res.data;
            }
            else 
            {
                return false;
            }
        }).catch((err)=>{
            console.log(err);
            return false;
        });
    }
}

export const onUpdCat=(data, history)=>{
    // const fd = new FormData();
    // fd.append("category", data.category);
    // fd.append("image", data.image);
    return(dispatch)=>{
        axios.post("http://localhost:2000/updateCat", data)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log("OnUpSuc");
                dispatch(onUpdSuc(res.data.msg));
                history.push("/admCat");
            }
            else 
            {
                dispatch(onUpdFail(res.data.msg));
            }
        }).catch((err)=>{
            console.log(err.response);
            dispatch(onUpdFail(err.response.statusText));
        });
    }
}

export const onUpdSuc=(msg)=>{
    return {
        type : "UPD_SUC",
        payload : msg
    }
}

export const onUpdFail=(msg)=>{
    return {
        type : "UPD_FAIL",
        payload : msg
    }
}