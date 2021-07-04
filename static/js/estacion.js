function fn_abreFormEstacion() {
    $.ajax({
        type: 'GET',
        url: 'crearEstacion',
        success: function (data) {
            $('#employee_detail').html(data);
            $('#div_id_rutusuario').hide();
            document.getElementById('id_rutusuario').value = document.getElementById('idrutusuario').value
            $('#dataModal').modal("show");
        }
    });
}

function fn_abreFormModificarUsuario(v_rut) {
    $.ajax({
        type: 'GET',
        url: 'editarUsuario/'+v_rut,
        success: function (data) {
            $('#employee_detail').html(data);
            $('#div_id_contrasenausuario').hide();
            $('#dataModal').modal("show");
        }
    });
}

function fn_Indicadores(codigoEstacion){
    location.href = 'dashboard/'+codigoEstacion;
}

function fn_Estadisticas(codigoEstacion){
    location.href = 'estadisticas/'+codigoEstacion;
}

function fn_Bitacora(codigoEstacion){
    location.href = 'bitacora/'+codigoEstacion;
}

function fn_abreFormImportar(codigoEstacion) {
    $.ajax({
        type: 'GET',
        url: 'importarEstacion/'+codigoEstacion,
        success: function (data) {
            $('#employee_detail').html(data);
            $('#dataModal').modal("show");
        }
    });
}