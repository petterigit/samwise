export const getDeckByID = (id: number) => {
    const url = "http://ringsdb.com/api/public/decklist/" + id;
    return new Promise(resolve => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                resolve(undefined);
                console.error("Error in getDeckByID 'GET' request:", error);
            });
    });
    
}
