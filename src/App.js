import React, {Component} from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expr: '',
			result: '0'
		};
	};

	sendExpr() {
		fetch('http://calc-webapp-lb/calculator', {
			method: 'POST',
      			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({expr: this.state.expr})
        	})
		.then(response => response.json())
		.then(data => this.setState(data));
	}

	handleClick(value) {
    	
		switch (value) {
			case '=': {
				this.sendExpr();
				break;
			}	 
			case 'SUP': {
				this.setState({expr:'', result:'0'});
				break;
			}
			case '.': {
				var count = this.state.expr.length;
				if (count === 0){
					var auxa = this.state.expr + '0';
					auxa = auxa + value;
                                	this.setState({expr:auxa});
					break;
				}
				if (this.state.expr.slice(-1) === '+' || this.state.expr.slice(-1) === '-' || this.state.expr.slice(-1) === 'x' || this.state.expr.slice(-1) === '÷'){
					var auxb = this.state.expr + '0';
                                	auxb = auxb + value;
                                	this.setState({expr:auxb});
                                	break;
				}
				
				var found = false;
				var posa = 0;
				var posb = 0;

				for (var i = count-1; i >= 0 && found === false; i--){
					if (this.state.expr.charAt(i) === '+' || this.state.expr.charAt(i) === '-' || this.state.expr.charAt(i) === 'x' || this.state.expr.charAt(i) === '÷'){
						posa = i;
						found = true;
					}	 
				}
				found = false;
				for (var j = count-1; j >= 0 && found === false; j--){
                                	if (this.state.expr.charAt(j) === '.'){
                                        	posb = j;
						found = true;
                                	}
                        	}
				if (posa >= posb) {
					var auxc = this.state.expr + value;
                        		this.setState({expr:auxc});
				}
				break;
			}
			default: {
				if (value === '+' || value === '-' || value === 'x' || value === '÷'){
					if (this.state.expr.length === 0){
						this.setState({expr:this.state.result + value})
						break;
					}
					if (this.state.expr.slice(-1) === '.'){
                                		var auxd = this.state.expr + '0';
                                		auxd = auxd + value;
                                		this.setState({expr:auxd});
                                		break;
					}
				}
				var auxe = this.state.expr + value;
				this.setState({expr:auxe});
				break;
			} 
		}
	}

	render() {
	
		const calcScreen = this.state.expr !== '' ?
				<input type="text" id="txtScreen" value={this.state.expr}/> :
				<input type="text" id="txtScreen" value={this.state.result}/>;

		return(
			<div id="calculator">
			{calcScreen}
				<div className="numericPad">
					<div className="rowsNumPad">
						<input type="button" value="7" className="btnNum" onClick={() => {this.handleClick("7")}} />
						<input type="button" value="8" className="btnNum" onClick={() => {this.handleClick("8")}} />
						<input type="button" value="9" className="btnNum" onClick={() => {this.handleClick("9")}} />
					</div>
					<div className="rowsNumPad">
						<input type="button" value="4" className="btnNum" onClick={() => {this.handleClick("4")}} />
						<input type="button" value="5" className="btnNum" onClick={() => {this.handleClick("5")}} />
						<input type="button" value="6" className="btnNum" onClick={() => {this.handleClick("6")}} />
					</div>
					<div className="rowsNumPad">
						<input type="button" value="1" className="btnNum" onClick={() => {this.handleClick("1")}} />
						<input type="button" value="2" className="btnNum" onClick={() => {this.handleClick("2")}} />
						<input type="button" value="3" className="btnNum" onClick={() => {this.handleClick("3")}} />
					</div>
					<div className="rowsNumPad">
						<input type="button" value="." className="btnNum" onClick={() => {this.handleClick(".")}} />
						<input type="button" value="0" className="btnNum" onClick={() => {this.handleClick("0")}} />
						<input type="button" value="SUP" className="btnNum" onClick={() => {this.handleClick("SUP")}} />
					</div>
				</div>

				<div className="funtionPad">
					<div className="rowsFuntionPad">
						<input type="button" value="÷" className="btnFuntionPad" onClick={() => {this.handleClick("÷")}} />
					</div>
					<div className="rowsFuntionPad">
						<input type="button" value="x" className="btnFuntionPad" onClick={() => {this.handleClick("x")}} />
					</div>
					<div className="rowsFuntionPad">
						<input type="button" value="-" className="btnFuntionPad" onClick={() => {this.handleClick("-")}} />
					</div>
					<div className="rowsFuntionPad">
						<input type="button" value="+" className="btnFuntionPad" onClick={() => {this.handleClick("+")}} />
					</div>
					<div className="rowsFuntionPad">
						<input type="button" value="=" className="btnEqual" onClick={() => {this.handleClick("=")}} />
					</div>
				</div>
			</div>
		)
	}
}

export default App;
