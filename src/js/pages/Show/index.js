import React from 'react';
import {NewsList} from '../../components/News';

class ShowPage extends React.Component {
  render() {
    return (
      <section className="page-ShowPage">
        <NewsList dataType="show" />
      </section>
    );
  }
}

export default ShowPage;
