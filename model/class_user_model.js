class Usuarios{
	// session de usuario al iniciar
	session(){
		$.ajax({
			url: "model/ajax/ajax_session.php",
			type: "POST",
			success: function(result){
				// alert(result);
				if(result == "existe_session_normal"){
					$("#exampleModal16").modal("show");
					$("#cuerpo").removeClass("fondo_cuerpo");
					$("#cont_btn_nav").removeClass("d-none");
					$("#cont_btn_nav").removeClass("d-none");
					$("#opnb_perfil_usu").removeClass("d-none");
					$("#opn_des_pdf").removeClass("d-none");
					$("#opnb_cerrar_session").removeClass("d-none");
					$("#cuerpo").html(formulario_preguntas());
					VirtualSelect.init({ 
					      ele: '#multi_option' 
					    });
					$("#navbar-le").removeClass("dsp_no");
					$("#opc_admin").addClass("dsp_no");
					$("#opnb_pro_eco").addClass("opnb");
					$("#opc_admin").css("display","none");
					$("#opc_admin2").css("display","none");
					$("#cuerpo").addClass("align-items", "flex-start");
					
				}else if(result == "existe_session_normal_res_pregunta"){
					$("#cuerpo").removeClass("fondo_cuerpo");
					$("#cont_btn_nav").removeClass("d-none");
					$("#cont_btn_nav").removeClass("d-none");
					$("#opnb_perfil_usu").removeClass("d-none");
					$("#opn_des_pdf").removeClass("d-none");
					$("#opnb_cerrar_session").removeClass("d-none");
					$("#cuerpo").html(formulario_preguntas_listas_ver());
					$("#navbar-le").removeClass("dsp_no");
					$("#opc_admin").addClass("dsp_no");
					$("#opnb_pro_eco").addClass("opnb");
					$("#opc_admin").css("display","none");
					$("#opc_admin2").css("display","none");
					$("#cuerpo").addClass("align-items", "flex-start");
					$("#cuerpo").addClass("cuerpo_quitar");
					$("#cont_form_log_padre").addClass("cont_form_log_padre_quitar");
					// 
					usuario.respuesta_lita_preguntas();
				}else if(result == "existe_session_admin"){
					$("#cuerpo").html(``);
					$("#cuerpo").removeClass("fondo_cuerpo");
					$("#cuerpo").removeClass("d-flex");
					$("#cont_btn_nav").removeClass("d-none");
					$("#opnb_cerrar_session").removeClass("d-none");
					$("#opc_admin2").removeClass("d-none");
					$("#navbar-le").removeClass("dsp_no");
					$("#opc_admin").removeClass("dsp_no");
					$("#opc_admin2").css("display","block");
					$("#opnb_perfil_usu").css("display","none");
					$("#opn_des_pdf").css("display", "none");
					$("#opnb_pro_eco").css("display","none");
					$("#cuerpo").addClass("align-items", "flex-start");
					usuario.mostrar_como_admin_empresas();
				}

			},
			error: function(error){
				console.log(error);
			}

		});
	}
	logout(){
		$.ajax({
			url: "model/ajax/logout_session.php",
			type: "POST",
			success: function(result){
				if(result == 1){
					window.location ="index.php";
				}
			},
			error: function(error){
				console.log(error);
			}

		});
	}
	// verificar  que la persona exista por la cedula
	verificar_persona_ci(ci){
		$.ajax({
			url: "model/ajax/verificar_persona_ci_ajax.php",
			type: "POST",
			data: {
				ci
			},
			success: function(result){
				if(result >= 1){
					var notification = alertify.notify('El usuario ya existe', 'success', 6, function(){  console.log('dismissed'); });
					$("#cedula").val("");
				}else{
					usuario.buscar_persona_ci(ci);
					usuario.mostrar_estados_par_mun();
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// buscar por cedula a una persona al pisar en enter
	buscar_persona_ci(ci){
		$.ajax({
			url: "model/ajax/buscar_cedula_ajax.php",
			type: "POST",
			data: {
				ci
			},
			success: function(result){
				if(result === ""){
					$("#error_soli_exp1").html((accion.mensaje_alerta("danger", "La cedula Ingresada no existe", "view/images/icono_danger.png")));
				}else{
					$("#nombre").val(result);
					$("#usuario").val(ci);
					$("#error_soli_exp1").html("");
					$("#nombre").prop("disabled", false);
					$("#correo").prop("disabled", false);
					$("#telefono").prop("disabled", false);
					$("#estado").prop("disabled", false);
					$("#direccion").prop("disabled", false);
					$("#tiktok_reg").prop("disabled", false);
					$("#facebook_reg").prop("disabled", false);
					$("#instagram_reg").prop("disabled", false);
					$("#hab_des").prop("disabled", false);
					$("#niv_academico").prop("disabled", false);
					$("#direccion").prop("disabled", false);
					$("#usuario").prop("disabled", true);
					$("#contrasena").prop("disabled", false);
					$("#pregunta").prop("disabled", false);
					$("#respuesta").prop("disabled", false);
					$("#sexo_reg").prop("disabled", false);
					// $("#cedula").prop("disabled", true);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar el estado, por parroquia y mmunicipio
	mostrar_estados_par_mun(){
		$.ajax({
			url: "model/ajax/mostrar_estados_par_mun_ajax.php",
			type: "POST",
			success: function(result){
				$("#estado").html("");
				$("#estado_p").html("");
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#estado").append("<option value='"+ element.idestado +"'>" + element.estado + "</option>");
					$("#estado_p").append("<option value='"+ element.idestado +"'>" + element.estado + "</option>");
				});
				// $("#estado").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar municipio al elegir un estado registrarse
	mostrar_municipio(id_estado){
		$.ajax({
			url: "model/ajax/mostrar_municipio_ajax.php",
			type: "POST",
			data: {
				id_estado
			},
			success: function(result){
				// alert(result);
				$("#municipio").html("");
				$("#municipio_p").html("");
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#municipio").append("<option value='"+ element.idmunicipio +"'>" + element.municipio + "</option>");
					$("#municipio_p").append("<option value='"+ element.idmunicipio +"'>" + element.municipio + "</option>");
				});
				// $("#estado").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar parroquia al elegir un municipio registrarse
	mostrar_parroquia(id_municipio){
		$.ajax({
			url: "model/ajax/mostrar_parroquia_ajax.php",
			type: "POST",
			data: {
				id_municipio
			},
			success: function(result){
				// alert(result);
				$("#parroquia").html("");
				$("#parroquia_p").html("");
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#parroquia").append("<option value='"+ element.idparroquia +"'>" + element.parroquia + "</option>");
					$("#parroquia_p").append("<option value='"+ element.idparroquia +"'>" + element.parroquia + "</option>");
				});
				// $("#estado").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mandar valores de formulario de registrase
	registrar_usuario(cedula, nombre, correo, telefono, estado, direccion,tiktok, facebook, instagram, niv_academico, hab_des, contrasena, pregunta, respuesta, sexo, rif){
		$.ajax({
			url: "model/ajax/registrar_usuario_ajax.php",
			type: "POST",
			data: {
				cedula, nombre, correo, telefono, estado, direccion, tiktok, facebook, instagram, niv_academico, hab_des, contrasena, pregunta, respuesta, sexo, rif
			},
			success: function(result){
				if(result == 0){
					$("#error_soli_exp1").html((accion.mensaje_alerta("danger", "Ha ocurrido un error", "view/images/icono_danger.png")));
				}else{
					var notification = alertify.notify('Usuario creado exitosamente', 'success', 6, function(){  console.log('dismissed'); });
					$("#exampleModal1").modal("hide");
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	
	login_usuario(usu, contrasena){ 
		$.ajax({
			url: "model/ajax/login_usuario_ajax.php",
			type: "POST",
			data: {
				usu, contrasena
			},
			success: function(result){
				if(result == "1_normal_existe" || result == "1_normal_existe_pregunta_lista"){
					if(result == "1_normal_existe"){
						$("#cuerpo").removeClass("fondo_cuerpo");
						$("#cuerpo").removeClass("d-flex");
						$("#opnb_cerrar_session").removeClass("d-none");
						$("#cont_btn_nav").removeClass("d-none");
						$("#opnb_perfil_usu").removeClass("d-none");
						$("#opn_des_pdf").removeClass("d-none");
						$("#cuerpo").html(formulario_preguntas());
						VirtualSelect.init({ 
					      ele: '#multi_option' 
					    });

					    const selectElement = document.getElementById('multi_option');
					    // Agregar un event listener para el evento 'change'
					        selectElement.addEventListener('change', function() {
					            // Obtener el valor seleccionado
					            const valorSeleccionado = selectElement.value;
					            // alert(valorSeleccionado);
					            let valorSeleccionadoUlt = valorSeleccionado.length - 1;
					            const ultimaLetra = valorSeleccionado[valorSeleccionadoUlt];
					          });
						$("#exampleModal16").modal("show");
					}else{
						$("#cuerpo").html(formulario_preguntas_listas_ver());
						$("#cuerpo").removeClass("fondo_cuerpo");
						$("#cuerpo").removeClass("d-flex");
						$("#opnb_cerrar_session").removeClass("d-none");
						$("#navbar-le").removeClass("dsp_no");
						$("#opc_admin").addClass("dsp_no");
						$("#opnb_pro_eco").addClass("opnb");
						$("#opc_admin").css("display","none");
						// $("#cuerpo").addClass("align-items", "flex-start");
						$("#cont_btn_nav").removeClass("d-none");
						$("#opnb_perfil_usu").removeClass("d-none");
						$("#opn_des_pdf").removeClass("d-none");
						usuario.respuesta_lita_preguntas();						
					}					
					$("#navbar-le").removeClass("dsp_no");
					$("#opc_admin").addClass("dsp_no");
					$("#opnb_pro_eco").addClass("opnb");
					$("#opc_admin").css("display","none");
					$("#opc_admin2").css("display","none");
					// $("#cuerpo").addClass("align-items", "flex-start");

				}else if(result == "1_admin_existe"){

					$("#cuerpo").html(``);
					$("#cuerpo").removeClass("fondo_cuerpo");
					$("#cuerpo").removeClass("d-flex");
					$("#cont_btn_nav").removeClass("d-none");
					$("#opnb_cerrar_session").removeClass("d-none");
					$("#opc_admin2").removeClass("d-none");
					$("#navbar-le").removeClass("dsp_no");
					$("#opc_admin").removeClass("dsp_no");
					$("#opc_admin2").css("display","block");
					$("#opnb_perfil_usu").css("display","none");
					$("#opn_des_pdf").css("display", "none");
					$("#opnb_pro_eco").css("display","none");
					$("#cuerpo").addClass("align-items", "flex-start");
					usuario.mostrar_como_admin_empresas();
				}else{
					$("#resp_login").html((accion.mensaje_alerta("danger", "El usuario o la contraseña son incorectos", "view/images/icono_danger.png")));
				}
			},
			error: function(error){
				console.log(error);
			}

		});
	};
	// mostrar las respuestas ya hechas respuestas
	respuesta_lita_preguntas(){ 
		$.ajax({
			url: "model/ajax/respuesta_lita_preguntas_ajax.php",
			type: "POST",
			success: function(result){
				// alert(result);
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					let res1 = "Sencibilación casa a casa";
					let res2 = "Cine ambiental Comunitario";
					let res3 = "Saneamiento ambiental y embellecimiento";
					let res4 = "Recuperación de espacios culturales y/o deportivos";
					let res5 = "Viveros comunitarios";
					
					//----------------------------------------- 
					if(element.respuesta3_1 == 1){
						$("#res3_1l").val(res1);
					}
					if(element.respuesta3_1 == 0 && element.respuesta3_2 == 1){
						$("#res3_1l").val(res2);
					}
					if(element.respuesta3_1 == 0 && element.respuesta3_2 == 0 && element.respuesta3_3 == 1){
						$("#res3_1l").val(res3);
					}
					if(element.respuesta3_1 == 0 && element.respuesta3_2 == 1 && element.respuesta3_3 == 1){
						$("#res3_1l").val(res2);
						$("#res3_2l").val(res3);
					}
					if(element.respuesta3_1 == 1 && element.respuesta3_2 == 1 ){
						$("#res3_2l").val(res2);
					}
					if(element.respuesta3_1 == 1 && element.respuesta3_2 == 0  && element.respuesta3_3 == 1){
						$("#res3_2l").val(res3);
					}
					if(element.respuesta3_1 == 1 && element.respuesta3_2 == 1  && element.respuesta3_3 == 1){
						$("#res3_3l").val(res3);
					}
					if((element.respuesta3_1 == 1 && element.respuesta3_2 == 0  && element.respuesta3_3 == 0 && element.respuesta3_4 == 1 && element.respuesta3_5 == 1) || (element.respuesta3_1 == 0 && element.respuesta3_2 == 2  && element.respuesta3_3 == 0 && element.respuesta3_4 == 1 && element.respuesta3_5 == 1) || (element.respuesta3_1 == 0 && element.respuesta3_2 == 0  && element.respuesta3_3 == 1 && element.respuesta3_4 == 1 && element.respuesta3_5 == 1)){
						$("#res3_2l").val(res4);
						$("#res3_3l").val(res5);
					}
					if((element.respuesta3_1 == 1 && element.respuesta3_2 == 1  && element.respuesta3_3 == 0 && element.respuesta3_4 == 1) || (element.respuesta3_1 == 0 && element.respuesta3_2 == 1  && element.respuesta3_3 == 1 && element.respuesta3_4 == 1)){
						$("#res3_3l").val(res4);
					}

					$("#res1_l").val(element.respuesta1);
					$("#res2_l").val(element.respuesta2);
					$("#res4_l").val(element.respuesta4);
				});
				// alert(result);
			},
			error: function(error){
				console.log(error);
			}

		});
	};
	// mostrar boton de empresa si subio pdf de propuesta
	btn_pdf_empresa(){ 
		$.ajax({
			url: "model/ajax/btn_pdf_empresa_ajax.php",
			type: "POST",
			success: function(result){
				if(result === ""){
					$("#d_btn_pdf").html("");
				}else{
					$("#d_btn_pdf").html("<a href='"+ result +"' target='_blank'><input type='button' class='btn btn-primary btn-ml my-3' id='btn_mi_pdf' name='btn_mi_pdf' onClick='' value='Ver mi PDF'></input></a>");
					
				}
			},
			error: function(error){
				console.log(error);
			}

		});
	};
	// enviar comentario como personal normal
	enviar_comentario(){
		let comentario = $("#comentario").val();
		$.ajax({
			url: "model/ajax/enviar_comentario_ajax.php",
			type: "POST",
			data: {
				comentario
			},
			success: function(result){
				if(result == 1){
					var notification = alertify.notify('Comentario enviado', 'success', 5, function(){  console.log('dismissed'); });
				}else{
					alert("ha ocurrido un error");
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar datos del usuario en modal 
	mostrar_editar_datos_usu(){
		$.ajax({
			url: "model/ajax/mostrar_editar_datos_usu_ajax.php",
			type: "POST",
			success: function(result){
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#nombre_edi").val(element.nombre);
					$("#correo_edi").val(element.correo);
					$("#telefono_edi").val(element.telefono);
					$("#direccion_edi").val(element.direccion);
					$("#usuario_edi").val(element.login);
					$("#pregunta_edi").val(element.pregunta);
					$("#tiktok_edi").val(element.tiktok);
					$("#facebook_edi").val(element.facebook);
					$("#instagram_edi").val(element.instagram);
					$("#estado_edi").val(element.estado);
					if(element.sexo == "M"){
						$("#sexo_edi").html("");
						$("#sexo_edi").append("<option value='M'>M</option>");
						$("#sexo_edi").append("<option value='F'>F</option>");
					}else if(element.sexo == "F"){
						$("#sexo_edi").html("");
						$("#sexo_edi").append("<option value='F'>F</option>");
						$("#sexo_edi").append("<option value='M'>M</option>");
					}else{
						$("#sexo_edi").html("");
						$("#sexo_edi").append("<option value='M'>M</option>");
						$("#sexo_edi").append("<option value='F'>F</option>");
					}
					// $("#estado").append("<option value='"+ element.id_parroquia +"'>" + element.estado + "</option>");
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// enviar y actualizar datos del formulario de mi perfil como persona normal
	actualizar_datos_usu(nombre, correo, telefono, direccion, contrasena, pregunta, respuesta, sexo, tiktok, facebook, instagram){
		$.ajax({
			url: "model/ajax/actualizar_datos_usu_ajax.php",
			type: "POST",
			data:{
				nombre, correo, telefono, direccion, contrasena, pregunta, respuesta, sexo, tiktok, facebook, instagram
			},
			success: function(result){
				if(result == "actualizancion_sin" || result == "actualizancion_todo"){
					$("#exampleModal7").modal("hide");
					var notification = alertify.notify('Se actualizaron los datos exitosamente', 'success', 5, function(){  console.log('dismissed'); });
				}else{
					alert("Ha ocurrido un error");
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// buscar usuario que olvido su contraseña
	buscar_usu_olvi_contra(usuario_olvi){
		$.ajax({
			url: "model/ajax/buscar_usu_olvi_contra_ajax.php",
			type: "POST",
			data: {
				usuario_olvi
			},
			success: function(result){
				if(result == "encontrado"){
					alert("encontrado");
				}else{
					alert("El usuario no existe");
				} 
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar pregunta de recuperacion
	mostrar_pregunta_recu(usuario_olvi){
		$.ajax({
			url: "model/ajax/mostrar_pregunta_recu_ajax.php",
			type: "POST",
			data: {
				usuario_olvi
			},
			success: function(result){
				alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// tabla de mostrar personal como administrador
	mostrar_como_admin_empresas(){
		$("#cuerpo").html(tabla_personal());
		$('#datatable_empresas').DataTable({
		 	// "scrollY": "100vh",
    		"scrollCollapse": true,
			"ajax":{
				"url": "model/ajax/mostrar_como_admin_empresas_ajax.php",
				"type": "POST",
				"dataSrc":""
			},
			"columns":[
				{"data": "rif"},
				{"data": "razon_social"},
				{"data": "direccion"},
				{"data": "correo"},
				{"data": "telefono_empresa"},
				{"data": "tiktok"},
				{"data": "facebook"},
				{"data": "instagram"},
				{"data": "nivel_academico"},
				{"data": "habilidad_destreza"},
			],
			ordering: true,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	}
	// buscar usuario a recuperar contrasena
	usuario_bus_rec_contra(usuario_rec){
		$.ajax({
			url: "model/ajax/usuario_bus_rec_contra_ajax.php",
			type: "POST",
			data: {
				usuario_rec
			},
			success: function(result){
				// alert(result);
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					if(element.pregunta === ""){
						$("#error_soli_exp8").html((accion.mensaje_alerta("danger", "El usuario no existe", "view/images/icono_danger.png")));
					}else{
						
						$("#exampleModal8").modal("hide");
						$("#exampleModal9").modal("show");
					// 	$("#pregunta_rec_res").val(result);
						$("#respuesta_sec_rec").val("");
					// $("#respuesta_veri").val("");
					
						$("#pregunta_rec_res").val(element.pregunta);
						$("#respuesta_veri").val(element.respuesta);
					}
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar pregunta  secreta para recuperar contra
	res_pregunta_sec_contra(res_sec_contra, pre_sec_contra){
		$.ajax({
			url: "model/ajax/res_pregunta_sec_contra_ajax.php",
			type: "POST",
			data: {
				res_sec_contra, pre_sec_contra
			},
			success: function(result){
				alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// ingresar contraseña nueva
	cambiar_contra_nueva(contra_nueva, respuesta_buena){
		$.ajax({
			url: "model/ajax/cambiar_contra_nueva_ajax.php",
			type: "POST",
			data: {
				contra_nueva, respuesta_buena
			},
			success: function(result){
				alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// datos del grafico de las empresas por nacionalidad
	datos_grafico1_nac(){
		$.ajax({
			url: "model/ajax/datos_grafico1_nac_ajax.php",
			type: "POST",
			success: function(result){
				$("#exampleModal12").modal("show");
				let r = JSON.parse(result);
				let ven = 0;
				let ext = 0;
				let jur = 0;
				$.each(r, function(index, element){
					// Datos para el gráfico
					ven = element.vene;
					ext = element.extra;
					jur = element.juri;
				});
				let t_ven = `V: ${ven}`;
				let t_ext = `E: ${ext}`;
				let t_jur = `J: ${jur}`;
				var ctx = document.getElementById('myChart').getContext('2d');
					var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: [t_ven, t_ext, t_jur],
						datasets: [{
						label: 'Datos',
						data: [ven, ext, jur],
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(94, 202, 135)'
						],
						hoverOffset: 2
						}]
					}
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// grafico 2  empresas por estado
	datos_grafico2_estado(){
		$.ajax({
			url: "model/ajax/datos_grafico2_estado_ajax.php",
			type: "POST",
			success: function(result){
				// alert(result);
				// $("#exampleModal13").modal("show");
				$("#cargando4").html("");
				let r = JSON.parse(result);
				
				$.each(r, function(index, element){
					// Datos para el gráfico
					let c_amazonas = `Amazonas: ${element.amazonas }`;
					let c_anzoategui = `Anzoategui: ${element.anzoategui }`;
					let c_apure = `Apure: ${element.apure }`;
					let c_aragua = `Aragua: ${element.aragua }`;
					let c_barinas = `Barinas: ${element.barinas }`;
					let c_bolivar = `Bolivar: ${element.bolivar }`;
					let c_carabobo = `Carabobo: ${element.carabobo }`;
					let c_cojedes = `Cojedes: ${element.cojedes }`;
					let c_delta_amacuro = `Delta amacuro: ${element.delta_amacuro }`;
					let c_distrito_capital = `Distrito Capital: ${element.distrito_capital }`;
					let c_falcon = `Falcon: ${element.falcon }`;
					let c_guariaco = `Guariaco: ${element.guariaco }`;
					let c_la_guaira = `La guaira: ${element.la_guaira }`;
					let c_insular_francisco_de_miranda = `insular francisco de miranda: ${element.insular_francisco_de_miranda }`;
					let c_lara = `Lara: ${element.lara }`;
					let c_merida = `Merida: ${element.merida }`;
					let c_miranda = `Miranda: ${element.miranda }`;
					let c_monagas = `Monagas: ${element.monagas }`;
					let c_nueva_esparta = `Nueva Esparta Capital: ${element.distrito_capital }`;
					let c_portuguesa = `Portuguesa: ${element.portuguesa }`;
					let c_sucre = `Sucre: ${element.sucre }`;
					let c_tachira = `Tachira: ${element.la_guaira }`;
					let c_trujillo = `insular francisco de miranda: ${element.trujillo }`;
					let c_yaracuy = `Yaracuy: ${element.lara }`;
					let c_zulia = `Zulia: ${element.merida }`;
					// let t_ext = `E: ${ext}`;
					var ctx = document.getElementById('myChart2').getContext('2d');
					var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: [c_amazonas, c_anzoategui, c_apure, c_aragua, c_barinas, c_bolivar, c_carabobo, c_cojedes, c_delta_amacuro, c_distrito_capital, c_falcon, c_guariaco, c_la_guaira, c_insular_francisco_de_miranda, c_lara, c_merida, c_miranda, c_monagas, c_nueva_esparta, c_portuguesa, c_sucre, c_tachira, c_trujillo, c_yaracuy, c_zulia],
						datasets: [{
						label: 'Datos',
						data: [element.amazonas, element.anzoategui, element.apure, element.aragua, element.barinas, element.bolivar, element.carabobo, element.cojedes, element.delta_amacuro, element.distrito_capital, element.falcon, element.guariaco, element.la_guaira, element.insular_francisco_de_miranda, element.lara, element.merida, element.miranda, element.monagas, element.nueva_esparta, element.c_portuguesa, element.sucre, element.tachira, element.trujillo, element.yaracuy, element.zulia],
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(200, 132, 135)',
							'rgb(55, 199, 212)',
							'rgb(94, 67, 35)',
							'rgb(80, 212, 35)',
							'rgb(35, 21, 80)',
							'rgb(205, 132, 12)',
							'rgb(155, 9, 112)',
							'rgb(204, 112, 35)',
							'rgb(135, 121, 180)', 
							'rgb(15, 11, 210)',
							'rgb(194, 67, 235)', 
							'rgb(180, 12, 235)', 
							'rgb(104, 212, 235)', 
							'rgb(55, 239, 11)', 
							'rgb(100, 232, 15)', 
							'rgb(25, 199, 232)', 
							'rgb(204, 167, 35)', 
							'rgb(100, 2, 15)', 
							'rgb(55, 219, 11)', 
							'rgb(235, 221, 18)', 
							'rgb(14, 12, 235)', 
							'rgb(194, 207, 135)', 
							'rgb(154, 12, 35)'  							
						],
						hoverOffset: 2
						}]
					}
				});		
				});
				
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// grafico 2 desde hasta una fecha en espesifica
	desde_hasta_grafico2(desde, hasta){
		$.ajax({
			url: "model/ajax/desde_hasta_grafico2_ajax.php",
			type: "POST",
			data: {
				desde, hasta
			},
			success: function(result){
				// $("#exampleModal13").modal("show");
				$("#cargando1").html("");
				let r = JSON.parse(result);
				
				$.each(r, function(index, element){
					// Datos para el gráfico
					let c_amazonas = `Amazonas: ${element.amazonas }`;
					let c_anzoategui = `Anzoategui: ${element.anzoategui }`;
					let c_apure = `Apure: ${element.apure }`;
					let c_aragua = `Aragua: ${element.aragua }`;
					let c_barinas = `Barinas: ${element.barinas }`;
					let c_bolivar = `Bolivar: ${element.bolivar }`;
					let c_carabobo = `Carabobo: ${element.carabobo }`;
					let c_cojedes = `Cojedes: ${element.cojedes }`;
					let c_delta_amacuro = `Delta amacuro: ${element.delta_amacuro }`;
					let c_distrito_capital = `Distrito Capital: ${element.distrito_capital }`;
					let c_falcon = `Falcon: ${element.falcon }`;
					let c_guariaco = `Guariaco: ${element.guariaco }`;
					let c_la_guaira = `La guaira: ${element.la_guaira }`;
					let c_insular_francisco_de_miranda = `insular francisco de miranda: ${element.insular_francisco_de_miranda }`;
					let c_lara = `Lara: ${element.lara }`;
					let c_merida = `Merida: ${element.merida }`;
					let c_miranda = `Miranda: ${element.miranda }`;
					let c_monagas = `Monagas: ${element.monagas }`;
					let c_nueva_esparta = `Nueva Esparta Capital: ${element.distrito_capital }`;
					let c_portuguesa = `Portuguesa: ${element.portuguesa }`;
					let c_sucre = `Sucre: ${element.sucre }`;
					let c_tachira = `Tachira: ${element.la_guaira }`;
					let c_trujillo = `insular francisco de miranda: ${element.trujillo }`;
					let c_yaracuy = `Yaracuy: ${element.lara }`;
					let c_zulia = `Zulia: ${element.merida }`;
					// let t_ext = `E: ${ext}`;
					var ctx = document.getElementById('myChart4').getContext('2d');
					var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: [c_amazonas, c_anzoategui, c_apure, c_aragua, c_barinas, c_bolivar, c_carabobo, c_cojedes, c_delta_amacuro, c_distrito_capital, c_falcon, c_guariaco, c_la_guaira, c_insular_francisco_de_miranda, c_lara, c_merida, c_miranda, c_monagas, c_nueva_esparta, c_portuguesa, c_sucre, c_tachira, c_trujillo, c_yaracuy, c_zulia],
						datasets: [{
						label: 'Datos',
						data: [element.amazonas, element.anzoategui, element.apure, element.aragua, element.barinas, element.bolivar, element.carabobo, element.cojedes, element.delta_amacuro, element.distrito_capital, element.falcon, element.guariaco, element.la_guaira, element.insular_francisco_de_miranda, element.lara, element.merida, element.miranda, element.monagas, element.nueva_esparta, element.c_portuguesa, element.sucre, element.tachira, element.trujillo, element.yaracuy, element.zulia],
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(54, 162, 235)',
							'rgb(200, 132, 135)',
							'rgb(55, 199, 212)',
							'rgb(94, 67, 35)',
							'rgb(80, 212, 35)',
							'rgb(35, 21, 80)',
							'rgb(205, 132, 12)',
							'rgb(155, 9, 112)',
							'rgb(204, 112, 35)',
							'rgb(135, 121, 180)', 
							'rgb(15, 11, 210)',
							'rgb(194, 67, 235)', 
							'rgb(180, 12, 235)', 
							'rgb(104, 212, 235)', 
							'rgb(55, 239, 11)', 
							'rgb(100, 232, 15)', 
							'rgb(25, 199, 232)', 
							'rgb(204, 167, 35)', 
							'rgb(100, 2, 15)', 
							'rgb(55, 219, 11)', 
							'rgb(235, 221, 18)', 
							'rgb(14, 12, 235)', 
							'rgb(194, 207, 135)', 
							'rgb(154, 12, 35)'  							
						],
						hoverOffset: 2
						}]
					}
				});		
				});
				
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// grafico 3 por sexo y estado
	datos_grafico3_sexo(){
		$.ajax({
			url: "model/ajax/datos_grafico3_sexo_ajax.php",
			type: "POST",
			success: function(result){
				// alert(result);
				// $("#exampleModal13").modal("show");
				$("#cargando2").html("");
				let r = JSON.parse(result);
				
				$.each(r, function(index, element){
					// Datos para el gráfico
					let masculino = `Masculino: ${element.masculino}`;
					let femenino = `Femenino: ${element.femenino}`;
					var ctx = document.getElementById('myChart3').getContext('2d');
					var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: [masculino, femenino],
						datasets: [{
						label: 'Datos',
						data: [element.masculino, element.femenino],
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(100, 10, 150)',  							
						],
						hoverOffset: 2
						}]
					}
				});		
				});
				
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// GRAFICO POR PARROQUIA respuesta 3ra pregunta encuesta empresa
	ver_graf_por_parro(parroquia){
		$.ajax({
			url: "model/ajax/ver_graf_por_parro_ajax.php",
			type: "POST",
			data: {
				parroquia
			},
			success: function(result){
				if(result == 0){
					alert("No hay programas ambientales en esta parroquia");
				}else{
				$("#cargando5").html("");
				let r = JSON.parse(result);
				// alert(r);
				// alert(result);				
				$.each(r, function(index, element){
					// Datos para el gráfico
					let secibilizacion = `Sencibilisación casa a casa: ${element.respuesta3_1}`;
					let cine = `Cine ambiental comunitario: ${element.respuesta3_2}`;
					let saneamiento = `Saneamiento ambiental y embellecimiento: ${element.respuesta3_3}`;
					let recuperacion = `Recuperacion de espacios deportivos: ${element.respuesta3_4}`;
					let viveros = `Viveros comunitarios: ${element.respuesta3_5}`;
					var ctx = document.getElementById('myChart6').getContext('2d');
					var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: [secibilizacion, cine, saneamiento, recuperacion, viveros],
						datasets: [{
						label: 'Datos',
						data: [element.respuesta3_1, element.respuesta3_2, element.respuesta3_3, element.respuesta3_4, element.respuesta3_5],
						backgroundColor: [
							'rgb(255, 99, 132)',
							'rgb(100, 10, 150)', 
							'rgb(80, 99, 12)',
							'rgb(130, 109, 205)', 
							'rgb(200, 10, 150)',  							
						],
						hoverOffset: 2
						}]
					}
				});		
				});
				}
				
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// verificar si la respuesta es corecta para recuperrar tu contraseña
	verificar_contra(respuesta_ingre, respuesta_correcta){
		$.ajax({
			url: "model/ajax/verificar_contra_ajax.php",
			type: "POST",
			data: {
				respuesta_ingre, respuesta_correcta
			},
			success: function(result){
				alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	//  envio de correo si existe el usuario para cambiar contraseña}
	recuperar_contra_usu_correo(usuario_rec){
		$.ajax({
			url: "model/ajax/recuperar_contra_usu_correo_ajax.php",
			type: "POST",
			data: {
				usuario_rec
			},
			success: function(result){
				if(result == 1){
					var notification = alertify.notify('Tu nueva contraseña fue enviada al correo', 'success', 5, function(){  console.log('dismissed'); });
				}else if(result == "sin correo"){
					var notification = alertify.notify('El usuario no tiene correo', 'success', 5, function(){  console.log('dismissed'); });
				}else{
					var notification = alertify.notify('El usuario no existe', 'success', 5, function(){  console.log('dismissed'); });
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// enviar y recivir preguntas del formulario
	env_rec_res_pre(res1, res2, res3, res4, res4_2){
		$.ajax({
			url: "model/ajax/env_rec_res_pre_ajax.php",
			type: "POST",
			data: {
				res1, res2, res3, res4, res4_2
			},
			success: function(result){
				// alert(result);
				if(result == 1){
					var notification = alertify.notify('Formulario enviado exitosamente', 'success', 5, function(){  console.log('dismissed'); });
					$("#cuerpo").html(formulario_preguntas_listas_ver());
				usuario.respuesta_lita_preguntas();
				}else{
					alert("hay un error");
				}
				
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar los estdos en el select de descargar data como admin
	mostrar_estados_par_mun2(){
		$.ajax({
			url: "model/ajax/mostrar_estados_par_mun_ajax.php",
			type: "POST",
			success: function(result){
				let r = JSON.parse(result);
				
				$.each(r, function(index, element){
					$("#estado_data_d").append("<option value='"+ element.idestado +"'>" + element.estado + "</option>");
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	descargar_data1_est(estado){
		$.ajax({
			url: "model/ajax/crear_sesion_estado.php",
			type: "POST",
			data: {
				estado
			},
			success: function(result){
				// alert(result);
				window.location.href = "model/excel_reporte_data_por_estado.php";
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// --------------------------------------------------------
	// --------------------------------------------------------
	// borra lo de abajo
	// ---------------------------------------------------------
	// --------------------------------------------------------
	// MOSTRAR TRANSACCIONES DE LOS EXPEDIENTES como role de director general y director de linea
	mostar_trans_exp(){
		$("#cuerpo").css("width", "80%");
		$("#navbar-le").removeClass("dsp_no");
		$("#opc_admin").css("display","none");
		$("#opnb1").css("display","none");
		$("#opnb2").css("display","none");
		$("#btn_cerrar_ss").removeClass("dps_none");
				$("#navbar-le").addClass("fondo_le");
		// 		$("#opnb2").removeClass("opnb");
		// 		$("#opnb_perfil").removeClass("opnb");
		// 		$("#opc_adm_1").removeClass("opnb");
		// 		$("#opc_adm_2").removeClass("opnb");
		// 		$("#opc_adm_3").removeClass("opnb");
		// 		$("#opc_adm_4").removeClass("opnb");
		$("#opndir1").addClass("opnb"); 

		$("#cuerpo").html(expedientes_sn_dev1());
		$('#tbl_exp_sd_1').DataTable({
		// 	"scrollY": "100vh",
  //   		"scrollCollapse": true,
			"ajax":{
				"url": "model/ajax/ajax_mostrar_trans_exp.php",
				"type": "POST",
				"dataSrc":""
			},
			"columns":[
				// {"data": null,"orderable": false, "searchable": true,
				// 	render: function(data, type, row, meta) {
				// 	return `<button type="button" class="btn btn-primary btn-sm py-0 px-1" onclick="edit_exp(${row.cedula})">E</button> ${row.cedula}`;
				// 	}
				// },
				// {"data": "nombres",
				// "searchable": true},
				// {"data": "cargo", "searchable": true},
				// {"data": "dstatus", "searchable": true},
				// {"data": "cstatus", "searchable": false},
				// {"data": null,
				// 	className: 'text-center py-0 px-1',
				// 	render: function(data, type, row, meta) {
				// 	return `${row.nfil}-${row.ncol}`;
				// }
				// },
				// {"data": "statra", "searchable": false},
				{"data": "nombre_soli"},
				{"data": "micro"},
				{"data": "piso"},
				{"data": "nombre_uni"},
				{"data": "cedula"},
				{"data": "per_nombres"},
				{"data": "fentrega"},
				{"data": "fdevolucion", orderable: true },
				{"data": "observacion"},
				{"data": "eanalista"},
				{"data": "ranalista"},
				// {
				// 	"data": null,
				// 	className: 'text-center py-0 px-1',
    //                 render: function(data, type, row, meta) {
    //                     return `<img src='./view/images/icono_pdf.png' width='45px' style="cursor: pointer; border-radius: 5px;" class="btn_subir_exp" onclick="" id="btn_expe_pdf" name="btn_expe_pdf">`;
    //                 }
				// },
				// {
    //                 "data": null
    //                 ,
    //                 orderable: false,
    //                 className: 'text-center py-0 px-1',
    //                 render: function(data, type, row, meta) {
    //                     console.log()
                        
    //                     return "<button class='btn btn-primary btn-xs' onclick='hh("+ row.cedula +")'>S</button>";
    //                 }
    //             }
			],
			ordering: false,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	} 
	// mostrar nombre usuario en el navbar al lado del btn cerrar secion
	mostrar_usuario(){ 
		$.ajax({
			url: "model/ajax/ajax_mostrar_usuario.php",
			type: "POST",
			success: function(result){
				$("#nom_usu_log_header").html("<i class='px-1 mr-4' id='nom_usu_log_header' name='nom_usu_log_header'><b>"+ result +"</b></i>");
			},
			error: function(error){
				console.log(error);
			}

		});
	};
	// mostrar expedientes solictados con mas de 3 dias de retraso 
	mostrar_exp_mas_3_dias_soli(){ 
		$.ajax({
			url: "model/ajax/ajax_mostrar_exp_mas_3_dias_soli.php",
			type: "POST",
			success: function(result){
				if(result > 0){
					$("#exampleModal4").modal("show");
					$("#cant_expe").append(`Hay ${result} expedientes que fueron solicitados y tienen mas de 3 dias de retraso`);
				}
			},
			error: function(error){
				console.log(error);
			}

		});
	};
	// mostrar pesonal luego de logearse y btn navbar personal
	mostrar_personal(num){
				$("#cuerpo").css("width", "80%");
				$("#navbar-le").removeClass("dsp_no");
				if(num == 1){
					$("#opc_admin").css("display","none");
				}
				$("#opndir1").css("display","none");
				$("#btn_cerrar_ss").removeClass("dps_none");
				$("#navbar-le").addClass("fondo_le");
				$("#opnb2").removeClass("opnb");
				$("#opnb_perfil").removeClass("opnb");
				$("#opc_adm_1").removeClass("opnb");
				$("#opc_adm_2").removeClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opc_adm_4").removeClass("opnb");
				$("#opnb1").addClass("opnb"); 

		$("#cuerpo").html(tabla_personal());
		$('#datatable_users').DataTable({
			"scrollY": "100vh",
    		"scrollCollapse": true,
			"ajax":{
				"url": "model/ajax/ajax_mostrar_usu.php",
				"type": "POST",
				"dataSrc":""
			},
			"columns":[
				{"data": null,"orderable": false, "searchable": true,
					render: function(data, type, row, meta) {
					return `<button type="button" class="btn btn-primary btn-sm py-0 px-1" onclick="edit_exp(${row.cedula})">E</button> ${row.cedula}`;
					}
				},
				{"data": "nombres",
				"searchable": true},
				{"data": "cargo", "searchable": true},
				{"data": "dstatus", "searchable": true},
				// {"data": "cstatus", "searchable": false},
				{"data": null,
					className: 'text-center py-0 px-1',
					render: function(data, type, row, meta) {
					return `${row.nfil}-${row.ncol}`;
				}
				},
				// {"data": "statra", "searchable": false},
				{"data": "destno"},
				{
					"data": null,
					className: 'text-center py-0 px-1',
                    render: function(data, type, row, meta) {
                        return `<img src='./view/images/icono_pdf.png' width='45px' style="cursor: pointer; border-radius: 5px;" class="btn_subir_exp" onclick="mos_modal_img_exp(${row.cedula})" id="btn_expe_pdf" name="btn_expe_pdf"><button class='btn btn-primary btn-xs' onclick="mostrar_expedientes_img(${row.cedula})">Ver</button>`;
                    }
				},
				{
                    "data": null
                    ,
                    orderable: false,
                    className: 'text-center py-0 px-1',
                    render: function(data, type, row, meta) {
                        console.log()
                        
                        return "<button class='btn btn-primary btn-xs' onclick='hh("+ row.cedula +")'>S</button>";
                    }
                }
			],
			ordering: false,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});

		//Creamos una fila en el head de la tabla y lo clonamos para cada columna
		// $('#datatable_users thead tr').clone(true).appendTo( '#datatable_users thead' );

		// $('#datatable_users thead tr:eq(1) th').each( function (i) {
		// 	var title = $(this).text(); //es el nombre de la columna
		// 	$(this).html( '<input type="text" placeholder="Search...'+title+'" />' );
	 
		// 	$( 'input', this ).on( 'keyup change', function () {
		// 		if ( table.column(i).search() !== this.value ) {
		// 			table
		// 				.column(i)
		// 				.search( this.value )
		// 				.draw();
		// 		}
		// 	} );
		// });
	};
	// agregar expediente
	agre_expe(cedula, nombre, cargo, estatus, region, fila, columna){
		$.ajax({
			url: "model/ajax/ajax_agre_expe.php",
			type: "POST",
			data: {
				cedula, nombre, cargo, estatus, region, fila, columna
			},
			success: function(result){
				if(result == 0){
					$("#rr").html(accion.mensaje_alerta("danger", "La cedula ya existe", "view/images/icono_danger.png"));
				}else if(result == 1){
					usuario.mostrar_personal();
					$("#exampleModal2").modal("hide");
					var notification = alertify.notify('Expediente creado exitosamente', 'success', 5, function(){  console.log('dismissed'); });
				}else{
					$("#rr").html(accion.mensaje_alerta("danger", "Ha ocurrido un error", "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// obetener registro del usuario a editar
	obtener_reg_edi_exp(ci){
		$.ajax({
			url: "model/ajax/ajax_obtener_reg_edi_exp.php",
			type: "POST",
			data: {
				ci
			},
			success: function(result){
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#cedula2").val(element.cedula);
					$("#crear_nom").val(element.nombres);
					$("#cargo_val").val(element.desc_cargo);
					$("#fila").val(element.nfil);
					$("#columna").val(element.ncol);
					$("#status_val").val(element.dstatus);
					$("#region_val").val(element.nombreprpyac);
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// opcion navbar 1 mostrar los expedientes sin devolber
	expedi_sn_devolver(){
		$.ajax({
			url: "model/ajax/ajax_expedientes_s_devol.php",
			type: "POST",
			success: function(result){
				$("#cuerpo").html(expedientes_sn_dev2());
				$("#cont_2_tbl").append(header_table_personal("Expedientes sin devolver","view/images/expedientes.png"));
				if(result == 0){
					$("#tbl_exp_sd").html("");
					$("#sin_fondo1").html(accion.mensaje_alerta("success", "Todos los expedientes han sido devueltos", "view/images/icono_bien.png"));
				}else{
					$("#tbody_r").append(result);
				}
				$("#opnb_perfil").removeClass("opnb");
				$("#opnb1").removeClass("opnb");
				$("#opc_adm_1").removeClass("opnb");
				$("#opc_adm_2").removeClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opc_adm_4").removeClass("opnb");
				$("#opnb2").addClass("opnb");
			},
			error: function(error){
				console.log(error);
			}
		});

	}
	// MOSTRAR STATUS EN EL SELECT DE AGREGAR UN EXPEDIENTE
	mostrar_estatus(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_estatus.php",
			type: "POST",
			success: function(result){
				$("#estatus").html(result);
				// alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar regiones en los select de agregar un expediente
	mostrar_region(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_region.php",
			type: "POST",
			success: function(result){
				$("#region").html(result);
				// alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar  cargos en el select de agregar expediente
	mostrar_cargo(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_cargo.php",
			type: "POST",
			success: function(result){
				$("#cargo").html(result);
				// alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// ver cargo actual de un personal
	cargo_act(id_cargo_act){
		$.ajax({
			url: "model/ajax/ajax_cargo_act.php",
			type: "POST",
			data: {
				id_cargo_act
			},
			success: function(result){
				$("#cargo_val").val(result);
				$("#buscar_cargo").prop('disabled', false);
				// alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// buscar cargo y mostrarlo en el select
	buscar_cargo(val_car_bus, num){
		$.ajax({
			url: "model/ajax/ajax_buscar_cargo.php",
			type: "POST",
			data: {
				val_car_bus: val_car_bus
			},
			success: function(result){
				alert(result);
				if(num == 1){
					$("#cargo").html(result);
					$("#btn_agregar_usu").prop('disabled', false);
					$("#btn_agregar_usu2").prop('disabled', false);
					$("#buscar_cargo").prop('disabled', false);
					// $("#cargo").html(result);
					// alert(result);
				}else if(num == 2){
					$("#cargo").html(result);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// 
	// guardar edicion de expediente
	guardar_edit_exp(cedula_vieja, cedula, nombre, cargo, status, region, fila ,columna){
		$.ajax({
			url: "model/ajax/ajax_guardar_edit_exp.php",
			type: "POST",
			data: {
				cedula_vieja, cedula, nombre, cargo, status, region, fila, columna
			},
			success: function(result){
				if(result == 0){
					$("#rr").html(accion.mensaje_alerta("danger", "La cedula ya exise", "view/images/icono_danger.png"));
				}else if(result == 1){
					var notification = alertify.notify('El expediente ha sido editado exitosamente', 'success', 5, function(){  console.log('dismissed'); });
					$("#exampleModal2").modal("hide");
					usuario.mostrar_personal();
				}else{
					$("#rr").html(accion.mensaje_alerta("danger", "Ha ocurrido un error", "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	expedientes_soli_personal(ci){
		$.ajax({
			url: "model/ajax/ajax_expedientes_solicitados.php",
			type: "POST",
			data: {
				ci: ci
			},
			success: function(result){
				if(result == 0){
					result = "<input type='hidden' value='"+ci+"' id='ci_per_solic_expe'>";
					result += accion.mensaje_alerta('danger', 'Personal sin solicitud de expediente', 'view/images/icono_danger.png');
					$('#exp_soli').html(accion.boton('Solicitar expediente','success', 'view/images/icono_expediente.png', "onclick='most_mod_agr("+ci+")'"));
					$('#exp_soli').append(result);
				}else if(result == 2){
					usuario.expe_espera_recivir(ci);
				}else{
					$('#exp_soli').html(accion.boton('Solicitar expediente','success', 'view/images/icono_expediente.png', "onclick='most_mod_agr("+ci+")'"));
					$('#exp_soli').append(result);
					usuario.expe_espera_recivir(ci);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// pdf 
	expediente_pdf(){
		var parametros = new FormData($("#area-arrastrar")[0]);
		$.ajax({
		  type: 'POST',
		  url: 'model/ajax/ajax_subir_expediente.php',
		  contentType: false,
		  processData: false,
		  data:{parametros}, 
		  success:function(response) {
			alert(response);
			//   if(response == 'success') {
			//       console.log('Archivo subido');
			//       //Llamando mi funcion
			//       mensajeToast();
			//   } else {
			//       console.log('Error al subir Archivo');
			//   }
			//   //Limpio el input type File
			//   $('.file').val('');
		  },
		  error: function(error){
			alert(error);
		  }
	  });
	}
	// clase si falta por entregar el expediente borrar el boton de solicitar expediente
	expe_espera_recivir(ci){
		$.ajax({
			url: "model/ajax/ajax_borar_btn_espera_exp.php",
			type: "POST",
			data: {
				ci: ci
			},
			success: function(result){
				if(result == 0){
					$('#most_mod_agr').remove();

					// Crea un div con contenido
					let divConContenido = $(`<div style="display: flex;">${accion.boton('Devolver expediente','success', 'view/images/icono_expediente.png', "onclick='modal2_devol_exp_per("+ci+")'")}${accion.boton('Editar observacion','success', 'view/images/pen_edit.png', "onclick='modal_edit_observacion("+ci+")'")}</div>`);
					$("#exp_soli").prepend(divConContenido);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	//entregar expediente solicitado
	debolver_exp(ci){
		$.ajax({
			url: "model/ajax/ajax_debolver_expe_solo.php",
			type: "POST",
			data: {
				ci: ci
			},
			success: function(result){
				// alert(result);
				// if(result == 1){
					$("#exampleModal2").modal("hide");
					// alert(result);
					usuario.expedi_sn_devolver();
				// }else{
				// 	alert("Ha ocurrido un error");
				// }
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// expedientes en pdf subir
	subir_expediente_pdf(){
		$.ajax({
			url: "model/ajax/ajax_subir_expediente.php",
			type: "POST",
			data: {
				sal: sal
			},
			success: function(result){
				alert(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrarobservacion en el campo observacion al resivir expediente
	editar_observacion(ci){
		$.ajax({
			url: "model/ajax/ajax_editar_observacion.php",
			type: "POST",
			data: {
				ci: ci
			},
			success: function(result){
				$("#observacion_act").val(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// guardar al editar observacion
	guardar_edit_obs(ci, observacion_nv, opc){
		$.ajax({
			url: "model/ajax/ajax_guardar_edit_obs.php",
			type: "POST",
			data: {
				ci: ci, observacion_nv: observacion_nv, opc: opc
			},
			success: function(result){
				$("#exampleModal2").modal("hide");
				if(opc == 1){
					usuario.expedientes_soli_personal(ci);
					var notification = alertify.notify('La observacion ha sido editada exitosamente', 'success', 5, function(){  console.log('dismissed'); });
				}else if(opc == 2){
					usuario.expedi_sn_devolver();
					var notification = alertify.notify('La observacion ha sido editada exitosamente', 'success', 5, function(){  console.log('dismissed'); });
				}
				
				
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrara todos las analistas
	selec_analis(val1, ci_per_s){
		$.ajax({
			url: "model/ajax/ajax_solitar_exp_ana.php",
			type: "POST",
			data: {
				val1: val1, ci_per_s: ci_per_s
			},
			success: function(result){
				$("#cont_h2_soli").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	};
	expediente_entregado(analis, ci_entregar_exp, observacion){
		$.ajax({
			url: "model/ajax/ajax_entregar_expe.php",
			type: "POST",
			data: {
				analis: analis, ci_entregar_exp: ci_entregar_exp, observacion: observacion
			},
			success: function(result){
				$("#exampleModal2").modal("hide");
				usuario.expedientes_soli_personal(ci_entregar_exp);
				var notification = alertify.notify('El expediente fue entregado exitosamente', 'success', 5, function(){  console.log('dismissed'); });
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	debolver_expediente(ci){
		$.ajax({
			url: "model/ajax/ajax_recivir_expe.php",
			type: "POST",
			data: {
				ci: ci
			},
			success: function(result){
				$("#exampleModal2").modal("hide");
				usuario.expedientes_soli_personal(ci);
				var notification = alertify.notify('El expediente fue debuelto', 'success', 5, function(){  console.log('dismissed'); });
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar tabla usuarios como administrador
	usus_login(){
				$("#opnb_perfil").removeClass("opnb");
				$("#opnb1").removeClass("opnb");
				$("#opnb2").removeClass("opnb");
				$("#opc_adm_2").removeClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opc_adm_1").addClass("opnb");


		// $("#cuerpo").html("");
		$("#cuerpo").html(tabla_usuario_login());
		$("#cont_2_tbl").append(header_table_personal("Administrador - Usuarios","view/images/expedientes.png"));
		$('#table_reg').DataTable({
			"ajax":{
				"url": "model/ajax/ajax_mostrar_usu_login.php",
				"type": "POST",
				"dataSrc": ""
			},
			"columns":[
				{"data": "login"},
				{"data": "sysnombre"},
				{
                    "data": null,
                    orderable: false,
                    className: 'text-center py-0 px-1',
                    render: function(data, type, row, meta) {
                        return "<button class='btn btn-primary btn-xs' onclick='mos_modal_contra("+ row.idusuario +")'>Cambiar</button>";
                    }
                },
				{"data": "syscedula"},
                {"data": "correo"},
				{"data": "desc_activo"},
				{"data": "sysfechal"},
				{"data": "desc_permisos"},
				{
                    "data": null,
                    orderable: false,
                    className: 'text-center py-0 px-1',
                    render: function(data, type, row, meta) {
                        return "<button class='btn btn-primary btn-xs' onclick='modificar_usu("+ row.idusuario +")'>Editar</button>";
                    }
                }
			],
			ordering: true,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	}
	// mostrar opc de select activo
	mostrar_opc_mod_act_desc(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_activo.php",
			type: "POST",
			success: function(result){
				$("#act_act_adm").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mmostrar opc de select permisos
	mostrar_opc_mod_per(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_permisos.php",
			type: "POST",
			success: function(result){
				$("#adm_act_adm").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar opc de unidad a la que pertenese todas
	mostra_opc_uni_tod(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_unidad_usu_cre.php",
			type: "POST",
			success: function(result){
				$("#unidad_usu").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar en el modal 3
	usu_editar(id_usuario){
		$.ajax({
			url: "model/ajax/ajax_usu_editar.php",
			type: "POST",
			data: {
				id_usuario: id_usuario
			},
			success: function(result){
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#id_usu").val(element.idusuario);
					// $("#usu_act_adm").val(element.login);
					$("#cor_act_adm").val(element.correo);
					$("#nom_act_adm").val(element.sysnombre);
					if(element.syscedula == 0 || element.syscedula == null){
						$("#cont_ci_usu_edi").show();
						$("#cedula_esco").show();
						$("#btn_acttualizar_usu2").hide();
						$("#btn_acttualizar_usu").show();
					}else{
						$("#btn_acttualizar_usu").hide();
						$("#btn_acttualizar_usu2").show();
						$("#cont_ci_usu_edi").hide();
						$("#cedula_esco").hide();
					}
					$("#act_act").val(element.desc_activo);
					$("#adm_fec").val(element.sysfechal);
					$("#adm_act").val(element.desc_permisos);
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// limpiar inp tablas usuarios administrador
	limpiar2(inp){
			$("#inp").val("");
			this.usus_login();
	}
	// actualizar datos del usuario como administrador
	actualizar_usu_adm(cor, id_u, act, adm, ci){
		$.ajax({
			url: "model/ajax/ajax_actualizar_usu_adm.php",
			type: "POST",
			data: {
				cor: cor, id_u: id_u, act: act, adm: adm, ci: ci
			},
			success: function(result){
				if(result == 0){
					$("#error_soli_exp3").html(accion.mensaje_alerta("danger", "El correo ya exise", "view/images/icono_danger.png"));
				}else if(result == 2){
					$("#exampleModal3").modal("hide");
					$("#usu_act_adm").val("");
					$("#nom_act_adm").val("");
					usuario.usus_login();
					var notification = alertify.notify('Los datos del usuarios fueron actualizados exitosamente', 'success', 5, function(){  console.log('dismissed'); });
				}else if (result == 3){
					$("#error_soli_exp3").html(accion.mensaje_alerta("danger", "La cedula ya existe", "view/images/icono_danger.png"));
				}else{
					$("#error_soli_exp3").html(accion.mensaje_alerta("danger", result, "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// cambiar contraseña de usuario y verificar si se puede ingresar
	cam_contra_adm(id){
		$.ajax({
			url: "model/ajax/ajax_cam_contra_adm.php",
			type: "POST",
			data: {
				id: id
			},
			success: function(result){
				if(result == 2){
					$("#rr").html(accion.mensaje_alerta("danger", "El usuario debe tener un correo, para poder cambiar su contraseña", "view/images/icono_danger.png"));
				}else if(result == 1){
					var notification = alertify.notify('La contraseña fue cambiada exitosamente y fue enviada a el correo del usuario', 'success', 5, function(){  console.log('dismissed'); });
					$("#exampleModal2").modal("hide");
				}else if(result == 0){
					$("#rr").html(accion.mensaje_alerta("danger", "No se pudo enviar el correo pero la contraseña fue cambiada", "view/images/icono_danger.png"));
				}else if(result == 30){
					$("#rr").html(accion.mensaje_alerta("danger", "Debes cambiar la cedula del usuario ya que esta vacia o es 0", "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	usus_login_transacciones(){
				$("#cuerpo").html("");
				$("#opnb_perfil").removeClass("opnb");
				$("#opnb1").removeClass("opnb");
				$("#opnb2").removeClass("opnb");
				$("#opc_adm_2").addClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opc_adm_4").removeClass("opnb");
				$("#opc_adm_1").removeClass("opnb");
				$("#cuerpo").html(table_usu_trans());
				$("#cont_2_tbl").append(header_table_personal("Administrador - Transacciones usuarios","view/images/expedientes.png"));


		$('#table_reg').DataTable({
			"ajax":{
				"url": "model/ajax/ajax_usus_login_transacciones.php",
				"type": "POST",
				"dataSrc": ""
			},
			"columns":[
				{"data": "login"},
				{"data": "sysnombre"},
				{"data": "idd"},
				{"data": "fecha_tran"},
				{"data": "hora_tran"},
				{"data": "desc_tran"}
				
			],
			ordering: false,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	}
	// agregar un usuario como administrador
	agre_usu_adm(ci, nom, act, adm, corr, piso, unidad){
		$.ajax({
			url: "model/ajax/ajax_agre_usu_adm.php",
			type: "POST",
			data: {
				ci: ci, nom: nom, act: act, adm: adm, corr: corr, piso: piso, unidad: unidad
			},
			success: function(result){
				if(result == 3){
					$("#rr").html(accion.mensaje_alerta("danger", "La cedula ya existe", "view/images/icono_danger.png"));
				}else if(result == 2){
					$("#rr").html(accion.mensaje_alerta("danger", "Algun campo esta vacio", "view/images/icono_danger.png"));
				}else if(result == 1){
					$("#rr").html(accion.mensaje_alerta("success", "Usuario creado exitosamente y fue enviado un correo con su usuario y contraseña", "view/images/icono_bien.png"));
					$("#exampleModal2").modal("hide");
					var notification = alertify.notify('El usuario ha sido creado exitosamente y fue enviado un correo con su usuario y contraseña.', 'success', 5, function(){  console.log('dismissed'); });
					usuario.usus_login();

				}else if(result == 3){
					$("#rr").html(accion.mensaje_alerta("danger", "El usuario ya existe", "view/images/icono_danger.png"));
				}else if(result == 4){
					$("#rr").html(accion.mensaje_alerta("danger", "El correo ya existe", "view/images/icono_danger.png"));
				}
				else if(result == 0){
					$("#rr").html(accion.mensaje_alerta("danger", "No se pudo enviar la contraseña al correo, pero el usuario ha sido creado", "view/images/icono_danger.png"));
				}else{
					$("#rr").html(accion.mensaje_alerta("danger", "Ha ocurrido un error", "view/images/icono_danger.png"));
					alert(result);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// buscar personal por cedula de vsaime
	buscar_usu_vsaime(ci, id_ci, id_btn_enviar, div, nac){
		$.ajax({
			url: "model/ajax/ajax_buscar_ci.php",
			type: "POST",
			data: {
				ci: ci, nac: nac
			},
			success: function(result){
				const objeto = JSON.parse(result);
				// alert(objeto[0]);
				if(objeto[0] == undefined){
					$("#nac").css("display", "none");
					$("#cedula").css("display", "none");
					$("#cedula_esco").css("display", "none");
					$("#btn_agr_ced_man1").css("display", "none");
					$("#btn_agr_ced_man2").css("display", "block");
					$("#btn_agregar_usu").css("display", "none");
					$("#btn_agregar_usu2").css("display", "block");
					$("#nombre2").css("display", "block");
					$("#cedula2").css("display", "block");
					$("#lb_cedula2").css("display", "block");
					$("#crear_nom").css("display", "none");
					$("#lb_crear_nom").css("display", "none");
					$("#buscando_ci").css("display", "none");
					$("#cedula2").val($("#cedula").val());
					$("#cedula2").removeAttr("readonly");
					$("#crear_nom").val("");
				}else{
					$("#cedula_esco").html(result);
					id_ci.prop('disabled', false);
					id_btn_enviar.prop('disabled', false);
					div.html('');
					$("#cedula2").val(objeto[0]);
					$("#crear_nom").val(objeto[1]);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar cedula de usuario a crear en el campo nombre
	mostra_nombre(ci){
			$.ajax({
				url: "model/ajax/ajax_mostrar_nombre.php",
				type: "POST",
				data: {
					ci: ci
				},
				success: function(result){
					// alert(result);
					$('#crear_nom').val(result);
				},
				error: function(error){
					console.log(error);
				}
			});
	}
	// mostrar tablas de empleados y analistas
	mos_tabla_emp_ana(){
				$("#opnb_perfil").removeClass("opnb");
				$("#opnb1").removeClass("opnb");
				$("#opnb2").removeClass("opnb");
				$("#opc_adm_2").removeClass("opnb");
				$("#opc_adm_1").removeClass("opnb");
				$("#opc_adm_3").addClass("opnb");
				$("#opc_adm_4").removeClass("opnb");
				$("#cuerpo").html(expedientes_sn_dev());
				$("#cont_2_tbl").append(header_table_personal("Administrador - Empleados y analistas","view/images/expedientes.png"));
				$("#cont_2_tbl").append("<div><button class='btn btn-success' onClick='mos_mod_agre_ana_emp()'><i class='fa-solid fas fa-user-plus'></i></button></div>");

		$('#tbl_exp_sd').DataTable({
			"ajax":{
				"url": "model/ajax/ajax_mos_tabla_emp_ana.php",
				"type": "POST",
				"dataSrc": ""
			},
			"columns":[
				{"data": "snombres"},
				{"data": "micro"},
				{"data": "piso"},
				{"data": "unombre"},
				{"data": "tipo"},
				{"data": "activo"},
				{
                    "data": null,
                    orderable: false,
                    className: 'text-center py-0 px-1',
                    render: function(data, type, row, meta) {
                        return "<button class='btn btn-primary btn-xs' onclick='modal_mod_ana_e("+ row.idsolicita +")'>Editar</button>";
                    }
                }
				
			],
			ordering: true,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	}
	// mostrar datos de unidad a modal agregar personal analista o empleado
	mostrar_unidad(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_unidad.php",
			type: "POST",
			success: function(result){
				$("#id_unidad").html(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// agrega analista o empleado
	agre_ana_emp(nombre, piso, unidad){
		$.ajax({
			url: "model/ajax/ajax_agre_ana_emp.php",
			type: "POST",
			data:{
				nombre: nombre, piso: piso, unidad: unidad
			},
			success: function(result){
				$("#exampleModal2").modal("hide");
				usuario.mos_tabla_emp_ana();
				var notification = alertify.notify('El personal solicitante ha sido creado exitosamente.', 'success', 5, function(){  console.log('dismissed'); });
			},
			error: function(error){
				console.log(error);
			}
		});
	}

	// agregar datos a el modal de la tabla analista y empleados al modificar uno como administrador
	agre_act_tip(id){
		$.ajax({
			url: "model/ajax/ajax_agre_act_tip.php",
			type: "POST",
			data: {
				id: id
			},
			success: function(result){
				let r = JSON.parse(result);
				$.each(r, function(index, element){
					$("#unidad_ana_e").val(element.unombre);
					$("#val_tipo").val(element.tipo);
					$("#val_activo").val(element.activo);
					usuario.mostrar_unidad_s_empleado_a();
				});
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// option del select de unidad solicitante modal analistas y empleados
	mostrar_unidad_s_empleado_a(){
		$.ajax({
			url: "model/ajax/ajax_mostrar_unidad_s_empleado_a.php",
			type: "POST",
			success: function(result){

				$("#id_unidad").append(result);
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// select option en el modal analistas y empleados
	select_r_a_e(ns1, val){
		if(ns1 == 1){
			$("#val_tipo").val(val);
		}else if(ns1 == 2){
			$("#val_activo").val(val);
		}else if(ns1 == 3){
			$("#unidad_ana_e").val(val);
		}
	}
	// obtner valores al guardar registros
	obt_reg_r_a_e(){
		let unidad = $("#unidad_ana_e").val();
		let activo = $("#val_activo").val();
		let id_ae = $("#id_ana_emp").val();
		this.guardar_r_a_e(unidad, activo, id_ae);
	}
	// guardar cambio en el modal analista y empleados
	guardar_r_a_e(unidad, activo, id_ae){
		$.ajax({
			url: "model/ajax/ajax_guardar_r_a_e.php",
			type: "POST",
			data: {
				unidad: unidad, activo: activo, id_ae: id_ae
			},
			success: function(result){
				$("#exampleModal2").modal("hide");
				usuario.mos_tabla_emp_ana();
				var notification = alertify.notify('El personal solicitante ha sido actualizado exitosamente.', 'success', 5, function(){  console.log('dismissed'); });
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// mostrar mi perfil
	mi_perfil(){
		$.ajax({
			url: "model/ajax/ajax_perfil.php",
			type: "POST",
			success: function(result){
				$("#cuerpo").html("");
				$("#opnb_perfil").addClass("opnb");
				$("#opnb1").removeClass("opnb");
				$("#opnb2").removeClass("opnb");
				$("#opc_adm_2").removeClass("opnb");
				$("#opc_adm_1").removeClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opc_adm_4").removeClass("opnb");
				$("#cuerpo").html(result);
				$("#cont_2_tbl").append(header_table_personal("Mi perfil - usuario","view/images/expedientes.png"));
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// actualzar datos de mi perfil
	actualizar_mi_perfil(nom){
		$.ajax({
			url: "model/ajax/ajax_actualizar_perfil.php",
			type: "POST",
			data: {
				nom: nom
			},
			success: function(result){
				if(result == 1){
					$("#resp_login").html(accion.mensaje_alerta("success", "El Nombre fue actualizado exitosamente", "view/images/icono_bien.png"));
					usuario.mostrar_usuario();
				}else{
					$("#resp_login").html(accion.mensaje_alerta("danger", "Ha ocurrido un error ", "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// cambiar contraseña de mi perfil
	camb_contra_perfil(cont_v, cont_n1, cont_n2){
		$.ajax({
			url: "model/ajax/ajax_cam_cont_perfil.php",
			type: "POST",
			data: {
				cont_v: cont_v, cont_n1: cont_n1, cont_n2: cont_n2
			},
			success: function(result){
				if(result == 0){
					$("#rr").html(accion.mensaje_alerta("danger", "Contraseña incorrecta", "view/images/icono_danger.png"));
				}else if(result == 1){
					$("#exampleModal2").modal("hide");
					$("#modal2").html("");
					$("#resp_login").html(accion.mensaje_alerta("success", "Contraseña cambianda exitosamente", "view/images/icono_bien.png"));
				}else if(result == 2){
					$("#rr").html(accion.mensaje_alerta("danger", "La contraseña ya existe", "view/images/icono_danger.png"));
				}else{
					$("#rr").html(accion.mensaje_alerta("danger", "Ha ocurrido un error", "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// tabla de transaccion analistas y empleados
	mos_tabla_tran_emp_ana(){
		// $.ajax({
		// 	url: "model/ajax/ajax_mos_tabla_tran_emp_ana.php",
		// 	type: "POST",
		// 	success: function(result){
		// 		$("#cuerpo").html("");
				$("#opc_adm_4").addClass("opnb");
				$("#opnb1").removeClass("opnb");
				$("#opnb2").removeClass("opnb");
				$("#opc_adm_2").removeClass("opnb");
				$("#opc_adm_1").removeClass("opnb");
				$("#opc_adm_3").removeClass("opnb");
				$("#opnb_perfil").removeClass("opnb");
				$("#cuerpo").html(table_ana_emp_trans());
				$("#cont_2_tbl").append(header_table_personal("Administrador - Transacciones Analistas y empleados","view/images/expedientes.png"));
				
		$('#table_reg').DataTable({
			"ajax":{
				"url": "model/ajax/ajax_mos_tabla_tran_emp_ana.php",
				"type": "POST",
				"dataSrc": ""
			},
			"columns":[
				{"data": "snombres"},
				{"data": "login"},
				{"data": "fecha_tran"},
				{"data": "hora_tran"},
				{"data": "desc_tran"}
				
			],
			ordering: false,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	}
	mostrar_expedientes_img(cedula){
		$.ajax({
			url: "model/ajax/ajax_cam_cont_perfil.php",
			type: "POST",
			data: {
				cont_v: cont_v, cont_n1: cont_n1, cont_n2: cont_n2
			},
			success: function(result){
				if(result == 0){
					$("#rr").html(accion.mensaje_alerta("danger", "Contraseña incorrecta", "view/images/icono_danger.png"));
				}else if(result == 1){
					$("#exampleModal2").modal("hide");
					$("#modal2").html("");
					$("#resp_login").html(accion.mensaje_alerta("success", "Contraseña cambianda exitosamente", "view/images/icono_bien.png"));
				}else if(result == 2){
					$("#rr").html(accion.mensaje_alerta("danger", "La contraseña ya existe", "view/images/icono_danger.png"));
				}else{
					$("#rr").html(accion.mensaje_alerta("danger", "Ha ocurrido un error", "view/images/icono_danger.png"));
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}
}
let usuario = new Usuarios();
usuario.session();