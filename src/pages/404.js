import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <h1>Page introuvable</h1>
    <p>Cette page n&rsquo;existe pas (ou plus).</p>
  </Layout>
);

export default NotFoundPage;

export const Head = () => (
  <>
    <html lang="fr" />
    <title>404 — Page introuvable</title>
    <meta name="description" content="Page introuvable" />
  </>
);
