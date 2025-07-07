import { ProjectForm } from '@/components/ProjectForm'
import { projectApi } from '@/services/api'

interface Props {
    params: { id: string }
}

export default async function EditProjectPage({ params }: Props) {
    let project = null

    try {
        project = await projectApi.getById(parseInt(params.id))
    } catch (error) {
        console.error('프로젝트 로딩 실패:', error)
    }

    if (!project) {
        return (
            <div>
                <h1>프로젝트를 찾을 수 없습니다</h1>
                <p>요청하신 프로젝트가 존재하지 않거나 삭제되었습니다.</p>
            </div>
        )
    }

    return (
        <div>
            <h1>프로젝트 수정</h1>
            <ProjectForm project={project} mode="edit" />
        </div>
    )
}
