import React, {Component} from 'react';
import './App.css';
import Table from "./Table";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            customer: {
                'id': '',
                'price': '',
                'date': new Date().toLocaleDateString('en-CA'),
                'point': ''
            },
            list: []
        };

        this.addToList = this.addToList.bind(this);
        this.changeOnList = this.changeOnList.bind(this);
    }

    addToList = (event) => {
        event.preventDefault();

        this.setState(state => {
            const list = [...state.list, state.customer];

            // console.log(list);

            return {
                list,
                customer: {
                    'id': '',
                    'price': '',
                    'date': new Date().toLocaleDateString('en-CA'),
                    'point': ''
                }
            }
        })
    }

    changeOnList = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        if (nam === 'price') {
            this.setState(prevState => ({
                customer: {
                    ...prevState.customer,
                    price: val,
                    point: CalculatePoint(val)
                },
            }))
        }
        else {
            this.setState(prevState => ({
                customer : {
                    ...prevState.customer,
                    [nam] : val
                },
            }))
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>List of All Customers Transactions</h2>
                    <table>
                        <thead>
                        <tr>
                            <td width="150px">Customer Id</td>
                            <td width="150px">Price</td>
                            <td width="150px">Date</td>
                            <td width="150px">Reward Points</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.list.map((d, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{d.id}</td>
                                    <td>{d.price}</td>
                                    <td>{d.date}</td>
                                    <td>{d.point}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>


                <div>
                    <form onSubmit={this.addToList}>
                        <p>Enter Customer Id:</p>
                        <input
                            type = 'number'
                            name = 'id'
                            value = {this.state.customer.id}
                            onChange={this.changeOnList}
                        />
                        <p>Enter Customer Price:</p>
                        <input
                            type = 'number'
                            name = 'price'
                            value = {this.state.customer.price}
                            onChange={this.changeOnList}
                        />
                        <p>Enter Date:</p>
                        <input
                            type = 'date'
                            name = 'date'
                            value = {this.state.customer.date}
                            onChange={this.changeOnList}
                        />
                        <button
                            type='submit'
                            onSubmit={this.addToList}
                        >Submit</button>
                    </form>
                </div>

                <div>
                    <p/>

                    <Table list={this.state.list}/>
                </div>
            </div>
        );
    }
}

function CalculatePoint(price) {
    if (price <= 50) return 0;
    else if (price > 50 && price <= 100) return price - 50;
    else return (price - 100) * 2 + 50;
}

export default App;
