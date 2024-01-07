import { deleteCookie } from 'cookies-next';
import { AUTH_KEY_NAME, CART_KEY_NAME, PRICE_KEY_NAME } from '../constants/statusCodes';
import { AES, enc, mode, pad } from 'crypto-js';
import {env} from 'next.config'

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const validateMobile = (mobileNumber) => {
    // console.log("🚀 ~ file: index.js:2 ~ validateEmail ~ email:", mobileNumber)
    const regex = /^[6-9]\d{9,14}/;
    return regex.test(mobileNumber);
}

export const isEmailDisallowed = (email) => {
    // List of disallowed domains
    const disallowedDomains = [
        'yopmail.com',
        'test.com',
        // Add more disallowed domains as needed
    ];

    // Extract domain from email
    const domain = email.split('@')[1];

    // Check if the domain is disallowed
    return disallowedDomains.includes(domain);
}

export const isUserLoggedIn = () => {

    const checkUser = () => {
        if (typeof window !== 'undefined' && window.localStorage && localStorage.getItem(AUTH_KEY_NAME) !== 'undefined') {
            const user = JSON.parse(localStorage.getItem(AUTH_KEY_NAME));
            if (user && user.token && user.role) {
                const isLoggedIn = { isLoggedIn: true }
                return { ...isLoggedIn, ...user }
            }
        }

        return {
            isLoggedIn: false,
        };
    };

    return checkUser(); // Return the result of checkUser() to indicate logged-in status
};

export const getPercentage = (amount1, amount2) => {
    if (amount2 !== 0) {

        const higherAmount = Math.max(amount1, amount2);
        const lowerAmount = Math.min(amount1, amount2);

        const percentage = ((higherAmount - lowerAmount) / higherAmount) * 100;
        return percentage.toFixed(2);
        // (((higherAmount - lowerAmount) / higherAmount) * 100)

        // return (((discountPrice - totalPrice) / totalPrice) * 100).toFixed(2);
    } else {
        return 0;
    }
};

export const formatAmount = (amount = 0) => {
    const options = {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    const formattedNumber = Number(amount).toLocaleString("en-IN", options);
    return formattedNumber
}

export const formatTimestamp = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return formattedDate;
}

export const encryptValue = (value = 0) => {
    console.log("🚀 ~ file: index.js:89 ~ encryptValue ~ value:", value)
    try {
        const encryptedValue = AES.encrypt(value.toString(), process.env.NEXT_PUBLIC_ENCRYPTION_KEY, {
            mode: mode.CTR,
            padding: pad.NoPadding,
        }).toString();
        return encryptedValue;
    } catch (error) {
        console.log("🚀 ~ file: index.js:96 ~ encryptValue ~ error:", error)
        logoutUser()
    }
}

export const decryptValue = (value = 0) => {
    // console.log("testing live decryp value line number 103 index utils")
    // console.log("🚀 ~ file: index.js:103 ~ decryptValue ~ value:", value)
    // console.log("Decrypt KEY",process.env.NEXT_PUBLIC_ENCRYPTION_KEY)
    // console.log("ENV Console",env)
    try {
        const encryptedValue = AES.decrypt(value.toString(), process.env.NEXT_PUBLIC_ENCRYPTION_KEY, {
            mode: mode.CTR,
            padding: pad.NoPadding,
        }).toString(enc.Utf8);
        // console.log("testing live decryp value line number 113 index utils")
        return encryptedValue;

    } catch (error) {
        // console.log("🚀 ~ file: index.js:109 ~ decryptValue ~ error:", error)
        // console.log("testing live decryp error value line number 116 index utils")

        logoutUser()
    }
}

export const logoutUser = () => {
    localStorage.removeItem(AUTH_KEY_NAME);
    localStorage.removeItem(PRICE_KEY_NAME);
    localStorage.removeItem(CART_KEY_NAME);
    deleteCookie(AUTH_KEY_NAME);
}

export const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            resolve(base64Image);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}
