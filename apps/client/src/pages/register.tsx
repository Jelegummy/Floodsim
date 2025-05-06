import { useMutation } from '@tanstack/react-query'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoMail } from 'react-icons/io5'
import { toast } from 'sonner'
import Wave from '@/components/Wave'

import {
  RegisterArgs as BaseRegisterArgs,
  register as registerFn,
} from '@/services/user'

type RegisterArgs = BaseRegisterArgs & { confirmPassword: string }

const Register = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterArgs>()

  const registerMutation = useMutation({
    mutationFn: (args: RegisterArgs) => registerFn(args),
  })

  const onSubmit: SubmitHandler<RegisterArgs> = async args => {
    try {
      if (args.password !== args.confirmPassword) {
        throw new Error('รหัสผ่านไม่ตรงกัน')
      }
      if (args.firstName.length < 2 && args.lastName.length < 2) {
        throw new Error('กรุณาระบุชื่อและนามสกุลของคุณให้ถูกต้อง')
      }
      if (args.password.length < 8) {
        throw new Error('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
      }

      await registerMutation.mutateAsync(args)

      router.push('/login')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Wave />
      </div>
      <div className="relative z-10 flex w-full max-w-[450px] flex-col gap-4 rounded-lg bg-gradient-to-b from-[#0277bd] via-blue-300 to-white p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-white">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex flex-row gap-4">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Firstname"
              {...register('firstName', { required: true })}
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Lastname"
              {...register('lastName', { required: true })}
            />
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <IoMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </label>
          <input
            type="password"
            className="input input-bordered grow"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <input
            type="password"
            className="input input-bordered grow"
            placeholder="Confirm Password"
            {...register('confirmPassword', { required: true })}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:btn-disabled text-white"
          >
            Register
          </button>
        </form>
        <hr className="mt-5" />
        <Link href="/login" className="mt-4 text-center text-sm">
          You already have an account, right?{' '}
          <span className="text-primary hover:underline">Login!</span>
        </Link>
      </div>
    </div>
  )
}

export default Register
