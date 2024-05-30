function centrar_options(){

    let options=document.getElementsByTagName('option')
    
    for(let index=0;index<options.length;index++){
        let clases=options[index].classList
        if(clases.contains('text-center')==false){
            clases.add('text-center')
        }
    }
}

function buscarEnClase(class_list,incidencia){
    for(let index=0;index<class_list.length;index++){
        if(class_list[index].split(incidencia).length!=1){
            return index
        }
    }
    return -1
}

function ALterarSelectSoporte(activo){
    let soportes=document.getElementsByClassName('SelectSoporte')
    let mainSelects=document.getElementsByClassName('mainSelect')
    let claseAbuscar,newClass
    if (activo){
        //hay que hacer que el select de soporte se manifieste
        activo=''
        claseAbuscar='col-12'
        newClass='col-6'
    }else{
        //hay que desaparecer el select de soporte
        activo='none'
        claseAbuscar='col-6'
        newClass='col-12'
    }

    for(let index=0;index<soportes.length;index++){
        soportes[index].style.display=activo
        
        let indexClass=buscarEnClase(mainSelects[index].classList,claseAbuscar)
        if(indexClass!=-1){
            //exite la clase
            mainSelects[index].classList.replace(claseAbuscar,newClass)
        }
    }
}

function cambiarSelects(e){
    // alert('pressed')
    // console.log(e)
    targ=e
    
    let compuesto=UnidadCompuesta(this.value)
    //console.log(this.value);
    //console.log(compuesto);
    ALterarSelectSoporte(compuesto)
    
    selects=document.querySelectorAll('.mainSelect, .SelectSoporte')
    factores=TipoMedidaHasUnidades(this.value)
    //console.log(factores);

    let index_factores=0;
    let target=1

    for(let index=0;index<selects.length;index++){
        console.error(index);
        selects[index].innerHTML='' 
        
        for(let SelIndex=0;SelIndex<factores[index_factores].length;SelIndex++){
            selects[index].innerHTML+='<option class="text-center option-medida" data-simbolo="'
                +factores[index_factores][SelIndex].getSimbolo()
                +'" data-expo="'+factores[index_factores][SelIndex].getElevacion()
                +'" data-razon="'+factores[index_factores][SelIndex].getRazon()+'">'+factores[index_factores][SelIndex].getName()
            +'</option>'
        }
        
        if(compuesto==false){
            index+=1
            if(index%2!=0){ 
                selects[index-1].reset=true
            }
            selects[index-1].dispatchEvent(new Event('change'))
            selects[index-1].reset=false
        }else{
            if(index%2==0){ 
                selects[index].reset=true
            }
            selects[index].dispatchEvent(new Event('change'))
            selects[index].reset=false
        }
         
        if(index==1){
            index_factores=-1
            target++
        }
        index_factores++ 
    } 
}

function escribirSimbolos(){
    console.log('this name=',this.name);

    if(this.checkVisibility()==false){
        console.log('__NO ES VISIBLE__');
        return
    }
    
    target=document.getElementsByName(this.dataset.target)[0]
    if(this.reset){
        console.log('__RESET');
        target.value=''   
    }

    let simbolo=this.options[this.selectedIndex].dataset.simbolo
    let expo=this.options[this.selectedIndex].dataset.expo
    // simbolo+='<sup>'+expo+'</sup>'
    if(expo>1){
        simbolo+='^'+expo
    }

    let posicion=this.dataset.posicion
    let pantalla=target.value.split('/')
    
    console.log('posicion=',posicion);
    console.log('simbolo=',simbolo);
    console.error('pantalla=',pantalla);

    if(pantalla.length==1){
        if (posicion==2){
            target.value+='/'+simbolo
            return
        }
        target.value=simbolo
        return
    }

    if(posicion==1){
        target.value=simbolo+'/'+pantalla[1]
        return
    } 
    target.value=pantalla[0]+'/'+simbolo
}
