class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: [],
            estacion: [],
            latitud: 0,
            longitud: 0,
            fechas: [],
            temMaximas: [],
            temMinimas: [],
            precipitaciones: []
        }
    }

    renderDatosEstacion(dato){
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
              <td>{this.state.fechas[this.state.fechas.length -1]}</td>
            </tr>
            <tr>
              <td>Fecha de Fin de Datos</td>
              <td>{this.state.fechas[0]}</td>
            </tr>
            <tr>
              <td>Comentarios</td>
              <td>{dato.comentario}</td>
            </tr>
        </tbody>
      </table>;
    }

    renderTabla(){
        return <table className="table-bordered col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <thead>
          <tr>
            <th>año</th>
            <th>Media Tem. Max.</th>
            <th>Media Tem. Min.</th>
            <th>Media Precipitación</th>
            <th>Mediana Tem. Max.</th>
            <th>Mediana Tem. Min.</th>
            <th>Mediana Precipitación</th>
            <th>Moda Tem. Max.</th>
            <th>Moda Tem. Min.</th>
            <th>Moda Precipitación</th>
            <th>Desviación Es. Tem. Max.</th>
            <th>Desviación Es. Tem. Min.</th>
            <th>Desviación Es. Precipitación</th>
            <th>Varianza Tem. Max.</th>
            <th>Varianza Tem. Min.</th>
            <th>Varianza Precipitación</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((dato) => (
            <tr>
              <td>{dato.ano}</td>
              <td>{dato.mediamax}</td>
              <td>{dato.mediamin}</td>
              <td>{dato.mediapre}</td>
              <td>{dato.medianamax}</td>
              <td>{dato.medianamin}</td>
              <td>{dato.medianapre}</td>
              <td>{dato.modamax}</td>
              <td>{dato.modamin}</td>
              <td>{dato.modapre}</td>
              <td>{dato.desviacionesmax}</td>
              <td>{dato.desviacionesmin}</td>
              <td>{dato.desviacionespre}</td>
              <td>{dato.varianzamax}</td>
              <td>{dato.varianzamin}</td>
              <td>{dato.varianzapre}</td>
            </tr>
          ))}
        </tbody>
      </table>;
    }

    ordenarFuncion(){
        var mediamax = [], mediamin = [], mediapre = [], medianamax = [],
        medianamin = [], medianapre= [], modamax = [], modamin = [], modapre = [],
        desviacionesmax = [], desviacionesmin = [], desviacionespre = [], varianzamax = [], 
        varianzamin = [], varianzapre = []
        var años = []
        for(let i = 0; i < this.state.data.length; i++){
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
        this.crearGrafico(this.tiempo, this.state.temMaximas, this.state.temMinimas, this.state.precipitaciones, this.state.fechas)
        this.crearGrafico(this.mediaG, mediamax, mediamin, mediapre, años)
        this.crearGrafico(this.medianaG, medianamax, medianamin, medianapre, años)
        this.crearGrafico(this.modaG, modamax, modamin, modapre, años)
        this.crearGrafico(this.desEG, desviacionesmax, desviacionesmin, desviacionespre, años)
        this.crearGrafico(this.varianzaG, varianzamax, varianzamin, varianzapre, años)
    }

    crearGrafico(valor, temMax, temMin, Pre, años){
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

    componentDidMount() {
        fetch('../estadisticasJson/'+$("#codigo").val())
          .then(response => response.json())
          .then(data => this.setState({data:data.estadisticas, estacion:data.estacion, longitud:data.estacion.long, latitud:data.estacion.lat, 
          fechas: data.fechas, temMaximas: data.temMax, temMinimas: data.temMin, precipitaciones: data.preci}))
          .then(data => this.ordenarFuncion())
      }
      render() {
        return  <div>
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-5">
            <h2 className="text-center"><b>Información de la Estación Meteorológica</b></h2>
              {this.renderDatosEstacion(this.state.estacion)}
            </div>
            <div className="col-12 col-xs-12 col-sm-6 col-md-7 col-lg-7">
            <h2 className="text-center"><b>Ubicación estación</b></h2>
            <iframe width="800" height="280" src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyDx_FE31SZ6Ow8iI57vMSTOHJ823in0k3c&q='+
            this.state.latitud+','+this.state.longitud}></iframe>
            </div>
          </div>
            <div className="row">
              <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <br></br>
                <div className="form-control text-center"><b>Serie de Tiempo</b></div>
                <canvas width="400" height="100" ref={ctx => this.tiempo = ctx}/>
              </div>
            </div>
            <div></div>
          {this.renderTabla()}
        <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <br></br>
            <div className="form-control text-center">Media</div>
            <canvas width="400" height="400" ref={ctx => this.mediaG = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <br></br>
            <div className="form-control text-center">Mediana</div>
            <canvas width="400" height="400" ref={ctx => this.medianaG = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <br></br>
            <div className="form-control text-center">Moda</div>
            <canvas width="400" height="400" ref={ctx => this.modaG = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <br></br>
            <div className="form-control text-center">Desviación Estandar</div>
            <canvas width="400" height="400" ref={ctx => this.desEG = ctx}/>
          </div>
          </div>
          <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <br></br>
            <div className="form-control text-center">Varianza</div>
            <canvas width="400" height="400" ref={ctx => this.varianzaG = ctx}/>
          </div>
          </div>
        </div>
}
}
// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#react');
ReactDOM.render(<Dashboard/>, domContainer);