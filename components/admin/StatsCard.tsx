type StatsCardProps = {
  title: string;
  index: number;
};

export default function StatsCard({ title, index }: StatsCardProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">
        {index + 1}. {title}
      </h2>
      <div className="space-y-1 text-sm">
        <p>Total Conversations: 12</p>
        <p>Active Users: 5</p>
      </div>
    </div>
  );
}
