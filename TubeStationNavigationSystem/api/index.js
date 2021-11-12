import React from 'react';

const API_URL = 'http://localhost:xxx';

function createDataObj(response, data) {
    let status  = response.status === 200 ? 'SUCCESS': 'ERROR';
    if(response.status === -1) {
        status = 'LOADING';
    }
    return {
        status,
        statusCode: response.status,
        data
    };
}

/**
 * API dependency hook
 * @param {object} data - the inital state
 * @param {string} route - where to get the data from
 * @param {number} id - optional ID of the data required
 * @returns {array} - [{state object}, {set state function}, {loading: boolean}, {commit function}] 
 */
function useDepencency(data, route, id) {

    const [state, setState] = React.useState(createDataObj({ status: -1 }, {}));
    const [loading, setLoading] = React.useState(true);
    
    // Run once
    React.useEffect(async () => {

        // Create the URL
        let url = `${API_URL}/${route}`;

        // if we are given an id, set it
        if(id) {
            url += '/' + id;
        }

        const response = await fetch(url);

        setLoading(false);

        if(response.status !== 200) {
            setState(createDataObj(response, null));
            return;
        }

        // grab the json data
        const data = await response.json();
        setState(createDataObj(response, data));
    }, []);

    const commit = async () => {
        let url = `${API_URL}/${route}`;

        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(state.data),
        });
    }

    return [state, setState, loading, commit];
}

export default useDepencency;