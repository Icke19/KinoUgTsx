import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [triedToSubmit, setTriedToSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (triedToSubmit) {
      validateInput(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTriedToSubmit(true);
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted");
      alert("Rejestracja zakończona pomyślnie!");
      // Tu można dodać logikę związana z rejestracją użytkownika
    }
  };

  const validateInput = (name, value) => {
    const tempErrors = { ...errors };
    if (name === "email") {
      tempErrors.email = /^\S+@\S+.\S+$/.test(value)
        ? ""
        : "Podaj poprawny adres email.";
    } else if (name === "username") {
      tempErrors.username = value.trim()
        ? ""
        : "Nazwa użytkownika jest wymagana.";
    } else if (name === "password") {
      tempErrors.password =
        value.length >= 6 ? "" : "Hasło musi mieć co najmniej 6 znaków.";
    } else if (name === "confirmPassword") {
      tempErrors.confirmPassword =
        value === form.password ? "" : "Hasła nie są identyczne.";
    }
    setErrors(tempErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^\S+@\S+.\S+$/.test(form.email)) {
      newErrors.email = "Podaj poprawny adres email.";
    }
    if (!form.username.trim()) {
      newErrors.username = "Nazwa użytkownika jest wymagana.";
    }
    if (form.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Hasła nie są identyczne.";
    }
    return newErrors;
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">Rejestracja</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <input
            className="input"
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Nazwa użytkownika"
            value={form.username}
            onChange={handleInputChange}
          />
          {errors.username && <div className="error">{errors.username}</div>}
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Hasło"
            value={form.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Potwierdź hasło"
            value={form.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        <div>
          <label htmlFor="check" className="check">
            Pokaż hasło
          </label>
          <input
            id="check"
            className="checkbox"
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
        </div>
        <button className="submit">Zarejestruj się.</button>
        <ul>
          <li className="have-account">
            <Link to="/login">
              Masz już konto? <span>Zaloguj się!</span>
            </Link>
          </li>
        </ul>
      </form>
    </>
  );
}

export default Register;
