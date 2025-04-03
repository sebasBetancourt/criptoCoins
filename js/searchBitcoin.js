export const searchBitcoin = () => {
    const OKX_URL = 'https://www.okx.com/api/v5/market/tickers?instType=SPOT';
    const formSearch = document.querySelector('.form_search');
    const searchInput = document.querySelector('input[name="search"]');
    const recentSearchesContainer = document.querySelector('#recent-searches'); 

    loadRecentSearches();

    const obtenerValor = (e) => {
        e.preventDefault(); 

        const searchTerm = searchInput.value.trim();
        let busqueda = searchTerm.toUpperCase();

        if (busqueda) {
            obtenerDatos(busqueda); 
            saveSearchToLocalStorage(busqueda); 
        } else {
            obtenerDatos();
            limpiarTabla(); 
        }
    };

    searchInput.addEventListener('input', obtenerValor);

    formSearch.addEventListener('submit', obtenerValor);

    async function obtenerDatos(busqueda = '') {
        try {
            const FX_API_URL = 'https://open.er-api.com/v6/latest/USD';

            const [okxResp, fxResp] = await Promise.all([
                fetch(OKX_URL),
                fetch(FX_API_URL)
            ]);

            const okxData = await okxResp.json();
            const fxData = await fxResp.json();

            const tasaCOP = fxData.rates.COP;

            const criptosUSDT = okxData.data.filter(item => item.instId.endsWith('-USDT'));

            let resultados = criptosUSDT;

            if (busqueda) {
                resultados = criptosUSDT
                    .filter(item => item.instId.replace('-USDT', '').toUpperCase().includes(busqueda))
                    .map(item => {
                        const nombre = item.instId.replace('-USDT', '');
                        const precioCOP = (parseFloat(item.last) * tasaCOP).toFixed(2);
                        const cambio = ((parseFloat(item.last) - parseFloat(item.open24h)) / parseFloat(item.open24h) * 100).toFixed(2);
                        const marketCapCOP = (parseFloat(item.vol24h) * parseFloat(item.last) * tasaCOP).toFixed(2);

                        return {
                            nombre,
                            precio: `${Number(precioCOP).toLocaleString()}  COP$`,
                            cambio: `${cambio}%`,
                            marketCap: `${Number(marketCapCOP).toLocaleString()}  COP$`
                        };
                    });
            } else {
                resultados = criptosUSDT.map(item => {
                    const nombre = item.instId.replace('-USDT', '');
                    const precioCOP = (parseFloat(item.last) * tasaCOP).toFixed(2);
                    const cambio = ((parseFloat(item.last) - parseFloat(item.open24h)) / parseFloat(item.open24h) * 100).toFixed(2);
                    const marketCapCOP = (parseFloat(item.vol24h) * parseFloat(item.last) * tasaCOP).toFixed(2);

                    return {
                        nombre,
                        precio: `${Number(precioCOP).toLocaleString()}  COP$`,
                        cambio: `${cambio}%`,
                        marketCap: `${Number(marketCapCOP).toLocaleString()}  COP$`
                    };
                });
            }

            mostrarTabla(resultados);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    function mostrarTabla(data) {
        const main = document.querySelector('#table__explore');
        main.innerHTML = ''; 

        if (data.length === 0) {
            main.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        const tabla = document.createElement('table');
        tabla.classList.add('tabla_cripto');
        tabla.innerHTML = `
            <tr class="tr__cripto__title">
                <th>Criptomoneda</th>
                <th>Precio (COP)</th>
                <th>Cambio 24h</th>
                <th>Capitalización de mercado (COP)</th>
            </tr>
        `;

        data.forEach(cripto => {
            const fila = document.createElement('tr');
            fila.classList.add('tr__cripto__info');
            fila.innerHTML = `
                <td>${cripto.nombre}</td>
                <td>${cripto.precio}</td>
                <td style="color:${parseFloat(cripto.cambio) >= 0 ? '#31df31' : '#df0707'}">${cripto.cambio}</td>
                <td>${cripto.marketCap}</td>
            `;
            tabla.appendChild(fila);
        });

        main.appendChild(tabla);
    }

    function limpiarTabla() {
        const main = document.querySelector('#table__explore');
        main.innerHTML = ''; 
    }

    function saveSearchToLocalStorage(busqueda) {
        let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

        if (!searches.includes(busqueda)) {
            searches.push(busqueda);
        }
        if (searches.length > 5) {
            searches.shift(); 
        }

        localStorage.setItem('recentSearches', JSON.stringify(searches));

        loadRecentSearches(); 
    }

    function loadRecentSearches() {
        if (!recentSearchesContainer) {
            return;
        }

        const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        recentSearchesContainer.innerHTML = ''; 

        if (searches.length > 0) {
            const list = document.createElement('ul');
            searches.forEach(search => {
                const listItem = document.createElement('li');
                listItem.textContent = search;
                listItem.addEventListener('click', () => {
                    searchInput.value = search;
                    obtenerDatos(search); 
                });
                list.appendChild(listItem);
            });
            recentSearchesContainer.appendChild(list);
        } else {
            recentSearchesContainer.innerHTML = '<p>No hay búsquedas recientes.</p>';
        }
    }
};

