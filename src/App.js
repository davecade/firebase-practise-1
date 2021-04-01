import './App.css';
import React, { Fragment, Component } from 'react';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route } from 'react-router-dom';
import ShopPage from './shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends Component {
  
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  //-- sets default to null for unsubscribe from auth
  unsubscribeFromAuth = null;

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if(userAuth) {

        const userRef = await createUserProfileDocument(userAuth)

        // -- Snapshot takes a snapshot of the database at the specific userRef location in Firebase
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => console.log(this.state)) // -- console log just to see what the new state is
        })

      } else {
        this.setState({ currentUser: null })
      }
    })
  }

  // -- When component unmounts - unsubscribe
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </Fragment>
    )
  }

}

export default App;
