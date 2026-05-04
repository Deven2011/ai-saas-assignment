type IntegrationsCardProps = {
  title: string;
  index: number;
};

export default function IntegrationsCard({
  title,
  index
}: IntegrationsCardProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">
        {index + 1}. {title}
      </h2>
      <div className="space-y-1 text-sm">
        <p>Shopify: Connected</p>
        <p>CRM: Enabled</p>
      </div>
    </div>
  );
}
