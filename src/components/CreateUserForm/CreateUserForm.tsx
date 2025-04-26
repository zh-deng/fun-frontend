import { useState } from "react";
import "./CreateUserForm.scss";
import { UserService } from "../../services/UserService";
import { ApiError } from "../../types/ApiError";
import { User } from "../../types/User";

type FormData = {
	name: string;
	email: string;
};

export const CreateUserForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
	});
	const [errors, setErrors] = useState<Partial<FormData>>({});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [apiError, setApiError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name as keyof FormData]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = (): boolean => {
		const newErrors: Partial<FormData> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setApiError(null);

		if (!validate()) return;

		setIsSubmitting(true);

		try {
			await UserService.create({
				name: formData.name,
				email: formData.email,
			} as User);

			setFormData({ name: "", email: "" });
		} catch (err) {
			const error = err as ApiError;
			setApiError(error.message || "Failed to create user");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="create-user-form">
			<h2>Create new user</h2>

			{apiError && <div>{apiError}</div>}

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`${errors.name ? "red-border" : "gray-border"}`}
					/>
					{errors.name && <p>{errors.name}</p>}
				</div>

				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`${errors.email ? "red-border" : "gray-border"}`}
					/>
					{errors.email && <p>{errors.email}</p>}
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className={`${isSubmitting ? "opacity-50" : ""}`}
				>
					{isSubmitting ? "Creating..." : "Create User"}
				</button>
			</form>
		</div>
	);
};
