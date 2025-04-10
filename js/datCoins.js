export const datCoins = ()=> {
    const OKX_URL = 'https://www.okx.com/api/v5/market/tickers?instType=SPOT';
    const FX_API_URL = 'https://open.er-api.com/v6/latest/USD';
    const main = document.querySelector('#table__explore');

    async function obtenerDatos() {
        try {
            const [okxResp, fxResp] = await Promise.all([
                fetch(OKX_URL),
                fetch(FX_API_URL)
            ]);

            const okxData = await okxResp.json();
            const fxData = await fxResp.json();

            const tasaCOP = fxData.rates.COP;

            const criptosUSDT = okxData.data.filter(item => item.instId.endsWith('-USDT'));

            const resultados = criptosUSDT.map(item => {
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

            mostrarTabla(resultados);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    function mostrarTabla(data) {
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

    obtenerDatos();
}