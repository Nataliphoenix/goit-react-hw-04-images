import { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ColorRingContainer } from './Loader.styled';

export class Loader extends Component {
  render() {
    return (
      <ColorRingContainer>
        <ColorRing
          visible={true}
          height="160"
          width="160"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </ColorRingContainer>
    );
  }
}
