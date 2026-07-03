import { assetUrl } from '../utils/assetUrl';

type ApiErrorProps = {
  onRetry: () => void;
};

const ApiError = ({ onRetry }: ApiErrorProps) => (
  <section className="api-error" aria-labelledby="api-error-heading">
    <img
      className="api-error__icon"
      src={assetUrl('assets/images/icon-error.svg')}
      alt=""
      aria-hidden="true"
    />
    <h1 id="api-error-heading" className="api-error__title">
      Something went wrong
    </h1>
    <p className="api-error__message">
      We couldn&apos;t connect to the server (API error). Please try again in a few moments.
    </p>
    <button type="button" className="api-error__retry" onClick={onRetry}>
      <img src={assetUrl('assets/images/icon-retry.svg')} alt="" aria-hidden="true" />
      Retry
    </button>
  </section>
);

export default ApiError;
