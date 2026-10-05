import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorService {
  private readonly messages: Record<number, string> = {
    0: 'Não foi possível conectar ao servidor.',
    400: 'Dados inválidos.',
    401: 'Não autorizado.',
    403: 'Acesso negado.',
    404: 'Recurso não encontrado.',
  };

  handle(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      return throwError(() => ({
        status: error.status,
        message:
          error.error?.message ??
          this.messages[error.status] ??
          (error.status >= 500
            ? 'Erro interno do servidor.'
            : 'Não foi possível concluir a operação.'),
        originalError: error,
      }));
    }

    return throwError(() => ({
      status: 0,
      message: 'Ocorreu um erro inesperado.',
      originalError: error,
    }));
  }
}
