import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Portfolio Manager',
    description: 'Spring Boot + Next.js 포트폴리오 관리 시스템',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
        <body className={inter.className}>
        <header>
            <nav>
                <h1>Portfolio Manager</h1>
            </nav>
        </header>
        <main>{children}</main>
        <footer>
            <p>&copy; 2025 Portfolio Manager</p>
        </footer>
        </body>
        </html>
    )
}
