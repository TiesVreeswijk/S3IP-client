// src/api/auth.jsx
export const login = async (credentials) => {
    const response = await fetch("https://localhost:44385/Authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.ok) {
        return data.token;
    }
    throw new Error(data.message || "Login failed");
};

export const signup = async (credentials) => {
    try {
        const response = await fetch("https://localhost:44385/Authentication/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const contentType = response.headers.get("Content-Type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            console.log("User registered successfully", data);
            return data.token;
        }
        throw new Error(data.message || "Signup failed");
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};