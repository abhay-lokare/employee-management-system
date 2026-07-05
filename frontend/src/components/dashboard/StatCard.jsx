import "./StatCard.css";

function StatCard({
    title,
    subtitle,
    value,
    growth,
    icon,
    color
}) {

    return (

        <div className="stat-card">

            <div className="stat-top">

                <div
                    className="stat-icon"
                    style={{ background: color }}
                >
                    {icon}
                </div>

                <span className="growth-badge">
                    {growth}
                </span>

            </div>

            <div className="stat-body">

                <h2 className="stat-value">
                    {value}
                </h2>

                <h5 className="stat-title">
                    {title}
                </h5>

                <p className="stat-subtitle">
                    {subtitle}
                </p>

            </div>

        </div>

    );

}

export default StatCard;