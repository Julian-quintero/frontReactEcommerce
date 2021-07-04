import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
      const res = await fetch(`/api/users/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.message) {
        throw new Error("Usuario no valido"); //esto es provicional, lo puse por que habia un error hay que solucionar
      }

      dispatch({
        type: USER_LOGIN_SUCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
      const res = await fetch(`/api/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.message) {
        throw new Error("Usuario no valido"); //esto es provicional, lo puse por que habia un error hay que solucionar
      }

      dispatch({
        type: USER_REGISTER_SUCESS,
        payload: data,
      });

      //me logeo al registrarme

      dispatch({
        type: USER_LOGIN_SUCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGIN_LOGOUT });
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const data = await res.json();

      if (data.message) {
        throw new Error("Usuario no valido"); //esto es provicional, lo puse por que habia un error hay que solucionar
      }

      dispatch({
        type: USER_DETAILS_SUCESS,
        payload: data,
      });

      //me logeo al registrarme
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    try {
      const res = await fetch(`/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();

      console.log("data", data);

      if (data.message) {
        throw new Error("Usuario no valido"); //esto es provicional, lo puse por que habia un error hay que solucionar
      }

      dispatch({
        type: USER_UPDATE_PROFILE_SUCESS,
        payload: data,
      });

      //me logeo al registrarme
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
