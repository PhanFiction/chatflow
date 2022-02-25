import React from 'react';
import PropTypes from 'prop-types';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Sidebar from './Sidebar';

export default class Layout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div css={
        css`
          margin-left: 25%;
          margin-top: 5%;
        `
      }
      >
        <Sidebar />
        <div>
          {children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
