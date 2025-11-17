export interface FieldErrorProps {
  error?: string;
}

const FieldError = ({ error }: FieldErrorProps) => {
  return <p className="text-red mt-0.5 text-sm min-h-5">{error}</p>;
};

export default FieldError;
