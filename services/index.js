import axios from "axios";
import moment from "moment-timezone";
import { omitBy, isNil } from "lodash";

import {
  REFRESH_TOKEN_URL,
  LOGIN_URL,
  REGISTER_URL,
  STUDIOS_URL,
  FORGETPASSWORD_URL,
  UPDATEPASSWORD_URL,
  STRIPESETUP_URL,
  STRIPELINK_URL,
  STRIPEBALANCE_URL,
  BOOK_URL,
  SUBSCRIBER_URL,
} from "../constants/urls";

const authHeaderConfig = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { accessToken } = (auth && auth.token) || {};
  const requestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return requestConfig;
};

const refreshToken = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    const { expiresIn, refreshToken } = auth.token;
    const { email } = auth.user;
    if (moment().add(20, "minutes") > moment(expiresIn)) {
      try {
        const response = await axios.post(REFRESH_TOKEN_URL, {
          email,
          refreshToken,
        });
        auth.token = response.data;
        localStorage.setItem("auth", JSON.stringify(auth));
      } catch (e) {
        console.log(e);
      }
    }
  }

};

export const logout = () => {
  localStorage.removeItem("auth");
};

export const stripeLink = async (userId) => {
  try {
    const response = await axios.post(
      STRIPELINK_URL,
      userId,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const stripeBalance = async (userId) => {
  try {
    const response = await axios.post(
      STRIPEBALANCE_URL,
      userId,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(LOGIN_URL, data);
    localStorage.setItem("auth", JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const updatePassword = async (token) => {
  try {
    const response = await axios.post(UPDATEPASSWORD_URL, token);
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const forgetPassword = async (data) => {
  try {
    const response = await axios.post(FORGETPASSWORD_URL, data);
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(REGISTER_URL, data);
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const stripeSetup = async (data) => {
  try {
    const response = await axios.post(STRIPESETUP_URL, data);
    return response.data;
  } catch (e) {
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};
/**
 * Api services to manage Studios
 */
export const fetchStudios = async (params = {}) => {
  try {
    params = omitBy(params, isNil);
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    const response = await axios.get(
      `${STUDIOS_URL}?${query}`,
      authHeaderConfig()
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e && e.response && e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const createStudio = async (data) => {
  try {
    const headers = authHeaderConfig();
    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.post(STUDIOS_URL, data, headers);
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const deleteStudio = async (studioId) => {
  try {
    const response = await axios.delete(
      `${STUDIOS_URL}/${studioId}`,
      authHeaderConfig()
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const updateStudio = async (studioId, data) => {
  try {
    const headers = authHeaderConfig();
    headers["Content-Type"] = "multipart/form-data";
    const response = await axios.patch(
      `${STUDIOS_URL}/${studioId}`,
      data,
      headers
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.messsage : e.message;
    throw new Error(message);
  }
};

export const getStudio = async (studioId) => {
  try {
    const response = await axios.get(
      `${STUDIOS_URL}/${studioId}`,
      authHeaderConfig()
    );
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.messsage : e.message;
    throw new Error(message);
  }
};

export const getBook = async (data) => {
  try {
    var pstr = new URLSearchParams(data);
    const response = await axios.get(
      BOOK_URL + "?" + pstr.toString(),
      authHeaderConfig()
    );
    console.log(response);
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const createBook = async (data) => {
  try {
    const response = await axios.post(BOOK_URL, data, authHeaderConfig());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const createBooked = async (data) => {
  try {
    const response = await axios.post(
      BOOK_URL + "/booked",
      data,
      authHeaderConfig()
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(
      `${BOOK_URL}/${bookId}`,
      authHeaderConfig()
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const updateBook = async (bookId, data) => {
  try {
    const response = await axios.patch(
      `${BOOK_URL}/${bookId}`,
      data,
      authHeaderConfig()
    );
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const createSubscriber = async (data) => {
  try {
    const response = await axios.post(SUBSCRIBER_URL, data, authHeaderConfig());
    console.log("response", response);
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};

export const fetchSubscribers = async () => {
  try {
    const response = await axios.get(SUBSCRIBER_URL, authHeaderConfig());
    refreshToken();
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      logout();
    }
    const message = e.response ? e.response.data.message : e.message;
    throw new Error(message);
  }
};
