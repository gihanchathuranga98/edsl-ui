import { api } from "./api.interceptor";

let refreshIntervalId: any;

const refreshToken = () => {
  api.post('user/refresh-token')
    .catch(() => {
      if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
      }
      window.location.href = '/';
    });
};

refreshIntervalId = setInterval(refreshToken, 60 * 1000 * 14);