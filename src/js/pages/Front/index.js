import React from 'react';
import {NewsList} from '../../components/News';

class FrontPage extends React.Component {
  render() {
    return (
      <section className="page-FrontPage">
        <NewsList />
      </section>
    );
  }
}

export default FrontPage;
