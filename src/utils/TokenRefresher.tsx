import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    headers: { "Content-type": "application/json" }
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

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

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    // const refreshResponse = await axiosInstance.get('/api/auth/token');
                    const refreshResponse = await axios.get('/api/auth/token');
                    console.log("성공?")
                    const newAccessToken = refreshResponse.data.accessToken;
                    console.log(newAccessToken);
                    localStorage.setItem("login-token", newAccessToken);
                    error.config.headers["Authorization"] = `${newAccessToken}`;
                    return axiosInstance(error.config);
                } catch (refreshError) {

                    removeCookie("REFRESH_TOKEN");
                    localStorage.removeItem("login-token");
                    localStorage.removeItem("recoil-persist");
                    window.location.href = "/";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                console.log("33")

                if (!refreshPromise) {
                    refreshPromise = new Promise((resolve) => {
                        const checkRefresh = () => {
                            if (!isRefreshing) {
                                resolve(axiosInstance(error.config));
                                refreshPromise = null;
                                clearInterval(interval);
                            }
                        };
                        const interval = setInterval(checkRefresh, 100);
                    });
                }

                return refreshPromise;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
