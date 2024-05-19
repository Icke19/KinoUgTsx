import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define interfaces for the form and errors
interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof LoginErrors]) {
      validateInput(name, value);
    }
  };

  const validateInput = (name: string, value: string) => {
    let tempErrors = { ...errors };
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      tempErrors.email = "Podaj poprawny adres email.";
    } else if (name === "password" && value.length < 6) {
      tempErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    } else {
      delete tempErrors[name as keyof LoginErrors];
    }
    setErrors(tempErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && form.email && form.password) {
      try {
        const response = await axios.post('http://localhost:5269/api/Account/login', form, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log('Response:', response); // Dodaj to logowanie, aby zobaczyć pełną odpowiedź
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert('User logged in successfully');
          navigate('/');
        } else {
          console.error('Token is missing in response');
          setGeneralError('Token is missing in response');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data);
          setGeneralError(error.response?.data.message || 'An unexpected error occurred. Please try again.');
        } else {
          console.error('Unexpected error:', error);
          setGeneralError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  const validateForm = (): LoginErrors => {
    let tempErrors: LoginErrors = {};
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
          {generalError && <div className="error">{generalError}</div>}
          <button className="submit">Zaloguj się</button>
        </form>
      </>
  );
}

export default Login;
