import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { ROLE_PERMISSIONS } from "../../guards/permissions";

import { observeAuthState, signUp, signIn, signOut } from "../../services/authServices";
export default function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = observeAuthState((data) => {
            if (data) {
                const userRole = data.profile?.role || "client";
                setUser({
                    ...data.authUser,
                    role: userRole,
                    permissions: data.profile?.permissions || [],
                    deniedPermissions: data.profile?.deniedPermissions || [],
                    profile: data.profile || {},
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        return await signIn(email, password)
    }
    const register = async (email, password, name) => {
        return await signUp(email, password, name)
    }
    const logout = async () => {
        return await signOut()
    }
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

