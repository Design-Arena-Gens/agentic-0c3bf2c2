'use client'

import dynamic from 'next/dynamic'

const WatchScene = dynamic(() => import('@/components/WatchScene'), {
  ssr: false,
})

export default function Home() {
  return <WatchScene />
}
