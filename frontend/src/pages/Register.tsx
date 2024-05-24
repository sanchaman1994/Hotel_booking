import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	conformPassword: string;
};

export default function Register() {
	const navigate = useNavigate();
	const { showToast } = useAppContext();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: () => {
			showToast({ message: "Registration successful!.", type: "SUCCESS" });
			navigate("/");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-5">
			<h2 className="text-3xl font-bold">Create an Account</h2>
			<div className="flex flex-col md:flex-row gap-5 ">
				<label className="text-gray-700 text-sm font-bold flex-1">
					First Name
					<input
						className="border rounded w-full py-1 px-2 font-normal"
						{...register("firstName", { required: "*This field is required" })}
					/>
					{errors.firstName && (
						<span className="text-red-500 font-thin">
							{errors.firstName.message}
						</span>
					)}
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Last Name
					<input
						className="border rounded w-full py-1 px-2 font-normal"
						{...register("lastName", { required: "This field is required" })}
					/>
					{errors.lastName && (
						<span className="text-red-500 font-thin">
							{errors.lastName.message}
						</span>
					)}
				</label>
			</div>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Email
				<input
					type="email"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register("email", { required: "This field is required" })}
				/>
				{errors.email && (
					<span className="text-red-500 font-thin">{errors.email.message}</span>
				)}
			</label>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Password
				<input
					type="password"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters long",
						},
					})}
				/>
				{errors.password && (
					<span className="text-red-500 font-thin">
						{errors.password.message}
					</span>
				)}
			</label>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Confirm Password
				<input
					type="password"
					className="border rounded w-full py-1 px-2 font-normal"
					{...register("conformPassword", {
						validate: (value) => {
							if (!value) {
								return "This field is required";
							} else if (watch("password") !== value) {
								return "Password does not match";
							}
						},
					})}
				/>
				{errors.conformPassword && (
					<span className="text-red-500 font-thin">
						{errors.conformPassword.message}
					</span>
				)}
			</label>
			<span>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 text-xl"
				>
					Create Account
				</button>
			</span>
		</form>
	);
}
