
"use client"
import AuthWrapper from "@/components/auth/auth-wrapper"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLogin } from "@/schemas/auth.schema";
import { CustomFormField } from "@/components/form/custom-form-field";
import SubmitButton from "@/components/form/submit-button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordInput";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { PiEnvelope } from "react-icons/pi";
import { Mail } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";



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

  useEffect(() => {
    console.log(BACKEND_URL, "baackendurl")
    const api = async () => {
      try {
        const response = await fetch(BACKEND_URL)
        if (response.ok) {
          const data = await response.json()
          console.log("ok", data)
        }
        else {
          const data = await response.json()
          console.log("error", data)
        }
      }
      catch (error) {
        console.log("error", error)
      }
    }
    api()
  }, [])


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
      console.log(response.errors, "error")
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

    <AuthWrapper cardTitle="Log in" cardDescription="Welcome back! please enter your details
">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="bg-slate-200 shadow-sm h-12 w-full" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <PasswordInput placeholder="****" {...field} className="bg-slate-200 shadow-sm h-12" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center gap-6 !mt-6">
            <SubmitButton
              className=" w-64 px-10 py-6 rounded-3xl"
              type="submit"
              label="Login"
              pending={form.formState.isSubmitting}
            />
            <button type="button" className="rounded-full shadow-md p-2 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all" >
              <FcGoogle className="size-8" />
            </button>
          </div>
        </form>
      </Form>
      <div className="flex items-center justify-end text-sm text-gray-600 mt-6">
        <div className="flex items-center">  <Mail className="size-5" />
          <span className="mx-2">Email:</span> <span>support@jubahospitality.com</span>
        </div>
      </div>
    </AuthWrapper>

  )
}

export default LoginPage