function tabla_personal(){
	let tab_perso = "<div class='mt-2'>";
        // tab_perso += "<div class='col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0 cont_col_tab1' style='padding: 0px;'>";
            tab_perso += "<div id='cont_2_tbl' class='mb-2'>";
            tab_perso += "<button class='btn btn-success mb-2' id='grafico_empresas1' name='grafico_empresas1' onclick='mostar_grafico()'><i class='fa-solid fas fa-file-upload'></i> Gráfico por Tipo</button>";
            tab_perso += "<button class='btn btn-success ml-2 mb-2' id='grafico_empresas2' name='grafico_empresas2' onclick='mostar_grafico2_por_estado()'><i class='fa-solid fas fa-file-upload'></i> Gráfico por Estado</button>";
            tab_perso += "<button class='btn btn-success ml-2 mb-2' id='grafico_empresas21' name='grafico_empresas21' onclick='mostar_grafico2_1_por_estado()'><i class='fa-solid fas fa-file-upload'></i> Gráfico Estado por fecha</button>";
            tab_perso += "<button class='btn btn-success ml-2 mb-2' id='grafico_empresas3' name='grafico_empresas3' onclick='mostar_grafico3_por_sexo()'><i class='fa-solid fas fa-file-upload'></i> Gráfico por sexo</button>";
            tab_perso += "<button class='btn btn-success ml-2 mb-2' id='grafico_empresas_parro' name='grafico_empresas_parro' onclick='mostar_grafico_parro()'><i class='fa-solid fas fa-file-upload'></i>Programas Ambientales</button>";
            tab_perso += "</div>";
            tab_perso += "<div>";
            tab_perso += "<div class='table-responsive'>";
            tab_perso += "<table class='table' id='datatable_empresas'>";
                tab_perso += "<thead class='thead_tab1'";
                    tab_perso += "<tr>";
                        tab_perso += "<th class='text-center tit_c_tab1'>Cédula</th>";
                        tab_perso += "<th class='text-center tit_c_tab1'>Razón social</th>";
                        tab_perso += "<th class='text-center tit_c_tab1'>Estado - Municipio - Parroquia</th>";
                        tab_perso += "<th class='text-center tit_c_tab1'>Correo</th>";
                        tab_perso +="<th class='text-center tit_c_tab1'>Teléfono</th>";
                        tab_perso += "<th class='text-center tit_c_tab1'>TikTok</th>";
                        tab_perso +="<th class='text-center tit_c_tab1'>Facebook</th>";
                        tab_perso += "<th class='text-center tit_c_tab1'>Instagram</th>";
                        tab_perso +="<th class='text-center tit_c_tab1'>Nivel académico</th>";
                        tab_perso +="<th class='text-center tit_c_tab1'>Habilidades o Destrezas</th>";
                    tab_perso += "</tr>";
                tab_perso += "</thead>";
                tab_perso += "<tbody class='tbody_tab1' >";
                tab_perso += "</tbody>";
            tab_perso += "</table>";
            tab_perso += "</div>";
            tab_perso += "</div>";
    tab_perso += "</div>";
    tab_perso += "<div id='sin_fondo'>";
    tab_perso += "</div>";
    tab_perso += "<div id='exp_soli'></div>";
    return tab_perso;
}

function formulario_preguntas_listas_ver(){
    let res = `<div class="container">
    <div class="row justify-content-center mt-5 ">
        <div class="col-md-6 class="py-2 px-2" style="background-color: white; border-radius:1rem;">
        <form>
        <div class="mb-3 text-center">
            <h1>¿Quieres construir un mejor País?</h1>
        </div>
        <div class="mb-3">
            <label for="pregunta1" class="form-label">¿Estás activo(a) en alguna estructura comunitaria donde resides?</label>
            <input type="text"class="form-control" id="res1_l" name="res1_l" readonly>
        </div>
        <div class="mb-3">
            <label for="pregunta2" class="form-label" id="lpregunta2">¿Existe algún programa o proyecto en el área ambiental dentro de tu comunidad?</label>
            <input type="text"class="form-control" id="res2_l" name="res2_l" readonly>
        </div>
        <div class="mb-3">
            <label for="pregunta2" class="form-label" id="lpregunta2">¿Cuál de nuestros principales programas se adecuan a las necesidades ambientales de la comunidad donde resides?</label>
            <input type="text"class="form-control mb-1" id="res3_1l" name="res3_1l" readonly>
            <input type="text"class="form-control mb-1" id="res3_2l" name="res3_2l" readonly>
            <input type="text"class="form-control mb-1" id="res3_3l" name="res3_3l" readonly>
        </div>
        <div class="mb-3">
            <label for="pregunta4" class="form-label" id="lpregunta4">¿Tienes algún proyecto o propuesta en el área ambiental que podamos desarrollar en tú comunidad?</label>
            <input type="text"class="form-control" id="res4_l" name="res4_l" readonly>
        </div>
    </form>
        </div>
    </div>
            
    </div>
</div>`;   
return res; 
}
// formulario de preguntas respondidas
function formulario_preguntas(){
    let res = `<div class="container">
    <div class="row justify-content-center mt-5 ">
        <div class="col-md-6 class="py-2 px-2" style="background-color: white; border-radius:1rem;">
        <form>
        <div class="mb-3 text-center">
            <h1>¿Quieres construir un mejor País?</h1>
        </div>
        <div class="mb-3">
            <label for="pregunta1" class="form-label" id="lpregunta1">¿Estás activo(a) en alguna estructura comunitaria donde resides?</label>
            <select class="form-control" id="pregunta1" onchange="fun_preg_1(1)">
                <option selected></option>
                <option value="1">Sí</option>
                <option value="2">No</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="pregunta2" class="form-label" id="lpregunta2">¿Existe algún programa o proyecto en el área ambiental dentro de tu comunidad?</label>
            <select class="form-control" id="pregunta2" onchange="fun_preg_1(2)">
                <option selected></option>
                <option value="1">Sí</option>
                <option value="2">No</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="pregunta3" class="form-label" id="lpregunta3">¿Cuál de nuestros principales programas se adecuan a las necesidades ambientales de la comunidad donde resides?</label>
            <select id="multi_option" multiple name="native-select" placeholder="Native Select" data-search="false" data-silent-initial-value-set="false">
                <option value="1">Sensibilización casa a casa</option>
                <option value="2">Cine ambiental Comunitario</option>
                <option value="3">Saneamiento ambiental y embellecimiento</option>
                <option value="4">Recuperación de espacios culturales y/o deportivos</option>
                <option value="5">Viveros comunitarios</option>
            </select>
        </div>
        <div class="mb-2" id="">
            <label for="pregunta4" class="form-label">¿Tienes algún proyecto o propuesta en el área ambiental que podamos desarrollar en tu comunidad?</label>
            <select class="form-control" id="pregunta4" onchange="fun_preg_1(4)">
                <option selected></option>
                <option value="1">Sí</option>
                <option value="2">No</option>
            </select>
            <input type="text"class="form-control my-1" id="pregunta4_2" name="pregunta4_2" readonly>
        </div>
        <div class="mb-2">
        <b class="text-primary">Debes responder la encuesta</b>
        </div>
        <button type="button" class="btn btn-success" id="enviar_res_pre" name="enviar_res_pre" disabled="true" onclick="env_for_res()">Enviar</button>
        <div class="mb-2" id="error_soli_form1"></div>
    </form>
        </div>
    </div>
            
    </div>
</div>`;   
return res; 
}
