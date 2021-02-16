// import 'devextreme/dist/css/dx.common.css';
// import './themes/generated/theme.base.css';
// import './themes/generated/theme.additional.css';
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import appInfo from './app-info';
import { navigation } from './app-navigation';
import routes from './app-routes';
import './App.scss';
import './dx-styles.scss';
import { Footer, LoginForm } from './components';
import themes from "devextreme/ui/themes";

import {
  SideNavOuterToolbar as SideNavBarLayout,
  SingleCard
} from './layouts';
import { sizes, subscribe, unsubscribe } from './utils/media-query';

const LoginContainer = ({ logIn }) => <LoginForm onLoginClick={logIn} />;

const NotAuthPage = (props) => (
  <SingleCard>
    <Route render={() => <LoginContainer {...props} />} />
  </SingleCard>
);

const AuthPage = (props) => (
  <SideNavBarLayout menuItems={navigation} title={appInfo.title} {...props}>
    <Switch>
      {routes.map(item => (
        <Route
          exact
          key={item.path}
          path={item.path}
          component={item.component}
        />
      ))}
      <Redirect to={'/home'} />
    </Switch>
    <Footer>
      Copyright © 2011-2019 Developer Express Inc.
      <br />
      All trademarks or registered trademarks are property of their
      respective owners.
    </Footer>
  </SideNavBarLayout>
);

class App extends Component {
  constructor(props) {
    super(props);

    let currentTheme = window.localStorage.getItem("dx-theme") || "material.purple.dark.compact";
    
    this.state = {
      loggedIn: true,
      screenSizeClass: this.getScreenSizeClass(),
      darkMode: currentTheme === "material.purple.dark.compact" ? false : true
    };

    this.userMenuItems = [
      {
        text: 'Profile',
        icon: 'user'
      },
      {
        text: 'Logout',
        icon: 'runner',
        onClick: this.logOut
      },
      {
        text: 'Toggle Theme',
        icon: 'fill',
        onClick: this.toggleTheme
      }
    ];
  }
  toggleTheme = () => {
    window.localStorage.setItem("dx-theme", !this.state.darkMode ? "material.purple.dark.compact" : 'material.teal.light');
    themes.current(window.localStorage.getItem("dx-theme"));
    this.setState({ darkMode: !this.state.darkMode });
      
  };
  componentDidMount() {
    subscribe(this.screenSizeChanged);
  }

  componentWillUnmount() {
    unsubscribe(this.screenSizeChanged);
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div className={`dx-theme-background-color app ${this.state.screenSizeClass}`}>
        <Router>{loggedIn ? <AuthPage userMenuItems={this.userMenuItems} /> : <NotAuthPage logIn={this.logIn} />}</Router>
      </div>
    );
  }

  getScreenSizeClass() {
    const screenSizes = sizes();
    return Object.keys(screenSizes).filter(cl => screenSizes[cl]).join(' ');
  }

  screenSizeChanged = () => {
    this.setState({
      screenSizeClass: this.getScreenSizeClass()
    });
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  logOut = () => {
    this.setState({ loggedIn: false });
  };
}

export default App;
