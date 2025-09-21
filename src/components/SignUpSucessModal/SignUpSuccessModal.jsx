import './SignUpSuccessModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function SignUpSuccess({ isOpen, onClose, handleSignIn }) {

    return(
        <ModalWithForm
        title="Registration successfully completed!"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={() => {
            handleSignIn();
        }}
        >
            <button
            onClick={handleSignIn}
            className="modal__btn-submit modal__btn-success">
                Sign in
            </button>
        </ModalWithForm>
    );
}

export default SignUpSuccess;