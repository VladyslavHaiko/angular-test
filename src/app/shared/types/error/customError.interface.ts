export interface CustomError {
  error: {
    errors: [{
      id: number,
      title: string
    }]
  };
}
