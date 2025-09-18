import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function RegisterModal({
  onClose,
  isOpen,
  handleSignUp,
  onSignInClick,
  activeModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    handleLogin({ email, password, name, avatarUrl });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      handleSignUp={handleSignUp}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="newemail"
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
          id="newpassword"
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
      <label className="modal__label" htmlFor="newname">
        Username{" "}
        <input
          type="text"
          className="modal__input"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={username}
          autoComplete="on"
          required
        />
      </label>
      <div className="button__container">
        <button
          type="submit"
          className="modal__submit"
          disabled={!email || !password || !name || !avatarUrl}
        >
          Sign Up{" "}
        </button>
        <div className="modal__btn_section">
        <p className="modal__btn-text">or</p>
        <button
          className="modal__btn_signup"
          type="button"
          onClick={onSignInClick}
        >
         Sign In
        </button>
        </div>
      </div>
    </ModalWithForm>
  );
}
