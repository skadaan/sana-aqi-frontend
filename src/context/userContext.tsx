

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any>({});



export const UserProvider = (props: any) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("aqiToken"));

    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };

            const response = await fetch(`https://sana-aqi.herokuapp.com/user/me`, requestOptions);
            if (!response.ok) {
                setToken(null);
            }
            localStorage.setItem("aqiToken", token!);
        };
        fetchUser();
    }, [token]);


    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    );
};