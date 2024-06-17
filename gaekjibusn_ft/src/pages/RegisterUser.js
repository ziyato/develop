import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { get, useForm } from "react-hook-form";
import InputError from "./InputError";
import { postRegister } from "../apis/getUserAPI";

function RegisterUser() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 p-10 flex justify-center">
        <div className="flex flex-col gap-4 w-96 p-5">
          <h3 className=" text-3xl mb-6 font-semibold">
            Welcome to <br /> 냉장고를 부탁해!
          </h3>
          <SignUpBox />

          <div className="bg-white border rounded h-20 p-4 text-center">
            <span>You have account?</span>
            <br />
            <Link to="/login" className="h-10 rounded ml-1 text-blue-600">
              ➡️ Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpBox() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await postRegister(data);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Authentication error:", errorCode, errorMessage);
      setError("extraError", { message: "회원가입에 실패하였습니다" });
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
        <span>Password</span>
        <input
          type="password"
          className="border rounded-lg border-gray-300 p-2 h-10"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 6글자 이상, 20자 이하로 입력해 주세요.",
            },
            maxLength: {
              value: 20,
              message: "비밀번호는 6글자 이상, 20자 이하로 입력해 주세요.",
            },
          })}
        />
        <InputError ErrorMessage={errors?.password?.message} />{" "}
      </div>

      <div className="flex flex-col">
        <span>Confirm</span>
        <input
          type="password"
          className="border rounded-lg border-gray-300 p-2 h-10"
          {...register("pwConfirm", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 6글자 이상, 20자 이하로 입력해 주세요.",
            },
          })}
        />
        <InputError ErrorMessage={errors?.pwConfirm?.message} />{" "}
      </div>

      <div className="flex flex-col ">
        <span>Username</span>
        <input
          className="border rounded-lg border-gray-300 p-2 h-10"
          {...register("Username", {
            required: "Username을 입력해주세요.",
            minLength: {
              value: 2,
              message: "Username은 2글자 이상 10글자 이하입니다.",
            },
            maxLength: {
              value: 10,
              message: "Username은 3글자 이상 10글자 이하입니다.",
            },
            pattern: {
              value: /^[A-za-z0-9가-힣]{3,10}$/,
              message:
                "Username은 영문 대소문자, 글자 단위 한글, 숫자만 가능합니다.",
            },
          })}
        />
        <InputError ErrorMessage={errors?.Username?.message} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-800 text-base font-semibold hover:bg-green-600 h-10 border border-bg-green-950 rounded text-white"
        >
          회원가입
        </button>
        <InputError ErrorMessage={errors?.extraError?.message} />
      </div>
    </form>
  );
}

export default RegisterUser;
