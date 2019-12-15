import React, { FunctionComponent } from 'react';
import { RouteChildrenProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { ROUTES_URLS } from '../App/routes';

interface OAuthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void,
}

export const OAuth: FunctionComponent<OAuthProps> = ({location: { hash }, onSetToken}: OAuthProps) => {
  const token = hash.split('=')[1];
  onSetToken(token);
  return (
    <Redirect to={ROUTES_URLS.DASHBOARD} />
  );
};
