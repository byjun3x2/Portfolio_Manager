'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { projectApi, Project } from '@/services/api'

export function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectApi.getAllClient()
                setProjects(data)
            } catch (error) {
                console.error('프로젝트 로딩 실패:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    if (loading) return <div>로딩 중...</div>

    return (
        <div>
            {projects.length === 0 ? (
                <p>등록된 프로젝트가 없습니다.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {projects.map((project) => (
                        <div key={project.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p><strong>기간:</strong> {project.period}</p>
                            <p><strong>기술 스택:</strong> {project.techStack}</p>
                            <div style={{ marginTop: '1rem' }}>
                                <Link href={`/projects/${project.id}`}>
                                    <button>상세 보기</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
