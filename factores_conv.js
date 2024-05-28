class Factor{
    constructor(Unidad_Medida,equivalecia){
        this.nombre=Unidad_Medida;
        this.razon=equivalecia;
    }
    NameIs(Nombre){
        return this.nombre ==Nombre
    }
    getRazon(){
        return this.razon
    }
}
function UnidadATipoMedida(unidad){
    nombres=['distancia','volumen']
    distancia=[]
    volumen=[]
    tiempo=[]
    angulo=[]
    
}

function getFactoresFor(sistema){
    let factores=[];
    //para convertir hay que efectuar la operacion:
    //      Cantidad de la unidad a convertir * Factor de conversion 2(destino) / Factor de conversion 1(base)
    
    if (sistema==='Longitud' || sistema=='Area'){
        // Respecto al metro
        // x mediada == 1 metro
        factores.push(new Factor('cm',100))
        factores.push(new Factor('mm',1000))
        factores.push(new Factor('μm',Math.pow(10,6)))
        factores.push(new Factor('nm',Math.pow(10,9)))
            
        factores.push(new Factor('km',0.001))
        factores.push(new Factor('mi',0.0006214))
        
        factores.push(new Factor('ft',3.281))
        factores.push(new Factor('in',39.37))
        // si es de area hay que elevar esa cantidad al cuadrado
    } 
    else if(sistema==='Volumen'){
        // respecto al litro
        factores.push(new Factor('cm',1000))
        factores.push(new Factor('m',0.001))
        factores.push(new Factor('ft',0.03531))
        factores.push(new Factor('in',61.02))

        // a los anteriores a este hay que marcales elevacion al cubo
        factores.push(new Factor('galon',.264))
    }
    else if(sistema==='Tiempo'){
        //respecto a minutos
        factores.push(new Factor('h',1/60))
        factores.push(new Factor('s',60))
        factores.push(new Factor('d',1/60/24))
        factores.push(new Factor('año',1/60/24/360))
    }
    else if(sistema==='Angulo'){
        // respecto a los grados
        factores.push(new Factor('rad',))
    }
    else if(sistema==='Rapidez'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Aceleracion'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Masa'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Fuerza'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Presion'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Energia'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Masa-energia'){
        factores.push(new Factor('',))
    }
    else if(sistema==='Potencia'){
        factores.push(new Factor('',))
    }
    return factores
}
function DescomponerUnidad(unidad_compuesta){
    return unidad_compuesta.split('/') 
}
function transformarUnidad(cantidad, medidaOrigen, medidaDestino){
    medidaOrigen=DescomponerUnidad(medidaOrigen)
    medidaDestino=DescomponerUnidad(medidaDestino)
    for( let index in medidaOrigen){
        
    }
}
