import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';
import { getFromLocalStorage, setToLocalStorage } from '../../utils';

const TOKEN_STORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;

interface Board {
  id: string;
  name: string;
  desc: string;
  pinned: boolean;
}

interface AppState {
  token: string;
  boards: Array<Board>;
  userProfile: any;
}

const INITIAL_STATE = {
  token: '',
  userProfile: undefined,
  boards: [],
};

class App extends React.Component<any, AppState> {
  public state = INITIAL_STATE;

  componentDidMount() {
    this.getToken();
  }

  private setToken = (token: string) => {
    this.setState({token});
    setToLocalStorage(TOKEN_STORAGE_KEY, token);
  };

  private getToken = async () => {
    if (this.state.token) {
      return;
    }

    const token = getFromLocalStorage(TOKEN_STORAGE_KEY);
    if (!token) {
      return this.navigateToLogin();
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
    const response = await fetch(url);
    if (response.ok === true && response.status === 200) {
      const userProfile = response.json();
      this.setProfile(userProfile);
      this.setToken(token);
      this.navigateToDashboard();
      return;
    }

    return this.navigateToLogin();
  };

  private navigateToLogin = () => {
    this.props.history.push(ROUTES_URLS.LOGIN);
  };

  private navigateToDashboard = () => {
    this.props.history.push(ROUTES_URLS.DASHBOARD);
  };

  private setProfile = (userProfile: any) => {
    this.setState({userProfile})
  };

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    return (
      <header>
        {routes.map(({path, title, isHidden}: AppRoute, i: number) => (
          isHidden ? null : <Link key={i} to={path}>{title}</Link>
        ))}
        <button onClick={this.logOut}>Log out</button>
      </header>
    );
  }

  private logOut = () => {
    this.setState(INITIAL_STATE);
    this.navigateToLogin();
  };

  private renderRoute = (route: AppRoute, i: number) => {
    const { path, render, exact, isProtected } = route;

    if (isProtected) {
      return (
        <ProtectedRoute
          key={i}
          path={path}
          render={(props) => render({...props, token: this.state.token})}
          exact={exact}
          isAuthenticated={this.isLoggedIn()} />
        );
    } else {
      return (
        <Route
          key={i}
          path={path}
          render={(props) => render({...props, token: this.state.token})}
          exact={exact} />
      );
    }
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map(this.renderRoute)}
          <Route path={ROUTES_URLS.OAUTH} render={(props:RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
          <Redirect to={ROUTES_URLS.NOT_FOUND} />
        </Switch>
        <h2>Test</h2>
      </main>
    );
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export { AppWithRouter as App };
