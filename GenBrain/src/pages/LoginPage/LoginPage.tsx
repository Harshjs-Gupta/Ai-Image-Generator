import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";
import GenBrain from "../../assets/images/logo/GenBrain2.png";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../auth/firebase";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const { email, password } = Object.fromEntries(formData.entries()) as {
      username: string;
      email: string;
      password: string;
    };

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You log in Successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      navigate("/image_generator_page");
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="absolute left-14 top-20 flex h-80 w-[700px] flex-col gap-4">
          <img src={GenBrain} alt="Logo" className="h-44 w-44" />
          <span className="text-xl font-bold text-white">
            GenBrain website is an innovative AI-driven platform designed to
            offer text generation services, similar to ChatGPT. The core
            functionality of GenBrain focuses on providing users with
            intelligent, natural language responses across various contexts.
            Whether for creative writing, idea generation, or answering queries,
            GenBrain leverages advanced AI models to assist users in crafting
            meaningful and accurate text outputs.{" "}
          </span>
        </div>
        <div className="login-container h-[400px] w-80">
          <h4> Login </h4>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder:text-white"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading.." : "Log In"}
            </button>
          </form>
          <span>
            Don't have an account?
            <Link
              to="/signUp"
              className="ml-3 font-semibold text-blue-500 underline"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
