import React from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../utils';
import { RouteChildrenProps } from 'react-router';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { routes, AppRoute } from './Routes';
import { OAuth } from '../OAuth';

const TOKEN_STORAGE_KEY = 'TOKEN';

interface Board {
  id: string;
  name: string;
  desc: string;
  pinned: boolean;
}

interface AppState {
  token: string;
  boards: Array<Board>;
}

export class App extends React.Component<any, AppState> {
  public state = {
    token: '',
    boards: [],
  };

  private setToken = (token: string) => {
    this.setState({token});
  };

  private renderHeader() {
    return (
      <header>
        {routes.map(({path, title, isHidden}: AppRoute, i: number) => (
          isHidden ? null : <Link key={i} to={path}>{title}</Link>
        ))}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map(({path, render, exact}: AppRoute, i: number) => (
            <Route
              key={i}
              path={path}
              render={(props) => render({...props, token: this.state.token})}
              exact={exact} />
          ))}
          <Route path="/oauth" render={(props:RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
          <Redirect to="/404" />
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
