import "./WeatherInfo.css";

const WeatherSkeleton = () => {
  return (
    <div className="weather skeleton">
      <div className="skeleton-title shimmer"></div>

      <div className="skeleton-row">
        <div className="skeleton-icon shimmer"></div>
        <div className="skeleton-temp shimmer"></div>
      </div>

      <div className="skeleton-details">
        <div className="skeleton-line shimmer"></div>
        <div className="skeleton-line shimmer"></div>
        <div className="skeleton-line shimmer"></div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
