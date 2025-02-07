import React from 'react';
import '../styles/letras.css';
import '../styles/estilos.min.css';
import '../styles/owl.carousel.min.css';
import '../styles/owl.theme.default.min.css';

const Header = () => {
    return (
        <header>
            <nav className="menuEscritorio">
                <div className="top-bar">
                    <div className="container">
                        <ul className="navIdiomas">
                            <li>
                                <a href="/es/inicio/estudia/estudios/grado/ingenieria-informatica1/plan-de-estudios">
                                    es
                                </a>
                            </li>
                            <li>
                                <a href="/eu/hasiera/ikasi/ikasketak/gradua/informatikako-ingeniaritza1/ikasketa-plana">
                                    eu
                                </a>
                            </li>
                            <li className="elementoActivo">en</li>
                        </ul>
                        <ul className="navSoy">
                            <li>
                                <a href="/en/home/new-undergraduate-degrees" title="undergraduate">
                                    <span>Undergraduate</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/en/home/new-masters-students"
                                    title="New master's students"
                                >
                                    <span>Postgraduate</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/en/home/executive-education-deusto"
                                    title="Executive Education"
                                >
                                    <span>Executive Education</span>
                                </a>
                            </li>
                        </ul>
                        <div className="navLogin">
                            <span>
                                I am...{" "}
                                <img
                                    width={16}
                                    height={16}
                                    src="https://www.deusto.es/estaticos/ud/img/usuario.svg"
                                    alt="Icono de usuario"
                                />
                            </span>
                            <ul className="navPerfiles">
                                <li>
                                    <a
                                        href="https://estudiantes.deusto.es/apex/r/comunicacion/portalalumnado/inicia-sesion?fsp_language_preference=en"
                                        title="Students"
                                        target="_blank"
                                    >
                                        Student
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://open.dbs.deusto.es/login/index.php"
                                        title="Executive Education participant"
                                        target="_blank"
                                    >
                                        Executive participant
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://alumni.deusto.es/s/?language=en_US"
                                        title="Deusto Alumni"
                                        target="_blank"
                                    >
                                        Alumni
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://empresas.deusto.es/cs/Satellite/empresas/es/empresas-2"
                                        title="Deusto company"
                                        target="_blank"
                                    >
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://intranet.deusto.es/cs/Satellite/intranet/en/inicio-0"
                                        title="Deusto staff"
                                        target="_blank"
                                    >
                                        Deusto staff
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navegacionEscritorio">
                    <div className="container">
                        <a href="https://www.deusto.es/cs/Satellite/deusto/en/university-deusto?cambioidioma=si">
                            <img
                                width={168}
                                height={50}
                                src="https://www.deusto.es/estaticos/ud/img/logoDeustoMenu-en.png"
                                alt="Logo Deusto University"
                            />
                        </a>
                        <ul className="primerNivel">
                            <li className="mglEspecial">
                                <a className="" href="/en/home/we-are-deusto">
                                    We are Deusto
                                    <img
                                        width={10}
                                        height={4}
                                        src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                                        alt=""
                                    />
                                </a>
                                <div className="subpaginas">
                                    <div className="container">
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university">
                                                    The university
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/mission-identity">
                                                    Mission and identity
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/strategic-plan">
                                                    Strategic plan
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/rankings">
                                                    Rankings
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/companies-organisations">
                                                    Companies and organisations
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/transparency">
                                                    Transparency
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/2030agenda">
                                                    2030 Agenda
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/campus-social">
                                                    Campus social
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/the-university/blessed-garate">
                                                    Blessed Gárate
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties">Faculties</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/health-sciences">
                                                    Health Sciences
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/social-human-sciences">
                                                    Social and Human Sciences
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/law">Law</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/deusto-business-school">
                                                    Deusto Business School
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/education-sport">
                                                    Education and Sport
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/engineering">
                                                    Engineering
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/faculties/theology">
                                                    Theology
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/we-are-deusto/academic-strategy">
                                                    Academic strategy
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/academic-strategy/deusto-educational-model">
                                                    Deusto Educational Model
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/academic-strategy/deusto-dual-model">
                                                    Deusto Dual Model
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/academic-strategy/online-model">
                                                    Deusto online model
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/academic-strategy/educational-innovation">
                                                    Educational Innovation
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/academic-strategy/quality">
                                                    Quality assurance
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/we-are-deusto/team">Team</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/team/university-authorities">
                                                    University authorities
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/team/lecturers">
                                                    Lecturers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/team/researchers">
                                                    Researchers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/team/university-ombudsperson">
                                                    University ombudsperson
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/team/work-at-deusto">
                                                    Work at Deusto
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/we-are-deusto/university-centres">
                                                    University centres
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/university-centres/campuses-headquarters">
                                                    Campuses and headquarters
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/university-centres/affiliated-centres">
                                                    Affiliated centres
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/university-centres/university-chairs">
                                                    University chairs
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/university-centres/institutes">
                                                    Institutes
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/we-are-deusto/university-centres/other-centres">
                                                    Other centres
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="mglEspecial">
                                <a className="" href="/en/home/study">
                                    Study
                                    <img
                                        width={10}
                                        height={4}
                                        src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                                        alt=""
                                    />
                                </a>
                                <div className="subpaginas">
                                    <div className="container">
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/study/courses">Courses</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/bachelors-degrees">
                                                    Bachelor's Degrees and Double Degrees{" "}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/degree-specializations">
                                                    Master's degree and specializations
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/executive-education">
                                                    Executive Education
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/phd">PhD</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/continuing-education">
                                                    Continuing education
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/languages">Languages</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/study-abroad">
                                                    Study abroad
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/courses/summer-school">
                                                    Summer School
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/study/admissions">Admissions</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/admissions/undergraduate">
                                                    Undergraduate
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/admissions/postgraduate">
                                                    Postgraduate
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/admissions/phd"> PhD</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/admissions/languages">Languages</a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/study/scholarships-grants">
                                                    Scholarships and grants
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/scholarships-grants/bachelors-degrees">
                                                    Bachelor's Degrees
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/scholarships-grants/postgraduate">
                                                    Postgraduate
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/scholarships-grants/phd">PhD</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/scholarships-grants/post-phd">
                                                    Post PhD
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/study/financial-information">
                                                    Student Finance
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/financial-information/bachelors-degrees">
                                                    Bachelor's Degrees
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/financial-information/postgraduate">
                                                    Postgraduate
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/study/financial-information/phd">PhD</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="mglEspecial">
                                <a className="" href="/en/home/research">
                                    Research
                                    <img
                                        width={10}
                                        height={4}
                                        src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                                        alt=""
                                    />
                                </a>
                                <div className="subpaginas">
                                    <div className="container">
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/research/whos-who">Who's who</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/whos-who/researchers">
                                                    Researchers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/whos-who/research-teams">
                                                    Research teams
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/whos-who/research-centres">
                                                    Research centres
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/whos-who/research-school">
                                                    Research School - DIRS
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/whos-who/research-support">
                                                    Research support
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/research/scientific-production-activity">
                                                    Scientific production and activity
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/scientific-production-activity/areas-knowledge">
                                                    Areas of knowledge
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/scientific-production-activity/research-projects">
                                                    Research projects
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/scientific-production-activity/scientific-publications">
                                                    Scientific publications
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/research/transfer-social-impact">
                                                    Transfer and social impact
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/transfer-social-impact/transfer-innovation">
                                                    Transfer and innovation
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/research/transfer-social-impact/social-impact-scientific-dissemination">
                                                    Social impact and scientific dissemination
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="mglEspecial">
                                <a className="" href="/en/home/international">
                                    International
                                    <img
                                        width={10}
                                        height={4}
                                        src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                                        alt=""
                                    />
                                </a>
                                <div className="subpaginas">
                                    <div className="container">
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/international/international-students">
                                                    International students
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/international/international-students/physical-mobility">
                                                    Physical mobility
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/international/international-students/virtual-mobility">
                                                    Virtual mobility
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/international/international-students/movilidad-practicas">
                                                    Movilidad de prácticas
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/international/outgoing-mobility">
                                                    Outgoing mobility
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/international/outgoing-mobility/study-mobility">
                                                    Study mobility
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/international/outgoing-mobility/movilidad-de-estudios-sicue">
                                                    Movilidad SICUE
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/international/outgoing-mobility/internship-mobility">
                                                    Internship mobility
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/international/deusto-global">
                                                    Deusto global
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/international/international-educational-cooperation-projects">
                                                    International educational cooperation projects
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="mglEspecial">
                                <a className="" href="/en/home/campus-life">
                                    Campus Life
                                    <img
                                        width={10}
                                        height={4}
                                        src="https://www.deusto.es/estaticos/ud/img/dropdownMenu.svg"
                                        alt=""
                                    />
                                </a>
                                <div className="subpaginas">
                                    <div className="container">
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/campus-life/news-events">
                                                    News and events
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/news-events/news">News</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/news-events/deusto-yearbook">
                                                    Deusto yearbook
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/news-events/magazines">
                                                    Magazines
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/news-events/social-network">
                                                    Social Network
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/news-events/press">
                                                    Media Room
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/news-events/social-deustobarometer">
                                                    Social Deustobarometer
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/campus-life/events">Events</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/events/open-days">
                                                    Open days
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/events/deustoforum">
                                                    DeustoForum
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/events/employment-entrepreneurship-forum">
                                                    Employment and entrepreneurship forum
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/events/tamborrada">
                                                    Tamborrada
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/events/ignatian-year">
                                                    The Ignatian year
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/campus-life/deusto-campus">
                                                    Deusto Campus
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/deusto-campus/faith">Faith</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/deusto-campus/solidarity">
                                                    Solidarity
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/deusto-campus/ecology">
                                                    Ecology
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/deusto-campus/culture">
                                                    Culture
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/deusto-campus/sport">Sport</a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/campus-life/academic-information">
                                                    Academic information
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/academic-information/academic-calendar">
                                                    Academic calendar
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/academic-information/academic-regulations">
                                                    Academic regulations
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/academic-information/administrative-procedures">
                                                    Administrative procedures
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/academic-information/student-council">
                                                    Student Council and graduation photographs
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/academic-information/human-training-values-module">
                                                    Human Training in Values Module
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="segundoNivel estrecho">
                                            <li>
                                                <a href="/en/home/campus-life/services">Services</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/library">Library</a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/accommodation-orientation">
                                                    Accommodation and orientation
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/hall-residence">
                                                    Deusto Hall of Residence
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/social-action-inclusion">
                                                    Social action and inclusion
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/guidance-service">
                                                    Guidance Service
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/employment-guidance">
                                                    Employment and guidance
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/university-archive">
                                                    University archive
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/en/home/campus-life/services/practical-information">
                                                    Practical information
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="mglEspecial">
                                <a
                                    className=""
                                    href="https://www.deusto.es/colabora/"
                                    target="_blank"
                                >
                                    Giving
                                </a>
                            </li>
                        </ul>
                        <div className="bloqueBuscador">
                            <div className="triggerBuscadorGoogle">
                                <img
                                    width={32}
                                    height={32}
                                    src="https://www.deusto.es/estaticos/ud/img/lupa.svg"
                                    alt="Lupa para buscar"
                                />
                                <img
                                    className="oculto"
                                    width={32}
                                    height={32}
                                    src="https://www.deusto.es/estaticos/ud/img/cerrarModalNegra.svg"
                                    alt="Cerrar"
                                />
                            </div>
                            <div className="buscadorGoogle">
                                <div className="search-form">
                                    <form action="#" method="get">
                                        <div className="container">
                                            <label />
                                            <div>
                                                <div id="___gcse_0">
                                                    <div className="gsc-control-cse gsc-control-cse-es">
                                                        <div className="gsc-control-wrapper-cse" dir="ltr">
                                                            <table
                                                                cellSpacing={0}
                                                                cellPadding={0}
                                                                role="presentation"
                                                                className="gsc-search-box"
                                                            >
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="gsc-input">
                                                                            <div
                                                                                className="gsc-input-box"
                                                                                id="gsc-iw-id1"
                                                                            >
                                                                                <table
                                                                                    cellSpacing={0}
                                                                                    cellPadding={0}
                                                                                    role="presentation"
                                                                                    id="gs_id50"
                                                                                    className="gstl_50 gsc-input"
                                                                                    style={{ width: "100%", padding: 0 }}
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td id="gs_tti50" className="gsib_a">
                                                                                                <input
                                                                                                    autoComplete="off"
                                                                                                    type="text"
                                                                                                    size={10}
                                                                                                    className="gsc-input"
                                                                                                    name="search"
                                                                                                    title="buscar"
                                                                                                    aria-label="buscar"
                                                                                                    id="gsc-i-id1"
                                                                                                    dir="ltr"
                                                                                                    spellCheck="false"
                                                                                                    style={{
                                                                                                        width: "100%",
                                                                                                        padding: 0,
                                                                                                        border: "none",
                                                                                                        margin: 0,
                                                                                                        height: "auto",
                                                                                                        background:
                                                                                                            'url("https://www.google.com/cse/static/images/1x/es/branding.png") left center no-repeat rgb(255, 255, 255)',
                                                                                                        outline: "none"
                                                                                                    }}
                                                                                                />
                                                                                            </td>
                                                                                            <td className="gsib_b">
                                                                                                <div
                                                                                                    className="gsst_b"
                                                                                                    id="gs_st50"
                                                                                                    dir="ltr"
                                                                                                >
                                                                                                    <a
                                                                                                        className="gsst_a"
                                                                                                        href="#" 
                                                                                                        onClick={(e) => e.preventDefault()}
                                                                                                        title="Borrar contenido del cuadro de búsqueda"
                                                                                                        role="button"
                                                                                                        style={{ display: "none" }}
                                                                                                    >
                                                                                                        <span
                                                                                                            className="gscb_a"
                                                                                                            id="gs_cb50"
                                                                                                            aria-hidden="true"
                                                                                                        >
                                                                                                            ×
                                                                                                        </span>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                        <td className="gsc-search-button">
                                                                            <button className="gsc-search-button gsc-search-button-v2">
                                                                                <svg
                                                                                    width={13}
                                                                                    height={13}
                                                                                    viewBox="0 0 13 13"
                                                                                >
                                                                                    <title>buscar</title>
                                                                                    <path d="m4.8495 7.8226c0.82666 0 1.5262-0.29146 2.0985-0.87438 0.57232-0.58292 0.86378-1.2877 0.87438-2.1144 0.010599-0.82666-0.28086-1.5262-0.87438-2.0985-0.59352-0.57232-1.293-0.86378-2.0985-0.87438-0.8055-0.010599-1.5103 0.28086-2.1144 0.87438-0.60414 0.59352-0.8956 1.293-0.87438 2.0985 0.021197 0.8055 0.31266 1.5103 0.87438 2.1144 0.56172 0.60414 1.2665 0.8956 2.1144 0.87438zm4.4695 0.2115 3.681 3.6819-1.259 1.284-3.6817-3.7 0.0019784-0.69479-0.090043-0.098846c-0.87973 0.76087-1.92 1.1413-3.1207 1.1413-1.3553 0-2.5025-0.46363-3.4417-1.3909s-1.4088-2.0686-1.4088-3.4239c0-1.3553 0.4696-2.4966 1.4088-3.4239 0.9392-0.92727 2.0864-1.3969 3.4417-1.4088 1.3553-0.011889 2.4906 0.45771 3.406 1.4088 0.9154 0.95107 1.379 2.0924 1.3909 3.4239 0 1.2126-0.38043 2.2588-1.1413 3.1385l0.098834 0.090049z" />
                                                                                </svg>
                                                                            </button>
                                                                        </td>
                                                                        <td className="gsc-clear-button">
                                                                            <div
                                                                                className="gsc-clear-button"
                                                                                title="borrar resultados"
                                                                            >
                                                                                &nbsp;
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div className="gsc-results-wrapper-overlay">
                                                                <div
                                                                    className="gsc-results-close-btn"
                                                                    tabIndex={0}
                                                                />
                                                                <div className="gsc-positioningWrapper">
                                                                    <div className="gsc-tabsAreaInvisible">
                                                                        <div
                                                                            aria-label="refinement"
                                                                            role="tab"
                                                                            className="gsc-tabHeader gsc-inline-block gsc-tabhActive"
                                                                        >
                                                                            Búsqueda personalizada
                                                                        </div>
                                                                        <span className="gs-spacer"> </span>
                                                                    </div>
                                                                </div>
                                                                <div className="gsc-positioningWrapper">
                                                                    <div className="gsc-refinementsAreaInvisible" />
                                                                </div>
                                                                <div className="gsc-above-wrapper-area-invisible">
                                                                    <div className="gsc-above-wrapper-area-backfill-container" />
                                                                    <table
                                                                        cellSpacing={0}
                                                                        cellPadding={0}
                                                                        role="presentation"
                                                                        className="gsc-above-wrapper-area-container"
                                                                    >
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="gsc-result-info-container">
                                                                                    <div className="gsc-result-info-invisible" />
                                                                                </td>
                                                                                <td className="gsc-orderby-container">
                                                                                    <div className="gsc-orderby-invisible">
                                                                                        <div className="gsc-orderby-label gsc-inline-block">
                                                                                            Ordenar por:
                                                                                        </div>
                                                                                        <div className="gsc-option-menu-container gsc-inline-block">
                                                                                            <div className="gsc-selected-option-container gsc-inline-block">
                                                                                                <div className="gsc-selected-option">
                                                                                                    Relevance
                                                                                                </div>
                                                                                                <div className="gsc-option-selector" />
                                                                                            </div>
                                                                                            <div className="gsc-option-menu-invisible">
                                                                                                <div className="gsc-option-menu-item gsc-option-menu-item-highlighted">
                                                                                                    <div className="gsc-option">
                                                                                                        Relevance
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="gsc-option-menu-item">
                                                                                                    <div className="gsc-option">
                                                                                                        Date
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="gsc-adBlockInvisible" />
                                                                <div className="gsc-wrapper">
                                                                    <div className="gsc-adBlockInvisible" />
                                                                    <div className="gsc-resultsbox-invisible">
                                                                        <div className="gsc-resultsRoot gsc-tabData gsc-tabdActive">
                                                                            <div>
                                                                                <div className="gsc-expansionArea" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="gsc-modal-background-image"
                                                                tabIndex={0}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    );
};
export default Header;