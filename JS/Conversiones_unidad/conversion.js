// import {} from "./funcionesGenerales.js";
// import {} from "./elevaciones.js"
// import {} from "./factores_conv.js"
// import * as sel from "./selects.js"

// contraerAleatoriokInit()

function contraer(target,alterar_texto,imagen){
    if(target.style.display=='none'){
        //rehacer visible
        // target.style.opacity=''
        target.style.display=''
        if(alterar_texto){
            this.innerText='Contraer'
        }
        if(imagen!=null){
            imagen.style.transform=''
        }
        return
    }
    //ocultar
    if(alterar_texto){
        this.innerText='Expandir'
    }
    if(imagen!=null){
        imagen.style.transform='rotate(180deg)'
    }
    // b.style.opacity='0'
    target.style.display='None'
}

function contraerAleatorioInit(){
    // alert('contraer')
    let boton_contraer=document.getElementsByClassName('contraer')

    let target=document.getElementsByClassName('contraerTarget')
    let img=document.getElementsByClassName('imagen-contraer')

    for(let index=0;index<boton_contraer.length;index++){
        let alterar_texto=false;
        if (boton_contraer[index].dataset.alterar_texto=='true'){
            alterar_texto=true
        }
        if(img.length<index){
            img.add(null)
        }
        boton_contraer[index].addEventListener('click',function(e,target_hide=target[index],alt_text=alterar_texto,imagen=img[index]){
            contraer(target_hide,alt_text,imagen)
        })
        // console.log(boton_contraer);
        // console.log('index=',index);
        // boton_contraer[index]=function (e,target_hide=target[index],alt_text=alterar_texto,imagen=img[index]){
        //     contraer(target_hide,alt_text,imagen)
        // }
    }

}

function getSelectModoTag(){
    return document.getElementsByName('modo')[0]
}
function getModoSelected(modo){
    return modo.options[modo.options.selectedIndex]
}
function setModo(modo){
    window.modo=modo
}
function actualizarModo(modo){
    // alert(modo)
    setModo(getModoSelected(modo).id)   
}
function getModoInWindow(){
    return window.modo
}
function getMaxCifra(){
    return  1*(document.getElementsByName('lim-digitos')[0].value)
}
function getDecimasRedondeo(){
    return .1*(document.getElementsByName('redondeo')[0].value)
}
function generarCifra(){
    let cifra=''+Math.random()*getMaxCifra()
    let splited=cifra.split('.')
    cifra=splited[0]+'.'
    for(let index=0;index<getDecimasRedondeo()/.1;index++){
        cifra+=splited[1][index]
    }
    return parseFloat(cifra)
}
function isTipoUnidadAleatoria(){
    return document.getElementsByName('unid-medida-aleatoria')[0].checked
}
function isMagnitudAleatoria(){
    return document.getElementsByName('magnitud-aleatoria')[0].checked
}
function aleatorizarTipoUnidadMedida(){
    console.log('aleatorizar Tipo Unidad  Medida');
    let uni=document.getElementsByName('UnidadesMedida')[0]
    if(getModoInWindow()!=3){
        let aleatorio=parseInt(Math.random()*(uni.options.length))
        if(aleatorio>=uni.options.length){
            aleatorio=uni.options.length-1
        }
        // console.log('aleatorio=',aleatorio);
        uni.options.selectedIndex=aleatorio
    }
    // alert('debes iniciar primero la asignacion de eventos de los objetos')
    uni.dispatchEvent(new Event('change')) 
}  
function AlterarImagenCentro(){
    let modo=getModoInWindow()
    // 1=practica
    // 2=verificacion
    if (modo==1){
        document.querySelector('.leyenda').style.display=''
        document.getElementsByName('config')[0].parentNode.style.display=''
        
        let newImg='../imgs_conversion/retry.png'
        document.querySelector('#imagenFlechas').src=newImg
        document.getElementsByName('comprobar')[0].style.display=''
        document.getElementsByName('magnitud1')[0].disabled=true
    }
    if(modo==2){
        document.querySelector('.leyenda').style.display='none'

        document.getElementsByName('config')[0].parentNode.style.display='none'
        document.getElementsByName('magnitud1')[0].disabled=false
        document.querySelector('#imagenFlechas').src='../imgs_conversion/flecha2.png'
        // document.querySelector('#imagenFlechas').src='../imgs_conversion/flecha2.png'
    }
    if(modo==3){
        document.getElementsByName('config')[0].parentNode.style.display='none'
        document.querySelector('#imagenFlechas').src='../imgs_conversion/flecha2.png'
        document.getElementsByName('magnitud1')[0].disabled=false
        document.getElementsByName('comprobar')[0].style.display='none'
        document.querySelector('.leyenda').style.display='none'
        return 
    }
        
    if(getModoInWindow()==1){
        document.querySelector('.leyenda').innerText='NUEVO EJERCICIO'
        // document.querySelector('.leyenda').innerText='NUEVA'
        return
    }
}
function comprobarProbabilidad(prob_Actual,prob_anterior,maximo){
    while (prob_Actual==prob_anterior) {
        prob_Actual=parseInt(Math.random()*maximo)
    }
    return prob_Actual
}
function aleatorizarMedidas(){
    let prob_anterior;
    for(let index=0;index<selects.length;index++){
        let prob_Actual=parseInt(Math.random()*selects[index].options.length-1)

        if(index%2==0){
            prob_Actual=comprobarProbabilidad(prob_Actual,prob_anterior,selects[index].options.length-1)
            prob_anterior=prob_Actual
        }else{
            // alert(prob_Actual)
            if(prob_Actual==0){
                prob_Actual+=1
            }
        }

        selects[index].options.selectedIndex=prob_Actual
        console.log('random=',selects[index].options.selectedIndex);
        
        selects[index].dispatchEvent(new Event('change'))
    }
}
function InputClick(){
    let activo=document.getElementsByClassName('Active')[0]
    //alert('INPUT;',activo.value)
    if(isNaN(this.value)){
        this.value=''
        this.dispatchEvent(new Event('input'))
    }
    if(activo==this){
        console.log('RETURN');
        return
    }
    activo.classList.remove('Active')
    
    this.classList.add('Active')
}
function ocultarCorrecto(reaparecer){
    let correctos=document.querySelectorAll('#ResCorrecto,.borrado-limpieza')
    for(let index=0;index<correctos.length;index++){
        if(reaparecer==null){
            correctos[index].style.display='none'
        }else{
            correctos[index].style.display=''
        }
    }
}
function limpiarClasesVerificacion(reaparecer){
    ocultarCorrecto(reaparecer)
    if(reaparecer!=null){
        return
    }
    let verif=document.querySelectorAll('.correcto,.corregido')
    if(verif.length>0){
        verif[0].classList.remove('correcto')
        verif[0].classList.remove('corregido')
    }
}

function getResultado(){
    let inputs=document.getElementsByClassName('input')
    
    let activo=buscarClase(inputs,'Active')
    
    if(getModoInWindow()==3){
        if(activo==0){
            pasado=1
        }else{
            pasado=0
        }
        inputs[pasado].value=''
    }else{
        pasado=0
        activo=0
    }

    activo=parseFloat(activo)
    let incremento=0,decremento=0;
    if (activo!=0){
        console.log('INCREMENTO ACTIVO');
        incremento=2
    } 
    let n_simbolos
    
    // n_simbolos=document.getElementsByName(this.dataset.target)[0].value.split('/').length
    numerador=Math.pow(window.razones[2-incremento],window.exponentes[2-incremento])
    // alert(n_simbolos)
    numerador=numerador/Math.pow(window.razones[0+incremento],window.exponentes[0+incremento])
    // if(n_simbolos>1){
    // }
    
    // denominador=window.razones[pasado+2]/window.razones[pasado]
    if(window.razones[1]==null){
        denominador=1
    }else{
        // denominador=window.razones[pasado+2]/window.razones[pasado]
        
        // let target='simbolo'
        let orden=[]
        //opuesto, propio
        if(activo==0){
            orden.push(2,1)
        }else{
            orden.push(1,2)
        }
        // let target='simbolo'+(activo+1)
        let n_simbolos2;
        
        n_simbolos2=document.getElementsByName('simbolo'+orden[0])[0].value.split('/').length
        n_simbolos=document.getElementsByName('simbolo'+orden[1])[0].value.split('/').length
        
        if(n_simbolos2!=1){
            // nosotos, el input Activo es el que no es unidad compuesta
            denominador=Math.pow(window.razones[3-incremento],window.exponentes[3-incremento])
        }else{
            // la unidad destino no es unidad compuesta( su denominador es 1)
            denominador=1
        }
        
        // alert(n_simbolos)
        if(n_simbolos!=1){
            denominador=denominador/Math.pow(window.razones[1+incremento],window.exponentes[1+incremento])
        }                    
    }
    console.log(numerador+'/'+denominador);
    return parseFloat(inputs[activo].value)*numerador/denominador
}
function refrescarInputValue(){
    if(getModoInWindow()!=3){
        limpiarClasesVerificacion()
        return
    }
    // if(window.modo!=3){
        //     //modo 3 seria para volver al modo de conversion automatica(no posible para el usuario)
        //     return
        // }
    console.log('modo=',getModoInWindow());
    console.log('refresh input value');

    
    let resultadoInput
    if(getModoInWindow()!=3){
        resultadoInput=document.getElementById('ResCorrecto')
    }else{
        resultadoInput=inputs[pasado]
    }
    let res=getResultado()

    if(!isNaN(res)){
        // resultadoInput.value=res;
        resultadoInput.innerText=res;
    }else if(res!=''){
        resultadoInput.value='';
    } 
}
function conversionAuto(){
    inputs=document.getElementsByClassName('input')

    for(let index=0;index<inputs.length;index++){
        inputs[index].onclick=InputClick 
        inputs[index].addEventListener('input',refrescarInputValue)
        inputs[index].addEventListener('keydown',function(tecla,numInput=index){
            // console.error('key=',tecla.key);
            key=tecla
            if(tecla.key=='Enter' || tecla.key=='Tab'){
                // alert(numInput)
                tecla.preventDefault()
                if(numInput==0){
                    inputs[1].focus()
                    // console.log('');
                }else{
                    // console.log('DEBE ENVUAR');
                    document.getElementsByName('comprobar')[0].dispatchEvent(new Event('click'))
                    // inputs[0].focus()
                }
            }
        })
    }
}
function isConversionRigth(res,target){
    let decimas=getDecimasRedondeo()
    let valor_Ingresado=target.value

    if((valor_Ingresado)==''){
        return null
    }
    
    return (valor_Ingresado<=res+decimas && valor_Ingresado>=res-decimas)    
}
function aleatorizarSelects(pressed_from_uni){
    console.log('Aleatorizar selects');
    
    if(getModoInWindow()==1){
        if(isTipoUnidadAleatoria() && pressed_from_uni==null){
            aleatorizarTipoUnidadMedida()
        }   
        if(pressed_from_uni==null){
            uni.dispatchEvent(new Event('change'))
        }
        aleatorizarMedidas()
    }else{
        if(pressed_from_uni==null){
            uni.dispatchEvent(new Event('change'))
        }
    }

    if(getModoInWindow()==1 && isMagnitudAleatoria()){
        let magnitud=generarCifra()
        console.log('magnitud=',magnitud);
        document.getElementsByName('magnitud1')[0].value=magnitud
    }
    console.log('   |-----FIN');
}



//init variables
window.razones=new Array(4);
window.exponentes=new Array(4);

let selects,factores,targ,inputs,pasado,IndexOption=[],numerador,denominador;

let uni=document.getElementsByName('UnidadesMedida')[0]

selects=document.querySelectorAll('.mainSelect, .SelectSoporte')
let modo=getSelectModoTag()
let aplicar=document.getElementsByName('aplicarConfiguracion')[0]
let boton_confir=document.getElementsByClassName('verif-butt')[0]
let key;












//asignacion de eventos
    //asignacion del evento escribir simbolo de los selects 
for(let index=0;index<selects.length;index++){
    selects[index].anterior=null
    selects[index].addEventListener('change',escribirSimbolos)
}
    //evento encargado de la conversion automatica de los datos en el modo 3
conversionAuto()

    //evento para cambiar entre los tipos de unidad de medida
uni.addEventListener('change',cambiarSelects)

modo.addEventListener('change',function cambiarModo(e,pressed_from_uni){
    actualizarModo(this)
    AlterarImagenCentro()

    aleatorizarSelects()
})
aplicar.addEventListener('click',function(){
    getSelectModoTag().dispatchEvent(new Event('change'))
})
//asigna el evento al boton de contraer 
// contraerAleatorioInit()   
boton_confir.addEventListener('click',function isResultRigth(e){
    console.log('click');
    if(document.querySelectorAll('.correcto,.corregido').length!=0){
        return
    }

    limpiarClasesVerificacion(false)
    
    let res=getResultado()
    // let target=document.getElementsByName('destino')[0]
    let target=document.getElementsByName('destino')[0]

    let correcto=isConversionRigth(res,target)

    
    if(!correcto){
        target.classList.add('corregido')
        if(correcto==null){
            alert_w_asteroids('SIN TRAMPAS.DEBES LLENAR EL SEGUNDO CUADRO')
            ocultarCorrecto()
            return
        }
        alert_w_asteroids('CONVERSIÓN INCORRECTA')
        // target.value=res
        document.getElementById('ResCorrecto').innerText=res
        return
    }
    ocultarCorrecto()
    alert_w_asteroids('CONVERSIÓN CORRECTA')
    target.classList.add('correcto')
    
})












//activacion de los eventos
//activa el evento de selccion de modo

modo.dispatchEvent(new Event('change'))

//oculta las configuraciones
// aqui deberia de estar :
    // document.getElementsByName('config')[0].dispatchEvent(new Event('click'))
// pero el desgraciado de 
    // contraerAleatorioInit()
// no quiere servir aqui, el espacialito solo sirve en el archivo html

//otras funciones no eventos
centrar_options()

// limpiarClasesVerificacion()
// alert('conversion')

// import {} from "./invertir_conversion.js"