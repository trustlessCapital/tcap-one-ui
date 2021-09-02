import React, { Component } from 'react';

export default class FormDataComponent extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" className="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        )
    }
}