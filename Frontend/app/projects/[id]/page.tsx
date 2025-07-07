import { ProjectDetail } from '@/components/ProjectDetail'

interface Props {
    params: { id: string }
}

export default function ProjectDetailPage({ params }: Props) {
    return (
        <div>
            <ProjectDetail projectId={params.id} />
        </div>
    )
}
