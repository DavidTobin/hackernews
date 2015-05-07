import React from 'react';
import {RouteHandler} from 'react-router';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

class HeaderSidebarLayout extends React.Component {
  render() {
    return (
      <section className="layout-HeaderSidebar">
        <Header />

        <div className="layout-row --header-sidebar">
          <Sidebar />

          <main>
            <RouteHandler {...this.props} />
          </main>
        </div>
      </section>
    );
  }
}

export default HeaderSidebarLayout;
