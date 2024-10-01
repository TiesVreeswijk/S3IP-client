export const login = async (credentials) => {
    const response = await fetch("http://localhost:5170/Authentication/login", {
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

export const logout = () => {
    localStorage.removeItem("token");
};
