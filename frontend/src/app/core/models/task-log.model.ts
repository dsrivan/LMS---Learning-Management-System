export type TaskCategory = 'PESQUISA' | 'PRATICA' | 'ASSISTIR_VIDEOAULA';

export interface TaskLogRequest {
  enrollmentId: number;
  category: TaskCategory;
  description: string;
  startedAt: string;
  endedAt: string;
}

export interface TaskLogResponse {
  id: number;
  enrollmentId: number;
  category: TaskCategory;
  description: string;
  startedAt: string;
  endedAt: string;
}
