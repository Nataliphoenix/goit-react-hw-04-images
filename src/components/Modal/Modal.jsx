import { Component } from 'react';
import {Overley, ModalImg} from 'components/Modal/Modal.styled'
import PropTypes from 'prop-types';

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeModal);
        window.addEventListener('scroll', this.noScrollBody)
      }

      componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModal);
        window.removeEventListener('scroll', this.noScrollBody)
      }

      closeModal = e => {
        if (e.code === 'Escape') {
          this.props.onClose();
        }
      };

      clickOverlay = e => {
        if (e.target.nodeName !== 'IMG') {
          this.props.onClose();
        }
      };

      noScrollBody = e => {
        window.scrollTo(0,0);
      }


      render() {
        const { largeImage } = this.props;

            return (
          <Overley onClick={this.clickOverlay}>
            <ModalImg>
              <img src={largeImage} alt="modalImg" />
            </ModalImg>
          </Overley>
        );
        }
        }
        
    Modal.propTypes = {
        largeImage: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };