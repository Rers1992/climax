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
    this.setState({nombreIndicesOrdenados:nombreIndices})
    for(let i = 0; i < 28; i++){
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
    for(let i = 0; i < n; i++){
      años.push(this.state.data[i]['ano'])
      sumx +=  Number(this.state.data[i]['ano'])
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
    
    promx = sumx/n
    sigmax = Math.sqrt((sumx2/n - promx**2))
    for(let i = 0; i < 28; i++){
      promy[i] = sumy[i]/n
      m[i] = (sumx*sumy[i] - n*sumxy[i])/(sumx**2 - n*sumx2)
      b[i] = promy[i] - m[i] * promx
      sigmay[i] = Math.sqrt((sumy2[i]/n - promy[i]**2))
      sigmaxy[i] = sumxy[i]/n - promx* promy[i]
      r2[i] = (sigmaxy[i]/(sigmax*sigmay[i]))**2
    }
    var vectorB = []

    años.push(String(Number(años[n-1]) + 1))
    this.setState({indicesOrdenados:indices})
    this.setState({vectorAños:años})
    for(let i = 0; i < 28; i++){
      vectorB = []
      for(let j = 0; j< años.length; j++){
          vectorB.push(m[i] * años[j] + b[i])
      }
      this.crearGrafico(this.state.nombreIndicesOrdenados[i], i, vectorB, r2)
    }
  }

  crearGrafico(valor, i, vectorB, r2){
    new Chart(valor, {
      type: 'line',
      options: {
        title: {
          display: true,
          text: 'R2 = '+ r2[i]
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
            borderColor: 'rgba(63, 121, 191, 1)',
            borderWidth: 1,
            data: vectorB
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