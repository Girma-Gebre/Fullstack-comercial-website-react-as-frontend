export default function About() {
const aboutItems = [
{ title: 'Our Mission', description: 'Deliver pixel-perfect websites tailored to your business.' },
{ title: 'Our Vision', description: 'Innovate and inspire through modern digital experiences.' },
{ title: 'Our Team', description: 'Skilled professionals combining creativity and technology.' }
];
return (
<div className="page">
<h2>About Us</h2>
<div className="fancy-grid">
{aboutItems.map(item => (
<div className="fancy-card" key={item.title}>
<h3>{item.title}</h3>
<p>{item.description}</p>
</div>
))}
</div>
</div>
);
}