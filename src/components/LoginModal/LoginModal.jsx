import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './LoginModal.css';
import useForm from "../../hooks/useForm";

export default function LoginModal({
  onClose,
  isOpen,
  handleSignIn,
  onSignUpClick,
  onSignInClick,
  activeModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    handleSignIn({ email, password });
  };

  return (
    <ModalWithForm
      title="Login"
      name={"sign-in"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      handleSignIn={handleSignIn}
      onSignInClick={onSignInClick}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          autoComplete="on"
          required
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          autoComplete="on"
          required
        />
      </label>
      <div className="modal__btn_container">
        <button
          className="modal__submit"
          type="submit"
          disabled={!email || !password}
        >
          Sign In
        </button>
        <div className="modal__btn_section">
        <p className="modal__btn-text">or</p>
        <button
          className="modal__btn_signup"
          type="button"
          onClick={onSignUpClick}
        >
         Sign Up
        </button>
        </div>
      </div>
    </ModalWithForm>
  );
}
