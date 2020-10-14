/**
 * Displays an individual github issue for a repo
 */

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";

function selectStatusFont(status) {
    /**
     * Params: status (string) ie, open or closed
     * Returns tailwind font color 
     */
    return status === "open" ? "text-red-500" : "text-green-500"
}

function formatDate(date) {
    /**
     * Params: date (date string)
     * Returns formated string 
     */
    const newDate = new Date(date);
    return newDate.toLocaleString();
}

export default function Issue() {
    const { id } = useParams();
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState("");
    const history = useHistory();
     
    useEffect(() => {
        ( async () => {
            const url = `https://api.github.com/repos/walmartlabs/thorax/issues/${id}`;
            try {
                const response = await fetch(url);
                if (response.status === 200) {
                    const data = await response.json();
                    setData(data);
                    setError(""); 
                    setLoading(false);
                } else {
                    setLoading(true);
                    setError("there was an error getting the data")
                }
            } catch (err) {
                console.error(err);
                setError("there was an error getting the data", err)
            }
        })();
    }, [id])
    return loading ? <p>Loading</p> : (
        <div className="w-11/12 mx-auto">
            { error && <p>{error}</p>}
            <button onClick={() => history.goBack() }><span className="uppercase font-bold text-lg">&larr; Back </span></button>
            <h1 className="text-3xl my-2">Title: {data.title}</h1>
            <div className="w-100 flex flex-row">
                <div className="w-1/3">
                    <h2 className="my-2"><a href={data} >Owner: {data.user.login}</a></h2>
                    <img className="rounded" alt="gravatar for this user" src={data.user.avatar_url} />
                </div>
                <div className="w-2/3 flex flex-col justify-center items-center ml-3">
                    <h2 className="text-2xl">Created At: {formatDate(data.created_at)}</h2>
                    <h2 className="text-2xl">Updated At: {formatDate(data.updated_at)}</h2>
                </div>
            </div>
            <h3 className="text-2xl">Details</h3>
            <ul>
                <li>State: 
                    <span 
                        className=
                        {selectStatusFont(data.status) + " ml-2 uppercase font-bold"}>
                        {data.state}
                    </span>
                </li>
                <li>Body: {data.body}</li>
            </ul>
        </div>
    )
    
}
