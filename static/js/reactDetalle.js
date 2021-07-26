class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = {
      estacion: [],
      latitud: 0,
      inicio: -1,
      fin: -1,
      longitud: 0,
      fechas: [],
      temMaximas: [],
      temMinimas: [],
      precipitaciones: [],
      data: [],
      indicesOrdenados: [],
      vectorAños: [],
      nombreIndicesOrdenados: [],
      nombreIndices: ['cdd', 'csdi', 'cwd', 'dtr', 'fd0', 'gsl', 'gsl2', 'id0',
        'prcptot', 'r10mm', 'r20mm', 'r95p', 'r99p', 'r50mm',
        'rx1day', 'rx5day', 'sdii', 'su25', 'tn10p', 'tn90p',
        'tnn', 'txn', 'tr20', 'tx10p', 'tx90p', 'tnx', 'txx', 'wsdi'],
      temPre: true,
      temPreMensaje:"Ver Precipitación"
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
          <th>TMax.</th>
          <th>TMin.</th>
          <th>PMax.</th>
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
            <td>{dato.temmax}</td>
            <td>{dato.temmin}</td>
            <td>{dato.premax}</td>
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
    fetch('../memoria/indices2/' + $("#codigo").val())
      .then(response => response.json())
      .then(data => this.setState({
        data: data.indices, estacion: data.estacion, longitud: data.estacion.long, latitud: data.estacion.lat,
        fechas: data.fechas, temMaximas: data.temMax, temMinimas: data.temMin, precipitaciones: data.preci
      }))
      .then(data => this.ordenarIndicesFuncion())

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
    var nombreIndices = [this.cdd, this.csdi, this.cwd, this.dtr, this.fd0, this.gsl, this.gsl2, this.id0,
    this.prcptot, this.r10mm, this.r20mm, this.r95p, this.r99p, this.r50mm,
    this.rx1day, this.rx5day, this.sdii, this.su25, this.tn10p, this.tn90p,
    this.tnn, this.txn, this.tr20, this.tx10p, this.tx90p, this.tnx, this.txx, this.wsdi]
    this.setState({ nombreIndicesOrdenados: nombreIndices })
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
    for (let i = 1; i < n; i++) {
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

    var arrayTemMedia = []
    for (let j = 0; j < (this.state.temMaximas).length; j++) {
      arrayTemMedia.push((parseInt(this.state.temMinimas[j]) + parseInt(this.state.temMaximas[j])) / 2)
    }

    años.push(String(Number(años[n - 1]) + 1))
    this.setState({ indicesOrdenados: indices })
    this.setState({ vectorAños: años })
    this.crearGrafico22('myDiv2', this.state.temMaximas, 
    this.state.temMinimas, arrayTemMedia, this.state.fechas)
    for (let i = 0; i < 28; i++) {
      vectorB = []
      for (let j = 0; j < años.length; j++) {
        vectorB.push(m[i] * años[j] + b[i])
      }
      this.crearGrafico(this.state.nombreIndicesOrdenados[i], i, vectorB, r2)
    }
  }


  ordenarFuncion(){
    var arrayTemMedia = []
    for (let j = 0; j < (this.state.temMaximas).length; j++) {
      arrayTemMedia.push((parseInt(this.state.temMinimas[j]) + parseInt(this.state.temMaximas[j])) / 2)
    }
    this.crearGrafico22('myDiv2', this.state.temMaximas, 
    this.state.temMinimas, arrayTemMedia, this.state.fechas)
  }


  ordenarFuncionPre() {
    this.crearGrafico2Pre('myDiv2', this.state.precipitaciones, this.state.fechas, 'line')
  }


  crearGrafico22(valor, temMax, temMin, Pre, años, grafico) {
    var y0 = temMax;
    var y1 = temMin;
    var y2 = Pre;

    var trace1 = {
      x: años,
      y: y0,
      type: grafico,
      marker: { color: 'rgba(255, 99, 132, 0.2)' },
      name: 'Tem. Maxima'
    };

    var trace2 = {
      x: años,
      y: y1,
      type: grafico,
      marker: { color: 'rgba(63, 121, 191, 0.2)' },
      name: 'Tem. Minima'
    };

    var trace3 = {
      x: años,
      y: y2,
      type: grafico,
      marker: { color: 'rgba(21, 255, 5, 0.2)' },
      name: 'Tem. Media'
    };
    var layout = {
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: "overlay",
      //title: "Sampled Results", 
      xaxis: { title: "Fecha" },
      yaxis: { title: "Valor Medición" }
    };

    var data = [trace1, trace2, trace3];

    Plotly.newPlot(valor, data, layout);
  }


  crearGrafico2Pre(valor, Pre, años, grafico) {
    var y0 = Pre;

    var trace1 = {
      x: años,
      y: y0,
      type: grafico,
      marker: { color: 'rgba(21, 255, 5, 0.2)' },
      name: 'Precipitacion'
    };
    var layout = {
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: "overlay",
      //title: "Sampled Results", 
      xaxis: { title: "Fecha" },
      yaxis: { title: "Valor Medición" }
    };

    var data = [trace1];

    Plotly.newPlot(valor, data, layout);
  }


  crearGrafico(valor, i, vectorB, r2) {
    new Chart(valor, {
      type: 'line',
      options: {
        title: {
          display: true,
          text: 'R2 = ' + r2[i]
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
          data: vectorB,
          fill: false,
        }]
      }
    })
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


  handleChangeDatos(event) {
    if(event.target.value == "Temperatura"){
      this.setState({temPre:true})
      this.ordenarFuncion()
    }else if(event.target.value == "Precipitacion"){
      this.setState({temPre:false})
      this.ordenarFuncionPre()
    }
  }


  filtroGrafico3() {
    $('#serie').removeData();
    var temMax = []
    var temMin = []
    var temMed = []
    var pre = []
    var fechas = []
    var val = this.state.inicio
    if (val > 0) {
      for (let i = this.state.fin; i <= val; i++) {
        temMax.push(this.state.temMaximas[i])
        temMin.push(this.state.temMinimas[i])
        temMed.push((parseInt(this.state.temMaximas[i])+parseInt(this.state.temMinimas[i]))/2)
        pre.push(this.state.precipitaciones[i])
        fechas.push(this.state.fechas[i])
      }
      if(this.state.temPre){
        this.crearGrafico22('myDiv2', temMax, temMin, temMed, fechas, 'line')
      }else{
        this.crearGrafico2Pre('myDiv2', pre, fechas, 'line')
      }
      
    } else {
      alert("La fecha de fin no puede ser menor a la de inicio")
    }
  }


  mapasFiltros() {
    return <div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-5">
          <h2 className="text-center"><b>Información de la Estación Meteorológica</b></h2>
          {this.renderDatosEstacion(this.state.estacion)}
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-7 col-lg-7">
          <h2 className="text-center"><b>Ubicación estación</b></h2>
          <iframe width="800" height="280" src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyDx_FE31SZ6Ow8iI57vMSTOHJ823in0k3c&q=' +
            this.state.latitud + ',' + this.state.longitud}></iframe>
        </div>
      </div>
      <br></br>
      <div className="row">
      <div className="col-3 col-12 col-md-2 col-lg-2 col-xl-2">
          <select className="form-control" onChange={(event) => this.handleChangeDatos(event)}>
            <option value="-1" >Ver Datos...</option>
            <option value="Temperatura">Temperatura</option>
            <option value="Precipitacion">Precipitación</option>
          </select>
        </div>
        <div className="col-3 col-12 col-md-4 col-lg-4 col-xl-4 pb-4">
          <select className="form-control" value={this.state.fin + "-2"} id="fInicio" onChange={this.handleChange}>
            <option value="-1" >Fecha Inicio...</option>
            {this.state.fechas.map((dato, index) => (
              <option value={index + "-2"}>{dato}</option>
            ))}
          </select>
        </div>
        <div className="col-3 col-12 col-md-4 col-lg-4 col-xl-4 pb-4">
          <select className="form-control" value={this.state.inicio + "-1"} id="fFin" onChange={this.handleChange}>
            <option value="-1" >Fecha Fin...</option>
            {this.state.fechas.map((dato, index) => (
              <option value={index + "-1"}>{dato}</option>
            ))}
          </select>
        </div>
        <div className="col-3 col-12 col-md-2 col-lg-2 col-xl-2">
          <button className="btn btn-primary" onClick={() => this.filtroGrafico3()}>Filtrar</button>
        </div>
      </div>
    </div>
  }


  render() {
    return <div>
      {this.mapasFiltros()}
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <br></br>
          <div className="form-control text-center"><b>Serie de Tiempo</b></div>
            <div id='myDiv2'></div>
        </div>
      </div>
      <div>
        <button type="button" className="btn btn-info btn-lg"
          data-toggle="modal" data-target="#myModal">Leyendas de la Tabla</button>

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-lg">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Diccionario</h4>
              </div>
              <div className="modal-body">
                <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <thead>
                    <tr>
                      <th>Abreviación</th>
                      <th>Definición</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TMax.</td>
                      <td>Temperatura máxima</td>
                    </tr>
                    <tr>
                      <td>TMin.</td>
                      <td>Temperatura minima</td>
                    </tr>
                    <tr>
                      <td>PMax.</td>
                      <td>Precipitación máxima</td>
                    </tr>
                    <tr>
                      <td>cdd</td>
                      <td>Días secos consecutivos</td>
                    </tr>
                    <tr>
                      <td>csdi</td>
                      <td>Duración de periodos frios</td>
                    </tr>
                    <tr>
                      <td>cwd</td>
                      <td>Días húmedos consecutivos</td>
                    </tr>
                    <tr>
                      <td>dtr</td>
                      <td>Rango diurno de temperatura</td>
                    </tr>
                    <tr>
                      <td>fd0</td>
                      <td>Días de helada</td>
                    </tr>
                    <tr>
                      <td>gsl</td>
                      <td>Duración de la estación de cultivo</td>
                    </tr>
                    <tr>
                      <td>id0</td>
                      <td>Días de hielo</td>
                    </tr>
                    <tr>
                      <td>prcptot</td>
                      <td>Precipitación total anual de los días humedos</td>
                    </tr>
                    <tr>
                      <td>r10mm</td>
                      <td>Días con precipitación mayor a 10mm</td>
                    </tr>
                    <tr>
                      <td>r20mm</td>
                      <td>Días con precipitación mayor a 20mm</td>
                    </tr>
                    <tr>
                      <td>r95p</td>
                      <td>Días muy húmedos</td>
                    </tr>
                    <tr>
                      <td>r99p</td>
                      <td>Días extremadamente humedos</td>
                    </tr>
                    <tr>
                      <td>r50mm</td>
                      <td>Días con precipitación mayor a 50mm</td>
                    </tr>
                    <tr>
                      <td>rx1day</td>
                      <td>Precipitación máxima en un día</td>
                    </tr>
                    <tr>
                      <td>rx5day</td>
                      <td>Precipitación máxima en cinco días</td>
                    </tr>
                    <tr>
                      <td>sdii</td>
                      <td>Índice simple de intensidad diaria</td>
                    </tr>
                    <tr>
                      <td>su25</td>
                      <td>Días de verano</td>
                    </tr>
                    <tr>
                      <td>tn10p</td>
                      <td>Noches frías</td>
                    </tr>
                    <tr>
                      <td>tn90p</td>
                      <td>Noches calientes</td>
                    </tr>
                    <tr>
                      <td>tnn</td>
                      <td>Temperatura minima extrema</td>
                    </tr>
                    <tr>
                      <td>txn</td>
                      <td>Temperatura mínima más alta</td>
                    </tr>
                    <tr>
                      <td>tr20</td>
                      <td>Noches tropicales</td>
                    </tr>
                    <tr>
                      <td>tx10p</td>
                      <td>Días frescos</td>
                    </tr>
                    <tr>
                      <td>tx90p</td>
                      <td>Días calurosos</td>
                    </tr>
                    <tr>
                      <td>tnx</td>
                      <td>Temperatura máxima mas baja</td>
                    </tr>
                    <tr>
                      <td>txx</td>
                      <td>Temperatura máxima extrema</td>
                    </tr>
                    <tr>
                      <td>wsdi</td>
                      <td>Duración de los periodos calidos</td>
                    </tr>
                    <tr>
                      <td>R2</td>
                      <td>Coeficiente de determinación (Cuanto más cerca de 1 se sitúe su valor, 
                        mayor será el ajuste del modelo a la variable que estamos intentando explicar)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
              </div>
            </div>

          </div>
        </div>
      </div>
      {this.renderTabla(this.state.data)}
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.cdd = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.csdi = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.cwd = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.dtr = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.fd0 = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.gsl = ctx} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.gsl2 = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.id0 = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.prcptot = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.r10mm = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.r20mm = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.r95p = ctx} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.r99p = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.r50mm = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.rx1day = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.rx5day = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.sdii = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.su25 = ctx} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tn10p = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tn90p = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tnn = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.txn = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tr20 = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tx10p = ctx} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tx90p = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.tnx = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.txx = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
          <canvas width="400" height="400" ref={ctx => this.wsdi = ctx} />
        </div>
      </div>
    </div>;
  }
}

// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#react');
ReactDOM.render(<Dashboard />, domContainer);