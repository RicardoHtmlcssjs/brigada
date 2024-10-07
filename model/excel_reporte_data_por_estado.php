<?php
    require 'PHPExcel-1.8/Classes/PHPExcel.php';
    include("lib/conexion.php");

    $fecha = new DateTime();
    $fec_act =  $fecha->format('Y-m-d');
    $conexion = new Conexion();
    session_start();
	$estado = $_SESSION["estado"];
    $query = $conexion->consulta("s","SELECT estado, municipio, parroquia, rif, razon_social,telefono_empresa, sexo FROM dempresa INNER JOIN nparroquia  ON idparroquia = idparroquia_empresa INNER JOIN nmunicipio ON nparroquia.idmunicipiofk = nmunicipio.idmunicipio INNER JOIN nestado ON nmunicipio.idestadofk = nestado.idestado WHERE nestado.idestado = ".$estado." order by idempresa asc");
    $query2 = $conexion->consulta("s","SELECT estado FROM nestado WHERE idestado = ".$estado."");
    foreach($query2 as $key2){
        $e_estado = $key2["estado"];
    }

    $fecha = new DateTime();
    $f_tit =  $fecha->format('d-m-Y');
    
    // Crea un objeto PHPExcel
$objPHPExcel = new PHPExcel();
// este metodo se llamo para unir celdas
$worksheet = $objPHPExcel->getActiveSheet();
$worksheet->mergeCells('A1:I1')->setCellValue('A1', $f_tit.' - Brigada Contra El Cambio Climatico - Empresas - Estado '.$e_estado);

$objPHPExcel->getProperties()->setCreator('ricardo')->setTitle('titulo')->setDescription('descripcion')->setKeywords('llaves')->setCategory('ejemplos');
$objPHPExcel->setActiveSheetIndex(0);
// $objPHPExcel->getActiveSheet()->setTitle('Cambio contra el cambio climatico');

// // TITULOS DE LAS COLUMNAS
$objPHPExcel->getActiveSheet()->setCellValue('A2', 'CEDULA');
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);
$objPHPExcel->getActiveSheet()->setCellValue('B2', 'RAZON SOCIAL');
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(40);
$objPHPExcel->getActiveSheet()->setCellValue('C2', 'TELEFONO');
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
$objPHPExcel->getActiveSheet()->setCellValue('D2', 'ESTADO');
$objPHPExcel->getActiveSheet()->getColumnDimension('d')->setWidth(25);
$objPHPExcel->getActiveSheet()->setCellValue('E2', 'MUNICIPIO');
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(25);
$objPHPExcel->getActiveSheet()->setCellValue('F2', 'PARROQUIA');
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(25);
$objPHPExcel->getActiveSheet()->setCellValue('G2', 'SEXO');
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(30);
// $objPHPExcel->getActiveSheet()->setCellValue('H2', 'ENTREGADO POR');
// $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(35);
// $objPHPExcel->getActiveSheet()->setCellValue('I2', 'OBSERVACION');
// $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(40);

$fila = 3;
foreach ($query as $key) {
    $objPHPExcel->getActiveSheet()->setCellValue("A" . $fila, $key["rif"]);
    $objPHPExcel->getActiveSheet()->setCellValue("B" . $fila, $key["razon_social"]);
    $objPHPExcel->getActiveSheet()->setCellValue("C" . $fila, $key["telefono_empresa"]);
    $objPHPExcel->getActiveSheet()->setCellValue("D" . $fila, $key["estado"]);
    $objPHPExcel->getActiveSheet()->setCellValue("E" . $fila, $key["municipio"]);
    $objPHPExcel->getActiveSheet()->setCellValue("F" . $fila, $key["parroquia"]);
    $objPHPExcel->getActiveSheet()->setCellValue("G" . $fila, $key["sexo"]);
    // $objPHPExcel->getActiveSheet()->setCellValue("H" . $fila, $ana_entre);
    // $objPHPExcel->getActiveSheet()->setCellValue("I" . $fila, $key["observacion"]);
    $fila = $fila + 1;
}

    // color de fondo de celda verde
    $styleArray = array(
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'startcolor' => array(
                'rgb' => '006400'
            )
        )
    );
    //ESTABLECER COLOR DE LETRA DE COLOR BLANCO
    $style_color_letra = array(
        'font' => array(
            'color' => array(
                'rgb' => 'FFFFFF'
            )
        )
    );
    // unir celdas de a1 hasta m1
    // $objPHPExcel->mergeCells('A1:B1');
    // celdas a utilizar
    $celdas = array('A', 'B', 'C', 'D', 'E', 'F', 'G');
    // establecer color de fondo verde, tamaño de fuente y centrar texto de celda
    for ($i = 0; $i < count($celdas); $i++) {
        // echo "El elemento " . $i . " es " . $mi_array[$i] . "<br>";
        $objPHPExcel->getActiveSheet()->getStyle($celdas[$i].'2')->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($celdas[$i].'2')->applyFromArray($style_color_letra);
        // cambiar tamaño de fuente
        $objPHPExcel->getActiveSheet()->getStyle($celdas[$i].'2')->getFont()->setSize(12);
        $objPHPExcel->getActiveSheet()->getStyle($celdas[$i].'2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    }

     // cambiar tamaño de fuente
     $objPHPExcel->getActiveSheet()->getStyle('A1')->getFont()->setSize(20);

    // centrar texto de columnas
    $objPHPExcel->getActiveSheet()->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

    $to = $f_tit."_brigada_solicitados_estado_".$e_estado.".xlsx";
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="'.$to.'"');
header('Cache-Control: max-age=0');

$objPHPExcel = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objPHPExcel->save('php://output');
return "hola";
?>