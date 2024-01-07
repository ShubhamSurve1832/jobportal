import React, { useRef, useState, useEffect } from 'react';
import { decryptValue } from '../../utils';

const GoToCourse = React.forwardRef(({ goToCourseRef, enrollmentId }, ref) => {
    const formRef = useRef(null);
    const [token, setToken] = useState(null);
    const submitForm = () => {
        if (formRef.current && enrollmentId) {
            formRef.current.submit();
        }
    };

    React.useImperativeHandle(ref, () => ({
        submitForm: submitForm
    }));

    useEffect(() => {
        const storedToken = localStorage.getItem('alphaLearnToken');
        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setToken(decryptValue(parsedToken.token));
        }
    }, []);

    return (
        <form
            ref={formRef}
            action="https://learn.simandhareducation.com/site/login-by-jwt-token"
            id="logintoalms0"
            method="post"
            target='_blank'
        >
            <input type="hidden" id="token" name="token" value={token} />
            <input type="hidden" id="inputData" name="inputData" value={JSON.stringify({ enrollmentId })} />
            <input type="hidden" id="type" name="type" value={1} />
        </form>
    );
});

export default GoToCourse;
