import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"

export default function LoginModal( { onClose, isOpen, onLoginSubmit, switchToSignUp} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
    setEmail("");
    setPassword("");
 }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted")
        onLoginSubmit({email, password});
    }

    return (
         <ModalWithForm title="Login" buttonText="Log In" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="modal__label">
        Email{" "}
        <input type="email" className="modal__input" id="email" placeholder="Email"
          onChange={(e)=>{setEmail(e.target.value)}} value={email} required
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input type="password" className="modal__input" id="password" placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value)}} value={password} required
        />
      </label>
      <div className="button__container">
        <button className="modal__submit" type="submit" disabled={!email || !password}>Sign In</button>
        <button className="signup__button" type="button" onClick={switchToSignUp}>or Sign Up</button>
      </div>
    </ModalWithForm>
  )
}