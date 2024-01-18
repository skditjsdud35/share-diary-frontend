import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-type": "application/json" }
});

//쿠키 조회
const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//쿠키 삭제
const removeCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 419 || statusCode === 401) {
            const refreshToken = getCookie("REFRESH_TOKEN");
            console.log(refreshToken)

            if (!refreshToken) {
                window.location.href = "/";
                return Promise.reject(error);
            }

            try {
                const refreshResponse = await axiosInstance.get('/api/auth/token', {
                    withCredentials: true,
                    params: {
                        refreshToken: refreshToken
                    },

                });

                const newAccessToken = refreshResponse.data.accessToken;
                console.log(newAccessToken)
                localStorage.setItem("login-token", newAccessToken);
                error.config.headers["Authorization"] = `${newAccessToken}`;
                return axiosInstance(error.config);
            } catch (refreshError) {
                // removeCookie("REFRESH_TOKEN");
                // localStorage.removeItem("login-token");
                // window.location.href = "/";
                // return Promise.reject(refreshError);
                console.log(refreshError)
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
