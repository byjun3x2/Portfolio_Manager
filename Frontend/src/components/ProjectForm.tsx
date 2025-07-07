'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { projectApi, Project } from '@/services/api'

interface Props {
    project?: Project // 수정 모드일 때 기존 프로젝트 데이터
    mode?: 'create' | 'edit'
}

export function ProjectForm({ project, mode = 'create' }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        period: project?.period || '',
        techStack: project?.techStack || '',
        projectUrl: project?.projectUrl || '',
        githubUrl: project?.githubUrl || '',
        thumbnailUrl: project?.thumbnailUrl || ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (mode === 'create') {
                await projectApi.create(formData)
                alert('프로젝트가 성공적으로 생성되었습니다!')
                router.push('/projects')
            } else if (mode === 'edit' && project?.id) {
                await projectApi.update(project.id, formData)
                alert('프로젝트가 성공적으로 수정되었습니다!')
                router.push(`/projects/${project.id}`)
            }
        } catch (error) {
            console.error('프로젝트 저장 실패:', error)
            alert('프로젝트 저장에 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        if (mode === 'edit' && project?.id) {
            router.push(`/projects/${project.id}`)
        } else {
            router.push('/projects')
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <div>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        프로젝트 제목 *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="프로젝트 제목을 입력하세요"
                    />
                </div>

                <div>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        프로젝트 설명 *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            resize: 'vertical'
                        }}
                        placeholder="프로젝트에 대한 상세한 설명을 입력하세요"
                    />
                </div>

                <div>
                    <label htmlFor="period" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        개발 기간
                    </label>
                    <input
                        type="text"
                        id="period"
                        name="period"
                        value={formData.period}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="예: 2025.01 - 2025.02"
                    />
                </div>

                <div>
                    <label htmlFor="techStack" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        기술 스택
                    </label>
                    <input
                        type="text"
                        id="techStack"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="예: React, Spring Boot, MySQL"
                    />
                </div>

                <div>
                    <label htmlFor="projectUrl" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        프로젝트 URL
                    </label>
                    <input
                        type="url"
                        id="projectUrl"
                        name="projectUrl"
                        value={formData.projectUrl}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="https://example.com"
                    />
                </div>

                <div>
                    <label htmlFor="githubUrl" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        GitHub URL
                    </label>
                    <input
                        type="url"
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="https://github.com/username/repository"
                    />
                </div>

                <div>
                    <label htmlFor="thumbnailUrl" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        썸네일 이미지 URL
                    </label>
                    <input
                        type="url"
                        id="thumbnailUrl"
                        name="thumbnailUrl"
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? '저장 중...' : (mode === 'create' ? '프로젝트 생성' : '프로젝트 수정')}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    )
}
