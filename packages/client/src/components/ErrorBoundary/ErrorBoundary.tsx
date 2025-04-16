import React, {ErrorInfo, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import { newError } from '../../api/error/errorApi'

type ErrorBoundaryProps = {
  children: ReactNode;
}
type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
type ErrorFallbackProps = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({error, errorInfo}) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Что-то пошло не так...</h2>
      <details>
        {error?.toString()}
        <br></br>
        {errorInfo?.componentStack}
      </details>
      <button onClick={() => navigate(-1)}>Вернуться назад</button>
    </div>
  )
}
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: ErrorBoundaryState) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Произошла ошибка: ', error, errorInfo);
    this.setState({
      error,
      errorInfo
    })
    newError({ error: error.message, errorInfo: error.stack });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />
    }

    return this.props.children;
  }
}