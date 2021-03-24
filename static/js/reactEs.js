class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = {
      data: [],
      inicio: -1,
      fin: -1,
      estacion: [],
      latitud: 0,
      longitud: 0,
      fechas: [],
      temMaximas: [],
      temMinimas: [],
      precipitaciones: []
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

  renderTablaTemMax() {
    return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <caption><div className="form-control text-center">Temperatura Maxima</div></caption>
      <thead>
        <tr>
          <th>año</th>
          <th>Media</th>
          <th>Mediana</th>
          <th>Moda</th>
          <th>Desviación Estandar</th>
          <th>Varianza</th>
          <th>Q1</th>
          <th>Q3</th>
          <th>IQR</th>
          <th>Q1-1.5*IQR</th>
          <th>Inferiores</th>
          <th>Q3+1.5*IQR</th>
          <th>Superiores</th>
          <th>Q1-3*IQR</th>
          <th>Inferiores</th>
          <th>Q3+3*IQR</th>
          <th>Superiores</th>
          <th>Kstest</th>
          <th>P</th>
          <th>Shapiro</th>
          <th>P</th>
          <th>Coeficiente de Asimetria</th>
          <th>Kurtosis</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((dato) => (
          <tr>
            <td>{dato.ano}</td>
            <td>{dato.mediamax}</td>
            <td>{dato.medianamax}</td>
            <td>{dato.modamax}</td>
            <td>{dato.desviacionesmax}</td>
            <td>{dato.varianzamax}</td>
            <td>{dato.q1max}</td>
            <td>{dato.q3max}</td>
            <td>{dato.iqrmax}</td>
            <td>{(dato.q1max - 1.5 * dato.iqrmax).toFixed(1)}</td>
            <td>{dato.atipicoinfmax}</td>
            <td>{parseFloat(dato.q3max + 1.5 * dato.iqrmax).toFixed(1)}</td>
            <td>{dato.atipicosupmax}</td>
            <td>{(dato.q1max - 3 * dato.iqrmax).toFixed(1)}</td>
            <td>{dato.extremoinfmax}</td>
            <td>{parseFloat(dato.q3max + 3 * dato.iqrmax).toFixed(1)}</td>
            <td>{dato.extremosupmax}</td>
            <td>{dato.kstestmax}</td>
            <td>{dato.kstestpmax}</td>
            <td>{dato.shapiromax}</td>
            <td>{dato.shapiropmax}</td>
            <td>{((dato.mediamax - dato.modamax) / dato.desviacionesmax).toFixed(1)}</td>
            <td>{dato.kurtosismax}</td>
          </tr>
        ))}
      </tbody>
    </table>;
  }

  renderTablaTemMin() {
    return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <caption><div className="form-control text-center">Temperatura Minima</div></caption>
      <thead>
        <tr>
          <th>año</th>
          <th>Media</th>
          <th>Mediana</th>
          <th>Moda</th>
          <th>Desviación Estandar</th>
          <th>Varianza</th>
          <th>Q1</th>
          <th>Q3</th>
          <th>IQR</th>
          <th>Q1-1.5*IQR</th>
          <th>Inferiores</th>
          <th>Q3+1.5*IQR</th>
          <th>Superiores</th>
          <th>Q1-3*IQR</th>
          <th>Inferiores</th>
          <th>Q3+3*IQR</th>
          <th>Superiores</th>
          <th>Kstest</th>
          <th>P</th>
          <th>Shapiro</th>
          <th>P</th>
          <th>Coeficiente de Asimetria</th>
          <th>Kurtosis</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((dato) => (
          <tr>
            <td>{dato.ano}</td>
            <td>{dato.mediamin}</td>
            <td>{dato.medianamin}</td>
            <td>{dato.modamin}</td>
            <td>{dato.desviacionesmin}</td>
            <td>{dato.varianzamin}</td>
            <td>{dato.q1min}</td>
            <td>{dato.q3min}</td>
            <td>{dato.iqrmin}</td>
            <td>{(dato.q1min - 1.5 * dato.iqrmin).toFixed(1)}</td>
            <td>{dato.atipicoinfmin}</td>
            <td>{parseFloat(dato.q3min + 1.5 * dato.iqrmin).toFixed(1)}</td>
            <td>{dato.atipicosupmin}</td>
            <td>{(dato.q1min - 3 * dato.iqrmin).toFixed(1)}</td>
            <td>{dato.extremoinfmin}</td>
            <td>{parseFloat(dato.q3min + 3 * dato.iqrmin).toFixed(1)}</td>
            <td>{dato.extremosupmin}</td>
            <td>{dato.kstestmin}</td>
            <td>{dato.kstestpmin}</td>
            <td>{dato.shapiromin}</td>
            <td>{dato.shapiropmin}</td>
            <td>{((dato.mediamin - dato.modamin) / dato.desviacionesmin).toFixed(1)}</td>
            <td>{dato.kurtosismin}</td>
          </tr>
        ))}
      </tbody>
    </table>;
  }

  renderTablaPre() {
    return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <caption><div className="form-control text-center">Precipitación</div></caption>
      <thead>
        <tr>
          <th>año</th>
          <th>Media</th>
          <th>Mediana</th>
          <th>Moda</th>
          <th>Desviación Estandar</th>
          <th>Varianza</th>
          <th>Q1</th>
          <th>Q3</th>
          <th>IQR</th>
          <th>Q1-1.5*IQR</th>
          <th>Inferiores</th>
          <th>Q3+1.5*IQR</th>
          <th>Superiores</th>
          <th>Q1-3*IQR</th>
          <th>Inferiores</th>
          <th>Q3+3*IQR</th>
          <th>Superiores</th>
          <th>Kstest</th>
          <th>P</th>
          <th>Shapiro</th>
          <th>P</th>
          <th>Coeficiente de Asimetria</th>
          <th>Kurtosis</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((dato) => (
          <tr>
            <td>{dato.ano}</td>
            <td>{dato.mediapre}</td>
            <td>{dato.medianapre}</td>
            <td>{dato.modapre}</td>
            <td>{dato.desviacionespre}</td>
            <td>{dato.varianzapre}</td>
            <td>{dato.q1pre}</td>
            <td>{dato.q3pre}</td>
            <td>{dato.iqrpre}</td>
            <td>{(dato.q1pre - 1.5 * dato.iqrpre).toFixed(1)}</td>
            <td>{dato.atipicoinfpre}</td>
            <td>{parseFloat(dato.q3pre + 1.5 * dato.iqrpre).toFixed(1)}</td>
            <td>{dato.atipicosuppre}</td>
            <td>{(dato.q1pre - 3 * dato.iqrpre).toFixed(1)}</td>
            <td>{dato.extremoinfpre}</td>
            <td>{parseFloat(dato.q3pre + 3 * dato.iqrpre).toFixed(1)}</td>
            <td>{dato.extremosuppre}</td>
            <td>{dato.kstestpre}</td>
            <td>{dato.kstestppre}</td>
            <td>{dato.shapiropre}</td>
            <td>{dato.shapiroppre}</td>
            <td>{((dato.mediapre - dato.modapre) / dato.desviacionespre).toFixed(1)}</td>
            <td>{dato.kurtosispre}</td>
          </tr>
        ))}
      </tbody>
    </table>;
  }

  ordenarFuncion() {
    var mediamax = [], mediamin = [], mediapre = [], medianamax = [],
      medianamin = [], medianapre = [], modamax = [], modamin = [], modapre = [],
      desviacionesmax = [], desviacionesmin = [], desviacionespre = [], varianzamax = [],
      varianzamin = [], varianzapre = []
    var años = []
    for (let i = 0; i < this.state.data.length; i++) {
      años.push(this.state.data[i]['ano'])
      mediamax.push(this.state.data[i]['mediamax'])
      mediamin.push(this.state.data[i]['mediamin'])
      mediapre.push(this.state.data[i]['mediapre'])
      medianamax.push(this.state.data[i]['medianamax'])
      medianamin.push(this.state.data[i]['medianamin'])
      medianapre.push(this.state.data[i]['medianapre'])
      modamax.push(this.state.data[i]['modamax'])
      modamin.push(this.state.data[i]['modamin'])
      modapre.push(this.state.data[i]['modapre'])
      desviacionesmax.push(this.state.data[i]['desviacionesmax'])
      desviacionesmin.push(this.state.data[i]['desviacionesmin'])
      desviacionespre.push(this.state.data[i]['desviacionespre'])
      varianzamax.push(this.state.data[i]['varianzamax'])
      varianzamin.push(this.state.data[i]['varianzamin'])
      varianzapre.push(this.state.data[i]['varianzapre'])
    }
    this.crearGrafico2('myDiv2', this.state.temMaximas, this.state.temMinimas,
      this.state.precipitaciones, this.state.fechas, 'line')
    this.crearGrafico2('myDiv1', this.state.temMaximas, this.state.temMinimas,
      this.state.precipitaciones, this.state.fechas, 'histogram')
    this.crearGrafico3(this.tiempoC, this.state.temMaximas, this.state.temMinimas,
      this.state.precipitaciones, this.state.fechas, 'boxplot')
    this.crearGrafico(this.mediaG, mediamax, mediamin, mediapre, años, 'line')
    this.crearGrafico(this.medianaG, medianamax, medianamin, medianapre, años, 'line')
    this.crearGrafico(this.modaG, modamax, modamin, modapre, años, 'line')
    this.crearGrafico(this.desEG, desviacionesmax, desviacionesmin, desviacionespre, años, 'line')
    this.crearGrafico(this.varianzaG, varianzamax, varianzamin, varianzapre, años, 'line')
  }

  crearGrafico2(valor, temMax, temMin, Pre, años, grafico) {
    var y0 = temMax;
    var y1 = temMin;
    var y2 = Pre;

    var trace1 = {
      x:años,
      y: y0,
      type: grafico,
      marker: {color: 'rgba(255, 99, 132, 0.2)'},
      name:'Tem. Maxima'
    };

    var trace2 = {
      x:años,
      y: y1,
      type: grafico,
      marker: {color: 'rgba(63, 121, 191, 0.2)'},
      name:'Tem. Minima'
    };

    var trace3 = {
      x:años,
      y: y2,
      type: grafico,
      marker: {color: 'rgba(21, 255, 5, 0.2)'},
      name:'Precipitacion'
    };

    var data = [trace1, trace2, trace3];

    Plotly.newPlot(valor, data);
  }

  crearGrafico3(valor, temMax, temMin, Pre, años, grafico) {
    var y0 = temMax;
    var y1 = temMin;
    var y2 = Pre;

    var trace1 = {
      y: y0,
      type: 'box',
      marker: {color: 'rgba(255, 99, 132, 0.2)'},
      name:'Tem. Maxima'
    };

    var trace2 = {
      y: y1,
      type: 'box',
      marker: {color: 'rgba(63, 121, 191, 0.2)'},
      name:'Tem. Minima'
    };

    var trace3 = {
      y: y2,
      type: 'box',
      marker: {color: 'rgba(21, 255, 5, 0.2)'},
      name:'Precipitacion'
    };

    var data = [trace1, trace2, trace3];

    Plotly.newPlot('myDiv', data);
  }

  crearGrafico(valor, temMax, temMin, Pre, años, grafico) {
    if (grafico == 'bar') {
      new Chart(valor, {
        type: grafico,
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
        },
        options: {
          scales: {
            xAxes: [{
              display: false,
              barPercentage: 1.3,
              ticks: {
                max: 3,
              }
            }, {
              display: true,
              ticks: {
                autoSkip: false,
                max: 4,
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    } else {
      new Chart(valor, {
        type: grafico,
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
        },
        options: {
          responsive: true,
          legend: {
            position: 'top',
          }
        }
      })
    }

  }

  componentDidMount() {
    fetch('../estadisticasJson/' + $("#codigo").val())
      .then(response => response.json())
      .then(data => this.setState({
        data: data.estadisticas, estacion: data.estacion, longitud: data.estacion.long, latitud: data.estacion.lat,
        fechas: data.fechas, temMaximas: data.temMax, temMinimas: data.temMin, precipitaciones: data.preci
      }))
      .then(data => this.ordenarFuncion())
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
      this.crearGrafico3(this.tiempoC, temMax, temMin, pre, fechas, 'boxplot')
      this.crearGrafico2('myDiv2', temMax, temMin, pre, fechas, 'line')
      this.crearGrafico2('myDiv1', temMax, temMin, pre, fechas, 'histogram')
    } else {
      alert("La fecha de fin no puede ser menor a la de inicio")
    }
  }

  render() {
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
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <br></br>
          <div className="form-control text-center"><b>Serie de Tiempo</b></div>
          <div id='myDiv2'></div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <br></br>
          <div className="form-control text-center"><b>Serie de Tiempo Histograma</b></div>
          <div id='myDiv1'></div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <br></br>
          <div className="form-control text-center"><b>Serie de Tiempo Caja</b></div>
          <div id='myDiv'></div>
        </div>
      </div>
      <div></div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          {this.renderTablaTemMax()}
        </div>
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          {this.renderTablaTemMin()}
        </div>
        <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          {this.renderTablaPre()}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <br></br>
          <div className="form-control text-center">Media</div>
          <canvas width="400" height="400" ref={ctx => this.mediaG = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <br></br>
          <div className="form-control text-center">Mediana</div>
          <canvas width="400" height="400" ref={ctx => this.medianaG = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <br></br>
          <div className="form-control text-center">Moda</div>
          <canvas width="400" height="400" ref={ctx => this.modaG = ctx} />
        </div>
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <br></br>
          <div className="form-control text-center">Desviación Estandar</div>
          <canvas width="400" height="400" ref={ctx => this.desEG = ctx} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <br></br>
          <div className="form-control text-center">Varianza</div>
          <canvas width="400" height="400" ref={ctx => this.varianzaG = ctx} />
        </div>
      </div>
    </div>
  }
}
// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#react');
ReactDOM.render(<Dashboard />, domContainer);