function centrar_options(){

    let options=document.getElementsByTagName('option')
    
    for(let index=0;index<options.length;index++){
        let clases=options[index].classList
        if(clases.contains('text-center')==false){
            clases.add('text-center')
        }
    }
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
    // console.error(e.srcElement)
    
    window.compuesto=UnidadCompuesta(this.value)
    //console.log(this.value);
    //console.log(windowcompuesto);
    ALterarSelectSoporte(window.compuesto)
    
    selects=document.querySelectorAll('.mainSelect, .SelectSoporte')
    factores=TipoMedidaHasUnidades(this.value)
    //console.log(factores);

    let index_factores=0;
    let target=1

    console.log('inicia el bucle');
    for(let index=0;index<selects.length;index++){
        console.error('index=',index);
        //borra toodos los option del select
        selects[index].innerHTML='' 
        if(index%2==0){
            document.getElementsByName(selects[index].dataset.target)[0].value=''
        }
        try {
            for(let index2=0;index2<inputs.length;index2++){
                inputs[index2].value=''
            }
        } catch (error) {
            
        }
        //recorre los factores obtenidos (numerador y denominador)
        for(let SelIndex=0;SelIndex<factores[index_factores].length;SelIndex++){
            // selects[index].innerHTML+='<option class="text-center option-medida First-letter-Upp" data-simbolo="'
            selects[index].innerHTML+='<option class="text-center option-medida minusculas" data-simbolo="'
                +factores[index_factores][SelIndex].getSimbolo()
                +'" data-expo="'+factores[index_factores][SelIndex].getElevacion()
                +'" data-razon="'+factores[index_factores][SelIndex].getRazon()
                +'" data-auxiliar="'+factores[index_factores][SelIndex].haveAuxSelect()+'">'+factores[index_factores][SelIndex].getName()
            +'</option>'
        }
        
        if(window.compuesto==false){
            index+=1
            if(index%2!=0){ 
                selects[index-1].reset=true
            }
            selects[index-1].dispatchEvent(new Event('change'))
            selects[index-1].reset=false
            window.razones[index]=null
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

    console.log('<-----fin cambiar select');
    if(getModoInWindow()==1){
        console.log('estamos en el modo 2 y se cambio de tipo de unidad');
        aleatorizarSelects(true)
        
    }
    console.log('');
    // getSelectModoTag().dispatchEvent(new Event('change'))
}

let selected

function desaparecerSelectAuxIndividual(posicion,termino,select,target){
    let supp=document.getElementsByName('selSup'+termino)[0]
    selected=select.options[select.options.selectedIndex]

    if(posicion!=1){
        return
    }
    if(window.compuesto==false ){
        return
    }
    if(selected.dataset.auxiliar!='false'){
        if (buscarEnClase(select.classList,'col-6')==-1){
            select.classList.add('col-6')
            select.classList.remove('col-12')
        }
        supp.style.display=''
        supp.dispatchEvent(new Event('change'))
        return
    }
    
    // el option del select pulsado es el numerador y no tiene select auxiliar        
    console.log('_____FALSE_');
    supp.style.display='none'
    
    target.value=target.value.split('/')[0]

    if (buscarEnClase(select.classList,'col-12')==-1){
        select.classList.remove('col-6')
        select.classList.add('col-12')
        return
    }
    
}
let fallido=[];
function escribirSimbolos(e){
    // console.log(e);
    console.log('__escribir simbolo');
    // console.log('this name=',this.name);
    // console.log('anterior=',this.anterior,'\nactual=',this.selectedIndex+'\n\n__');
    let termino=(this.dataset.target[this.dataset.target.length-1])
    let posicion=parseInt(this.dataset.posicion)
    
    target=document.getElementsByName(this.dataset.target)[0]
    // console.log('termino=',termino+';posicion:',posicion);
    // alert(this.options[this.selectedIndex].dataset.auxiliar)
    // console.log('supp=selSup'+termino);
    desaparecerSelectAuxIndividual(posicion,termino,this,target)
    
    // alert('posicion:'+posicion+'\nSupport=',supp)
    

    termino=parseInt(termino)
    // console.log(this);
    let expo;
    try {
        expo=this.options[this.options.selectedIndex].dataset.expo
        // console.log('CORRECTO');
    } catch (error) {
        console.log('FALLIDO');
        // console.log('options=',this.options);
        // console.log('yo=',this);
        // console.log(this.checkVisibility());
        return 
    }

    posicion-=2
    if(termino==2){
        posicion+=1
    }
    
    let lugar_en_razones =termino+posicion
    posicion+=1

    if(this.checkVisibility()==false){
        if(window.compuesto==true){
            console.log('__NO ES VISIBLE__');
            window.razones[lugar_en_razones]=null
            window.exponentes[lugar_en_razones]=null
            return
        }
        // return
    }
    let pantalla=target.value.split('/')

    if(this.checkVisibility()==false){
        target.value=target.value.split('/')[0]
        return
    }
    
    let razon=this.options[this.options.selectedIndex].dataset.razon
    // alert('index='+lugar_en_razones+' __' +razon+' en '+this.name)
    let simbolo=this.options[this.options.selectedIndex].dataset.simbolo
    
    window.razones[lugar_en_razones]=razon
    window.exponentes[lugar_en_razones]=expo

    if(termino==1){
        posicion+=1
    }

    if(this.reset){
        // console.log('__RESET');
        target.value=''   
    }
    
    // simbolo+='<sup>'+expo+'</sup>'
    if(expo>1){
        simbolo+='^'+expo
    }
    
    // let posicion=this.dataset.posicion
    
    // console.log('posicion=',posicion);
    // console.log('simbolo=',simbolo);
    // console.error('pantalla=',pantalla);
    resfrescarSimbolos(pantalla,posicion,target,simbolo)
    
    // console.error('DEBE REFRESCAR el input');
    document.getElementsByClassName('Active')[0].dispatchEvent(new Event('input'))
    this.anterior=this.options.selectedIndex
}

function resfrescarSimbolos(pantalla,posicion,target,simbolo){
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