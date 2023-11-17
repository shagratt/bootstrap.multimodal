//Ajusta el z-index del backdrop de los modales/offcanvas un nivel detras del elemento
function fixBackdrop(id) {
    let o=document.getElementById(id);
    let zIndexActual=window.getComputedStyle(o).getPropertyValue("z-index");
    let Backdrops=document.getElementsByClassName('modal-backdrop');
    for (let i=0;i<Backdrops.length;i++) {
      let e=Backdrops[i];
      if (!e.id) {e.id='Backdrop_'+id;e.style.zIndex=zIndexActual-1;return;}
    }
    e=document.getElementById('Backdrop_'+id);
    if (e){e.style.zIndex = zIndexActual-1;}
}
//Acomoda los modales para que siempre quede por encima el solicitado
function fixModal(id) {
    let elements=document.querySelectorAll('.modal, .offcanvas');
    let targetEl=document.getElementById(id);
    //Ordena los elementos por su posición en el DOM
    elements=Array.from(elements).sort(function(a, b) {
      return a.compareDocumentPosition(b)===Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;
    });
    //Muevo id al principio del array
    let idindex=elements.indexOf(targetEl);
    if (idindex!==-1) {elements.splice(idindex,1);elements.unshift(targetEl);}
    var zIndex=1200;
    for (var i=0; i < elements.length; i++) {
        elements[i].style.zIndex=zIndex;
        fixBackdrop(elements[i].id);zIndex-=2;
    };
    //Necesito esperar q abra para que bootstrap lo cree
    setTimeout(function(){fixBackdrop(id);},1);
}
$(document).ready(function() {
    $(document).on('show.bs.modal show.bs.offcanvas','.modal, .offcanvas',function(e){fixModal(e.currentTarget.id);});
}
