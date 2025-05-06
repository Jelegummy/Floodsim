'use client'

import Link from 'next/link'
import AppLayout from '@/components/Layouts/App'
// import LandingLayout from '@/components/Layouts/Landing'
import Wave from '@/components/Wave'

const Home = () => {
  return (
    <AppLayout>
      {/* <LandingLayout> */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden sm:h-[700px] md:h-[500px] md:flex-row">
        <div className="absolute z-[2] flex w-full flex-col items-center justify-center gap-16 text-center md:h-[220px]">
          <h1 className="text-7xl font-bold text-white">
            Welcome to the Floodsim Viewer
          </h1>
          <div className="mt-6 flex flex-row items-center justify-center gap-4">
            <Link href="/example/porthree">
              <button className="w-40 rounded bg-[#03a9f4] px-4 py-2 text-center text-white">
                Example
              </button>
            </Link>
            <Link href="/example/porthree">
              <button className="w-40 rounded bg-[#03a9f4] px-4 py-2 text-center text-white">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <Wave />
      </div>
      {/* </LandingLayout> */}
    </AppLayout>
  )
}

export default Home
