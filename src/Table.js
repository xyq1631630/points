import React, {Component} from 'react';

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total: [],
            one: [],
            two: [],
            three: []
        }

        this.showAll = this.showAll.bind(this);
    }

    showAll() {
        //d1 is the range from one month ago to today
        let d1 = new Date((new Date).setMonth((new Date).getMonth() - 1));
        let d2 = new Date((new Date).setMonth((new Date).getMonth() - 2));
        let d3 = new Date((new Date).setMonth((new Date).getMonth() - 3));

        //filter
        //Select all the transaction from three months ago to today.
        let listOfLastThreeMonths = this.props.list.filter(customer => new Date(customer.date) >= d3);

        //total
        //Use reduce function to add all the points based on customer Id
        let total = Array.from(listOfLastThreeMonths
            .reduce((c, {id, point}) => c.set(id, (c.get(id) || 0) + point), new Map), ([id, point]) => ({id, point})
        );

        let one = Array.from(listOfLastThreeMonths
            .filter(customer => new Date(customer.date) >= d1)
            .reduce((c, {id, point}) => c.set(id, (c.get(id) || 0) + point), new Map), ([id, point]) => ({id, point})
        );

        let two = Array.from(listOfLastThreeMonths
            .filter(customer => new Date(customer.date) < d1  && new Date(customer.date) >= d2)
            .reduce((c, {id, point}) => c.set(id, (c.get(id) || 0) + point), new Map), ([id, point]) => ({id, point})
        );

        let three = Array.from(listOfLastThreeMonths
            .filter(customer => new Date(customer.date) < d2)
            .reduce((c, {id, point}) => c.set(id, (c.get(id) || 0) + point), new Map), ([id, point]) => ({id, point})
        );

        this.setState(state => {
            return {
                total,
                one,
                two,
                three
            }
        })
    }

    render() {
        // console.log(this.props.list)

        return (
            <div>

                <button onClick={this.showAll}>Show Reward Points</button>

                <div>
                    <h2>List of Total Reward Points in Three Months</h2>
                    <table>
                        <thead>
                        <tr>
                            <td width="300px">Customer Id</td>
                            <td width="300px">Reward Points</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.total.map(function(d, idx){
                            return (
                                <tr key={idx}>
                                    <td>{d.id}</td>
                                    <td>{d.point}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>List of Total Reward Points in Last Month</h3>
                    <table>
                        <thead>
                        <tr>
                            <td width="300px">Customer Id</td>
                            <td width="300px">Reward Points</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.one.map(function(d, idx){
                            return (
                                <tr key={idx}>
                                    <td>{d.id}</td>
                                    <td>{d.point}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>List of Total Reward Points in Two Months Ago</h3>
                    <table>
                        <thead>
                        <tr>
                            <td width="300px">Customer Id</td>
                            <td width="300px">Reward Points</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.two.map(function(d, idx){
                            return (
                                <tr key={idx}>
                                    <td>{d.id}</td>
                                    <td>{d.point}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>List of Total Reward Points in Three Months Ago</h3>
                    <table>
                        <thead>
                        <tr>
                            <td width="300px">Customer Id</td>
                            <td width="300px">Reward Points</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.three.map(function(d, idx){
                            return (
                                <tr key={idx}>
                                    <td>{d.id}</td>
                                    <td>{d.point}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Table