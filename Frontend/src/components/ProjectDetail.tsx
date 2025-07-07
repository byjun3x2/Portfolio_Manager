'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { projectApi, Project } from '@/services/api'

interface Props {
    projectId: string
}

export function ProjectDetail({ projectId }: Props) {
    const router = useRouter()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectApi.getById(parseInt(projectId))
                setProject(data)
            } catch (error) {
                console.error('프로젝트 로딩 실패:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProject()
    }, [projectId])

    const handleDelete = async () => {
        if (!project?.id) return

        if (confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
            try {
                await projectApi.delete(project.id)
                alert('프로젝트가 삭제되었습니다.')
                router.push('/projects')
            } catch (error) {
                console.error('프로젝트 삭제 실패:', error)
                alert('프로젝트 삭제에 실패했습니다.')
            }
        }
    }

    if (loading) return <div>로딩 중...</div>
    if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>{project.title}</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/projects/${project.id}/edit`}>
                        <button style={{ backgroundColor: '#28a745', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                            수정
                        </button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}
                    >
                        삭제
                    </button>
                </div>
            </div>

            <div style={{ lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}><strong>설명:</strong> {project.description}</p>
                <p style={{ marginBottom: '1rem' }}><strong>개발 기간:</strong> {project.period}</p>
                <p style={{ marginBottom: '1rem' }}><strong>기술 스택:</strong> {project.techStack}</p>

                {project.projectUrl && (
                    <p style={{ marginBottom: '1rem' }}>
                        <strong>프로젝트 URL:</strong>{' '}
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                            {project.projectUrl}
                        </a>
                    </p>
                )}

                {project.githubUrl && (
                    <p style={{ marginBottom: '1rem' }}>
                        <strong>GitHub:</strong>{' '}
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                            {project.githubUrl}
                        </a>
                    </p>
                )}

                {project.thumbnailUrl && (
                    <div style={{ marginTop: '2rem' }}>
                        <strong>썸네일:</strong>
                        <div style={{ marginTop: '0.5rem' }}>
                            <img
                                src={project.thumbnailUrl}
                                alt={project.title}
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Link href="/projects">
                    <button style={{ backgroundColor: '#6c757d', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                        목록으로 돌아가기
                    </button>
                </Link>
            </div>
        </div>
    )
}
