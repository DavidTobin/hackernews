import React from 'react';
import moment from 'moment';

import CommentsList from '../List';

class CommentsListItem extends React.Component {
  constructor() {
    super();

    this.comment = {};

    this.state = {
      comment: this.comment
    };
  }

  componentDidMount() {
    this.api = new Firebase('https://hacker-news.firebaseio.com/v0/item/' + this.props.commentId);

    this.api.on('value', this.onApiValue.bind(this));
  }

  componentWillUnmount() {
    this.api.off();
  }

  render() {
    if (this.state.comment && this.state.comment.id) {
      return (
        <article className={this.getClassList()}>
          <div className="row">
            <div className="col-sm-12">
              <div className="actions">
                <p>
                  {this.state.comment.by}

                  <small className="pull-right">{this.getDate()}</small>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="comment"  dangerouslySetInnerHTML={{__html: this.state.comment.text || ''}}></div>

              {this.getChildComments()}
            </div>
          </div>
        </article>
      );
    } else {
      return (<article className={this.getClassList(true)}></article>);
    }
  }

  getChildComments() {
    if (this.state.comment.kids && this.state.comment.kids.length && (this.getDepth() + 1) < 5) {
      return (
        <section className="Comments-SubComments">
          <CommentsList comments={this.state.comment.kids} depth={this.getDepth() + 1} load={true} />
        </section>
      );
    }
  }

  getDepth() {
    return this.props.depth || 1;
  }

  getDate() {
    return moment(this.state.comment.time * 1000).fromNow();
  }

  getClassList(hide) {
    let classList = ['Comments-ListItem'];

    if (this.props.depth) {
      classList.push('depth-' + this.props.depth);
    }

    if (hide) {
      classList.push('hide');
    }

    return classList.join(' ');
  }

  onApiValue(child) {
    this.comment = child.val();

    this.setState({
      comment: this.comment
    });
  }
}

CommentsListItem.propTypes = {
  commentId: React.PropTypes.number,
  depth: React.PropTypes.number
};

export default CommentsListItem;
