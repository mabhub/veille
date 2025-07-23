import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <h1>Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;

export const Head = () => (
  <>
    <html lang="fr" />
    <title>404: Not Found</title>
    <meta name="description" content="Page not found" />
  </>
);
