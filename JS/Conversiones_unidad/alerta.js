/*<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="../static/js/alerta.js"></script>*/

// import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@9"

let errores;

function alert_w_asteroids(texto){
    Swal.fire({title:texto});
}

function activar_bombas(){
    errores=document.getElementsByClassName("candid_mensaje")
    console.log(errores)
    obtener_texto_errores(errores)
    
}
function obtener_texto_errores(errores){
    // textos=[]
    textos=""
    console.log("bucle")
    for(let b=0;b<errores.length;b++){
        console.log(errores[b])
        if (errores[b].innerText!=""){
            // textos.push(errores[b].innerText) 
            console.log(errores[b])
            textos+=(errores[b].innerText),"\n"
        }
    }
    console.log(textos);
    if(textos!=""){
        alert_w_asteroids(textos)
    }
    // document.getElementsByTagName("body")[0].onload=function(){
    //     console.log("Se cargo");
        
    // }
}
function bombas(){
    alert_w_asteroids("mensaje1")
    alert_w_asteroids("mensaje2")
}

// activar_bombas()
// bombas()