const ErrorFallback = ({error}: {error: Error}) => {
  return (
    <div role="alert">
      <p>应用发生错误:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
