import React from 'react';
import Form from './Form';

class MainComponent extends React.Component {

    constructor() {
        super();
        setTimeout(() => {
            //this.state.listProp="new prop";


        }, 5000)
    }
    render() {
        return (
            <div>
                <h1>
                    Usert Management
            </h1>
                <Form />
            </div>


        )
    }

}
export default MainComponent;