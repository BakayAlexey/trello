import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Login } from '../Login';
import { Dashboard } from '../Dashboard';
import { NotFound } from '../NotFound';
import { OAuth } from '../OAuth';

export interface AppRoute {
  path: string,
  render: (props: any) => any,
  title?: string,
  isHidden?: boolean,
  exact?: boolean,
}

export const routes: Array<AppRoute> = [
  {
    path: '/login',
    render: (props: RouteChildrenProps) => <Login {...props} />,
    title: 'Login',
  },
  {
    path: '/dashboard',
    render: (props: RouteChildrenProps) => <Dashboard {...props} />,
    title: 'Dashboard',
  },
  {
    path: '/',
    render: () => <Redirect to="/login" />,
    exact: true,
    isHidden: true,
  },
  {
    path: '/404',
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
    isHidden: true,
  },
];
