class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = {
      mymap: Object,
      inicio: -1,
      fin: -1,
      codigoGrafico: -1,
      vectorC1: [],
      codigoEstacion: 0,
      codigoEstacion2: 0,
      estaciones: [],
      estacion: [],
      latitud: -20.291,
      longitud: -69.346,
      fechas: [],
      temMaximas: [],
      temMinimas: [],
      precipitaciones: [],
      data: [],
      indicesOrdenados: [],
      vectorAños: [],
      nombreIndicesOrdenados: [],
      rcuadrado: [],
      nombreIndices: ['cdd', 'csdi', 'cwd', 'dtr', 'fd0', 'gsl', 'gsl2', 'id0',
        'prcptot', 'r10mm', 'r20mm', 'r95p', 'r99p', 'r50mm',
        'rx1day', 'rx5day', 'sdii', 'su25', 'tn10p', 'tn90p',
        'tnn', 'txn', 'tr20', 'tx10p', 'tx90p', 'tnx', 'txx', 'wsdi']
    }
    this.handleChange = this.handleChange.bind(this);
  }

  renderDatosEstacion(dato) {
    return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <thead>
        <tr>
          <th>Dato</th>
          <th>Información</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Codigo</td>
          <td>{dato.codigo}</td>
        </tr>
        <tr>
          <td>Ubicacion</td>
          <td>{dato.ubicacion}</td>
        </tr>
        <tr>
          <td>Nombre</td>
          <td>{dato.nombre}</td>
        </tr>
        <tr>
          <td>Fecha de Instalación</td>
          <td>{dato.fechaI}</td>
        </tr>
        <tr>
          <td>Longitud</td>
          <td>{dato.long}</td>
        </tr>
        <tr>
          <td>Latitud</td>
          <td>{dato.lat}</td>
        </tr>
        <tr>
          <td>Altura</td>
          <td>{dato.altura}</td>
        </tr>
        <tr>
          <td>Cuenca</td>
          <td>{dato.cuenca}</td>
        </tr>
        <tr>
          <td>Rio</td>
          <td>{dato.rio}</td>
        </tr>
        <tr>
          <td>Medición</td>
          <td>{dato.medi}</td>
        </tr>
        <tr>
          <td>Fecha de Inicio de Datos</td>
          <td>{this.state.fechas[0]}</td>
        </tr>
        <tr>
          <td>Fecha de Fin de Datos</td>
          <td>{this.state.fechas[this.state.fechas.length - 1]}</td>
        </tr>
        <tr>
          <td>Comentarios</td>
          <td>{dato.comentario}</td>
        </tr>
      </tbody>
    </table>;
  }

  crearGrafico2(valor, temMax, temMin, Pre, años) {
    new Chart(valor, {
      type: 'line',
      data: {
        labels: años,
        datasets: [{
          label: "Tem. Maxima",
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: temMax,
          fill: false,
        }, {
          label: "Tem. Minima",
          backgroundColor: 'rgba(63, 121, 191, 0.2)',
          borderColor: 'rgba(63, 121, 191, 1)',
          borderWidth: 1,
          data: temMin,
          fill: false,
        }, {
          label: "Precipitación",
          data: Pre,
          backgroundColor: 'rgba(21, 255, 5, 0.2)',
          borderColor: 'rgba(21, 255, 5, 1)',
          borderWidth: 1,
          fill: false,
        },
        ]
      }
    })
  }

  renderTabla(data) {
    return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <thead>
        <tr>
          <th>año</th>
          <th>cdd</th>
          <th>csdi</th>
          <th>cwd</th>
          <th>dtr</th>
          <th>fd0</th>
          <th>gsl</th>
          <th>gsl2</th>
          <th>id0</th>
          <th>prcptot</th>
          <th>r10mm</th>
          <th>r20mm</th>
          <th>r95p</th>
          <th>r99p</th>
          <th>r50mm</th>
          <th>rx1day</th>
          <th>rx5day</th>
          <th>sdii</th>
          <th>su25</th>
          <th>tn10p</th>
          <th>tn90p</th>
          <th>tnn</th>
          <th>txn</th>
          <th>tr20</th>
          <th>tx10p</th>
          <th>tx90p</th>
          <th>tnx</th>
          <th>txx</th>
          <th>wsdi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dato) => (
          <tr>
            <td>{dato.ano}</td>
            <td>{dato.cdd}</td>
            <td>{dato.csdi}</td>
            <td>{dato.cwd}</td>
            <td>{dato.dtr}</td>
            <td>{dato.fd0}</td>
            <td>{dato.gsl}</td>
            <td>{dato.gsl2}</td>
            <td>{dato.id0}</td>
            <td>{dato.prcptot}</td>
            <td>{dato.r10mm}</td>
            <td>{dato.r20mm}</td>
            <td>{dato.r95p}</td>
            <td>{dato.r99p}</td>
            <td>{dato.r50mm}</td>
            <td>{dato.rx1day}</td>
            <td>{dato.rx5day}</td>
            <td>{dato.sdii}</td>
            <td>{dato.su25}</td>
            <td>{dato.tn10p}</td>
            <td>{dato.tn90p}</td>
            <td>{dato.tnn}</td>
            <td>{dato.txn}</td>
            <td>{dato.tr20}</td>
            <td>{dato.tx10p}</td>
            <td>{dato.tx90p}</td>
            <td>{dato.tnx}</td>
            <td>{dato.txx}</td>
            <td>{dato.wsdi}</td>
          </tr>
        ))}
      </tbody>
    </table>;

  }

  componentDidMount() {
    this.state.mymap = L.map('mimapa').setView([this.state.latitud, this.state.longitud], 9)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 25,
      attribution: 'Datos del mapa de &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imágenes © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11'
    }).addTo(this.state.mymap);
    fetch('../memoria/estacionJson')
      .then(response => response.json())
      .then(data => this.setState({
        estaciones: data.estacionesJson, codigoEstacion: data.estacionesJson[0].codigo,
        codigoEstacion2: data.estacionesJson[0].codigo
      }))
  }

  ordenarIndicesFuncion() {
    var indices = []
    var sumx = 0
    var sumx2 = 0
    var sumy = []
    var sumy2 = []
    var sumxy = []
    var promx = 0
    var promy = []
    var sigmax = 0
    var sigmay = []
    var sigmaxy = []
    var años = []
    var m = []
    var b = []
    var n = 0
    var r2 = []
    for (let i = 0; i < 28; i++) {
      indices[i] = []
      sumy[i] = 0
      sumy2[i] = 0
      sumxy[i] = 0
      m[i] = 0
      b[i] = 0
      promy[i] = 0
      sigmay[i] = 0
      sigmaxy[i] = 0
      r2[i] = 0
    }
    n = this.state.data.length
    for (let i = 0; i < n; i++) {
      años.push(this.state.data[i]['ano'])
      sumx += Number(this.state.data[i]['ano'])
      sumx2 += Number(Number(this.state.data[i]['ano']) * Number(this.state.data[i]['ano']))
      indices[0].push(this.state.data[i]['cdd'])
      indices[1].push(this.state.data[i]['csdi'])
      indices[2].push(this.state.data[i]['cwd'])
      indices[3].push(this.state.data[i]['dtr'])
      indices[4].push(this.state.data[i]['fd0'])
      indices[5].push(this.state.data[i]['gsl'])
      indices[6].push(this.state.data[i]['gsl2'])
      indices[7].push(this.state.data[i]['id0'])
      indices[8].push(this.state.data[i]['prcptot'])
      indices[9].push(this.state.data[i]['r10mm'])
      indices[10].push(this.state.data[i]['r20mm'])
      indices[11].push(this.state.data[i]['r95p'])
      indices[12].push(this.state.data[i]['r99p'])
      indices[13].push(this.state.data[i]['r50mm'])
      indices[14].push(this.state.data[i]['rx1day'])
      indices[15].push(this.state.data[i]['rx5day'])
      indices[16].push(this.state.data[i]['sdii'])
      indices[17].push(this.state.data[i]['su25'])
      indices[18].push(this.state.data[i]['tn10p'])
      indices[19].push(this.state.data[i]['tn90p'])
      indices[20].push(this.state.data[i]['tnn'])
      indices[21].push(this.state.data[i]['txn'])
      indices[22].push(this.state.data[i]['tr20'])
      indices[23].push(this.state.data[i]['tx10p'])
      indices[24].push(this.state.data[i]['tx90p'])
      indices[25].push(this.state.data[i]['tnx'])
      indices[26].push(this.state.data[i]['txx'])
      indices[27].push(this.state.data[i]['wsdi'])
      sumy[0] += Number(this.state.data[i]['cdd'])
      sumy[1] += Number(this.state.data[i]['csdi'])
      sumy[2] += Number(this.state.data[i]['cwd'])
      sumy[3] += Number(this.state.data[i]['dtr'])
      sumy[4] += Number(this.state.data[i]['fd0'])
      sumy[5] += Number(this.state.data[i]['gsl'])
      sumy[6] += Number(this.state.data[i]['gsl2'])
      sumy[7] += Number(this.state.data[i]['id0'])
      sumy[8] += Number(this.state.data[i]['prcptot'])
      sumy[9] += Number(this.state.data[i]['r10mm'])
      sumy[10] += Number(this.state.data[i]['r20mm'])
      sumy[11] += Number(this.state.data[i]['r95p'])
      sumy[12] += Number(this.state.data[i]['r99p'])
      sumy[13] += Number(this.state.data[i]['r50mm'])
      sumy[14] += Number(this.state.data[i]['rx1day'])
      sumy[15] += Number(this.state.data[i]['rx5day'])
      sumy[16] += Number(this.state.data[i]['sdii'])
      sumy[17] += Number(this.state.data[i]['su25'])
      sumy[18] += Number(this.state.data[i]['tn10p'])
      sumy[19] += Number(this.state.data[i]['tn90p'])
      sumy[20] += Number(this.state.data[i]['tnn'])
      sumy[21] += Number(this.state.data[i]['txn'])
      sumy[22] += Number(this.state.data[i]['tr20'])
      sumy[23] += Number(this.state.data[i]['tx10p'])
      sumy[24] += Number(this.state.data[i]['tx90p'])
      sumy[25] += Number(this.state.data[i]['tnx'])
      sumy[26] += Number(this.state.data[i]['txx'])
      sumy[27] += Number(this.state.data[i]['wsdi'])
      sumy2[0] += Number(this.state.data[i]['cdd']) * Number(this.state.data[i]['cdd'])
      sumy2[1] += Number(this.state.data[i]['csdi']) * Number(this.state.data[i]['csdi'])
      sumy2[2] += Number(this.state.data[i]['cwd']) * Number(this.state.data[i]['cwd'])
      sumy2[3] += Number(this.state.data[i]['dtr']) * Number(this.state.data[i]['dtr'])
      sumy2[4] += Number(this.state.data[i]['fd0']) * Number(this.state.data[i]['fd0'])
      sumy2[5] += Number(this.state.data[i]['gsl']) * Number(this.state.data[i]['gsl'])
      sumy2[6] += Number(this.state.data[i]['gsl2']) * Number(this.state.data[i]['gsl2'])
      sumy2[7] += Number(this.state.data[i]['id0']) * Number(this.state.data[i]['id0'])
      sumy2[8] += Number(this.state.data[i]['prcptot']) * Number(this.state.data[i]['prcptot'])
      sumy2[9] += Number(this.state.data[i]['r10mm']) * Number(this.state.data[i]['r10mm'])
      sumy2[10] += Number(this.state.data[i]['r20mm']) * Number(this.state.data[i]['r20mm'])
      sumy2[11] += Number(this.state.data[i]['r95p']) * Number(this.state.data[i]['r95p'])
      sumy2[12] += Number(this.state.data[i]['r99p']) * Number(this.state.data[i]['r99p'])
      sumy2[13] += Number(this.state.data[i]['r50mm']) * Number(this.state.data[i]['r50mm'])
      sumy2[14] += Number(this.state.data[i]['rx1day']) * Number(this.state.data[i]['rx1day'])
      sumy2[15] += Number(this.state.data[i]['rx5day']) * Number(this.state.data[i]['rx5day'])
      sumy2[16] += Number(this.state.data[i]['sdii']) * Number(this.state.data[i]['sdii'])
      sumy2[17] += Number(this.state.data[i]['su25']) * Number(this.state.data[i]['su25'])
      sumy2[18] += Number(this.state.data[i]['tn10p']) * Number(this.state.data[i]['tn10p'])
      sumy2[19] += Number(this.state.data[i]['tn90p']) * Number(this.state.data[i]['tn90p'])
      sumy2[20] += Number(this.state.data[i]['tnn']) * Number(this.state.data[i]['tnn'])
      sumy2[21] += Number(this.state.data[i]['txn']) * Number(this.state.data[i]['txn'])
      sumy2[22] += Number(this.state.data[i]['tr20']) * Number(this.state.data[i]['tr20'])
      sumy2[23] += Number(this.state.data[i]['tx10p']) * Number(this.state.data[i]['tx10p'])
      sumy2[24] += Number(this.state.data[i]['tx90p']) * Number(this.state.data[i]['tx90p'])
      sumy2[25] += Number(this.state.data[i]['tnx']) * Number(this.state.data[i]['tnx'])
      sumy2[26] += Number(this.state.data[i]['txx']) * Number(this.state.data[i]['txx'])
      sumy2[27] += Number(this.state.data[i]['wsdi']) * Number(this.state.data[i]['wsdi'])
      sumxy[0] += Number(this.state.data[i]['cdd']) * Number(this.state.data[i]['ano'])
      sumxy[1] += Number(this.state.data[i]['csdi']) * Number(this.state.data[i]['ano'])
      sumxy[2] += Number(this.state.data[i]['cwd']) * Number(this.state.data[i]['ano'])
      sumxy[3] += Number(this.state.data[i]['dtr']) * Number(this.state.data[i]['ano'])
      sumxy[4] += Number(this.state.data[i]['fd0']) * Number(this.state.data[i]['ano'])
      sumxy[5] += Number(this.state.data[i]['gsl']) * Number(this.state.data[i]['ano'])
      sumxy[6] += Number(this.state.data[i]['gsl2']) * Number(this.state.data[i]['ano'])
      sumxy[7] += Number(this.state.data[i]['id0']) * Number(this.state.data[i]['ano'])
      sumxy[8] += Number(this.state.data[i]['prcptot']) * Number(this.state.data[i]['ano'])
      sumxy[9] += Number(this.state.data[i]['r10mm']) * Number(this.state.data[i]['ano'])
      sumxy[10] += Number(this.state.data[i]['r20mm']) * Number(this.state.data[i]['ano'])
      sumxy[11] += Number(this.state.data[i]['r95p']) * Number(this.state.data[i]['ano'])
      sumxy[12] += Number(this.state.data[i]['r99p']) * Number(this.state.data[i]['ano'])
      sumxy[13] += Number(this.state.data[i]['r50mm']) * Number(this.state.data[i]['ano'])
      sumxy[14] += Number(this.state.data[i]['rx1day']) * Number(this.state.data[i]['ano'])
      sumxy[15] += Number(this.state.data[i]['rx5day']) * Number(this.state.data[i]['ano'])
      sumxy[16] += Number(this.state.data[i]['sdii']) * Number(this.state.data[i]['ano'])
      sumxy[17] += Number(this.state.data[i]['su25']) * Number(this.state.data[i]['ano'])
      sumxy[18] += Number(this.state.data[i]['tn10p']) * Number(this.state.data[i]['ano'])
      sumxy[19] += Number(this.state.data[i]['tn90p']) * Number(this.state.data[i]['ano'])
      sumxy[20] += Number(this.state.data[i]['tnn']) * Number(this.state.data[i]['ano'])
      sumxy[21] += Number(this.state.data[i]['txn']) * Number(this.state.data[i]['ano'])
      sumxy[22] += Number(this.state.data[i]['tr20']) * Number(this.state.data[i]['ano'])
      sumxy[23] += Number(this.state.data[i]['tx10p']) * Number(this.state.data[i]['ano'])
      sumxy[24] += Number(this.state.data[i]['tx90p']) * Number(this.state.data[i]['ano'])
      sumxy[25] += Number(this.state.data[i]['tnx']) * Number(this.state.data[i]['ano'])
      sumxy[26] += Number(this.state.data[i]['txx']) * Number(this.state.data[i]['ano'])
      sumxy[27] += Number(this.state.data[i]['wsdi']) * Number(this.state.data[i]['ano'])
    }

    promx = sumx / n
    sigmax = Math.sqrt((sumx2 / n - promx ** 2))
    for (let i = 0; i < 28; i++) {
      promy[i] = sumy[i] / n
      m[i] = (sumx * sumy[i] - n * sumxy[i]) / (sumx ** 2 - n * sumx2)
      b[i] = promy[i] - m[i] * promx
      sigmay[i] = Math.sqrt((sumy2[i] / n - promy[i] ** 2))
      sigmaxy[i] = sumxy[i] / n - promx * promy[i]
      r2[i] = (sigmaxy[i] / (sigmax * sigmay[i])) ** 2
    }
    var vectorB = []
    var vectorC = []
    años.push(String(Number(años[n - 1]) + 1))
    this.setState({ indicesOrdenados: indices })
    this.setState({ vectorAños: años })
    this.setState({ rcuadrado: r2 })
    this.crearGrafico2(this.tiempo, this.state.temMaximas, this.state.temMinimas, this.state.precipitaciones, this.state.fechas)
    for (let i = 0; i < 28; i++) {
      vectorB = []
      for (let j = 0; j < años.length; j++) {
        vectorB.push(m[i] * años[j] + b[i])
      }
      vectorC.push(vectorB)
    }
    this.setState({ vectorC1: vectorC })
  }

  crearGrafico3(i) {
    new Chart(this.cdd, {
      type: 'line',
      options: {
        title: {
          display: true,
          text: 'R2 = ' + this.state.rcuadrado[i]
        }
      },
      data: {
        labels: this.state.vectorAños,
        datasets: [{
          label: this.state.nombreIndices[i],
          data: this.state.indicesOrdenados[i],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: "Ajuste",
          backgroundColor: 'rgba(63, 121, 191, 0.2)',
          borderColor: 'rgba(63, 121, 191, 1)',
          borderWidth: 1,
          data: this.state.vectorC1[i],
          fill: false,
        }]
      }
    })
  }

  cargarListaEstaciones(data) {
    data.map(e => {
      L.marker([e.latitud, e.longitud]).addTo(this.state.mymap);
    })
    return <div className="row">
      {data.map((dato) => (
        <div className="col-12 col-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card card-photo contenedor" onClick={() => this.cambioUbicacionMapa(dato.latitud, dato.longitud, dato.codigo)}>
            <div className="card-body">
              <h5 className="card-title">Nombre Estación: {dato.nombre}</h5>
              <h5 className="card-title">Propietario: {dato.propietario}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  }

  cambioUbicacionMapa(latitud, longitud, codigo) {
    this.setState({ codigoEstacion: codigo, codigoEstacion2: codigo })
    document.getElementById('mimapa').innerHTML = "<div id='mimapa2'></div>";
    this.state.mymap = L.map('mimapa2').setView([latitud, longitud], 16)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 25,
      attribution: 'Datos del mapa de &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imágenes © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11'
    }).addTo(this.state.mymap);
    L.marker([latitud, longitud]).addTo(this.state.mymap);
  }

  handleChange(event) {
    var val = (event.target.value).split("-")
    if (val[1] == 3) {
      this.setState({ codigoGrafico: val[0] });
    } else if (val[1] == 2) {
      this.setState({ fin: val[0] });
    } else {
      this.setState({ inicio: val[0] });
    }
  }

  filtroGrafico3() {
    $('#serie').removeData();
    var temMax = []
    var temMin = []
    var pre = []
    var fechas = []
    var val = this.state.inicio - this.state.fin
    if (val > 0) {
      for (let i = this.state.fin; i < val; i++) {
        temMax.push(this.state.temMaximas[i])
        temMin.push(this.state.temMinimas[i])
        pre.push(this.state.precipitaciones[i])
        fechas.push(this.state.fechas[i])
      }
      this.crearGrafico2(this.tiempo, temMax, temMin, pre, fechas)
    } else {
      alert("La fecha de fin no puede ser menor a la de inicio")
    }
  }

  render() {
    if (this.state.codigoEstacion != 0) {
      fetch('../memoria/indices2/' + this.state.codigoEstacion)
        .then(response => response.json())
        .then(data => this.setState({
          data: data.indices, estacion: data.estacion, longitud: data.estacion.long, latitud: data.estacion.lat,
          fechas: data.fechas, temMaximas: data.temMax, temMinimas: data.temMin, precipitaciones: data.preci
        }))
        .then(data => this.ordenarIndicesFuncion())
      this.setState({ codigoEstacion: 0 })
    }
    if (this.state.codigoGrafico != -1) {
      this.crearGrafico3(this.state.codigoGrafico)
      this.setState({ codigoGrafico: -1 })
    }
    return <div className="row">
      <div className="col-3 col-12 col-md-12 col-lg-6 col-xl-3 pb-4">
        <div className="card card-style overflow-auto altoMax">
          <div className="card-body">
            <h5 className="card-title">Estaciones Meteorológicas</h5>
            <div className="row">
              {this.cargarListaEstaciones(this.state.estaciones)}
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 col-12 col-md-12 col-lg-6 col-xl-6 pb-4">
        <div className="card card-style">
          <div className="card-body">
            <h5 className="card-title">Ubicación Estación</h5>
            <div className="row">
              <div id="mimapa"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 col-12 col-md-12 col-lg-6 col-xl-3 pb-4">
        <div className="card card-style">
          <div className="card-body">
            <h5 className="card-title">Información de la Estación Meteorológica</h5>
            <div className="row">
              {this.renderDatosEstacion(this.state.estacion)}
            </div>
            <br></br>
            <div className="row col-12 col-12 col-md-12 col-lg-12 col-xl-12 pb-4">
              <div className="col-3 col-md-3 col-lg-3 col-xl-4">
                <a href={"bitacoraInicio/" + this.state.codigoEstacion2} className="btn btn-info">Bitacora</a>
              </div>
              <div className="col-3 col-md-3 col-lg-3 col-xl-4">
                <a href={"indices/" + this.state.codigoEstacion2} className="btn btn-danger">Indices</a>
              </div>
              <div className="col-3 col-md-3 col-lg-3 col-xl-4">
                <a href={"estadisticos/" + this.state.codigoEstacion2} className="btn btn-success">Estadisticas</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 col-12 col-md-12 col-lg-12 col-xl-8 pb-4">
        <div className="card card-style">
          <div className="card-body">
            <h5 className="card-title">Serie Temporal Estación</h5>
            <div className="row">
              <div className="col-3 col-12 col-md-4 col-lg-4 col-xl-4 pb-4">
                <select className="form-control" value={this.state.fin + "-2"} onChange={this.handleChange}>
                  <option value="-1" >Fecha Inicio...</option>
                  {this.state.fechas.map((dato, index) => (
                    <option value={index + "-2"}>{dato}</option>
                  ))}
                </select>
              </div>
              <div className="col-3 col-12 col-md-4 col-lg-4 col-xl-4 pb-4">
                <select className="form-control" value={this.state.inicio + "-1"} onChange={this.handleChange}>
                  <option value="-1" >Fecha Fin...</option>
                  {this.state.fechas.map((dato, index) => (
                    <option value={index + "-1"}>{dato}</option>
                  ))}
                </select>
              </div>
              <div className="col-3 col-12 col-md-4 col-lg-4 col-xl-4 pb-4">
                <button className="btn btn-primary" onClick={() => this.filtroGrafico3()}>Filtrar</button>
              </div>
            </div>
            <div className="row" id="seriecon">
              <canvas width="400" height="200" id="serie" ref={ctx2 => this.tiempo = ctx2} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 col-12 col-md-12 col-lg-12 col-xl-4 pb-4">
        <div className="card card-style">
          <div className="card-body">
            <h5>Seleccione un Indicador</h5>
            <select className="form-control" value={this.state.codigoGrafico} onChange={this.handleChange}>
              <option value="-1" >Seleccione...</option>
              {this.state.nombreIndices.map((dato, index) => (
                <option value={index + "-3"}>{dato}</option>
              ))}
            </select>
            <br></br>
            <h5 className="card-title">Indicador Seleccionado</h5>
            <div className="row">
              <canvas width="400" height="400" ref={ctx => this.cdd = ctx} />
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#react');
ReactDOM.render(<Dashboard />, domContainer);

$(".chosen").chosen();