import {useEffect} from 'react';
import Router from 'next/router';

import {isAuth} from '../../actions/auth';

const Admin = ({children}) => {
    useEffect(() => {
        if(!isAuth()) {
            Router.push('/cms/login');
        } else if(isAuth().role !== 1){
            Router.push('/cms/user');
        }
    }, []);
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default Admin;