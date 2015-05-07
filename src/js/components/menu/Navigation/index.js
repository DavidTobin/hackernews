import React from 'react';
import {Link} from 'react-router';

class NavigationMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      navigationElements: []
    };
  }

  render() {
    return (
      <menu className="menu menu-Navigation">
        <ul>
          <li>
            <Link to="frontpage">Frontpage</Link>
          </li>

          <li>
            <Link to="new">New</Link>
          </li>

          <li>
            <Link to="show">Show</Link>
          </li>

          <li>
            <Link to="jobs">Jobs</Link>
          </li>
        </ul>
      </menu>
    );
  }
}

export default NavigationMenu;
