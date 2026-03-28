// import type { ReactNode } from 'react'
// import Layout from '@/layout'
// import { auth } from '@/lib/auth'
// import { redirect } from 'next/navigation'

// export default async function HomeLayout({
// 	children
// }: {
// 	children: ReactNode
// }) {
// 	const session = await auth()

// 	if (!session?.user) {
// 		redirect('/sign-in')
// 	}

// 	return <Layout>{children}</Layout>
// }
