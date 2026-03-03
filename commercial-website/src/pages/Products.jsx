export default function Products() {
const products = [
{ name: 'Website Builder', desc: 'Create stunning websites easily and efficiently.' },
{ name: 'E-commerce Platform', desc: 'Fully responsive online stores ready to scale.' },
{ name: 'Portfolio Templates', desc: 'Showcase work with modern, sleek templates.' }
];
return (
<div className="page">
<h2>Our Products</h2>
<div className="fancy-grid">
{products.map(prod => (
<div className="fancy-card" key={prod.name}>
<h3>{prod.name}</h3>
<p>{prod.desc}</p>
</div>
))}
</div>
</div>
);
}