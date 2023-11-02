import { GenericError } from '../main.interface';

export interface ResponseCreateNote {
  error?: GenericError;
  data?: {
    id: string;
  };
}

export interface ResponseGetNote {
  error?: GenericError;
  data?: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
}

export interface ResponseDeleteNote {
  error?: GenericError;
  data?: {
    state: string;
  };
}

export interface ResponseUpdateNote {
  error?: GenericError;
  data?: {
    id: string;
  };
}

interface GetAllNotesModel {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ResponseGetAllNotes {
  error?: GenericError;
  data?: GetAllNotesModel[];
}
