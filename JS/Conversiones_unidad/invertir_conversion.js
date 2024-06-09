function invertirUnidadIngresada(){
    let inversor=document.getElementsByClassName('simbolo-flechas')[0]
    let inputs;
    
    inversor.addEventListener('click',function cambiarLugares(){
        if(getModoInWindow()==1){
            getSelectModoTag().dispatchEvent(new Event('change'))
            return 
        }

        inputs=document.getElementsByClassName('input') 
        let aux;

        console.log('in',inputs); 
        for(let index=0;index<selects.length-2;index++){
            console.log(selects[index].value+'\n'+selects[index+2]+'\n\n___');
            aux=selects[index].value
            selects[index].value=selects[index+2].value 
            selects[index+2].value=aux
            activarEvChangeIn(selects[index])
            activarEvChangeIn(selects[index+2])
        }

    }) 
}
function cambiarOptionSelected(select_object,option_index){
    select_object.value=select_object.options[option_index].value
    activarEvChangeIn(select_object)
}
function activarEvChangeIn(select_object){
    select_object.dispatchEvent(new Event('change'))
}

invertirUnidadIngresada()