function fn_abreFormUsuario() {
    $.ajax({
        type: 'GET',
        url: 'crearUsuario',
        success: function (data) {
            $('#employee_detail').html(data);
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