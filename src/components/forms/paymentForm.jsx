import { InputWithLabel, InputCheckbox } from "@/components/ui/input";
import {
	name_validation,
	postal_validation,
	text_validation,
	creditCard_validation,
	cvv_validation,
	expiryDate_validation,
} from "@/lib/utils/inputValidations";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const PaymentForm = ({
	isGuest,
	user,
	setUser,
	extraFunction,
	setPaymentInfo,
	paymentInfo,
}) => {
	const methods = useForm({ shouldUnregister: true });
	const watchSameAsShipping = methods.watch("shipping_same");

	useEffect(() => {
		console.log("watchSameAsShipping", watchSameAsShipping);
		if (watchSameAsShipping) {
			methods.register("billing_name_first");
			methods.register("billing_name_last");
			methods.register("billing_address");
			methods.register("billing_city");
			methods.register("billing_province");
			methods.register("billing_postal_code");
		} else {
			methods.unregister("billing_name_first");
			methods.unregister("billing_name_last");
			methods.unregister("billing_address");
			methods.unregister("billing_city");
			methods.unregister("billing_province");
			methods.unregister("billing_postal_code");
		}
	}, [watchSameAsShipping]);

	const onSubmit = methods.handleSubmit(
		(data) => {
			console.log(data);
			setUser({
				...user,
				same_as: watchSameAsShipping ? 1 : 0,
			});
			if (watchSameAsShipping == 0) {
				setUser({
					...user,
					billing_name_first: data.billing_name_first,
					billing_name_last: data.billing_name_last,
					billing_address: data.billing_address,
					billing_city: data.billing_city,
					billing_province: data.billing_province,
					billing_postal_code: data.billing_postal_code,
				});
			}
			setPaymentInfo({
				card_number: data.card_number,
				expiry_date: data.expiry_date,
				cvv: data.cvv,
			});

			if (extraFunction) {
				extraFunction();
			}
		},
		(errors) => {
			console.log(errors);
		}
	);

	return (
		<FormProvider {...methods}>
			<form
				autoComplete='off'
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className='flex flex-col'
				noValidate
			>
				<fieldset className='flex flex-wrap gap-4 mb-4'>
					<legend className='text-xl text-green-800 font-semibold'>
						Payment Info
					</legend>
					<div className='child100'>
						<InputWithLabel
							validation={creditCard_validation}
							label='Card Number'
							id='card_number'
							type='text'
							defaultValue={paymentInfo.card_number}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={expiryDate_validation}
							label='Expiry Date'
							id='expiry_date'
							type='text'
							defaultValue={paymentInfo.expiry_date}
						/>
					</div>
					<div className='child50'>
						<InputWithLabel
							validation={cvv_validation}
							label='CVV'
							id='cvv'
							type='text'
							defaultValue={paymentInfo.cvv}
						/>
					</div>
					<InputCheckbox
						label='Billing Address same as Shipping'
						id='shipping_same'
						defaultValue={user.same_as != 0}
					/>
				</fieldset>

				{!watchSameAsShipping ? (
					<>
						<fieldset className='flex flex-wrap gap-4'>
							<legend className='text-xl text-green-800 font-semibold'>Billing</legend>
							<div className='child50'>
								<InputWithLabel
									validation={name_validation}
									label='First Name'
									id='billing_name_first'
									type='text'
									placeholder='First Name'
									defaultValue={isGuest ? null : user.shipping_name_first}
								/>
							</div>
							<div className='child50'>
								<InputWithLabel
									validation={name_validation}
									label='Last Name'
									id='billing_name_last'
									type='text'
									placeholder='Last Name'
									defaultValue={isGuest ? null : user.billing_name_last}
								/>
							</div>
							<div className='child100'>
								<InputWithLabel
									validation={text_validation}
									label='Address'
									id='billing_address'
									type='text'
									placeholder='Address'
									defaultValue={isGuest ? null : user.billing_address}
								/>
							</div>
							<div className='child50'>
								<InputWithLabel
									validation={text_validation}
									label='City'
									id='billing_city'
									type='text'
									placeholder='City'
									defaultValue={isGuest ? null : user.billing_city}
								/>
							</div>
							<div className='child50'>
								<InputWithLabel
									validation={text_validation}
									label='Province'
									id='billing_province'
									type='text'
									placeholder='Province'
									defaultValue={isGuest ? null : user.billing_province}
								/>
							</div>
							<div className='child50'>
								<InputWithLabel
									validation={postal_validation}
									label='Postal Code'
									id='billing_postal_code'
									type='text'
									placeholder='Postal Code'
									defaultValue={isGuest ? null : user.billing_postal_code}
								/>
							</div>
						</fieldset>
					</>
				) : null}
				<Button
					press={"pressed"}
					className='shadow mt-2'
					variant={"greenDark"}
					type='submit'
					onClick={onSubmit}
				>
					Next Step
				</Button>
			</form>
		</FormProvider>
	);
};

export default PaymentForm;