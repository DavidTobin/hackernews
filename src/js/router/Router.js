import {Route, DefaultRoute, default as ReactRouter} from 'react-router';
import React from 'react';
import {HeaderSidebarLayout} from '../layout';
import {FrontPage, NewPage, ShowPage, JobsPage, UserPage} from '../pages';

class Router {
  constructor(node) {
    this.node = node;
  }

  getRoutes() {
    return (
      <Route handler={HeaderSidebarLayout} path="/">
        <DefaultRoute name="frontpage" handler={FrontPage} />

        <Route name="new" path="/new" handler={NewPage} />
        <Route name="jobs" path="/jobs" handler={JobsPage} />
        <Route name="show" path="/show" handler={ShowPage} />

        <Route name="user" path="/user/:user" handler={UserPage} />
      </Route>
    );
  }

  run(callback) {
    ReactRouter.run(this.getRoutes(), ReactRouter.HistoryLocation, (Handler, state) => {
      let params = state.params;

      React.render(<Handler params={params} />, this.node);
    });

    if (callback) {
      callback.apply(this);
    }
  }
}

export default Router;
