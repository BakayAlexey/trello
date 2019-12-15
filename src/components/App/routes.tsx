import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Login } from '../Login';
import { Dashboard } from '../Dashboard';
import { NotFound } from '../NotFound';

export enum ROUTES_URLS {
  HOME = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  OAUTH = '/oauth',
  NOT_FOUND = '/404',
};

export interface AppRoute {
  path: ROUTES_URLS;
  render: (props: any) => any;
  title?: string;
  isHidden?: boolean;
  exact?: boolean;
  isProtected?: boolean;
}

export const routes: Array<AppRoute> = [
  {
    path: ROUTES_URLS.LOGIN,
    render: (props: RouteChildrenProps) => <Login {...props} />,
    title: 'Login',
  },
  {
    path: ROUTES_URLS.DASHBOARD,
    render: (props: RouteChildrenProps) => <Dashboard {...props} />,
    title: 'Dashboard',
    isProtected: true,
  },
  {
    path: ROUTES_URLS.HOME,
    render: () => <Redirect to={ROUTES_URLS.LOGIN} />,
    exact: true,
    isHidden: true,
  },
  {
    path: ROUTES_URLS.NOT_FOUND,
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
    isHidden: true,
  },
];
