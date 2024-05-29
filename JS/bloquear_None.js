let nulos=document.getElementsByClassName("None");
let body=document.getElementsByTagName("body")[0];
/* 
Extra small
    <576px
sm
    ≥576px
md
    ≥768px
lg
    ≥992px
xl
    ≥1200px
xxl
    ≥1400px */
let opciones=["sm","md","lg","xl","xxl"];
let tamaños=[576,768,992,1200,1400];

class Semejantes{
    integrantes=[];
    constructor(limite){
        this.techo=limite;
        this.visible=true
    }
    addElement(elemento){
        this.integrantes.push(elemento);
    }
    getTecho(){
        return this.techo;
    }
    getIntegranteAt(indice){
        try {
            return this.integrantes[indice];
        } catch (error) {
            return -1;    
        }
    }
    getNIntegrantes(){
        return this.integrantes.length;
    }
    getVisibilidad(){
        return this.visible;
    }
    invertirVisibilidad(){
        this.visible=!this.visible;
    }
}
let elementos=[];

function addElement(posicion_Elemento,techo){
    if(elementos.length===0){
        elementos.push(new Semejantes(techo));
    }
    for(let b=0;b<elementos.length;b++){
        if(elementos[b].techo==techo){
            //__ console.log(nulos[posicion_Elemento],"techo=",techo)
            elementos[b].addElement(nulos[posicion_Elemento]);
            return;
        }
    }
    elementos.push(new Semejantes(techo));
    elementos[elementos.length-1].addElement(nulos[posicion_Elemento]);

}

function getNoneExtension(b){
    for(let b2=0;b2<opciones.length;b2++){
        if((nulos[b].getAttribute("class")).split("None-"+opciones[b2]).length!=1){
            //__ console.log(nulos[b],"__",opciones[b2])
            return tamaños[b2];
        }
    }
    return 0;
    // (nulos[b].getAttribute("class")).split("margin").length;
}
function adaptarVisibilidad(){
    //__ console.log("cambio de tamaño");
    for(let b=0;b<body.elementos.length;b++){
        AlterarIntegrantes(b);
    }
}
function AlterarIntegrantes(b){
    //992
    if( body.clientWidth < body.elementos[b].techo-17 && body.elementos[b].getVisibilidad()){
        //pasaste del limite de tamaño de hasta donde puede aparecer este grupo
        //ademas de que el grupo anteriormente era activo, es decir acabas de incrementar la pantalla
        //eso significa que hay que hacerlos invisibles

        for(let b2=0;b2<body.elementos[b].getNIntegrantes();b2++){
            body.elementos[b].getIntegranteAt(b2).style.display="None";
        }
        body.elementos[b].invertirVisibilidad();
        return;
    }
    if( body.clientWidth >= (body.elementos[b].techo-17) && !body.elementos[b].getVisibilidad()){
        //ingresaste al rango de tamaño donde puede aparecer este grupo
        //ademas de que el grupo anteriormente estaba desactivado, es decir acabas de disminuir la pantalla
        //eso significa que hay que hacerlos visibles

        for(let b2=0;b2<body.elementos[b].getNIntegrantes();b2++){
            body.elementos[b].getIntegranteAt(b2).style.display="";
        }
        body.elementos[b].invertirVisibilidad();
    }

    // if(body.clientWidth<=body.elementos.getTecho()){
    //     //la pantalla esta en el rango de accion del techo, es decir, los elementos deben ser visibles
    //     for(let b2=0 ; b<body.elementos[b].getNIntegrantes() ; b2++){
    //         let integrante=body.elementos[b].getIntegranteAt(b2);
    //         if(integrante.clientWidth<=0){
    //             //volvemos a hacer visible el objeto
    //             integrante.style.display="";
    //         }
    //     }
    //     return;
    // }
    //salto directo si la pantalla salio del rango en el que este grupo puede ser visto

}


for(let b=0;b<nulos.length;b++){
    let tech=getNoneExtension(b);
    //__ console.log("techo del elemento="+tech)
    addElement(b,tech);
}
body.elementos=elementos;

function NoneInvisible(){
    let nulos=document.getElementsByClassName("dis-None")
    for(let index=0;index<nulos.length;index++){
        nulos[index].style.display="none"
    }
}
NoneInvisible()
const body_onresize=document.body.onresize

body.evtsResize=[]
body.evtsResize.push(body.onresize)
body.evtsResize.push(adaptarVisibilidad)

body.onresize=function (){    
    for(let ev in document.body.evtsResize){
        document.body.evtsResize[ev]()
    }
}
adaptarVisibilidad();


// const resizeObserver = new ResizeObserver(entries => {
//     for (let entry of entries) {
//         console.log('Size changed:', entry.contentRect);
//         console.log('New width:', entry.contentRect.width);
//         console.log('New height:', entry.contentRect.height);
//     }
// });

// resizeObserver.observe(content);