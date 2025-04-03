const inputPassword = document.querySelector("input[name='password']");
const inputEmail = document.querySelector("input[name='email']");

export const dialogMessage = (response)=>{ 
    if(response.status != 200){
        if (response.status === 401) {
            inputPassword.placeholder = "contraseña incorrecta!!!";
            const style = document.createElement('style');
            style.innerHTML = `
                input[type="password"]::placeholder {
                    color: rgb(179, 15, 15);
                }
            `;
            document.head.appendChild(style);
        } 
        
        else if (response.status === 404) {
            inputEmail.placeholder = "email incorrecto!!!";
            const style = document.createElement('style');
            style.innerHTML = `
                input[type="email"]::placeholder {
                    color: rgb(179, 15, 15);
                }
            `;
            document.head.appendChild(style);
        }
        
    }else{
        location.href = "views/bitcoin.html"
    }
}