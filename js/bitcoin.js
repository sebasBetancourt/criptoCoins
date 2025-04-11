import { datCoins } from "./datCoins.js";
import { searchBitcoin } from "./searchBitcoin.js";

const save = document.getElementById("save");

document.addEventListener('DOMContentLoaded', function() {
    datCoins();
    searchBitcoin();
    setTimeout(function() {
      save.addEventListener("click", function() {
        save.innerHTML = `<img src="../storage/img/saveClick.svg" alt="Guardar">`; // Corregí la etiqueta <img> y añadí un alt
      });
    }, 2000);
});

