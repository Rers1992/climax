$(document).ready(function () {
    $('#a-agregar').click(function (e) {
        e.preventDefault();
        $('#modalProductoHeader').html('Nueva Entidad');
        $('#modalProducto').modal('show');
        $('#btn_regProducto').show();
        $('#btn_modProducto').hide();
    });
    $("#btn_regProducto").click(function () {
        var v_rutEmpresa = $('#rutEmpresa').val();
        var v_nombreEmpresa = $('#nombreEmpresa').val();
        var v_razonSocialEmpresa = $('#razonSocialEmpresa').val();
        var v_contrasenaEmpresa = $('#contrasenaEmpresa').val();
        if (validaCampos('frm_convhist')) {

            if (true) {
                $("#modalcargando").modal("show");
                $("#dataModal").modal("hide");
                $.ajax({
                    type: 'POST',
                    url: 'consulta/registrarUsuario',
                    data: ({
                        rutEmpresa: v_rutEmpresa,
                        nombreEmpresa: v_nombreEmpresa,
                        razonSocialEmpresa: v_razonSocialEmpresa,
                        contraseñaEmpresa: v_contrasenaEmpresa
                    }),
                    success: function (result_ingr) {
                        if (result_ingr) {
                            alert("Se ha agregado Entidad correctamente.");
                            $("#modalProducto").modal("hide");
                            location.reload();
                        } else {
                            $("#alertInsFALSE").alert();
                            //alert("Error al insertar causa");
                        }
                    }
                });
            } else {
                seteaDialog('error', '', 'Faltan datos', '');
            }
        }
    });
});
function validaCampos() {
        // Campos de texto
        if ($("#rutEmpresa").val() == "") {
                alert("El campo Rut Empresa no puede estar vacío.");
                $("#rutEmpresa").focus();
                return false;
        } else if ($("#nombreEmpresa").val() == "") {
        alert("El campo Nombre Empresa no puede estar vacío.");
                $("#nombreEmpresa").focus();
                return false;
    } else if ($("#razonSocialEmpresa").val() == "") {
        alert("El campo Razon Social Empresa no puede estar vacío.");
                $("#razonSocialEmpresa").focus();
                return false;
    } else if ($("#contrasenaEmpresa").val() == "") {
        alert("El campo Contrasena Empresa no puede estar vacío.");
                $("#contrasenaEmpresa").focus();
                return false;
    }

        return true;
}

function fn_ModificarEntidad(v_rut) {
    $.ajax({
        type: 'POST',
        url: 'consulta/verEmpresa/' + v_rut,
        data: ({v_rut: v_rut}),
        success: function (data) {
            $('#modalProductoHeader').html('Modificar Entidad');
            $('#rutEmpresa').html(v_rut);
            $('#btn_regProducto').hide();
            $('#btn_modProducto').show();
            $('#modalProducto').modal('show');
        }
    });
}