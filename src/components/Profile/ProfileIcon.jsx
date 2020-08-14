import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { makeTokenHeaders } from '../../utils/user';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    signOut = () => {
        const token = window.sessionStorage.getItem('token');

        fetch('http://localhost:3000/signout', {
            method: 'post',
            headers: makeTokenHeaders(token)
        })
            .then(resp => resp.json())
            .then(() => {
                this.props.onRouteChange('signout');
                window.sessionStorage.removeItem('token');
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-100 ba w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu
                        right
                        className="b--transparent shadow-5" 
                        style={{
                            marginTop: '25px',
                            backgroundColor: 'rgba(255, 255, 255, 0.5',
                            position: 'absolute',
                            willChange: 'transform',
                            top: '0px',
                            left: '0px',
                            transform: 'translate3d(-101px, 40px, 0px)'
                        }}
                    >
                        <DropdownItem 
                            onClick={this.props.toggleModal}
                        >
                            View Profile
                        </DropdownItem>
                        <DropdownItem 
                            onClick={this.signOut}
                        >
                            Sign Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

export default ProfileIcon;