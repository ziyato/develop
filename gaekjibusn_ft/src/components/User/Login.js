{/*import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputError from "../InputError";

function Login({ authService }) {
  return (
    <div className="flex flex-col gap-4 w-96 p-5">
      <h3 className=" text-3xl mb-6 font-semibold">
        Sign in to <br /> Function Converter
      </h3>
      <LoginBox authService={authService} />
      <div className="bg-white border rounded h-20 p-4 text-center">
        <span>New to Function Converter?</span>
        <br />
        <Link to="/signup" className="h-10 rounded ml-1 text-blue-600">
          ➡️ Create an account
        </Link>
      </div>
    </div>
  );
}

function LoginBox({ authService }) {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      authService.onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: user.uid,
              username: user.displayName,
              email: user.email, // github의 경우 이메일 공개 여부에 따라 null로 할당되기도 함.
            })
          );
        }
      });

      window.location.href = "/";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Authentication error:", errorCode, errorMessage);
      setError("extraError", { message: "계정이 일치하지 않습니다." });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 bg-gray-200 p-4 border rounded-lg border-gray-300 font-semibold"
    >
      <div className="flex flex-col ">
        <span>Email</span>
        <input
          className="border rounded-lg border-gray-300 p-2 h-10"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일을 올바르게 입력해주세요",
            },
          })}
        />
        <InputError ErrorMessage={errors?.email?.message} />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <span>Password</span>
          {/* <a
          className="text-blue-600 hover:decoration-solid text-sm mt-1"
          href="/changePW"
        >
          Forget Password?
        </a> 
        </div>
        <input
          type="password"
          className="border rounded-lg border-gray-300 p-2 h-10"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 6글자 이상, 20자 이하입니다.",
            },
            maxLength: {
              value: 20,
              message: "비밀번호는 6글자 이상, 20자 이하입니다.",
            },
          })}
        />
        <InputError ErrorMessage={errors?.password?.message} />{" "}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <button
          type="submit"
          className=" bg-green-800 text-base font-semibold hover:bg-green-600 h-10 border border-bg-green-950 rounded text-white"
        >
          Login
        </button>
        <InputError ErrorMessage={errors?.extraError?.message} />
      </div>
    </form>
  );
}

export default Login;*/}