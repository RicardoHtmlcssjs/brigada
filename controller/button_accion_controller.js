// -------------LOGIN-------------
// verificar si existe session ya creada por alguien que se logeo
// usuario.session();
// alert();
//boton logearse
$('#entrar').on("click", function(){
	if($("#usuario_log").val() === "" || $("#contrasena_log") === ""){
		$("#resp_login").html((accion.mensaje_alerta("danger", "Algun campo esta vacio", "view/images/icono_danger.png")));
	}else{
		let usu = $("#usuario_log").val();
		let contrasena = $("#contrasena_log").val();
		usuario.login_usuario(usu, contrasena);
		
	}
});
// cerrar session 
$("#opnb_cerrar_session").on("click", function(){
	usuario.logout();
});

// registrase
function registrase(){
	$("#exampleModal1").modal("show");
	$("#nombre").val("");
	$("#correo").val("@gmail.com");
	$("#telefono").val("");
	// $("#estado").val("");
	$("#direccion").val("");
	$("#tiktok_reg").val("");
	$("#facebook_reg").val("");
	$("#instagram_reg").val("");
	$("#hab_des").val("");
	$("#usuario").val("");
	$("#contrasena").val("");
	$("#pregunta").val("");
	$("#respuesta").val("");
	$("#cedula").val("");
	$("#estado").val("");
	$("#municipio").val("");
	$("#parroquia").val("");
	$("#error_soli_exp1").html("");
	$("#nombre").prop("disabled", true);
	$("#correo").prop("disabled", true);
	$("#telefono").prop("disabled", true);
	$("#estado").prop("disabled", true);
	$("#municipio").prop("disabled", true);
	$("#parroquia").prop("disabled", true);
	$("#direccion").prop("disabled", true);
	$("#tiktok_reg").prop("disabled", true);
	$("#facebook_reg").prop("disabled", true);
	$("#instagram_reg").prop("disabled", true);
	$("#niv_academico").prop("disabled", true);
	$("#hab_des").prop("disabled", true);
	$("#usuario").prop("disabled", true);
	$("#contrasena").prop("disabled", true);
	$("#pregunta").prop("disabled", true);
	$("#respuesta").prop("disabled", true);
	$("#cedula").prop("disabled", false);
	$("#sexo_reg").prop("disabled", true);
}
// pisar enter en el campo cedula de registrase
$(document).ready(function() {
	  $("#bs_ci_em").on("click", function(){
		let ci = $("#cedula").val();
		usuario.verificar_persona_ci(ci);
	  })
  });
// hacer click y elegir estado
$("#estado").on("click", function(){
	$("#municipio").prop("disabled", false);
	$id_estado = $("#estado").val();
	usuario.mostrar_municipio($id_estado);
});
// hacer click y elegir municipio
$("#municipio").on("click", function(){
	$("#parroquia").prop("disabled", false);
	$id_municipio = $("#municipio").val();
	usuario.mostrar_parroquia($id_municipio);
});
//   precionar boton registrase del formulario de registrase como un usuario
function registrarse(){
	if($("#cedula").val() === "" || $("#nombre").val() === "" || $("#correo").val() === "" || $("#telefono").val() === "" || $("#direccion").val() === "" || $("#contrasena").val() === "" || $("#usuario").val() === "" || $("#pregunta").val() === "" || $("#respuesta").val() === ""|| $("#estado").val() === "" || $("#municipio").val() === "" || $("#parroquia").val() === ""){
		$("#error_soli_exp1").html((accion.mensaje_alerta("danger", "Algun campo esta vacio", "view/images/icono_danger.png")));
	}else if($("#telefono").val().length != 11){
		$("#error_soli_exp1").html((accion.mensaje_alerta("danger", "El numero de telefono debe tener 12 caracteres", "view/images/icono_danger.png")));
	}else{
		if($("#contrasena").val().length >=3){
			let cedula = $("#cedula").val();
			let nombre = $("#nombre").val();
			let correo = $("#correo").val();
			let telefono = $("#telefono").val();
			let estado = $("#parroquia").val();
			let direccion = $("#direccion").val();
			let tiktok = $("#tiktok_reg").val();
			let facebook = $("#facebook_reg").val();
			let instagram = $("#instagram_reg").val();
			let niv_academico = $("#niv_academico").val();
			let hab_des = $("#hab_des").val();
			// alert(hab_des);
			let contrasena = $("#contrasena").val();
			let pregunta = $("#pregunta").val();
			let respuesta = $("#respuesta").val();
			let sexo = $("#sexo_reg").val();
			let rif = $("#rif").val();
			usuario.registrar_usuario(cedula, nombre, correo, telefono, estado, direccion, tiktok, facebook, instagram, niv_academico, hab_des, contrasena, pregunta, respuesta, sexo, rif);

		}else{
			$("#error_soli_exp1").html((accion.mensaje_alerta("danger", "El campo contraseña debe tener 3 o mas caracteres", "view/images/icono_danger.png")));
		}
	}
}
// descargar archivo pdf como personal normal 
$("#opn_des_pdf").on("click", function(){
	var pdfPath = 'view/pdf/1.pdf'; // Cambia esta ruta a la ubicación de tu archivo PDF
    window.open(pdfPath, '_blank');
})
// mostrar modal de perfil del usuario
$("#opnb_perfil_usu").on("click", function(){
	$("#error_soli_exp7").html("");
	$("#exampleModal7").modal("show");
	usuario.mostrar_editar_datos_usu();
});

// actualizar valores de mi perfil
$("#actualizar_dat_usu").on("click", function(){
			let nombre = $("#nombre_edi").val();
			let correo = $("#correo_edi").val();
			let telefono = $("#telefono_edi").val();
			let direccion = $("#direccion_edi").val();
			let contrasena = $("#contrasena_edi").val();
			let pregunta = $("#pregunta_edi").val();
			let respuesta = $("#respuesta_edi").val();
			let sexo = $("#sexo_edi").val();
			let tiktok = $("#tiktok_edi").val();
			let facebook = $("#facebook_edi").val();
			let instagram = $("#instagram_edi").val();
			if(nombre === ""){
				$("#error_soli_exp7").html((accion.mensaje_alerta("danger", "El campo nombre no puede estar vacio", "view/images/icono_danger.png")));
			}else if(correo === ""){
				$("#error_soli_exp7").html((accion.mensaje_alerta("danger", "El campo correo no puede estar vacio", "view/images/icono_danger.png")));
			}else if(telefono === ""){
				$("#error_soli_exp7").html((accion.mensaje_alerta("danger", "El campo telefono no puede estar vacio", "view/images/icono_danger.png")));
			}else if(direccion === ""){
				$("#error_soli_exp7").html((accion.mensaje_alerta("danger", "El campo direccion no puede estar vacio", "view/images/icono_danger.png")));
			}else if(pregunta === ""){
				$("#error_soli_exp7").html((accion.mensaje_alerta("danger", "El campo pregunta no puede estar vacio", "view/images/icono_danger.png")));
			}else{
				usuario.actualizar_datos_usu(nombre, correo, telefono, direccion, contrasena, pregunta, respuesta, sexo, tiktok, facebook, instagram);
			}
});
// hacer click en olvidaste tu contraseña
$("#olvi_contra").on("click", function(){
	$("#exampleModal8").modal("show");
	$("#error_soli_exp8").html("");
	$("#usu_rec_con").val("");
});
// // enviar formulario de recuperacion de contraseña al ingresar el usuario
$("#buscar_usu_olvi").on("click", function(){
	let usuario_olvi = $("#usuario_olvi").val();
	usuario.buscar_usu_olvi_contra("V"+usuario_olvi);
	// alert(usuario_olvi);
});
// RECUPERAR contraseña atravez de pregunta sec
$("#rec_pre_sec").on("click", function(){
	let usuario_rec = $("#usu_rec_con").val();
	usuario.usuario_bus_rec_contra(usuario_rec);
});
// Recuperar contraseña atravez de correo
$("#rec_env_cor").on("click", function(){
	let usuario_rec = $("#usu_rec_con").val();
	if(usuario_rec === ""){
		alert("El campo usuario esta vacio");
	}else{
		usuario.recuperar_contra_usu_correo(usuario_rec);
	}
	// usuario.usuario_bus_rec_contra(usuario_rec);
});
// responder pregunta secreta
function recuperar_contra_respu(){
	let respuesta_ingre = $("#respuesta_sec_rec").val();
	let respuesta_correcta = $("#respuesta_veri").val();
	$("#error_soli_exp9").html("");
	usuario.verificar_contra(respuesta_ingre, respuesta_correcta);
	// if(respuesta_ingre == respuesta_correcta){
	// 	$("#exampleModal9").modal("hide");
	// 	$("#exampleModal10").modal("show");
	// 	$("#respuesta_veri_f").val(respuesta_correcta);
	// }else{
	// 	$("#error_soli_exp9").html((accion.mensaje_alerta("danger", "La respuesta es incorrecta", "view/images/icono_danger.png")));
	// }
}
// ingresar contraseña a cambiar
function camb_contra_ini(){
	let respuesta_buena = $("#respuesta_veri_f").val();
	let contra_nueva = $("#contra_nueva").val();
	$("#error_soli_exp10").html("");
	if(contra_nueva === ""){
		$("#error_soli_exp10").html((accion.mensaje_alerta("danger", "Campo contraseña esta vacio", "view/images/icono_danger.png")));
	}else{
		usuario.cambiar_contra_nueva(contra_nueva, respuesta_buena);
	}
}
// subir archivo como usuario normal
function subir_archi_usu(){
	$("#exampleModal11").modal("show");
}
// mostrar archivo en otra pestaña com oadministrador
function abrir_arch(ruta){
	// window.open("https://".ruta, "_blank");
	// Obtén la URL del enlace
    var url = $(ruta).attr('href');

    // Abre una nueva ventana/pestaña con la URL
    window.open(url, '_blank');

}
// mostrar graficos 1 de las empresas por  nacionalidad en un modal
function mostar_grafico(){
	usuario.datos_grafico1_nac();
} 
// mostrar grafico 2 empresas por estado
function mostar_grafico2_por_estado(){
	$("#exampleModal13").modal("show");
	$("#cargando1").html("Cargando");
	usuario.datos_grafico2_estado();
}
function mostar_grafico3_por_sexo(){
	$("#exampleModal14").modal("show");
	$("#cargando2").html("Cargando");
	usuario.datos_grafico3_sexo();
}
// mostrar grafico de 3ra pregunta de la encuesta
function mostar_grafico_parro(){
// alert();
	$("#exampleModal18").modal("show");
	usuario.mostrar_estados_par_mun();
}
// hacer click en el estado del grafico aparecera municipio
$("#estado_p").on("click", function(){
	$("#municipio_p").prop("disabled", false);
	$id_estado = $("#estado_p").val();
	usuario.mostrar_municipio($id_estado);
});
// hacer click y elegir municipio grafico por municipio 
$("#municipio_p").on("click", function(){
	$("#parroquia_p").prop("disabled", false);
	$id_municipio = $("#municipio_p").val();
	usuario.mostrar_parroquia($id_municipio);
	$("#ver_grafico_p").prop("disabled", false);
});
$("#ver_grafico_p").on("click", function(){
	let parroquia = $("#parroquia_p").val();
	usuario.ver_graf_por_parro(parroquia);
	// alert($("#estado_p").val() + " - " + $("#municipio_p").val() + " - " + $("#parroquia_p").val());
});
// verificar cuales propuestas ecosocialistas a seleccionado
let respuesta1 = 0;
let respuesta2 = 0;
let respuesta3 = 0;
let respuesta4 = 0;
let tot_res = 0;
function fun_preg_1(num_pregunta){
	console.log("onchange");
	if(tot_res <= 4){
		if(num_pregunta == 1){
			if($("#pregunta1").val() == 1 || $("#pregunta1").val() == 2){
				if(respuesta1 == 0){
					respuesta1 = $("#pregunta1").val();
					tot_res = tot_res + 1;
				}
			}else if($("#pregunta1").val() === "" && respuesta1 > 0){
				respuesta1 = 0;
				tot_res = tot_res - 1;
			}
		}else if(num_pregunta == 2){
			if($("#pregunta2").val() == 1 || $("#pregunta2").val() == 2){
				if(respuesta2 == 0){
					respuesta2 = $("#pregunta2").val();
					tot_res = tot_res + 1;
				}
			}else if($("#pregunta2").val() === "" && respuesta2 > 0){
				respuesta2 = 0;
				tot_res = tot_res - 1;
			}
		}else if(num_pregunta == 3){
			// alert(3);
			// if($("#multi_option").val() == 1 || $("#multi_option").val() == 2 || $("#multi_option").val() == 3 || $("#multi_option").val() == 4){
			// 	if(respuesta3 == 0){
			// 		respuesta3 = $("#multi_option").val();
			// 		tot_res = tot_res + 1;
			// 	}
			// }else if($("#multi_option").val() === "" && respuesta3 > 0){
			// 	respuesta3 = 0;
			// 	tot_res = tot_res - 1;
			// }
		}else if(num_pregunta == 4){
			if($("#pregunta4").val() == 1 || $("#pregunta4").val() == 2){
				if(respuesta4 == 0){
					respuesta4 = $("#pregunta4").val();
					tot_res = tot_res + 1;
				}
			}else if($("#pregunta4").val() === "" && respuesta4 > 0){
				respuesta4 = 0;
				tot_res = tot_res - 1;
			}
		}
		// if($("#pregunta1").val() >= 1 && $("#pregunta2").val() >= 1 && $("#pregunta3").val() >= 1){
		// 	$("#pregunta4").prop('disabled', true);
		// }else if($("#pregunta1").val() >= 1 && $("#pregunta2").val() >= 1 && $("#pregunta4").val() >= 1){
		// 	$("#pregunta3").prop('disabled', true);
		// }else if($("#pregunta1").val() >= 1 && $("#pregunta3").val() >= 1 && $("#pregunta4").val() >= 1){
		// 	$("#pregunta2").prop('disabled', true);
		// }else if($("#pregunta2").val() >= 1 && $("#pregunta3").val() >= 1 && $("#pregunta4").val() >= 1){
		// 	$("#pregunta1").prop('disabled', true);
		// }
		if(tot_res == 3 ){
			let selectElement = document.getElementById('multi_option');
			let valorSeleccionado1 = selectElement.value;
			let str_valorSeleccionado1 = valorSeleccionado1.toString()
			// Separamos la cadena por comas y obtenemos un array
			let numeros = str_valorSeleccionado1.split(',');
			// console.log(numeros);
			let cant_pre = 0;
			// Iteramos sobre el array de números
			numeros.forEach((numero, indice) => {
				cant_pre = cant_pre + 1;
				// console.log("dentro ciclo");
			    // Convertimos el número a un número entero (opcional)
			    const numeroEntero = parseInt(numero);

			    // Creamos una variable dinámica para cada número (opcional)
			    let variableDinamica = `numero${indice + 1}`;
			    console.log(variableDinamica, ":", numeroEntero);

			    // Puedes realizar otras operaciones con cada número aquí
			    // Por ejemplo, almacenarlos en un objeto:
			    // unObjeto[variableDinamica] = numeroEntero;
			});
			if(cant_pre != 3){
				console.log("acuerdate escoger 3");
				// alert("acuerdate de escoger 3");
				$("#enviar_res_pre").prop('disabled', true);
			}else{
				console.log("todo fino");
				$("#enviar_res_pre").prop('disabled', false);
				$("#error_soli_form1").html((accion.mensaje_alerta("success", "Ya puedes enviar la encuesta", "view/images/icono_bien.png")));
				// alert("todo fino");
			}
			// Agregar un event listener para el evento 'change'
			selectElement.addEventListener('change', function() {
				// Obtener el valor seleccionado
				let valorSeleccionado = selectElement.value;
				// alert(valorSeleccionado);
				let valorSeleccionadoUlt = valorSeleccionado.length - 1;
				const ultimaLetra = valorSeleccionado[valorSeleccionadoUlt];

				if(ultimaLetra != 3){
				    console.log("debes seleccionar 3 opciones");
				    $("#enviar_res_pre").prop('disabled', true);
				    $("#error_soli_form1").html((accion.mensaje_alerta("danger", "En la 3ra pregunta debes escoger 3 opciones", "view/images/icono_danger.png")));
				    // 
				}else{
					console.log("fino 3");
					$("#enviar_res_pre").prop('disabled', false);
					$("#error_soli_form1").html((accion.mensaje_alerta("success", "Ya puedes enviar la encuesta", "view/images/icono_bien.png")));
				}
			});
			// $("#enviar_res_pre").prop('disabled', false);
		}else{
			$("#enviar_res_pre").prop('disabled', true);
		}
	}
	// if(tot_res <= 2){
	// 	$("#pregunta1").prop('disabled', false);
	// 	$("#pregunta2").prop('disabled', false);
	// 	$("#pregunta3").prop('disabled', false);
	// 	$("#pregunta4").prop('disabled', false);
	// }
	if($("#pregunta4").val() == 1){
		$("#pregunta4_2").removeAttr("readonly");
	}else{
		$('#pregunta4_2').attr('readonly', 'readonly');
	}
}
// 



// presionar boton de enviar formulario preguntas
function env_for_res(){
	let pregunta1 = $("#pregunta1").val();
	let pregunta2 = $("#pregunta2").val();
	let pregunta3 = $("#multi_option").val();
	let pregunta4 = $("#pregunta4").val();
	let res4_2 = $("#pregunta4_2").val();
	// console.log(pregunta3);
	// alert(res4_2);
	usuario.env_rec_res_pre(pregunta1, pregunta2, pregunta3, pregunta4, res4_2);
}
// descargar data por estado como administrador
$("#opc_admin2").on("click", function(){
	$("#exampleModal15").modal("show");
	$("#estado_data_d").html("");
	usuario.mostrar_estados_par_mun2();
});
// ir a descargar archivo excel data por estado
function descargar_data1_est(){
	let estado = $("#estado_data_d").val();
	usuario.descargar_data1_est(estado);
	// 
}
// mostrar modal de grafico por estados con fecha en espesifica
function mostar_grafico2_1_por_estado(){
	$("#exampleModal17").modal("show");
	$("#cargando4").html("");
	// usuario.desde_hasta_grafico2();
}
// 
function buscar_est_grafico(){
	let desde = $("#desde_estado").val();
	let hasta = $("#hasta_estado").val();
	if(desde == "" || hasta == ""){
		var notification = alertify.notify('Las fechas no pueden estar en blanco', 'success', 5, function(){  console.log('dismissed'); });
	}else{
		$("#cargando4").html("Cargando");
		$("#myChart4").html("");
		usuario.desde_hasta_grafico2(desde, hasta);
	}
}
