import { Controller, useForm } from "react-hook-form";
import { toLeadFormInputsInput, toLeadType, type LeadFormInputs } from "../../../helpers/FormInputs";
import FormQuestions from "./GenericForms/FormQuestions";
import "./LeadForm.scss"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { useLeadMutation } from "../../../infrastructure/mutations/useLeadMutate";
import { toast } from "sonner";

type LeadFormProps = {
    onClose: () => void;
};

const FormLeads = ({onClose}:LeadFormProps) => {

    const { mutation: leadMutate } = useLeadMutation();
    const {
        control,
        clearErrors,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormInputs>({
        defaultValues: toLeadFormInputsInput(),
    });


    const onSubmit = async(data: LeadFormInputs) => {
        // const response = await leadMutate.mutateAsync(toLeadType(data));
        toast.promise(
            leadMutate.mutateAsync(toLeadType(data)),
            {
                loading: 'Saving lead...',
                success: 'Saved successfully!',
                error: (error) => error.message || 'Failed to save the lead'
            }
        )
        onClose();
    };

    return (
        <>
            <FormQuestions isSubmitting={isSubmitting}
                onCancel={onClose}
                handleSubmit={handleSubmit(onSubmit)}>
                <div>
                <div className="form-group"> 
                    <label>First Name</label>
                <Controller
                    name="firstName"
                    rules={{required:"first name is required",minLength:{value:2,message:"Minimum 2 characters"},maxLength:{value:30,message:"Maximum 30 characters"}}}
                    control={control}
                    render={({ field }) => (
                        <>   
                        <input
                            {...field}
                            type="text"
                            placeholder="John"
                            onChange={(e) => {
                            const filtered = e.target.value.replace(/[^a-zA-Z ]/g, "");
                            field.onChange(filtered);
                            clearErrors("firstName");
                            }}
                        />
                        {errors.firstName && (
                                <span className="errorMessage">
                                {errors.firstName.message}
                                </span>
                            )}
                        </>
                        )}
                    />
                </div>

                <div className="form-group">
                <label>Last Name</label>
                <Controller
                    name="lastName"
                    rules={{required:"first name is required",minLength:{value:2,message:"Minimum 2 characters"},maxLength:{value:30,message:"Maximum 30 characters"}}}
                    control={control}
                    render={({ field })=>(
                        <>
                            <input
                                {...field}
                                type="text" 
                                placeholder="Doe"
                                onChange={(e) => {
                                    const filtered = e.target.value.replace(/[^a-zA-Z ]/g, "");
                                    field.onChange(filtered);
                                    clearErrors("firstName");
                                }}
                                />
                            {errors.lastName && (
                                <span className="errorMessage">
                                {errors.lastName.message}
                                </span>
                            )}
                        </>
                    )}
                />
                </div>


                <div className="form-group">
                    <label>Email</label>
                    <Controller
                    name="email"
                    rules={{
                            required: "Email is required",
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                            },
                        }}
                    control={control}
                    render={({ field })=>(
                        <>
                            <input
                                {...field}
                                type="email"
                                placeholder="john@email.com"
                                />
                            {errors.email && (
                                <span className="errorMessage">
                                {errors.email.message}
                                </span>
                            )}
                        </>
                    )}
                    />
                </div>

                <div className="form-group phone-field">
                <label>Phone</label>
                    <Controller
                    name="phone"
                    rules={{
                            required: "phone number is required",
                            validate: (value) => isValidPhoneNumber(value || "") || "Invalid phone number",
                        }}
                    control={control}
                    render={({ field })=>(
                        <>
                            <PhoneInput
                                {...field}
                                international
                                defaultCountry="MA"
                                countryCallingCodeEditable={false}
                                placeholder="Enter phone number"
                            />
                            {errors.phone && (
                                <span className="errorMessage">
                                {errors.phone.message}
                                </span>
                            )}
                        </>
                    )}
                    />
                </div>

                <div className="form-group full-width">
                    <label>Product Interest</label>
                    <Controller
                    name="product_interest"
                    rules={{
                            required: "Product Interest is required",
                        }}
                    control={control}
                    render={({ field })=>(
                        <>
                            <input 
                            {...field}
                            type="text" 
                            placeholder="CRM Software" />
                            {errors.product_interest && (
                                <span className="errorMessage">
                                {errors.product_interest.message}
                                </span>
                            )}
                        </>
                    )}
                    />
                </div>
                </div>
            </FormQuestions>
        </>
    )
}

export default FormLeads