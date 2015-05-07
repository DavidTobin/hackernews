import React from 'react';

class UserPage extends React.Component {
  render() {
    console.log(this.context.router);
    return (
      <section className="page-User">
        <h1>User Page</h1>
      </section>
    );
  }
}

UserPage.contextTypes = {
  router: React.PropTypes.func
};

export default UserPage;
