import { Component } from 'react';
import {Overley, ModalImg} from 'components/Modal/Modal.styled'
import PropTypes from 'prop-types';

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeModal);
        document.body.style.overflow = "hidden";
      }

      componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModal);
        document.body.style.overflow = "";
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