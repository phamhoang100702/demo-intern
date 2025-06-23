import {getLocalStorage} from "../localstorage";
import {CLIENT_ERROR, SUCCESS} from "../../constants/status";

const API_DOMAIN = "http://localhost:8888/";

export const get = async (path) => {

    const response = await fetch(API_DOMAIN + path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalStorage("user-token")}`,
        },
    });
    return await response.json();
};

export const post = async (path, options = {}) => {
    console.log("token :  ", getLocalStorage("user-token"));
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLocalStorage("user-token")}`,
        },
        body: JSON.stringify(options),
    });
    return await response.json();
};

export const postBlob = async (path, options = {}) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLocalStorage("user-token")}`,
        },
        body: JSON.stringify(options),
    });

    if (!response.ok) {
        throw new Error("Failed to export file");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // 👉 Đặt tên file xuất
    link.download = "export.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

export const put = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLocalStorage("user-token")}`,
        },
        body: JSON.stringify(options),
    });
    return await response.json();
};

export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getLocalStorage("user-token")}`,
        },
    });
    if (!response.ok) {
        return await response.json();
    }
};

export const uploadFile = async (path, formData) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getLocalStorage("user-token")}`,
        },
        body: formData,
    });
    return response.json();
};


export const put_form_data = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PUT",
        body: options,
        headers: {
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        },
    })
    return getDataResponse(response);
};
export const getDataResponse = async (response) => {
    if (response.status == SUCCESS) {
        return await response.json();
    } else if (response.status == CLIENT_ERROR) {
        return null;
    } else {
        return 1;
    }
}
export const post_form_data = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        body: options,
        headers: {
            'Authorization': `Bearer ${getLocalStorage('user-token')}`
        },
    });
    return getDataResponse(response);
};
