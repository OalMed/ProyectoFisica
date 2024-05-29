function invertirUnidadIngresada(){
    let inversor=document.getElementsByClassName('simbolo-flechas')[0]
    let inputs;
    
    inversor.addEventListener('click',function cambiarLugares(){
        inputs=document.getElementsByClassName('input')
        for(let index=0;index<inputs.length;index++){
            if(inputs[index].classList.contains('Active')){
                inputs[index].classList.remove('Active')
                inputs[index].disabled=true
            }else{
                inputs[index].classList.add('Active')
                inputs[index].disabled=false
            }
        }
    
    }) 
}


invertirUnidadIngresada()