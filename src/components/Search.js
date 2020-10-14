/**
 * Allow user to search for issues by organization/repo name
 * Redirects to results 
 */

import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

export default function Search () {
    const [ org, setOrg ] = useState("")
    const [ repo, setRepo ] = useState("");
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/results/0?org=${org}&repo=${repo}`);
    }

    return (
        <div style={{height: 500}} className="w-full h-full flex flex-col justify-center items-center">
            <form onSubmit={e => handleSubmit(e)} className="w-3/4 mx-auto flex flex-col items-center justify-center">
                <label>Organization: </label>
                <input 
                    className="p-1 border"
                    onChange={e => setOrg(e.target.value)} 
                    type="text" 
                    name="org" 
                    id="org" 
                    value={org}
                />
                <label>Repo: </label>
                <input 
                    className="p-1 border"
                    type="text" 
                    name="repo" 
                    id="repo" 
                    value={repo}
                    onChange={e => setRepo(e.target.value)} 
                />
                <input type="submit" 
                    className="bg-blue-400 p-2 border my-2 w-40"
                     value="search" />
            </form>
            <a className="text-center bg-green-600 p-3 border w-40" href="/results/0?org=walmartlabs&repo=thorax">Thorax Repo</a>
        </div>
    )
}