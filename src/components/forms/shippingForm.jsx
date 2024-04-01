import { InputWithLabel } from "@/components/ui/input";
import {
	name_validation,
	text_validation,
	email_validation,
	phone_validation,
	postal_validation,
} from "@/lib/utils/inputValidations";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { checkEmail } from "@/lib/classes/user";
import { fetchData } from "@/lib/db";

const ShippingForm = ({
	user,
	setUser,
	extraFunction,
	required,
	buttonText,
}) => {
	const methods = useForm({ mode: "onChange" });

	const onSubmit = methods.handleSubmit(async (data) => {
		if (data.email != user.email) {
			const checkEmailData = await fetchData(checkEmail, data.email);

			if (typeof checkEmailData === "string") {
				methods.setError("email", {
					type: "manual",
					message: "Email already in use. Please use another email or login.",
				});
				return;
			}
		}

		setUser({
			...user,
			email: data.email,
			shipping_name_first: data.name_first,
			shipping_name_last: data.name_last,
			shipping_phone: data.phone,
			shipping_address: data.shipping_address,
			shipping_city: data.shipping_city,
			shipping_province: data.shipping_province,
			shipping_postal_code: data.shipping_postal_code,
		});
		if (extraFunction) {
			extraFunction();
		}
	});

	return (
		<FormProvider {...methods}>
			<form
				autoComplete='off'
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col'
				noValidate
			>
				<fieldset className='flex flex-wrap gap-4'>
					<legend className='text-xl text-green-800 font-semibold'>
						Personal Info
					</legend>
					<div className='child100'>
						<InputWithLabel
							validation={email_validation}
							label='Email'
							id='email'
							isRequired={true}
							type='text'
							placeholder='email'
							disabled={user.id != -1}
							defaultValue={user.email}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={name_validation}
							label='First Name'
							id='name_first'
							isRequired={true}
							type='text'
							placeholder='First Name'
							defaultValue={user.shipping_name_first}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={name_validation}
							label='Last Name'
							isRequired={true}
							id='name_last'
							type='text'
							placeholder='Last Name'
							defaultValue={user.shipping_name_last}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={phone_validation}
							label='Phone'
							isRequired={required}
							id='phone'
							type='tel'
							placeholder='Phone'
							defaultValue={user.shipping_phone}
						/>
					</div>
				</fieldset>
				<fieldset className='flex flex-wrap gap-4'>
					<legend className='text-xl text-green-800 font-semibold'>
						Shipping Address
					</legend>
					<div className='child100'>
						<InputWithLabel
							validation={text_validation}
							label='Address'
							id='shipping_address'
							type='text'
							isRequired={required}
							placeholder='Address'
							defaultValue={user.shipping_address}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={text_validation}
							label='City'
							id='shipping_city'
							type='text'
							isRequired={required}
							placeholder='City'
							defaultValue={user.shipping_city}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={text_validation}
							label='Province'
							id='shipping_province'
							isRequired={required}
							type='text'
							placeholder='Province'
							defaultValue={user.shipping_province}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={postal_validation}
							label='Postal Code'
							id='shipping_postal_code'
							type='text'
							isRequired={required}
							placeholder='Postal Code'
							defaultValue={user.shipping_postal_code}
						/>
					</div>
				</fieldset>
				<Button
					press={"pressed"}
					className='shadow'
					variant={"greenDark"}
					type='submit'
					onClick={onSubmit}
				>
					{buttonText}
				</Button>
			</form>
		</FormProvider>
	);
};

export default ShippingForm;
