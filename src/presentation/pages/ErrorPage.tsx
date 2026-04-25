// ErrorPage.jsx
import "./ErrorPage.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
return (
    <div className="error-page">
    <div className="error-page__glow error-page__glow--one"></div>
    <div className="error-page__glow error-page__glow--two"></div>

    <div className="error-card">
        <div className="error-card__left">
        <span className="error-badge">CRM SYSTEM</span>

        <h1 className="error-code">404</h1>

        <h2 className="error-title">Page Not Found</h2>

        <p className="error-text">
            The page you are trying to access doesn’t exist, was moved, or is
            temporarily unavailable.
        </p>

        <div className="error-actions">
            <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
            </Link>

            <button
            className="btn-secondary"
            onClick={() => window.history.back()}
            >
            Go Back
            </button>
        </div>
        </div>

        <div className="error-card__right">
        <div className="orbital-box">
            <div className="orbital-ring orbital-ring--one"></div>
            <div className="orbital-ring orbital-ring--two"></div>
            <div className="orbital-center">!</div>
        </div>

        <div className="error-info">
            <span>Status Code</span>
            <strong>404 ERROR</strong>
        </div>
        </div>
    </div>
    </div>
);
};

export default ErrorPage;