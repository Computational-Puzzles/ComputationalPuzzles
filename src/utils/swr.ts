// @ts-ignore
// const fetcher = (...args) => fetch(...args).then(res => res.json());


const fetcher = async url => {
    const res = await fetch(url)
    // If the status code is not in the range 200-299, we still try to parse and throw it.
    if (!res.ok) {
        const body = await res.json();

        let error;
        if (body?.message) error = new Error(body.message);
        else error = new Error('An error occurred while fetching the data.')
        // Attach extra info to the error object.
        error['info'] = body;
        error["status"] = res.status;
        throw error
    }

    return res.json()
}


export {fetcher};
