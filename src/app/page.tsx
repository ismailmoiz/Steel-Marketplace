import { redirect } from 'next/navigation'

// Root "/" redirects to marketplace — middleware handles auth check
export default function Home() {
  redirect('/marketplace')
}
