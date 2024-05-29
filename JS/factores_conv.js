class Factor{
    constructor(nombre,Unidad_Medida,equivalecia){
        this.nombre=nombre
        this.simbolo=Unidad_Medida;
        this.razon=equivalecia;

        let elevaciones=getElevaciones(this.simbolo)
        console.log('eleva',elevaciones)
        if(elevaciones.length>0){
            this.nombre+=' '+elevacionToString(elevaciones[0],this.nombre)
        }
        
    }
    NameIs(Nombre){
        return this.nombre ==Nombre
    }
    getName(){
        return this.nombre
    }
    getSimbolo(){
        return this.simbolo
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
function UnidadCompuesta(unidad){
    let unidCompuestas=['Rapidez','Aceleracion','Presion','Potencia']
    if (unidCompuestas.indexOf(unidad)!=-1){
        return true
    }
    return false
}

function TipoMedidaHasUnidades(tipo_unidad){ 
    let factores=new Array(2);
    factores[0]=getFactoresFor(tipo_unidad)
    factores[1]=[]
    
    if(tipo_unidad==='Rapidez' || tipo_unidad=='Aceleracion'){
        //tiene que regresar factores de longitud y tiempo
        //ademas de 'furlong' (No se que es esa madre)(si es aceleracion)
        factores[0]=getFactoresFor('Longitud')

        if(tipo_unidad==='Rapidez'){
            factores[0].push(new Factor('Furlong','furlong',))
            // el furlong ese tal vexz me de problemas ya que es dividido entre 14 dias para dar m/s
        }
        
        factores[1]=getFactoresFor('Tiempo')
    }
    else if(tipo_unidad==='Presion'){
        factores[0]=getFactoresFor('Fuerza')
        factores[0].push(new Factor('Pascal','Pa'))

        factores[1]=getFactoresFor('Area')
        //ademas regresa los de Fuerza, area(longitud al cuadrado)
    }
    else if(tipo_unidad==='Potencia'){
        //tambien regresa tiempo como un soporte
        factores[1]=getFactoresFor('Tiempo')
    }

    return factores
} 

function getFactoresFor(sistema){
    let factores=[];
    //para convertir hay que efectuar la operacion:
    //      Cantidad de la unidad a convertir * Factor de conversion 2(destino) / Factor de conversion 1(base)
    elevacion=''
    if(sistema==='Rapidez' || sistema=='Aceleracion' ||  sistema==='Presion' ){
        return factores
    }

    if(sistema=='Area'){
        elevacion=elevarString(2)

    }else if(sistema=='Volumen'){
        alert('ELEVACION 3')
        elevacion=elevarString(3)
    }

    if (sistema==='Longitud' || sistema==='Area'){
        // Respecto al metro
        // x mediada == 1 metro
         
        factores.push(new Factor('metro','m'+elevacion,1))
        factores.push(new Factor('centimetros','cm'+elevacion,100))
        factores.push(new Factor('milimetros','mm'+elevacion,1000))
        factores.push(new Factor('Milesima de milimetro','μm'+elevacion,Math.pow(10,6)))
        factores.push(new Factor('Nanometro','nm'+elevacion,Math.pow(10,9)))
        factores.push(new Factor('Kilometro','km'+elevacion,0.001))
        factores.push(new Factor('milla','mi'+elevacion,0.0006214))
        factores.push(new Factor('pie','ft'+elevacion,3.281))
        factores.push(new Factor('pulgada','in'+elevacion,39.37))
        // si es de area hay que elevar esa cantidad al cuadrado
    } 
    else if(sistema==='Volumen'){
         
        // respecto al litro
        factores.push(new Factor('centimetro','cm',1000))
        factores.push(new Factor('metro','m',0.001))
        factores.push(new Factor('pie','ft',0.03531))
        factores.push(new Factor('pulgada','in',61.02))
        // a los anteriores a este hay que marcales elevacion al cubo
        factores.push(new Factor('galon','galon',.264))
        factores.push(new Factor('litro','l',.264))
    }
    else if(sistema==='Tiempo'){
         
        //respecto a minutos
        factores.push(new Factor('hora','h',1/60))
        factores.push(new Factor('minutos','min',1/60))
        factores.push(new Factor('segundos','s',60))
        factores.push(new Factor('dia','d',1/60/24))
        factores.push(new Factor('año','año',1/60/24/360))

    }
    else if(sistema==='Angulo'){
         
        // respecto a los grados
        factores.push(new Factor('Radianes','rad',))
        factores.push(new Factor('Grados','rad',))
        factores.push(new Factor('Revolucion','rad',))
        factores.push(new Factor('Revolucion por minuto','rad',))
    }
    else if(sistema==='Masa'){
        factores.push(new Factor('Kilogramo',))
        factores.push(new Factor('libra',))
        factores.push(new Factor('gramos',))
        factores.push(new Factor('slug',))
        factores.push(new Factor('Dalton','u',))
    }
    else if(sistema==='Fuerza'){
        factores.push(new Factor('Newton','N'))
        factores.push(new Factor('Dinas','dinas'))
        factores.push(new Factor('libra','lb'))
    }
    else if(sistema==='Energia'){
        factores.push(new Factor('Jules','J'))
        factores.push(new Factor('Jules','ergs'))
        factores.push(new Factor('Jules','cal'))
        // factores.push(new Factor('Jules','ft*lb'))
        factores.push(new Factor('Jules','Btu'))
        factores.push(new Factor('Jules','eV'))
        factores.push(new Factor('Jules','kWh'))
    }
    else if(sistema==='Masa-energia'){
        factores.push(new Factor('Kilogramo','kg'))
        factores.push(new Factor('Kilogramo','J'))
        factores.push(new Factor('Kilogramo','u'))
        factores.push(new Factor('Kilogramo','MeV'))
        factores.push(new Factor('Kilogramo','eV'))
    }
    else if(sistema==='Potencia'){
        factores.push(new Factor('Whatts','W',))
        factores.push(new Factor('Whatts','hp',))
        //tambien regresa tiempo como un soporte
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
