$(document).ready(function() {
  //$('#fInicio').select2();
  //$('#fFin').select2();
});

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
      precipitaciones: [],
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

  renderTablaTemMax() {
    return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <caption><div className="form-control text-center">Temperatura Maxima</div></caption>
      <thead>
        <tr>
          <th>año</th>
          <th>Media</th>
          <th>Mediana</th>
          <th>Moda</th>
          <th>D.E.</th>
          <th>Var</th>
          <th>Q1</th>
          <th>Q3</th>
          <th>IQR</th>
          <th>Q1-1.5*IQR</th>
          <th>InfA</th>
          <th>Q3+1.5*IQR</th>
          <th>SupA</th>
          <th>Q1-3*IQR</th>
          <th>InfE</th>
          <th>Q3+3*IQR</th>
          <th>SupE</th>
          <th>Kstest</th>
          <th>P</th>
          <th>Shapiro</th>
          <th>P</th>
          <th>C.A.</th>
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
          <th>D.E.</th>
          <th>Var</th>
          <th>Q1</th>
          <th>Q3</th>
          <th>IQR</th>
          <th>Q1-1.5*IQR</th>
          <th>InfA</th>
          <th>Q3+1.5*IQR</th>
          <th>SupA</th>
          <th>Q1-3*IQR</th>
          <th>InfE</th>
          <th>Q3+3*IQR</th>
          <th>SupE</th>
          <th>Kstest</th>
          <th>P</th>
          <th>Shapiro</th>
          <th>P</th>
          <th>C.A.</th>
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
          <th>D.E.</th>
          <th>Var</th>
          <th>Q1</th>
          <th>Q3</th>
          <th>IQR</th>
          <th>Q1-1.5*IQR</th>
          <th>InfA</th>
          <th>Q3+1.5*IQR</th>
          <th>SupA</th>
          <th>Q1-3*IQR</th>
          <th>InfE</th>
          <th>Q3+3*IQR</th>
          <th>SupE</th>
          <th>Kstest</th>
          <th>P</th>
          <th>Shapiro</th>
          <th>P</th>
          <th>C.A.</th>
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


  crearGrafico2(valor, temMax, temMin, Pre, años, grafico) {
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


  ordenarFuncion() {
    var mediamax = [], mediamin = [], mediapre = [], medianamax = [],
      medianamin = [], medianapre = [], modamax = [], modamin = [], modapre = [],
      desviacionesmax = [], desviacionesmin = [], desviacionespre = [], varianzamax = [],
      varianzamin = [], varianzapre = []
    var años = []
    for (let i = 1; i < this.state.data.length; i++) {
      años.push(this.state.data[i]['ano'])
      mediamax.push(this.state.data[i]['mediamax'])
      mediamin.push(this.state.data[i]['mediamin'])
      mediapre.push((parseInt(
        this.state.data[i]['mediamin'])+parseInt(this.state.data[i]['mediamax']))/2)
      medianamax.push(this.state.data[i]['medianamax'])
      medianamin.push(this.state.data[i]['medianamin'])
      medianapre.push(
        parseInt(this.state.data[i]['medianamax'])+parseInt(this.state.data[i]['medianamin'])/2)
      //modamax.push(this.state.data[i]['modamax'])
      //modamin.push(this.state.data[i]['modamin'])
      //modapre.push(this.state.data[i]['modapre'])
      desviacionesmax.push(this.state.data[i]['desviacionesmax'])
      desviacionesmin.push(this.state.data[i]['desviacionesmin'])
      desviacionespre.push(
        (parseInt(this.state.data[i]['desviacionesmax'])+parseInt(this.state.data[i]['desviacionesmin']))/2)
      varianzamax.push(this.state.data[i]['varianzamax'])
      varianzamin.push(this.state.data[i]['varianzamin'])
      varianzapre.push((parseInt(
        this.state.data[i]['varianzamax'])+parseInt(this.state.data[i]['varianzamin']))/2)
    }
    //this.crearGrafico2('myDiv2', this.state.temMaximas, this.state.temMinimas,
    //  this.state.precipitaciones, this.state.fechas, 'line')
    var arrayTemMedia = []
    for (let j = 0; j < (this.state.temMaximas).length; j++) {
      arrayTemMedia.push((parseInt(this.state.temMinimas[j]) + parseInt(this.state.temMaximas[j])) / 2)
    }
    this.crearGrafico2('myDiv2', this.state.temMaximas, this.state.temMinimas,
      arrayTemMedia, this.state.fechas, 'line')
    this.crearGraficoHistograma('myDiv1', this.state.temMaximas, this.state.temMinimas,
      arrayTemMedia, this.state.fechas, 'histogram')
    this.crearGrafico3(this.tiempoC, this.state.temMaximas, this.state.temMinimas,
      arrayTemMedia, this.state.fechas, 'boxplot')
    this.crearGrafico(this.mediaG, mediamax, mediamin, mediapre, años, 'line')
    this.crearGrafico(this.medianaG, medianamax, medianamin, medianapre, años, 'line')
    //this.crearGrafico(this.modaG, modamax, modamin, modapre, años, 'line')
    this.crearGrafico(this.desEG, desviacionesmax, desviacionesmin, desviacionespre, años, 'line')
    this.crearGrafico(this.varianzaG, varianzamax, varianzamin, varianzapre, años, 'line')
  }

  ordenarFuncionPre() {
    var mediamax = [], mediamin = [], mediapre = [], medianamax = [],
      medianamin = [], medianapre = [], modamax = [], modamin = [], modapre = [],
      desviacionesmax = [], desviacionesmin = [], desviacionespre = [], varianzamax = [],
      varianzamin = [], varianzapre = []
    var años = []
    for (let i = 1; i < this.state.data.length; i++) {
      años.push(this.state.data[i]['ano'])
      mediapre.push(this.state.data[i]['mediapre'])
      medianapre.push(this.state.data[i]['medianapre'])
      //modapre.push(this.state.data[i]['modapre'])
      desviacionespre.push(this.state.data[i]['desviacionespre'])
      varianzapre.push(this.state.data[i]['varianzapre'])
    }

    this.crearGrafico2Pre('myDiv2', this.state.precipitaciones, this.state.fechas, 'line')
    this.crearGraficoHistogramaPre('myDiv1', this.state.precipitaciones, this.state.fechas, 'histogram')
    this.crearGrafico3Pre(this.tiempoC, this.state.precipitaciones, this.state.fechas, 'boxplot')
    this.crearGraficoPre(this.mediaG, mediapre, años, 'line')
    this.crearGraficoPre(this.medianaG, medianapre, años, 'line')
    //this.crearGrafico(this.modaG, modamax, modamin, modapre, años, 'line')
    this.crearGraficoPre(this.desEG, desviacionespre, años, 'line')
    this.crearGraficoPre(this.varianzaG, varianzapre, años, 'line')
  }


  crearGraficoHistograma(valor, temMax, temMin, Pre, años, grafico) {
    var trace1 = {
      x: temMax,
      type: grafico,
      marker: { color: 'rgba(255, 99, 132, 0.2)' },
      name: 'Tem. Maxima'
    };

    var trace2 = {
      x: temMin,
      type: grafico,
      marker: { color: 'rgba(63, 121, 191, 0.2)' },
      name: 'Tem. Minima'
    };

    var trace3 = {
      x: Pre,
      type: grafico,
      marker: { color: 'rgba(21, 255, 5, 0.2)' },
      name: 'Tem. Media'
    };
    var layout = { barmode: "overlay" };

    var data = [trace1, trace2, trace3, layout];

    var layout = {
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: "overlay",
      //title: "Sampled Results", 
      xaxis: { title: "Valores de Medición" },
      yaxis: { title: "Count" }
    };

    Plotly.newPlot(valor, data, layout);
  }


  crearGraficoHistogramaPre(valor, Pre, años, grafico) {
    var trace3 = {
      x: Pre,
      type: grafico,
      marker: { color: 'rgba(21, 255, 5, 0.2)' },
      name: 'Precipitacion'
    };
    var layout = { barmode: "overlay" };

    var data = [trace3, layout];

    var layout = {
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: "overlay",
      //title: "Sampled Results", 
      xaxis: { title: "Valores de Medición" },
      yaxis: { title: "Count" }
    };

    Plotly.newPlot(valor, data, layout);
  }


  crearGrafico3(valor, temMax, temMin, Pre, años, grafico) {
    var y0 = temMax;
    var y1 = temMin;
    var y2 = Pre;

    var trace1 = {
      y: y0,
      type: 'box',
      marker: {
        color: 'rgba(255, 99, 132, 0.2)',
        outliercolor: 'rgba(219, 64, 82, 0.6)',
        line: {
          outliercolor: 'rgba(219, 64, 82, 1.0)',
          outlierwidth: 2
        }
      },
      name: 'Tem. Maxima',
      boxpoints: 'suspectedoutliers'
    };

    var trace2 = {
      y: y1,
      type: 'box',
      marker: {
        color: 'rgba(63, 121, 191, 0.2)',
        outliercolor: 'rgba(219, 64, 82, 0.6)',
        line: {
          outliercolor: 'rgba(219, 64, 82, 1.0)',
          outlierwidth: 2
        }
      },
      name: 'Tem. Minima',
      boxpoints: 'suspectedoutliers'
    };

    var trace3 = {
      y: y2,
      type: 'box',
      marker: {
        color: 'rgba(21, 255, 5, 0.2)',
        outliercolor: 'rgba(219, 64, 82, 0.6)',
        line: {
          outliercolor: 'rgba(219, 64, 82, 1.0)',
          outlierwidth: 2
        }
      },
      name: 'Tem. Media',
      boxpoints: 'suspectedoutliers'
    };

    var data = [trace1, trace2, trace3];

    Plotly.newPlot('myDiv', data);
  }


  crearGrafico3Pre(valor, Pre, años, grafico) {
    var y2 = Pre;

    var trace3 = {
      y: y2,
      type: 'box',
      marker: {
        color: 'rgba(21, 255, 5, 0.2)',
        outliercolor: 'rgba(219, 64, 82, 0.6)',
        line: {
          outliercolor: 'rgba(219, 64, 82, 1.0)',
          outlierwidth: 2
        }
      },
      name: 'Precipitacion',
      boxpoints: 'suspectedoutliers'
    };

    var data = [trace3];

    Plotly.newPlot('myDiv', data);
  }


  crearGrafico(valor, temMax, temMin, Pre, años, grafico) {
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
            label: "Tem. Media",
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


  crearGraficoPre(valor, Pre, años, grafico) {
    new Chart(valor, {
      type: grafico,
      data: {
        labels: años,
        datasets: [{
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
        this.crearGrafico3(this.tiempoC, temMax, temMin, temMed, fechas, 'boxplot')
        this.crearGrafico2('myDiv2', temMax, temMin, temMed, fechas, 'line')
        this.crearGraficoHistograma('myDiv1', temMax, temMin, temMed, fechas, 'histogram')
      }else{
        this.crearGrafico3Pre(this.tiempoC, pre, fechas, 'boxplot')
        this.crearGrafico2Pre('myDiv2', pre, fechas, 'line')
        this.crearGraficoHistogramaPre('myDiv1', pre, fechas, 'histogram')
      }
      
    } else {
      alert("La fecha de fin no puede ser menor a la de inicio")
    }
  }


  temPreFun(){
    if(this.state.temPre){
      this.setState({temPre:false, temPreMensaje:"Ver Temperatura"})
      this.ordenarFuncionPre()
    }else{
      this.setState({temPre:true, temPreMensaje:"Ver Precipitación"})
      this.ordenarFuncion()
    }
    
  }

  tablasTemPreFun(){
    if(this.state.temPre){
      return <div className="row">
      <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {this.renderTablaTemMax()}
      </div>
      <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {this.renderTablaTemMin()}
      </div>
    </div>
    }else{
      return <div className="row">
      <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
        {this.renderTablaPre()}
      </div>
    </div>
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

  leyendasTabla() {
    return <div>
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
                    <td>D.E.</td>
                    <td>Desviación estandar</td>
                  </tr>
                  <tr>
                    <td>Var</td>
                    <td>Varianza</td>
                  </tr>
                  <tr>
                    <td>Q1</td>
                    <td>Primer cuartil</td>
                  </tr>
                  <tr>
                    <td>Q3</td>
                    <td>Tercer cuartil</td>
                  </tr>
                  <tr>
                    <td>IQR</td>
                    <td>Rango inter cuartil</td>
                  </tr>
                  <tr>
                    <td>Q1-1.5*IQR</td>
                    <td>Valores atipicos inferiores</td>
                  </tr>
                  <tr>
                    <td>InfA</td>
                    <td>conteo de valores por debajo del valor de Q1-1.5*IQR</td>
                  </tr>
                  <tr>
                    <td>Q3+1.5*IQR</td>
                    <td>Valores atipicos superiores</td>
                  </tr>
                  <tr>
                    <td>SupA</td>
                    <td>conteo de valores por encima del valor de Q3+1.5*IQR</td>
                  </tr>
                  <tr>
                    <td>Q1-3*IQR</td>
                    <td>Valores extremos inferiores</td>
                  </tr>
                  <tr>
                    <td>InfE</td>
                    <td>conteo de valores por debajo del valor de Q1-3*IQR</td>
                  </tr>
                  <tr>
                    <td>Q3+3*IQR</td>
                    <td>Valores extremos superiores</td>
                  </tr>
                  <tr>
                    <td>SupE</td>
                    <td>conteo de valores por encima del valor de Q3+3*IQR</td>
                  </tr>
                  <tr>
                    <td>C.A.</td>
                    <td>Coeficiente de asimetría</td>
                  </tr>
                  <tr>
                    <td>Kstest</td>
                    <td>Prueba de normalidad de Kolmogorov-Smirnov</td>
                  </tr>
                  <tr>
                    <td>shapiro</td>
                    <td>Prueba de normalidad de Shapiro Wilk</td>
                  </tr>
                  <tr>
                    <td>p</td>
                    <td>El valor p es una probabilidad que mide la evidencia
                      en contra de la hipótesis nula. Un valor p más pequeño
                      proporciona una evidencia más fuerte en contra de la
                      hipótesis nula.</td>
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
        <div className="row">
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <br></br>
            <div className="form-control text-center"><b>Distribucion de Variables</b></div>
            <div id='myDiv1'></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <br></br>
            <div className="form-control text-center"><b>Diagrama de Cajas</b></div>
            <div id='myDiv'></div>
          </div>
        </div>
        <br></br>
        {this.leyendasTabla()}
        {this.tablasTemPreFun()}
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
          {/*<div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <br></br>
          <div className="form-control text-center">Moda</div>
          <canvas width="400" height="400" ref={ctx => this.modaG = ctx} />
        </div>*/}
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <br></br>
            <div className="form-control text-center">Desviación Estandar</div>
            <canvas width="400" height="400" ref={ctx => this.desEG = ctx} />
          </div>
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