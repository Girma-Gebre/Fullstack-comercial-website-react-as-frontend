export default function Services() {
const items = {service1: "Personal Portifolio", service2: "Student Registration", service3: "Cash Registration", personalPortifolio: "I am Girma Gebre, a passionate developer creating modern, responsive web applications. My portfolio highlights skills in front-end, back-end development, problem-solving, and delivering innovative, user-friendly digital solutions.", StudentRegistration: "The Student Registration website allows students to easily register, manage courses, and update profiles. It provides a secure, user-friendly platform for efficient enrollment, record management, and academic tracking.", CashRegistration: "The Cash Registration system allows users to efficiently record, track, and manage financial transactions. It provides a secure, user-friendly platform for accurate cash handling and real-time financial monitoring."};
const anchorStyleObj = {textDecoration: "none", color:"blue", fontSize:"600"}

return (
<section className="services">
<h3>Our Sample Services</h3>
<div className="grid">
<div className="service-card">
<h4>{items.service1}</h4>
<p>{items.personalPortifolio}</p>
<a target="blank" href="https://github.com/Girma-Gebre/Portifolio-fullstack-with-mongoDB-atlas-deploy-on-render-website" style={anchorStyleObj}>Github</a> | <a target="blank" href="https://portifolio-fullstack-with-mongodb-atlas-fe6b.onrender.com/" style={anchorStyleObj}>Demo</a>
</div>
<div className="service-card">
<h4>{items.service2}</h4>
<p>{items.StudentRegistration}</p>
<a target="blank" href="https://github.com/Girma-Gebre/Student-registartion-fullstack-web-site-using-react-js-as-front-end" style={anchorStyleObj}>Github</a> | <a target="blank" href="https://student-registartion-fullstack-web-site-dw0d.onrender.com" style={anchorStyleObj}>Demo</a>
</div>
<div className="service-card">
<h4>{items.service3}</h4>
<p>{items.CashRegistration}</p>
<a target="blank" href="https://github.com/Girma-Gebre/cash-register" style={anchorStyleObj}>Github</a> | <a target="blank" href="https://cash-register-a.netlify.app/" style={anchorStyleObj}>Demo</a>
</div>
</div>
</section>
);
}