import React from 'react';
import './Profile.css';
import { makeTokenHeaders } from '../../utils/user';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }
        console.log(`profile`, this.props.user);
    }

    onFormChange = (event) => {
        // console.log(`onFormChange`, event, event.target.name);
        switch(event.target.name) {
            case 'userName':
                this.setState({ name: event.target.value });
                break;
            case 'age':
                this.setState({ age: event.target.value });
                break;
            case 'pet':
                this.setState({ pet: event.target.value });
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        console.log(`onProfileUpdate`, data);
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: makeTokenHeaders(window.sessionStorage.getItem('token')),
            body: JSON.stringify({ formInput: data })
        }).then(resp => {
            console.log(`profile has been updated in db`, resp);
            if (resp.status === 200 || resp.status === 304) {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data });
            }
        }).catch(console.log)
    }

    render() {
        const { user, toggleModal } = this.props;

        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
                    <main className="pa4 black-80">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="h3 w3 dib" alt="avatar" 
                    />
                    <h1>{this.state.name}</h1>
                    <h4>{`Images Submitted: ${user.entries}`}</h4>
                    <p>{`Member since: ${!!user.joined && new Date(user.joined).toLocaleDateString()}`}</p>
    
                    <hr />
    
                    <label className="mt2 fw6" htmlFor="userName">Name:</label>
                    <input 
                        onChange={this.onFormChange}
                        className="pa2 ba w-100"
                        placeholder={user.name}
                        type="text" 
                        name="userName"  
                        id="name"
                    />
                    <label className="mt2 fw6" htmlFor="age">Age:</label>
                    <input 
                        onChange={this.onFormChange}
                        className="pa2 ba w-100"
                        placeholder={user.age || 'Enter age'}
                        type="text" 
                        name="age"  
                        id="age"
                    />
                    <label className="mt2 fw6" htmlFor="pet">Pet:</label>
                    <input 
                        onChange={this.onFormChange}
                        className="pa2 ba w-100"
                        placeholder={user.pet || 'Enter pet name'}
                        type="text" 
                        name="pet"  
                        id="pet"
                    />
                    <div className="mt4" style={{ display: "flex", justifyContent: 'space-evenly' }}>
                        <button 
                            className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                            onClick={() => this.onProfileUpdate({ ...this.state })}
                        >
                            Save
                        </button>
                        <button 
                            className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                    </div>
                    </main>
                    <div className="modal-close" onClick={toggleModal}>&times;</div>
                </article>
            </div>
        )
    }
}

export default Profile;