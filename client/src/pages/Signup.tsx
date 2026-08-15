import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { formatError } from "../utils/error";

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const confirmation = passwordConfirmRef.current?.value;

      if (!email || !password || !confirmation || password !== confirmation)
        throw new Error("Credênciais inválidas!");
      await signup(email, password);
      navigate("/");
    } catch (err: unknown) {
      setError(formatError(err, "Erro ao fazer Signup"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  });

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-black dark:text-white">
      <div className="text-center gap-4 *:not-last:mb-2 -translate-y-1/2">
        <h1>iRepair — SignUp</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="border rounded-md px-1 bg-white text-black"
            required
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Senha"
            className="border rounded-md px-1 bg-white text-black"
            required
          />
          <input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Confirme a senha"
            className="border rounded-md px-1 bg-white text-black"
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 rounded-md text text-slate-100 py-1 hover:cursor-pointer"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <Link to="/login">Já tem Conta?</Link>
      </div>
    </div>
  );
};

export default Signup;
