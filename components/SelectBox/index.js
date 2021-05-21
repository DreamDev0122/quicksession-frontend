import React from 'react'

class SelectBox extends React.Component {

    constructor() {
        super();
        this.state = {
            city: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {

        this.props.onSelectChange(this.props.type, event.target.value);

    }

    submit() {
        console.warn(this.state)
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12	col-md-12	col-lg-12	col-xl-12">
                    <select className="form-control" style={{backgroundColor:'#308AB4', color:'white' , border:'none'}} name="city" onChange={this.handleInputChange}>
                        <option selected>{this.props.title}</option>
                        { this.props.list.map((ele) => (<option value={ele.key}> {ele.value} </option>)) }
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectBox;
