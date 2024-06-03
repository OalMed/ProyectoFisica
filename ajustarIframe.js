function redimenzionar(iframe) {
    if(iframe.contenido.clientHeight==iframe.height){
        return
    }
    iframe.height=iframe.contenido.clientHeight
}

window.onload=function getIframe(){

    window.iframe=document.querySelectorAll('.iframeAdjust')
    for(let index=0;index<window.iframe.length;index++){
        console.log(index);
        let targ=window.iframe[index].contentDocument.querySelector('#iframeTarget')
        console.log(targ);
        window.iframe[index].contenido=targ
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            // console.log('New height:', entry.contentRect.height);
            // console.log(entry.target);
            for(let index=0;index<window.iframe.length;index++){
                redimenzionar(window.iframe[index])
            }
        }
    });

    resizeObserver.observe(document.getElementsByTagName('body')[0]);
    // document.getElementsByTagName('body')[0].onresize=function RefrecarIframe(){
    // }
}