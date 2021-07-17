import { useContext, useEffect, createContext } from 'react';

import { AuthState, UserModel } from '../models/auth.model';
import { loadUserData, removeUserData, storeUserData } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC = ({ children }) => {
    const dispatch = useAppDispatch();
    const {user, status} = useAppSelector<AuthState>(state => state.auth);

    useEffect(() => {
        // Check active sessions and sets the user
        dispatch(loadUserData());
    }, [dispatch]);

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signIn: (data: UserModel) => dispatch(storeUserData(data)),
        signOut: () => dispatch(removeUserData()),
        user,
        status,
    }

    return (
        <AuthContext.Provider value={value} >
            {status !== 'loading' && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
}
