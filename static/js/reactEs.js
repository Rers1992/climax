class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: []
        }
    }

    renderTabla(data){
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
          {data.map((dato) => (
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
        this.crearGrafico(this.mediaG, mediamax, mediamin, mediapre, años)
        this.crearGrafico(this.medianaG, medianamax, medianamin, medianapre, años)
        this.crearGrafico(this.modaG, modamax, modamin, modapre, años)
        this.crearGrafico(this.desEG, desviacionesmax, desviacionesmin, desviacionespre, años)
        this.crearGrafico(this.varianzaG, varianzamax, varianzamin, varianzapre, años)
    }

    crearGrafico(valor, temMax, temMin, Pre, años){
        new Chart(valor, {
          type: 'bar',
          data: {
              labels: años,
              datasets: [{
                  label: "Tem. Maxima",
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                  data: temMax
                }, {
                    label: "Tem. Minima",
                    backgroundColor: 'rgba(63, 121, 191, 0.2)',
                    borderColor: 'rgba(63, 121, 191, 1)',
                    borderWidth: 1,
                    data: temMin
                }, {
                    label: "Precipitación",
                    data: Pre,
                    backgroundColor: 'rgba(21, 255, 5, 0.2)',
                    borderColor: 'rgba(21, 255, 5, 1)',
                    borderWidth: 1
                },
            ]
          }
      })
      }

    componentDidMount() {
        fetch('../estadisticasJson/'+$("#codigo").val())
          .then(response => response.json())
          .then(data => this.setState({data:data.estadisticas}))
          .then(data => this.ordenarFuncion())
      }
      render() {
        return  <div>{this.renderTabla(this.state.data)}
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