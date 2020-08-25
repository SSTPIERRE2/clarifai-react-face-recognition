import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Navigation, Logo, ImageLinkForm, Rank, FaceRecognition, SignIn, Register } from './components';
import './App.css';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import { getLoadAuthenticatedUser } from './utils/user';
import { apiRequest } from './utils/api';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');

    if (token) {
      apiRequest(`signin`, 'post', token)
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            getLoadAuthenticatedUser(data.id, token, this.loadUser, this.onRouteChange)
          }
        })
        .catch(console.log)
    }
  }

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(region => {
        const clarifaiFace = region.region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
    
        return {
          id: region.id,
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
    }
    return [];
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    const token = window.sessionStorage.getItem('token');
    this.setState({ imageURL: this.state.input });

    apiRequest(`imageurl`, 'post', token, {
      input: this.state.input
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          apiRequest(`image`, 'put', token, {
            id: this.state.user.id
          })
            .then(response => response.json())
            .then(count => {
              this.setState({ 
                user: {
                  ...this.state.user,
                  entries: count
                }
              });
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);  
    } else if (route ==='home') {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        ...data
      }
    })
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  render() {
    const { isSignedIn, imageURL, route, boxes, isProfileOpen, user } = this.state;

    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile 
              toggleModal={this.toggleModal}
              user={user}
              loadUser={this.loadUser}
            />
          </Modal>
        )}
        {route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition 
                imageURL={imageURL} 
                boxes={boxes} 
              />
            </div>
          : (
              route === 'signin' || route === 'signout'
                ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
