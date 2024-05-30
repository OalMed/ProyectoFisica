function elevarString(potencia){
    // return '^'+potencia
    return potencia
}
function getElevaciones(string){
    let separados=string.split('^')
    let elevaciones=[]
    
    for(let index=1;index<separados.length;index++){
        // potencia=''
        elevaciones.push(obtener(separados[index]))
    }
    return elevaciones
}
function obtener(cadena){ 
    let potencia='';
    cadena=cadena.replaceAll(' ','') 
    for(let indexString=0;indexString<cadena.length;indexString++){
        if(isNaN(cadena[indexString]) ){
            break
        }
        potencia+=cadena[indexString]
    }
    return potencia
}
function elevacionToString(elevacion,sujeto){
    let elevaString=''
    // alert(sujeto+' tiene '+elevacion)
    //console.error('ELEVACION=',elevacion);
    //console.error('SUJETO=',sujeto);
    if (elevacion==1|| elevacion=='' || elevacion==null){
        return ''
    }
    if (elevacion==2){
        elevaString= 'cuadrad'
    }
    
    if (elevacion==3){ 
        elevaString= 'cubic'
    } 

    if ((sujeto.endsWith('a') || sujeto.charAt(sujeto.length-2)=='a') && sujeto!='dia' ){
        elevaString+='a'
    }else{
        elevaString+='o'
    }

    if(sujeto.endsWith('s')){
        elevaString+='s'
    }

    //console.log(elevaString);
    return elevaString
}
//console.log(getElevaciones('16 m ^  2 / 34kg^ 3 '));