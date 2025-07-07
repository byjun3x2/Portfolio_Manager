import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <h1>포트폴리오 관리 시스템</h1>
            <p>Spring Boot + Next.js + TypeScript + Yarn Berry</p>

            <div>
                <Link href="/projects">
                    <button>프로젝트 목록 보기</button>
                </Link>
                <Link href="/projects/new">
                    <button>새 프로젝트 추가</button>
                </Link>
            </div>
        </div>
    )
}
