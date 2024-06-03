function getUnidadesCompuestas(){
    return ['Rapidez','Aceleracion','Presion','Angulo','Potencia']
}
class Factor{
    constructor(nombre,Unidad_Medida,equivalecia,elevacion,soporte){
        this.nombre=nombre
        this.simbolo=Unidad_Medida;
        this.razon=equivalecia;
        this.soporte=soporte
        this.elevacion=elevacion;
        // let elevaciones=getElevaciones(this.simbolo)
        if(elevacion!=null){
        // if(elevaciones.length>0){
            // this.nombre+=' ',elevacionToString(elevaciones[0],this.nombre)
            let nombre_elevado=elevacionToString(elevacion,this.nombre)
            //console.log('nombre elevado=',nombre_elevado);
            this.nombre+=' '+nombre_elevado
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
    getElevacion(){
        if(this.elevacion==null){
            return 1
        }
        return this.elevacion
    }
    haveAuxSelect(){
        if(this.soporte==null){
            return true
        }
        return this.soporte
    }
}
function UnidadCompuesta(unidad){
    let unidCompuestas=getUnidadesCompuestas()
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
            factores[0].push(new Factor('Furlong','furlong',0.00497096 ))
            // el furlong ese tal vexz me de problemas ya que es dividido entre 14 dias para dar m/s
            factores[1]=getFactoresFor('Tiempo',true)
        }else{
            factores[1]=getFactoresFor('Tiempo',true,2)
        }        
    }
    else if(tipo_unidad==='Angulo'){
        factores[1]=getFactoresFor('Tiempo',true)
    }
    else if(tipo_unidad==='Presion'){
        //respecto al N
        // factores.push(new Factor('Newton','N',1))
        // factores.push(new Factor('libra','lb',0.2248))
        // factores.push(new Factor('Dinas','dyn',Math.pow(10,5)))
        factores[0]=getFactoresFor('Fuerza')

        factores[0].push(new Factor('Pascal','Pa',1,null,false))
        factores[0].push(new Factor('Bar','bar',1/(100000),null,false))
        factores[0].push(new Factor('Atmosfera','atm',1/(1.013e5),null,false))
        factores[0].push(new Factor('Milimetro de mercurio','mm Hg',1/133.3,null,false))
        factores[0].push(new Factor('Torr','torr',1/133.3,null,false))
        // factores[0].push(new Factor('Torr','mm Hg',1/133.3,null,false))

        factores[1]=getFactoresFor('Area',true)
        //ademas regresa los de Fuerza, area(longitud al cuadrado)
    }
    else if(tipo_unidad==='Potencia'){
        factores[0]=getFactoresFor('Energia')
        factores[0].push(new Factor('Vatio','W',60/859.85,1,false))
        // factores[0].push(new Factor('Vatio','W',60/859.85,1,))
        factores[0].push(new Factor('Caballos de fuerza','hp',60/(746*859.85),1,false))
        //tambien regresa tiempo como un soporte
        factores[1]=getFactoresFor('Tiempo',true)
    }

    return factores
} 
function efectuarElevacion(sistema,elevado){
    elevacion='1'
    if (elevado!=undefined){
        elevacion=elevarString(elevado)
    }
    if(sistema=='Area'){
        elevacion=elevarString(2)

    }else if(sistema=='Volumen'){
        // alert('ELEVACION 3')
        elevacion=elevarString(3)
    }
    return elevacion
}
function getFactoresFor(sistema,auxiliar,elevado){
    let factores=[];
    //para convertir hay que efectuar la operacion:
    //      Cantidad de la unidad a convertir * Factor de conversion 2(destino) / Factor de conversion 1(base)
    if(sistema==='Rapidez' || sistema=='Aceleracion' ||  sistema==='Presion'|| sistema=='Potencia'){
        return factores
    }

    if(auxiliar!=null){
        factores.push(new Factor('Unidad','1',1,1))
    }
    elevacion=efectuarElevacion(sistema,elevado)  

    if (sistema==='Longitud' || sistema==='Area'){
        // Respecto al metro
        // x mediada == 1 metro
         
        factores.push(new Factor('milimetros','mm',1000,elevacion))
        factores.push(new Factor('centimetros','cm',100,elevacion))
        factores.push(new Factor('metro','m',1,elevacion))
        factores.push(new Factor('Kilometro','km',0.001,elevacion))
        factores.push(new Factor('pie','ft',3.281,elevacion))
        factores.push(new Factor('pulgada','in',39.37,elevacion))
        factores.push(new Factor('milla','mi',0.0006214,elevacion))

        factores.push(new Factor('yarda','yd',1/.94,elevacion))
        factores.push(new Factor('Amperio','Á',10e-10,elevacion))
        factores.push(new Factor('milla nautica','A',1/1853.0935690338308,elevacion))
        factores.push(new Factor('año luz','Año Luz',1/(9.461e15),elevacion))

        factores.push(new Factor('Milesima de milimetro','μm',Math.pow(10,6),elevacion))
        factores.push(new Factor('Nanometro','nm',Math.pow(10,9),elevacion))
        // si es de area hay que elevar esa cantidad al cuadrado
    } 
    else if(sistema==='Volumen'){
         
        // respecto al litro
        factores.push(new Factor('centimetro','cm',Math.cbrt(1000),elevacion))
        factores.push(new Factor('metro','m',Math.cbrt(0.001),elevacion))
        factores.push(new Factor('pie','ft',Math.cbrt(0.03531),elevacion))
        factores.push(new Factor('pulgada','in',Math.cbrt(61.02),elevacion))
        // a los anteriores a este hay que marcales elevacion al cubo
        factores.push(new Factor('galon','galon',.264,1))
        factores.push(new Factor('litro','l',1,1))
    }
    else if(sistema==='Tiempo'){
         
        //respecto a minutos
        factores.push(new Factor('segundos','s',60,elevacion))
        factores.push(new Factor('minutos','min',1,elevacion))
        factores.push(new Factor('hora','h',1/60,elevacion))
        factores.push(new Factor('dia','d',1/60/24,elevacion))
        factores.push(new Factor('14 dias','14d',1/20160,elevacion))
        factores.push(new Factor('año','año',1/60/24/360,elevacion))

    }
    else if(sistema==='Angulo'){
         
        // respecto a los grados
        factores.push(new Factor('Grados','°',1,elevacion))
        factores.push(new Factor('Radianes','rad',1/57.3,elevacion))
        factores.push(new Factor('Revolucion','revolucion',1/360,elevacion))
    }
    else if(sistema==='Masa'){
        // rspecto al kg
        factores.push(new Factor('Kilogramo','kg',1))
        factores.push(new Factor('gramos','g',1000))
        factores.push(new Factor('libra','lb',2.205))
        factores.push(new Factor('slug','slug',0.0685))
        factores.push(new Factor('Dalton','u',1/(1.661*Math.pow(10,-27))))
    }
    else if(sistema==='Fuerza'){
        // respecto al Newton
        factores.push(new Factor('Newton','N',1))
        factores.push(new Factor('libra','lb',0.2248))
        factores.push(new Factor('Dinas','dyn',Math.pow(10,5)))
    }
    else if(sistema==='Energia'){
        // respecto a calorias
        factores.push(new Factor('Caloria','cal',1,1))
        factores.push(new Factor('Jules','J',1/.239,1,true))
        factores.push(new Factor('Ergio','ergs',Math.pow(10,7)/.239,1,false))
        
        factores.push(new Factor('ft * lb','ft*lb',1/(.239*1.356),1,true))

        // factores.push(new Factor('Jules','ft*lb',equiv))
        factores.push(new Factor('Unidad Termica Britanica','Btu',1/252,1,true))
        // pendiente
        factores.push(new Factor('Electronvoltio','eV',2.611e+19,1,false))
        factores.push(new Factor('Kilovatio por hora ','kWh',1.1622e-6,1,false))
    }
    else if(sistema==='Masa-energia'){
        // respecto a kg
        factores.push(new Factor('Kilogramo','kg',1))
        factores.push(new Factor('Julio','J',8.988*Math.pow(10,16)))
        factores.push(new Factor('Dalton','u',6.022e+26))
        factores.push(new Factor('Mega-electron voltio','MeV',5.60958616722e+29))
        factores.push(new Factor('Electron-Voltio','eV',5.60958616722e+35))
    }
    else if(sistema==='Potencia'){
        // respecto al Vatio
        factores.push(new Factor('Vatio','W',1,1,false))
        factores.push(new Factor('Caballo de fuerza','hp',1/746,1,false))
        factores.push(new Factor('Julio ','J/s',1,1,false))
        factores.push(new Factor('Unidad Terminca Britanica','Btu',1/.293))
        //tambien regresa tiempo como un soporte(cancelado)
    }
    return factores
} 
// function transformarUnidad(cantidad, medidaOrigen, medidaDestino){
//     medidaOrigen=DescomponerUnidad(medidaOrigen)
//     medidaDestino=DescomponerUnidad(medidaDestino)
//     for( let index in medidaOrigen){
        
//     }
// }