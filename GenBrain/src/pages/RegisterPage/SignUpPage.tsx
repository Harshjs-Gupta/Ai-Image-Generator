import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/images/logo/GoogleLogo.png";
import "./signUp.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, database, provider } from "../../auth/firebase";
import { useEffect, useState, FormEvent } from "react";
import { toast } from "react-toastify";
import GenBrain from "../../assets/images/logo/GenBrain2.png";
import { doc, setDoc } from "firebase/firestore";

function SignUpPage() {
  const [googleAuth, setGoogleAuth] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Function to handle Google sign-in via pop-up
  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
        const email = data.user.email;
        if (email) {
          setEmail(email);
          localStorage.setItem("email", email); // Store user email in localStorage
        } else {
          toast.error("No email associated with this account.");
        } // Store user email in localStorage
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // On component mount, check if user email is stored in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setGoogleAuth(storedEmail); // Set state if email exists
    }
  }, []);

  // Navigate to answer generator Page if googleAuth is set
  useEffect(() => {
    if (googleAuth) {
      navigate("/mainPage");
    }
  }, [googleAuth, navigate]);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { username, email, password } = Object.fromEntries(
      formData.entries(),
    ) as {
      username: string;
      email: string;
      password: string;
    };

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(database, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
      });

      toast.success("Account successfully connected! You can login now!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <>
      <div className="signUp-page">
        <div className="absolute right-14 top-20 flex h-80 w-[700px] flex-col gap-6">
          <img src={GenBrain} alt="Logo" className="h-40 w-40" />
          <span className="text-xl font-bold text-white">
            GenBrain website also features a cutting-edge{" "}
            <span className="text-blue-500">AI image generator</span>, enabling
            users to create stunning, unique visuals based on text prompts.
            Powered by advanced machine learning algorithms, this tool allows
            users to input descriptions and generate images that match their
            vision. Whether for artistic inspiration, design projects, or
            creative experimentation, the image generator provides a seamless,
            intuitive interface for turning ideas into visual reality.
          </span>
        </div>
        <div className="signUp-container h-[450px] w-80">
          <h4>Create Account</h4>
          <button onClick={handleGoogleAuth}>
            <span>Sign Up with Google</span>
            <img src={GoogleLogo} alt="Google Logo" />
          </button>
          <pre> ----------- or -----------</pre>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full name"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="placeholder:text-white"
            />
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
              {isLoading ? "Loading.." : "Sign Up"}
            </button>
          </form>
          <span>
            Already have an account?
            <p className="font-serif text-blue-500 underline">
              <Link to="/"> Log In </Link>
            </p>
          </span>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
