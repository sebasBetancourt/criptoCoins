export const hamburguer = ()=>{
        const menuToggle = document.getElementById("menuToggle");
        const nav = document.querySelector("nav");
    
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    
}