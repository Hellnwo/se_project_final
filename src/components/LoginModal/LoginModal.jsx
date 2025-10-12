import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './LoginModal.css';
import useFormValidation from "../../hooks/useForm";

export default function LoginModal({
  isOpen,
  activeModal,
  onClose,
  handleSignIn,
  onSignUpClick,
  onSignInClick,
}) {
 const defaultValues = {
    email: "",
    password: "",
  };

 const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleSignIn(values);
    }
    resetForm(defaultValues);
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      onSignInClick={onSignInClick}
      name={"sign-in"}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="text"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter email"
          required
          onChange={handleChange}
          value={values.email || ""}
          autoComplete="on"
        />
        {errors.email && (
          <span className="modal__errors">Invalid email address</span>
        )}
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="text"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          onChange={handleChange}
          value={values.password || ""}
          autoComplete="on"
        />
        {errors.password && (
          <span className="modal__errors">Invalid password address</span>
        )}
      </label>
      <div className="modal__btn-section">
        <button
          className={`modal__submit ${
            !isValid ? "modal__submit_disabled" : ""
          }`}
          type="submit"
        >
          Sign in
        </button>
        <div className="modal__btn_section">
          <p className="modal__btn-text">or</p>
          <button
            className="modal__sub-btn"
            type="button"
            onClick={onSignUpClick}
          >
            Sign up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}
