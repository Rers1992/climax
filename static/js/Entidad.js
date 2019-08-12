$(document).ready(function () {

    /* $('#tablaEntidades').DataTable({
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
     });*/

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

/*Vue.component('data-table', {
    render: function (createElement) {
        return createElement(
                "table", null, []
                )
    },
    props: ['comments'],
    data() {
        return {
            headers: [
                {title: 'Rut'},
                {title: 'Nombre'},
                {title: 'Razon Social'},
                {title: 'Contraseña'},
                {title: 'Opciones'}
            ],
            rows: [],
            dtHandle: null
        }
    },
    watch: {
        comments(val, oldVal) {
            let vm = this;
            vm.rows = [];
            val.forEach(function (entidad) {
                let row = [];
                row.push(entidad.rutEmpresa);
                row.push(entidad.nombreEmpresa);
                row.push(entidad.razonSocialEmpresa);
                row.push(entidad.contrasenaEmpresa);
                vm.rows.push(row);
            });
            vm.dtHandle.clear();
            vm.dtHandle.rows.add(vm.rows);
            vm.dtHandle.draw();
        }
    },
    mounted() {
        let vm = this;
        vm.dtHandle = $(this.$el).DataTable({
            columns: vm.headers,
            data: vm.rows,
            searching: true,
            paging: true,
            info: false
        });
    }
});

new Vue({
    el: '#tabledemo',
    data: {
        comments: [],
        search: ''
    },
    computed: {
        filteredComments: function () {
            let self = this;
            let search = self.search.toLowerCase();
            return self.comments.filter(function (comments) {
                return  comments.rutEmpresa.toLowerCase().indexOf(search) !== -1 ||
                        comments.nombreEmpresa.toLowerCase().indexOf(search) !== -1 ||
                        comments.razonSocialEmpresa.toLowerCase().indexOf(search) !== -1 ||
                        comments.contrasenaEmpresa.toLowerCase().indexOf(search) !== -1;
            });
        }
    },
    mounted() {
        let vm = this;
        fetch("consulta/listar")
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    vm.comments = myJson;
                });
    }
});*/

var app = new Vue({
    el: "#app",
    data: {
        entidades: []
    },
    mounted: function () {
        console.log("mounted");
        this.getAllEntidades();
    },
    methods: {
        getAllEntidades: function () {
            axios.get("consulta/listar")
                    .then(function (response) {
                        console.log(response);
                        app.entidades = response.data;
                    })
        }
    }
});



