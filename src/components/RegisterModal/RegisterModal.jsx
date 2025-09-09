import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegisterModalSubmit,
  switchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatarUrl("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    onRegisterModalSubmit({ email, password, name, avatarUrl });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="newemail"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="newpassword"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
      </label>
      <label className="modal__label" htmlFor="newname">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="newname"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
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
        <button className="login__button" type="button" onClick={switchToLogin}>
          or Sign In
        </button>
      </div>
    </ModalWithForm>
  );
}
