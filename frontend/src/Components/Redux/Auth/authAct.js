import axios from 'axios';
import setAuthTok from './../../Utils/setAuthTok';
import jwtDecode from 'jwt-decode';

export const onReg=(newUser, history)=>{
    console.log(newUser);
    return(dispatch)=>{
        axios.post("http://localhost:2000/userReg", newUser)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log(res.data);
                history.push('/userLog');
            }
            else
            {
                console.log(res);
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(onRegFail(err.response.data.msg));
        }); 
    }
}

export const onRegFail=(msg)=>{
    return {
        type : "REG_FAIL",
        payload : msg
    }
}

export const onAReg=(newAdmin, history)=>{
    console.log(newAdmin);
    return(dispatch)=>{
        axios.post("http://localhost:2000/adminReg", newAdmin)
        .then((res)=>{
            if(res.status === 200)
            {
                console.log(res.data);
                history.push('/adminLog');
            }
            else
            {
                console.log(res.data);
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(onARegFail(err.response.data.msg));
        }); 
    }
}

export const onARegFail=(msg)=>{
    return {
        type : "AREG_FAIL",
        payload : msg
    }
}

export const onLog=(userData, history)=>{
    console.log(userData);
    return(dispatch)=>{
        axios.post("http://localhost:2000/userLog", userData)
        .then((res)=>{
            // console.log(res);
            if(res.status === 200)
            {
                const {token} = res.data;
                console.log("Logged : "+token);
                setAuthTok(token);
                const userData = jwtDecode(token);
                // console.log(userData);
                localStorage.setItem("user", userData);
                localStorage.setItem("user", token);
                dispatch(onLogSuc(userData));
                history.push("/");
                return true;
            }
            // else if(res.status === 400)
            // {
            //     console.log(res);
            //     dispatch(onLogFail(res.data.msg));
            // }
        }).catch((err)=>{
            console.log(err.response.data);
            dispatch(onLogFail(err.response.data.msg));
            return false;
        });
    }
}

export const onLogSuc=(user)=>{
    return {
        type : "LOG_SUC",
        payload : user
    }
}

export const onLogFail=(msg)=>{
    return {
        type : "LOG_FAIL",
        payload : msg
    }
}

export const onGLog=(data, history)=>{
    console.log(data);
    return(dispatch)=>{
        axios.post("http://localhost:2000/googleLog", data)
        .then((res)=>{
            console.log(res);
            if(res.status === 200)
            {
                console.log("Google login success : "+res.data.token);
                const {token} = res.data;
                setAuthTok(token);
                const data = jwtDecode(token);
                localStorage.setItem("user", data);
                localStorage.setItem("user", token);
                dispatch(onGLogSuc(data));
                history.push("/");
                return true;
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(onGLogFail(err.message));
            history.push("/userLog");
            return false;
        });
    }
}

export const onGLogSuc=(user)=>{
    return {
        type : "GLOG_SUC",
        payload : user
    }
}

export const onGLogFail=(msg)=>{
    return {
        type : "GLOG_FAIL",
        payload : msg
    }
}

export const onALog=(adminData, history)=>{
    console.log(adminData);
    return(dispatch)=>{
        axios.post("http://localhost:2000/adminLog", adminData)
        .then((res)=>{
            // console.log(res);
            if(res.status === 200)
            {
                const {token} = res.data;
                // console.log(token);
                setAuthTok(token);
                const adminData = jwtDecode(token);
                // console.log(userData);
                localStorage.setItem("admin", adminData);
                localStorage.setItem("admin", token);
                dispatch(onALogSuc(adminData));
                history.push("/dash");
                return true;
            }
        }).catch((err)=>{
            console.log(err.response.data);
            dispatch(onALogFail(err.response.data.msg));
            return false;
        });
    }
}

export const onALogSuc=(admin)=>{
    return {
        type : "ALOG_SUC",
        payload : admin
    }
}

export const onALogFail=(msg)=>{
    return {
        type : "ALOG_FAIL",
        payload : msg
    }
}

export const onUserDel=(id, history)=>{
    return (dispatch)=>{
        // dispatch(onFetch);
         return axios.get("http://localhost:2000/delUser/"+id)
        .then((res)=>{
            if(res.status === 200)
            {   
                console.log("done");
                dispatch(onUDelSuc(res.data.msg));
                setAuthTok();
                localStorage.removeItem("user");
                history.push("/");
                return true;
            }
            else
            {
                console.log("err1");
                dispatch(onUDelFail(res.data.msg));
                return false;
            }
        }).catch((err)=>{
            console.log("err2");
            console.log(err);
        });
    };
}

export const onUDelSuc=(msg)=>{
    return {
        type : "UDEL_SUC",
        payload : msg
    }
}

export const onUDelFail=(msg)=>{
    return {
        type : "UDEL_FAIL",
        payload : msg
    }
}

export const onLogout=(history)=>{
    console.log("authActLogout");
    return (dispatch)=>{
        setAuthTok();
        localStorage.removeItem("user");
        dispatch(onLogoutSuc());
        history.push("/userLog");
        return true;
    }
}

export const onLogoutSuc=()=>{
    return {
        type : "LOGOUT_SUC"
    }
}

export const onALogout=(history)=>{
    console.log("authAdActLogout");
    return (dispatch)=>{
        setAuthTok();
        localStorage.removeItem("admin");
        dispatch(onALogoutSuc());
        history.push("/");
        return true;
    }
}


export const onALogoutSuc=()=>{
    return {
        type : "ALOGOUT_SUC"
    }
}

export const onUpdUsr=(data, history)=>{
    console.log(data);
    return (dispatch)=>{
        axios.post("http://localhost:2000/updUsr", data)
        .then((res)=>{
            // console.log(res);
            if(res.status === 200)
            {
                dispatch(onUpdUSuc(res.data));
                history.push("/usrProf");
                return true;
            }
        }).catch((err)=>{
            console.log(err.response);
            dispatch(onUpdUFail(err.response));
            return false;
        });
    }
}

export const onUpdUSuc=(msg)=>{
    return {
        type : "UPDUSR_SUC",
        payload : msg
    }
}
export const onUpdUFail=(msg)=>{
    return {
        type : "UPDUSR_FAIL",
        payload : msg
    }
}