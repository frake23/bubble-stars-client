const fetcher = (...args: Parameters<typeof fetch>) => 
    fetch(args[0], {
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        ...args[1]})
    .then(res => res.json())

export default fetcher;
