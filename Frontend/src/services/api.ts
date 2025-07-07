export interface Project {
    id?: number;
    title: string;
    description: string;
    period: string;
    techStack: string;
    projectUrl: string;
    githubUrl: string;
    thumbnailUrl: string;
    createdAt?: string;
    updatedAt?: string;
}

const API_BASE_URL = '/api/projects';

export const projectApi = {
    // 서버사이드에서 사용 (SSR/SSG)
    getAll: async (): Promise<Project[]> => {
        const response = await fetch(`http://localhost:8080/api/projects`, {
            cache: 'no-store' // 항상 최신 데이터
        });
        if (!response.ok) throw new Error('Failed to fetch projects');
        return response.json();
    },

    // 클라이언트사이드에서 사용
    getAllClient: async (): Promise<Project[]> => {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch projects');
        return response.json();
    },

    getById: async (id: number): Promise<Project> => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch project');
        return response.json();
    },

    create: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
        if (!response.ok) throw new Error('Failed to create project');
        return response.json();
    },

    update: async (id: number, project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
        if (!response.ok) throw new Error('Failed to update project');
        return response.json();
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete project');
    },
};
