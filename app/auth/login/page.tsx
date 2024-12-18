
"use client"
import AuthWrapper from "@/components/auth/auth-wrapper"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLogin } from "@/schemas/auth.schema";
import { CustomFormField } from "@/components/form/custom-form-field";
import SubmitButton from "@/components/form/submit-button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";


const LoginPage = () => {
  // const [errors, setErrors] = useState({});
  const router = useRouter()

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })


  // useEffect(() => {
  //   if (errors) {
  //     Object.keys(errors).map((key) => {
  //       form.setError(key as keyof typeof errors, {
  //         type: "custom",
  //         message: errors[key as keyof typeof errors],
  //       });
  //     });
  //   }
  // }, [errors]);

  const onSubmit = async (values: TLogin) => {
    // setErrors({});

    const response = await signIn(values);

    if (response?.errors) {
      // setErrors(response.errors);
    }
    if (response?.message) {
      toast.error(response?.message);
    }

    if (response?.success) {
      form.reset();
      toast.success(response?.success);
      router.replace("/")
    }
  };


  return (
    <div>
      <AuthWrapper cardTitle="Login" cardDescription="Enter your email below to login to your account
">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <CustomFormField
              elementName="input"
              fieldId="email"
              formLabel="Email"
              placeholder="m@example.com"
              inputType="email"
            />
            <CustomFormField
              elementName="input"
              fieldId="password"
              formLabel="Password"

              inputType="password"
            />
            <SubmitButton
              className="!mt-6"
              type="submit"
              label="Login"
              pending={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </AuthWrapper>
    </div>
  )
}

export default LoginPage