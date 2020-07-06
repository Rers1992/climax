class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: [],
            indicesOrdenados: [],
            vectorAños: [],
            nombreIndicesOrdenados: [],
            nombreIndices: ['cdd', 'csdi', 'cwd', 'dtr', 'fd0', 'gsl', 'gsl2', 'id0', 
              'prcptot', 'r10mm', 'r20mm', 'r95p', 'r99p', 'r50mm',
              'rx1day', 'rx5day', 'sdii', 'su25', 'tn10p', 'tn90p', 
              'tnn', 'txn', 'tr20', 'tx10p', 'tx90p', 'tnx', 'txx', 'wsdi']
        }
    }

    renderTabla(data){
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
        fetch('../indices2/'+$("#codigo").val())
          .then(response => response.json())
          .then(data => this.setState({data:data.indices}))
          .then(data => this.ordenarIndicesFuncion())
          
      }

  ordenarIndicesFuncion(){
    var indices = []
    var años = []
    var nombreIndices = [this.cdd, this.csdi, this.cwd, this.dtr, this.fd0, this.gsl, this.gsl2, this.id0, 
      this.prcptot, this.r10mm, this.r20mm, this.r95p, this.r99p, this.r50mm,
      this.rx1day, this.rx5day, this.sdii, this.su25, this.tn10p, this.tn90p, 
      this.tnn, this.txn, this.tr20, this.tx10p, this.tx90p, this.tnx, this.txx, this.wsdi]
    this.setState({nombreIndicesOrdenados:nombreIndices})
    for(let i = 0; i < 28; i++){
      indices[i] = []
    }
    for(let i = 0; i < this.state.data.length; i++){
      años.push(this.state.data[i]['ano'])
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
    }

    this.setState({indicesOrdenados:indices})
    this.setState({vectorAños:años})
    for(let i = 0; i < 28; i++){
      this.crearGrafico(this.state.nombreIndicesOrdenados[i], i)
    }
  }

  crearGrafico(valor, i){
    new Chart(valor, {
      type: 'line',
      data: {
          labels: this.state.vectorAños,
          datasets: [{
              label: this.state.nombreIndices[i],
              data: this.state.indicesOrdenados[i],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      }
  })
  }    

  render() {
    return  <div>
      {this.renderTabla(this.state.data)}
      <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.cdd = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.csdi = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.cwd = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.dtr = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.fd0 = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.gsl = ctx}/>
          </div>
          </div>
          <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.gsl2 = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.id0 = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.prcptot = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.r10mm = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.r20mm = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.r95p = ctx}/>
          </div>
          </div>
          <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.r99p = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.r50mm = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.rx1day = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.rx5day = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.sdii = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.su25 = ctx}/>
          </div>
          </div>
          <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tn10p = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tn90p = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tnn = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.txn = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tr20 = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tx10p = ctx}/>
          </div>
          </div>
          <div className="row">
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tx90p = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.tnx = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.txx = ctx}/>
          </div>
          <div className="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-2">
            <canvas width="400" height="400" ref={ctx => this.wsdi = ctx}/>
          </div>
      </div>
     </div>;
  }
}

// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#react');
ReactDOM.render(<Dashboard/>, domContainer);