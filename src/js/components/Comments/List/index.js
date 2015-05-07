import React from 'react';
import CommentsListItem from '../ListItem';

class CommentsList extends React.Component {

  render () {
    return (
      <section className="Comments-List">
        {this.props.comments.filter(this.shouldLoad.bind(this)).map((commentId) => {
          return (<CommentsListItem key={commentId} commentId={commentId} />);
        })}
      </section>
    );
  }

  shouldLoad() {
    return this.props.load === true;
  }
}

CommentsList.propTypes = {
  comments: React.PropTypes.arrayOf(React.PropTypes.number),
  load: React.PropTypes.bool
};

export default CommentsList;
