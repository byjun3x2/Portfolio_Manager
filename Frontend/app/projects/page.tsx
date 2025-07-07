import Link from 'next/link'
import { ProjectList } from '@/components/ProjectList'

export default function ProjectsPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>프로젝트 목록</h1>
                <Link href="/projects/new">
                    <button>새 프로젝트 추가</button>
                </Link>
            </div>
            <ProjectList />
        </div>
    )
}
