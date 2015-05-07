import React from 'react';
import {NewsList} from '../../components/News';

class NewPage extends React.Component {
  render() {
    return (
      <section className="page-NewPage">
        <NewsList dataType="new" />
      </section>
    );
  }
}

export default NewPage;
