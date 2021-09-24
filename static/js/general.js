$(document).ready(function () {
    $('#tabla').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"

            }
        }
    });
});

function fn_abreForm() {
    $.ajax({
        type: 'GET',
        url: 'crearEntidad',
        success: function (data) {
            $('#employee_detail').html(data);
            $('#id_empresa_padre').select2({
                width: '530px',
                placeholder: "Seleccionar"
            });
            if(document.getElementById('adminUsuario').value == 'False'){
                document.getElementById('id_empresa_padre').value = document.getElementById('idrutusuario').value
                $('#div_id_empresa_padre').hide();
                $('#div_id_is_admin').hide();
            }
            $('#dataModal').modal("show");
        }
    });
}

function fn_abreFormModificar(v_rut) {
    $.ajax({
        type: 'GET',
        url: 'editarEntidad/'+v_rut,
        success: function (data) {
            $('#employee_detail').html(data);
            $('#id_empresa_padre').select2({
                width: '530px',
                placeholder: "Seleccionar"
            });
            if(document.getElementById('adminUsuario').value == 'False'){
                $('#div_id_empresa_padre').hide();
                $('#div_id_is_admin').hide();
                document.getElementById('id_empresa_padre').value = document.getElementById('idrutusuario').value
            }
            $('#div_id_contrasenaempresa').hide();
            $('#dataModal').modal("show");
        }
    });
}

function fn_Eliminar(v_rut) {
    var respuesta = confirm("Esta seguro que desea eliminar la Entidad ?");
    if (respuesta == true) {
        $.ajax({
            type: 'GET',
            url: 'eliminarEntidad/'+v_rut,
            success: function (result_ingr) {
                if (result_ingr) {
                    alert("Se ha eliminado la Entidad correctamente");
                    location.reload();
                } else {
                    $("#alertInsFALSE").alert();
                    //alert("Error al insertar causa");
                }
            }
        });
    } else {
        return false;
    }
}