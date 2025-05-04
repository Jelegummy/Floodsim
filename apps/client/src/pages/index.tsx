'use client'

import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>

      <Link href="/example/porthree">
        <button>Go to Potree Viewer</button>
      </Link>
    </div>
  )
}

export default Home
