import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import useFormValidation from "../../hooks/useForm";

export default function RegisterModal({
  isOpen,
  activeModal,
  onClose,
  handleSignUp,
  onSuccessfulSignUpModal,
  onSignInClick,
}) {
  const defaultValues = {
    email: "",
    password: "",
    username: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleSignUp(values);
    }
    resetForm(defaultValues);
  };


  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="text"
          className="modal__input"
          id="_email"
          name="email"
          placeholder="Enter email"
          required
          onChange={handleChange}
          value={values.email || ""}
          autoComplete="on"
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="text"
          className="modal__input"
          id="_password"
          name="password"
          placeholder="Enter password"
          required
          onChange={handleChange}
          value={values.password || ""}
          autoComplete="on"
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Username{""}
        <input
          type="text"
          className="modal__input"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
          onChange={handleChange}
          value={values.username || ""}
          autoComplete="on"
        />
      </label>
      {errors.email && (
        <span className="modal__errors modal__errors-signup">
          Invalid email address
        </span>
      )}
      <div className="modal__btn_section">
        <button
          className={`modal__submit ${
            !isValid ? "modal__submit_disabled" : ""
          }`}
          type="submit"
          onClick={onSuccessfulSignUpModal}
        >
          Sign up
        </button>
        <div className="modal__btn_section">
          <p className="modal__btn-text">or</p>
          <button
            className="modal__sub-btn"
            type="button"
            onClick={onSignInClick}
          >
            Sign in
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}
