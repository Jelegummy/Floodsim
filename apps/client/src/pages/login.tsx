import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa6'
import { toast } from 'sonner'

import { LoginArgs } from '@/services/user'
import Wave from '@/components/Wave'

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginArgs>()

  const onSubmit: SubmitHandler<LoginArgs> = async data => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (!res?.ok) {
        throw new Error(
          res?.error ?? 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ โปรดลองอีกครั้ง',
        )
      }

      router.push('/dashboard')
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
        <h1 className="text-center text-2xl font-bold text-white">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-2"
        >
          <p>Email</p>
          <label className="input input-bordered flex items-center gap-2">
            <FaUser />
            <input
              type="email"
              className="grow"
              placeholder="Enter email"
              {...register('email', { required: true })}
            />
          </label>
          <p>Password</p>
          <label className="input input-bordered flex items-center gap-2">
            <FaLock />
            <input
              type="password"
              className="grow"
              placeholder="••••••••••••••••"
              {...register('password', { required: true })}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-primary/80 hover:bg-primary/90 disabled:btn-disabled mt-6 text-white"
          >
            Confirm
          </button>
        </form>
        <hr className="mt-5" />
        <Link href="/register" className="mt-4 text-center text-sm">
          Don’t have an account ?{' '}
          <span className="text-primary hover:underline">Register!</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
