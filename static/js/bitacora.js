function fn_abreFormBitacora(codigoEstacion) {
    $.ajax({
        type: 'GET',
        url: '../crearBitacora/'+codigoEstacion,
        success: function (data) {
            $('#employee_detail').html(data);
            $('#div_id_codigoestacion').hide();
            $('#id_codigoestacion').val(Number(codigoEstacion))
            $('#dataModal').modal("show");
        }
    });
}