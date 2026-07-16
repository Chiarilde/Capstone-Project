import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.png";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* ---------------- LOGIN ---------------- */
    const handleLogin = async () => {
        try {
            const response = await fetch(baseUrl + "/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user._id);
                navigate("/");
            } else {
                alert(data.message || "Errore login");
            }
        } catch (err) {
            console.error(err);
        }
    };

    /* ---------------- REGISTER ---------------- */
    const handleRegister = async () => {
        try {
            const response = await fetch(baseUrl + "/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registrazione riuscita");
                setIsRegister(false);
            } else {
                alert(data.message || "Errore registrazione");
            }
        } catch (err) {
            console.error(err);
        }
    };

    /* ---------------- GOOGLE AUTH ---------------- */
    const handleGoogleLogin = async (idToken) => {
        try {
            const response = await fetch(baseUrl + "/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken: idToken,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                alert(data.message || "Errore Google login");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-page">
                <img src={logo} alt="Retreat Hut logo" className="logo" />
                <div className="login-intro">
                    <h1>
                        <span className="colors">Welcome to Retreat Hut</span>
                    </h1>
                </div>
                <p>
                    Retreat Hut è la piattaforma dedicata a chi desidera vivere
                    esperienze autentiche in luoghi straordinari. Esplora
                    retreat e location selezionate in destinazioni come{" "}
                    <strong>Indonesia</strong>, <strong>Spagna</strong>,
                    <strong> Portogallo</strong>, <strong>Marocco</strong> e{" "}
                    <strong>Italia</strong>, dove natura, sport e benessere si
                    incontrano.
                </p>

                <p>
                    Dallo <i>yoga</i> al tramonto sul trabucco al <i>surf</i>,
                    dal <i>wing foil</i> al <i>SUP</i>, ogni destinazione offre
                    attività pensate per rigenerare corpo e mente.
                </p>

                <p className="login-call">
                    Registrati o accedi per scoprire tutte le strutture
                    disponibili, prenotare la tua prossima esperienza e far
                    parte della community di Retreat Hut. 👉
                </p>
            </div>

            <div className="login-card">
                <h2>
                    {isRegister
                        ? "Crea il tuo account"
                        : "Sei già un RetreatHutter?"}
                </h2>

                {isRegister && (
                    <>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Cognome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isRegister ? (
                    <button onClick={handleRegister}>Registrati</button>
                ) : (
                    <button onClick={handleLogin}>Accedi</button>
                )}

                <GoogleLogin
                    onSuccess={(credentialResponse) =>
                        handleGoogleLogin(credentialResponse.credential)
                    }
                    onError={() => console.log("Login Failed")}
                />

                <p
                    className="switch-mode"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister
                        ? "Hai già un account? Accedi"
                        : "Non hai un account? Registrati"}
                </p>
            </div>
        </div>
    );
}
