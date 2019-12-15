import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { ROUTES_URLS } from '../App/routes';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ render, isAuthenticated, ...rest }: ProtectedRouteProps) => {
  return (
    <Route
      {...rest}
      render={
        (routeComponentProps: RouteComponentProps) =>
          isAuthenticated ? (
            render!(routeComponentProps)
          ) : (
            <Redirect to={{
              pathname: ROUTES_URLS.LOGIN,
              state: { from: routeComponentProps.location }
            }} />
          )
      }
    />
  );
};
