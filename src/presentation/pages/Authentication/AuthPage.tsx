import { useState } from "react";
import "./AuthPage.scss";
import { useAuthMutation } from "../../../infrastructure/mutations/useAuthMutate";
import type { AuthCredentialsType } from "../../../models/authCredentials";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "../../configuration";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isError, setIsError] = useState(false);
  const { mutateAsync: authMutate } = useAuthMutation();
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate()


const {
      control,
      clearErrors,
      formState: { errors },
      handleSubmit,
      reset
  } = useForm<AuthCredentialsType>({defaultValues: {
    Username : "",
    password : ""
  }});

  const toggleMode = () => {
    setIsRegister(!isRegister);
  };

  const [isLoading, setIsLoading] = useState(false);

  

const onSubmit: SubmitHandler<AuthCredentialsType> = async (data) => {
  setIsLoading(true);
  setIsError(false);
  try {
      const token = await authMutate(data);
      reset();
      setToken(token.accessToken);
      navigate(PATH_ROUTER.Dashboard);
  } catch (error) {
    console.error(error)
      setIsError(true);
  } finally {
      setIsLoading(false);
  }
};
  return (
    <div className="auth-container">
    <div className="auth-page">
      <div className="auth-left">
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
            <Controller
              name="Username"
              control={control}
              rules={{
                required: "Username is required",
                minLength: { value: 5, message: "Username is too small" },
                maxLength: { value: 30, message: "Username is too long" }
              }}
              render={({ field }) => (
                <>
                  <input {...field} 
                    type="text"
                    onChange={(e)=>{
                        field.onChange(e.target.value)
                        clearErrors("Username")
                      }} 
                  />
                  {errors.Username && <p>{errors.Username.message}</p>}
                </>
              )}
            />
            <label>Username</label>
            </div>

            <div className="input-group">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 10, message: "Password is too small" },
                  maxLength: { value: 30, message: "Password is too long" }
                }}
                render={({ field }) => (
                  <>
                    <input 
                      {...field} 
                      type="password"
                      onChange={(e)=>{
                        field.onChange(e.target.value)
                        clearErrors("password")
                      }} 
                      />
                    {errors.password && <p>{errors.password.message}</p>}
                  </>
                )}
              />
              <label>Password</label>
            </div>

            {isRegister && (
              <div className="input-group">
                <input
                  type="password"
                  name="confirm"
                  required
                />
                <label>Confirm Password</label>
              </div>
            )}
            {isError && <span className="danger-btn">Username or password is invalid please try agaiin !</span>}
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : isRegister ? (
                "Sign Up"
              ) : (
                "Login"
              )}
            </button>

          </form>
          <p className="toggle-text">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={toggleMode}>{isRegister ? "Login" : "Sign Up"}</span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
