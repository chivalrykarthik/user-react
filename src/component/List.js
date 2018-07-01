import React from 'react';
import Data from '../service/Data';
import axios from 'axios';
import Axapi from '../service/AxiosApi';
import Country from './CONSTANTS'

class List extends React.Component {
    state = { users: [], rows: <tr><td></td><td></td><td></td></tr> };
    constructor(props) {
        super(props);
        this.data = new Data();
        this.getUsersList = this.getUsersList.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentWillReceiveProps(props){
        
        if(props.reload !== this.props.reload){
            this.getUsers();
        }
        
    }
    
    async getUsersList() {
        
        let users = await this.data.getUsers()
        let i=0;
        this.setState({
            rows: users.resp.map(user => {
                return <tr key = {i++}><td id = {'a'+i++}>{user.name}</td><td id = {'b'+i++}>{user.age}</td></tr>
            })
        });


    }
    async getUsers(){
        /*axios.get('http://localhost:8000/user').then(users=>{
            console.log(users.data.resp)
        })*/
        let users;
        try{
            users = await Axapi.get(`user`);
        } catch(e){
            users = {data:{resp:[]}}
        }

        this.setState({
            rows: users.data.resp.map((user,index)=>{
                return (<tr key={index} >
                            <td>{user.userName}</td>
                            <td>{user.userAge}</td>
                            <td>{Country[user.userCountry]}</td>
                            <td><a href="javascript:void(0)" onClick={()=>{this.props.onEdit(user)}}>Edit</a></td>

                        </tr>)
            })
        })
    }
    componentDidMount() {
            this.getUsers();
    }

    /*componentWillUpdate(){
        console.log(this.state.users)
        this.rows = this.state.users.map(user=>{
            
            return <tr><td>{user.name}</td><td>{user.age}</td></tr>
        })
    }*/

    render() {
        return (
            <div>
                <h2>Users List</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>&nbsp;</th>
                        </tr>
                        {this.state.rows}

                    </tbody>
                </table>
            </div>
        )

    }

}

export default List;
