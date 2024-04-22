import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SiDoordash } from "react-icons/si";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function LoginForm({ onHandleSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    onHandleSubmit(data);
    reset("", {
      keepValues: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SiDoordash className="w-32 h-32 text-black" />
      {/* <h2 className="text-2xl">MASUK</h2> */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full px-4 space-y-4 xl:items-center form-control"
      >
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full xl:w-[1000px] input input-bordered"
        />

        {errors.email && (
          <p className="text-xl text-red-600">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="password"
          className="w-full input input-bordered xl:w-[1000px]"
        />
        {errors.password && (
          <p className="text-xl text-red-600">{errors.password.message}</p>
        )}
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
