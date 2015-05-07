import React from 'react';
import {NewsList} from '../../components/News';

class JobPage extends React.Component {
  render() {
    return (
      <section className="page-JobPage">
        <NewsList dataType="jobs" />
      </section>
    );
  }
}

export default JobPage;
