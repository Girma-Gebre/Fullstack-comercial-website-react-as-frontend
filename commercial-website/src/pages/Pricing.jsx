export default function Pricing() {
const plans = [
{ plan: 'Basic', price: '$29/mo', desc: 'Essential features to get started with your website.' },
{ plan: 'Pro', price: '$59/mo', desc: 'Advanced features and support for growing businesses.' },
{ plan: 'Enterprise', price: '$99/mo', desc: 'Full customization and priority support.' }
];
return (
<div className="page">
<h2>Pricing Plans</h2>
<div className="fancy-grid">
{plans.map(p => (
<div className="fancy-card" key={p.plan}>
<h3>{p.plan}</h3>
<p className="price">{p.price}</p>
<p>{p.desc}</p>
</div>
))}
</div>
</div>
);
}