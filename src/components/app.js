import * as React from "react"
import {rawData} from "../data/raw.data"
import {Button} from "./button"

export class App extends React.Component {
  state = {
    csv: rawData,
    data: []
  }

  handleTextAreaChange = (ev) => {
    this.setState({
      csv: ev.target.value,
    })
  }

  generateReport = () => {
    console.log("start generate report...")    
    var rows = this.state.csv.split(/\n/);
    var empShare = 0;
    var compShare = 0;
    this.setState({data: 
      <div style={{padding: 15}}>
        <table style={tableStyle}>
          <thead>
            <tr>
            {rows[0].split(',').map((col) => {
              // I assume here that the columns titles are uniquely identified
              return <th key={col} style={theaderStyle}>{col}</th>
            })}
            </tr>
          </thead>
          <tbody style={tbodyStyle}>
            {rows.slice(1).map((row) => {
              // I assume here that every row is uniquely identified
              return <tr key={row} style={tbodyStyle}>{row.split(',').map((col) => {
                if (col.search('₪') !== -1) {
                  var price = Number(col.substring(1));
                  if (price <= 400) {
                    compShare += price;
                  }
                  else {
                    compShare += 400;
                    empShare += price - 400;
                  }
                }
                // I assume here that every column is uniquely identified
                return <td key={col} style={tbodyStyle}>{col}</td>
              })}</tr>
            })}
          </tbody>
          <tfoot>
            <tr>
              <th style={tfootStyle}>Employee's share:</th>
              <td style={tfootStyle}>{empShare}</td>
            </tr>
            <tr>
              <th style={tfootStyle}>Company's share:</th>
              <td style={tfootStyle}>{compShare}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    });
    console.log('ended report');
  }

  render() {
    const {csv, data} = this.state

    return <div className="flexbox-column" style={{padding: 16, alignItems: "left"}}>
      <div style={{fontSize: 24, paddingBottom: 16}}>10bis Report</div>

      <div style={{paddingBottom: 16, width: "100%"}}>
        <textarea style={{height: 200, width: "100%"}} value={csv} onChange={this.handleTextAreaChange.bind(this)}/>
      </div>

      <div>
        <Button onClick={this.generateReport} title="Generate Report"></Button>
      </div>
      
      {this.state.data}

    </div>
  }
}

var tableStyle = {
  "border": "1px solid black",
  "borderCollapse": "collapse"
};

var theaderStyle = {
  "border": "1px solid black",
  "padding": 5,
  "background": "#f3f3f3"
}

var tbodyStyle = {
  "border": "1px solid black",
  "textAlign": "right",
  "padding": 7
}

var tfootStyle = {
  "border": "1px solid black",
  "padding": 10
}
