import "../login/Login.css";

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Sei già un RetreatHubber?</h2>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Accedi</button>
            </div>
        </div>
    );
}
