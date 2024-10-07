document.addEventListener("DOMContentLoaded", () =>{
    let form = document.getElementById('archi');
    form.addEventListener("submit", function(event){
        event.preventDefault();
        $("#archivo").html("");
        $("#barra_span").html("");
        subir_archivo(this);
    });
});

function subir_archivo(form){
    let barra_estado = form.children[1].children[0];
    let span = barra_estado.children[0];
    // let boton_cancelar = form.children[2].children[1];

    barra_estado.classList.remove('barra_verde', 'barra_roja');

    // peticion
    let peticion = new XMLHttpRequest();
    // progreso
    peticion.upload.addEventListener("progress", (event)=>{
        let porcentaje = Math.round((event.loaded / event.total) * 100);

        console.log(porcentaje);
        barra_estado.style.width = porcentaje+'%';
        span.innerHTML = porcentaje+'%';
    });

    //finalizacion
    peticion.addEventListener("load", () => {
        barra_estado.classList.add('barra_verde');
        span.innerHTML = "Porcentaje Completado";
    });

    // enviar datos
    peticion.open('post', 'subir.php');
    peticion.send(new FormData(form));
    // alert("Archivo subido exitosamente");
    $("#exampleModal11").modal("hide");
    var notification = alertify.notify('Archivo subido exitosamente', 'success', 5, function(){  console.log('dismissed'); });
    // location.reload();
    usuario.btn_pdf_empresa();
    
					
    // alert(peticion);
    //cancelar
    // boton_cancelar.addEventListener("click", () => {
    //     peticion.abort();
    //     barra_estado.classList.remove('barra_verde');
    //     barra_estado.classList.add('barra_roja');
    //     span.innerHTML = "Cancelado";
    // });
}