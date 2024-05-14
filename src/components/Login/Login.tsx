import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (errors[name]) {
      validateInput(name, value);
    }
  };

  const validateInput = (name, value) => {
    let tempErrors = { ...errors };
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      tempErrors.email = "Podaj poprawny adres email.";
    } else if (name === "password" && value.length < 6) {
      tempErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    } else {
      delete tempErrors[name];
    }
    setErrors(tempErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && form.email && form.password) {
      // Można tu dodać logikę związana z autentykacją...
      console.log("Form submitted");
      alert("Logowanie się powiodło!");
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      tempErrors.email = "Podaj poprawny adres email.";
    }
    if (form.password.length < 6) {
      tempErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }
    return tempErrors;
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="header">
          <div className="text">Logowanie</div>
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Hasło"
            value={form.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
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
        <button className="submit">Zaloguj się</button>
        <ul>
          <li className="create-account">
            <Link to="/register">
              Nie posiadasz jeszcze konta? <span>Zarejestruj się!</span>
            </Link>
          </li>
        </ul>
      </form>
    </>
  );
}

export default Login;
