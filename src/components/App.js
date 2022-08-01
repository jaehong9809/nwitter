import {useEffect, useState} from "react";
import Approuter from "components/Router";
import {authService} from "fbinstance";
function App() {
    const [init, Setinit] = useState(false);
    const [isLoggedin, setIsLoggin] = useState(false);
    const [userObj, SetUserObj]=useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggin(true);
                SetUserObj(user);
            } else {
                setIsLoggin(false);

            }
            Setinit(true);
        });
    }, []);
    const refreshUser=()=>
    {
        SetUserObj(Object.assign({}, authService.currentUser));
    }
    return (<div >
        {init?<Approuter refreshUser={refreshUser} isLoggedin={isLoggedin} userObj={userObj}/>:"Initializing..."}
    </div>
    
    );
}

export default App;
