import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Login from '../view/Login/Login';
import SignUp from '../view/SignUp/SignUp';
import { checkUuid } from '../api/Fetcher'
import { useQuery } from 'react-query';

function CheckUuid() {
    const { uuid } = useParams();
    const { data, error } = useQuery(
        ['memberData'], () => checkUuid(uuid || ""));

    return (
        <>
            {data?.joinStatus === 'WAITING' && <SignUp userEmail={data?.email} />}
            {data?.joinStatus === 'USER' && <Login />}
            {data?.joinStatus === null && <p>Checking UUID...</p>}
        </>
    );
}
export default CheckUuid;
