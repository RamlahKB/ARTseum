import axios from 'axios';

export const onFetchArt=()=>{
    // console.log("fetch art");
    return(dispatch)=>{
        dispatch(onFetch);
        axios.get("http://localhost:2000/viewArt")
        .then((res)=>{
            if(res.status === 200)
            {
                dispatch(onFetchSuc(res.data));
            }
            else 
            {
                dispatch(onFetchFail(res.data.msg));
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
}

export const onFetch=()=>{
    return {
        type : "ON_FETCH"
    }
}

export const onFetchSuc=(data)=>{
    return {
        type : "FETCH_SUC",
        payload : data
    }
}

export const onFetchFail=(msg)=>{
    return {
        type : "FETCH_FAIL",
        payload : msg
    }
}

export const onAddArt=(data,history)=>{
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("catg", data.catg);
    fd.append("artist", data.artist);
    fd.append("year", data.year);
    fd.append("desc", data.desc);
    fd.append("image", data.image);
    fd.append("author_id", data.author_id);
    fd.append("status", data.status);
    return(dispatch)=>{
        axios.post("http://localhost:2000/addArt", fd)
        .then((res)=>{
            if(res.status === 200)
            {
                dispatch(onAddSuc(res.data.msg));
                const atoken = localStorage.getItem("admin");
                if (!atoken)
                {history.push("/art");}
                else
                {history.push("/admArt");}
                return true;
            }
            else
            {
                dispatch(onAddFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
}

export const onAddSuc=(msg)=>{
    return {
        type : "ADD_SUC",
        payload : msg
    }
}

export const onAddFail=(msg)=>{
    return {
        type : "ADD_FAIL",
        payload : msg
    }
}

export const onUpStatus=(id)=>{
    return (dispatch)=>{
        dispatch(onFetch);
        return axios.get("http://localhost:2000/upSArt/"+id)
        .then((res)=>{
            if(res.status ===200)
            {
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

export const onModal=(id)=>{
    return (dispatch)=>{
        dispatch(onFetch);
        return axios.get("http://localhost:2000/modal/"+id)
        .then((res)=>{
            if(res.status ===200)
            {
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

export const onArtDel=(id)=>{
    return (dispatch)=>{
        dispatch(onFetch);
         return axios.get("http://localhost:2000/delArt/"+id)
        .then((res)=>{
            if(res.status === 200)
            {   
                dispatch(onDelSuc(res.data));
                return true;
            }
            else
            {
                dispatch(onDelFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err);
        });
    };
}

export const onDelSuc=(msg)=>{
    return {
        type : "DEL_SUC",
        payload : msg
    }
}

export const onDelFail=(msg)=>{
    return {
        type : "DEL_FAIL",
        payload : msg
    }
}

export const onEditArt=(id)=>{
    return (dispatch)=>{
        dispatch(onFetch);
        return axios.get("http://localhost:2000/editArt/"+id)
        .then((res)=>{
            if(res.status ===200)
            {
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

export const onUpdArt=(data, history)=>{
    console.log(data);
    // const fd = new FormData();
    // fd.append("name", data.name);
    // fd.append("catg", data.catg);
    // fd.append("artist", data.artist);
    // fd.append("year", data.year);
    // fd.append("desc", data.desc);
    // fd.append("image", data.image);
    return (dispatch)=>{
        axios.post("http://localhost:2000/updateArt", data)
        .then((res)=>{
            if(res.status === 200)
            {
                dispatch(onUpdSuc(res.data.msg));
                const atoken = localStorage.getItem("admin");
                if (!atoken)
                {history.push("/art");}
                else
                {history.push("/admArt");}
            }
            else
            {
                console.log("h");
                dispatch(onUpdFail(res.data.msg));
            }
        }).catch((err)=>{
            dispatch(onUpdFail(err.response.data.msg));
            console.log(err.response.data.msg);
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

export const onLike=(id)=>{
    return (dispatch)=>{
        dispatch(onFetch);
        return axios.post("http://localhost:2000/like/"+id)
        .then((res)=>{
            if(res.status === 200)
            {   
                dispatch(onLikSuc(res.data.msg));
                return true;
            }
            else
            {
                dispatch(onLikFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log("Like error");
            console.log(err.response.data.msg);
        });
    };
}

// export const onUnLike=(id)=>{
//     return (dispatch)=>{
//         dispatch(onFetch);
//          return axios.post("http://localhost:2000/unlike/"+id)
//         .then((res)=>{
//             if(res.status === 200)
//             {   
//                 dispatch(onLikSuc(res.data));
//                 return true;
//             }
//             else
//             {
//                 dispatch(onLikFail(res.data.msg));
//                 return false;
//             }
//         }).catch((err)=>{
//             console.log(err.response.data.msg);
//         });
//     };
// }

export const onLikSuc=(msg)=>{
    return {
        type : "LIK_SUC",
        payload : msg
    }
}
export const onLikFail=(msg)=>{
    return {
        type : "LIK_FAIL",
        payload : msg
    }
}

export const onDLike=(id)=>{
    return (dispatch)=>{
        dispatch(onFetch);
         return axios.post("http://localhost:2000/dislike/"+id)
        .then((res)=>{
            if(res.status === 200)
            {   
                dispatch(onLikSuc(res.data));
                return true;
            }
            else
            {
                dispatch(onLikFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log(err.response.data.msg);
        });
    };
}

export const onDLikSuc=(msg)=>{
    return {
        type : "DLIK_SUC",
        payload : msg
    }
}
export const onDLikFail=(msg)=>{
    return {
        type : "DLIK_FAIL",
        payload : msg
    }
}