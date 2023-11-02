export interface RestCreateNote {
  title: string;
  content: string;
  userId: string;
}

export interface RestUpdateNote {
  title?: string;
  content?: string;
  id: string;
}
