export const bseDatos = ()=>{
    const abrirData = ()=> {
        const url = '../baseDatos/login.json';
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                console.error('Error fetching ABRR data:', error);
            });
    }
    return console.log(abrirData());
}