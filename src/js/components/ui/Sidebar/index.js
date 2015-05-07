import React from 'react';
import {NavigationMenu} from '../../menu';

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="ui-Sidebar">
        <NavigationMenu />
      </aside>
    );
  }
}

export default Sidebar;
