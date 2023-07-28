async function performHttpCall(endpoint, method = "GET", data = null, identifiers = null) {
    const baseUrl = process.env.VUE_APP_BASE_URL;
    const options = {
        method: method,
        headers: {
            Authorization: identifiers ? identifiers : null,
            "Content-Type": "application/json",
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        console.log("mydata", baseUrl, endpoint, options)
        const response = await fetch(baseUrl + endpoint, options);
        if (response.ok) {
            return await response.json();
        }
        const error = await response.json();
        throw error;
    } catch (error) {
        if (error instanceof SyntaxError) {
            // Unexpected token < in JSON
            console.log('There was a SyntaxError', error);
        } else {
            throw error;
        }
    }
}

export { performHttpCall };