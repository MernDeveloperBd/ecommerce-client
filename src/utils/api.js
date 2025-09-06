import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData, opts = {}) => {
  const token = localStorage.getItem("accessToken");
  const baseHeaders = { "Content-Type": "application/json" };

  const withAuthHeaders = token ? { ...baseHeaders, Authorization: `Bearer ${token}` } : baseHeaders;

  try {
    let response = await fetch(apiUrl + URL, {
      method: "POST",
      headers: withAuthHeaders,
      body: JSON.stringify(formData),
      signal: opts.signal,
    });

    // যদি auth লাগেনা কিন্তু ভুলক্রমে invalid token পাঠানো হয়, fallback করুন
    if ((response.status === 401 || response.status === 403) && token) {
      response = await fetch(apiUrl + URL, {
        method: "POST",
        headers: baseHeaders, // no Authorization
        body: JSON.stringify(formData),
        signal: opts.signal,
      });
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || `HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") return { aborted: true };
    return { error: true, message: error?.message || "Request failed" };
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("accessToken");
    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };

    const { data } = await axios.get(apiUrl + url, { headers });
    return data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async (url, updateData) => {
  const token = localStorage.getItem("accessToken");
  const params = {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "multipart/form-data",
    },
  };
  let response;
  await axios.put(apiUrl + url, updateData, params).then((res) => {
    response = res;
  });
  return response;
};

export const editData = async (url, updateData) => {
  const token = localStorage.getItem("accessToken");
  const params = {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
  };
  let response;
  await axios.put(apiUrl + url, updateData, params).then((res) => {
    response = res;
  });
  return response;
};

/* export const deleteData = async (url) => {
  const token = localStorage.getItem("accessToken");
  const params = {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
  };
  const { res } = await axios.delete(apiUrl + url, params);
  return res;
}; */

export const deleteData = async (url, config = {}) => {
  try {
    const res = await apiUrl.delete(url, config);
    const data = res?.data ?? {};
    return {
      ...data,
      error: data.error ?? false,
      success: data.success ?? (res?.status >= 200 && res?.status < 300),
      status: res?.status
    };
  } catch (err) {
    const data = err?.response?.data ?? {};
    return { ...data, error: true, success: false, status: err?.response?.status };
  }
};