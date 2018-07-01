import React from 'react';
import List from './List';
import AxiosApi from '../service/AxiosApi';
import Country from './CONSTANTS';


const CustButton = (props) => {
    return (
        <button type={props.type}>{props.lable}</button>
    )
};
const CustText = (props) => {
    return (
        <label>
            {props.fieldLable}:
            <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        </label>
    )
}

const CustDropDown = (props) => {
    const options = (value,key)=>{
        return(
            <option value={key} key={key} >{value}</option>
        )
    }
    
    return (
        <label>
            {props.fieldLable}:
            <select name={props.name} value={props.value} onChange={props.onChange} >
                {props.option.map((v,k)=>options(v,k))}
            </select>
        </label>
    )
}
class Form extends React.Component {
    state = {
        userName: '',
        userAge: '',
        userCountry:'3',
        reload: false,
        id:'',
        buttonText: "Save"
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ buttonText: 'Saving...' });
        let onUpdateDB  = val => {            
            setTimeout(() => {
                this.setState((prevState, props) => ({
                    reload: !prevState.reload,
                    userName: '',
                    userAge: '',
                    userCountry:3,
                    id:'',
                    buttonText: 'Save'
                }));
            }, 5000);
        };
        let createUser = ()=>{
            AxiosApi.post(`user`, { userName: this.state.userName, userAge: this.state.userAge,userCountry:this.state.userCountry })
                .then(onUpdateDB)
                .catch((e) => console.log(e));
        };
        let updateUser = ()=>{
            AxiosApi.put(`user/${this.state.id}`, { userName: this.state.userName, userAge: this.state.userAge,userCountry:this.state.userCountry })
                .then(onUpdateDB)
                .catch((e) => console.log(e));
        };
        if(this.state.id){
            updateUser();
        } else{
            createUser();
        }
        
    }

    updateUser(user){
        this.setState({
            userName:user.userName,
            userAge:user.userAge,
            userCountry:user.userCountry,
            id:user.id
        })


    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <CustText fieldLable = "Name" name="userName" value = {this.state.userName} onChange = {this.handleChange} />
                    <br />                    
                    <CustText fieldLable = "Age" name="userAge" value = {this.state.userAge} onChange = {this.handleChange} />
                    <br />
                    <CustDropDown name = "userCountry" fieldLable="Country" option={Country} value={this.state.userCountry} onChange = {this.handleChange} />
                    <br />
                    <CustButton type="submit" lable={this.state.buttonText} />
                    
                </form>
                <List reload={this.state.reload} onEdit = {this.updateUser.bind(this)}/>
            </div>
        )
    }
}


export default Form;    
