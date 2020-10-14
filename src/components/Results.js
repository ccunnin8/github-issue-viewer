/**
 * Results Page for Github Issue Tracker 
 * Fetches issues from https://api.github.com/repos/org/repo/issues
 * Fetches all issues and displays 10 at a time 
 */

import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
// https://reactrouter.com/web/example/query-parameters

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function numberOfPages(num, results_per_page) {
    if (num % results_per_page === 0) {
        return num / results_per_page;
    } else {
        return Math.floor(num / results_per_page) + 1;
    }
}
  
const results_per_page = 10;
const baseurl = "https://api.github.com/repos"
const defaultOrg = "walmartlabs";
const defaultRepo = "thorax";

export default function Results() {
    const { id } = useParams();
    const [ currentPage, setCurrentPage ] = useState(0); 
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");
    const [ data, setData ] = useState([]);
    const query = useQuery();

    const searchString = () => {
        if (query.get("org")) {
            return `?org=${query.get("org")}&repo=${query.get("repo")}`;
        } else {
            return "";
        }
    }
    const changePage = (page) => {
        /**
         * increment or decrement page number 
         * update url in browser so refresh brings to same page 
         */
        window.history.replaceState(null, "Github Issue Viewer", `/${page}${searchString()}`);
        setCurrentPage(page);
    }

    

    useEffect(() => {
        /**
         * fetch data on load, update state, log errors if necessary
         */
        if (id) setCurrentPage(parseInt(id));
        
        // show walmartlabs/thorax issues if no org/repo provided otherwise 
        // attempt to get the org/repo that the user provided 

        let url;
        if (query.get("org") && query.get("repo")) {
            url = `${baseurl}/${query.get("org")}/${query.get("repo")}/issues` 
        } else {
            url = `${baseurl}/${defaultOrg}/${defaultRepo}/issues`;
        }

        (async () => {
            try {
                const res = await fetch(url);
                if (res.status === 200) {
                    const data = await res.json();
                    setData(data);
                    console.log(data.length);
                    setLoading(false);
                    setError("");   
                } else {
                    setLoading(false);
                    setError("an error occurred getting the data");
                }
            } catch (err) {
                console.error(err);
                setError("an error occcurred getting the data");
            }
       })()
    }, [id]);

    return loading ? <p>Loading</p> : (
        <div className="mx-auto w-11/12">
            <h1 className="text-center text-2xl">Github Issues</h1>
            { error && <p>{error}</p>}
            <Link className="p-2 bg-green-200 border" to="/">Search again</Link>
            <div className="mt-8">
                <header className="text-center uppercase font-bold w-5/6 flex flex-row">
                    <p className="w-1/5">Number</p>
                    <p className="w-1/5">State</p>
                    <p className="w-2/5">Title</p>
                    <p className="w-1/5">Username</p>
                </header>
                {/** Display Issues from current index to current index + results per page */}
                <ul className="list-none">
                    { data.slice(currentPage * results_per_page, (currentPage * results_per_page) + results_per_page).map(issue => <Issue key={`issue_${issue.id}`} {...issue} />)}
                </ul>
            </div>
            <div>
                { /** Create page links  */}
                <ul className="flex flex-row">
                    { [...Array(numberOfPages(data.length, results_per_page)).keys()].map(i => {
                     return <li key={"link_to_" + i} 
                                className="underline ml-2 text-blue-500">
                                <Link to={`/results/${i}${searchString()}`}>{i + 1}
                                </Link>
                            </li>
                })}
                </ul>
            </div>
            { /** Forward/Backward Buttons */}
            <div className="buttons my-4">
                { 
                    currentPage > 0 && 
                    <button 
                        className="bg-blue-300 p-2 border"
                        onClick={() => changePage(currentPage - 1)}
                    >
                    Back
                    </button> 
                }
                { 
                    currentPage + 1< numberOfPages(data.length, results_per_page) && 
                    <button className="bg-blue-300 p-2 border"
                        onClick={() => changePage(currentPage + 1)}>
                        Forward
                    </button>
                }
            </div>
        </div>
    )
}

const Issue = ({ state, title, user, number}) => (
    /**
     * Display individual Issue 
     */
    <Link to={`/issue/${number}`}>
        <li className="text-center flex flex-row w-5/6 py-4 border hover:bg-gray-300">
            <p className="w-1/5">{number}</p>
            <p className="w-1/5">{state}</p>
            <p className="w-2/5">{title}</p>
            <p className="w-1/5">{user.login}</p>
        </li>
    </Link>
)


