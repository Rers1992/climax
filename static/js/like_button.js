class LikeButton extends React.Component {
    constructor(props){
        super(props)
        this.chartRef = React.createRef()
        this.state = {
            data: []
        }
    }

    renderTabla(data){
        return <table className="table">
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

    renderBotonesAños(data){
       return data.map((dato)=>
       <button className="btn btn-primary">{dato.ano}</button>
       )
    }

    componentDidMount() {
        fetch('indices2')
          .then(response => response.json())
          .then(data => this.setState({ data: data.indices})
          );
      }

  render() {
    return  <div>
     {this.renderBotonesAños(this.state.data)}   
     {this.renderTabla(this.state.data)}
     </div>;
  }
}

// Find all DOM containers, and render Like buttons into them.
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton/>, domContainer);
