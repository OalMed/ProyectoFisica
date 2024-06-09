function buscarEnClase(class_list,incidencia){
    for(let index=0;index<class_list.length;index++){
        if(class_list[index].split(incidencia).length!=1){
            return index
        }
    }
    return -1
}
function buscarClase(inputs,clase){
    for(let indexClass=0;indexClass<inputs.length;indexClass++){
        if(inputs[indexClass].classList.contains(clase)){
            return indexClass   
        }
    }
    return false
} 
function MostarDimensiones(body){
    body.querySelector('#Tamaño').innerText=body.clientWidth+'x'+body.clientHeight
}
function InitMostrarDimensiones(){
    let body=document.getElementsByTagName('body')[0]
    body.onresize=function(e){
        let body=document.getElementsByTagName('body')[0]
        MostarDimensiones(body)
    }
    // body.dispatchEvent(new Event('resize'))
    MostarDimensiones(body)
}
InitMostrarDimensiones()