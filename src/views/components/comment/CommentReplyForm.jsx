import React from 'react';

import TextField from '../formElements/TextField';
import SquareButton from '../formElements/SquareButton';

const T = React.PropTypes;

export default class CommentReplyForm extends React.Component {
  static propTypes = {
    onReplySubmit: T.func.isRequired,
    onContentChange: T.func.isRequired,
    onClose: T.func.isRequired,
    buttonText: T.string,
    value: T.string,
    error: T.string,
    submitting: T.bool,
  };

  static defaultProps = {
    buttonText: 'Submit',
    value: '',
    error: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonEnabled: !!props.value,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(e) {
    const value = e.target.value;
    this.props.onContentChange(value);

    this.setState({
      buttonEnabled: !!value,
    });
  }

  render() {
    const { error } = this.props;

    return (
      <div className='CommentReplyForm'>
        { this.renderTextBox() }
        { error ? this.renderError() : null }
        <div className='CommentReplyForm__footer clearfix'>
          { this.renderClose() }
          { this.renderButton() }
        </div>
      </div>
    );
  }

  renderTextBox() {
    const { value } = this.props;

    return (
      <div className='CommentReplyForm__textarea'>
        <TextField
          onChange={ this.handleFormChange }
          value={ value }
          placeholder='Your comment'
        />
      </div>
    );
  }

  renderError() {
    const { error } = this.props;

    return <div className='CommentReplyForm__error'>{ error }</div>;
  }

  renderClose() {
    return (
      <div
        className='CommentReplyForm__close icon-x'
        onClick={ this.props.onClose }
      />
    );
  }

  renderButton() {
    const { buttonText, submitting } = this.props;
    const { buttonEnabled } = this.state;

    const text = submitting ? 'submitting...' : buttonText;
    return (
      <div className='CommentReplyForm__button'>
        <SquareButton
          text={ text }
          enabled={ buttonEnabled }
          onClick={ this.props.onReplySubmit }
        />
      </div>
    );
  }
}
